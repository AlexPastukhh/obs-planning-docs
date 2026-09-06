package obs.rpkg.features.apply.application;

import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.WorkPackageRuntime;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.PublishFailure;
import obs.rpkg.features.apply.domain.PublishFailureCode;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.PublicationObserver;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

/** Publish / Retry Publish application service owned entirely by GitWorkspace + ReplacementPackageState. */
public final class PublishAppliedCommit {
    private final GitWorkspaceRepository workspaces;
    private final ReplacementPackageStateRepository states;
    private final PublicationObserver observer;
    private final WorkPackageRuntime mechanics;

    public PublishAppliedCommit(
            GitWorkspaceRepository workspaces,
            ReplacementPackageStateRepository states,
            PublicationObserver observer,
            WorkPackageRuntime mechanics) {
        this.workspaces = Objects.requireNonNull(workspaces, "workspaces");
        this.states = Objects.requireNonNull(states, "states");
        this.observer = Objects.requireNonNull(observer, "observer");
        this.mechanics = Objects.requireNonNull(mechanics, "mechanics");
    }

    public Result<ReplacementPackageState, PublishFailure> execute(String changeSetId, String packageId) {
        WorkId workId = new WorkId(changeSetId);
        try (ReplacementPackageStateRepository.WorkLock ignored = states.lock(workId)) {
            Optional<GitWorkspace> workspace = workspaces.find(workId);
            if (workspace.isEmpty()) return failure(PublishFailureCode.STATE_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED, "GitWorkspace is missing for this Work.", null);
            Optional<ReplacementPackageState> maybe = ReplacementPackageStateAccess.findOrThrow(states, workId, packageId);
            if (maybe.isEmpty()) return failure(PublishFailureCode.PACKAGE_STATE_NOT_FOUND,
                    OperationFailureDisposition.ACTION_REQUIRED, "No replacement-package state exists for this Work/package.", null);
            ReplacementPackageState current = maybe.get();
            if (!current.isCommitted()) return failure(PublishFailureCode.COMMIT_REQUIRED,
                    OperationFailureDisposition.ACTION_REQUIRED, "Commit Applied must succeed before Publish.", current);
            if (current.isPublished()) return Result.success(current);
            return executeLocked(workspace.get(), current);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), null);
        } catch (IllegalStateException e) {
            return failure(PublishFailureCode.STATE_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), null);
        }
    }

    private Result<ReplacementPackageState, PublishFailure> executeLocked(
            GitWorkspace workspace,
            ReplacementPackageState current) {
        String previousTip;
        try {
            previousTip = mechanics.previousTip(workspace, current.packageIdentity());
            mechanics.verifyWorkspace(workspace);
        } catch (Core.ObsException e) {
            return failure(mapMechanicsCode(e), OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), current);
        }

        // Every possible push is preceded by a reliable remote observation.
        if (current.publication() instanceof PublicationObservation.NotRequested
                || current.publication() instanceof PublicationObservation.NotConfirmed) {
            Result<PublicationObservation, PublicationObserver.Failure> observed = observe(workspace);
            if (observed.isFailure()) return failure(PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN, observed.failure().orElseThrow().message(), current);
            Result<ReplacementPackageState, PublishFailure> persisted = persistObservation(current, observed.success().orElseThrow());
            if (persisted.isFailure()) return persisted;
            current = persisted.success().orElseThrow();
        }

        if (current.isPublished()) return Result.success(current);

        String expectedLeaseTip;
        PublicationObservation prePush = current.publication();
        if (prePush instanceof PublicationObservation.ConfirmedAbsent) {
            expectedLeaseTip = null;
        } else if (prePush instanceof PublicationObservation.ConfirmedTip tip) {
            if (!Objects.equals(tip.commitSha(), previousTip)) {
                return failure(PublishFailureCode.REMOTE_BRANCH_DIVERGED,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        "Remote work branch is at unexpected tip " + tip.commitSha()
                                + " instead of previous package tip " + previousTip
                                + " or intended commit " + current.commitSha() + ".",
                        current);
            }
            expectedLeaseTip = tip.commitSha();
        } else {
            return failure(PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN,
                    "Publication is not reliably observed; no push is allowed.", current);
        }

        // Write-ahead uncertainty guard: after this point an external push may happen.
        ReplacementPackageState attempting = current.withPublication(new PublicationObservation.NotConfirmed());
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, attempting);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), current);
        }

        try {
            mechanics.push(workspace, attempting.packageIdentity(), attempting.commitSha(), expectedLeaseTip);
        } catch (Core.ObsException pushFailure) {
            return reconcileAfterPossiblePush(workspace, attempting, previousTip, pushFailure);
        }

        return reconcileAfterPossiblePush(workspace, attempting, previousTip, null);
    }

    private Result<ReplacementPackageState, PublishFailure> reconcileAfterPossiblePush(
            GitWorkspace workspace,
            ReplacementPackageState durableAttempting,
            String previousTip,
            Core.ObsException pushFailure) {
        Result<PublicationObservation, PublicationObserver.Failure> observed = observe(workspace);
        if (observed.isFailure()) {
            return failure(PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN,
                    observed.failure().orElseThrow().message(), durableAttempting);
        }
        PublicationObservation observation = observed.success().orElseThrow();
        Result<ReplacementPackageState, PublishFailure> persisted = persistObservation(durableAttempting, observation);
        if (persisted.isFailure()) return persisted;
        ReplacementPackageState confirmed = persisted.success().orElseThrow();

        if (confirmed.isPublished()) return Result.success(confirmed);

        boolean unchanged = observation instanceof PublicationObservation.ConfirmedAbsent
                || observation instanceof PublicationObservation.ConfirmedTip tip
                    && Objects.equals(tip.commitSha(), previousTip);
        if (!unchanged) {
            return failure(PublishFailureCode.REMOTE_BRANCH_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    pushFailure == null ? "Remote work branch moved to an unexpected tip after Publish."
                            : pushFailure.getMessage(),
                    confirmed);
        }
        return failure(PublishFailureCode.PUBLISH_FAILED,
                OperationFailureDisposition.RETRYABLE,
                pushFailure == null ? "Remote branch is proven unchanged after Publish attempt."
                        : pushFailure.getMessage(),
                confirmed);
    }

    private Result<ReplacementPackageState, PublishFailure> persistObservation(
            ReplacementPackageState current,
            PublicationObservation observation) {
        ReplacementPackageState next = current.withPublication(observation);
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, next);
            return Result.success(next);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), current);
        }
    }

    private Result<PublicationObservation, PublicationObserver.Failure> observe(GitWorkspace workspace) {
        return observer.observe(
                workspace.worktree(),
                workspace.workBranch(),
                workspace.repositoryTarget().repositoryIdentity());
    }

    private static PublishFailureCode mapMechanicsCode(Core.ObsException e) {
        if (Core.REPOSITORY_MISMATCH.equals(e.code)) return PublishFailureCode.STATE_DIVERGED;
        if (Core.REMOTE_BRANCH_DIVERGED.equals(e.code)) return PublishFailureCode.REMOTE_BRANCH_DIVERGED;
        if (Core.PUBLISH_FAILED.equals(e.code)) return PublishFailureCode.PUBLISH_FAILED;
        if (Core.STATE_DIVERGED.equals(e.code)) return PublishFailureCode.STATE_DIVERGED;
        return PublishFailureCode.UNEXPECTED_LEGACY_FAILURE;
    }

    private static Result<ReplacementPackageState, PublishFailure> failure(
            PublishFailureCode code,
            OperationFailureDisposition disposition,
            String message,
            ReplacementPackageState current) {
        return Result.failure(new PublishFailure(code, disposition, message, current));
    }
}

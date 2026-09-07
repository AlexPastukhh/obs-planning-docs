package obs.rpkg.features.apply.application;

import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.WorkPackageRuntime;
import obs.rpkg.GitTransport;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.PublishFailure;
import obs.rpkg.features.apply.domain.PublishFailureCode;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.PublicationObserver;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.application.port.WorkOperationLock;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

/** Publish / Retry Publish application service owned entirely by GitWorkspace + ReplacementPackageState. */
public final class PublishAppliedCommit {
    private final GitWorkspaceRepository workspaces;
    private final ReplacementPackageStateRepository states;
    private final WorkOperationLock workLocks;
    private final PublicationObserver observer;
    private final WorkPackageRuntime mechanics;

    public PublishAppliedCommit(
            GitWorkspaceRepository workspaces,
            ReplacementPackageStateRepository states,
            WorkOperationLock workLocks,
            PublicationObserver observer,
            WorkPackageRuntime mechanics) {
        this.workspaces = Objects.requireNonNull(workspaces, "workspaces");
        this.states = Objects.requireNonNull(states, "states");
        this.workLocks = Objects.requireNonNull(workLocks, "workLocks");
        this.observer = Objects.requireNonNull(observer, "observer");
        this.mechanics = Objects.requireNonNull(mechanics, "mechanics");
    }

    public Result<ReplacementPackageState, PublishFailure> execute(String changeSetId, String packageId) {
        WorkId workId = new WorkId(changeSetId);
        try (WorkOperationLock.Lock ignored = workLocks.lock(workId)) {
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
        } catch (WorkOperationLock.LockException e) {
            return failure(PublishFailureCode.OPERATION_SERIALIZATION_FAILED,
                    OperationFailureDisposition.RETRYABLE, e.getMessage(), null);
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
        GitTransport.Endpoint fetchEndpoint;
        try {
            previousTip = mechanics.previousTip(workspace, current.packageIdentity());
            mechanics.verifyWorkspace(workspace);
            fetchEndpoint = mechanics.verifiedPublicationFetchEndpoint(workspace);
        } catch (Core.ObsException e) {
            return failure(mapMechanicsCode(e), OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), current);
        }

        // Every invocation that is not already published refreshes remote evidence before any possible push.
        Result<PublicationObservation, PublicationObserver.Failure> observed = observe(workspace, fetchEndpoint);
        if (observed.isFailure()) return failure(PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                OperationFailureDisposition.UNCERTAIN, observed.failure().orElseThrow().message(), current);
        Result<ReplacementPackageState, PublishFailure> persisted =
                persistObservation(current, observed.success().orElseThrow());
        if (persisted.isFailure()) return persisted;
        current = persisted.success().orElseThrow();

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

        GitTransport.Endpoint pushEndpoint;
        try {
            pushEndpoint = mechanics.verifiedPublicationPushEndpoint(workspace);
        } catch (Core.ObsException e) {
            return failure(mapMechanicsCode(e), OperationFailureDisposition.ACTION_REQUIRED, e.getMessage(), current);
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
            mechanics.push(workspace, attempting.packageIdentity(), attempting.commitSha(), expectedLeaseTip, pushEndpoint);
        } catch (Core.ObsException pushFailure) {
            return reconcileAfterPossiblePush(workspace, attempting, previousTip, fetchEndpoint, pushFailure);
        }

        return reconcileAfterPossiblePush(workspace, attempting, previousTip, fetchEndpoint, null);
    }

    private Result<ReplacementPackageState, PublishFailure> reconcileAfterPossiblePush(
            GitWorkspace workspace,
            ReplacementPackageState durableAttempting,
            String previousTip,
            GitTransport.Endpoint fetchEndpoint,
            Core.ObsException pushFailure) {
        Result<PublicationObservation, PublicationObserver.Failure> observed = observe(workspace, fetchEndpoint);
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

    private Result<PublicationObservation, PublicationObserver.Failure> observe(
            GitWorkspace workspace,
            GitTransport.Endpoint endpoint) {
        return observer.observe(workspace.workBranch(), endpoint);
    }

    private static PublishFailureCode mapMechanicsCode(Core.ObsException e) {
        if (Core.REPOSITORY_MISMATCH.equals(e.code)) return PublishFailureCode.REPOSITORY_MISMATCH;
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

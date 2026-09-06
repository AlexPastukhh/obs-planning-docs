package obs.rpkg.features.apply.application;

import java.nio.file.Path;
import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.PublishFailure;
import obs.rpkg.features.apply.domain.PublishFailureCode;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.PublicationObserver;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.domain.WorkId;

/**
 * Application service for Publish.
 *
 * <p>A repeated call is the Retry Publish operation. If the previous attempt is NotConfirmed,
 * exact remote confirmation runs before another push is allowed.</p>
 */
public final class PublishAppliedCommit {
    private final Core core;
    private final ReplacementPackageStateRepository states;
    private final PublicationObserver observer;

    public PublishAppliedCommit(
            Core core,
            ReplacementPackageStateRepository states,
            PublicationObserver observer) {
        this.core = Objects.requireNonNull(core, "core");
        this.states = Objects.requireNonNull(states, "states");
        this.observer = Objects.requireNonNull(observer, "observer");
    }

    public Result<ReplacementPackageState, PublishFailure> execute(
            String changeSetId,
            String packageId) {
        WorkId workId = new WorkId(changeSetId);
        try (ReplacementPackageStateRepository.WorkLock ignored =
                     ReplacementPackageStateAccess.lockOrThrow(states, workId)) {
            return executeLocked(workId, packageId);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    null);
        } catch (IllegalStateException e) {
            return failure(
                    PublishFailureCode.STATE_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    null);
        }
    }

    private Result<ReplacementPackageState, PublishFailure> executeLocked(
            WorkId workId,
            String packageId) {
        Optional<ReplacementPackageState> maybe =
                ReplacementPackageStateAccess.findOrThrow(states, workId, packageId);
        if (maybe.isEmpty()) {
            return failure(
                    PublishFailureCode.PACKAGE_STATE_NOT_FOUND,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    "No replacement-package state exists for this Work/package.",
                    null);
        }
        ReplacementPackageState current = maybe.get();
        if (!current.isCommitted()) {
            return failure(
                    PublishFailureCode.COMMIT_REQUIRED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    "Commit Applied must succeed before Publish.",
                    current);
        }
        if (current.isPublished()) return Result.success(current);

        Core.ChangeSet legacy = core.getChangeSet(workId.value());
        if (legacy == null || !packageId.equals(legacy.lastPackageId)) {
            return failure(
                    PublishFailureCode.PACKAGE_IDENTITY_MISMATCH,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    "Durable ChangeSet no longer identifies this replacement package.",
                    current);
        }

        if (current.publication() instanceof PublicationObservation.NotConfirmed) {
            Result<ReplacementPackageState, PublishFailure> reconciled =
                    confirmBeforeRetry(current, legacy);
            if (reconciled.isFailure()) return reconciled;
            current = reconciled.success().orElseThrow();
            if (current.isPublished()) return Result.success(current);
        }

        // Persist the uncertainty guard before entering mechanics that may perform an external push.
        // If this write fails, no Publish side effect is allowed to begin.
        ReplacementPackageState attempting =
                current.withPublication(new PublicationObservation.NotConfirmed());
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, attempting);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    current);
        }

        Core.PublishResult published;
        try {
            published = core.publishAppliedCommit(workId.value());
        } catch (Core.ObsException e) {
            return resolveAfterPublishException(e, attempting, legacy);
        }

        Core.ChangeSet after = published.changeSet();
        if (after == null
                || after.commitSha == null
                || !Objects.equals(after.commitSha, attempting.commitSha())
                || !Objects.equals(after.publishedTip, attempting.commitSha())) {
            return failure(
                    PublishFailureCode.STATE_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    "Publish mechanics returned success without the exact committed tip being proven published.",
                    attempting);
        }

        ReplacementPackageState confirmed = attempting.withPublication(
                new PublicationObservation.ConfirmedTip(attempting.commitSha()));
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, confirmed);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            // Durable state is still the pre-side-effect NotConfirmed guard. Retry must confirm first.
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    attempting);
        }
        return Result.success(confirmed);
    }

    private Result<ReplacementPackageState, PublishFailure> confirmBeforeRetry(
            ReplacementPackageState current,
            Core.ChangeSet legacy) {
        Result<PublicationObservation, PublicationObserver.Failure> observed = observe(legacy);
        if (observed.isFailure()) {
            // current is already durably NotConfirmed; do not invent a stronger transient state.
            return failure(
                    PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN,
                    observed.failure().orElseThrow().message(),
                    current);
        }

        ReplacementPackageState confirmed = current.withPublication(observed.success().orElseThrow());
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, confirmed);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            // The observation happened, but durable continuity is still NotConfirmed.
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    current);
        }
        return Result.success(confirmed);
    }

    private Result<ReplacementPackageState, PublishFailure> resolveAfterPublishException(
            Core.ObsException error,
            ReplacementPackageState durableAttempting,
            Core.ChangeSet legacyBefore) {
        if (!Core.PUBLISH_FAILED.equals(error.code)
                && !Core.PUBLICATION_UNCERTAIN.equals(error.code)
                && !Core.REMOTE_BRANCH_DIVERGED.equals(error.code)) {
            PublishFailureCode code = Core.STATE_DIVERGED.equals(error.code)
                    ? PublishFailureCode.STATE_DIVERGED
                    : PublishFailureCode.UNEXPECTED_LEGACY_FAILURE;
            OperationFailureDisposition disposition =
                    code == PublishFailureCode.UNEXPECTED_LEGACY_FAILURE
                            ? OperationFailureDisposition.TERMINAL
                            : OperationFailureDisposition.ACTION_REQUIRED;
            return failure(code, disposition, error.getMessage(), durableAttempting);
        }

        Core.ChangeSet after = core.getChangeSet(durableAttempting.workId().value());
        Result<PublicationObservation, PublicationObserver.Failure> observed =
                observe(after != null ? after : legacyBefore);
        if (observed.isFailure()) {
            // NotConfirmed was persisted before the side-effect boundary, so restart remains safe.
            return failure(
                    PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN,
                    observed.failure().orElseThrow().message(),
                    durableAttempting);
        }

        PublicationObservation observation = observed.success().orElseThrow();
        ReplacementPackageState confirmed = durableAttempting.withPublication(observation);
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, confirmed);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    durableAttempting);
        }

        if (confirmed.isPublished()) {
            // The push response/path failed, but confirmation proved the intended external fact.
            return Result.success(confirmed);
        }

        boolean knownPrevious =
                observation instanceof PublicationObservation.ConfirmedAbsent
                || observation instanceof PublicationObservation.ConfirmedTip tip
                    && Objects.equals(tip.commitSha(), legacyBefore == null ? null : legacyBefore.publishedTip);

        if (Core.REMOTE_BRANCH_DIVERGED.equals(error.code) || !knownPrevious) {
            return failure(
                    PublishFailureCode.REMOTE_BRANCH_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    error.getMessage(),
                    confirmed);
        }

        return failure(
                PublishFailureCode.PUBLISH_FAILED,
                OperationFailureDisposition.RETRYABLE,
                error.getMessage(),
                confirmed);
    }

    private Result<PublicationObservation, PublicationObserver.Failure> observe(Core.ChangeSet state) {
        if (state == null || state.worktree == null || state.worktree.isBlank()
                || state.branch == null || state.branch.isBlank()) {
            return Result.failure(new PublicationObserver.Failure(
                    "Cannot confirm publication because worktree/work-branch identity is unavailable.",
                    null));
        }
        return observer.observe(Path.of(state.worktree), state.branch, state.repositoryIdentity);
    }

    private static Result<ReplacementPackageState, PublishFailure> failure(
            PublishFailureCode code,
            OperationFailureDisposition disposition,
            String message,
            ReplacementPackageState current) {
        return Result.failure(new PublishFailure(code, disposition, message, current));
    }
}

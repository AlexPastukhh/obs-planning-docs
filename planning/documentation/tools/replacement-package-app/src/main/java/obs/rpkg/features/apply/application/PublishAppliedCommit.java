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
        ReplacementPackageState current;
        Core.ChangeSet legacy;
        try {
            Optional<ReplacementPackageState> maybe =
                    ReplacementPackageStateAccess.loadOrMigrate(core, states, changeSetId, packageId);
            if (maybe.isEmpty()) {
                return failure(
                        PublishFailureCode.PACKAGE_STATE_NOT_FOUND,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        "No replacement-package state exists for this ChangeSet/package.",
                        null);
            }
            current = maybe.get();
            if (!current.isCommitted()) {
                return failure(
                        PublishFailureCode.COMMIT_REQUIRED,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        "Commit Applied must succeed before Publish.",
                        current);
            }
            if (current.isPublished()) return Result.success(current);

            legacy = core.getChangeSet(changeSetId);
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
                // Confirmed absent / another known tip means a fresh push may now be attempted safely.
            }

            Core.PublishResult published;
            try {
                published = core.publishAppliedCommit(changeSetId);
            } catch (Core.ObsException e) {
                return resolveAfterPublishException(e, current, legacy);
            }

            Core.ChangeSet after = published.changeSet();
            if (after == null
                    || after.commitSha == null
                    || !Objects.equals(after.commitSha, current.commitSha())
                    || !Objects.equals(after.publishedTip, current.commitSha())) {
                return failure(
                        PublishFailureCode.STATE_DIVERGED,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        "Publish mechanics returned success without the exact committed tip being proven published.",
                        current);
            }
            ReplacementPackageState confirmed = current.withPublication(
                    new PublicationObservation.ConfirmedTip(current.commitSha()));
            try {
                ReplacementPackageStateAccess.saveOrThrow(states, confirmed);
            } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
                return failure(
                        PublishFailureCode.STATE_PERSISTENCE_FAILED,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        e.getMessage(),
                        confirmed);
            }
            return Result.success(confirmed);
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

    private Result<ReplacementPackageState, PublishFailure> confirmBeforeRetry(
            ReplacementPackageState current,
            Core.ChangeSet legacy) {
        Result<PublicationObservation, PublicationObserver.Failure> observed = observe(legacy);
        if (observed.isFailure()) {
            ReplacementPackageState uncertain = current.withPublication(new PublicationObservation.NotConfirmed());
            saveBestEffort(uncertain);
            return failure(
                    PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN,
                    observed.failure().orElseThrow().message(),
                    uncertain);
        }

        ReplacementPackageState confirmed = current.withPublication(observed.success().orElseThrow());
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, confirmed);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    confirmed);
        }
        return Result.success(confirmed);
    }

    private Result<ReplacementPackageState, PublishFailure> resolveAfterPublishException(
            Core.ObsException error,
            ReplacementPackageState before,
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
            return failure(code, disposition, error.getMessage(), before);
        }

        Core.ChangeSet after = core.getChangeSet(before.changeSetId());
        Result<PublicationObservation, PublicationObserver.Failure> observed = observe(after != null ? after : legacyBefore);
        if (observed.isFailure()) {
            ReplacementPackageState uncertain = before.withPublication(new PublicationObservation.NotConfirmed());
            saveBestEffort(uncertain);
            return failure(
                    PublishFailureCode.PUBLICATION_CONFIRMATION_FAILED,
                    OperationFailureDisposition.UNCERTAIN,
                    observed.failure().orElseThrow().message(),
                    uncertain);
        }

        PublicationObservation observation = observed.success().orElseThrow();
        ReplacementPackageState confirmed = before.withPublication(observation);
        try {
            ReplacementPackageStateAccess.saveOrThrow(states, confirmed);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return failure(
                    PublishFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    e.getMessage(),
                    confirmed);
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

    private void saveBestEffort(ReplacementPackageState state) {
        try { states.save(state); } catch (RuntimeException ignored) {}
    }

    private static Result<ReplacementPackageState, PublishFailure> failure(
            PublishFailureCode code,
            OperationFailureDisposition disposition,
            String message,
            ReplacementPackageState current) {
        return Result.failure(new PublishFailure(code, disposition, message, current));
    }
}

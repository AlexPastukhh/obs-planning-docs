package obs.rpkg.features.apply.application;

import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.features.apply.domain.CommitAppliedFailure;
import obs.rpkg.features.apply.domain.CommitAppliedFailureCode;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.domain.WorkId;

/** Application service for the concrete Commit Applied operation. */
public final class CommitAppliedPackage {
    private final Core core;
    private final ReplacementPackageStateRepository states;

    public CommitAppliedPackage(Core core, ReplacementPackageStateRepository states) {
        this.core = Objects.requireNonNull(core, "core");
        this.states = Objects.requireNonNull(states, "states");
    }

    public Result<ReplacementPackageState, CommitAppliedFailure> execute(String changeSetId, String packageId) {
        WorkId workId = new WorkId(changeSetId);
        try (ReplacementPackageStateRepository.WorkLock ignored =
                     ReplacementPackageStateAccess.lockOrThrow(states, workId)) {
            return executeLocked(workId, packageId);
        } catch (ReplacementPackageStateAccess.StatePersistenceException e) {
            return Result.failure(new CommitAppliedFailure(
                    CommitAppliedFailureCode.STATE_PERSISTENCE_FAILED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage()));
        } catch (IllegalStateException e) {
            return Result.failure(new CommitAppliedFailure(
                    CommitAppliedFailureCode.STATE_DIVERGED,
                    OperationFailureDisposition.ACTION_REQUIRED, e.getMessage()));
        }
    }

    private Result<ReplacementPackageState, CommitAppliedFailure> executeLocked(
            WorkId workId,
            String packageId) {
        Optional<ReplacementPackageState> maybe =
                ReplacementPackageStateAccess.findOrThrow(states, workId, packageId);
        if (maybe.isEmpty()) {
            return Result.failure(new CommitAppliedFailure(
                    CommitAppliedFailureCode.PACKAGE_STATE_NOT_FOUND,
                    OperationFailureDisposition.ACTION_REQUIRED,
                    "No applied replacement-package state exists for this Work/package."));
        }
        ReplacementPackageState current = maybe.get();
        if (current.isCommitted()) return Result.success(current);

        try {
            Core.CommitResult committed = core.commitAppliedPackage(workId.value());
            ReplacementPackageState next = current.committed(committed.commitSha());
            ReplacementPackageStateAccess.saveOrThrow(states, next);
            return Result.success(next);
        } catch (Core.ObsException e) {
            ReplacementPackageState durableCurrent =
                    ReplacementPackageStateAccess.findOrThrow(states, workId, packageId).orElse(current);
            CommitAppliedFailureCode code = Core.COMMIT_FAILED.equals(e.code)
                    ? CommitAppliedFailureCode.COMMIT_FAILED
                    : Core.ACTION_PACKAGE_MISMATCH.equals(e.code)
                            ? CommitAppliedFailureCode.PACKAGE_IDENTITY_MISMATCH
                            : Core.STATE_DIVERGED.equals(e.code)
                                    ? CommitAppliedFailureCode.STATE_DIVERGED
                                    : CommitAppliedFailureCode.UNEXPECTED_LEGACY_FAILURE;
            OperationFailureDisposition disposition = code == CommitAppliedFailureCode.COMMIT_FAILED
                    ? OperationFailureDisposition.RETRYABLE
                    : code == CommitAppliedFailureCode.UNEXPECTED_LEGACY_FAILURE
                            ? OperationFailureDisposition.TERMINAL
                            : OperationFailureDisposition.ACTION_REQUIRED;
            return Result.failure(new CommitAppliedFailure(
                    code, disposition, e.getMessage(), durableCurrent));
        }
    }
}

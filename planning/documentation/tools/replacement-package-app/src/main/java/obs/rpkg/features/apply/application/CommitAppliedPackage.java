package obs.rpkg.features.apply.application;

import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.WorkPackageRuntime;
import obs.rpkg.features.apply.domain.CommitAppliedFailure;
import obs.rpkg.features.apply.domain.CommitAppliedFailureCode;
import obs.rpkg.features.apply.domain.OperationFailureDisposition;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.features.apply.infrastructure.ReplacementPackageStateRepository;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

/** Application service for the concrete Commit Applied operation. */
public final class CommitAppliedPackage {
    private final GitWorkspaceRepository workspaces;
    private final ReplacementPackageStateRepository states;
    private final WorkPackageRuntime mechanics;

    public CommitAppliedPackage(
            GitWorkspaceRepository workspaces,
            ReplacementPackageStateRepository states,
            WorkPackageRuntime mechanics) {
        this.workspaces = Objects.requireNonNull(workspaces, "workspaces");
        this.states = Objects.requireNonNull(states, "states");
        this.mechanics = Objects.requireNonNull(mechanics, "mechanics");
    }

    public Result<ReplacementPackageState, CommitAppliedFailure> execute(String changeSetId, String packageId) {
        WorkId workId = new WorkId(changeSetId);
        try (ReplacementPackageStateRepository.WorkLock ignored = states.lock(workId)) {
            Optional<GitWorkspace> workspace = workspaces.find(workId);
            if (workspace.isEmpty()) {
                return Result.failure(new CommitAppliedFailure(
                        CommitAppliedFailureCode.STATE_DIVERGED,
                        OperationFailureDisposition.ACTION_REQUIRED,
                        "GitWorkspace is missing for this Work."));
            }
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
                String commitSha = mechanics.commit(workspace.get(), current.packageIdentity());
                ReplacementPackageState next = current.committed(commitSha);
                ReplacementPackageStateAccess.saveOrThrow(states, next);
                return Result.success(next);
            } catch (Core.ObsException e) {
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
                        code, disposition, e.getMessage(), current));
            }
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
}

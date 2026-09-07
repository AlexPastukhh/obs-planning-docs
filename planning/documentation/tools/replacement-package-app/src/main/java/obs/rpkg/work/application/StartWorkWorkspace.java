package obs.rpkg.work.application;

import java.util.Objects;
import java.util.Optional;

import obs.rpkg.Core;
import obs.rpkg.WorkPackageRuntime;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.foundation.result.Result;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.application.port.WorkOperationLock;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.WorkId;

/** Application service for Start Work Workspace. No ChangeSet runtime authority is created. */
public final class StartWorkWorkspace {
    private final WorkPackageRuntime mechanics;
    private final GitWorkspaceRepository workspaces;
    private final WorkOperationLock workLocks;

    public StartWorkWorkspace(
            WorkPackageRuntime mechanics,
            GitWorkspaceRepository workspaces,
            WorkOperationLock workLocks) {
        this.mechanics = Objects.requireNonNull(mechanics, "mechanics");
        this.workspaces = Objects.requireNonNull(workspaces, "workspaces");
        this.workLocks = Objects.requireNonNull(workLocks, "workLocks");
    }

    public Result<Outcome, Failure> execute(
            Core.RepositoryConfig repositoryTarget,
            WorkId workId,
            String targetBranch) {
        Objects.requireNonNull(repositoryTarget, "repositoryTarget");
        Objects.requireNonNull(workId, "workId");
        try (WorkOperationLock.Lock ignored = workLocks.lock(workId)) {
            Optional<GitWorkspace> existing = workspaces.find(workId);
            if (existing.isPresent()) {
                GitWorkspace workspace = existing.get();
                if (!workspace.repositoryTarget().repositoryIdentity().equalsIgnoreCase(repositoryTarget.repositoryIdentity())
                        || !workspace.repositoryTarget().registeredPath().equals(java.nio.file.Path.of(repositoryTarget.path()).toAbsolutePath().normalize())
                        || !workspace.targetBranch().equals(targetBranch)) {
                    return Result.failure(new Failure("Existing Work workspace differs from requested Repository Target/target branch.", null));
                }
                mechanics.verifyWorkspace(workspace);
                mechanics.completeWorkspaceStart(workspace);
                return Result.success(new Outcome(workspace, true));
            }

            WorkPackageRuntime.WorkspaceStart started = mechanics.startWorkspace(repositoryTarget, workId, targetBranch);
            saveOrThrow(started.workspace());
            mechanics.completeWorkspaceStart(started.workspace());
            return Result.success(new Outcome(started.workspace(), started.recovered()));
        } catch (WorkOperationLock.LockException e) {
            return Result.failure(new Failure("Cannot serialize Start Work Workspace: " + e.getMessage(), e));
        } catch (RuntimeException e) {
            return Result.failure(new Failure(e.getMessage(), e));
        }
    }

    private void saveOrThrow(GitWorkspace workspace) {
        OperationResult<GitWorkspaceRepository.Failure> result = workspaces.save(workspace);
        if (result.isFailure()) {
            GitWorkspaceRepository.Failure failure = result.failure().orElseThrow();
            throw new IllegalStateException(failure.message(), failure.cause());
        }
    }

    public record Outcome(GitWorkspace workspace, boolean alreadySatisfied) {}
    public record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Start Work Workspace failed";
        }
    }
}

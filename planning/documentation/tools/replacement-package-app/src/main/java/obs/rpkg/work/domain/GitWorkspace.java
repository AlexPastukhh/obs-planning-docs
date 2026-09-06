package obs.rpkg.work.domain;

import java.nio.file.Path;
import java.util.Objects;

/** Durable Git execution facts for one Work. Package, review and finalization state do not belong here. */
public record GitWorkspace(
        WorkId workId,
        RepositoryTarget repositoryTarget,
        String targetBranch,
        Path worktree,
        String baseCommit) {

    public GitWorkspace {
        Objects.requireNonNull(workId, "workId");
        Objects.requireNonNull(repositoryTarget, "repositoryTarget");
        if (targetBranch == null || targetBranch.isBlank()) {
            throw new IllegalArgumentException("targetBranch is required");
        }
        Objects.requireNonNull(worktree, "worktree");
        worktree = worktree.toAbsolutePath().normalize();
        if (baseCommit == null || baseCommit.isBlank()) {
            throw new IllegalArgumentException("baseCommit is required");
        }
    }

    /** Branch is deterministic infrastructure naming, not separately persisted Domain state. */
    public String workBranch() {
        return "changeset/" + workId.value();
    }
}

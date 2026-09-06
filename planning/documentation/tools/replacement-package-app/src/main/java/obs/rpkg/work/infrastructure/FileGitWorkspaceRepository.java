package obs.rpkg.work.infrastructure;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;

import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.work.application.port.GitWorkspaceRepository;
import obs.rpkg.work.domain.GitWorkspace;
import obs.rpkg.work.domain.RepositoryTarget;
import obs.rpkg.work.domain.WorkId;

/** Durable owner for new-model GitWorkspace facts. */
public final class FileGitWorkspaceRepository implements GitWorkspaceRepository {
    private final Path directory;

    public FileGitWorkspaceRepository(Path appStateRoot) {
        if (appStateRoot == null) throw new IllegalArgumentException("appStateRoot is required");
        directory = appStateRoot.toAbsolutePath().normalize().resolve("work-state-v2").resolve("git-workspaces");
        try { Files.createDirectories(directory); }
        catch (IOException e) { throw new IllegalStateException("Cannot initialize Git workspace repository", e); }
    }

    public static FileGitWorkspaceRepository defaultRepository() {
        return new FileGitWorkspaceRepository(obs.rpkg.features.apply.infrastructure.FileReplacementPackageStateRepository.defaultAppStateRoot());
    }

    @Override
    public Optional<GitWorkspace> find(WorkId workId) {
        if (workId == null) throw new IllegalArgumentException("workId is required");
        Path path = path(workId);
        if (!Files.exists(path)) return Optional.empty();
        Properties p = new Properties();
        try (InputStream in = Files.newInputStream(path)) {
            p.load(in);
            if (!"1".equals(p.getProperty("schemaVersion"))) throw new IllegalStateException("Unsupported GitWorkspace schema");
            WorkId stored = new WorkId(required(p, "workId"));
            if (!stored.equals(workId)) throw new IllegalStateException("Persisted GitWorkspace identity does not match storage key");
            return Optional.of(new GitWorkspace(
                    stored,
                    new RepositoryTarget(required(p, "repositoryIdentity"), Path.of(required(p, "registeredPath"))),
                    required(p, "targetBranch"),
                    Path.of(required(p, "worktree")),
                    required(p, "baseCommit")));
        } catch (IOException | RuntimeException e) {
            throw new IllegalStateException("Cannot read GitWorkspace " + path.getFileName(), e);
        }
    }

    @Override
    public OperationResult<Failure> save(GitWorkspace workspace) {
        if (workspace == null) return OperationResult.failure(new Failure("GitWorkspace is required", null));
        try {
            Optional<GitWorkspace> existing = find(workspace.workId());
            if (existing.isPresent() && !existing.get().equals(workspace)) {
                return OperationResult.failure(new Failure("Work already has a different persisted GitWorkspace", null));
            }
            Properties p = new Properties();
            p.setProperty("schemaVersion", "1");
            p.setProperty("workId", workspace.workId().value());
            p.setProperty("repositoryIdentity", workspace.repositoryTarget().repositoryIdentity());
            p.setProperty("registeredPath", workspace.repositoryTarget().registeredPath().toString());
            p.setProperty("targetBranch", workspace.targetBranch());
            p.setProperty("worktree", workspace.worktree().toString());
            p.setProperty("baseCommit", workspace.baseCommit());
            Path target = path(workspace.workId());
            Path tmp = target.resolveSibling(target.getFileName() + ".tmp-" + UUID.randomUUID());
            try {
                Files.createDirectories(target.getParent());
                try (OutputStream out = Files.newOutputStream(tmp, StandardOpenOption.CREATE_NEW)) { p.store(out, "OBS GitWorkspace v1"); }
                try { Files.move(tmp, target, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING); }
                catch (AtomicMoveNotSupportedException e) { Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING); }
                return OperationResult.success();
            } catch (IOException e) {
                try { Files.deleteIfExists(tmp); } catch (IOException ignored) {}
                return OperationResult.failure(new Failure("Cannot persist GitWorkspace", e));
            }
        } catch (RuntimeException e) {
            return OperationResult.failure(new Failure(e.getMessage(), e));
        }
    }

    private Path path(WorkId workId) { return directory.resolve("w-" + workId.value() + ".properties"); }
    private static String required(Properties p, String key) {
        String value = p.getProperty(key);
        if (value == null || value.isBlank()) throw new IllegalStateException("Missing " + key);
        return value;
    }
}

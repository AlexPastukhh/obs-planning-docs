package obs.rpkg.features.apply.infrastructure;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;

import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.ReplacementPackageIdentity;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.OperationResult;
import obs.rpkg.work.application.port.WorkOperationLock;
import obs.rpkg.work.domain.WorkId;
import obs.rpkg.work.infrastructure.FileWorkOperationLock;

/** Dedicated durable owner for new-model replacement-package state. */
public final class FileReplacementPackageStateRepository implements ReplacementPackageStateRepository {
    private final Path stateDirectory;
    private final WorkOperationLock workLocks;

    public FileReplacementPackageStateRepository(Path appStateRoot) {
        this(appStateRoot, new FileWorkOperationLock(appStateRoot));
    }

    public FileReplacementPackageStateRepository(Path appStateRoot, WorkOperationLock workLocks) {
        if (appStateRoot == null) throw new IllegalArgumentException("appStateRoot is required");
        this.workLocks = java.util.Objects.requireNonNull(workLocks, "workLocks");
        Path v2 = appStateRoot.toAbsolutePath().normalize().resolve("work-state-v2");
        this.stateDirectory = v2.resolve("replacement-package-states");
        try { Files.createDirectories(stateDirectory); }
        catch (IOException e) { throw new IllegalStateException("Cannot initialize replacement-package state repository", e); }
    }

    public static FileReplacementPackageStateRepository defaultRepository() {
        return new FileReplacementPackageStateRepository(defaultAppStateRoot());
    }

    public static Path defaultAppStateRoot() {
        String forced = System.getenv("OBS_REPLACEMENT_PACKAGE_APP_STATE_ROOT");
        if (forced != null && !forced.isBlank()) return Path.of(forced);
        String local = System.getenv("LOCALAPPDATA");
        if (local != null && !local.isBlank()) return Path.of(local, "OBS", "ReplacementPackageApp");
        return Path.of(System.getProperty("user.home"), ".obs", "ReplacementPackageApp");
    }

    @Override
    public Optional<ReplacementPackageState> find(WorkId workId, String packageId) {
        requireWorkId(workId);
        validatePackageId(packageId);
        Path path = statePath(workId, packageId);
        if (!Files.exists(path)) return Optional.empty();
        ReplacementPackageState state = read(path);
        assertLookupIdentity(path, state, workId, packageId);
        return Optional.of(state);
    }

    @Override
    public Optional<ReplacementPackageState> findUnfinished(WorkId workId) {
        requireWorkId(workId);
        Path workDirectory = workDirectory(workId);
        if (!Files.isDirectory(workDirectory)) return Optional.empty();
        List<ReplacementPackageState> unfinished = new ArrayList<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(workDirectory, "p-*.properties")) {
            for (Path path : stream) {
                ReplacementPackageState state = read(path);
                assertLookupIdentity(path, state, workId, state.packageIdentity().packageId());
                if (!state.isPublished()) unfinished.add(state);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Cannot enumerate replacement-package state for Work " + workId, e);
        }
        if (unfinished.size() > 1) {
            throw new IllegalStateException("Work has more than one unfinished replacement package");
        }
        return unfinished.stream().findFirst();
    }

    @Override
    public OperationResult<Failure> save(ReplacementPackageState state) {
        if (state == null) return OperationResult.failure(new Failure("ReplacementPackageState is required", null));
        try (WorkOperationLock.Lock ignored = workLocks.lock(state.workId())) {
            if (!state.isPublished()) {
                Optional<ReplacementPackageState> existing = findUnfinished(state.workId());
                if (existing.isPresent()
                        && !existing.get().packageIdentity().packageId().equals(state.packageIdentity().packageId())) {
                    return OperationResult.failure(new Failure(
                            "Work already has a different unfinished replacement package: "
                                    + existing.get().packageIdentity().packageId(), null));
                }
            }

            Properties p = new Properties();
            p.setProperty("schemaVersion", "2");
            p.setProperty("workId", state.workId().value());
            p.setProperty("packageId", state.packageIdentity().packageId());
            p.setProperty("archiveSha256", state.packageIdentity().archiveSha256());
            if (state.commitSha() != null) p.setProperty("commitSha", state.commitSha());
            if (state.publication() instanceof PublicationObservation.NotRequested) {
                p.setProperty("publicationKind", "NOT_REQUESTED");
            } else if (state.publication() instanceof PublicationObservation.NotConfirmed) {
                p.setProperty("publicationKind", "NOT_CONFIRMED");
            } else if (state.publication() instanceof PublicationObservation.ConfirmedAbsent) {
                p.setProperty("publicationKind", "CONFIRMED_ABSENT");
            } else if (state.publication() instanceof PublicationObservation.ConfirmedTip tip) {
                p.setProperty("publicationKind", "CONFIRMED_TIP");
                p.setProperty("publicationTip", tip.commitSha());
            } else {
                return OperationResult.failure(new Failure("Unsupported publication observation", null));
            }

            Path target = statePath(state.workId(), state.packageIdentity().packageId());
            Path tmp = target.resolveSibling(target.getFileName() + ".tmp-" + UUID.randomUUID());
            try {
                Files.createDirectories(target.getParent());
                try (OutputStream out = Files.newOutputStream(tmp, StandardOpenOption.CREATE_NEW)) {
                    p.store(out, "OBS Replacement Package State v2");
                }
                try {
                    Files.move(tmp, target, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
                } catch (AtomicMoveNotSupportedException e) {
                    Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING);
                }
                return OperationResult.success();
            } catch (IOException e) {
                try { Files.deleteIfExists(tmp); } catch (IOException ignoredDelete) {}
                return OperationResult.failure(new Failure("Cannot persist replacement-package state", e));
            }
        } catch (RuntimeException e) {
            return OperationResult.failure(new Failure(e.getMessage(), e));
        }
    }

    private ReplacementPackageState read(Path path) {
        Properties p = new Properties();
        try (InputStream in = Files.newInputStream(path)) {
            p.load(in);
            if (!"2".equals(p.getProperty("schemaVersion"))) {
                throw new IllegalStateException("Unsupported replacement-package state schema");
            }
            String commitSha = blankToNull(p.getProperty("commitSha"));
            PublicationObservation publication = switch (required(p, "publicationKind")) {
                case "NOT_REQUESTED" -> new PublicationObservation.NotRequested();
                case "NOT_CONFIRMED" -> new PublicationObservation.NotConfirmed();
                case "CONFIRMED_ABSENT" -> new PublicationObservation.ConfirmedAbsent();
                case "CONFIRMED_TIP" -> new PublicationObservation.ConfirmedTip(required(p, "publicationTip"));
                default -> throw new IllegalStateException("Unsupported publication observation kind");
            };
            return new ReplacementPackageState(
                    new WorkId(required(p, "workId")),
                    new ReplacementPackageIdentity(required(p, "packageId"), required(p, "archiveSha256")),
                    commitSha, publication);
        } catch (IOException | RuntimeException e) {
            throw new IllegalStateException("Cannot read replacement-package state " + path.getFileName(), e);
        }
    }

    private void assertLookupIdentity(
            Path actualPath,
            ReplacementPackageState state,
            WorkId expectedWorkId,
            String expectedPackageId) {
        if (!state.workId().equals(expectedWorkId)
                || !state.packageIdentity().packageId().equals(expectedPackageId)
                || !actualPath.toAbsolutePath().normalize().equals(
                        statePath(expectedWorkId, expectedPackageId).toAbsolutePath().normalize())) {
            throw new IllegalStateException(
                    "Persisted replacement-package state identity does not match its storage key: "
                            + actualPath.getFileName());
        }
    }

    private Path workDirectory(WorkId workId) {
        return stateDirectory.resolve("w-" + workId.value());
    }

    private Path statePath(WorkId workId, String packageId) {
        requireWorkId(workId);
        validatePackageId(packageId);
        return workDirectory(workId).resolve("p-" + packageId + ".properties");
    }


    private static void requireWorkId(WorkId workId) {
        if (workId == null) throw new IllegalArgumentException("workId is required");
    }

    private static void validatePackageId(String packageId) {
        if (packageId == null || packageId.isBlank() || !packageId.matches("[A-Za-z0-9._-]+")) {
            throw new IllegalArgumentException("packageId is invalid");
        }
    }

    private static String required(Properties p, String key) {
        String value = p.getProperty(key);
        if (value == null || value.isBlank()) throw new IllegalStateException("Missing " + key);
        return value;
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }

}

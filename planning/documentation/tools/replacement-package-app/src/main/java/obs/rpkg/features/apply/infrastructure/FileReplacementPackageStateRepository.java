package obs.rpkg.features.apply.infrastructure;

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

import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.features.apply.domain.ReplacementPackageIdentity;
import obs.rpkg.features.apply.domain.ReplacementPackageState;
import obs.rpkg.foundation.result.OperationResult;

/** Dedicated durable owner for replacement-package state. */
public final class FileReplacementPackageStateRepository implements ReplacementPackageStateRepository {
    private final Path directory;

    public FileReplacementPackageStateRepository(Path appStateRoot) {
        if (appStateRoot == null) throw new IllegalArgumentException("appStateRoot is required");
        this.directory = appStateRoot.toAbsolutePath().normalize().resolve("replacement-package-states");
        try {
            Files.createDirectories(directory);
        } catch (IOException e) {
            throw new IllegalStateException("Cannot initialize replacement-package state repository", e);
        }
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
    public Optional<ReplacementPackageState> find(String changeSetId, String packageId) {
        validateKey(changeSetId, "changeSetId");
        validateKey(packageId, "packageId");
        Path path = path(changeSetId, packageId);
        if (!Files.exists(path)) return Optional.empty();
        Properties p = new Properties();
        try (InputStream in = Files.newInputStream(path)) {
            p.load(in);
            if (!"1".equals(p.getProperty("schemaVersion"))) {
                throw new IllegalStateException("Unsupported replacement-package state schema");
            }
            String archiveSha = blankToNull(p.getProperty("archiveSha256"));
            String commitSha = blankToNull(p.getProperty("commitSha"));
            PublicationObservation publication = switch (required(p, "publicationKind")) {
                case "NOT_REQUESTED" -> new PublicationObservation.NotRequested();
                case "NOT_CONFIRMED" -> new PublicationObservation.NotConfirmed();
                case "CONFIRMED_ABSENT" -> new PublicationObservation.ConfirmedAbsent();
                case "CONFIRMED_TIP" -> new PublicationObservation.ConfirmedTip(required(p, "publicationTip"));
                default -> throw new IllegalStateException("Unsupported publication observation kind");
            };
            return Optional.of(new ReplacementPackageState(
                    required(p, "changeSetId"),
                    new ReplacementPackageIdentity(required(p, "packageId"), archiveSha),
                    Boolean.parseBoolean(required(p, "applied")),
                    commitSha,
                    publication));
        } catch (IOException | RuntimeException e) {
            throw new IllegalStateException("Cannot read replacement-package state " + path.getFileName(), e);
        }
    }

    @Override
    public OperationResult<Failure> save(ReplacementPackageState state) {
        if (state == null) return OperationResult.failure(new Failure("ReplacementPackageState is required", null));
        Properties p = new Properties();
        p.setProperty("schemaVersion", "1");
        p.setProperty("changeSetId", state.changeSetId());
        p.setProperty("packageId", state.packageIdentity().packageId());
        if (state.packageIdentity().archiveSha256() != null) {
            p.setProperty("archiveSha256", state.packageIdentity().archiveSha256());
        }
        p.setProperty("applied", Boolean.toString(state.applied()));
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

        Path target = path(state.changeSetId(), state.packageIdentity().packageId());
        Path tmp = target.resolveSibling(target.getFileName() + ".tmp-" + UUID.randomUUID());
        try {
            Files.createDirectories(target.getParent());
            try (OutputStream out = Files.newOutputStream(tmp, StandardOpenOption.CREATE_NEW)) {
                p.store(out, "OBS Replacement Package State");
            }
            try {
                Files.move(tmp, target, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
            } catch (AtomicMoveNotSupportedException e) {
                Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING);
            }
            return OperationResult.success();
        } catch (IOException e) {
            try { Files.deleteIfExists(tmp); } catch (IOException ignored) {}
            return OperationResult.failure(new Failure("Cannot persist replacement-package state", e));
        }
    }

    private Path path(String changeSetId, String packageId) {
        return directory.resolve(changeSetId + "--" + packageId + ".properties");
    }

    private static void validateKey(String value, String name) {
        if (value == null || value.isBlank() || !value.matches("[A-Za-z0-9._-]+")) {
            throw new IllegalArgumentException(name + " is invalid");
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

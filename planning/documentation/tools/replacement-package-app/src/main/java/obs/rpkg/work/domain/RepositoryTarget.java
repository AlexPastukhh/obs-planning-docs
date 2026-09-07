package obs.rpkg.work.domain;

import java.nio.file.Path;
import java.util.Objects;

/** Exact registered repository target value. */
public record RepositoryTarget(String repositoryIdentity, Path registeredPath) {
    public RepositoryTarget {
        if (repositoryIdentity == null || repositoryIdentity.isBlank()) {
            throw new IllegalArgumentException("repositoryIdentity is required");
        }
        Objects.requireNonNull(registeredPath, "registeredPath");
        registeredPath = registeredPath.toAbsolutePath().normalize();
    }
}

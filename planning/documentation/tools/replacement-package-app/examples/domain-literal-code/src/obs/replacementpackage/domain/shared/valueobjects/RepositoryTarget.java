package obs.replacementpackage.domain.shared.valueobjects;

import java.util.Objects;

/**
 * Value Object: exact repository identity together with its registered local path.
 * Equality is structural across both fields; there is no independent RepositoryTarget identity/lifecycle.
 */
public record RepositoryTarget(
        RepositoryIdentity repositoryIdentity,
        RegisteredRepositoryPath registeredPath) {
    public RepositoryTarget {
        Objects.requireNonNull(repositoryIdentity);
        Objects.requireNonNull(registeredPath);
    }

    public static RepositoryTarget create(
            RepositoryIdentity repositoryIdentity,
            RegisteredRepositoryPath registeredPath) {
        return new RepositoryTarget(repositoryIdentity, registeredPath);
    }

    public boolean requireCurrentLocalPath(CanonicalPath observedCanonicalPath) {
        return registeredPath.canonicalPath().equals(Objects.requireNonNull(observedCanonicalPath));
    }
}

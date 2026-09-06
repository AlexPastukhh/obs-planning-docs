package obs.replacementpackage.domain.replacementpackage;

import obs.replacementpackage.domain.errors.InvalidPackageOperation;
import java.util.Objects;
import java.util.Optional;

/** Aggregate-local Value Object. PackagePath is a uniqueness key, not Entity identity. */
public record PackageOperation(
        PackagePath path,
        Action action,
        Optional<FileBytes> expectedBase,
        Optional<FileBytes> replacement) {

    public PackageOperation {
        Objects.requireNonNull(path);
        Objects.requireNonNull(action);
        expectedBase = Objects.requireNonNull(expectedBase);
        replacement = Objects.requireNonNull(replacement);
        boolean valid = switch (action) {
            case ADD -> expectedBase.isEmpty() && replacement.isPresent();
            case REPLACE -> expectedBase.isPresent() && replacement.isPresent();
            case DELETE -> expectedBase.isPresent() && replacement.isEmpty();
        };
        if (!valid) throw new InvalidPackageOperation("payload shape does not match action");
    }

    public static PackageOperation add(PackagePath path, FileBytes replacement) {
        return new PackageOperation(path, Action.ADD, Optional.empty(), Optional.of(Objects.requireNonNull(replacement)));
    }

    public static PackageOperation replace(PackagePath path, FileBytes expectedBase, FileBytes replacement) {
        return new PackageOperation(path, Action.REPLACE, Optional.of(Objects.requireNonNull(expectedBase)), Optional.of(Objects.requireNonNull(replacement)));
    }

    public static PackageOperation delete(PackagePath path, FileBytes expectedBase) {
        return new PackageOperation(path, Action.DELETE, Optional.of(Objects.requireNonNull(expectedBase)), Optional.empty());
    }
}

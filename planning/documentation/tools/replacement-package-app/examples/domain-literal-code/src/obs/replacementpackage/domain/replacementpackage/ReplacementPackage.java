package obs.replacementpackage.domain.replacementpackage;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

public final class ReplacementPackage {
    private final PackageId packageId;
    private final ChangeSetId changeSetId;
    private final RepositoryIdentity repositoryIdentity;
    private final CommitId expectedSource;
    private final List<PackageOperation> operations;
    private final Map<PackagePath, PackageOperation> byPath;

    private ReplacementPackage(
            PackageId packageId,
            ChangeSetId changeSetId,
            RepositoryIdentity repositoryIdentity,
            CommitId expectedSource,
            List<PackageOperation> operations) {
        this.packageId = Objects.requireNonNull(packageId);
        this.changeSetId = Objects.requireNonNull(changeSetId);
        this.repositoryIdentity = Objects.requireNonNull(repositoryIdentity);
        this.expectedSource = Objects.requireNonNull(expectedSource);
        this.operations = List.copyOf(operations);
        LinkedHashMap<PackagePath, PackageOperation> map = new LinkedHashMap<>();
        for (PackageOperation operation : operations) {
            if (map.putIfAbsent(operation.path(), operation) != null) throw new DuplicatePackagePath();
        }
        this.byPath = Map.copyOf(map);
    }

    public static ReplacementPackage createValidatedPackage(
            PackageId packageId,
            ChangeSetId changeSetId,
            RepositoryIdentity repositoryIdentity,
            CommitId expectedSource,
            List<PackageOperation> operations) {
        Objects.requireNonNull(operations);
        return new ReplacementPackage(packageId, changeSetId, repositoryIdentity, expectedSource, operations);
    }

    public Optional<PackageOperation> operationFor(PackagePath path) {
        return Optional.ofNullable(byPath.get(path));
    }

    public PackageId packageId() { return packageId; }
    public ChangeSetId changeSetId() { return changeSetId; }
    public RepositoryIdentity repositoryIdentity() { return repositoryIdentity; }
    public CommitId expectedSource() { return expectedSource; }
    public List<PackageOperation> operations() { return operations; }
}

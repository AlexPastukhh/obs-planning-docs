package obs.replacementpackage.domain.replacementpackage;

import java.util.*;
import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.errors.*;
import obs.replacementpackage.domain.testing.*;
import obs.replacementpackage.domain.repositorywork.*;
import obs.replacementpackage.domain.workissue.*;
import obs.replacementpackage.domain.replacementpackage.*;
import obs.replacementpackage.domain.packagereview.*;
import obs.replacementpackage.domain.packageapplication.*;
import obs.replacementpackage.domain.workfinalization.*;
import obs.replacementpackage.domain.snapshotexport.*;
import obs.replacementpackage.domain.externalinteraction.*;

public final class ReplacementPackageTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        ReplacementPackageTest test = new ReplacementPackageTest();
        runner.run("package_rejects_duplicate_operation_paths", test::package_rejects_duplicate_operation_paths);
        runner.run("each_exact_package_path_resolves_to_its_single_corresponding_operation", test::each_exact_package_path_resolves_to_its_single_corresponding_operation);
        runner.run("replace_operation_contains_exact_expected_base_and_complete_replacement_bytes", test::replace_operation_contains_exact_expected_base_and_complete_replacement_bytes);
        runner.run("add_and_delete_operations_have_only_the_payloads_allowed_by_their_action", test::add_and_delete_operations_have_only_the_payloads_allowed_by_their_action);
    }

    private void package_rejects_duplicate_operation_paths() {
        throwsType(DuplicatePackagePath.class, () -> ReplacementPackage.createValidatedPackage(
                pkg("pkg-1"), cs("cs-1"), repo(), commit("1111"),
                List.of(PackageOperation.add(path("a.txt"), bytes("new")),
                        PackageOperation.delete(path("a.txt"), bytes("old")))));
    }

    private void each_exact_package_path_resolves_to_its_single_corresponding_operation() {
        ReplacementPackage p = packageWith(
                PackageOperation.add(path("a.txt"), bytes("A")),
                PackageOperation.delete(path("b.txt"), bytes("B")));
        equal(Action.DELETE, p.operationFor(path("b.txt")).orElseThrow().action());
        isTrue(p.operationFor(path("missing.txt")).isEmpty());
    }

    private void replace_operation_contains_exact_expected_base_and_complete_replacement_bytes() {
        PackageOperation op = PackageOperation.replace(path("a.txt"), bytes("old\n"), bytes("new\n"));
        equal(bytes("old\n"), op.expectedBase().orElseThrow());
        equal(bytes("new\n"), op.replacement().orElseThrow());
        equal(op, PackageOperation.replace(path("a.txt"), bytes("old\n"), bytes("new\n")));
    }

    private void add_and_delete_operations_have_only_the_payloads_allowed_by_their_action() {
        PackageOperation add = PackageOperation.add(path("a.txt"), bytes("new"));
        PackageOperation del = PackageOperation.delete(path("b.txt"), bytes("old"));
        isTrue(add.expectedBase().isEmpty());
        isTrue(add.replacement().isPresent());
        isTrue(del.expectedBase().isPresent());
        isTrue(del.replacement().isEmpty());
    }
}

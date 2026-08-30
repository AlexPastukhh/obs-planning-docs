package obs.rpkgcommon;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

public final class PackageStateApplierTests {
    public static void main(String[] args) throws Exception {
        testMixedApplyAndCommit();
        testCloseRollsBackExactState();
        testPreflightFailureDoesNotMutate();
        testVerifierFailureDoesNotMutate();
        testMutationFailureRollsBackAllTouchedPaths();
        testOperationShapeValidation();
        System.out.println("PackageStateApplierTests PASS");
    }

    private static void testMixedApplyAndCommit() throws Exception {
        Path root = Files.createTempDirectory("rpkg-common-mixed-");
        byte[] oldReplace = bytes("old replace");
        byte[] newReplace = bytes("new replace");
        byte[] oldDelete = new byte[] {0, 1, (byte) 0xff, 10};
        byte[] added = new byte[] {9, 8, 7, 0};
        Files.write(root.resolve("replace.bin"), oldReplace);
        Files.write(root.resolve("delete.bin"), oldDelete);

        List<PackageStateApplier.Operation> operations = List.of(
                op("add.bin", root, PackageStateApplier.Action.ADD, null, added),
                op("replace.bin", root, PackageStateApplier.Action.REPLACE, oldReplace, newReplace),
                op("delete.bin", root, PackageStateApplier.Action.DELETE, oldDelete, null));

        try (PackageStateApplier.AppliedChange change = PackageStateApplier.apply(
                operations, PackageStateApplierTests::verifyRaw)) {
            check(Arrays.equals(Files.readAllBytes(root.resolve("add.bin")), added), "add result");
            check(Arrays.equals(Files.readAllBytes(root.resolve("replace.bin")), newReplace), "replace result");
            check(!Files.exists(root.resolve("delete.bin")), "delete result");
            change.commit();
        }
        check(Arrays.equals(Files.readAllBytes(root.resolve("add.bin")), added), "committed add");
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.bin")), newReplace), "committed replace");
        check(!Files.exists(root.resolve("delete.bin")), "committed delete");
    }

    private static void testCloseRollsBackExactState() throws Exception {
        Path root = Files.createTempDirectory("rpkg-common-rollback-");
        byte[] original = new byte[] {0, 13, 10, (byte) 0xfe};
        Files.write(root.resolve("replace.bin"), original);
        Files.write(root.resolve("delete.txt"), bytes("delete me"));

        try (PackageStateApplier.AppliedChange ignored = PackageStateApplier.apply(List.of(
                op("added.txt", root, PackageStateApplier.Action.ADD, null, bytes("new")),
                op("replace.bin", root, PackageStateApplier.Action.REPLACE, original, bytes("changed")),
                op("delete.txt", root, PackageStateApplier.Action.DELETE, bytes("delete me"), null)),
                PackageStateApplierTests::verifyRaw)) {
            // No commit: close must restore the exact prior state.
        }

        check(!Files.exists(root.resolve("added.txt")), "rollback removes add");
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.bin")), original), "rollback replace bytes");
        check(Arrays.equals(Files.readAllBytes(root.resolve("delete.txt")), bytes("delete me")), "rollback delete bytes");
    }

    private static void testPreflightFailureDoesNotMutate() throws Exception {
        Path root = Files.createTempDirectory("rpkg-common-preflight-");
        Files.write(root.resolve("existing.txt"), bytes("important"));
        Files.write(root.resolve("replace.txt"), bytes("old"));
        List<PackageStateApplier.Operation> operations = List.of(
                op("replace.txt", root, PackageStateApplier.Action.REPLACE, bytes("old"), bytes("new")),
                op("existing.txt", root, PackageStateApplier.Action.ADD, null, bytes("bad")));
        expectReason(PackageStateApplier.FailureReason.ADD_TARGET_EXISTS,
                () -> PackageStateApplier.prepare(operations, PackageStateApplierTests::verifyRaw));
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.txt")), bytes("old")), "preflight replace unchanged");
        check(Arrays.equals(Files.readAllBytes(root.resolve("existing.txt")), bytes("important")), "preflight existing unchanged");
    }

    private static void testVerifierFailureDoesNotMutate() throws Exception {
        Path root = Files.createTempDirectory("rpkg-common-verifier-");
        Files.write(root.resolve("replace.txt"), bytes("actual"));
        try {
            PackageStateApplier.prepare(List.of(
                    op("replace.txt", root, PackageStateApplier.Action.REPLACE, bytes("expected"), bytes("new"))),
                    PackageStateApplierTests::verifyRaw);
            throw new AssertionError("expected verifier rejection");
        } catch (SourceChanged expected) {
            // Expected.
        }
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.txt")), bytes("actual")), "verifier leaves source unchanged");
    }

    private static void testMutationFailureRollsBackAllTouchedPaths() throws Exception {
        Path root = Files.createTempDirectory("rpkg-common-mutation-failure-");
        byte[] deletedBase = bytes("delete base");
        Files.write(root.resolve("delete.txt"), deletedBase);
        List<PackageStateApplier.Operation> operations = List.of(
                op("added.txt", root, PackageStateApplier.Action.ADD, null, bytes("added")),
                op("delete.txt", root, PackageStateApplier.Action.DELETE, deletedBase, null));

        PackageStateApplier.PreparedChange prepared = PackageStateApplier.prepare(
                operations, PackageStateApplierTests::verifyRaw);
        Files.delete(root.resolve("delete.txt"));
        expectReason(PackageStateApplier.FailureReason.MUTATION_FAILED, prepared::apply);

        check(!Files.exists(root.resolve("added.txt")), "failed mutation rolls back prior add");
        check(Arrays.equals(Files.readAllBytes(root.resolve("delete.txt")), deletedBase),
                "failed mutation restores captured delete source");
    }

    private static void testOperationShapeValidation() throws Exception {
        Path root = Files.createTempDirectory("rpkg-common-shape-");
        try {
            op("bad.txt", root, PackageStateApplier.Action.DELETE, null, null);
            throw new AssertionError("expected invalid delete shape");
        } catch (IllegalArgumentException expected) {
            // Expected.
        }
    }

    private static PackageStateApplier.Operation op(
            String path, Path root, PackageStateApplier.Action action, byte[] base, byte[] replacement) {
        return new PackageStateApplier.Operation(path, root.resolve(path), action, base, replacement);
    }

    private static void verifyRaw(String path, byte[] expected, byte[] actual) {
        if (!Arrays.equals(expected, actual)) throw new SourceChanged(path);
    }

    private static byte[] bytes(String value) { return value.getBytes(StandardCharsets.UTF_8); }

    private static void check(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    private static void expectReason(PackageStateApplier.FailureReason reason, ThrowingRunnable action) throws Exception {
        try {
            action.run();
            throw new AssertionError("expected " + reason);
        } catch (PackageStateApplier.ApplyException e) {
            check(e.reason() == reason, "expected " + reason + " but got " + e.reason());
        }
    }

    private static final class SourceChanged extends RuntimeException {
        SourceChanged(String path) { super(path); }
    }

    @FunctionalInterface
    private interface ThrowingRunnable { void run() throws Exception; }
}

package obs.rpkgbuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public final class StateAdvancerTests {
    private static final UUID PACKAGE_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");
    private static final UUID CHANGE_SET_ID = UUID.fromString("22222222-2222-2222-2222-222222222222");

    public static void main(String[] args) throws Exception {
        testAdvancesMixedPackageExactBytes();
        testPackageIdMismatchDoesNotMutate();
        testBaseMismatchDoesNotMutate();
        testInvalidPackageDoesNotMutate();
        testCaseVariantAddTargetRejected();
        testCaseVariantReplaceUsesExistingTarget();
        testAmbiguousCaseCollisionRejected();
        testCliParsesAdvanceState();
        System.out.println("StateAdvancerTests PASS");
    }

    private static void testAdvancesMixedPackageExactBytes() throws Exception {
        Path root = Files.createTempDirectory("pb03-state-");
        byte[] replaceBase = new byte[] {0, 13, 10, (byte) 0xff};
        byte[] replaceResult = new byte[] {9, 8, 0, 7};
        byte[] deleteBase = bytes("obsolete");
        byte[] addResult = bytes("added");
        Files.createDirectories(root.resolve("dir"));
        Files.write(root.resolve("dir/replace.bin"), replaceBase);
        Files.write(root.resolve("delete.txt"), deleteBase);

        Path archive = packageZip(List.of(
                op("added.txt", "add", null, addResult),
                op("dir/replace.bin", "replace", replaceBase, replaceResult),
                op("delete.txt", "delete", deleteBase, null)), false);

        StateAdvancer.AdvanceResult result = StateAdvancer.advance(
                new StateAdvancer.AdvanceRequest(root, archive, PACKAGE_ID));

        check(result.packageId().equals(PACKAGE_ID), "package id");
        check(result.changeSetId().equals(CHANGE_SET_ID), "change set id");
        check(result.repositoryIdentity().equals("github:Example/Repo"), "repository identity");
        check(result.addCount() == 1 && result.replaceCount() == 1 && result.deleteCount() == 1, "counts");
        check(Arrays.equals(Files.readAllBytes(root.resolve("added.txt")), addResult), "add bytes");
        check(Arrays.equals(Files.readAllBytes(root.resolve("dir/replace.bin")), replaceResult), "replace bytes");
        check(!Files.exists(root.resolve("delete.txt")), "delete result");
    }

    private static void testPackageIdMismatchDoesNotMutate() throws Exception {
        Path root = Files.createTempDirectory("pb03-package-id-");
        Files.write(root.resolve("replace.txt"), bytes("old"));
        Path archive = packageZip(List.of(op("replace.txt", "replace", bytes("old"), bytes("new"))), false);
        expectReason(StateAdvancer.ValidationReason.PACKAGE_ID_MISMATCH,
                () -> StateAdvancer.advance(new StateAdvancer.AdvanceRequest(
                        root, archive, UUID.fromString("33333333-3333-3333-3333-333333333333"))));
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.txt")), bytes("old")),
                "package mismatch leaves state unchanged");
    }

    private static void testBaseMismatchDoesNotMutate() throws Exception {
        Path root = Files.createTempDirectory("pb03-base-mismatch-");
        Files.write(root.resolve("replace.txt"), bytes("actual"));
        Path archive = packageZip(List.of(op("replace.txt", "replace", bytes("expected"), bytes("new"))), false);
        expectReason(StateAdvancer.ValidationReason.STATE_MISMATCH,
                () -> StateAdvancer.advance(new StateAdvancer.AdvanceRequest(root, archive, PACKAGE_ID)));
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.txt")), bytes("actual")),
                "base mismatch leaves state unchanged");
    }

    private static void testInvalidPackageDoesNotMutate() throws Exception {
        Path root = Files.createTempDirectory("pb03-invalid-package-");
        Files.write(root.resolve("replace.txt"), bytes("old"));
        Path archive = packageZip(List.of(op("replace.txt", "replace", bytes("old"), bytes("new"))), true);
        expectReason(StateAdvancer.ValidationReason.PACKAGE_INVALID,
                () -> StateAdvancer.advance(new StateAdvancer.AdvanceRequest(root, archive, PACKAGE_ID)));
        check(Arrays.equals(Files.readAllBytes(root.resolve("replace.txt")), bytes("old")),
                "invalid package leaves state unchanged");
    }

    private static void testCaseVariantAddTargetRejected() throws Exception {
        Path root = Files.createTempDirectory("pb03-case-add-");
        Files.write(root.resolve("FOO.txt"), bytes("old"));
        Path archive = packageZip(List.of(op("foo.txt", "add", null, bytes("new"))), false);

        expectReason(StateAdvancer.ValidationReason.STATE_MISMATCH,
                () -> StateAdvancer.advance(new StateAdvancer.AdvanceRequest(root, archive, PACKAGE_ID)));

        check(Arrays.equals(Files.readAllBytes(root.resolve("FOO.txt")), bytes("old")),
                "case-variant add preserves existing bytes");
        check(!Files.exists(root.resolve("foo.txt")),
                "case-variant add must not create a second host-only path");
    }

    private static void testCaseVariantReplaceUsesExistingTarget() throws Exception {
        Path root = Files.createTempDirectory("pb03-case-replace-");
        Files.createDirectories(root.resolve("DIR"));
        Files.write(root.resolve("DIR/FILE.txt"), bytes("old"));
        Path archive = packageZip(List.of(op("dir/file.txt", "replace", bytes("old"), bytes("new"))), false);

        StateAdvancer.advance(new StateAdvancer.AdvanceRequest(root, archive, PACKAGE_ID));

        check(Arrays.equals(Files.readAllBytes(root.resolve("DIR/FILE.txt")), bytes("new")),
                "case-variant replace updates the Windows-equivalent target");
        check(!Files.exists(root.resolve("dir")),
                "case-variant replace must not create a second host-only ancestor");
    }

    private static void testAmbiguousCaseCollisionRejected() throws Exception {
        Path root = Files.createTempDirectory("pb03-case-ambiguous-");
        Files.write(root.resolve("FOO.txt"), bytes("upper"));
        Files.write(root.resolve("foo.txt"), bytes("lower"));
        Path archive = packageZip(List.of(op("Foo.txt", "replace", bytes("upper"), bytes("new"))), false);

        expectReason(StateAdvancer.ValidationReason.UNSUPPORTED_STATE_PATH,
                () -> StateAdvancer.advance(new StateAdvancer.AdvanceRequest(root, archive, PACKAGE_ID)));

        check(Arrays.equals(Files.readAllBytes(root.resolve("FOO.txt")), bytes("upper")),
                "ambiguous case collision preserves upper entry");
        check(Arrays.equals(Files.readAllBytes(root.resolve("foo.txt")), bytes("lower")),
                "ambiguous case collision preserves lower entry");
    }

    private static void testCliParsesAdvanceState() {
        StateAdvancer.AdvanceRequest request = Main.parseAdvanceRequest(new String[] {
                "--state", "state-dir",
                "--package", "change.zip",
                "--expected-package-id", PACKAGE_ID.toString()
        });
        check(request.stateRoot().equals(Path.of("state-dir")), "CLI state");
        check(request.packageArchive().equals(Path.of("change.zip")), "CLI package");
        check(request.expectedPackageId().equals(PACKAGE_ID), "CLI package id");
    }

    private record Op(String path, String action, byte[] base, byte[] replacement) {}

    private static Op op(String path, String action, byte[] base, byte[] replacement) {
        return new Op(path, action, base, replacement);
    }

    private static Path packageZip(List<Op> operations, boolean extraPayload) throws IOException {
        Path archive = Files.createTempFile("pb03-package-", ".zip");
        StringBuilder manifest = new StringBuilder();
        manifest.append("{\n")
                .append("  \"schemaVersion\": 1,\n")
                .append("  \"packageId\": \"").append(PACKAGE_ID).append("\",\n")
                .append("  \"changeSetId\": \"").append(CHANGE_SET_ID).append("\",\n")
                .append("  \"changeSetLabel\": \"PB-03 test\",\n")
                .append("  \"repositoryIdentity\": \"github:Example/Repo\",\n")
                .append("  \"operations\": [\n");
        for (int i = 0; i < operations.size(); i++) {
            Op op = operations.get(i);
            manifest.append("    {\"path\":\"").append(op.path()).append("\",\"action\":\"")
                    .append(op.action()).append("\"}");
            if (i + 1 < operations.size()) manifest.append(',');
            manifest.append('\n');
        }
        manifest.append("  ]\n}\n");

        try (ZipOutputStream zip = new ZipOutputStream(Files.newOutputStream(archive), StandardCharsets.UTF_8)) {
            write(zip, "PACKAGE.json", manifest.toString().getBytes(StandardCharsets.UTF_8));
            for (Op op : operations) {
                if (op.base() != null) write(zip, "base-files/" + op.path(), op.base());
                if (op.replacement() != null) write(zip, "replacement-files/" + op.path(), op.replacement());
            }
            if (extraPayload) write(zip, "replacement-files/undeclared.txt", bytes("bad"));
        }
        return archive;
    }

    private static void write(ZipOutputStream zip, String name, byte[] bytes) throws IOException {
        zip.putNextEntry(new ZipEntry(name));
        zip.write(bytes);
        zip.closeEntry();
    }

    private static byte[] bytes(String text) { return text.getBytes(StandardCharsets.UTF_8); }

    private static void expectReason(StateAdvancer.ValidationReason reason, ThrowingRunnable action) throws Exception {
        try {
            action.run();
            throw new AssertionError("expected " + reason);
        } catch (StateAdvancer.ValidationException e) {
            check(e.reason() == reason, "expected " + reason + " but got " + e.reason());
        }
    }

    private static void check(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    @FunctionalInterface
    private interface ThrowingRunnable { void run() throws Exception; }
}

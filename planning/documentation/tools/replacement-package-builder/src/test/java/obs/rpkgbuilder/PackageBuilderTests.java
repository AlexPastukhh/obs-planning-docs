package obs.rpkgbuilder;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.zip.ZipFile;

public final class PackageBuilderTests {
    private static final UUID PACKAGE_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");
    private static final UUID CHANGE_SET_ID = UUID.fromString("22222222-2222-2222-2222-222222222222");

    public static void main(String[] args) throws Exception {
        testBuildsAddReplaceAndOmitsUnchanged();
        testPreservesExactBinaryPayloads();
        testDeterministicWithExplicitIds();
        testBuildsDeleteOnlyWithExactBase();
        testCombinesDesiredAndDelete();
        testRejectsMissingDeleteTarget();
        testRejectsDeleteDesiredCollision();
        testCliAcceptsRepeatedDeletesWithoutDesired();
        testRejectsInvalidPaths();
        testRejectsPathCollision();
        testRejectsDesiredAndOutputInsideRepository();
        testRejectsDesiredContainingRepository();
        testRejectsOutputInsideDesired();
        testRejectsExistingOutputWithoutOverwrite();
        testRejectsRepositorySubdirectory();
        testDetectsDesiredChangeAfterCapture();
        testPrivateStagingWriteFailureIsInternal();
        testPrivateStagingVerificationFailureIsInternal();
        testRejectsUnsupportedSourceFileType();
        testRejectsNonDirectorySourceAncestor();
        testRejectsUnsupportedRepositoryOrigin();
        testRejectsNoOpOnlyBuild();
        testRejectsInvalidRequest();
        testCliParsingFailuresAreValidation();
        testInternalFailureRendering();
        testValidationFailureRendering();
        testRepositoryIdentityParsing();
        System.out.println("PackageBuilderTests PASS");
    }

    private static void testBuildsAddReplaceAndOmitsUnchanged() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.repo.resolve("replace.txt"), "old\r\nbytes");
        write(t.repo.resolve("same.txt"), "same");
        write(t.desired.resolve("replace.txt"), "new\nbytes");
        write(t.desired.resolve("same.txt"), "same");
        write(t.desired.resolve("nested/add.txt"), "added");

        Path out = t.root.resolve("one.zip");
        PackageBuilder.BuildResult result = PackageBuilder.build(request(t, out));
        check(result.addCount() == 1, "expected one add");
        check(result.replaceCount() == 1, "expected one replace");
        check(result.noOpCount() == 1, "expected one no-op");
        check(result.repositoryIdentity().equals("github:Example/Repo"), "repository identity");

        try (ZipFile zip = new ZipFile(out.toFile(), StandardCharsets.UTF_8)) {
            String manifest = new String(zip.getInputStream(zip.getEntry("PACKAGE.json")).readAllBytes(), StandardCharsets.UTF_8);
            check(manifest.contains("{\"path\":\"nested/add.txt\",\"action\":\"add\"}"), "add manifest");
            check(manifest.contains("{\"path\":\"replace.txt\",\"action\":\"replace\"}"), "replace manifest");
            check(!manifest.contains("same.txt"), "unchanged omitted");
            check(zip.getEntry("base-files/nested/add.txt") == null, "add has no base");
            check(zip.getEntry("base-files/replace.txt") != null, "replace has base");
            check(zip.getEntry("replacement-files/nested/add.txt") != null, "add has replacement");
            check(zip.getEntry("replacement-files/replace.txt") != null, "replace has replacement");
        }
    }

    private static void testPreservesExactBinaryPayloads() throws Exception {
        TestRepo t = TestRepo.create();
        byte[] base = new byte[] {0, 1, 2, 3, (byte) 0xff, 13, 10};
        byte[] replacement = new byte[] {0, 1, 2, 4, (byte) 0xfe, 10};
        write(t.repo.resolve("binary.dat"), base);
        write(t.desired.resolve("binary.dat"), replacement);
        byte[] added = new byte[] {(byte) 0xff, 0, 9, 8, 7};
        write(t.desired.resolve("added.bin"), added);

        Path out = t.root.resolve("binary.zip");
        PackageBuilder.build(request(t, out));
        try (ZipFile zip = new ZipFile(out.toFile(), StandardCharsets.UTF_8)) {
            check(Arrays.equals(read(zip, "base-files/binary.dat"), base), "exact binary base");
            check(Arrays.equals(read(zip, "replacement-files/binary.dat"), replacement), "exact binary replacement");
            check(Arrays.equals(read(zip, "replacement-files/added.bin"), added), "exact binary add");
        }
    }

    private static void testDeterministicWithExplicitIds() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.repo.resolve("a.txt"), "a0");
        write(t.desired.resolve("a.txt"), "a1");
        write(t.desired.resolve("b.txt"), "b1");
        Path first = t.root.resolve("first.zip");
        Path second = t.root.resolve("second.zip");
        PackageBuilder.build(request(t, first));
        PackageBuilder.build(request(t, second));
        check(Arrays.equals(Files.readAllBytes(first), Files.readAllBytes(second)),
                "same staged inputs and explicit IDs must produce identical ZIP bytes");
    }

    private static void testBuildsDeleteOnlyWithExactBase() throws Exception {
        TestRepo t = TestRepo.create();
        byte[] base = new byte[] {0, 7, 9, (byte) 0xff, 13, 10};
        write(t.repo.resolve("obsolete.bin"), base);

        Path out = t.root.resolve("delete-only.zip");
        PackageBuilder.BuildResult result = PackageBuilder.build(new PackageBuilder.BuildRequest(
                t.repo, null, out, PACKAGE_ID, CHANGE_SET_ID, "Builder test", List.of("obsolete.bin")));

        check(result.addCount() == 0, "delete-only add count");
        check(result.replaceCount() == 0, "delete-only replace count");
        check(result.deleteCount() == 1, "delete-only delete count");
        check(result.noOpCount() == 0, "delete-only no-op count");

        try (ZipFile zip = new ZipFile(out.toFile(), StandardCharsets.UTF_8)) {
            String manifest = new String(
                    zip.getInputStream(zip.getEntry("PACKAGE.json")).readAllBytes(), StandardCharsets.UTF_8);
            check(manifest.contains("{\"path\":\"obsolete.bin\",\"action\":\"delete\"}"), "delete manifest");
            check(Arrays.equals(read(zip, "base-files/obsolete.bin"), base), "delete exact base");
            check(zip.getEntry("replacement-files/obsolete.bin") == null, "delete has no replacement");
        }
    }

    private static void testCombinesDesiredAndDelete() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("added.txt"), "added");
        write(t.repo.resolve("remove.txt"), "remove me");

        Path out = t.root.resolve("combined.zip");
        PackageBuilder.BuildResult result = PackageBuilder.build(new PackageBuilder.BuildRequest(
                t.repo, t.desired, out, PACKAGE_ID, CHANGE_SET_ID, "Builder test", List.of("remove.txt")));

        check(result.addCount() == 1, "combined add count");
        check(result.replaceCount() == 0, "combined replace count");
        check(result.deleteCount() == 1, "combined delete count");

        try (ZipFile zip = new ZipFile(out.toFile(), StandardCharsets.UTF_8)) {
            String manifest = new String(
                    zip.getInputStream(zip.getEntry("PACKAGE.json")).readAllBytes(), StandardCharsets.UTF_8);
            check(manifest.contains("{\"path\":\"added.txt\",\"action\":\"add\"}"), "combined add manifest");
            check(manifest.contains("{\"path\":\"remove.txt\",\"action\":\"delete\"}"), "combined delete manifest");
            check(zip.getEntry("base-files/remove.txt") != null, "combined delete base");
            check(zip.getEntry("replacement-files/remove.txt") == null, "combined delete no replacement");
        }
    }

    private static void testRejectsMissingDeleteTarget() throws Exception {
        TestRepo t = TestRepo.create();
        expectValidation(PackageBuilder.ValidationReason.INVALID_DELETE,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        t.repo, null, t.root.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID,
                        "Builder test", List.of("missing.txt"))),
                "missing delete target");
    }

    private static void testRejectsDeleteDesiredCollision() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("same.txt"), "desired");
        expectValidation(PackageBuilder.ValidationReason.PATH_COLLISION,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        t.repo, t.desired, t.root.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID,
                        "Builder test", List.of("same.txt"))),
                "same path cannot be desired and deleted");
    }

    private static void testCliAcceptsRepeatedDeletesWithoutDesired() {
        PackageBuilder.BuildRequest request = Main.parseBuildRequest(new String[] {
                "--repo", "repo",
                "--output", "out.zip",
                "--change-set-label", "delete test",
                "--delete", "a.txt",
                "--delete", "dir/b.txt"
        });
        check(request.desiredRoot() == null, "delete-only CLI desired is optional");
        check(request.deletePaths().equals(List.of("a.txt", "dir/b.txt")), "repeatable delete CLI paths");
    }

    private static void testRejectsInvalidPaths() {
        expectValidation(PackageBuilder.ValidationReason.INVALID_PATH,
                () -> PackageBuilder.validateOperationPath("../escape.txt"), "traversal");
        expectValidation(PackageBuilder.ValidationReason.INVALID_PATH,
                () -> PackageBuilder.validateOperationPath("dir/CON.txt"), "reserved name");
        expectValidation(PackageBuilder.ValidationReason.INVALID_PATH,
                () -> PackageBuilder.validateOperationPath("dir/bad?.txt"), "invalid character");
        expectValidation(PackageBuilder.ValidationReason.INVALID_PATH,
                () -> PackageBuilder.validateOperationPath("dir/trailing. "), "trailing dot/space");
        expectValidation(PackageBuilder.ValidationReason.INVALID_PATH,
                () -> PackageBuilder.validateOperationPath("dir\\file.txt"), "backslash");
    }

    private static void testRejectsPathCollision() {
        Set<String> paths = new LinkedHashSet<>();
        paths.add("Dir/A.txt");
        paths.add("dir/a.txt");
        expectValidation(PackageBuilder.ValidationReason.PATH_COLLISION,
                () -> PackageBuilder.validateCaseInsensitiveUniqueness(paths), "case-insensitive collision");
    }

    private static void testRejectsDesiredAndOutputInsideRepository() throws Exception {
        TestRepo t = TestRepo.create();
        Path desiredInside = t.repo.resolve("desired");
        Files.createDirectories(desiredInside);
        expectValidation(PackageBuilder.ValidationReason.INVALID_DESIRED_ROOT,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        t.repo, desiredInside, t.root.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID, "test")),
                "desired inside repository");

        write(t.desired.resolve("x.txt"), "x");
        expectValidation(PackageBuilder.ValidationReason.INVALID_OUTPUT,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        t.repo, t.desired, t.repo.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID, "test")),
                "output inside repository");
    }

    private static void testRejectsDesiredContainingRepository() throws Exception {
        TestRepo t = TestRepo.create();
        expectValidation(PackageBuilder.ValidationReason.INVALID_DESIRED_ROOT,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        t.repo, t.root, t.root.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID, "test")),
                "desired contains repository");
    }

    private static void testRejectsOutputInsideDesired() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("x.txt"), "x");
        expectValidation(PackageBuilder.ValidationReason.INVALID_OUTPUT,
                () -> PackageBuilder.build(request(t, t.desired.resolve("result.zip"))),
                "output inside desired");
    }

    private static void testRejectsExistingOutputWithoutOverwrite() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("x.txt"), "x");
        Path output = t.root.resolve("existing.zip");
        byte[] original = "important existing bytes".getBytes(StandardCharsets.UTF_8);
        write(output, original);
        expectValidation(PackageBuilder.ValidationReason.INVALID_OUTPUT,
                () -> PackageBuilder.build(request(t, output)),
                "existing output");
        check(Arrays.equals(Files.readAllBytes(output), original), "existing output must remain unchanged");
    }

    private static void testRejectsRepositorySubdirectory() throws Exception {
        TestRepo t = TestRepo.create();
        Path sub = t.repo.resolve("src");
        Files.createDirectories(sub);
        write(t.desired.resolve("x.txt"), "x");
        expectValidation(PackageBuilder.ValidationReason.INVALID_REPOSITORY,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        sub, t.desired, t.root.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID, "test")),
                "repo subdirectory");
    }

    private static void testDetectsDesiredChangeAfterCapture() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("x.txt"), "one");
        Path staged = t.root.resolve("staged");
        Files.createDirectories(staged);
        Map<String, Path> captured = PackageBuilder.snapshotDesired(t.desired.toRealPath(), staged);
        write(t.desired.resolve("x.txt"), "two");
        expectValidation(PackageBuilder.ValidationReason.DESIRED_CHANGED,
                () -> PackageBuilder.verifyDesiredStable(t.desired.toRealPath(), captured),
                "desired bytes changed");
    }

    private static void testPrivateStagingWriteFailureIsInternal() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("x.txt"), "x");
        Path blocked = t.root.resolve("blocked");
        write(blocked, "not a directory");
        expectIOExceptionNotValidation(
                () -> PackageBuilder.snapshotDesired(t.desired.toRealPath(), blocked.resolve("staged")),
                "private staging write failure");
    }

    private static void testPrivateStagingVerificationFailureIsInternal() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("x.txt"), "x");
        Map<String, Path> captured = Map.of("x.txt", t.root.resolve("missing-private-staged-file"));
        expectIOExceptionNotValidation(
                () -> PackageBuilder.verifyDesiredStable(t.desired.toRealPath(), captured),
                "private staging verification failure");
    }

    private static void testRejectsUnsupportedSourceFileType() throws Exception {
        TestRepo t = TestRepo.create();
        Files.createDirectories(t.repo.resolve("target"));
        write(t.desired.resolve("target"), "file");
        expectValidation(PackageBuilder.ValidationReason.UNSUPPORTED_FILE_TYPE,
                () -> PackageBuilder.build(request(t, t.root.resolve("out.zip"))),
                "source directory at touched file path");
    }

    private static void testRejectsNonDirectorySourceAncestor() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.repo.resolve("dir"), "not a directory");
        write(t.desired.resolve("dir/child.txt"), "x");
        expectValidation(PackageBuilder.ValidationReason.INVALID_PATH,
                () -> PackageBuilder.build(request(t, t.root.resolve("out.zip"))),
                "non-directory source ancestor");
    }

    private static void testRejectsUnsupportedRepositoryOrigin() throws Exception {
        TestRepo t = TestRepo.create("https://example.com/Owner/Repo.git");
        write(t.desired.resolve("x.txt"), "x");
        expectValidation(PackageBuilder.ValidationReason.INVALID_REPOSITORY,
                () -> PackageBuilder.build(request(t, t.root.resolve("out.zip"))),
                "unsupported origin");
    }

    private static void testRejectsNoOpOnlyBuild() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.repo.resolve("same.txt"), "same");
        write(t.desired.resolve("same.txt"), "same");
        expectValidation(PackageBuilder.ValidationReason.NO_CHANGES,
                () -> PackageBuilder.build(request(t, t.root.resolve("out.zip"))),
                "no-op only build");
    }

    private static void testRejectsInvalidRequest() throws Exception {
        TestRepo t = TestRepo.create();
        expectValidation(PackageBuilder.ValidationReason.INVALID_REQUEST,
                () -> PackageBuilder.build(new PackageBuilder.BuildRequest(
                        t.repo, t.desired, t.root.resolve("out.zip"), PACKAGE_ID, CHANGE_SET_ID, "  ")),
                "blank label");
    }

    private static void testCliParsingFailuresAreValidation() {
        expectValidation(PackageBuilder.ValidationReason.INVALID_REQUEST,
                () -> Main.parseBuildRequest(new String[] {
                        "--repo", "repo",
                        "--desired", "desired",
                        "--output", "out.zip",
                        "--change-set-label", "test",
                        "--change-set-id", "not-a-uuid"
                }),
                "invalid CLI UUID");
    }

    private static void testInternalFailureRendering() {
        ByteArrayOutputStream outBytes = new ByteArrayOutputStream();
        ByteArrayOutputStream errBytes = new ByteArrayOutputStream();
        Main.printInternalFailure(
                new PrintStream(outBytes, true, StandardCharsets.UTF_8),
                new PrintStream(errBytes, true, StandardCharsets.UTF_8),
                new IllegalArgumentException("unexpected internal argument bug"));
        String out = outBytes.toString(StandardCharsets.UTF_8);
        String err = errBytes.toString(StandardCharsets.UTF_8);
        check(out.contains("code=INTERNAL_ERROR\n"), "internal error code");
        String diagnosticLine = Arrays.stream(out.split("\n"))
                .filter(line -> line.startsWith("diagnosticId="))
                .findFirst().orElseThrow();
        String diagnosticId = diagnosticLine.substring("diagnosticId=".length());
        check(err.contains("diagnosticId=" + diagnosticId), "same diagnostic id on stderr");
        check(err.contains("IllegalArgumentException: unexpected internal argument bug"), "raw internal trace");
    }

    private static void testValidationFailureRendering() throws Exception {
        TestRepo t = TestRepo.create();
        write(t.desired.resolve("x.txt"), "x");
        PackageBuilder.ValidationException failure = captureValidation(() -> PackageBuilder.build(
                new PackageBuilder.BuildRequest(t.repo.resolve("missing"), t.desired, t.root.resolve("out.zip"),
                        PACKAGE_ID, CHANGE_SET_ID, "test")));
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        Main.printValidationFailure(new PrintStream(bytes, true, StandardCharsets.UTF_8), failure);
        String output = bytes.toString(StandardCharsets.UTF_8);
        check(output.contains("BUILD_FAILED\n"), "failure heading");
        check(output.contains("code=VALIDATION_FAILED\n"), "validation code");
        check(output.contains("reason=INVALID_REPOSITORY\n"), "validation reason");
        check(output.contains("message="), "validation message");
    }

    private static void testRepositoryIdentityParsing() throws Exception {
        TestRepo https = TestRepo.create("https://github.com/Owner/Thing.git");
        check(PackageBuilder.resolveRepositoryIdentity(https.repo).equals("github:Owner/Thing"), "https identity");
        TestRepo ssh = TestRepo.create("git@github.com:Other/Repo.git");
        check(PackageBuilder.resolveRepositoryIdentity(ssh.repo).equals("github:Other/Repo"), "ssh identity");
    }

    private static PackageBuilder.BuildRequest request(TestRepo t, Path output) {
        return new PackageBuilder.BuildRequest(t.repo, t.desired, output, PACKAGE_ID, CHANGE_SET_ID, "Builder test");
    }

    private static byte[] read(ZipFile zip, String name) throws IOException {
        return zip.getInputStream(zip.getEntry(name)).readAllBytes();
    }

    private static void write(Path path, String text) throws IOException {
        write(path, text.getBytes(StandardCharsets.UTF_8));
    }

    private static void write(Path path, byte[] bytes) throws IOException {
        Files.createDirectories(path.getParent());
        Files.write(path, bytes);
    }

    private static void check(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    private static PackageBuilder.ValidationException captureValidation(ThrowingRunnable action) {
        try {
            action.run();
            throw new AssertionError("Expected validation failure");
        } catch (PackageBuilder.ValidationException expected) {
            return expected;
        } catch (AssertionError e) {
            throw e;
        } catch (Exception other) {
            throw new AssertionError("Expected ValidationException but got " + other, other);
        }
    }

    private static void expectIOExceptionNotValidation(ThrowingRunnable action, String message) {
        try {
            action.run();
            throw new AssertionError("Expected IOException: " + message);
        } catch (PackageBuilder.ValidationException e) {
            throw new AssertionError("Expected internal IOException, got validation " + e.reason() + ": " + message, e);
        } catch (IOException expected) {
            // Expected: caller/source validation could not be established; private mechanics failed.
        } catch (AssertionError e) {
            throw e;
        } catch (Exception other) {
            throw new AssertionError("Expected IOException but got " + other + ": " + message, other);
        }
    }

    private static void expectValidation(
            PackageBuilder.ValidationReason reason, ThrowingRunnable action, String message) {
        PackageBuilder.ValidationException failure = captureValidation(action);
        check(failure.reason() == reason,
                message + ": expected " + reason + " but got " + failure.reason() + " / " + failure.getMessage());
    }

    @FunctionalInterface
    private interface ThrowingRunnable { void run() throws Exception; }

    private record TestRepo(Path root, Path repo, Path desired) {
        static TestRepo create() throws Exception { return create("https://github.com/Example/Repo.git"); }

        static TestRepo create(String remote) throws Exception {
            Path root = Files.createTempDirectory("rpkg-builder-test-");
            Path repo = root.resolve("repo");
            Path desired = root.resolve("desired");
            Files.createDirectories(repo);
            Files.createDirectories(desired);
            git(repo, "init");
            git(repo, "remote", "add", "origin", remote);
            return new TestRepo(root, repo, desired);
        }

        private static void git(Path repo, String... args) throws Exception {
            String[] command = new String[args.length + 3];
            command[0] = "git";
            command[1] = "-C";
            command[2] = repo.toString();
            System.arraycopy(args, 0, command, 3, args.length);
            Process p = new ProcessBuilder(command).redirectErrorStream(true).start();
            String output = new String(p.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            int exit = p.waitFor();
            if (exit != 0) throw new IllegalStateException("git failed: " + output);
        }
    }
}

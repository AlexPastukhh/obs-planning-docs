package obs.rpkg;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/** Reusable feature-test support independent of CoreTests. */
public final class ApplyFeatureTestSupport {
    public static final String RAW_ORIGIN = "https://github.com/example/testrepo.git";
    public static final String SSH_ORIGIN = "git@github.com:example/testrepo.git";
    public static final String REPOSITORY_IDENTITY = "github:example/testrepo";

    private ApplyFeatureTestSupport() {}

    public record Workspace(
            Path root,
            Path repository,
            Path stateRoot,
            Path remote,
            Core core,
            Core.RepositoryConfig target) {}

    public record PackageFixture(Path path, String packageId) {}

    public record Op(String path, String action, String base, String replacement) {}

    public static Workspace workspace(String name, boolean withRemote) throws Exception {
        Path root = Files.createTempDirectory("obs-rpkg-" + name + "-");
        Path repo = root.resolve("repo");
        Path stateRoot = root.resolve("state");
        Files.createDirectories(repo);
        git(repo, "init", "-b", "main");
        git(repo, "config", "user.name", "OBS Test");
        git(repo, "config", "user.email", "obs@example.invalid");
        git(repo, "config", "commit.gpgsign", "false");
        write(repo.resolve("seed.txt"), "seed");
        git(repo, "add", ".");
        git(repo, "commit", "-m", "base");

        Path remote = null;
        git(repo, "remote", "add", "origin", RAW_ORIGIN);
        if (withRemote) {
            remote = root.resolve("remote.git");
            git(root, "init", "--bare", remote.toString());
            git(repo, "remote", "set-url", "origin", SSH_ORIGIN);
            configureFakeSsh(root, repo, remote);
        }

        Core core = new Core(new StateStore(stateRoot));
        Core.RepositoryConfig target = core.registerRepository(name, repo);
        return new Workspace(root, repo, stateRoot, remote, core, target);
    }


    private static void configureFakeSsh(Path root, Path repository, Path remote) throws Exception {
        Path script = root.resolve("fake-ssh-transport.sh");
        write(script, "#!/bin/sh\n"
                + "repo=\"$1\"\n"
                + "shift\n"
                + "last=\"\"\n"
                + "for arg in \"$@\"; do last=\"$arg\"; done\n"
                + "case \"$last\" in\n"
                + "  *git-upload-pack*) exec git-upload-pack \"$repo\" ;;\n"
                + "  *git-receive-pack*) exec git-receive-pack \"$repo\" ;;\n"
                + "  *) exit 1 ;;\n"
                + "esac\n");
        String command = "sh " + shellQuote(script.toString()) + " " + shellQuote(remote.toString());
        git(repository, "config", "core.sshCommand", command);
    }

    private static String shellQuote(String value) {
        return "'" + value.replace("'", "'\"'\"'") + "'";
    }

    public static PackageFixture packageFor(
            Workspace workspace,
            String changeSetId,
            String label,
            List<Op> operations) throws Exception {
        return packageWithId(workspace, UUID.randomUUID().toString(), changeSetId, label, operations);
    }

    public static PackageFixture packageWithId(
            Workspace workspace,
            String packageId,
            String changeSetId,
            String label,
            List<Op> operations) throws Exception {
        Path zip = workspace.root().resolve("pkg-" + packageId + "-" + UUID.randomUUID() + ".zip");
        Map<String,Object> manifest = new LinkedHashMap<>();
        manifest.put("schemaVersion", 1);
        manifest.put("packageId", packageId);
        manifest.put("changeSetId", changeSetId);
        manifest.put("changeSetLabel", label);
        manifest.put("repositoryIdentity", REPOSITORY_IDENTITY);

        Map<String,Object> workIntent = new LinkedHashMap<>();
        workIntent.put("schemaVersion", 1);
        workIntent.put("changeSetId", changeSetId);
        workIntent.put("repositoryIdentity", REPOSITORY_IDENTITY);
        workIntent.put("title", label);
        workIntent.put("goal", "Implement " + label);
        workIntent.put("why", "Feature integration fixture");
        workIntent.put("acceptance", List.of("Exact package state is proven."));
        manifest.put("workIntent", workIntent);

        List<Object> manifestOps = new ArrayList<>();
        for (Op op : operations) {
            Map<String,Object> entry = new LinkedHashMap<>();
            entry.put("path", op.path());
            entry.put("action", op.action());
            manifestOps.add(entry);
        }
        manifest.put("operations", manifestOps);

        try (ZipOutputStream out = new ZipOutputStream(Files.newOutputStream(zip), StandardCharsets.UTF_8)) {
            zipEntry(out, "PACKAGE.json", Json.stringify(manifest).getBytes(StandardCharsets.UTF_8));
            for (Op op : operations) {
                if (op.base() != null) {
                    zipEntry(out, "base-files/" + op.path(), op.base().getBytes(StandardCharsets.UTF_8));
                }
                if (op.replacement() != null) {
                    zipEntry(out, "replacement-files/" + op.path(), op.replacement().getBytes(StandardCharsets.UTF_8));
                }
            }
        }
        return new PackageFixture(zip, packageId);
    }

    public static Op replace(String path, String base, String replacement) {
        return new Op(path, "replace", base, replacement);
    }

    public static String git(Path cwd, String... args) throws Exception {
        List<String> cmd = new ArrayList<>();
        cmd.add("git");
        cmd.add("-C");
        cmd.add(cwd.toString());
        cmd.addAll(List.of(args));
        Process process = new ProcessBuilder(cmd).redirectErrorStream(true).start();
        String output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        int exit = process.waitFor();
        if (exit != 0) throw new AssertionError("git failed: " + String.join(" ", cmd) + "\n" + output);
        return output.strip();
    }

    public static String remoteTip(Workspace workspace, String branch) throws Exception {
        Process process = new ProcessBuilder(
                "git", "-C", workspace.repository().toString(),
                "ls-remote", "--heads", "origin", "refs/heads/" + branch)
                .redirectErrorStream(true).start();
        String output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8).strip();
        int exit = process.waitFor();
        if (exit != 0) throw new AssertionError("remote lookup failed: " + output);
        if (output.isBlank()) return null;
        return output.split("\\s+")[0];
    }

    public static Path makeRemoteUnavailableAfterPush(Workspace workspace) {
        if (workspace.remote() == null) throw new IllegalArgumentException("remote fixture is required");
        Path offline = workspace.root().resolve("remote.git.offline");
        workspace.core().setAfterPublishAttemptHookForTests(() -> {
            try {
                Files.move(workspace.remote(), offline);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return offline;
    }

    public static void restoreRemote(Workspace workspace, Path offline) throws Exception {
        workspace.core().setAfterPublishAttemptHookForTests(null);
        if (offline != null && Files.exists(offline) && !Files.exists(workspace.remote())) {
            Files.move(offline, workspace.remote());
        }
    }

    public static void failIfAnotherPushIsAttempted(Workspace workspace) {
        workspace.core().setAfterPublishAttemptHookForTests(
                () -> { throw new AssertionError("Retry Publish attempted another push before using confirmation"); });
    }

    public static void clearPublishHook(Workspace workspace) {
        workspace.core().setAfterPublishAttemptHookForTests(null);
    }

    public static String read(Path path) throws IOException {
        return Files.readString(path, StandardCharsets.UTF_8);
    }

    public static void deleteTree(Path path) {
        if (path == null || !Files.exists(path)) return;
        try (var walk = Files.walk(path)) {
            walk.sorted(Comparator.reverseOrder()).forEach(p -> {
                try { Files.deleteIfExists(p); } catch (IOException ignored) {}
            });
        } catch (IOException ignored) {}
    }

    private static void write(Path path, String value) throws IOException {
        Files.createDirectories(path.getParent());
        Files.writeString(path, value, StandardCharsets.UTF_8);
    }

    private static void zipEntry(ZipOutputStream out, String name, byte[] bytes) throws IOException {
        out.putNextEntry(new ZipEntry(name));
        out.write(bytes);
        out.closeEntry();
    }
}

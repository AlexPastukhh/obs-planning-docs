package obs.rpkg;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Network Git capability for one already-authorized RepositoryIdentity.
 *
 * Endpoint capture snapshots only transport/authentication config that is safe to reuse.
 * Network commands execute in an isolated temporary bare repository with system/global
 * config disabled and with no url.*.insteadOf/pushInsteadOf rules from the registered repo.
 * Git objects cross the isolation boundary only through local bundle/unbundle operations.
 */
public final class GitTransport {
    private static final Pattern[] GITHUB_URLS = {
            Pattern.compile("^https?://github\\.com/([^/\\s]+)/([^/\\s]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE),
            Pattern.compile("^git@github\\.com:([^/\\s]+)/([^/\\s]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE),
            Pattern.compile("^ssh://git@github\\.com/([^/\\s]+)/([^/\\s]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE)
    };

    private final Path transportRoot;
    private final GitClient git = new GitClient();

    public GitTransport(Path appStateRoot) {
        if (appStateRoot == null) throw new IllegalArgumentException("appStateRoot is required");
        transportRoot = appStateRoot.toAbsolutePath().normalize()
                .resolve("work-state-v2").resolve("git-transport");
        try { Files.createDirectories(transportRoot); }
        catch (IOException e) { throw new IllegalStateException("Cannot initialize isolated Git transport", e); }
    }

    /** Opaque proof/capability captured before a network operation. */
    public static final class Endpoint {
        private final String url;
        private final String repositoryIdentity;
        private final List<ConfigEntry> safeConfig;

        private Endpoint(String url, String repositoryIdentity, List<ConfigEntry> safeConfig) {
            this.url = url;
            this.repositoryIdentity = repositoryIdentity;
            this.safeConfig = List.copyOf(safeConfig);
        }

        public String url() { return url; }
        public String repositoryIdentity() { return repositoryIdentity; }
    }

    public record Failure(String message, Throwable cause) {
        public Failure {
            if (message == null || message.isBlank()) message = "Git transport failed";
        }
    }

    private record ConfigEntry(String key, String value) {}

    public Endpoint captureOrigin(Path repository, String expectedRepositoryIdentity, boolean push) {
        Objects.requireNonNull(repository, "repository");
        if (expectedRepositoryIdentity == null || expectedRepositoryIdentity.isBlank()) {
            throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "Expected RepositoryIdentity is required.");
        }
        GitClient.Result urls = push
                ? git.allow(repository, Core.REPOSITORY_MISMATCH,
                        "remote", "get-url", "--push", "--all", "origin")
                : git.allow(repository, Core.REPOSITORY_MISMATCH,
                        "remote", "get-url", "--all", "origin");
        if (urls.exitCode() != 0 || urls.stdout().size() != 1) {
            throw new Core.ObsException(Core.REPOSITORY_MISMATCH,
                    "origin must resolve to exactly one " + (push ? "push" : "fetch") + " URL.");
        }
        String url = urls.stdout().get(0).trim();
        String actual = repositoryIdentityFromUrl(url);
        if (!actual.equalsIgnoreCase(expectedRepositoryIdentity)) {
            throw new Core.ObsException(Core.REPOSITORY_MISMATCH,
                    "origin " + (push ? "push" : "fetch") + " URL resolves to " + actual
                            + "; expected " + expectedRepositoryIdentity + ".");
        }
        return new Endpoint(url, actual, captureSafeTransportConfig(repository));
    }

    public String repositoryIdentity(Path repository) {
        GitClient.Result configured = git.allow(repository, Core.REPOSITORY_MISMATCH,
                "config", "--get", "remote.origin.url");
        if (configured.exitCode() != 0 || configured.first().isBlank()) {
            throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "remote.origin.url is missing.");
        }
        return repositoryIdentityFromUrl(configured.first());
    }

    public static String repositoryIdentityFromUrl(String rawUrl) {
        if (rawUrl == null || rawUrl.isBlank()) {
            throw new Core.ObsException(Core.REPOSITORY_MISMATCH, "Repository URL is missing.");
        }
        String value = rawUrl.trim();
        for (Pattern pattern : GITHUB_URLS) {
            Matcher matcher = pattern.matcher(value);
            if (matcher.matches()) return "github:" + matcher.group(1) + "/" + matcher.group(2);
        }
        throw new Core.ObsException(Core.REPOSITORY_MISMATCH,
                "Unsupported origin for repositoryIdentity: " + rawUrl);
    }

    /** Fetch exact target branch through the captured endpoint and import only fetched objects locally. */
    public String fetchBranch(Path destinationRepository, Endpoint endpoint, String branch, String remoteTrackingRef) {
        Objects.requireNonNull(destinationRepository, "destinationRepository");
        Objects.requireNonNull(endpoint, "endpoint");
        if (branch == null || branch.isBlank()) throw new IllegalArgumentException("branch is required");
        Path operation = createOperationDirectory("fetch-");
        try {
            Path isolated = initBare(operation.resolve("network.git"));
            String isolatedRef = "refs/heads/obs-rpkg-fetched";
            GitClient.Result fetch = runIsolated(isolated, endpoint, Core.REPOSITORY_NOT_READY, true,
                    "fetch", "--no-tags", endpoint.url(), "+refs/heads/" + branch + ":" + isolatedRef);
            if (fetch.exitCode() != 0) {
                throw new Core.ObsException(Core.REPOSITORY_NOT_READY,
                        "Cannot resolve authoritative origin/" + branch + ".\n--- git details ---\n" + fetch.failureDetails());
            }
            String commit = git.run(isolated, Core.REPOSITORY_NOT_READY,
                    "rev-parse", "--verify", isolatedRef + "^{commit}").first();
            if (commit.isBlank()) {
                throw new Core.ObsException(Core.REPOSITORY_NOT_READY,
                        "Authoritative target branch does not resolve after isolated fetch: " + branch);
            }

            Path bundle = operation.resolve("fetched.bundle");
            git.run(isolated, Core.REPOSITORY_NOT_READY,
                    "bundle", "create", bundle.toString(), isolatedRef);
            git.run(destinationRepository, Core.REPOSITORY_NOT_READY,
                    "bundle", "unbundle", bundle.toString());
            if (remoteTrackingRef != null && !remoteTrackingRef.isBlank()) {
                git.run(destinationRepository, Core.REPOSITORY_NOT_READY,
                        "update-ref", remoteTrackingRef, commit);
            }
            return commit;
        } finally {
            deleteTree(operation);
        }
    }

    /** Read one exact remote ref through the isolated captured transport. */
    public obs.rpkg.foundation.result.Result<List<String>, Failure> lsRemote(Endpoint endpoint, String exactRef) {
        Objects.requireNonNull(endpoint, "endpoint");
        if (exactRef == null || exactRef.isBlank()) {
            return obs.rpkg.foundation.result.Result.failure(new Failure("Exact remote ref is required", null));
        }
        Path operation = createOperationDirectory("observe-");
        try {
            Path isolated = initBare(operation.resolve("network.git"));
            GitClient.Result lookup = runIsolated(isolated, endpoint, Core.PUBLISH_FAILED, true,
                    "ls-remote", "--heads", endpoint.url(), exactRef);
            if (lookup.exitCode() != 0) {
                return obs.rpkg.foundation.result.Result.failure(new Failure(
                        "Cannot confirm remote work branch: " + lookup.failureDetails(), null));
            }
            return obs.rpkg.foundation.result.Result.success(lookup.stdout().stream()
                    .filter(line -> !line.isBlank()).toList());
        } catch (Core.ObsException e) {
            return obs.rpkg.foundation.result.Result.failure(new Failure(e.getMessage(), e));
        } finally {
            deleteTree(operation);
        }
    }

    /** Push exact commit through the isolated endpoint with an exact explicit lease. */
    public void push(Path sourceWorktree, Endpoint endpoint, String commitSha, String remoteRef, String expectedRemoteTip) {
        Objects.requireNonNull(sourceWorktree, "sourceWorktree");
        Objects.requireNonNull(endpoint, "endpoint");
        if (commitSha == null || commitSha.isBlank()) throw new IllegalArgumentException("commitSha is required");
        if (remoteRef == null || remoteRef.isBlank()) throw new IllegalArgumentException("remoteRef is required");
        String sourceHead = git.run(sourceWorktree, Core.STATE_DIVERGED, "rev-parse", "HEAD").first();
        if (!commitSha.equals(sourceHead)) {
            throw new Core.ObsException(Core.STATE_DIVERGED,
                    "Publish transport requires the exact intended commit to be Worktree HEAD.");
        }

        Path operation = createOperationDirectory("push-");
        try {
            Path bundle = operation.resolve("source.bundle");
            git.run(sourceWorktree, Core.PUBLISH_FAILED,
                    "bundle", "create", bundle.toString(), "HEAD");
            Path isolated = initBare(operation.resolve("network.git"));
            git.run(isolated, Core.PUBLISH_FAILED, "bundle", "unbundle", bundle.toString());
            String localRef = "refs/heads/obs-rpkg-push-source";
            git.run(isolated, Core.PUBLISH_FAILED, "update-ref", localRef, commitSha);

            String lease = "--force-with-lease=" + remoteRef + ":"
                    + (expectedRemoteTip == null ? "" : expectedRemoteTip);
            GitClient.Result push = runIsolated(isolated, endpoint, Core.PUBLISH_FAILED, true,
                    "push", "--porcelain", lease, endpoint.url(), localRef + ":" + remoteRef);
            if (push.exitCode() != 0) {
                throw new Core.ObsException(Core.PUBLISH_FAILED,
                        "Git push failed.\n--- git details ---\n" + push.failureDetails());
            }
        } finally {
            deleteTree(operation);
        }
    }

    private List<ConfigEntry> captureSafeTransportConfig(Path repository) {
        GitClient.BytesResult bytes = git.bytes(repository, Core.REPOSITORY_MISMATCH,
                "config", "--null", "--list");
        List<ConfigEntry> out = new ArrayList<>();
        byte[] raw = bytes.output();
        int start = 0;
        for (int i = 0; i <= raw.length; i++) {
            if (i < raw.length && raw[i] != 0) continue;
            if (i > start) {
                String entry = new String(raw, start, i - start, StandardCharsets.UTF_8);
                int newline = entry.indexOf('\n');
                String key = newline < 0 ? entry : entry.substring(0, newline);
                String value = newline < 0 ? "" : entry.substring(newline + 1);
                if (isSafeTransportConfigKey(key)) out.add(new ConfigEntry(key, value));
            }
            start = i + 1;
        }
        return List.copyOf(out);
    }

    private static boolean isSafeTransportConfigKey(String key) {
        String lower = key == null ? "" : key.toLowerCase(Locale.ROOT);
        if (lower.equals("core.sshcommand") || lower.equals("core.askpass") || lower.equals("ssh.variant")) return true;
        return lower.startsWith("credential.")
                || lower.startsWith("http.")
                || lower.startsWith("https.")
                || lower.startsWith("protocol.");
    }

    private GitClient.Result runIsolated(
            Path isolatedRepository,
            Endpoint endpoint,
            String errorCode,
            boolean allowFailure,
            String... args) {
        Path operationRoot = isolatedRepository.getParent();
        Path emptyConfig = operationRoot.resolve("empty-global.config");
        try {
            if (!Files.exists(emptyConfig)) Files.write(emptyConfig, new byte[0], StandardOpenOption.CREATE_NEW);
        } catch (IOException e) {
            throw new Core.ObsException(errorCode, "Cannot prepare isolated Git configuration.", e);
        }
        Map<String,String> env = new LinkedHashMap<>();
        env.put("GIT_CONFIG_NOSYSTEM", "1");
        env.put("GIT_CONFIG_SYSTEM", emptyConfig.toString());
        env.put("GIT_CONFIG_GLOBAL", emptyConfig.toString());
        env.put("GIT_CONFIG", emptyConfig.toString());
        env.put("GIT_CONFIG_PARAMETERS", "");
        env.put("GIT_CONFIG_COUNT", Integer.toString(endpoint.safeConfig.size()));
        for (int i = 0; i < endpoint.safeConfig.size(); i++) {
            ConfigEntry entry = endpoint.safeConfig.get(i);
            env.put("GIT_CONFIG_KEY_" + i, entry.key());
            env.put("GIT_CONFIG_VALUE_" + i, entry.value());
        }
        return git.run(isolatedRepository, errorCode, allowFailure, env, args);
    }

    private Path initBare(Path bare) {
        try { Files.createDirectories(bare.getParent()); }
        catch (IOException e) { throw new Core.ObsException(Core.INTERNAL_ERROR, "Cannot create isolated Git transport directory.", e); }
        git.run(bare.getParent(), Core.INTERNAL_ERROR, "init", "--bare", bare.toString());
        return bare;
    }

    private Path createOperationDirectory(String prefix) {
        try { return Files.createTempDirectory(transportRoot, prefix); }
        catch (IOException e) { throw new Core.ObsException(Core.INTERNAL_ERROR, "Cannot create isolated Git transport operation.", e); }
    }

    private static void deleteTree(Path root) {
        if (root == null || !Files.exists(root)) return;
        try (var walk = Files.walk(root)) {
            for (Path path : walk.sorted(Comparator.reverseOrder()).toList()) {
                try { Files.deleteIfExists(path); } catch (IOException ignored) {}
            }
        } catch (IOException ignored) {}
    }
}

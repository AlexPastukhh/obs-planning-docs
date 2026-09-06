package obs.rpkg.features.apply.infrastructure;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import obs.rpkg.features.apply.domain.PublicationObservation;
import obs.rpkg.foundation.result.Result;

/** Exact remote work-branch observation independent of push command success/failure. */
public final class GitPublicationObserver implements PublicationObserver {
    @Override
    public Result<PublicationObservation, Failure> observe(
            Path worktree,
            String workBranch,
            String expectedRepositoryIdentity) {
        if (worktree == null || workBranch == null || workBranch.isBlank()
                || expectedRepositoryIdentity == null || expectedRepositoryIdentity.isBlank()) {
            return Result.failure(new Failure(
                    "Worktree, work branch and expected repository identity are required for publication confirmation",
                    null));
        }

        Result<List<String>, Failure> urls = git(worktree, "remote", "get-url", "--all", "origin");
        if (urls.isFailure()) return Result.failure(urls.failure().orElseThrow());
        List<String> originUrls = urls.success().orElseThrow();
        if (originUrls.isEmpty()) {
            return Result.failure(new Failure("Cannot confirm publication because origin has no fetch URL", null));
        }
        for (String url : originUrls) {
            String actual = repositoryIdentity(url);
            if (!expectedRepositoryIdentity.equalsIgnoreCase(actual)) {
                return Result.failure(new Failure(
                        "Publication confirmation origin is " + actual
                                + "; expected " + expectedRepositoryIdentity + ".",
                        null));
            }
        }

        String exactRef = "refs/heads/" + workBranch;
        Result<List<String>, Failure> lookup = git(
                worktree, "ls-remote", "--heads", "origin", exactRef);
        if (lookup.isFailure()) return Result.failure(lookup.failure().orElseThrow());
        List<String> lines = lookup.success().orElseThrow();
        if (lines.isEmpty()) return Result.success(new PublicationObservation.ConfirmedAbsent());
        if (lines.size() != 1) {
            return Result.failure(new Failure("Remote work branch observation is ambiguous", null));
        }
        String[] parts = lines.get(0).trim().split("\\s+");
        if (parts.length != 2
                || !parts[1].equals(exactRef)
                || !parts[0].matches("[0-9A-Fa-f]{40,64}")) {
            return Result.failure(new Failure(
                    "Remote work branch observation is not one exact ref/tip result",
                    null));
        }
        return Result.success(new PublicationObservation.ConfirmedTip(parts[0]));
    }

    private static Result<List<String>, Failure> git(Path worktree, String... args) {
        List<String> command = new ArrayList<>();
        command.add("git");
        command.add("-C");
        command.add(worktree.toString());
        command.addAll(List.of(args));
        ProcessBuilder pb = new ProcessBuilder(command);
        pb.environment().putAll(Map.of("GIT_TERMINAL_PROMPT", "0"));
        pb.redirectErrorStream(true);
        try {
            Process process = pb.start();
            String output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            int exit = process.waitFor();
            if (exit != 0) {
                return Result.failure(new Failure(
                        "Cannot confirm remote work branch: " + output.strip(), null));
            }
            return Result.success(output.lines().filter(line -> !line.isBlank()).toList());
        } catch (IOException e) {
            return Result.failure(new Failure("Cannot execute Git publication confirmation", e));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return Result.failure(new Failure("Publication confirmation interrupted", e));
        }
    }

    private static String repositoryIdentity(String rawUrl) {
        if (rawUrl == null || rawUrl.isBlank()) return "<unavailable>";
        String url = rawUrl.trim();
        String lower = url.toLowerCase(Locale.ROOT);
        String path;
        if (lower.startsWith("https://github.com/") || lower.startsWith("http://github.com/")) {
            path = url.substring(url.indexOf("github.com/") + "github.com/".length());
        } else if (lower.startsWith("ssh://git@github.com/")) {
            path = url.substring("ssh://git@github.com/".length());
        } else if (lower.startsWith("git@github.com:")) {
            path = url.substring("git@github.com:".length());
        } else {
            return "<unverifiable>";
        }
        if (path.endsWith(".git")) path = path.substring(0, path.length() - 4);
        path = path.replace('\\', '/');
        if (!path.matches("[^/\\s]+/[^/\\s]+")) return "<unverifiable>";
        return "github:" + path;
    }
}

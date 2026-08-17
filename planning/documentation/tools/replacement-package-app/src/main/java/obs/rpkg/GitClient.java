package obs.rpkg;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.*;

final class GitClient {
    record Result(int exitCode, List<String> output) {
        String first() { return output.isEmpty() ? "" : output.get(0).trim(); }
        String joined() { return String.join("\n", output); }
    }

    record BytesResult(int exitCode, byte[] output, String error) {}

    Result run(Path repo, String errorCode, boolean allowFailure, Map<String,String> environment, String... args) {
        List<String> cmd = new ArrayList<>();
        cmd.add("git"); cmd.add("-C"); cmd.add(repo.toString()); cmd.addAll(List.of(args));
        ProcessBuilder pb = new ProcessBuilder(cmd).redirectErrorStream(true);
        if (environment != null) pb.environment().putAll(environment);
        try {
            Process p = pb.start();
            List<String> lines;
            try (BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream(), StandardCharsets.UTF_8))) {
                lines = r.lines().toList();
            }
            int code = p.waitFor();
            Result result = new Result(code, lines);
            if (code != 0 && !allowFailure) throw new Core.ObsException(errorCode, "git " + String.join(" ", args) + " failed (" + code + "): " + result.joined());
            return result;
        } catch (IOException e) {
            throw new Core.ObsException(errorCode, "Cannot execute git: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new Core.ObsException(errorCode, "Git execution interrupted", e);
        }
    }


    BytesResult bytes(Path repo, String errorCode, boolean allowFailure, Map<String,String> environment, String... args) {
        List<String> cmd = new ArrayList<>();
        cmd.add("git"); cmd.add("-C"); cmd.add(repo.toString()); cmd.addAll(List.of(args));
        ProcessBuilder pb = new ProcessBuilder(cmd);
        if (environment != null) pb.environment().putAll(environment);
        try {
            Process p = pb.start();
            ByteArrayOutputStream err = new ByteArrayOutputStream();
            Thread stderr = new Thread(() -> {
                try { p.getErrorStream().transferTo(err); } catch (IOException ignored) {}
            }, "obs-rpkg-git-stderr");
            stderr.start();
            byte[] output = p.getInputStream().readAllBytes();
            int code = p.waitFor();
            stderr.join();
            String error = err.toString(StandardCharsets.UTF_8);
            BytesResult result = new BytesResult(code, output, error);
            if (code != 0 && !allowFailure) throw new Core.ObsException(errorCode, "git " + String.join(" ", args) + " failed (" + code + "): " + error.trim());
            return result;
        } catch (IOException e) {
            throw new Core.ObsException(errorCode, "Cannot execute git: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new Core.ObsException(errorCode, "Git execution interrupted", e);
        }
    }

    BytesResult bytes(Path repo, String errorCode, String... args) { return bytes(repo, errorCode, false, null, args); }
    BytesResult bytesAllow(Path repo, String errorCode, String... args) { return bytes(repo, errorCode, true, null, args); }
    BytesResult bytesEnv(Path repo, String errorCode, Map<String,String> env, String... args) { return bytes(repo, errorCode, false, env, args); }

    Result run(Path repo, String errorCode, String... args) { return run(repo, errorCode, false, null, args); }
    Result allow(Path repo, String errorCode, String... args) { return run(repo, errorCode, true, null, args); }
    Result env(Path repo, String errorCode, Map<String,String> env, String... args) { return run(repo, errorCode, false, env, args); }
}

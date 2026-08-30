package obs.rpkgbuilder;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.LinkOption;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

public final class PackageBuilder {
    private static final FileTime ZIP_TIME = FileTime.fromMillis(0L);
    private static final Pattern HTTPS_GITHUB = Pattern.compile(
            "https?://github\\.com/([^/]+)/([^/]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE);
    private static final Pattern SSH_GITHUB = Pattern.compile(
            "(?:ssh://git@github\\.com/|git@github\\.com:)([^/]+)/([^/]+?)(?:\\.git)?/?$", Pattern.CASE_INSENSITIVE);

    private PackageBuilder() {}

    public enum ValidationReason {
        INVALID_REQUEST,
        INVALID_REPOSITORY,
        INVALID_DESIRED_ROOT,
        INVALID_OUTPUT,
        INVALID_PATH,
        PATH_COLLISION,
        UNSUPPORTED_FILE_TYPE,
        SOURCE_CHANGED,
        SOURCE_UNVERIFIABLE,
        DESIRED_CHANGED,
        NO_CHANGES
    }

    public static final class ValidationException extends RuntimeException {
        private final ValidationReason reason;
        private final Map<String, String> facts;

        ValidationException(ValidationReason reason, String message, Throwable cause, Map<String, String> facts) {
            super(message, cause);
            this.reason = reason;
            this.facts = Collections.unmodifiableMap(new LinkedHashMap<>(facts));
        }

        public ValidationReason reason() {
            return reason;
        }

        public Map<String, String> facts() {
            return facts;
        }
    }

    public record BuildRequest(
            Path repositoryRoot,
            Path desiredRoot,
            Path output,
            UUID packageId,
            UUID changeSetId,
            String changeSetLabel) {}

    public record BuildResult(
            Path output,
            UUID packageId,
            UUID changeSetId,
            String repositoryIdentity,
            int addCount,
            int replaceCount,
            int noOpCount) {}

    private enum Action { ADD, REPLACE }

    private enum SourcePresence { ABSENT, PRESENT }

    private record Operation(String path, Action action, Path base, Path replacement) {}

    private sealed interface SourceObservation permits ExpectedAbsent, ExpectedBytes {
        String path();
        void verify(Path repositoryRoot) throws IOException;
    }

    private record ExpectedAbsent(String path) implements SourceObservation {
        @Override
        public void verify(Path repositoryRoot) {
            Path current = resolveInside(repositoryRoot, path);
            if (sourcePresence(current, path) == SourcePresence.PRESENT) {
                throw validation(ValidationReason.SOURCE_CHANGED,
                        "Repository source changed during build; an add path now exists.",
                        "path", path);
            }
        }
    }

    private record ExpectedBytes(String path, Path stagedBase) implements SourceObservation {
        @Override
        public void verify(Path repositoryRoot) throws IOException {
            Path current = resolveInside(repositoryRoot, path);
            if (sourcePresence(current, path) == SourcePresence.ABSENT
                    || Files.isSymbolicLink(current)
                    || !Files.isRegularFile(current, LinkOption.NOFOLLOW_LINKS)
                    || Files.mismatch(current, stagedBase) != -1L) {
                throw validation(ValidationReason.SOURCE_CHANGED,
                        "Repository source changed during build.",
                        "path", path);
            }
        }
    }

    public static BuildResult build(BuildRequest request) throws IOException, InterruptedException {
        validateRequest(request);

        Path repo = resolveRepositoryRoot(request.repositoryRoot());
        Path desired = resolveDesiredRoot(request.desiredRoot(), repo);
        Path output = prepareOutput(request.output(), repo, desired);
        String repositoryIdentity = resolveRepositoryIdentity(repo);

        Path staging = Files.createTempDirectory("rpkg-builder-");
        try {
            Path stagedDesiredRoot = staging.resolve("desired");
            Path stagedBaseRoot = staging.resolve("base");
            Path tempZip = staging.resolve("package.zip");
            Files.createDirectories(stagedDesiredRoot);
            Files.createDirectories(stagedBaseRoot);

            Map<String, Path> desiredFiles = snapshotDesired(desired, stagedDesiredRoot);
            validateCaseInsensitiveUniqueness(desiredFiles.keySet());
            verifyDesiredStable(desired, desiredFiles);

            List<Operation> operations = new ArrayList<>();
            List<SourceObservation> observations = new ArrayList<>();
            int noOpCount = 0;

            for (Map.Entry<String, Path> entry : desiredFiles.entrySet()) {
                String path = entry.getKey();
                Path stagedDesired = entry.getValue();
                validateSourceAncestors(repo, path);
                Path current = resolveInside(repo, path);

                SourcePresence presence = sourcePresence(current, path);
                if (presence == SourcePresence.ABSENT) {
                    operations.add(new Operation(path, Action.ADD, null, stagedDesired));
                    observations.add(new ExpectedAbsent(path));
                    continue;
                }

                requireRegularNonSymlink(current, "Repository source", path);
                Path stagedBase = stagedBaseRoot.resolve(path.replace('/', java.io.File.separatorChar));
                copyExact(current, stagedBase);
                observations.add(new ExpectedBytes(path, stagedBase));

                if (Files.mismatch(stagedBase, stagedDesired) == -1L) {
                    noOpCount++;
                } else {
                    operations.add(new Operation(path, Action.REPLACE, stagedBase, stagedDesired));
                }
            }

            operations.sort(Comparator.comparing(Operation::path));
            verifySource(observations, repo);
            verifyDesiredStable(desired, desiredFiles);

            if (operations.isEmpty()) {
                throw validation(ValidationReason.NO_CHANGES,
                        "Desired input produces no add or replace operations.",
                        "noOp", Integer.toString(noOpCount));
            }

            byte[] manifest = manifestBytes(request, repositoryIdentity, operations);
            writeZip(tempZip, manifest, operations);
            validateZip(tempZip, manifest, operations);

            verifySource(observations, repo);
            verifyDesiredStable(desired, desiredFiles);
            publish(tempZip, output);
            validateZip(output, manifest, operations);

            int addCount = (int) operations.stream().filter(op -> op.action() == Action.ADD).count();
            int replaceCount = operations.size() - addCount;
            return new BuildResult(output, request.packageId(), request.changeSetId(), repositoryIdentity,
                    addCount, replaceCount, noOpCount);
        } finally {
            deleteTreeBestEffort(staging);
        }
    }

    private static void validateRequest(BuildRequest request) {
        if (request == null) throw validation(ValidationReason.INVALID_REQUEST, "Build request is required.");
        if (request.repositoryRoot() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "Repository root is required.", "option", "--repo");
        }
        if (request.desiredRoot() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "Desired root is required.", "option", "--desired");
        }
        if (request.output() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "Output is required.", "option", "--output");
        }
        if (request.packageId() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "packageId is required.", "field", "packageId");
        }
        if (request.changeSetId() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "changeSetId is required.", "field", "changeSetId");
        }
        if (request.changeSetLabel() == null || request.changeSetLabel().isBlank()) {
            throw validation(ValidationReason.INVALID_REQUEST, "changeSetLabel is required.", "field", "changeSetLabel");
        }
    }

    private static Path resolveRepositoryRoot(Path requested) throws IOException, InterruptedException {
        Path repo;
        try {
            repo = requested.toRealPath();
        } catch (IOException e) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "Repository path cannot be resolved.", e,
                    "provided", requested.toAbsolutePath().normalize().toString());
        }
        if (!Files.isDirectory(repo)) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "Repository path is not a directory.",
                    "provided", repo.toString());
        }

        ProcessResult topLevel = runGit(repo, "rev-parse", "--show-toplevel");
        if (topLevel.exitCode() != 0 || topLevel.output().isBlank()) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "--repo is not inside a readable Git worktree.",
                    "provided", repo.toString(),
                    "gitOutput", topLevel.output());
        }

        Path actualRoot;
        try {
            actualRoot = Path.of(topLevel.output().trim()).toRealPath();
        } catch (Exception e) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "Git reported a worktree root that cannot be resolved.", e,
                    "provided", repo.toString(),
                    "gitRoot", topLevel.output().trim());
        }

        if (!Files.isSameFile(repo, actualRoot)) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "--repo must point to the Git worktree root, not a subdirectory.",
                    "provided", repo.toString(),
                    "actualGitRoot", actualRoot.toString());
        }
        return actualRoot;
    }

    private static Path resolveDesiredRoot(Path requested, Path repo) {
        Path desired;
        try {
            desired = requested.toRealPath();
        } catch (IOException e) {
            throw validation(ValidationReason.INVALID_DESIRED_ROOT,
                    "Desired root cannot be resolved.", e,
                    "provided", requested.toAbsolutePath().normalize().toString());
        }
        if (!Files.isDirectory(desired)) {
            throw validation(ValidationReason.INVALID_DESIRED_ROOT,
                    "Desired root is not a directory.",
                    "provided", desired.toString());
        }
        if (desired.startsWith(repo) || repo.startsWith(desired)) {
            throw validation(ValidationReason.INVALID_DESIRED_ROOT,
                    "Desired root and source repository must be disjoint; neither may contain the other.",
                    "desired", desired.toString(),
                    "repository", repo.toString());
        }
        return desired;
    }

    private static Path prepareOutput(Path requested, Path repo, Path desired) {
        Path output = requested.toAbsolutePath().normalize();
        Path outputParent = output.getParent();
        if (outputParent == null || output.getFileName() == null) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output must be a file path with a parent directory.",
                    "output", output.toString());
        }

        Path prospectiveParent;
        try {
            prospectiveParent = canonicalizeProspective(outputParent);
        } catch (IOException e) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output parent cannot be resolved safely.", e,
                    "output", output.toString());
        }
        Path prospectiveOutput = prospectiveParent.resolve(output.getFileName().toString()).normalize();
        validateOutputBoundary(prospectiveOutput, repo, desired);

        try {
            Files.createDirectories(outputParent);
        } catch (IOException e) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output parent cannot be created.", e,
                    "output", output.toString());
        }

        Path realParent;
        try {
            realParent = outputParent.toRealPath();
        } catch (IOException e) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output parent cannot be resolved after creation.", e,
                    "output", output.toString());
        }
        Path resolvedOutput = realParent.resolve(output.getFileName().toString()).normalize();
        validateOutputBoundary(resolvedOutput, repo, desired);

        ensureOutputAbsent(resolvedOutput);
        return resolvedOutput;
    }

    private static void ensureOutputAbsent(Path output) {
        try {
            Files.readAttributes(output, BasicFileAttributes.class, LinkOption.NOFOLLOW_LINKS);
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output already exists; PB-01 never overwrites an existing path implicitly.",
                    "output", output.toString());
        } catch (NoSuchFileException e) {
            // Proven absent.
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output absence cannot be proven safely.", e,
                    "output", output.toString());
        }
    }

    private static Path canonicalizeProspective(Path path) throws IOException {
        Path absolute = path.toAbsolutePath().normalize();
        List<Path> suffix = new ArrayList<>();
        Path current = absolute;
        while (current != null && !Files.exists(current, LinkOption.NOFOLLOW_LINKS)) {
            Path name = current.getFileName();
            if (name != null) suffix.add(0, name);
            current = current.getParent();
        }
        if (current == null) return absolute;
        Path resolved = current.toRealPath();
        for (Path segment : suffix) resolved = resolved.resolve(segment.toString());
        return resolved.normalize();
    }

    private static void validateOutputBoundary(Path output, Path repo, Path desired) {
        if (output.startsWith(repo)) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output must be outside the source repository.",
                    "output", output.toString(),
                    "repository", repo.toString());
        }
        if (output.startsWith(desired)) {
            throw validation(ValidationReason.INVALID_OUTPUT,
                    "Output must be outside the desired input tree.",
                    "output", output.toString(),
                    "desired", desired.toString());
        }
    }

    static Map<String, Path> snapshotDesired(Path desiredRoot, Path stagedRoot) throws IOException {
        Map<String, Path> result = new LinkedHashMap<>();
        List<Path> paths;
        try (Stream<Path> stream = Files.walk(desiredRoot)) {
            paths = stream.filter(path -> !path.equals(desiredRoot)).sorted().toList();
        } catch (IOException | UncheckedIOException e) {
            throw validation(ValidationReason.INVALID_DESIRED_ROOT,
                    "Desired tree could not be read completely.", e,
                    "desired", desiredRoot.toString());
        }

        for (Path source : paths) {
            Path relative = desiredRoot.relativize(source);
            String operationPath = toOperationPath(relative);
            if (Files.isSymbolicLink(source)) {
                throw validation(ValidationReason.UNSUPPORTED_FILE_TYPE,
                        "Desired input contains a symlink, which PB-01 does not support.",
                        "path", operationPath);
            }
            if (Files.isDirectory(source, LinkOption.NOFOLLOW_LINKS)) continue;
            if (!Files.isRegularFile(source, LinkOption.NOFOLLOW_LINKS)) {
                throw validation(ValidationReason.UNSUPPORTED_FILE_TYPE,
                        "Desired input contains a non-regular file, which PB-01 does not support.",
                        "path", operationPath);
            }
            validateOperationPath(operationPath);
            Path staged = stagedRoot.resolve(relative.toString());
            captureDesiredFile(source, staged, operationPath);
            result.put(operationPath, staged);
        }
        return result;
    }

    private static void captureDesiredFile(Path source, Path staged, String operationPath) throws IOException {
        InputStream input;
        try {
            input = new BufferedInputStream(Files.newInputStream(source));
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.INVALID_DESIRED_ROOT,
                    "Desired file cannot be opened for exact capture.", e,
                    "path", operationPath);
        }

        Path parent = staged.getParent();
        if (parent != null) Files.createDirectories(parent);
        try (input; OutputStream output = new BufferedOutputStream(Files.newOutputStream(staged))) {
            byte[] buffer = new byte[64 * 1024];
            while (true) {
                int read;
                try {
                    read = input.read(buffer);
                } catch (IOException e) {
                    throw validation(ValidationReason.INVALID_DESIRED_ROOT,
                            "Desired file could not be read completely during exact capture.", e,
                            "path", operationPath);
                }
                if (read < 0) break;
                output.write(buffer, 0, read);
            }
        }
    }

    static void verifyDesiredStable(Path desiredRoot, Map<String, Path> captured) throws IOException {
        Map<String, Path> current = new LinkedHashMap<>();
        try (Stream<Path> stream = Files.walk(desiredRoot)) {
            List<Path> paths = stream.filter(path -> !path.equals(desiredRoot)).sorted().toList();
            for (Path source : paths) {
                Path relative = desiredRoot.relativize(source);
                String operationPath = toOperationPath(relative);
                if (Files.isSymbolicLink(source)
                        || (!Files.isDirectory(source, LinkOption.NOFOLLOW_LINKS)
                        && !Files.isRegularFile(source, LinkOption.NOFOLLOW_LINKS))) {
                    throw validation(ValidationReason.DESIRED_CHANGED,
                            "Desired input changed file type during build.",
                            "path", operationPath);
                }
                if (Files.isRegularFile(source, LinkOption.NOFOLLOW_LINKS)) {
                    current.put(operationPath, source);
                }
            }
        } catch (ValidationException e) {
            throw e;
        } catch (IOException | UncheckedIOException e) {
            throw validation(ValidationReason.DESIRED_CHANGED,
                    "Desired input could no longer be enumerated during build.", e,
                    "desired", desiredRoot.toString());
        }

        if (!current.keySet().equals(captured.keySet())) {
            Set<String> added = new HashSet<>(current.keySet());
            added.removeAll(captured.keySet());
            Set<String> removed = new HashSet<>(captured.keySet());
            removed.removeAll(current.keySet());
            throw validation(ValidationReason.DESIRED_CHANGED,
                    "Desired input file set changed during build.",
                    "added", sortedJoined(added),
                    "removed", sortedJoined(removed));
        }

        for (Map.Entry<String, Path> entry : captured.entrySet()) {
            Path currentFile = current.get(entry.getKey());
            if (!desiredEqualsCaptured(currentFile, entry.getValue(), entry.getKey())) {
                throw validation(ValidationReason.DESIRED_CHANGED,
                        "Desired input bytes changed during build.",
                        "path", entry.getKey());
            }
        }
    }

    private static boolean desiredEqualsCaptured(Path desiredFile, Path stagedFile, String operationPath) throws IOException {
        long desiredSize;
        try {
            desiredSize = Files.size(desiredFile);
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.DESIRED_CHANGED,
                    "Desired input could no longer be read for verification.", e,
                    "path", operationPath);
        }
        long stagedSize = Files.size(stagedFile);
        if (desiredSize != stagedSize) return false;

        InputStream desiredInput;
        try {
            desiredInput = new BufferedInputStream(Files.newInputStream(desiredFile));
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.DESIRED_CHANGED,
                    "Desired input could no longer be opened for verification.", e,
                    "path", operationPath);
        }
        try (desiredInput; InputStream stagedInput = new BufferedInputStream(Files.newInputStream(stagedFile))) {
            byte[] desiredBuffer = new byte[64 * 1024];
            byte[] stagedBuffer = new byte[64 * 1024];
            for (long remaining = desiredSize; remaining > 0;) {
                int chunk = (int) Math.min(desiredBuffer.length, remaining);
                int desiredRead;
                try {
                    desiredRead = desiredInput.readNBytes(desiredBuffer, 0, chunk);
                } catch (IOException e) {
                    throw validation(ValidationReason.DESIRED_CHANGED,
                            "Desired input could no longer be read for verification.", e,
                            "path", operationPath);
                }
                int stagedRead = stagedInput.readNBytes(stagedBuffer, 0, chunk);
                if (desiredRead != chunk || stagedRead != chunk) return false;
                for (int i = 0; i < chunk; i++) {
                    if (desiredBuffer[i] != stagedBuffer[i]) return false;
                }
                remaining -= chunk;
            }
            return true;
        }
    }

    private static String sortedJoined(Set<String> values) {
        return values.stream().sorted().reduce((a, b) -> a + "," + b).orElse("");
    }

    static void validateCaseInsensitiveUniqueness(Set<String> paths) {
        Map<String, String> seen = new HashMap<>();
        for (String path : paths) {
            String key = path.toLowerCase(Locale.ROOT);
            String prior = seen.putIfAbsent(key, path);
            if (prior != null && !prior.equals(path)) {
                throw validation(ValidationReason.PATH_COLLISION,
                        "Desired paths collide after Windows case-insensitive normalization.",
                        "first", prior,
                        "second", path);
            }
        }
    }

    static void validateOperationPath(String path) {
        if (path == null || path.isEmpty()) {
            throw validation(ValidationReason.INVALID_PATH, "Operation path is empty.");
        }
        if (path.startsWith("/") || path.endsWith("/") || path.indexOf('\\') >= 0) {
            throw validation(ValidationReason.INVALID_PATH,
                    "Operation path must be repository-relative and use '/'.",
                    "path", path);
        }
        String[] segments = path.split("/", -1);
        for (String segment : segments) {
            if (segment.isEmpty() || segment.equals(".") || segment.equals("..")) {
                throw validation(ValidationReason.INVALID_PATH,
                        "Operation path contains an invalid segment.",
                        "path", path);
            }
            if (segment.endsWith(".") || segment.endsWith(" ")) {
                throw validation(ValidationReason.INVALID_PATH,
                        "Operation path contains a Windows-invalid trailing dot or space.",
                        "path", path);
            }
            for (int i = 0; i < segment.length(); i++) {
                char ch = segment.charAt(i);
                if (ch < 32 || "<>:\"|?*".indexOf(ch) >= 0) {
                    throw validation(ValidationReason.INVALID_PATH,
                            "Operation path contains a Windows-invalid character.",
                            "path", path);
                }
            }
            String deviceBase = segment;
            int dot = deviceBase.indexOf('.');
            if (dot >= 0) deviceBase = deviceBase.substring(0, dot);
            String upper = deviceBase.toUpperCase(Locale.ROOT);
            if (upper.equals("CON") || upper.equals("PRN") || upper.equals("AUX") || upper.equals("NUL")
                    || upper.matches("COM[1-9]") || upper.matches("LPT[1-9]")) {
                throw validation(ValidationReason.INVALID_PATH,
                        "Operation path contains a Windows-reserved name.",
                        "path", path);
            }
        }
    }

    static SourcePresence sourcePresence(Path path, String operationPath) {
        try {
            Files.readAttributes(path, BasicFileAttributes.class, LinkOption.NOFOLLOW_LINKS);
            return SourcePresence.PRESENT;
        } catch (NoSuchFileException e) {
            return SourcePresence.ABSENT;
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.SOURCE_UNVERIFIABLE,
                    "Repository source existence cannot be proven for the touched path.", e,
                    "path", operationPath);
        }
    }

    private static void validateSourceAncestors(Path repo, String operationPath) {
        String[] segments = operationPath.split("/");
        Path current = repo;
        for (int i = 0; i < segments.length - 1; i++) {
            current = current.resolve(segments[i]);
            if (!Files.exists(current, LinkOption.NOFOLLOW_LINKS)) return;
            if (Files.isSymbolicLink(current)) {
                throw validation(ValidationReason.UNSUPPORTED_FILE_TYPE,
                        "A touched path traverses a repository symlink, which PB-01 does not support.",
                        "path", operationPath,
                        "ancestor", repo.relativize(current).toString());
            }
            if (!Files.isDirectory(current, LinkOption.NOFOLLOW_LINKS)) {
                throw validation(ValidationReason.INVALID_PATH,
                        "A touched path has a non-directory repository ancestor.",
                        "path", operationPath,
                        "ancestor", repo.relativize(current).toString());
            }
        }
    }

    private static String toOperationPath(Path relative) {
        StringBuilder out = new StringBuilder();
        for (Path segment : relative) {
            if (!out.isEmpty()) out.append('/');
            out.append(segment.toString());
        }
        return out.toString();
    }

    private static Path resolveInside(Path repo, String operationPath) {
        Path resolved = repo.resolve(operationPath.replace('/', java.io.File.separatorChar)).normalize();
        if (!resolved.startsWith(repo)) {
            throw new IllegalStateException("Validated operation path escaped repository: " + operationPath);
        }
        return resolved;
    }

    private static void requireRegularNonSymlink(Path path, String description, String operationPath) {
        if (Files.isSymbolicLink(path) || !Files.isRegularFile(path, LinkOption.NOFOLLOW_LINKS)) {
            throw validation(ValidationReason.UNSUPPORTED_FILE_TYPE,
                    description + " is not a regular non-symlink file.",
                    "path", operationPath);
        }
    }

    private static void copyExact(Path source, Path target) throws IOException {
        Path parent = target.getParent();
        if (parent != null) Files.createDirectories(parent);
        Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.COPY_ATTRIBUTES);
    }

    private static void verifySource(List<SourceObservation> observations, Path repo) throws IOException {
        for (SourceObservation observation : observations) observation.verify(repo);
    }

    static String resolveRepositoryIdentity(Path repo) throws IOException, InterruptedException {
        ProcessResult result = runGit(repo, "remote", "get-url", "origin");
        String remote = result.output().trim();
        if (result.exitCode() != 0 || remote.isEmpty()) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "Repository must have a readable remote.origin.url.",
                    "repository", repo.toString(),
                    "gitOutput", result.output());
        }

        Matcher matcher = HTTPS_GITHUB.matcher(remote);
        if (!matcher.matches()) matcher = SSH_GITHUB.matcher(remote);
        if (!matcher.matches()) {
            throw validation(ValidationReason.INVALID_REPOSITORY,
                    "remote.origin.url is not a supported GitHub repository URL.",
                    "origin", remote);
        }
        return "github:" + matcher.group(1) + "/" + matcher.group(2);
    }

    private record ProcessResult(int exitCode, String output) {}

    private static ProcessResult runGit(Path repo, String... args) throws IOException, InterruptedException {
        String[] command = new String[args.length + 3];
        command[0] = "git";
        command[1] = "-C";
        command[2] = repo.toString();
        System.arraycopy(args, 0, command, 3, args.length);
        Process process = new ProcessBuilder(command).redirectErrorStream(true).start();
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        process.getInputStream().transferTo(output);
        int exit = process.waitFor();
        return new ProcessResult(exit, output.toString(StandardCharsets.UTF_8).trim());
    }

    private static byte[] manifestBytes(BuildRequest request, String repositoryIdentity, List<Operation> operations) {
        StringBuilder json = new StringBuilder();
        json.append("{\n");
        json.append("  \"schemaVersion\": 1,\n");
        json.append("  \"packageId\": \"").append(request.packageId()).append("\",\n");
        json.append("  \"changeSetId\": \"").append(request.changeSetId()).append("\",\n");
        json.append("  \"changeSetLabel\": \"").append(escapeJson(request.changeSetLabel())).append("\",\n");
        json.append("  \"repositoryIdentity\": \"").append(escapeJson(repositoryIdentity)).append("\",\n");
        json.append("  \"operations\": [\n");
        for (int i = 0; i < operations.size(); i++) {
            Operation operation = operations.get(i);
            json.append("    {\"path\":\"").append(escapeJson(operation.path())).append("\",\"action\":\"")
                    .append(operation.action().name().toLowerCase(Locale.ROOT)).append("\"}");
            if (i + 1 < operations.size()) json.append(',');
            json.append('\n');
        }
        json.append("  ]\n");
        json.append("}\n");
        return json.toString().getBytes(StandardCharsets.UTF_8);
    }

    private static String escapeJson(String value) {
        StringBuilder out = new StringBuilder(value.length() + 16);
        for (int i = 0; i < value.length(); i++) {
            char ch = value.charAt(i);
            switch (ch) {
                case '\\' -> out.append("\\\\");
                case '"' -> out.append("\\\"");
                case '\b' -> out.append("\\b");
                case '\f' -> out.append("\\f");
                case '\n' -> out.append("\\n");
                case '\r' -> out.append("\\r");
                case '\t' -> out.append("\\t");
                default -> {
                    if (ch < 0x20) out.append(String.format("\\u%04x", (int) ch));
                    else out.append(ch);
                }
            }
        }
        return out.toString();
    }

    private static void writeZip(Path zipPath, byte[] manifest, List<Operation> operations) throws IOException {
        try (OutputStream fileOut = new BufferedOutputStream(Files.newOutputStream(zipPath));
             ZipOutputStream zip = new ZipOutputStream(fileOut, StandardCharsets.UTF_8)) {
            putBytes(zip, "PACKAGE.json", manifest);
            for (Operation operation : operations) {
                if (operation.base() != null) putFile(zip, "base-files/" + operation.path(), operation.base());
            }
            for (Operation operation : operations) {
                putFile(zip, "replacement-files/" + operation.path(), operation.replacement());
            }
        }
    }

    private static void putBytes(ZipOutputStream zip, String name, byte[] bytes) throws IOException {
        ZipEntry entry = new ZipEntry(name);
        fixTime(entry);
        zip.putNextEntry(entry);
        zip.write(bytes);
        zip.closeEntry();
    }

    private static void putFile(ZipOutputStream zip, String name, Path source) throws IOException {
        ZipEntry entry = new ZipEntry(name);
        fixTime(entry);
        zip.putNextEntry(entry);
        try (InputStream input = new BufferedInputStream(Files.newInputStream(source))) {
            input.transferTo(zip);
        }
        zip.closeEntry();
    }

    private static void fixTime(ZipEntry entry) {
        entry.setLastModifiedTime(ZIP_TIME);
        entry.setLastAccessTime(ZIP_TIME);
        entry.setCreationTime(ZIP_TIME);
    }

    private static void validateZip(Path zipPath, byte[] manifest, List<Operation> operations) throws IOException {
        Set<String> expected = new HashSet<>();
        expected.add("PACKAGE.json");
        for (Operation operation : operations) {
            if (operation.base() != null) expected.add("base-files/" + operation.path());
            expected.add("replacement-files/" + operation.path());
        }

        Set<String> actual = new HashSet<>();
        try (ZipFile zip = new ZipFile(zipPath.toFile(), StandardCharsets.UTF_8)) {
            var entries = zip.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                if (entry.isDirectory()) throw new IllegalStateException("Unexpected directory ZIP entry: " + entry.getName());
                if (!actual.add(entry.getName())) throw new IllegalStateException("Duplicate ZIP entry: " + entry.getName());
            }
            if (!actual.equals(expected)) {
                throw new IllegalStateException("ZIP entry set mismatch. expected=" + expected + " actual=" + actual);
            }
            byte[] actualManifest = zip.getInputStream(zip.getEntry("PACKAGE.json")).readAllBytes();
            if (!Arrays.equals(actualManifest, manifest)) throw new IllegalStateException("PACKAGE.json changed during ZIP creation");
            for (Operation operation : operations) {
                if (operation.base() != null) {
                    assertZipEntryEqualsFile(zip, "base-files/" + operation.path(), operation.base());
                }
                assertZipEntryEqualsFile(zip, "replacement-files/" + operation.path(), operation.replacement());
            }
        }
    }

    private static void assertZipEntryEqualsFile(ZipFile zip, String entryName, Path expectedFile) throws IOException {
        ZipEntry entry = zip.getEntry(entryName);
        if (entry == null) throw new IllegalStateException("Missing ZIP entry: " + entryName);
        Path temp = Files.createTempFile("rpkg-builder-verify-", ".bin");
        try {
            try (InputStream in = zip.getInputStream(entry); OutputStream out = Files.newOutputStream(temp)) {
                in.transferTo(out);
            }
            if (Files.mismatch(temp, expectedFile) != -1L) {
                throw new IllegalStateException("ZIP payload mismatch: " + entryName);
            }
        } finally {
            Files.deleteIfExists(temp);
        }
    }

    private static void publish(Path tempZip, Path output) throws IOException {
        Path publishTemp = Files.createTempFile(output.getParent(), ".rpkg-builder-publish-", ".zip.tmp");
        try {
            Files.copy(tempZip, publishTemp, StandardCopyOption.REPLACE_EXISTING);
            try {
                Files.move(publishTemp, output);
            } catch (FileAlreadyExistsException e) {
                throw validation(ValidationReason.INVALID_OUTPUT,
                        "Output appeared during build; existing files are never overwritten implicitly.", e,
                        "output", output.toString());
            }
        } finally {
            Files.deleteIfExists(publishTemp);
        }
    }

    private static void deleteTreeBestEffort(Path root) {
        if (root == null || !Files.exists(root)) return;
        try (Stream<Path> stream = Files.walk(root)) {
            for (Path path : stream.sorted(Comparator.reverseOrder()).toList()) {
                try {
                    Files.deleteIfExists(path);
                } catch (IOException ignored) {
                    // Temporary cleanup failure does not invalidate an already validated package result.
                }
            }
        } catch (IOException ignored) {
            // Best effort cleanup only.
        }
    }

    private static ValidationException validation(ValidationReason reason, String message, String... facts) {
        return validation(reason, message, null, facts);
    }

    private static ValidationException validation(
            ValidationReason reason, String message, Throwable cause, String... facts) {
        if (facts.length % 2 != 0) throw new IllegalStateException("Validation facts must be key/value pairs");
        Map<String, String> values = new LinkedHashMap<>();
        for (int i = 0; i < facts.length; i += 2) {
            values.put(facts[i], facts[i + 1] == null ? "" : facts[i + 1]);
        }
        return new ValidationException(reason, message, cause, values);
    }
}

package obs.rpkgbuilder;

import obs.rpkgcommon.PackageStateApplier;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/** Advances an exact file-state workspace by one already-built replacement package. */
public final class StateAdvancer {
    private StateAdvancer() {}

    public enum ValidationReason {
        INVALID_REQUEST,
        INVALID_STATE_ROOT,
        PACKAGE_NOT_FOUND,
        PACKAGE_INVALID,
        PACKAGE_ID_MISMATCH,
        STATE_MISMATCH,
        STATE_UNVERIFIABLE,
        UNSUPPORTED_STATE_PATH
    }

    public static final class ValidationException extends RuntimeException {
        private final ValidationReason reason;
        private final Map<String, String> facts;

        ValidationException(ValidationReason reason, String message, Throwable cause, Map<String, String> facts) {
            super(message, cause);
            this.reason = reason;
            this.facts = Collections.unmodifiableMap(new LinkedHashMap<>(facts));
        }

        public ValidationReason reason() { return reason; }
        public Map<String, String> facts() { return facts; }
    }

    public record AdvanceRequest(Path stateRoot, Path packageArchive, UUID expectedPackageId) {}

    public record AdvanceResult(
            Path stateRoot,
            UUID packageId,
            UUID changeSetId,
            String repositoryIdentity,
            int addCount,
            int replaceCount,
            int deleteCount) {}

    private record Manifest(
            UUID packageId,
            UUID changeSetId,
            String changeSetLabel,
            String repositoryIdentity,
            List<PackageOperation> operations) {}

    private record PackageOperation(
            String path,
            PackageStateApplier.Action action,
            byte[] expectedBase,
            byte[] replacement) {}

    private record PackageData(Manifest manifest) {}

    public static AdvanceResult advance(AdvanceRequest request) {
        validateRequest(request);
        Path stateRoot = resolveStateRoot(request.stateRoot());
        Path archive = resolveArchive(request.packageArchive(), stateRoot);
        PackageData data = readPackage(archive);
        Manifest manifest = data.manifest();

        if (!manifest.packageId().equals(request.expectedPackageId())) {
            throw validation(ValidationReason.PACKAGE_ID_MISMATCH,
                    "Package archive does not match the confirmed packageId.",
                    "expectedPackageId", request.expectedPackageId().toString(),
                    "actualPackageId", manifest.packageId().toString());
        }

        List<PackageStateApplier.Operation> operations = new ArrayList<>();
        for (PackageOperation operation : manifest.operations()) {
            Path target = resolveStateTarget(stateRoot, operation.path());
            operations.add(new PackageStateApplier.Operation(
                    operation.path(), target, operation.action(), operation.expectedBase(), operation.replacement()));
        }

        PackageStateApplier.PreparedChange prepared;
        try {
            prepared = PackageStateApplier.prepare(operations, StateAdvancer::verifyRawExpectedBase);
        } catch (ValidationException e) {
            throw e;
        } catch (PackageStateApplier.ApplyException e) {
            throw mapPrepareFailure(e);
        } catch (SecurityException e) {
            throw validation(ValidationReason.STATE_UNVERIFIABLE,
                    "State applicability could not be verified safely.", e);
        }

        try (PackageStateApplier.AppliedChange applied = prepared.apply()) {
            applied.commit();
        }

        int add = 0, replace = 0, delete = 0;
        for (PackageOperation operation : manifest.operations()) {
            switch (operation.action()) {
                case ADD -> add++;
                case REPLACE -> replace++;
                case DELETE -> delete++;
            }
        }
        return new AdvanceResult(stateRoot, manifest.packageId(), manifest.changeSetId(),
                manifest.repositoryIdentity(), add, replace, delete);
    }

    private static void validateRequest(AdvanceRequest request) {
        if (request == null) throw validation(ValidationReason.INVALID_REQUEST, "Advance request is required.");
        if (request.stateRoot() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "State root is required.", "option", "--state");
        }
        if (request.packageArchive() == null) {
            throw validation(ValidationReason.INVALID_REQUEST, "Package archive is required.", "option", "--package");
        }
        if (request.expectedPackageId() == null) {
            throw validation(ValidationReason.INVALID_REQUEST,
                    "Confirmed packageId is required before state advancement.", "option", "--expected-package-id");
        }
    }

    private static Path resolveStateRoot(Path requested) {
        try {
            Path root = requested.toRealPath();
            if (!Files.isDirectory(root, LinkOption.NOFOLLOW_LINKS) || Files.isSymbolicLink(root)) {
                throw validation(ValidationReason.INVALID_STATE_ROOT,
                        "State root must be an existing real directory.", "state", root.toString());
            }
            return root;
        } catch (ValidationException e) {
            throw e;
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.INVALID_STATE_ROOT,
                    "State root cannot be resolved safely.", e,
                    "state", requested.toAbsolutePath().normalize().toString());
        }
    }

    private static Path resolveArchive(Path requested, Path stateRoot) {
        try {
            Path archive = requested.toRealPath();
            if (!Files.isRegularFile(archive, LinkOption.NOFOLLOW_LINKS) || Files.isSymbolicLink(archive)) {
                throw validation(ValidationReason.PACKAGE_NOT_FOUND,
                        "Package archive is not a readable regular file.", "package", archive.toString());
            }
            if (archive.startsWith(stateRoot)) {
                throw validation(ValidationReason.INVALID_REQUEST,
                        "Package archive must be outside the state workspace being advanced.",
                        "package", archive.toString(), "state", stateRoot.toString());
            }
            return archive;
        } catch (ValidationException e) {
            throw e;
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.PACKAGE_NOT_FOUND,
                    "Package archive cannot be resolved safely.", e,
                    "package", requested.toAbsolutePath().normalize().toString());
        }
    }

    private static PackageData readPackage(Path archive) {
        Map<String, byte[]> files = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        Map<String, String> canonical = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        try (ZipFile zip = new ZipFile(archive.toFile(), StandardCharsets.UTF_8)) {
            Enumeration<? extends ZipEntry> entries = zip.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                String name = entry.getName();
                if (name == null || name.isBlank()) continue;
                validateZipEntry(name);
                String prior = canonical.putIfAbsent(name, name);
                if (prior != null) {
                    throw validation(ValidationReason.PACKAGE_INVALID,
                            "Package contains colliding ZIP entries.", "entry", name);
                }
                if (!entry.isDirectory()) {
                    try (InputStream in = zip.getInputStream(entry)) {
                        files.put(name, in.readAllBytes());
                    }
                }
            }
        } catch (ValidationException e) {
            throw e;
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.PACKAGE_INVALID, "Package ZIP cannot be read safely.", e,
                    "package", archive.toString());
        }

        byte[] manifestBytes = files.get("PACKAGE.json");
        if (manifestBytes == null || !"PACKAGE.json".equals(canonical.get("PACKAGE.json"))) {
            throw validation(ValidationReason.PACKAGE_INVALID,
                    "PACKAGE.json is missing at ZIP root or has the wrong case.");
        }

        Map<String, Object> manifestObject;
        try {
            manifestObject = JsonParser.parseObject(utf8Strict(manifestBytes));
        } catch (RuntimeException e) {
            throw validation(ValidationReason.PACKAGE_INVALID, "PACKAGE.json is invalid JSON.", e);
        }

        if (number(manifestObject.get("schemaVersion")) != 1) {
            throw validation(ValidationReason.PACKAGE_INVALID, "Unsupported package schemaVersion.");
        }
        UUID packageId = uuid(string(manifestObject.get("packageId")), "packageId");
        UUID changeSetId = uuid(string(manifestObject.get("changeSetId")), "changeSetId");
        String label = string(manifestObject.get("changeSetLabel"));
        if (label == null || label.isBlank()) {
            throw validation(ValidationReason.PACKAGE_INVALID, "changeSetLabel is required.");
        }
        String repositoryIdentity = string(manifestObject.get("repositoryIdentity"));
        if (repositoryIdentity == null || !repositoryIdentity.matches("^github:[^/\\s]+/[^/\\s]+$")) {
            throw validation(ValidationReason.PACKAGE_INVALID,
                    "repositoryIdentity must be github:<owner>/<repo>.");
        }

        Object rawOperations = manifestObject.get("operations");
        if (!(rawOperations instanceof List<?> list)) {
            throw validation(ValidationReason.PACKAGE_INVALID, "operations[] is required.");
        }

        Set<String> seen = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        Set<String> expectedEntries = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        expectedEntries.add("PACKAGE.json");
        List<PackageOperation> operations = new ArrayList<>();

        for (Object raw : list) {
            if (!(raw instanceof Map<?, ?> map)) {
                throw validation(ValidationReason.PACKAGE_INVALID, "Package operation must be an object.");
            }
            String path = normalizeRepoPath(string(map.get("path")));
            String actionText = string(map.get("action"));
            if (!seen.add(path)) {
                throw validation(ValidationReason.PACKAGE_INVALID,
                        "Package contains duplicate/colliding operation paths.", "path", path);
            }
            PackageStateApplier.Action action = switch (actionText == null ? "" : actionText) {
                case "add" -> PackageStateApplier.Action.ADD;
                case "replace" -> PackageStateApplier.Action.REPLACE;
                case "delete" -> PackageStateApplier.Action.DELETE;
                default -> throw validation(ValidationReason.PACKAGE_INVALID,
                        "Package contains an unsupported action.", "path", path,
                        "action", actionText == null ? "" : actionText);
            };

            String baseName = "base-files/" + path;
            String replacementName = "replacement-files/" + path;
            byte[] base = files.get(baseName);
            byte[] replacement = files.get(replacementName);
            switch (action) {
                case ADD -> {
                    if (base != null || replacement == null) {
                        throw invalidPayload(path, "add");
                    }
                    expectedEntries.add(replacementName);
                }
                case REPLACE -> {
                    if (base == null || replacement == null) {
                        throw invalidPayload(path, "replace");
                    }
                    expectedEntries.add(baseName);
                    expectedEntries.add(replacementName);
                }
                case DELETE -> {
                    if (base == null || replacement != null) {
                        throw invalidPayload(path, "delete");
                    }
                    expectedEntries.add(baseName);
                }
            }
            operations.add(new PackageOperation(path, action, base, replacement));
        }

        for (String name : files.keySet()) {
            if (!expectedEntries.contains(name)) {
                throw validation(ValidationReason.PACKAGE_INVALID,
                        "Package contains an undeclared payload file.", "entry", name);
            }
        }

        return new PackageData(new Manifest(packageId, changeSetId, label,
                repositoryIdentity, List.copyOf(operations)));
    }

    private static ValidationException invalidPayload(String path, String action) {
        return validation(ValidationReason.PACKAGE_INVALID,
                "Package operation payload set does not match its action.",
                "path", path, "action", action);
    }

    private static Path resolveStateTarget(Path stateRoot, String repoPath) {
        String[] segments = repoPath.split("/", -1);
        Path cursor = stateRoot;
        boolean parentExists = true;

        for (int i = 0; i < segments.length; i++) {
            String segment = segments[i];
            boolean last = i == segments.length - 1;
            Path next;

            if (parentExists) {
                next = findWindowsEquivalentChild(cursor, segment, repoPath);
                if (next == null) next = cursor.resolve(segment);
            } else {
                next = cursor.resolve(segment);
            }

            next = next.normalize();
            if (!next.startsWith(stateRoot) || next.equals(stateRoot)) {
                throw validation(ValidationReason.PACKAGE_INVALID,
                        "Package path escapes the state workspace.", "path", repoPath);
            }

            boolean exists = Files.exists(next, LinkOption.NOFOLLOW_LINKS);
            if (exists && Files.isSymbolicLink(next)) {
                throw validation(ValidationReason.UNSUPPORTED_STATE_PATH,
                        last ? "State target is a symbolic link." : "State path traverses a symbolic link.",
                        "path", repoPath);
            }
            if (!last && exists && !Files.isDirectory(next, LinkOption.NOFOLLOW_LINKS)) {
                throw validation(ValidationReason.STATE_MISMATCH,
                        "State path ancestor is not a directory.", "path", repoPath);
            }

            cursor = next;
            parentExists = exists && Files.isDirectory(next, LinkOption.NOFOLLOW_LINKS);
        }
        return cursor;
    }

    private static Path findWindowsEquivalentChild(Path parent, String requestedName, String repoPath) {
        if (!Files.isDirectory(parent, LinkOption.NOFOLLOW_LINKS)) return null;
        Path match = null;
        try (var entries = Files.newDirectoryStream(parent)) {
            for (Path entry : entries) {
                Path name = entry.getFileName();
                if (name == null || !name.toString().equalsIgnoreCase(requestedName)) continue;
                if (match != null) {
                    throw validation(ValidationReason.UNSUPPORTED_STATE_PATH,
                            "State directory contains case-colliding entries that are ambiguous under Windows path semantics.",
                            "path", repoPath,
                            "segment", requestedName);
                }
                match = entry;
            }
            return match;
        } catch (ValidationException e) {
            throw e;
        } catch (IOException | SecurityException e) {
            throw validation(ValidationReason.STATE_UNVERIFIABLE,
                    "State directory entries could not be inspected safely.", e,
                    "path", repoPath,
                    "segment", requestedName);
        }
    }

    private static void verifyRawExpectedBase(String path, byte[] expectedBase, byte[] actualBytes) {
        if (!Arrays.equals(expectedBase, actualBytes)) {
            throw validation(ValidationReason.STATE_MISMATCH,
                    "State bytes do not match the package expected base.", "path", path);
        }
    }

    private static ValidationException mapPrepareFailure(PackageStateApplier.ApplyException e) {
        return switch (e.reason()) {
            case ADD_TARGET_EXISTS -> validation(ValidationReason.STATE_MISMATCH,
                    "Add target already exists in the state workspace.", e, "path", safe(e.path()));
            case SOURCE_NOT_REGULAR -> validation(ValidationReason.STATE_MISMATCH,
                    "Expected source path is missing or not a regular file in the state workspace.", e,
                    "path", safe(e.path()));
            case PREPARE_IO -> validation(ValidationReason.STATE_UNVERIFIABLE,
                    "State applicability could not be verified safely.", e, "path", safe(e.path()));
            case MUTATION_FAILED, RESULT_MISMATCH, ROLLBACK_FAILED ->
                    throw e; // Private mechanics after mutation are INTERNAL_ERROR, not caller validation.
        };
    }

    private static void validateZipEntry(String name) {
        if (name.indexOf('\\') >= 0 || name.startsWith("/") || name.matches("^[A-Za-z]:.*") || hasControl(name)) {
            throw validation(ValidationReason.PACKAGE_INVALID, "Unsafe ZIP entry.", "entry", name);
        }
        String trimmed = name.endsWith("/") ? name.substring(0, name.length() - 1) : name;
        if (trimmed.isEmpty()) throw validation(ValidationReason.PACKAGE_INVALID, "Unsafe ZIP entry.", "entry", name);
        for (String segment : trimmed.split("/", -1)) {
            if (segment.isEmpty() || segment.equals(".") || segment.equals("..")) {
                throw validation(ValidationReason.PACKAGE_INVALID, "Unsafe ZIP entry.", "entry", name);
            }
        }
    }

    static String normalizeRepoPath(String path) {
        if (path == null || path.isBlank() || path.indexOf('\\') >= 0 || path.startsWith("/")
                || path.matches("^[A-Za-z]:.*") || path.endsWith("/") || hasControl(path)) {
            throw validation(ValidationReason.PACKAGE_INVALID, "Unsafe package path.", "path", safe(path));
        }
        Set<String> reserved = Set.of("CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4",
                "COM5", "COM6", "COM7", "COM8", "COM9", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5",
                "LPT6", "LPT7", "LPT8", "LPT9");
        for (String segment : path.split("/", -1)) {
            if (segment.isEmpty() || segment.equals(".") || segment.equals("..")
                    || segment.matches(".*[<>:\"|?*].*") || segment.endsWith(" ") || segment.endsWith(".")) {
                throw validation(ValidationReason.PACKAGE_INVALID,
                        "Package path is not a valid Windows file path.", "path", path);
            }
            String stem = segment.split("\\.", 2)[0].toUpperCase(Locale.ROOT);
            if (reserved.contains(stem)) {
                throw validation(ValidationReason.PACKAGE_INVALID,
                        "Package path contains a reserved Windows segment.", "path", path);
            }
        }
        return path;
    }

    private static String utf8Strict(byte[] bytes) {
        try {
            return StandardCharsets.UTF_8.newDecoder()
                    .onMalformedInput(CodingErrorAction.REPORT)
                    .onUnmappableCharacter(CodingErrorAction.REPORT)
                    .decode(ByteBuffer.wrap(bytes)).toString();
        } catch (CharacterCodingException e) {
            throw validation(ValidationReason.PACKAGE_INVALID, "PACKAGE.json must be valid UTF-8.", e);
        }
    }

    private static int number(Object value) {
        return value instanceof Number n ? n.intValue() : Integer.MIN_VALUE;
    }

    private static String string(Object value) {
        return value == null ? null : value instanceof String s ? s : String.valueOf(value);
    }

    private static UUID uuid(String value, String field) {
        try {
            return UUID.fromString(value);
        } catch (Exception e) {
            throw validation(ValidationReason.PACKAGE_INVALID, field + " must be UUID.");
        }
    }

    private static boolean hasControl(String value) {
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            if (c < 0x20 || c == 0x7f) return true;
        }
        return false;
    }

    private static String safe(String value) { return value == null ? "" : value; }

    private static ValidationException validation(ValidationReason reason, String message, String... facts) {
        return validation(reason, message, null, facts);
    }

    private static ValidationException validation(
            ValidationReason reason, String message, Throwable cause, String... facts) {
        Map<String, String> map = new LinkedHashMap<>();
        for (int i = 0; i + 1 < facts.length; i += 2) map.put(facts[i], facts[i + 1]);
        return new ValidationException(reason, message, cause, map);
    }

    /** Minimal strict JSON parser sufficient for PACKAGE.json without external dependencies. */
    private static final class JsonParser {
        private final String text;
        private int index;

        private JsonParser(String text) { this.text = text; }

        static Map<String, Object> parseObject(String text) {
            Object value = new JsonParser(text).parseDocument();
            if (!(value instanceof Map<?, ?> raw)) throw new IllegalArgumentException("JSON root must be object");
            Map<String, Object> out = new LinkedHashMap<>();
            for (Map.Entry<?, ?> entry : raw.entrySet()) out.put(String.valueOf(entry.getKey()), entry.getValue());
            return out;
        }

        private Object parseDocument() {
            skipWhitespace();
            Object value = parseValue();
            skipWhitespace();
            if (index != text.length()) throw error("Trailing content");
            return value;
        }

        private Object parseValue() {
            skipWhitespace();
            if (index >= text.length()) throw error("Unexpected end of JSON");
            return switch (text.charAt(index)) {
                case '{' -> parseObjectValue();
                case '[' -> parseArray();
                case '"' -> parseString();
                case 't' -> literal("true", Boolean.TRUE);
                case 'f' -> literal("false", Boolean.FALSE);
                case 'n' -> literal("null", null);
                default -> parseNumber();
            };
        }

        private Map<String, Object> parseObjectValue() {
            expect('{');
            skipWhitespace();
            Map<String, Object> map = new LinkedHashMap<>();
            if (consume('}')) return map;
            while (true) {
                skipWhitespace();
                String key = parseString();
                skipWhitespace();
                expect(':');
                Object value = parseValue();
                if (map.putIfAbsent(key, value) != null) throw error("Duplicate object key: " + key);
                skipWhitespace();
                if (consume('}')) return map;
                expect(',');
            }
        }

        private List<Object> parseArray() {
            expect('[');
            skipWhitespace();
            List<Object> list = new ArrayList<>();
            if (consume(']')) return list;
            while (true) {
                list.add(parseValue());
                skipWhitespace();
                if (consume(']')) return list;
                expect(',');
            }
        }

        private String parseString() {
            expect('"');
            StringBuilder out = new StringBuilder();
            while (index < text.length()) {
                char c = text.charAt(index++);
                if (c == '"') return out.toString();
                if (c < 0x20) throw error("Control character in string");
                if (c != '\\') {
                    out.append(c);
                    continue;
                }
                if (index >= text.length()) throw error("Incomplete string escape");
                char escape = text.charAt(index++);
                switch (escape) {
                    case '"', '\\', '/' -> out.append(escape);
                    case 'b' -> out.append('\b');
                    case 'f' -> out.append('\f');
                    case 'n' -> out.append('\n');
                    case 'r' -> out.append('\r');
                    case 't' -> out.append('\t');
                    case 'u' -> out.append(parseUnicode());
                    default -> throw error("Invalid string escape");
                }
            }
            throw error("Unterminated string");
        }

        private char parseUnicode() {
            if (index + 4 > text.length()) throw error("Incomplete unicode escape");
            int value = 0;
            for (int i = 0; i < 4; i++) {
                int digit = Character.digit(text.charAt(index++), 16);
                if (digit < 0) throw error("Invalid unicode escape");
                value = (value << 4) | digit;
            }
            return (char) value;
        }

        private Number parseNumber() {
            int start = index;
            if (consume('-')) {}
            if (index >= text.length()) throw error("Invalid number");
            if (text.charAt(index) == '0') {
                index++;
            } else {
                if (!Character.isDigit(text.charAt(index))) throw error("Invalid number");
                while (index < text.length() && Character.isDigit(text.charAt(index))) index++;
            }
            boolean decimal = false;
            if (consume('.')) {
                decimal = true;
                if (index >= text.length() || !Character.isDigit(text.charAt(index))) throw error("Invalid number");
                while (index < text.length() && Character.isDigit(text.charAt(index))) index++;
            }
            if (index < text.length() && (text.charAt(index) == 'e' || text.charAt(index) == 'E')) {
                decimal = true;
                index++;
                if (index < text.length() && (text.charAt(index) == '+' || text.charAt(index) == '-')) index++;
                if (index >= text.length() || !Character.isDigit(text.charAt(index))) throw error("Invalid number");
                while (index < text.length() && Character.isDigit(text.charAt(index))) index++;
            }
            String raw = text.substring(start, index);
            try {
                return decimal ? Double.parseDouble(raw) : Long.parseLong(raw);
            } catch (NumberFormatException e) {
                throw error("Invalid number");
            }
        }

        private Object literal(String expected, Object value) {
            if (!text.startsWith(expected, index)) throw error("Invalid literal");
            index += expected.length();
            return value;
        }

        private void skipWhitespace() {
            while (index < text.length()) {
                char c = text.charAt(index);
                if (c == ' ' || c == '\t' || c == '\r' || c == '\n') index++;
                else break;
            }
        }

        private void expect(char expected) {
            if (!consume(expected)) throw error("Expected '" + expected + "'");
        }

        private boolean consume(char expected) {
            if (index < text.length() && text.charAt(index) == expected) {
                index++;
                return true;
            }
            return false;
        }

        private IllegalArgumentException error(String message) {
            return new IllegalArgumentException(message + " at offset " + index);
        }
    }
}

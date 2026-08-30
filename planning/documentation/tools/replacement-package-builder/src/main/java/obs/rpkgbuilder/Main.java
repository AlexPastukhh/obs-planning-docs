package obs.rpkgbuilder;

import java.io.PrintStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public final class Main {
    private Main() {}

    public static void main(String[] args) {
        try {
            PackageBuilder.BuildRequest request = parseBuildRequest(args);
            if (request == null) {
                printUsage();
                return;
            }

            PackageBuilder.BuildResult result = PackageBuilder.build(request);

            System.out.println("BUILD_OK");
            System.out.println("archive=" + result.output().toAbsolutePath().normalize());
            System.out.println("packageId=" + result.packageId());
            System.out.println("changeSetId=" + result.changeSetId());
            System.out.println("repositoryIdentity=" + result.repositoryIdentity());
            System.out.println("add=" + result.addCount());
            System.out.println("replace=" + result.replaceCount());
            System.out.println("delete=" + result.deleteCount());
            System.out.println("noOp=" + result.noOpCount());
        } catch (PackageBuilder.ValidationException e) {
            printValidationFailure(System.out, e);
            System.exit(2);
        } catch (Exception e) {
            printInternalFailure(System.out, System.err, e);
            System.exit(1);
        }
    }

    static PackageBuilder.BuildRequest parseBuildRequest(String[] args) {
        try {
            ParsedArgs parsed = parseArgs(args);
            Map<String, String> options = parsed.options();
            if (options.containsKey("--help")) {
                rejectUnknown(options);
                if (!parsed.deletePaths().isEmpty()) {
                    throw new IllegalArgumentException("--help cannot be combined with --delete.");
                }
                return null;
            }

            rejectUnknown(options);
            Path repo = Path.of(required(options, "--repo"));
            Path desired = options.containsKey("--desired") ? Path.of(required(options, "--desired")) : null;
            Path output = Path.of(required(options, "--output"));
            String label = required(options, "--change-set-label");
            UUID changeSetId = options.containsKey("--change-set-id")
                    ? UUID.fromString(options.get("--change-set-id"))
                    : UUID.randomUUID();
            UUID packageId = UUID.randomUUID();
            return new PackageBuilder.BuildRequest(
                    repo, desired, output, packageId, changeSetId, label, List.copyOf(parsed.deletePaths()));
        } catch (IllegalArgumentException e) {
            throw invalidRequest(e);
        }
    }

    static void printValidationFailure(PrintStream out, PackageBuilder.ValidationException failure) {
        out.println("BUILD_FAILED");
        out.println("code=VALIDATION_FAILED");
        out.println("reason=" + failure.reason());
        out.println("message=" + oneLine(failure.getMessage()));
        for (Map.Entry<String, String> fact : failure.facts().entrySet()) {
            out.println(fact.getKey() + "=" + oneLine(fact.getValue()));
        }
    }

    static void printInternalFailure(PrintStream out, PrintStream err, Exception failure) {
        UUID diagnosticId = UUID.randomUUID();
        out.println("BUILD_FAILED");
        out.println("code=INTERNAL_ERROR");
        out.println("diagnosticId=" + diagnosticId);
        out.println("message=Replacement Package Builder failed unexpectedly. Inspect stderr trace using diagnosticId.");

        err.println("INTERNAL_ERROR diagnosticId=" + diagnosticId);
        failure.printStackTrace(err);
    }

    private static PackageBuilder.ValidationException invalidRequest(IllegalArgumentException cause) {
        return new PackageBuilder.ValidationException(
                PackageBuilder.ValidationReason.INVALID_REQUEST,
                cause.getMessage() == null || cause.getMessage().isBlank() ? "Invalid command invocation." : cause.getMessage(),
                cause,
                Map.of());
    }

    private record ParsedArgs(Map<String, String> options, List<String> deletePaths) {}

    private static ParsedArgs parseArgs(String[] args) {
        Map<String, String> result = new LinkedHashMap<>();
        List<String> deletes = new ArrayList<>();
        for (int i = 0; i < args.length; i++) {
            String arg = args[i];
            if (arg.equals("--help")) {
                if (result.put(arg, "true") != null) throw new IllegalArgumentException("Duplicate option: " + arg);
                continue;
            }
            if (!arg.startsWith("--")) throw new IllegalArgumentException("Unexpected argument: " + arg);
            if (i + 1 >= args.length) throw new IllegalArgumentException("Missing value for " + arg);
            String value = args[++i];
            if (arg.equals("--delete")) {
                if (value.isBlank()) throw new IllegalArgumentException("Missing value for --delete");
                deletes.add(value);
                continue;
            }
            if (result.put(arg, value) != null) throw new IllegalArgumentException("Duplicate option: " + arg);
        }
        return new ParsedArgs(result, deletes);
    }

    private static String required(Map<String, String> options, String key) {
        String value = options.get(key);
        if (value == null || value.isBlank()) throw new IllegalArgumentException("Missing required option " + key);
        return value;
    }

    private static void rejectUnknown(Map<String, String> options) {
        for (String key : options.keySet()) {
            if (!key.equals("--repo") && !key.equals("--desired") && !key.equals("--output")
                    && !key.equals("--change-set-label") && !key.equals("--change-set-id") && !key.equals("--help")) {
                throw new IllegalArgumentException("Unknown option: " + key);
            }
        }
    }

    private static String oneLine(String value) {
        if (value == null) return "";
        return value.replace("\\", "\\\\")
                .replace("\r", "\\r")
                .replace("\n", "\\n");
    }

    private static void printUsage() {
        System.out.println("Usage:");
        System.out.println("  java -jar replacement-package-builder.jar --repo <path> --output <zip>");
        System.out.println("       --change-set-label <text> [--change-set-id <uuid>]");
        System.out.println("       [--desired <path>] [--delete <repo-relative-path>]...");
        System.out.println("  At least one of --desired or --delete is required.");
    }
}

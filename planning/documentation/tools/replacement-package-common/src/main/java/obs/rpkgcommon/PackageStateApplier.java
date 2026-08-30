package obs.rpkgcommon;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/** Deterministic file-state application for validated replacement-package operations. */
public final class PackageStateApplier {
    private PackageStateApplier() {}

    public enum Action { ADD, REPLACE, DELETE }

    public enum FailureReason {
        ADD_TARGET_EXISTS,
        SOURCE_NOT_REGULAR,
        PREPARE_IO,
        MUTATION_FAILED,
        RESULT_MISMATCH,
        ROLLBACK_FAILED
    }

    public static final class ApplyException extends RuntimeException {
        private final FailureReason reason;
        private final String path;

        public ApplyException(FailureReason reason, String path, String message, Throwable cause) {
            super(message, cause);
            this.reason = Objects.requireNonNull(reason);
            this.path = path;
        }

        public FailureReason reason() { return reason; }
        public String path() { return path; }
    }

    public record Operation(String path, Path target, Action action, byte[] expectedBase, byte[] replacement) {
        public Operation {
            Objects.requireNonNull(path, "path");
            Objects.requireNonNull(target, "target");
            Objects.requireNonNull(action, "action");
            expectedBase = expectedBase == null ? null : expectedBase.clone();
            replacement = replacement == null ? null : replacement.clone();
            switch (action) {
                case ADD -> {
                    if (expectedBase != null || replacement == null) {
                        throw new IllegalArgumentException("ADD requires replacement bytes and no expected base: " + path);
                    }
                }
                case REPLACE -> {
                    if (expectedBase == null || replacement == null) {
                        throw new IllegalArgumentException("REPLACE requires expected base and replacement bytes: " + path);
                    }
                }
                case DELETE -> {
                    if (expectedBase == null || replacement != null) {
                        throw new IllegalArgumentException("DELETE requires expected base and no replacement bytes: " + path);
                    }
                }
            }
        }

        @Override public byte[] expectedBase() { return expectedBase == null ? null : expectedBase.clone(); }
        @Override public byte[] replacement() { return replacement == null ? null : replacement.clone(); }
    }

    @FunctionalInterface
    public interface SourceVerifier {
        void verify(String path, byte[] expectedBase, byte[] actualBytes);
    }

    private record Backup(boolean existed, byte[] bytes) {
        Backup {
            bytes = bytes == null ? null : bytes.clone();
        }
    }

    public static PreparedChange prepare(List<Operation> requested, SourceVerifier verifier) {
        Objects.requireNonNull(requested, "requested");
        Objects.requireNonNull(verifier, "verifier");
        List<Operation> operations = List.copyOf(requested);
        Map<Path, String> targets = new LinkedHashMap<>();
        Map<String, Backup> backups = new LinkedHashMap<>();

        for (Operation operation : operations) {
            String prior = targets.putIfAbsent(operation.target().toAbsolutePath().normalize(), operation.path());
            if (prior != null) {
                throw new IllegalArgumentException("Multiple operations resolve to the same target: "
                        + prior + " / " + operation.path());
            }
            Path target = operation.target();
            if (operation.action() == Action.ADD) {
                if (Files.exists(target, LinkOption.NOFOLLOW_LINKS)) {
                    throw failure(FailureReason.ADD_TARGET_EXISTS, operation.path(),
                            "Add target already exists: " + operation.path(), null);
                }
                backups.put(operation.path(), new Backup(false, null));
                continue;
            }

            if (!Files.isRegularFile(target, LinkOption.NOFOLLOW_LINKS)) {
                throw failure(FailureReason.SOURCE_NOT_REGULAR, operation.path(),
                        "Expected source path is missing or not a regular file: " + operation.path(), null);
            }
            byte[] actual;
            try {
                actual = Files.readAllBytes(target);
            } catch (IOException | SecurityException e) {
                throw failure(FailureReason.PREPARE_IO, operation.path(),
                        "Cannot capture source bytes before apply: " + operation.path(), e);
            }
            verifier.verify(operation.path(), operation.expectedBase(), actual.clone());
            backups.put(operation.path(), new Backup(true, actual));
        }
        return new PreparedChange(operations, backups);
    }

    public static AppliedChange apply(List<Operation> operations, SourceVerifier verifier) {
        return prepare(operations, verifier).apply();
    }

    public static final class PreparedChange {
        private final List<Operation> operations;
        private final Map<String, Backup> backups;
        private boolean applied;

        private PreparedChange(List<Operation> operations, Map<String, Backup> backups) {
            this.operations = operations;
            this.backups = new LinkedHashMap<>(backups);
        }

        public AppliedChange apply() {
            if (applied) throw new IllegalStateException("Prepared change may be applied only once.");
            applied = true;
            try {
                mutate(operations);
                verifyResults(operations);
                return new AppliedChange(operations, backups);
            } catch (Throwable failure) {
                try {
                    rollbackAndVerify(operations, backups);
                } catch (Throwable rollbackFailure) {
                    rollbackFailure.addSuppressed(failure);
                    if (rollbackFailure instanceof ApplyException ae
                            && ae.reason() == FailureReason.ROLLBACK_FAILED) {
                        throw ae;
                    }
                    throw failure(FailureReason.ROLLBACK_FAILED, null,
                            "Apply failed and rollback could not be verified.", rollbackFailure);
                }
                if (failure instanceof ApplyException ae) throw ae;
                throw failure(FailureReason.MUTATION_FAILED, null,
                        "Replacement-package state mutation failed.", failure);
            }
        }
    }

    public static final class AppliedChange implements AutoCloseable {
        private final List<Operation> operations;
        private final Map<String, Backup> backups;
        private boolean finished;

        private AppliedChange(List<Operation> operations, Map<String, Backup> backups) {
            this.operations = operations;
            this.backups = new LinkedHashMap<>(backups);
        }

        public void commit() {
            if (finished) throw new IllegalStateException("Applied change is already finished.");
            finished = true;
        }

        public void rollback() {
            if (finished) throw new IllegalStateException("Applied change is already finished.");
            rollbackAndVerify(operations, backups);
            finished = true;
        }

        @Override public void close() {
            if (!finished) rollback();
        }
    }

    private static void mutate(List<Operation> operations) {
        for (Operation operation : operations) {
            try {
                Path target = operation.target();
                if (operation.action() == Action.DELETE) {
                    Files.delete(target);
                } else {
                    Path parent = target.getParent();
                    if (parent != null) Files.createDirectories(parent);
                    Files.write(target, operation.replacement(),
                            StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
                }
            } catch (IOException | SecurityException e) {
                throw failure(FailureReason.MUTATION_FAILED, operation.path(),
                        "Cannot apply operation: " + operation.path(), e);
            }
        }
    }

    private static void verifyResults(List<Operation> operations) {
        for (Operation operation : operations) {
            Path target = operation.target();
            if (operation.action() == Action.DELETE) {
                if (Files.exists(target, LinkOption.NOFOLLOW_LINKS)) {
                    throw failure(FailureReason.RESULT_MISMATCH, operation.path(),
                            "Delete result still exists: " + operation.path(), null);
                }
                continue;
            }
            if (!Files.isRegularFile(target, LinkOption.NOFOLLOW_LINKS)) {
                throw failure(FailureReason.RESULT_MISMATCH, operation.path(),
                        "Result is not a regular file: " + operation.path(), null);
            }
            try {
                if (!Arrays.equals(Files.readAllBytes(target), operation.replacement())) {
                    throw failure(FailureReason.RESULT_MISMATCH, operation.path(),
                            "Result bytes mismatch: " + operation.path(), null);
                }
            } catch (IOException | SecurityException e) {
                throw failure(FailureReason.RESULT_MISMATCH, operation.path(),
                        "Cannot verify result bytes: " + operation.path(), e);
            }
        }
    }

    private static void rollbackAndVerify(List<Operation> operations, Map<String, Backup> backups) {
        List<Throwable> failures = new ArrayList<>();
        for (Operation operation : operations) {
            Backup backup = backups.get(operation.path());
            Path target = operation.target();
            try {
                if (!backup.existed()) {
                    Files.deleteIfExists(target);
                } else {
                    Path parent = target.getParent();
                    if (parent != null) Files.createDirectories(parent);
                    Files.write(target, backup.bytes(),
                            StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
                }
            } catch (Throwable e) {
                failures.add(e);
            }
        }
        for (Operation operation : operations) {
            Backup backup = backups.get(operation.path());
            Path target = operation.target();
            try {
                boolean exists = Files.isRegularFile(target, LinkOption.NOFOLLOW_LINKS);
                if (exists != backup.existed()
                        || (backup.existed() && !Arrays.equals(Files.readAllBytes(target), backup.bytes()))) {
                    failures.add(new IOException("Rollback bytes mismatch: " + operation.path()));
                }
            } catch (Throwable e) {
                failures.add(e);
            }
        }
        if (!failures.isEmpty()) {
            ApplyException failure = failure(FailureReason.ROLLBACK_FAILED, null,
                    "Rollback could not restore and verify the prior file state.", failures.get(0));
            for (int i = 1; i < failures.size(); i++) failure.addSuppressed(failures.get(i));
            throw failure;
        }
    }

    private static ApplyException failure(
            FailureReason reason, String path, String message, Throwable cause) {
        return new ApplyException(reason, path, message, cause);
    }
}

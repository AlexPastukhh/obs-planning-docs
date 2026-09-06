package obs.replacementpackage.domain.shared.valueobjects;

import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public final class DiffArtifact {
        private final CommitId fromCommit;
        private final Optional<GitTreeId> toTree;
        private final Optional<CaptureFingerprint> toFingerprint;

        private DiffArtifact(CommitId fromCommit, Optional<GitTreeId> toTree, Optional<CaptureFingerprint> toFingerprint) {
            this.fromCommit = Objects.requireNonNull(fromCommit);
            this.toTree = Objects.requireNonNull(toTree);
            this.toFingerprint = Objects.requireNonNull(toFingerprint);
            if (toTree.isPresent() == toFingerprint.isPresent())
                throw new IllegalArgumentException("diff must end at exactly one semantic target");
        }

        public static DiffArtifact toTree(CommitId fromCommit, GitTreeId toTree) {
            return new DiffArtifact(fromCommit, Optional.of(Objects.requireNonNull(toTree)), Optional.empty());
        }
        public static DiffArtifact toCapture(CommitId fromCommit, CaptureFingerprint toFingerprint) {
            return new DiffArtifact(fromCommit, Optional.empty(), Optional.of(Objects.requireNonNull(toFingerprint)));
        }
        public CommitId fromCommit() { return fromCommit; }
        public Optional<GitTreeId> toTree() { return toTree; }
        public Optional<CaptureFingerprint> toFingerprint() { return toFingerprint; }

        @Override public boolean equals(Object o) {
            if (!(o instanceof DiffArtifact other)) return false;
            return fromCommit.equals(other.fromCommit) && toTree.equals(other.toTree) && toFingerprint.equals(other.toFingerprint);
        }
        @Override public int hashCode() { return Objects.hash(fromCommit, toTree, toFingerprint); }
    }

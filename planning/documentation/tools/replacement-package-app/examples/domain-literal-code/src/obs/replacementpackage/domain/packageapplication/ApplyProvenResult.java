package obs.replacementpackage.domain.packageapplication;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record ApplyProvenResult(
            ApplicationStage state,
            Optional<CommitId> commitId,
            Optional<GitTreeId> committedTree,
            Optional<CommitId> publishedTip,
            Optional<GitTreeId> publishedTree) {
        public ApplyProvenResult {
            Objects.requireNonNull(state);
            commitId = Objects.requireNonNull(commitId);
            committedTree = Objects.requireNonNull(committedTree);
            publishedTip = Objects.requireNonNull(publishedTip);
            publishedTree = Objects.requireNonNull(publishedTree);
        }
    }

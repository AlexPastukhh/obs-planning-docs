package obs.replacementpackage.domain.repositorywork;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record WorkBranchEvidence(BranchName branch, CommitId baseCommit, Optional<CommitId> knownTip) {
        public WorkBranchEvidence {
            Objects.requireNonNull(branch); Objects.requireNonNull(baseCommit);
            knownTip = Objects.requireNonNull(knownTip);
        }
        public WorkBranchEvidence(BranchName branch, CommitId baseCommit) {
            this(branch, baseCommit, Optional.empty());
        }
    }

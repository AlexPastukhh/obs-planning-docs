package obs.replacementpackage.domain.workissue;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record ManagedWorkIdentityText(
            ChangeSetId changeSetId,
            BranchName workBranch,
            BranchName targetBranch,
            CommitId startBaseCommit) {
        public ManagedWorkIdentityText {
            Objects.requireNonNull(changeSetId);
            Objects.requireNonNull(workBranch);
            Objects.requireNonNull(targetBranch);
            Objects.requireNonNull(startBaseCommit);
        }
    }

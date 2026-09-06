package obs.replacementpackage.domain.workfinalization;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record IntegrationEvidence(CommitId sourceTip, GitTreeId sourceTree, BranchName targetBranch) {
        public IntegrationEvidence { Objects.requireNonNull(sourceTip); Objects.requireNonNull(sourceTree); Objects.requireNonNull(targetBranch); }
    }

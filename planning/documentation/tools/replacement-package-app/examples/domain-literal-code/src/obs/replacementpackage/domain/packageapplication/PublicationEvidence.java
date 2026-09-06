package obs.replacementpackage.domain.packageapplication;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record PublicationEvidence(RemoteBranchRef remoteBranch, CommitId remoteTip, GitTreeId remoteTree) implements PublicationAttemptResultEvidence {
        public PublicationEvidence {
            Objects.requireNonNull(remoteBranch); Objects.requireNonNull(remoteTip); Objects.requireNonNull(remoteTree);
        }
    }

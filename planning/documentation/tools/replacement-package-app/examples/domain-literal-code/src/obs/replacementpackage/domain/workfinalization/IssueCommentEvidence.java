package obs.replacementpackage.domain.workfinalization;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record IssueCommentEvidence(IssueRef issueRef, IssueCommentId commentId, CommentText body) {
        public IssueCommentEvidence { Objects.requireNonNull(issueRef); Objects.requireNonNull(commentId); Objects.requireNonNull(body); }
    }

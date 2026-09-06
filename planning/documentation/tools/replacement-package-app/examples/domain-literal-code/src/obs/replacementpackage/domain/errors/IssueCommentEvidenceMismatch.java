package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class IssueCommentEvidenceMismatch extends DomainViolation { public IssueCommentEvidenceMismatch() { super("issue comment evidence mismatch"); } }

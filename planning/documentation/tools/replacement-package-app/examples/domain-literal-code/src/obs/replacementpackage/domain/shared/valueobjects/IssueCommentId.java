package obs.replacementpackage.domain.shared.valueobjects;

import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record IssueCommentId(long value) { public IssueCommentId { if (value <= 0) throw new IllegalArgumentException("comment id"); } }

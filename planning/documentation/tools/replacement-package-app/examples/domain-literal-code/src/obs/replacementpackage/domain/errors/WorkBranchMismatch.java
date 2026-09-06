package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class WorkBranchMismatch extends DomainViolation { public WorkBranchMismatch() { super("work branch evidence mismatch"); } }

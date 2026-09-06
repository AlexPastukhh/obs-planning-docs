package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class ReviewArtifactMismatch extends DomainViolation { public ReviewArtifactMismatch(String m) { super(m); } }

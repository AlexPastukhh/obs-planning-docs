package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class SendEvidenceMismatch extends DomainViolation { public SendEvidenceMismatch() { super("send evidence mismatch"); } }

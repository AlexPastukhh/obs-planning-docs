package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class InvalidPackageOperation extends DomainViolation { public InvalidPackageOperation(String m) { super(m); } }

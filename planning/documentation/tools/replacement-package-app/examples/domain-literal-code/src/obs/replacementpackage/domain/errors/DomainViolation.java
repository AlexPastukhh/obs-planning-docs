package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public class DomainViolation extends RuntimeException {
        public DomainViolation(String message) { super(message); }
    }

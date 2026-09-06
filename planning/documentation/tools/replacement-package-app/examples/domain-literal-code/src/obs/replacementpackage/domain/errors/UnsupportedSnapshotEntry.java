package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class UnsupportedSnapshotEntry extends DomainViolation { public UnsupportedSnapshotEntry() { super("unsupported snapshot entry"); } }

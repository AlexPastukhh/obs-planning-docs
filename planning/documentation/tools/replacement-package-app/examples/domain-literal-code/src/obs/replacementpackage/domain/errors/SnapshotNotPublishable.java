package obs.replacementpackage.domain.errors;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

@SuppressWarnings("serial")
    public final class SnapshotNotPublishable extends DomainViolation { public SnapshotNotPublishable() { super("snapshot not publishable"); } }

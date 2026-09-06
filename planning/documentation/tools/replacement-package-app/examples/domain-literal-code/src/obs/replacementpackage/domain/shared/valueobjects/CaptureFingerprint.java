package obs.replacementpackage.domain.shared.valueobjects;

import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record CaptureFingerprint(String value) { public CaptureFingerprint { value = DomainText.text(value, "captureFingerprint"); } }

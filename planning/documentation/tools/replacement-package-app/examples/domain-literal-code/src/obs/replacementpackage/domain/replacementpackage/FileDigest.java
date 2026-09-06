package obs.replacementpackage.domain.replacementpackage;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record FileDigest(String value) { public FileDigest { value = DomainText.text(value, "fileDigest"); } }

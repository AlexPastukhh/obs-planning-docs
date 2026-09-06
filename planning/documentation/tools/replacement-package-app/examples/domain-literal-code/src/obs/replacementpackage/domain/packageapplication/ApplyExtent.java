package obs.replacementpackage.domain.packageapplication;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public enum ApplyExtent { APPLY, APPLY_COMMIT, APPLY_COMMIT_PUBLISH }

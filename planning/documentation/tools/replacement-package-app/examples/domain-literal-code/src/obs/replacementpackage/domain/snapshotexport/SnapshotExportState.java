package obs.replacementpackage.domain.snapshotexport;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public enum SnapshotExportState { NEW, FIRST_CAPTURED, CONFIRMED, FAILED, PUBLISHED }

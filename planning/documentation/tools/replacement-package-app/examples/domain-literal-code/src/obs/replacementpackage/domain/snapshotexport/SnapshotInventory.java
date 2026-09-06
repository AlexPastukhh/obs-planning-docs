package obs.replacementpackage.domain.snapshotexport;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

public record SnapshotInventory(Map<String, ArtifactFingerprint> entries, CaptureFingerprint fingerprint) {
        public SnapshotInventory {
            entries = Map.copyOf(Objects.requireNonNull(entries));
            Objects.requireNonNull(fingerprint);
        }
    }

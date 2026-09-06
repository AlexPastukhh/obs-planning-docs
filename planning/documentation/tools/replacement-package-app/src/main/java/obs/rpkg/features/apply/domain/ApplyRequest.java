package obs.rpkg.features.apply.domain;

import java.nio.file.Path;
import java.util.Objects;

/** Semantic invocation variants for starting or continuing the same Apply Feature. */
public sealed interface ApplyRequest permits ApplyRequest.Start, ApplyRequest.Resume {
    String changeSetId();
    ApplyExtent extent();

    record Start(
            Path archive,
            Path repositoryRoot,
            String changeSetId,
            ApplyExtent extent) implements ApplyRequest {
        public Start {
            Objects.requireNonNull(archive, "archive");
            Objects.requireNonNull(repositoryRoot, "repositoryRoot");
            requireId(changeSetId, "changeSetId");
            Objects.requireNonNull(extent, "extent");
        }
    }

    record Resume(
            String changeSetId,
            String packageId,
            ApplyExtent extent) implements ApplyRequest {
        public Resume {
            requireId(changeSetId, "changeSetId");
            requireId(packageId, "packageId");
            Objects.requireNonNull(extent, "extent");
        }
    }

    private static void requireId(String value, String name) {
        if (value == null || value.isBlank()) throw new IllegalArgumentException(name + " is required");
    }
}

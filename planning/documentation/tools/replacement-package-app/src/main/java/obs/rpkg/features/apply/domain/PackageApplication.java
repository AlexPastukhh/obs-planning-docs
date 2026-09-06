package obs.rpkg.features.apply.domain;

import java.util.Objects;

/** Domain view of the current proven state of one exact package in one repository work context. */
public record PackageApplication(
        String changeSetId,
        String packageId,
        ApplyProgress progress,
        String commitSha,
        String publishedTip) {
    public PackageApplication {
        if (changeSetId == null || changeSetId.isBlank()) throw new IllegalArgumentException("changeSetId is required");
        if (packageId == null || packageId.isBlank()) throw new IllegalArgumentException("packageId is required");
        Objects.requireNonNull(progress, "progress");
    }

    public boolean satisfies(ApplyExtent extent) {
        return progress.satisfies(extent);
    }
}

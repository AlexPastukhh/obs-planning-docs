package obs.rpkg.features.apply.domain;

import java.util.Objects;

/** Exact identity of one replacement-package archive. */
public record ReplacementPackageIdentity(String packageId, String archiveSha256) {
    public ReplacementPackageIdentity {
        Objects.requireNonNull(packageId, "packageId");
        packageId = packageId.trim();
        if (packageId.isEmpty()) throw new IllegalArgumentException("packageId is required");
        Objects.requireNonNull(archiveSha256, "archiveSha256");
        archiveSha256 = archiveSha256.trim();
        if (archiveSha256.isEmpty()) throw new IllegalArgumentException("archiveSha256 is required");
    }

    public boolean sameExactArchive(ReplacementPackageIdentity other) {
        return other != null
                && packageId.equals(other.packageId)
                && archiveSha256.equals(other.archiveSha256);
    }
}

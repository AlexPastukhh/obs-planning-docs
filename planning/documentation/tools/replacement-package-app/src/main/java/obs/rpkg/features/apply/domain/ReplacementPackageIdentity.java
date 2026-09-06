package obs.rpkg.features.apply.domain;

/**
 * Identity of one replacement-package archive.
 *
 * <p>archiveSha256 is required for state created by the new module. It may be absent only for
 * state migrated from legacy Core persistence that never recorded durable package content identity.</p>
 */
public record ReplacementPackageIdentity(String packageId, String archiveSha256) {
    public ReplacementPackageIdentity {
        if (packageId == null || packageId.isBlank()) {
            throw new IllegalArgumentException("packageId is required");
        }
        if (archiveSha256 != null && archiveSha256.isBlank()) archiveSha256 = null;
    }

    public boolean hasExactArchiveIdentity() {
        return archiveSha256 != null;
    }

    public boolean sameExactArchive(ReplacementPackageIdentity other) {
        return other != null
                && packageId.equals(other.packageId)
                && archiveSha256 != null
                && archiveSha256.equals(other.archiveSha256);
    }
}

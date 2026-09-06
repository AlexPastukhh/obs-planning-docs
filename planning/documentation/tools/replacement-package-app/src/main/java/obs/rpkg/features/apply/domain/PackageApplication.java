package obs.rpkg.features.apply.domain;

import java.util.Objects;

/**
 * Proven state of one exact package application.
 *
 * <p>Existence of this object means package file application itself is proven. Commit and publication
 * are independent facts. Publication confirmation describes whether the external publication state
 * was observed reliably; it is not itself a success/failure result.</p>
 */
public record PackageApplication(
        String changeSetId,
        String packageId,
        String commitSha,
        PublicationConfirmationState publicationConfirmation,
        String lastConfirmedPublishedTip) {
    public PackageApplication {
        if (changeSetId == null || changeSetId.isBlank()) throw new IllegalArgumentException("changeSetId is required");
        if (packageId == null || packageId.isBlank()) throw new IllegalArgumentException("packageId is required");
        Objects.requireNonNull(publicationConfirmation, "publicationConfirmation");
        if (commitSha == null || commitSha.isBlank()) commitSha = null;
        if (lastConfirmedPublishedTip == null || lastConfirmedPublishedTip.isBlank()) lastConfirmedPublishedTip = null;
        if (publicationConfirmation != PublicationConfirmationState.NOT_REQUESTED && commitSha == null) {
            throw new IllegalArgumentException("Publication confirmation state requires an exact commit");
        }
    }

    public boolean isApplied() {
        return true;
    }

    public boolean isCommitted() {
        return commitSha != null;
    }

    public boolean isPublicationConfirmed() {
        return publicationConfirmation == PublicationConfirmationState.CONFIRMED;
    }

    public boolean isPublished() {
        return isCommitted()
                && isPublicationConfirmed()
                && Objects.equals(commitSha, lastConfirmedPublishedTip);
    }

    public boolean satisfies(ApplyExtent extent) {
        Objects.requireNonNull(extent, "extent");
        return switch (extent) {
            case APPLY -> isApplied();
            case APPLY_COMMIT -> isCommitted();
            case APPLY_COMMIT_PUBLISH -> isPublished();
        };
    }

    public PackageApplication withPublicationConfirmation(PublicationConfirmationState confirmation) {
        return new PackageApplication(changeSetId, packageId, commitSha, confirmation, lastConfirmedPublishedTip);
    }
}

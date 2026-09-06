package obs.rpkg.features.apply.domain;

import java.util.Objects;

/**
 * Durable facts known about one exact replacement package in one ChangeSet.
 *
 * <p>Result/OperationResult describes the outcome of a concrete operation. This object describes
 * state that remains true for later independent Apply / Commit / Publish operations.</p>
 */
public record ReplacementPackageState(
        String changeSetId,
        ReplacementPackageIdentity packageIdentity,
        boolean applied,
        String commitSha,
        PublicationObservation publication) {

    public ReplacementPackageState {
        if (changeSetId == null || changeSetId.isBlank()) {
            throw new IllegalArgumentException("changeSetId is required");
        }
        Objects.requireNonNull(packageIdentity, "packageIdentity");
        Objects.requireNonNull(publication, "publication");
        if (commitSha != null && commitSha.isBlank()) commitSha = null;
        if (commitSha != null && !applied) {
            throw new IllegalArgumentException("Committed replacement package must already be applied");
        }
        if (!(publication instanceof PublicationObservation.NotRequested) && commitSha == null) {
            throw new IllegalArgumentException("Publication state requires an exact commit");
        }
    }

    public boolean isCommitted() {
        return commitSha != null;
    }

    public boolean isPublished() {
        return isCommitted() && publication.confirmsTip(commitSha);
    }

    public ReplacementPackageState committed(String exactCommitSha) {
        if (!applied) throw new IllegalStateException("Cannot commit a package that is not applied");
        if (exactCommitSha == null || exactCommitSha.isBlank()) {
            throw new IllegalArgumentException("exactCommitSha is required");
        }
        return new ReplacementPackageState(
                changeSetId,
                packageIdentity,
                true,
                exactCommitSha,
                new PublicationObservation.NotRequested());
    }

    public ReplacementPackageState withPublication(PublicationObservation observation) {
        return new ReplacementPackageState(
                changeSetId,
                packageIdentity,
                applied,
                commitSha,
                Objects.requireNonNull(observation, "observation"));
    }
}

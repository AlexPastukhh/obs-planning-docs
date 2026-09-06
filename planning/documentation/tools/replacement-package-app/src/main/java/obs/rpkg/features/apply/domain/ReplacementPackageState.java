package obs.rpkg.features.apply.domain;

import java.util.Objects;

import obs.rpkg.work.domain.WorkId;

/**
 * Durable facts known about one exact replacement package in one Work.
 *
 * <p>The existence of this state is the proof that Apply succeeded for the exact package identity.
 * Result/OperationResult remains the outcome of a concrete invocation.</p>
 */
public record ReplacementPackageState(
        WorkId workId,
        ReplacementPackageIdentity packageIdentity,
        String commitSha,
        PublicationObservation publication) {

    public ReplacementPackageState {
        Objects.requireNonNull(workId, "workId");
        Objects.requireNonNull(packageIdentity, "packageIdentity");
        Objects.requireNonNull(publication, "publication");
        if (commitSha != null && commitSha.isBlank()) commitSha = null;
        if (!(publication instanceof PublicationObservation.NotRequested) && commitSha == null) {
            throw new IllegalArgumentException("Publication state requires an exact commit");
        }
    }

    public boolean isCommitted() { return commitSha != null; }

    public boolean isPublished() {
        return isCommitted() && publication.confirmsTip(commitSha);
    }

    public ReplacementPackageState committed(String exactCommitSha) {
        if (exactCommitSha == null || exactCommitSha.isBlank()) {
            throw new IllegalArgumentException("exactCommitSha is required");
        }
        if (isCommitted()) {
            if (!commitSha.equals(exactCommitSha)) {
                throw new IllegalStateException("Replacement package is already bound to a different commit");
            }
            return this;
        }
        return new ReplacementPackageState(
                workId, packageIdentity, exactCommitSha, new PublicationObservation.NotRequested());
    }

    public ReplacementPackageState withPublication(PublicationObservation observation) {
        return new ReplacementPackageState(
                workId, packageIdentity, commitSha, Objects.requireNonNull(observation, "observation"));
    }
}

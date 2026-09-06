package obs.replacementpackage.domain.packageapplication;

import obs.replacementpackage.domain.shared.valueobjects.CommitId;
import obs.replacementpackage.domain.shared.valueobjects.RemoteBranchRef;
import obs.replacementpackage.domain.errors.PublicationEvidenceMismatch;
import java.util.Objects;
import java.util.Optional;

/** Proof that the exact intended tip is not currently published on the intended remote branch. */
public record PublicationNotPublishedEvidence(
        RemoteBranchRef remoteBranch,
        CommitId intendedTip,
        Optional<CommitId> observedRemoteTip) implements PublicationAttemptResultEvidence {
    public PublicationNotPublishedEvidence {
        Objects.requireNonNull(remoteBranch);
        Objects.requireNonNull(intendedTip);
        observedRemoteTip = Objects.requireNonNull(observedRemoteTip);
        if (observedRemoteTip.filter(intendedTip::equals).isPresent())
            throw new PublicationEvidenceMismatch("not-published evidence observes the intended tip as published");
    }
}

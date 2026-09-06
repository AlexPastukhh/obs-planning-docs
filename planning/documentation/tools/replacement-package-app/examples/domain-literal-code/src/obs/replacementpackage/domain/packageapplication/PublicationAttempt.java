package obs.replacementpackage.domain.packageapplication;

import obs.replacementpackage.domain.errors.InvalidApplicationTransition;
import obs.replacementpackage.domain.errors.PublicationEvidenceMismatch;
import obs.replacementpackage.domain.shared.valueobjects.CommitId;
import obs.replacementpackage.domain.shared.valueobjects.RemoteBranchRef;
import java.util.Objects;

/** Child Entity of PackageApplication. Identity is PublicationAttemptId. */
public final class PublicationAttempt {
    private final PublicationAttemptId attemptId;
    private final RemoteBranchRef intendedRemoteBranch;
    private final CommitId intendedTip;
    private final PublicationAttemptOutcome outcome;
    private final PublicationAttemptResultEvidence evidence;

    public PublicationAttempt(
            PublicationAttemptId attemptId,
            RemoteBranchRef intendedRemoteBranch,
            CommitId intendedTip,
            PublicationAttemptOutcome outcome,
            PublicationAttemptResultEvidence evidence) {
        this.attemptId = Objects.requireNonNull(attemptId);
        this.intendedRemoteBranch = Objects.requireNonNull(intendedRemoteBranch);
        this.intendedTip = Objects.requireNonNull(intendedTip);
        this.outcome = Objects.requireNonNull(outcome);
        this.evidence = Objects.requireNonNull(evidence);
        validateEvidence();
    }

    private void validateEvidence() {
        switch (outcome) {
            case UNCERTAIN -> {
                if (!(evidence instanceof PublicationAttemptEvidence e)
                        || !e.remoteBranch().equals(intendedRemoteBranch)
                        || !e.intendedTip().equals(intendedTip))
                    throw new PublicationEvidenceMismatch("uncertain evidence does not match publication attempt identity");
            }
            case NOT_PUBLISHED -> {
                if (!(evidence instanceof PublicationNotPublishedEvidence e)
                        || !e.remoteBranch().equals(intendedRemoteBranch)
                        || !e.intendedTip().equals(intendedTip))
                    throw new PublicationEvidenceMismatch("not-published evidence does not match publication attempt identity");
            }
            case PUBLISHED -> {
                if (!(evidence instanceof PublicationEvidence e)
                        || !e.remoteBranch().equals(intendedRemoteBranch)
                        || !e.remoteTip().equals(intendedTip))
                    throw new PublicationEvidenceMismatch("published evidence does not match publication attempt identity");
            }
        }
    }

    public PublicationAttempt confirmPublished(PublicationEvidence confirmed) {
        if (outcome != PublicationAttemptOutcome.UNCERTAIN)
            throw new InvalidApplicationTransition("only an uncertain publication attempt can be reconciled as published");
        return new PublicationAttempt(attemptId, intendedRemoteBranch, intendedTip,
                PublicationAttemptOutcome.PUBLISHED, Objects.requireNonNull(confirmed));
    }

    public PublicationAttempt confirmNotPublished(PublicationNotPublishedEvidence confirmed) {
        if (outcome != PublicationAttemptOutcome.UNCERTAIN)
            throw new InvalidApplicationTransition("only an uncertain publication attempt can be reconciled as not published");
        return new PublicationAttempt(attemptId, intendedRemoteBranch, intendedTip,
                PublicationAttemptOutcome.NOT_PUBLISHED, Objects.requireNonNull(confirmed));
    }

    public PublicationAttemptId attemptId() { return attemptId; }
    public RemoteBranchRef intendedRemoteBranch() { return intendedRemoteBranch; }
    public CommitId intendedTip() { return intendedTip; }
    public PublicationAttemptOutcome outcome() { return outcome; }
    public PublicationAttemptResultEvidence evidence() { return evidence; }

    @Override public boolean equals(Object other) {
        return other instanceof PublicationAttempt attempt && attemptId.equals(attempt.attemptId);
    }
    @Override public int hashCode() { return attemptId.hashCode(); }
}

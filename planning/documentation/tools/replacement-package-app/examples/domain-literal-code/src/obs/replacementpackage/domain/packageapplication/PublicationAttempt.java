package obs.replacementpackage.domain.packageapplication;

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

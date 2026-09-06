package obs.replacementpackage.domain.workfinalization;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

public final class WorkFinalization {
    private final ChangeSetId changeSetId;
    private final BranchName workBranch;
    private final CommitId publishedTip;
    private final GitTreeId publishedTree;
    private final BranchName targetBranch;
    private final ReviewAuthority reviewAuthority;
    private final IssueRef issueRef;
    private final Optional<CommentText> finalComment;
    private final List<IntegrationAttempt> integrationAttempts;
    private final List<FinalIssueCommentAttempt> finalCommentAttempts;
    private final boolean integrationConfirmed;
    private final boolean finalIssueCommentConfirmed;
    private final boolean integrationUncertain;
    private final boolean finalIssueCommentUncertain;
    private final FinalizationState state;

    private WorkFinalization(
            ChangeSetId changeSetId,
            BranchName workBranch,
            CommitId publishedTip,
            GitTreeId publishedTree,
            BranchName targetBranch,
            ReviewAuthority reviewAuthority,
            IssueRef issueRef,
            Optional<CommentText> finalComment,
            List<IntegrationAttempt> integrationAttempts,
            List<FinalIssueCommentAttempt> finalCommentAttempts,
            boolean integrationConfirmed,
            boolean finalIssueCommentConfirmed,
            boolean integrationUncertain,
            boolean finalIssueCommentUncertain,
            FinalizationState state) {
        this.changeSetId = Objects.requireNonNull(changeSetId);
        this.workBranch = Objects.requireNonNull(workBranch);
        this.publishedTip = Objects.requireNonNull(publishedTip);
        this.publishedTree = Objects.requireNonNull(publishedTree);
        this.targetBranch = Objects.requireNonNull(targetBranch);
        this.reviewAuthority = Objects.requireNonNull(reviewAuthority);
        this.issueRef = Objects.requireNonNull(issueRef);
        this.finalComment = Objects.requireNonNull(finalComment);
        this.integrationAttempts = List.copyOf(integrationAttempts);
        this.finalCommentAttempts = List.copyOf(finalCommentAttempts);
        this.integrationConfirmed = integrationConfirmed;
        this.finalIssueCommentConfirmed = finalIssueCommentConfirmed;
        this.integrationUncertain = integrationUncertain;
        this.finalIssueCommentUncertain = finalIssueCommentUncertain;
        this.state = Objects.requireNonNull(state);
    }

    public static WorkFinalization begin(
            ChangeSetId changeSetId,
            BranchName workBranch,
            CommitId publishedTip,
            GitTreeId publishedTree,
            BranchName targetBranch,
            ReviewAuthority reviewAuthority,
            IssueRef issueRef,
            Optional<CommentText> finalComment) {
        if (!reviewAuthority.reviewedTree().equals(publishedTree))
            throw new IllegalArgumentException("review authority must be for the exact published tree");
        return new WorkFinalization(
                changeSetId, workBranch, publishedTip, publishedTree, targetBranch, reviewAuthority,
                issueRef, finalComment, List.of(), List.of(),
                false, false, false, false, FinalizationState.ACTIVE);
    }

    public WorkFinalization confirmIntegration(IntegrationEvidence evidence) {
        Objects.requireNonNull(evidence);
        if (!evidence.sourceTip().equals(publishedTip)
                || !evidence.sourceTree().equals(publishedTree)
                || !evidence.targetBranch().equals(targetBranch))
            throw new IntegrationEvidenceMismatch();

        ArrayList<IntegrationAttempt> attempts = new ArrayList<>(integrationAttempts);
        attempts.add(new IntegrationAttempt(
                new IntegrationAttemptEvidence(evidence.sourceTip(), evidence.sourceTree(), evidence.targetBranch()),
                AttemptOutcome.CONFIRMED, Optional.of(evidence)));
        return copy(attempts, finalCommentAttempts, true, finalIssueCommentConfirmed,
                false, finalIssueCommentUncertain, state);
    }

    public WorkFinalization confirmFinalIssueComment(IssueCommentEvidence evidence) {
        Objects.requireNonNull(evidence);
        if (!evidence.issueRef().equals(issueRef)
                || finalComment.isPresent() && !evidence.body().equals(finalComment.get()))
            throw new IssueCommentEvidenceMismatch();

        ArrayList<FinalIssueCommentAttempt> attempts = new ArrayList<>(finalCommentAttempts);
        attempts.add(new FinalIssueCommentAttempt(
                new IssueCommentAttemptEvidence(evidence.issueRef(), evidence.body()),
                AttemptOutcome.CONFIRMED, Optional.of(evidence)));
        return copy(integrationAttempts, attempts, integrationConfirmed, true,
                integrationUncertain, false, state);
    }

    public WorkFinalization markIntegrationUncertain(IntegrationAttemptEvidence evidence) {
        Objects.requireNonNull(evidence);
        if (!evidence.sourceTip().equals(publishedTip)
                || !evidence.sourceTree().equals(publishedTree)
                || !evidence.targetBranch().equals(targetBranch))
            throw new IntegrationEvidenceMismatch();
        ArrayList<IntegrationAttempt> attempts = new ArrayList<>(integrationAttempts);
        attempts.add(new IntegrationAttempt(evidence, AttemptOutcome.UNCERTAIN, Optional.empty()));
        return copy(attempts, finalCommentAttempts, integrationConfirmed, finalIssueCommentConfirmed,
                !integrationConfirmed, finalIssueCommentUncertain, state);
    }

    public WorkFinalization markFinalIssueCommentUncertain(IssueCommentAttemptEvidence evidence) {
        Objects.requireNonNull(evidence);
        if (!evidence.issueRef().equals(issueRef)
                || finalComment.isPresent() && !evidence.body().equals(finalComment.get()))
            throw new IssueCommentEvidenceMismatch();
        ArrayList<FinalIssueCommentAttempt> attempts = new ArrayList<>(finalCommentAttempts);
        attempts.add(new FinalIssueCommentAttempt(evidence, AttemptOutcome.UNCERTAIN, Optional.empty()));
        return copy(integrationAttempts, attempts, integrationConfirmed, finalIssueCommentConfirmed,
                integrationUncertain, !finalIssueCommentConfirmed, state);
    }

    public WorkFinalization complete() {
        if (!integrationConfirmed || !finalIssueCommentConfirmed) throw new FinalizationIncomplete();
        return copy(integrationAttempts, finalCommentAttempts, true, true, false, false, FinalizationState.COMPLETED);
    }

    private WorkFinalization copy(
            List<IntegrationAttempt> integrationAttempts,
            List<FinalIssueCommentAttempt> finalCommentAttempts,
            boolean integrationConfirmed,
            boolean finalIssueCommentConfirmed,
            boolean integrationUncertain,
            boolean finalIssueCommentUncertain,
            FinalizationState state) {
        return new WorkFinalization(changeSetId, workBranch, publishedTip, publishedTree, targetBranch,
                reviewAuthority, issueRef, finalComment, integrationAttempts, finalCommentAttempts,
                integrationConfirmed, finalIssueCommentConfirmed, integrationUncertain,
                finalIssueCommentUncertain, state);
    }

    public ChangeSetId changeSetId() { return changeSetId; }
    public BranchName workBranch() { return workBranch; }
    public CommitId publishedTip() { return publishedTip; }
    public GitTreeId publishedTree() { return publishedTree; }
    public BranchName targetBranch() { return targetBranch; }
    public ReviewAuthority reviewAuthority() { return reviewAuthority; }
    public IssueRef issueRef() { return issueRef; }
    public Optional<CommentText> finalComment() { return finalComment; }
    public List<IntegrationAttempt> integrationAttempts() { return integrationAttempts; }
    public List<FinalIssueCommentAttempt> finalCommentAttempts() { return finalCommentAttempts; }
    public boolean integrationIsConfirmed() { return integrationConfirmed; }
    public boolean finalIssueCommentIsConfirmed() { return finalIssueCommentConfirmed; }
    public boolean integrationIsUncertain() { return integrationUncertain; }
    public boolean finalIssueCommentIsUncertain() { return finalIssueCommentUncertain; }
    public FinalizationState state() { return state; }
}

package obs.replacementpackage.domain.repositorywork;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.Objects;
import java.util.Optional;

public final class RepositoryWork {
    private final ChangeSetId changeSetId;
    private final RepositoryIdentity repositoryIdentity;
    private final BranchName targetBranch;
    private final CommitId startBaseCommit;
    private final WorkBranch workBranch;
    private final Optional<IssueRef> issueRef;
    private final RepositoryWorkLifecycle lifecycle;
    private final Optional<FinalizationEvidence> finalizationEvidence;

    private RepositoryWork(
            ChangeSetId changeSetId,
            RepositoryIdentity repositoryIdentity,
            BranchName targetBranch,
            CommitId startBaseCommit,
            WorkBranch workBranch,
            Optional<IssueRef> issueRef,
            RepositoryWorkLifecycle lifecycle,
            Optional<FinalizationEvidence> finalizationEvidence) {
        this.changeSetId = Objects.requireNonNull(changeSetId);
        this.repositoryIdentity = Objects.requireNonNull(repositoryIdentity);
        this.targetBranch = Objects.requireNonNull(targetBranch);
        this.startBaseCommit = Objects.requireNonNull(startBaseCommit);
        this.workBranch = Objects.requireNonNull(workBranch);
        this.issueRef = Objects.requireNonNull(issueRef);
        this.lifecycle = Objects.requireNonNull(lifecycle);
        this.finalizationEvidence = Objects.requireNonNull(finalizationEvidence);
    }

    public static RepositoryWork planNewRepositoryWork(
            ChangeSetId changeSetId,
            RepositoryIdentity repositoryIdentity,
            BranchName targetBranch,
            CommitId startBaseCommit,
            BranchName workBranch) {
        return new RepositoryWork(
                changeSetId, repositoryIdentity, targetBranch, startBaseCommit,
                new WorkBranch(workBranch, startBaseCommit, Optional.empty()),
                Optional.empty(), RepositoryWorkLifecycle.ACTIVE, Optional.empty());
    }

    public RepositoryWork confirmCreatedWorkBranch(WorkBranchEvidence evidence) {
        Objects.requireNonNull(evidence);
        if (!workBranch.name().equals(evidence.branch())
                || !startBaseCommit.equals(evidence.baseCommit())) {
            throw new WorkBranchMismatch();
        }
        return new RepositoryWork(
                changeSetId, repositoryIdentity, targetBranch, startBaseCommit,
                new WorkBranch(workBranch.name(), workBranch.startBaseCommit(), evidence.knownTip()),
                issueRef, lifecycle, finalizationEvidence);
    }

    public RepositoryWork attachConfirmedWorkIssue(IssueRef confirmedIssueRef) {
        return new RepositoryWork(
                changeSetId, repositoryIdentity, targetBranch, startBaseCommit, workBranch,
                Optional.of(Objects.requireNonNull(confirmedIssueRef)), lifecycle, finalizationEvidence);
    }

    public RecordedWorkBranchValidation requireRecordedWorkBranch(BranchName branch) {
        return new RecordedWorkBranchValidation(
                lifecycle == RepositoryWorkLifecycle.ACTIVE && workBranch.name().equals(branch));
    }

    public RepositoryWork markFinalized(FinalizationEvidence evidence) {
        Objects.requireNonNull(evidence);
        if (!evidence.complete()) throw new FinalizationIncomplete();
        return new RepositoryWork(
                changeSetId, repositoryIdentity, targetBranch, startBaseCommit, workBranch,
                issueRef, RepositoryWorkLifecycle.FINALIZED, Optional.of(evidence));
    }

    public ChangeSetId changeSetId() { return changeSetId; }
    public RepositoryIdentity repositoryIdentity() { return repositoryIdentity; }
    public BranchName targetBranch() { return targetBranch; }
    public CommitId startBaseCommit() { return startBaseCommit; }
    public WorkBranch workBranch() { return workBranch; }
    public Optional<IssueRef> issueRef() { return issueRef; }
    public RepositoryWorkLifecycle lifecycle() { return lifecycle; }
    public Optional<FinalizationEvidence> finalizationEvidence() { return finalizationEvidence; }
}

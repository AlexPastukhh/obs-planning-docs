package obs.replacementpackage.domain.packageapplication;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.*;

public final class PackageApplication {
    private final ChangeSetId changeSetId;
    private final PackageId packageId;
    private final CommitId expectedSource;
    private final BranchName workBranch;
    private final ApplyExtent requestedExtent;
    private final ApplicationStage stage;
    private final Optional<GitTreeId> appliedTree;
    private final Optional<CommitId> commitId;
    private final Optional<GitTreeId> committedTree;
    private final List<PublicationAttempt> publicationAttempts;
    private final Optional<CommitId> publishedTip;
    private final Optional<GitTreeId> publishedTree;

    private PackageApplication(
            ChangeSetId changeSetId,
            PackageId packageId,
            CommitId expectedSource,
            BranchName workBranch,
            ApplyExtent requestedExtent,
            ApplicationStage stage,
            Optional<GitTreeId> appliedTree,
            Optional<CommitId> commitId,
            Optional<GitTreeId> committedTree,
            List<PublicationAttempt> publicationAttempts,
            Optional<CommitId> publishedTip,
            Optional<GitTreeId> publishedTree) {
        this.changeSetId = Objects.requireNonNull(changeSetId);
        this.packageId = Objects.requireNonNull(packageId);
        this.expectedSource = Objects.requireNonNull(expectedSource);
        this.workBranch = Objects.requireNonNull(workBranch);
        this.requestedExtent = Objects.requireNonNull(requestedExtent);
        this.stage = Objects.requireNonNull(stage);
        this.appliedTree = Objects.requireNonNull(appliedTree);
        this.commitId = Objects.requireNonNull(commitId);
        this.committedTree = Objects.requireNonNull(committedTree);
        this.publicationAttempts = List.copyOf(publicationAttempts);
        this.publishedTip = Objects.requireNonNull(publishedTip);
        this.publishedTree = Objects.requireNonNull(publishedTree);
    }

    public static PackageApplication begin(
            ChangeSetId changeSetId,
            PackageId packageId,
            CommitId expectedSource,
            BranchName workBranch,
            ApplyExtent requestedExtent) {
        return new PackageApplication(
                changeSetId, packageId, expectedSource, workBranch, requestedExtent,
                ApplicationStage.READY, Optional.empty(), Optional.empty(), Optional.empty(),
                List.of(), Optional.empty(), Optional.empty());
    }

    public PackageApplication markApplied(GitTreeId appliedTree) {
        if (stage != ApplicationStage.READY)
            throw new InvalidApplicationTransition("apply can be proven only from ready state");
        return copy(ApplicationStage.APPLIED, Optional.of(Objects.requireNonNull(appliedTree)),
                commitId, committedTree, publicationAttempts, publishedTip, publishedTree);
    }

    public PackageApplication markCommitted(CommitId commitId, GitTreeId committedTree) {
        if (stage != ApplicationStage.APPLIED)
            throw new InvalidApplicationTransition("commit requires a previously proven applied result");
        if (!appliedTree.orElseThrow().equals(committedTree))
            throw new InvalidApplicationTransition("committed tree must equal the proven applied tree");
        return copy(ApplicationStage.COMMITTED, appliedTree,
                Optional.of(Objects.requireNonNull(commitId)), Optional.of(Objects.requireNonNull(committedTree)),
                publicationAttempts, publishedTip, publishedTree);
    }

    public PackageApplication markPublicationUncertain(
            PublicationAttemptId attemptId,
            PublicationAttemptEvidence evidence) {
        if (stage != ApplicationStage.COMMITTED)
            throw new InvalidApplicationTransition("a new publication attempt requires a committed result with no unresolved attempt");
        CommitId committed = commitId.orElseThrow();
        if (!evidence.intendedTip().equals(committed))
            throw new PublicationEvidenceMismatch("uncertain publication intended tip differs from committed tip");
        ensureNewAttemptId(attemptId);
        ArrayList<PublicationAttempt> attempts = new ArrayList<>(publicationAttempts);
        attempts.add(new PublicationAttempt(
                attemptId, evidence.remoteBranch(), evidence.intendedTip(),
                PublicationAttemptOutcome.UNCERTAIN, evidence));
        return copy(ApplicationStage.PUBLICATION_UNCERTAIN, appliedTree, commitId, committedTree,
                attempts, Optional.empty(), Optional.empty());
    }

    public PackageApplication markPublicationNotPublished(
            PublicationAttemptId attemptId,
            PublicationNotPublishedEvidence evidence) {
        if (stage != ApplicationStage.PUBLICATION_UNCERTAIN)
            throw new InvalidApplicationTransition("not-published reconciliation requires an unresolved publication attempt");
        int index = existingAttemptIndex(attemptId);
        PublicationAttempt current = publicationAttempts.get(index);
        ArrayList<PublicationAttempt> attempts = new ArrayList<>(publicationAttempts);
        attempts.set(index, current.confirmNotPublished(evidence));
        return copy(ApplicationStage.COMMITTED, appliedTree, commitId, committedTree,
                attempts, Optional.empty(), Optional.empty());
    }

    public PackageApplication markPublished(
            PublicationAttemptId attemptId,
            CommitId provenRemoteTip,
            GitTreeId provenRemoteTree,
            PublicationEvidence evidence) {
        if (stage != ApplicationStage.COMMITTED && stage != ApplicationStage.PUBLICATION_UNCERTAIN)
            throw new InvalidApplicationTransition("published proof requires a committed result");
        CommitId committed = commitId.orElseThrow();
        GitTreeId tree = committedTree.orElseThrow();
        if (!provenRemoteTip.equals(committed)
                || !evidence.remoteTip().equals(provenRemoteTip)
                || !provenRemoteTree.equals(tree)
                || !evidence.remoteTree().equals(provenRemoteTree))
            throw new PublicationEvidenceMismatch("remote publication does not prove the exact committed result");

        ArrayList<PublicationAttempt> attempts = new ArrayList<>(publicationAttempts);
        if (stage == ApplicationStage.PUBLICATION_UNCERTAIN) {
            int index = existingAttemptIndex(attemptId);
            PublicationAttempt current = attempts.get(index);
            attempts.set(index, current.confirmPublished(evidence));
        } else {
            ensureNewAttemptId(attemptId);
            attempts.add(new PublicationAttempt(
                    attemptId, evidence.remoteBranch(), provenRemoteTip,
                    PublicationAttemptOutcome.PUBLISHED, evidence));
        }
        return copy(ApplicationStage.PUBLISHED, appliedTree, commitId, committedTree,
                attempts, Optional.of(provenRemoteTip), Optional.of(provenRemoteTree));
    }

    private void ensureNewAttemptId(PublicationAttemptId attemptId) {
        Objects.requireNonNull(attemptId);
        if (publicationAttempts.stream().anyMatch(attempt -> attempt.attemptId().equals(attemptId)))
            throw new InvalidApplicationTransition("publication attempt identity already exists");
    }

    private int existingAttemptIndex(PublicationAttemptId attemptId) {
        Objects.requireNonNull(attemptId);
        for (int i = 0; i < publicationAttempts.size(); i++) {
            if (publicationAttempts.get(i).attemptId().equals(attemptId)) return i;
        }
        throw new InvalidApplicationTransition(
                "unresolved publication attempt must be reconciled before a new attempt identity is used");
    }

    public ApplyProvenResult currentProvenResult() {
        return new ApplyProvenResult(stage, commitId, committedTree, publishedTip, publishedTree);
    }

    private PackageApplication copy(
            ApplicationStage stage,
            Optional<GitTreeId> appliedTree,
            Optional<CommitId> commitId,
            Optional<GitTreeId> committedTree,
            List<PublicationAttempt> publicationAttempts,
            Optional<CommitId> publishedTip,
            Optional<GitTreeId> publishedTree) {
        return new PackageApplication(changeSetId, packageId, expectedSource, workBranch, requestedExtent,
                stage, appliedTree, commitId, committedTree, publicationAttempts, publishedTip, publishedTree);
    }

    public ChangeSetId changeSetId() { return changeSetId; }
    public PackageId packageId() { return packageId; }
    public CommitId expectedSource() { return expectedSource; }
    public BranchName workBranch() { return workBranch; }
    public ApplyExtent requestedExtent() { return requestedExtent; }
    public ApplicationStage stage() { return stage; }
    public Optional<GitTreeId> appliedTree() { return appliedTree; }
    public Optional<CommitId> commitId() { return commitId; }
    public Optional<GitTreeId> committedTree() { return committedTree; }
    public List<PublicationAttempt> publicationAttempts() { return publicationAttempts; }
    public Optional<CommitId> publishedTip() { return publishedTip; }
    public Optional<GitTreeId> publishedTree() { return publishedTree; }
}

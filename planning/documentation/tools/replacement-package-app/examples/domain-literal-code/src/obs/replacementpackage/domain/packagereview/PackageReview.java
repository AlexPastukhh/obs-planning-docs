package obs.replacementpackage.domain.packagereview;

import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.shared.support.DomainText;
import obs.replacementpackage.domain.errors.*;
import java.util.Objects;

public final class PackageReview {
    private final ReviewId reviewId;
    private final ChangeSetId changeSetId;
    private final PackageId packageId;
    private final BranchName workBranch;
    private final CommitId startBaseCommit;
    private final CommitId expectedSource;
    private final GitTreeId predictedTree;
    private final DiffArtifact latestDiff;
    private final DiffArtifact cumulativeDiff;
    private final WorkspaceResultId fullResult;

    private PackageReview(
            ReviewId reviewId,
            ChangeSetId changeSetId,
            PackageId packageId,
            BranchName workBranch,
            CommitId startBaseCommit,
            CommitId expectedSource,
            GitTreeId predictedTree,
            DiffArtifact latestDiff,
            DiffArtifact cumulativeDiff,
            WorkspaceResultId fullResult) {
        this.reviewId = Objects.requireNonNull(reviewId);
        this.changeSetId = Objects.requireNonNull(changeSetId);
        this.packageId = Objects.requireNonNull(packageId);
        this.workBranch = Objects.requireNonNull(workBranch);
        this.startBaseCommit = Objects.requireNonNull(startBaseCommit);
        this.expectedSource = Objects.requireNonNull(expectedSource);
        this.predictedTree = Objects.requireNonNull(predictedTree);
        this.latestDiff = Objects.requireNonNull(latestDiff);
        this.cumulativeDiff = Objects.requireNonNull(cumulativeDiff);
        this.fullResult = Objects.requireNonNull(fullResult);
        validateArtifacts();
    }

    public static PackageReview createValidatedReview(
            ReviewId reviewId,
            ChangeSetId changeSetId,
            PackageId packageId,
            BranchName workBranch,
            CommitId startBaseCommit,
            CommitId expectedSource,
            GitTreeId predictedTree,
            DiffArtifact latestDiff,
            DiffArtifact cumulativeDiff,
            WorkspaceResultId fullResult) {
        return new PackageReview(reviewId, changeSetId, packageId, workBranch, startBaseCommit,
                expectedSource, predictedTree, latestDiff, cumulativeDiff, fullResult);
    }

    private void validateArtifacts() {
        GitTreeId latestTree = latestDiff.toTree().orElseThrow(
                () -> new ReviewArtifactMismatch("latest diff does not end at a Git tree"));
        GitTreeId cumulativeTree = cumulativeDiff.toTree().orElseThrow(
                () -> new ReviewArtifactMismatch("cumulative diff does not end at a Git tree"));
        if (!latestDiff.fromCommit().equals(expectedSource))
            throw new ReviewArtifactMismatch("latest diff source does not equal expected source");
        if (!latestTree.equals(predictedTree)
                || !cumulativeTree.equals(predictedTree)
                || !fullResult.tree().equals(predictedTree))
            throw new ReviewArtifactMismatch("review artifacts do not end at one predicted tree");
    }

    public ReviewId reviewId() { return reviewId; }
    public ChangeSetId changeSetId() { return changeSetId; }
    public PackageId packageId() { return packageId; }
    public BranchName workBranch() { return workBranch; }
    public CommitId startBaseCommit() { return startBaseCommit; }
    public CommitId expectedSource() { return expectedSource; }
    public GitTreeId predictedTree() { return predictedTree; }
    public DiffArtifact latestDiff() { return latestDiff; }
    public DiffArtifact cumulativeDiff() { return cumulativeDiff; }
    public WorkspaceResultId fullResult() { return fullResult; }
}

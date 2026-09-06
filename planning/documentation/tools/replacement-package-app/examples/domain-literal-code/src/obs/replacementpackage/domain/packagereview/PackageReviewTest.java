package obs.replacementpackage.domain.packagereview;

import java.util.*;
import obs.replacementpackage.domain.shared.valueobjects.*;
import obs.replacementpackage.domain.errors.*;
import obs.replacementpackage.domain.testing.*;
import obs.replacementpackage.domain.repositorywork.*;
import obs.replacementpackage.domain.workissue.*;
import obs.replacementpackage.domain.replacementpackage.*;
import obs.replacementpackage.domain.packagereview.*;
import obs.replacementpackage.domain.packageapplication.*;
import obs.replacementpackage.domain.workfinalization.*;
import obs.replacementpackage.domain.snapshotexport.*;
import obs.replacementpackage.domain.externalinteraction.*;

public final class PackageReviewTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        PackageReviewTest test = new PackageReviewTest();
        runner.run("review_accepts_only_artifacts_that_end_at_the_same_predicted_tree", test::review_accepts_only_artifacts_that_end_at_the_same_predicted_tree);
        runner.run("review_rejects_latest_diff_from_a_source_other_than_expected_source", test::review_rejects_latest_diff_from_a_source_other_than_expected_source);
        runner.run("historical_review_identity_does_not_change_when_the_work_branch_moves_later", test::historical_review_identity_does_not_change_when_the_work_branch_moves_later);
    }

    private void review_accepts_only_artifacts_that_end_at_the_same_predicted_tree() {
        PackageReview review = review("tree-A", "1111", "0000", "1111");
        equal(tree("tree-A"), review.predictedTree());
        equal(tree("tree-A"), review.latestDiff().toTree().orElseThrow());
        equal(tree("tree-A"), review.cumulativeDiff().toTree().orElseThrow());
        equal(tree("tree-A"), review.fullResult().tree());
    }

    private void review_rejects_latest_diff_from_a_source_other_than_expected_source() {
        throwsType(ReviewArtifactMismatch.class, () -> review("tree-A", "2222", "0000", "1111"));
    }

    private void historical_review_identity_does_not_change_when_the_work_branch_moves_later() {
        PackageReview review = review("tree-A", "1111", "0000", "1111");
        CommitId unrelatedLaterBranchTip = commit("bbbb");
        equal(branch("work/cs-1"), review.workBranch());
        equal(commit("1111"), review.expectedSource());
        equal(tree("tree-A"), review.predictedTree());
        notEqual(unrelatedLaterBranchTip, review.expectedSource());
    }
}

package obs.replacementpackage.domain.workfinalization;

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

public final class WorkFinalizationTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        WorkFinalizationTest test = new WorkFinalizationTest();
        runner.run("new_finalization_fixes_exact_published_result_target_review_authority_and_issue", test::new_finalization_fixes_exact_published_result_target_review_authority_and_issue);
        runner.run("integration_proof_for_a_different_published_tip_is_rejected", test::integration_proof_for_a_different_published_tip_is_rejected);
        runner.run("integration_may_be_confirmed_before_final_issue_comment_while_relative_order_is_open", test::integration_may_be_confirmed_before_final_issue_comment_while_relative_order_is_open);
        runner.run("final_issue_comment_proof_for_a_different_issue_is_rejected", test::final_issue_comment_proof_for_a_different_issue_is_rejected);
        runner.run("final_issue_comment_may_be_confirmed_before_integration_while_relative_order_is_open", test::final_issue_comment_may_be_confirmed_before_integration_while_relative_order_is_open);
        runner.run("uncertain_integration_remains_distinct_from_confirmed_integration", test::uncertain_integration_remains_distinct_from_confirmed_integration);
        runner.run("confirmed_integration_survives_uncertain_final_issue_comment", test::confirmed_integration_survives_uncertain_final_issue_comment);
        runner.run("finalization_completes_only_when_integration_and_final_comment_are_both_proven", test::finalization_completes_only_when_integration_and_final_comment_are_both_proven);
    }

    private void new_finalization_fixes_exact_published_result_target_review_authority_and_issue() {
        WorkFinalization f = finalization();
        equal(commit("aaaa"), f.publishedTip());
        equal(tree("tree-A"), f.publishedTree());
        equal(branch("main"), f.targetBranch());
        equal(issue(42), f.issueRef());
        isFalse(f.integrationIsConfirmed());
        isFalse(f.finalIssueCommentIsConfirmed());
    }

    private void integration_proof_for_a_different_published_tip_is_rejected() {
        WorkFinalization f = finalization();
        throwsType(IntegrationEvidenceMismatch.class,
                () -> f.confirmIntegration(new IntegrationEvidence(commit("bbbb"), tree("tree-A"), branch("main"))));
    }

    private void integration_may_be_confirmed_before_final_issue_comment_while_relative_order_is_open() {
        WorkFinalization f = finalization().confirmIntegration(validIntegration());
        isTrue(f.integrationIsConfirmed());
        isFalse(f.finalIssueCommentIsConfirmed());
    }

    private void final_issue_comment_proof_for_a_different_issue_is_rejected() {
        WorkFinalization f = finalization();
        throwsType(IssueCommentEvidenceMismatch.class, () ->
                f.confirmFinalIssueComment(new IssueCommentEvidence(issue(43), new IssueCommentId(9), new CommentText("done"))));
    }

    private void final_issue_comment_may_be_confirmed_before_integration_while_relative_order_is_open() {
        WorkFinalization f = finalization().confirmFinalIssueComment(validFinalComment());
        isTrue(f.finalIssueCommentIsConfirmed());
        isFalse(f.integrationIsConfirmed());
    }

    private void uncertain_integration_remains_distinct_from_confirmed_integration() {
        WorkFinalization f = finalization().markIntegrationUncertain(
                new IntegrationAttemptEvidence(commit("aaaa"), tree("tree-A"), branch("main")));
        isTrue(f.integrationIsUncertain());
        isFalse(f.integrationIsConfirmed());
    }

    private void confirmed_integration_survives_uncertain_final_issue_comment() {
        WorkFinalization f = finalization()
                .confirmIntegration(validIntegration())
                .markFinalIssueCommentUncertain(new IssueCommentAttemptEvidence(issue(42), new CommentText("done")));
        isTrue(f.integrationIsConfirmed());
        isTrue(f.finalIssueCommentIsUncertain());
    }

    private void finalization_completes_only_when_integration_and_final_comment_are_both_proven() {
        WorkFinalization one = finalization().confirmIntegration(validIntegration());
        throwsType(FinalizationIncomplete.class, one::complete);
        WorkFinalization done = one.confirmFinalIssueComment(validFinalComment()).complete();
        equal(FinalizationState.COMPLETED, done.state());
    }
}

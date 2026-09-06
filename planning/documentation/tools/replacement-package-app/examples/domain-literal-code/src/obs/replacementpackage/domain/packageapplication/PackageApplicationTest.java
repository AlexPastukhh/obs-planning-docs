package obs.replacementpackage.domain.packageapplication;

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

public final class PackageApplicationTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        PackageApplicationTest test = new PackageApplicationTest();
        runner.run("new_package_application_starts_before_any_apply_commit_or_publish_result_is_proven", test::new_package_application_starts_before_any_apply_commit_or_publish_result_is_proven);
        runner.run("applied_state_records_the_exact_applied_tree_without_implying_commit_or_publish", test::applied_state_records_the_exact_applied_tree_without_implying_commit_or_publish);
        runner.run("commit_state_requires_a_previously_proven_applied_result", test::commit_state_requires_a_previously_proven_applied_result);
        runner.run("publication_uncertainty_is_preserved_as_a_distinct_proven_state", test::publication_uncertainty_is_preserved_as_a_distinct_proven_state);
        runner.run("uncertain_publication_reconciliation_updates_the_same_attempt_identity_when_published", test::uncertain_publication_reconciliation_updates_the_same_attempt_identity_when_published);
        runner.run("uncertain_publication_must_be_reconciled_before_a_new_attempt_identity_can_be_recorded", test::uncertain_publication_must_be_reconciled_before_a_new_attempt_identity_can_be_recorded);
        runner.run("proven_not_published_reconciliation_returns_to_committed_without_losing_attempt_history", test::proven_not_published_reconciliation_returns_to_committed_without_losing_attempt_history);
        runner.run("published_state_requires_remote_tip_equal_to_the_committed_tip", test::published_state_requires_remote_tip_equal_to_the_committed_tip);
        runner.run("published_state_records_the_exact_proven_remote_tree", test::published_state_records_the_exact_proven_remote_tree);
        runner.run("committed_application_reports_committed_as_the_highest_proven_state_without_publication", test::committed_application_reports_committed_as_the_highest_proven_state_without_publication);
    }

    private void new_package_application_starts_before_any_apply_commit_or_publish_result_is_proven() {
        PackageApplication app = newApplication(ApplyExtent.APPLY_COMMIT_PUBLISH);
        equal(ApplicationStage.READY, app.stage());
        isTrue(app.appliedTree().isEmpty());
        isTrue(app.commitId().isEmpty());
        isTrue(app.publishedTip().isEmpty());
    }

    private void applied_state_records_the_exact_applied_tree_without_implying_commit_or_publish() {
        PackageApplication app = newApplication(ApplyExtent.APPLY_COMMIT_PUBLISH).markApplied(tree("tree-A"));
        equal(ApplicationStage.APPLIED, app.stage());
        equal(tree("tree-A"), app.appliedTree().orElseThrow());
        isTrue(app.commitId().isEmpty());
        isTrue(app.publishedTip().isEmpty());
    }

    private void commit_state_requires_a_previously_proven_applied_result() {
        throwsType(InvalidApplicationTransition.class,
                () -> newApplication(ApplyExtent.APPLY_COMMIT).markCommitted(commit("aaaa"), tree("tree-A")));
    }

    private void publication_uncertainty_is_preserved_as_a_distinct_proven_state() {
        PackageApplication app = committedApplication().markPublicationUncertain(
                new PublicationAttemptId("attempt-1"),
                new PublicationAttemptEvidence(remote(), commit("aaaa")));
        equal(ApplicationStage.PUBLICATION_UNCERTAIN, app.currentProvenResult().state());
        equal(commit("aaaa"), app.commitId().orElseThrow());
        equal(1, app.publicationAttempts().size());
    }

    private void uncertain_publication_reconciliation_updates_the_same_attempt_identity_when_published() {
        PublicationAttemptId id = new PublicationAttemptId("attempt-1");
        PackageApplication uncertain = committedApplication().markPublicationUncertain(
                id, new PublicationAttemptEvidence(remote(), commit("aaaa")));
        PackageApplication published = uncertain.markPublished(
                id, commit("aaaa"), tree("tree-A"),
                new PublicationEvidence(remote(), commit("aaaa"), tree("tree-A")));
        equal(1, published.publicationAttempts().size());
        equal(id, published.publicationAttempts().get(0).attemptId());
        equal(PublicationAttemptOutcome.PUBLISHED, published.publicationAttempts().get(0).outcome());
    }

    private void uncertain_publication_must_be_reconciled_before_a_new_attempt_identity_can_be_recorded() {
        PackageApplication uncertain = committedApplication().markPublicationUncertain(
                new PublicationAttemptId("attempt-1"),
                new PublicationAttemptEvidence(remote(), commit("aaaa")));
        throwsType(InvalidApplicationTransition.class, () -> uncertain.markPublished(
                new PublicationAttemptId("attempt-2"), commit("aaaa"), tree("tree-A"),
                new PublicationEvidence(remote(), commit("aaaa"), tree("tree-A"))));
    }

    private void proven_not_published_reconciliation_returns_to_committed_without_losing_attempt_history() {
        PublicationAttemptId firstId = new PublicationAttemptId("attempt-1");
        PackageApplication uncertain = committedApplication().markPublicationUncertain(
                firstId, new PublicationAttemptEvidence(remote(), commit("aaaa")));
        PackageApplication reconciled = uncertain.markPublicationNotPublished(
                firstId, new PublicationNotPublishedEvidence(remote(), commit("aaaa"), Optional.of(commit("older"))));
        equal(ApplicationStage.COMMITTED, reconciled.stage());
        equal(1, reconciled.publicationAttempts().size());
        equal(firstId, reconciled.publicationAttempts().get(0).attemptId());
        equal(PublicationAttemptOutcome.NOT_PUBLISHED, reconciled.publicationAttempts().get(0).outcome());
        PackageApplication retried = reconciled.markPublished(
                new PublicationAttemptId("attempt-2"), commit("aaaa"), tree("tree-A"),
                new PublicationEvidence(remote(), commit("aaaa"), tree("tree-A")));
        equal(2, retried.publicationAttempts().size());
    }

    private void published_state_requires_remote_tip_equal_to_the_committed_tip() {
        PackageApplication app = committedApplication();
        throwsType(PublicationEvidenceMismatch.class, () -> app.markPublished(
                new PublicationAttemptId("attempt-1"), commit("bbbb"), tree("tree-A"),
                new PublicationEvidence(remote(), commit("bbbb"), tree("tree-A"))));
    }

    private void published_state_records_the_exact_proven_remote_tree() {
        PackageApplication app = committedApplication().markPublished(
                new PublicationAttemptId("attempt-1"), commit("aaaa"), tree("tree-A"),
                new PublicationEvidence(remote(), commit("aaaa"), tree("tree-A")));
        equal(ApplicationStage.PUBLISHED, app.stage());
        equal(commit("aaaa"), app.publishedTip().orElseThrow());
        equal(tree("tree-A"), app.publishedTree().orElseThrow());
    }

    private void committed_application_reports_committed_as_the_highest_proven_state_without_publication() {
        ApplyProvenResult result = committedApplication().currentProvenResult();
        equal(ApplicationStage.COMMITTED, result.state());
        equal(commit("aaaa"), result.commitId().orElseThrow());
        isTrue(result.publishedTip().isEmpty());
    }
}

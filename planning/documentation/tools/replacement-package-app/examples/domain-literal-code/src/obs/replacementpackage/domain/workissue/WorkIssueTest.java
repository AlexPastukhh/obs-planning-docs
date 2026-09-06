package obs.replacementpackage.domain.workissue;

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

public final class WorkIssueTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        WorkIssueTest test = new WorkIssueTest();
        runner.run("actor_issue_text_is_preserved_independently_from_managed_work_identity", test::actor_issue_text_is_preserved_independently_from_managed_work_identity);
        runner.run("managed_work_identity_validation_rejects_a_different_changeset_or_work_branch", test::managed_work_identity_validation_rejects_a_different_changeset_or_work_branch);
        runner.run("editing_actor_text_preserves_all_managed_work_identity_fields_and_existing_comments", test::editing_actor_text_preserves_all_managed_work_identity_fields_and_existing_comments);
        runner.run("confirmed_comment_addition_does_not_change_issue_body_identity_or_actor_text", test::confirmed_comment_addition_does_not_change_issue_body_identity_or_actor_text);
        runner.run("confirmed_issue_edit_requires_expected_actor_text_and_unchanged_managed_identity", test::confirmed_issue_edit_requires_expected_actor_text_and_unchanged_managed_identity);
    }

    private void actor_issue_text_is_preserved_independently_from_managed_work_identity() {
        ManagedWorkIdentityText managed = managed();
        WorkIssue wi = WorkIssue.fromConfirmedIssue(issue(42), new IssueTitle("Work"), managed,
                new ActorIssueText("apply only; finalize manually"));
        equal(new ActorIssueText("apply only; finalize manually"), wi.actorText());
        equal(managed, wi.managedIdentity());
    }

    private void managed_work_identity_validation_rejects_a_different_changeset_or_work_branch() {
        WorkIssue wi = workIssue();
        isFalse(wi.requireManagedWorkIdentity(cs("cs-2"), branch("work/cs-1")).valid());
        isFalse(wi.requireManagedWorkIdentity(cs("cs-1"), branch("work/cs-2")).valid());
        isTrue(wi.requireManagedWorkIdentity(cs("cs-1"), branch("work/cs-1")).valid());
    }

    private void editing_actor_text_preserves_all_managed_work_identity_fields_and_existing_comments() {
        WorkIssue original = workIssue().recordConfirmedComment(new IssueCommentId(7001), new CommentText("history"));
        WorkIssue updated = original.replaceActorIssueText(new ActorIssueText("new"));
        equal(new ActorIssueText("new"), updated.actorText());
        equal(original.managedIdentity(), updated.managedIdentity());
        equal(original.comments(), updated.comments());
    }

    private void confirmed_comment_addition_does_not_change_issue_body_identity_or_actor_text() {
        WorkIssue original = workIssue();
        WorkIssue updated = original.recordConfirmedComment(new IssueCommentId(7001), new CommentText("finding"));
        equal(original.managedIdentity(), updated.managedIdentity());
        equal(original.actorText(), updated.actorText());
        equal(new CommentText("finding"), updated.comments().getLast().body());
    }

    private void confirmed_issue_edit_requires_expected_actor_text_and_unchanged_managed_identity() {
        WorkIssue issue = workIssue();
        ObservedIssue ok = new ObservedIssue(issue.managedIdentity(), new ActorIssueText("new"));
        IssueEditVerification verified = issue.verifyConfirmedActorText(ok, new ActorIssueText("new"));
        isTrue(verified.actorTextMatches());
        isTrue(verified.managedIdentityMatches());
        isTrue(verified.valid());

        ManagedWorkIdentityText wrong = new ManagedWorkIdentityText(cs("cs-1"), branch("work/cs-X"), branch("main"), commit("1111"));
        isFalse(issue.verifyConfirmedActorText(new ObservedIssue(wrong, new ActorIssueText("new")),
                new ActorIssueText("new")).valid());
    }
}

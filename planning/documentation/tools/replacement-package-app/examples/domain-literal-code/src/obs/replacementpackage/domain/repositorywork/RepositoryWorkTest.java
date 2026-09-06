package obs.replacementpackage.domain.repositorywork;

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

public final class RepositoryWorkTest extends DomainTestSupport {
    public static void runAll(DomainTestRunner runner) {
        RepositoryWorkTest test = new RepositoryWorkTest();
        runner.run("new_repository_work_fixes_exact_target_base_and_recorded_branch_identity", test::new_repository_work_fixes_exact_target_base_and_recorded_branch_identity);
        runner.run("work_branch_confirmation_rejects_evidence_for_a_different_base", test::work_branch_confirmation_rejects_evidence_for_a_different_base);
        runner.run("confirmed_work_issue_reference_is_attached_without_changing_fixed_work_identity", test::confirmed_work_issue_reference_is_attached_without_changing_fixed_work_identity);
        runner.run("confirmed_work_issue_identity_is_idempotent_and_rejects_a_different_issue", test::confirmed_work_issue_identity_is_idempotent_and_rejects_a_different_issue);
        runner.run("active_repository_work_rejects_a_branch_other_than_its_recorded_work_branch", test::active_repository_work_rejects_a_branch_other_than_its_recorded_work_branch);
        runner.run("repository_work_becomes_finalized_only_from_completed_finalization_evidence", test::repository_work_becomes_finalized_only_from_completed_finalization_evidence);
    }

    private void new_repository_work_fixes_exact_target_base_and_recorded_branch_identity() {
        RepositoryWork work = RepositoryWork.planNewRepositoryWork(
                cs("cs-001"), repo(), branch("main"), commit("1111"), branch("work/cs-001"));
        equal(cs("cs-001"), work.changeSetId());
        equal(branch("main"), work.targetBranch());
        equal(commit("1111"), work.startBaseCommit());
        equal(branch("work/cs-001"), work.workBranch().name());
    }

    private void work_branch_confirmation_rejects_evidence_for_a_different_base() {
        RepositoryWork work = activeWork();
        throwsType(WorkBranchMismatch.class, () ->
                work.confirmCreatedWorkBranch(new WorkBranchEvidence(branch("work/cs-1"), commit("2222"))));
    }

    private void confirmed_work_issue_reference_is_attached_without_changing_fixed_work_identity() {
        RepositoryWork work = activeWork();
        List<Object> before = List.of(work.changeSetId(), work.repositoryIdentity(), work.targetBranch(),
                work.startBaseCommit(), work.workBranch().name());
        RepositoryWork updated = work.attachConfirmedWorkIssue(issue(42));
        equal(issue(42), updated.issueRef().orElseThrow());
        equal(before, List.of(updated.changeSetId(), updated.repositoryIdentity(), updated.targetBranch(),
                updated.startBaseCommit(), updated.workBranch().name()));
    }

    private void confirmed_work_issue_identity_is_idempotent_and_rejects_a_different_issue() {
        RepositoryWork attached = activeWork().attachConfirmedWorkIssue(issue(42));
        RepositoryWork same = attached.attachConfirmedWorkIssue(issue(42));
        equal(attached, same);
        equal(issue(42), same.issueRef().orElseThrow());
        throwsType(WorkIssueMismatch.class, () -> attached.attachConfirmedWorkIssue(issue(43)));
    }

    private void active_repository_work_rejects_a_branch_other_than_its_recorded_work_branch() {
        isFalse(activeWork().requireRecordedWorkBranch(branch("work/cs-2")).valid());
        isTrue(activeWork().requireRecordedWorkBranch(branch("work/cs-1")).valid());
    }

    private void repository_work_becomes_finalized_only_from_completed_finalization_evidence() {
        RepositoryWork work = activeWork();
        throwsType(FinalizationIncomplete.class,
                () -> work.markFinalized(new FinalizationEvidence(true, false)));
        RepositoryWork done = work.markFinalized(new FinalizationEvidence(true, true));
        equal(RepositoryWorkLifecycle.FINALIZED, done.lifecycle());
    }
}

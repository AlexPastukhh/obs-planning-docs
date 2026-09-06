# Replacement Package — Aggregate Planning

Status: working Domain class plan  
Persistence: **non-persistent by default; delete after planned implementation/proof is complete**  
Authority: Feature `BR-*` remain semantic authority  
Scope: Domain classes only

This file is a practical example of Aggregate Planning. It is not a future durable Domain owner.

A later durable Domain/architecture/proof owner may be created separately if useful, but this planning file should not be kept merely because implementation once followed it.

## Purpose

This file answers:

```text
Which Domain classes are needed?
What semantic state do they own?
What methods protect that state?
What literal Domain unit tests prove the rules?
```

It intentionally excludes:

- Swing/UI;
- application services;
- Git/GitHub/filesystem/browser implementation;
- end-to-end Slice orchestration;
- Feature integration tests.

Those belong in Slice Discovery + non-persistent Slice Planning.

## Lifecycle

```text
Feature behavior selected
→ Aggregate Planning created/refined
→ Domain code + unit tests implemented
→ planned behavior proven
→ delete this planning artifact by default
```

Retain it only while it still coordinates unfinished implementation/migration or when deliberately kept as a methodology example.

Do not mechanically convert this file into durable Domain documentation. If durable documentation is needed later, create/update the appropriate owner for that purpose.

## Domain type classification rule

Classification is semantic, not based on number of fields.

```text
Aggregate Root
= Entity + consistency/lifecycle boundary + Aggregate external reference point

child Entity
= stable own identity whose continuity matters while state changes inside the Aggregate

Value Object
= no independent identity
+ equality by complete semantic value
+ replaced/compared as a whole
```

A Value Object may contain **one field or many fields**, nested Value Objects, collections, validation and behavior.

A uniqueness key used by an Aggregate does not automatically make a child an Entity. A referenced `*Id` field also does not make the containing object an Entity unless that ID is the containing object's own continuity identity.

Examples used below:

- `WorkBranch` — child Entity (`BranchName` identity; `knownTip` may change);
- `IssueComment` — child Entity (`IssueCommentId` identity);
- `PublicationAttempt` — child Entity (`PublicationAttemptId` identity);
- `PackageOperation` — aggregate-local multi-field Value Object;
- `IntegrationAttempt` / `FinalIssueCommentAttempt` — aggregate-local multi-field Value Objects;
- `RepositoryTarget` — shared multi-field Value Object (`RepositoryIdentity + RegisteredRepositoryPath`).

## Test rule

Tests here are **Domain unit tests**.

They call Domain objects directly and use concrete values.

Test names describe expected Domain behavior/result, not method names.

---

# `RepositoryWork`

Kind: **Aggregate Root**

## Responsibility

Own one logical repository-work identity and lifecycle: repository, target, exact Start Work base, one recorded work branch, confirmed Work Issue reference and terminal Finalized state.

## Child Domain objects

### `WorkBranch` — child Entity

```text
name: BranchName
startBaseCommit: CommitId
knownTip: Optional<CommitId>
```

It is not a generic Git branch model; it exists only as the recorded work branch of one `RepositoryWork`.

## High-level state / fields

```text
changeSetId: ChangeSetId
repositoryIdentity: RepositoryIdentity
targetBranch: BranchName
startBaseCommit: CommitId
workBranch: WorkBranch
issueRef: Optional<IssueRef>
lifecycle: RepositoryWorkLifecycle
finalizationEvidence: Optional<FinalizationEvidence>
```

Normal active-work mutation does not replace `changeSetId`, target, Start Work base or recorded work branch.

## Candidate semantic methods and local unit tests

### Method — `planNewRepositoryWork`

```text
planNewRepositoryWork(
    changeSetId: ChangeSetId,
    repositoryIdentity: RepositoryIdentity,
    targetBranch: BranchName,
    startBaseCommit: CommitId,
    workBranch: BranchName
) -> RepositoryWork
```

#### Unit tests for this method

```text
test("new_repository_work_fixes_exact_target_base_and_recorded_branch_identity") {
    // Arrange
    let changeSetId = ChangeSetId("cs-001")
    let target = BranchName("main")
    let base = CommitId("1111")
    let branch = BranchName("work/cs-001")

    // Act
    let work = RepositoryWork.planNewRepositoryWork(
        changeSetId,
        RepositoryIdentity("github:acme/repo"),
        target,
        base,
        branch
    )

    // Assert
    assertEqual(work.changeSetId, changeSetId)
    assertEqual(work.targetBranch, target)
    assertEqual(work.startBaseCommit, base)
    assertEqual(work.workBranch.name, branch)
}
```

### Method — `confirmCreatedWorkBranch`

```text
confirmCreatedWorkBranch(
    evidence: WorkBranchEvidence
) -> RepositoryWork
```

#### Unit tests for this method

```text
test("work_branch_confirmation_rejects_evidence_for_a_different_base") {
    // Arrange
    let work = repositoryWork(base: "1111", workBranch: "work/cs-1")
    let evidence = WorkBranchEvidence(
        branch: BranchName("work/cs-1"),
        baseCommit: CommitId("2222")
    )

    // Act / Assert
    assertThrows(WorkBranchMismatch.self) {
        work.confirmCreatedWorkBranch(evidence)
    }
}
```

### Method — `attachConfirmedWorkIssue`

```text
attachConfirmedWorkIssue(
    issueRef: IssueRef
) -> RepositoryWork
```

#### Unit tests for this method

```text
test("confirmed_work_issue_reference_is_attached_without_changing_fixed_work_identity") {
    // Arrange
    let work = repositoryWork(
        changeSetId: "cs-1",
        target: "main",
        base: "1111",
        workBranch: "work/cs-1"
    )
    let beforeIdentity = work.fixedIdentity

    // Act
    let updated = work.attachConfirmedWorkIssue(issueRef(42))

    // Assert — attached Issue
    assertEqual(updated.issueRef, issueRef(42))

    // Assert — fixed work identity
    assertEqual(updated.fixedIdentity, beforeIdentity)
}
```

```text
test("confirmed_work_issue_identity_is_idempotent_and_rejects_a_different_issue") {
    let attached = repositoryWork().attachConfirmedWorkIssue(issueRef(42))

    // Same external identity is idempotent.
    assertEqual(attached.attachConfirmedWorkIssue(issueRef(42)).issueRef, issueRef(42))

    // A different Issue would fork one logical work identity.
    assertThrows(WorkIssueMismatch.self) {
        attached.attachConfirmedWorkIssue(issueRef(43))
    }
}
```

### Method — `requireRecordedWorkBranch`

```text
requireRecordedWorkBranch(
    branch: BranchName
) -> RecordedWorkBranchValidation
```

#### Unit tests for this method

```text
test("active_repository_work_rejects_a_branch_other_than_its_recorded_work_branch") {
    // Arrange
    let work = activeRepositoryWork(workBranch: "work/cs-1")

    // Act
    let result = work.requireRecordedWorkBranch(BranchName("work/cs-2"))

    // Assert
    assertFalse(result.isValid)
}
```

### Method — `markFinalized`

```text
markFinalized(
    evidence: FinalizationEvidence
) -> RepositoryWork
```

#### Unit tests for this method

```text
test("repository_work_becomes_finalized_only_from_completed_finalization_evidence") {
    // Arrange
    let work = activeRepositoryWork()
    let incomplete = FinalizationEvidence(integrationProven: true, finalCommentProven: false)

    // Act / Assert
    assertThrows(FinalizationIncomplete.self) {
        work.markFinalized(incomplete)
    }
}
```

## Future / Evolution planning

### FUTURE CANDIDATE — explicit repository-work retargeting

A future Evolution may introduce an explicit retarget-work Feature when changing `targetBranch` after Start Work is a selected product need.

Potential impact:

```text
RepositoryWork
→ explicit retarget transition
→ new target/base authority rules
→ review/package invalidation rules
```

Status: **FUTURE CANDIDATE / BLOCKED BY PRODUCT DEFINITION**.

Do not add `setTargetBranch(...)` or mutate Start Work identity in current Domain behavior. A retarget operation must be introduced only with explicit Feature/BR semantics.


---

# `WorkIssue`

Kind: **Aggregate Root**

## Responsibility

Own semantic consistency of one exact Work Issue: protected Builder-managed work identity, actor-owned prose and confirmed comments.

## Child Domain objects

### `IssueComment` — child Entity

```text
commentId: IssueCommentId
body: CommentText
```

One child represents one exact externally confirmed Issue comment.

## High-level state / fields

```text
issueRef: IssueRef
title: IssueTitle
managedIdentity: ManagedWorkIdentityText
actorText: ActorIssueText
comments: List<IssueComment>
```

`managedIdentity` contains exact `changeSetId`, work branch, target branch and Start Work base.

## Candidate semantic methods and local unit tests

### Method — `fromConfirmedIssue`

```text
fromConfirmedIssue(
    issueRef: IssueRef,
    managedIdentity: ManagedWorkIdentityText,
    actorText: ActorIssueText
) -> WorkIssue
```

#### Unit tests for this method

```text
test("actor_issue_text_is_preserved_independently_from_managed_work_identity") {
    // Arrange
    let managed = managedIdentity(
        changeSetId: "cs-1",
        workBranch: "work/cs-1",
        target: "main",
        base: "1111"
    )

    // Act
    let issue = WorkIssue.fromConfirmedIssue(
        issueRef(42),
        managed,
        ActorIssueText("apply only; finalize manually")
    )

    // Assert
    assertEqual(issue.actorText, ActorIssueText("apply only; finalize manually"))
    assertEqual(issue.managedIdentity, managed)
}
```

### Method — `requireManagedWorkIdentity`

```text
requireManagedWorkIdentity(
    changeSetId: ChangeSetId,
    workBranch: BranchName
) -> WorkIssueIdentityValidation
```

#### Unit tests for this method

```text
test("managed_work_identity_validation_rejects_a_different_changeset_or_work_branch") {
    // Arrange
    let issue = workIssue(changeSetId: "cs-1", workBranch: "work/cs-1")

    // Act
    let wrongChangeSet = issue.requireManagedWorkIdentity(
        ChangeSetId("cs-2"),
        BranchName("work/cs-1")
    )
    let wrongBranch = issue.requireManagedWorkIdentity(
        ChangeSetId("cs-1"),
        BranchName("work/cs-2")
    )

    // Assert — ChangeSet mismatch
    assertFalse(wrongChangeSet.isValid)

    // Assert — branch mismatch
    assertFalse(wrongBranch.isValid)
}
```

### Method — `replaceActorIssueText`

Status: **FUTURE FEATURE SUPPORT — Edit Work Issue**

```text
replaceActorIssueText(
    newActorText: ActorIssueText
) -> WorkIssue
```

#### Unit tests for this method

```text
test("editing_actor_text_preserves_all_managed_work_identity_fields_and_existing_comments") {
    // Arrange
    let issue = workIssue(
        actorText: "old",
        changeSetId: "cs-1",
        workBranch: "work/cs-1",
        target: "main",
        base: "1111",
        comments: ["history"]
    )

    // Act
    let updated = issue.replaceActorIssueText(ActorIssueText("new"))

    // Assert
    assertEqual(updated.actorText, ActorIssueText("new"))
    assertEqual(updated.managedIdentity, issue.managedIdentity)
    assertEqual(updated.comments, issue.comments)
}
```

### Method — `recordConfirmedComment`

```text
recordConfirmedComment(
    commentId: IssueCommentId,
    body: CommentText
) -> WorkIssue
```

#### Unit tests for this method

```text
test("confirmed_comment_addition_does_not_change_issue_body_identity_or_actor_text") {
    // Arrange
    let issue = workIssue(actorText: "goal")

    // Act
    let updated = issue.recordConfirmedComment(
        IssueCommentId(7001),
        CommentText("finding")
    )

    // Assert
    assertEqual(updated.managedIdentity, issue.managedIdentity)
    assertEqual(updated.actorText, issue.actorText)
    assertEqual(updated.comments.last.body, CommentText("finding"))
}
```

### Method — `verifyConfirmedActorText`

Status: **FUTURE FEATURE SUPPORT — Edit Work Issue**

```text
verifyConfirmedActorText(
    observed: ObservedIssue,
    expected: ActorIssueText
) -> IssueEditVerification
```

#### Unit tests for this method

```text
test("confirmed_issue_edit_requires_expected_actor_text_and_unchanged_managed_identity") {
    // Arrange
    let issue = workIssue(
        changeSetId: "cs-1",
        workBranch: "work/cs-1",
        actorText: "old"
    )
    let observed = observedIssue(
        changeSetId: "cs-1",
        workBranch: "work/cs-1",
        actorText: "new"
    )

    // Act
    let result = issue.verifyConfirmedActorText(
        observed,
        ActorIssueText("new")
    )

    // Assert — edited actor text
    assertTrue(result.actorTextMatches)

    // Assert — protected managed identity
    assertTrue(result.managedIdentityMatches)
    assertTrue(result.isValid)
}
```

## Future / Evolution planning

### FUTURE FEATURE — `F-BLDR-EDIT-WORK-ISSUE`

Canonical planned Evolution: `EVO-BLDR-EDIT-DURABLE-WORK-ISSUE`.

`replaceActorIssueText(...)` and `verifyConfirmedActorText(...)` are planned now as Domain support for the future Edit Work Issue Feature.

### FUTURE CANDIDATE — exact Issue-body representation

Actor-owned prose vs Builder-managed identity delimiters/Markdown remain OPEN.

Once selected, the representation may introduce a dedicated Value Object such as:

```text
WorkIssueBody
actorText: ActorIssueText
managedIdentity: ManagedWorkIdentityText
```

Status: **FUTURE / BLOCKED BY OPEN PRODUCT DETAIL**. Do not bake a delimiter format into `WorkIssue` semantics yet.


---

# `ReplacementPackage`

Kind: **Aggregate Root**

## Responsibility

Own one exact immutable replacement package semantic model: identity, logical work, repository, expected source and a collision-free operation set.

## Aggregate-local Value Objects

### `PackageOperation` — multi-field Value Object

`PackageOperation` has no independent identity/lifecycle. Its complete semantic value is `(path, action, expectedBase, replacement)`.

`PackagePath` is the Aggregate's uniqueness/lookup key for the operation set; that uniqueness rule does **not** make `PackageOperation` an Entity.

```text
path: PackagePath
action: add | replace | delete
expectedBase: Optional<FileBytes>
replacement: Optional<FileBytes>
```

## High-level state / fields

```text
packageId: PackageId
changeSetId: ChangeSetId
repositoryIdentity: RepositoryIdentity
expectedSource: CommitId
operations: List<PackageOperation>
```

## Candidate semantic methods and local unit tests

### Method — `createValidatedPackage`

```text
createValidatedPackage(
    packageId: PackageId,
    changeSetId: ChangeSetId,
    repositoryIdentity: RepositoryIdentity,
    expectedSource: CommitId,
    operations: IReadOnlyList<PackageOperation>
) -> ReplacementPackage
```

#### Unit tests for this method

```text
test("package_rejects_duplicate_operation_paths") {
    // Arrange
    let operations = [
        PackageOperation.add(PackagePath("a.txt"), FileBytes("new")),
        PackageOperation.delete(PackagePath("a.txt"), FileBytes("old"))
    ]

    // Act / Assert
    assertThrows(DuplicatePackagePath.self) {
        ReplacementPackage.createValidatedPackage(
            PackageId("pkg-1"),
            ChangeSetId("cs-1"),
            RepositoryIdentity("github:acme/repo"),
            CommitId("1111"),
            operations
        )
    }
}
```

### Method — `operationFor`

```text
operationFor(
    path: PackagePath
) -> Optional<PackageOperation>
```

#### Unit tests for this method

```text
test("each_exact_package_path_resolves_to_its_single_corresponding_operation") {
    // Arrange
    let package = replacementPackage(
        operations: [
            PackageOperation.add(PackagePath("a.txt"), FileBytes("A")),
            PackageOperation.delete(PackagePath("b.txt"), FileBytes("B"))
        ]
    )

    // Act
    let found = package.operationFor(PackagePath("b.txt"))

    // Assert — exact lookup
    assertEqual(found.path, PackagePath("b.txt"))
    assertEqual(found.action, delete)

    // Assert — unrelated path
    assertNil(package.operationFor(PackagePath("missing.txt")))
}
```

### Method — `PackageOperation.replace`

```text
PackageOperation.replace(
    path: PackagePath,
    expectedBase: FileBytes,
    replacement: FileBytes
) -> PackageOperation
```

#### Unit tests for this method

```text
test("replace_operation_contains_exact_expected_base_and_complete_replacement_bytes") {
    // Arrange / Act
    let op = PackageOperation.replace(
        PackagePath("a.txt"),
        FileBytes("old\n"),
        FileBytes("new\n")
    )

    // Assert
    assertEqual(op.expectedBase, FileBytes("old\n"))
    assertEqual(op.replacement, FileBytes("new\n"))
    assertEqual(
        op,
        PackageOperation.replace(PackagePath("a.txt"), FileBytes("old\n"), FileBytes("new\n"))
    )
}
```

### Method — `PackageOperation.add / delete`

```text
PackageOperation.add(
    path: PackagePath,
    replacement: FileBytes
) -> PackageOperation

PackageOperation.delete(
    path: PackagePath,
    expectedBase: FileBytes
) -> PackageOperation
```

#### Unit tests for this method

```text
test("add_and_delete_operations_have_only_the_payloads_allowed_by_their_action") {
    // Arrange / Act
    let add = PackageOperation.add(PackagePath("new.txt"), FileBytes("new"))
    let delete = PackageOperation.delete(PackagePath("old.txt"), FileBytes("old"))

    // Assert
    assertNil(add.expectedBase)
    assertNotNil(add.replacement)
    assertNotNil(delete.expectedBase)
    assertNil(delete.replacement)
}
```

## Future / Evolution planning

### FUTURE CANDIDATE — richer package operation kinds

No additional operation kind is selected now. If future package protocol Evolution introduces rename/move/mode/symlink semantics, add them only through explicit Feature/Protocol requirements.

Current Domain remains:

```text
add | replace | delete
```

Status: **FUTURE CANDIDATE / NOT SELECTED**.


---

# `PackageReview`

Kind: **Aggregate Root**

## Responsibility

Own one coherent immutable review reconstruction identity: package/source/work context, predicted tree, latest diff, cumulative diff and full-result identity.

## High-level state / fields

```text
reviewId: ReviewId
changeSetId: ChangeSetId
packageId: PackageId
workBranch: BranchName
startBaseCommit: CommitId
expectedSource: CommitId
predictedTree: GitTreeId
latestDiff: DiffArtifact
cumulativeDiff: DiffArtifact
fullResult: WorkspaceResultId
decision: Optional<ReviewDecision>   # only if persistence is later selected
```

## Candidate semantic methods and local unit tests

### Method — `createValidatedReview`

```text
createValidatedReview(
    reviewId: ReviewId,
    changeSetId: ChangeSetId,
    packageId: PackageId,
    workBranch: BranchName,
    startBaseCommit: CommitId,
    expectedSource: CommitId,
    predictedTree: GitTreeId,
    latestDiff: DiffArtifact,
    cumulativeDiff: DiffArtifact,
    fullResult: WorkspaceResultId
) -> PackageReview
```

#### Unit tests for this method

```text
test("review_accepts_only_artifacts_that_end_at_the_same_predicted_tree") {
    // Arrange
    let latest = diff(from: "1111", toTree: "tree-A")
    let cumulative = diff(from: "0000", toTree: "tree-A")
    let full = workspaceResult(tree: "tree-A")

    // Act
    let review = validPackageReview(
        predictedTree: "tree-A",
        latestDiff: latest,
        cumulativeDiff: cumulative,
        fullResult: full
    )

    // Assert
    assertEqual(review.latestDiff.toTree, review.predictedTree)
    assertEqual(review.cumulativeDiff.toTree, review.predictedTree)
    assertEqual(review.fullResult.tree, review.predictedTree)
}
```

```text
test("review_rejects_latest_diff_from_a_source_other_than_expected_source") {
    // Arrange
    let latest = diff(from: "2222", toTree: "tree-A")

    // Act / Assert
    assertThrows(ReviewArtifactMismatch.self) {
        validReviewBuilder(expectedSource: "1111", latestDiff: latest).build()
    }
}
```

```text
test("review_rejects_cumulative_diff_from_a_source_other_than_start_work_base") {
    // Arrange
    let cumulative = diff(from: "9999", toTree: "tree-A")

    // Act / Assert
    assertThrows(ReviewArtifactMismatch.self) {
        validReviewBuilder(startBaseCommit: "0000", cumulativeDiff: cumulative).build()
    }
}
```

```text
test("historical_review_identity_does_not_change_when_the_work_branch_moves_later") {
    // Arrange
    let review = validPackageReview(
        workBranch: "work/cs-1",
        expectedSource: "1111",
        predictedTree: "tree-A"
    )

    // Act
    let unrelatedLaterBranchTip = CommitId("bbbb")

    // Assert
    assertEqual(review.workBranch, BranchName("work/cs-1"))
    assertEqual(review.expectedSource, CommitId("1111"))
    assertEqual(review.predictedTree, GitTreeId("tree-A"))
}
```

## Future / Evolution planning

### FUTURE CANDIDATE — persisted semantic review decision

Potential future state:

```text
decision: ReviewDecision(APPROVABLE | NEEDS_CORRECTION)
```

Status: **FUTURE / OPEN OWNER DECISION**.

The current Scenario actor owns the semantic decision. Do not persist it in `PackageReview` until a Feature/Evolution explicitly selects that responsibility.

### FUTURE EXTENSION — renewed review authority after published-tree change

Canonical selected Evolution: `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`.

Finalize requires current review authority. If the published work tree changes after the original review, a future selected mechanism must establish authority for the new exact tree.

Possible impact:

```text
PackageReview
→ ReviewAuthority / reviewed tree identity
→ supersedes stale authority
```

Status: **FUTURE / BLOCKED BY PRODUCT DEFINITION**.


---

# `PackageApplication`

Kind: **Aggregate Root**

## Responsibility

Own proven Apply/Commit/Publish progress for one exact `(changeSetId, packageId)` application and preserve publication uncertainty truth.

## Child Domain objects

### `PublicationAttempt` — child Entity

```text
attemptId: PublicationAttemptId
intendedRemoteBranch: RemoteBranchRef
intendedTip: CommitId
outcome: PublicationAttemptOutcome   # UNCERTAIN | NOT_PUBLISHED | PUBLISHED
evidence: PublicationAttemptResultEvidence
```

Represents one externally effectful publication attempt and its known/unknown outcome. Reconciliation changes the state/evidence of the **same `PublicationAttemptId`**; a real retry uses a new ID only after the prior uncertain attempt is reconciled.

## High-level state / fields

```text
changeSetId: ChangeSetId
packageId: PackageId
expectedSource: CommitId
workBranch: BranchName
requestedExtent: ApplyExtent
stage: ApplicationStage
appliedTree: Optional<GitTreeId>
commitId: Optional<CommitId>
committedTree: Optional<GitTreeId>
publicationAttempts: List<PublicationAttempt>
publishedTip: Optional<CommitId>
publishedTree: Optional<GitTreeId>
```

## Candidate semantic methods and local unit tests

### Method — `begin`

```text
begin(
    changeSetId: ChangeSetId,
    packageId: PackageId,
    expectedSource: CommitId,
    workBranch: BranchName,
    requestedExtent: ApplyExtent
) -> PackageApplication
```

#### Unit tests for this method

```text
test("new_package_application_starts_before_any_apply_commit_or_publish_result_is_proven") {
    // Arrange / Act
    let application = PackageApplication.begin(
        ChangeSetId("cs-1"),
        PackageId("pkg-1"),
        CommitId("1111"),
        BranchName("work/cs-1"),
        ApplyExtent.ApplyCommitPublish
    )

    // Assert — identity
    assertEqual(application.changeSetId, ChangeSetId("cs-1"))
    assertEqual(application.packageId, PackageId("pkg-1"))

    // Assert — initial stage
    assertEqual(application.stage, Ready)
    assertNil(application.appliedTree)
    assertNil(application.commitId)
    assertNil(application.publishedTip)
}
```

### Method — `markApplied`

```text
markApplied(
    appliedTree: GitTreeId
) -> PackageApplication
```

#### Unit tests for this method

```text
test("applied_state_records_the_exact_applied_tree_without_implying_commit_or_publish") {
    // Arrange
    let application = packageApplicationReady()

    // Act
    let applied = application.markApplied(GitTreeId("tree-A"))

    // Assert — proven Apply
    assertEqual(applied.stage, Applied)
    assertEqual(applied.appliedTree, GitTreeId("tree-A"))

    // Assert — later stages not implied
    assertNil(applied.commitId)
    assertNil(applied.publishedTip)
}
```

### Method — `markCommitted`

```text
markCommitted(
    commitId: CommitId,
    committedTree: GitTreeId
) -> PackageApplication
```

#### Unit tests for this method

```text
test("commit_state_requires_a_previously_proven_applied_result") {
    // Arrange
    let application = PackageApplication.begin(
        ChangeSetId("cs-1"),
        PackageId("pkg-1"),
        CommitId("1111"),
        BranchName("work/cs-1"),
        ApplyExtent.ApplyCommit
    )

    // Act / Assert
    assertThrows(InvalidApplicationTransition.self) {
        application.markCommitted(CommitId("aaaa"), GitTreeId("tree-A"))
    }
}
```

### Method — `markPublicationUncertain`

```text
markPublicationUncertain(
    attemptId: PublicationAttemptId,
    evidence: PublicationAttemptEvidence
) -> PackageApplication
```

#### Unit tests for this method

```text
test("publication_uncertainty_is_preserved_as_a_distinct_proven_state") {
    // Arrange
    let application = committedApplication(commit: "aaaa", tree: "tree-A")

    // Act
    let uncertain = application.markPublicationUncertain(
        PublicationAttemptId("attempt-1"),
        publicationAttemptEvidence(intendedTip: "aaaa")
    )

    // Assert
    assertEqual(uncertain.currentProvenResult().state, PublicationUncertain)
    assertEqual(uncertain.commitId, CommitId("aaaa"))
}
```

### Method — publication-attempt reconciliation

```text
markPublicationNotPublished(
    attemptId: PublicationAttemptId,
    evidence: PublicationNotPublishedEvidence
) -> PackageApplication
```

Reconciliation never creates a second Entity with the same identity. `UNCERTAIN → PUBLISHED` or `UNCERTAIN → NOT_PUBLISHED` preserves `PublicationAttemptId`. Only after `NOT_PUBLISHED` is proven may a later real push use a new attempt ID.

#### Unit tests for publication-attempt continuity

```text
test("uncertain_publication_reconciliation_updates_the_same_attempt_identity_when_published") {
    let uncertain = committedApplication().markPublicationUncertain(
        PublicationAttemptId("attempt-1"),
        publicationAttemptEvidence(intendedTip: "aaaa")
    )

    let published = uncertain.markPublished(
        PublicationAttemptId("attempt-1"),
        CommitId("aaaa"),
        GitTreeId("tree-A"),
        publicationEvidence(remoteTip: "aaaa", remoteTree: "tree-A")
    )

    assertEqual(published.publicationAttempts.count, 1)
    assertEqual(published.publicationAttempts[0].attemptId, PublicationAttemptId("attempt-1"))
    assertEqual(published.publicationAttempts[0].outcome, Published)
}
```

```text
test("uncertain_publication_must_be_reconciled_before_a_new_attempt_identity_can_be_recorded") {
    let uncertain = committedApplication().markPublicationUncertain(
        PublicationAttemptId("attempt-1"),
        publicationAttemptEvidence(intendedTip: "aaaa")
    )

    assertThrows(InvalidApplicationTransition.self) {
        uncertain.markPublished(
            PublicationAttemptId("attempt-2"),
            CommitId("aaaa"),
            GitTreeId("tree-A"),
            publicationEvidence(remoteTip: "aaaa", remoteTree: "tree-A")
        )
    }
}
```

```text
test("proven_not_published_reconciliation_returns_to_committed_without_losing_attempt_history") {
    let uncertain = committedApplication().markPublicationUncertain(
        PublicationAttemptId("attempt-1"),
        publicationAttemptEvidence(intendedTip: "aaaa")
    )

    let reconciled = uncertain.markPublicationNotPublished(
        PublicationAttemptId("attempt-1"),
        publicationNotPublishedEvidence(observedRemoteTip: "older")
    )

    assertEqual(reconciled.stage, Committed)
    assertEqual(reconciled.publicationAttempts[0].attemptId, PublicationAttemptId("attempt-1"))
    assertEqual(reconciled.publicationAttempts[0].outcome, NotPublished)
}
```

### Method — `markPublished`

```text
markPublished(
    attemptId: PublicationAttemptId,
    provenRemoteTip: CommitId,
    provenRemoteTree: GitTreeId,
    evidence: PublicationEvidence
) -> PackageApplication
```

#### Unit tests for this method

```text
test("published_state_requires_remote_tip_equal_to_the_committed_tip") {
    // Arrange
    let application = committedApplication(commit: "aaaa", tree: "tree-A")

    // Act / Assert
    assertThrows(PublicationEvidenceMismatch.self) {
        application.markPublished(
            PublicationAttemptId("attempt-1"),
            CommitId("bbbb"),
            GitTreeId("tree-A"),
            publicationEvidence(remoteTip: "bbbb")
        )
    }
}
```

```text
test("published_state_records_the_exact_proven_remote_tree") {
    // Arrange
    let application = committedApplication(commit: "aaaa", tree: "tree-A")

    // Act
    let published = application.markPublished(
        PublicationAttemptId("attempt-1"),
        CommitId("aaaa"),
        GitTreeId("tree-A"),
        publicationEvidence(remoteTip: "aaaa", remoteTree: "tree-A")
    )

    // Assert
    assertEqual(published.publishedTip, CommitId("aaaa"))
    assertEqual(published.publishedTree, GitTreeId("tree-A"))
    assertEqual(published.currentProvenResult().state, Published)
}
```

### Method — `currentProvenResult`

```text
currentProvenResult() -> ApplyProvenResult
```

#### Unit tests for this method

```text
test("committed_application_reports_committed_as_the_highest_proven_state_without_publication") {
    // Arrange
    let applied = packageApplicationReady().markApplied(GitTreeId("tree-A"))
    let committed = applied.markCommitted(CommitId("aaaa"), GitTreeId("tree-A"))

    // Act
    let result = committed.currentProvenResult()

    // Assert — proven stage
    assertEqual(result.state, AppliedCommitted)
    assertEqual(result.commitId, CommitId("aaaa"))

    // Assert — publication not invented
    assertNil(result.publishedTip)
}
```

## Future / Evolution planning

Canonical selected Evolution: `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`.

### FUTURE EXTENSION — Confirm Reviewed Published Revision

The existing Apply Feature has a planned extension that binds the actual published result to Builder review identity by exact Git-tree equality.

Current cross-Aggregate comparison can remain in the application service:

```text
PackageApplication.publishedTree
==
PackageReview.predictedTree
```

Possible future Domain impact only if approval attribution becomes durable state:

```text
reviewAuthority: ReviewAuthority
```

Status: **FUTURE EXTENSION**. Do not add durable approval state until its owner/lifecycle is explicitly selected.


---

# `WorkFinalization`

Kind: **Aggregate Root**

## Responsibility

Own the two externally effectful completion obligations — exact integration and final Issue communication — including partial/uncertain recovery.

## Aggregate-local Value Objects

### `IntegrationAttempt` — multi-field Value Object
Tracks one recorded integration-attempt fact: intended exact source/target, outcome and optional confirmed evidence. No independent attempt identity is currently selected.

### `FinalIssueCommentAttempt` — multi-field Value Object
Tracks one recorded final-comment-attempt fact: intended Issue/comment, outcome and optional confirmed evidence. No independent attempt identity is currently selected.

## High-level state / fields

```text
changeSetId: ChangeSetId
workBranch: BranchName
publishedTip: CommitId
publishedTree: GitTreeId
targetBranch: BranchName
reviewAuthority: ReviewAuthority
issueRef: IssueRef
finalComment: Optional<CommentText>
integrationAttempts: List<IntegrationAttempt>
finalCommentAttempts: List<FinalIssueCommentAttempt>
state: FinalizationState
```

## Candidate semantic methods and local unit tests

### Method — `begin`

```text
begin(
    changeSetId: ChangeSetId,
    workBranch: BranchName,
    publishedTip: CommitId,
    publishedTree: GitTreeId,
    targetBranch: BranchName,
    reviewAuthority: ReviewAuthority,
    issueRef: IssueRef,
    finalComment: Optional<CommentText>
) -> WorkFinalization
```

#### Unit tests for this method

```text
test("new_finalization_fixes_exact_published_result_target_review_authority_and_issue") {
    // Arrange / Act
    let finalization = WorkFinalization.begin(
        ChangeSetId("cs-1"),
        BranchName("work/cs-1"),
        CommitId("aaaa"),
        GitTreeId("tree-A"),
        BranchName("main"),
        ReviewAuthority(GitTreeId("tree-A")),
        issueRef(42),
        CommentText("done")
    )

    // Assert — exact work/result identity
    assertEqual(finalization.publishedTip, CommitId("aaaa"))
    assertEqual(finalization.publishedTree, GitTreeId("tree-A"))
    assertEqual(finalization.targetBranch, BranchName("main"))

    // Assert — completion obligations
    assertFalse(finalization.integrationIsConfirmed)
    assertFalse(finalization.finalIssueCommentIsConfirmed)
}
```

### Method — `confirmIntegration`

```text
confirmIntegration(
    evidence: IntegrationEvidence
) -> WorkFinalization
```

#### Unit tests for this method

```text
test("integration_proof_for_a_different_published_tip_is_rejected") {
    // Arrange
    let finalization = workFinalization(publishedTip: "aaaa", target: "main")
    let evidence = integrationEvidence(sourceTip: "bbbb", target: "main")

    // Act / Assert
    assertThrows(IntegrationEvidenceMismatch.self) {
        finalization.confirmIntegration(evidence)
    }
}
```

```text
test("integration_may_be_confirmed_before_final_issue_comment_while_relative_order_is_open") {
    // Arrange
    let finalization = workFinalization()

    // Act
    let updated = finalization.confirmIntegration(validIntegrationEvidence())

    // Assert — first effect accepted
    assertTrue(updated.integrationIsConfirmed)

    // Assert — second effect remains outstanding
    assertFalse(updated.finalIssueCommentIsConfirmed)
}
```

### Method — `confirmFinalIssueComment`

```text
confirmFinalIssueComment(
    evidence: IssueCommentEvidence
) -> WorkFinalization
```

#### Unit tests for this method

```text
test("final_issue_comment_proof_for_a_different_issue_is_rejected") {
    // Arrange
    let finalization = workFinalization(issue: 42)
    let evidence = issueCommentEvidence(issue: 43, body: "done")

    // Act / Assert
    assertThrows(IssueCommentEvidenceMismatch.self) {
        finalization.confirmFinalIssueComment(evidence)
    }
}
```

```text
test("final_issue_comment_may_be_confirmed_before_integration_while_relative_order_is_open") {
    // Arrange
    let finalization = workFinalization()

    // Act
    let updated = finalization.confirmFinalIssueComment(
        validIssueCommentEvidence()
    )

    // Assert — first effect accepted
    assertTrue(updated.finalIssueCommentIsConfirmed)

    // Assert — integration remains outstanding
    assertFalse(updated.integrationIsConfirmed)
}
```



### Method — `markIntegrationUncertain`

```text
markIntegrationUncertain(
    evidence: IntegrationAttemptEvidence
) -> WorkFinalization
```

#### Unit tests for this method

```text
test("uncertain_integration_remains_distinct_from_confirmed_integration") {
    // Arrange
    let finalization = workFinalization()

    // Act
    let uncertain = finalization.markIntegrationUncertain(
        integrationAttemptEvidence()
    )

    // Assert
    assertTrue(uncertain.integrationIsUncertain)
    assertFalse(uncertain.integrationIsConfirmed)
}
```

### Method — `markFinalIssueCommentUncertain`

```text
markFinalIssueCommentUncertain(
    evidence: IssueCommentAttemptEvidence
) -> WorkFinalization
```

#### Unit tests for this method

```text
test("confirmed_integration_survives_uncertain_final_issue_comment") {
    // Arrange
    let finalization = workFinalization()
        .confirmIntegration(validIntegrationEvidence())

    // Act
    let updated = finalization.markFinalIssueCommentUncertain(
        finalCommentAttemptEvidence()
    )

    // Assert
    assertTrue(updated.integrationIsConfirmed)
    assertTrue(updated.finalIssueCommentIsUncertain)
}
```

### Method — `complete`

```text
complete() -> CompletedWorkFinalization
```

#### Unit tests for this method

```text
test("finalization_completes_only_when_integration_and_final_comment_are_both_proven") {
    // Arrange
    let onlyIntegration = workFinalization()
        .confirmIntegration(validIntegrationEvidence())

    // Act / Assert
    assertThrows(FinalizationIncomplete.self) {
        onlyIntegration.complete()
    }
}
```

## Future / Evolution planning

Canonical selected Evolution: `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`.

### SELECTED FUTURE PRESSURE — Ensure Integration PR

The Evolution target says the future reviewed-result workflow eventually has one correct/current integration PR.

Current Domain planning does **not** add PR-specific state or methods because the current Finalize Feature leaves exact integration/PR mechanics OPEN.

Keep the existing mechanism-neutral semantic boundary:

```text
confirmIntegration(
    evidence: IntegrationEvidence
) -> WorkFinalization
```

Future PR evidence may satisfy that same boundary if its exact semantics are later selected. Reopen the Domain model only if the selected future Feature requires new semantic identity/state/lifecycle beyond the current exact integration proof.

Status: **FUTURE / PR-SPECIFIC DOMAIN SURFACE BLOCKED BY OPEN PRODUCT DETAIL**.

Do not introduce PR-specific IDs/evidence types, PR lifecycle state, PR-specific Domain methods or PR-specific unit tests until the Feature/Evolution owner selects those exact semantics.

Current `WorkFinalization` remains mechanism-neutral: it owns proof that the exact reviewed published result was integrated into the exact target.

---

# `SnapshotExport`

Kind: **Aggregate Root**

## Responsibility

Own semantic identity of one exact Snapshot capture and whether it is eligible to publish as one coherent artifact.

## High-level state / fields

```text
target: RepositoryTargetRef
source: SnapshotSource
outputPath: ValidatedSnapshotOutputPath
firstInventory: Optional<SnapshotInventory>
initialDiff: Optional<DiffArtifact>
confirmedInventory: Optional<SnapshotInventory>
artifactFingerprint: Optional<ArtifactFingerprint>
state: SnapshotExportState
```

## Candidate semantic methods and local unit tests

### Method — `beginLocal`

```text
beginLocal(
    target: RepositoryTargetRef,
    frozenHead: CommitId,
    outputPath: ValidatedSnapshotOutputPath
) -> SnapshotExport
```

#### Unit tests for this method

```text
test("local_snapshot_export_fixes_the_frozen_head_and_validated_output_path") {
    // Arrange / Act
    let export = SnapshotExport.beginLocal(
        repositoryTargetRef("repo-1"),
        CommitId("1111"),
        validatedOutputPath("/exports/snapshot.zip")
    )

    // Assert
    assertEqual(export.source, SnapshotSource.Local(CommitId("1111")))
    assertEqual(export.outputPath, validatedOutputPath("/exports/snapshot.zip"))
}
```

### Method — `beginCommit`

```text
beginCommit(
    target: RepositoryTargetRef,
    resolvedCommit: CommitId,
    outputPath: ValidatedSnapshotOutputPath
) -> SnapshotExport
```

#### Unit tests for this method

```text
test("commit_snapshot_export_fixes_the_once_resolved_commit_as_immutable_source") {
    // Arrange / Act
    let export = SnapshotExport.beginCommit(
        repositoryTargetRef("repo-1"),
        CommitId("1111"),
        validatedOutputPath("/exports/snapshot.zip")
    )

    // Assert
    assertEqual(export.source, SnapshotSource.Commit(CommitId("1111")))
}
```

### Method — `recordFirstLocalCapture`

```text
recordFirstLocalCapture(
    inventory: SnapshotInventory,
    diff: DiffArtifact
) -> SnapshotExport
```

#### Unit tests for this method

```text
test("first_local_capture_records_inventory_and_diff_against_the_frozen_head") {
    // Arrange
    let export = localSnapshotExport(frozenHead: "1111")
    let inventory = snapshotInventory(["a.txt": "A"])
    let diff = diff(from: "1111", toFingerprint: inventory.fingerprint)

    // Act
    let recorded = export.recordFirstLocalCapture(inventory, diff)

    // Assert — capture identity
    assertEqual(recorded.firstInventory, inventory)

    // Assert — diff source/result
    assertEqual(recorded.initialDiff.fromCommit, CommitId("1111"))
    assertEqual(recorded.initialDiff.toFingerprint, inventory.fingerprint)
}
```

### Method — `confirmSecondLocalCapture`

```text
confirmSecondLocalCapture(
    secondInventory: SnapshotInventory,
    observedHead: CommitId,
    repeatedDiff: DiffArtifact
) -> SnapshotExport
```

#### Unit tests for this method

```text
test("local_capture_cannot_be_confirmed_when_second_inventory_differs_from_the_first") {
    // Arrange
    let export = localSnapshotExport(frozenHead: "1111")
        .recordFirstLocalCapture(
            snapshotInventory(["a.txt": "A"]),
            diff(from: "1111", toFingerprint: "fp-A")
        )

    // Act / Assert
    assertThrows(LocalSnapshotChangedDuringCapture.self) {
        export.confirmSecondLocalCapture(
            snapshotInventory(["a.txt": "B"]),
            CommitId("1111"),
            diff(from: "1111", toFingerprint: "fp-B")
        )
    }
}
```

```text
test("local_capture_cannot_be_confirmed_when_head_changes_during_capture") {
    // Arrange
    let export = localSnapshotExport(frozenHead: "1111")
        .recordFirstLocalCapture(snapshotInventory(["a.txt": "A"]), diff1())

    // Act / Assert
    assertThrows(LocalSnapshotHeadChanged.self) {
        export.confirmSecondLocalCapture(
            snapshotInventory(["a.txt": "A"]),
            CommitId("2222"),
            diff1()
        )
    }
}
```

### Method — `recordCommitCapture`

```text
recordCommitCapture(
    inventory: SnapshotInventory
) -> SnapshotExport
```

#### Unit tests for this method

```text
test("commit_capture_records_one_inventory_for_the_fixed_commit_source") {
    // Arrange
    let export = commitSnapshotExport(resolvedCommit: "1111")
    let inventory = snapshotInventory(["a.txt": "committed"])

    // Act
    let recorded = export.recordCommitCapture(inventory)

    // Assert
    assertEqual(recorded.confirmedInventory, inventory)
    assertEqual(recorded.source, SnapshotSource.Commit(CommitId("1111")))
}
```

### Method — `rejectUnsupportedSourceEntry`

```text
rejectUnsupportedSourceEntry(
    entryType: SnapshotSourceEntryType
) -> FailedSnapshotExport
```

#### Unit tests for this method

```text
test("unsupported_source_entry_makes_snapshot_export_failed_and_nonpublishable") {
    // Arrange
    let export = localSnapshotExport(frozenHead: "1111")

    // Act
    let failed = export.rejectUnsupportedSourceEntry(.symlink)

    // Assert
    assertTrue(failed.isFailed)
    assertFalse(failed.canPublish)
}
```

### Method — `publish`

```text
publish(
    artifactFingerprint: ArtifactFingerprint,
    finalPath: ValidatedSnapshotOutputPath
) -> PublishedSnapshotExport
```

#### Unit tests for this method

```text
test("published_snapshot_records_exact_artifact_fingerprint_and_validated_final_path") {
    // Arrange
    let export = coherentSnapshotExport(
        target: repositoryTargetRef("repo-1"),
        source: SnapshotSource.Commit(CommitId("1111")),
        finalPath: validatedOutputPath("/exports/snapshot.zip")
    )

    // Act
    let published = export.publish(
        ArtifactFingerprint("sha256:abc"),
        validatedOutputPath("/exports/snapshot.zip")
    )

    // Assert
    assertEqual(published.artifactFingerprint, ArtifactFingerprint("sha256:abc"))
    assertEqual(published.finalPath, validatedOutputPath("/exports/snapshot.zip"))
}
```

## Future / Evolution planning

### FUTURE SHARED-DELIVERY EVOLUTION

Snapshot export itself remains a read-only artifact Feature.

Future delivery/browser improvements should continue through the separate `ExternalInteraction` owner and Shared delivery capability rather than adding browser state to `SnapshotExport`.

Status: **FUTURE EXTENSION OF SHARED DELIVERY, NO CORE SNAPSHOT AGGREGATE CHANGE SELECTED**.


---

# `ExternalInteraction`

Kind: **Aggregate Root**

## Responsibility

Own one exact external artifact-delivery attempt: artifact, destination, mode and explicit delivery uncertainty/terminal state.

## High-level state / fields

```text
interactionId: InteractionId
artifact: ArtifactFingerprint
destination: ConversationKey
mode: DeliveryMode
state: InteractionState
attachmentEvidence: Optional<AttachmentEvidence>
sendEvidence: Optional<SendEvidence>
```

## Candidate semantic methods and local unit tests

### Method — `begin`

```text
begin(
    interactionId: InteractionId,
    artifact: ArtifactFingerprint,
    destination: ConversationKey,
    mode: DeliveryMode
) -> ExternalInteraction
```

#### Unit tests for this method

```text
test("delivery_attempt_identity_freezes_artifact_destination_and_mode") {
    // Arrange / Act
    let interaction = ExternalInteraction.begin(
        InteractionId("int-1"),
        ArtifactFingerprint("sha256:abc"),
        ConversationKey("chat-7"),
        DeliveryMode.AttachAndSend
    )

    // Assert
    assertEqual(interaction.artifact, ArtifactFingerprint("sha256:abc"))
    assertEqual(interaction.destination, ConversationKey("chat-7"))
    assertEqual(interaction.mode, DeliveryMode.AttachAndSend)
}
```

### Method — `markAttached`

```text
markAttached(
    evidence: AttachmentEvidence
) -> ExternalInteraction
```

#### Unit tests for this method

```text
test("attached_state_requires_evidence_for_the_frozen_artifact_and_destination") {
    // Arrange
    let interaction = externalInteraction(
        artifact: "sha256:abc",
        destination: "chat-7"
    )

    // Act / Assert
    assertThrows(AttachmentEvidenceMismatch.self) {
        interaction.markAttached(
            attachmentEvidence(artifact: "sha256:other", destination: "chat-7")
        )
    }
}
```

### Method — `markSent`

```text
markSent(
    evidence: SendEvidence
) -> ExternalInteraction
```

#### Unit tests for this method

```text
test("sent_state_is_terminal_only_after_send_evidence_for_the_frozen_delivery_attempt") {
    // Arrange
    let attached = attachedExternalInteraction(
        artifact: "sha256:abc",
        destination: "chat-7"
    )

    // Act
    let sent = attached.markSent(
        sendEvidence(artifact: "sha256:abc", destination: "chat-7")
    )

    // Assert
    assertEqual(sent.state, Sent)
    assertEqual(sent.artifact, ArtifactFingerprint("sha256:abc"))
    assertEqual(sent.destination, ConversationKey("chat-7"))
}
```

### Method — `markFailedBeforeSend`

```text
markFailedBeforeSend(
    reason: DeliveryFailure
) -> ExternalInteraction
```

#### Unit tests for this method

```text
test("pre_send_failure_does_not_become_sent_or_unknown_after_send") {
    // Arrange
    let interaction = externalInteraction(mode: .attachAndSend)

    // Act
    let failed = interaction.markFailedBeforeSend(.attachmentRejected)

    // Assert
    assertEqual(failed.state, FailedBeforeSend)
}
```

### Method — `markUnknownAfterSend`

```text
markUnknownAfterSend(
    evidence: SendAttemptEvidence
) -> ExternalInteraction
```

#### Unit tests for this method

```text
test("unknown_after_send_remains_distinct_from_confirmed_sent") {
    // Arrange
    let interaction = externalInteraction(mode: .attachAndSend)

    // Act
    let unknown = interaction.markUnknownAfterSend(sendAttemptEvidence())

    // Assert
    assertEqual(unknown.state, UnknownAfterSend)
    assertNotEqual(unknown.state, Sent)
}
```

### Method — `markCancelledBeforePossibleSend`

```text
markCancelledBeforePossibleSend() -> ExternalInteraction
```

#### Unit tests for this method

```text
test("terminal_interaction_states_cannot_be_rewritten_for_the_same_interaction_identity") {
    let failed = externalInteraction().markFailedBeforeSend(.browserUnavailable)
    assertThrows(InvalidInteractionTransition.self) { failed.markCancelledBeforePossibleSend() }

    let unknown = attachedExternalInteraction().markUnknownAfterSend(sendAttemptEvidence())
    assertThrows(InvalidInteractionTransition.self) { unknown.markCancelledBeforePossibleSend() }
    assertThrows(InvalidInteractionTransition.self) { unknown.markFailedBeforeSend(.lateFailure) }
}
```

```text
test("cancelling_after_confirmed_attachment_preserves_attachment_evidence_and_is_terminal") {
    let attached = attachedExternalInteraction()
    let evidence = attached.attachmentEvidence

    let cancelled = attached.markCancelledBeforePossibleSend()

    assertEqual(cancelled.state, Cancelled)
    assertEqual(cancelled.attachmentEvidence, evidence)
    assertThrows(InvalidInteractionTransition.self) { cancelled.markFailedBeforeSend(.lateFailure) }
}
```

```text
test("pre_send_cancellation_is_terminal_without_implying_attachment_or_send") {
    // Arrange
    let interaction = externalInteraction(mode: .attachAndSend)

    // Act
    let cancelled = interaction.markCancelledBeforePossibleSend()

    // Assert — terminal state
    assertEqual(cancelled.state, Cancelled)

    // Assert — no external success implied
    assertNil(cancelled.attachmentEvidence)
    assertNil(cancelled.sendEvidence)
}
```

## Future / Evolution planning

### FUTURE EXTENSION — richer browser reconciliation

Shared browser delivery may later gain stronger post-click reconciliation evidence.

Possible Domain impact:

```text
UnknownAfterSend
→ reconciled Sent
or
→ reconciled NotSent
```

Status: **FUTURE CANDIDATE**. Add transitions only if browser evidence can support them reliably; do not collapse uncertainty today.


---

# `RepositoryTarget`

Kind: **shared multi-field Value Object**

## Responsibility

Represent the complete semantic value `(repositoryIdentity, registeredPath)` and require local path revalidation before local operations.

It has no independent identity or lifecycle. Two `RepositoryTarget` values with equal repository identity and equal registered path are the same Domain value.

## High-level state / fields

```text
repositoryIdentity: RepositoryIdentity
registeredPath: RegisteredRepositoryPath
```

## Candidate semantic methods and local unit tests

### Method — `create`

```text
create(
    repositoryIdentity: RepositoryIdentity,
    registeredPath: RegisteredRepositoryPath
) -> RepositoryTarget
```

#### Unit tests for this method

```text
test("repository_target_keeps_repository_identity_separate_from_registered_local_path") {
    // Arrange / Act
    let target = RepositoryTarget.create(
        RepositoryIdentity("github:acme/repo"),
        RegisteredRepositoryPath("C:/repo")
    )

    // Assert
    assertEqual(target.repositoryIdentity, RepositoryIdentity("github:acme/repo"))
    assertEqual(target.registeredPath, RegisteredRepositoryPath("C:/repo"))
    assertEqual(
        target,
        RepositoryTarget(
            RepositoryIdentity("github:acme/repo"),
            RegisteredRepositoryPath("C:/repo")
        )
    )
}
```

### Method — `requireCurrentLocalPath`

```text
requireCurrentLocalPath(
    observedCanonicalPath: CanonicalPath
) -> bool
```

#### Unit tests for this method

```text
test("registered_repository_path_must_revalidate_to_the_same_canonical_location_before_local_use") {
    // Arrange
    let target = RepositoryTarget.create(
        RepositoryIdentity("github:acme/repo"),
        RegisteredRepositoryPath("C:/repo")
    )

    // Act
    let result = target.requireCurrentLocalPath(CanonicalPath("D:/other"))

    // Assert
    assertFalse(result.isValid)
}
```

## Future / Evolution planning

### FUTURE CANDIDATE — multiple registered worktrees/clones

No product behavior currently permits one `RepositoryTarget` value to silently choose among several registered local clones.

If future repository-target Evolution introduces multiple registered locations, selection/precedence must be explicit.

Status: **FUTURE CANDIDATE / NOT SELECTED**.


---

# Important Value Objects

These remain typed semantic values where the type protects meaning. A Value Object may be single-field or multi-field; field count is not a category rule. This is a high-level planning list, not a mandatory one-type-per-file rule.

```text
ChangeSetId
PackageId
ReviewId
IssueCommentId
InteractionId
PublicationAttemptId

RepositoryIdentity
RepositoryTarget
RepositoryTargetRef
RegisteredRepositoryPath
CanonicalPath

BranchName
CommitId
GitTreeId
RemoteBranchRef

IssueRef
IssueTitle
ActorIssueText
ManagedWorkIdentityText
CommentText

PackageOperation
PackagePath
FileBytes
FileDigest

WorkBranchEvidence
RepositoryWorkLifecycle
RecordedWorkBranchValidation

DiffArtifact
WorkspaceResultId
ReviewAuthority
ReviewDecision

ApplyExtent
ApplicationStage
ApplyProvenResult
PublicationEvidence
PublicationAttemptEvidence
PublicationAttemptOutcome

IntegrationAttempt
FinalIssueCommentAttempt
IntegrationEvidence
IntegrationAttemptEvidence
IssueCommentEvidence
IssueCommentAttemptEvidence
FinalizationEvidence
FinalizationState

SnapshotSource
SnapshotEntry
SnapshotInventory
SnapshotSourceEntryType
SnapshotExportState
CaptureFingerprint
ValidatedSnapshotOutputPath
ArtifactFingerprint

ConversationKey
DeliveryMode
InteractionState
AttachmentEvidence
SendEvidence
SendAttemptEvidence
DeliveryFailure
```

A typed ID/value may later be simplified only when the type provides no semantic protection. No blanket primitive-ID rule is selected.

# Not a Domain Aggregate yet

## `Inspect Current Change`

Canonical selected Evolution: `EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`.

No Aggregate is selected.

The target diagnostic needs exact Git-backed projection semantics, but the exact:

```text
from
to
projection identity
currentness rule
```

remain OPEN.

Current Aggregate Planning decision:

```text
Git/diff derivation
→ Slice / Shared implementation

semantic Current Change Aggregate
→ NOT SELECTED
```

Do not create a `CurrentChange` Aggregate merely to have a Domain class.

If the future diagnostic projection later acquires independent semantic state/lifecycle/invariants, reopen Aggregate Planning from the selected Feature behavior rather than promoting the read model mechanically.

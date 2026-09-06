# Replacement Package — Slice Discovery + Non-Persistent Slice Planning

Status: working implementation plan  
Persistence: **non-persistent by default**  
Semantic authority: Feature / Scenario owners, not this file

## Purpose

Show the complete candidate implementation path of each Feature from entry/UI to final Result.

```text
Feature Main path / BR-*
→ UI or entry adapter
→ simple application service
→ feature-local orchestration
→ Domain calls
→ Shared / infrastructure calls
→ cross-cutting behavior
→ result/presentation
```

This file may be retained temporarily because the current change is large and is used as a practical planning example. That retention is an explicit convenience, not a methodology rule.

Normal lifecycle:

```text
Feature behavior selected
→ Slice Discovery / Planning
→ implementation + integration proof
→ delete this working planning artifact
```

If later architecture/UI/shared-capability documentation deserves a durable owner, create/update that owner separately. Do not keep this Slice plan as a substitute for durable documentation.

## Test policy

This file contains **Feature integration tests only**.

Integration tests:

- call the application-service boundary;
- use real Domain objects where practical;
- use fake/in-memory process/network/browser boundaries;
- cover several Feature Steps in one test;
- assert Feature Result, external effects, recovery truth and forbidden effects;
- do not directly unit-test Domain methods.

Domain unit tests belong in the separate Aggregate Planning file.

## Application layer rule

Use simple application services, not command dispatch:

```text
service.semanticOperation(...)
```

No required `CommandBus`, dispatcher, mediator, `execute(command)` or `*Command` DTO.

Typed semantic IDs remain selected.

---

# `F-BLDR-START-REPOSITORY-WORK`

Status: **CURRENT/TARGET FEATURE**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Entry/UI adapter | `StartRepositoryWorkEntryAdapter` | converts ChatGPT/CLI/UI input into typed application-service arguments |
| Presentation | `StartRepositoryWorkResultPresenter` | renders exact Issue/branch/base/result or recoverable failure |
| Application service | `StartRepositoryWork` | owns end-to-end Feature orchestration |
| Domain | `RepositoryWork`, `WorkBranch` | fixed logical-work + recorded-branch semantics |
| Domain | `WorkIssue` | managed identity + actor prose semantic consistency |
| Shared Git | `GitRepositoryCapability` | resolve target revision; create/prove exact branch |
| Shared GitHub | `GitHubIssueCapability` | create/reconcile/read/update exact Issue |
| Cross-cutting | `ChangeSetIdGenerator` | one stable ID per intended Start Work |
| Cross-cutting | `ExternalEffectReconciler` | prevents blind duplicate branch/Issue creation |
| Cross-cutting | `OperationDiagnostics` | records exact attempted/proven external identities |

## Application-service entry

```text
StartRepositoryWork.start(
    repositoryIdentity: RepositoryIdentity,
    repositoryLocation: RepositoryLocation,
    targetBranch: BranchName,
    issueTitle: IssueTitle,
    actorIssueText: ActorIssueText
) -> StartRepositoryWorkResult
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Fix Start Work identity**<br>`BR-BLDR-START-FIX-IDENTITIES-BEFORE-CREATE` | `StartRepositoryWorkEntryAdapter.readInput()` → `OperationDiagnostics.begin("StartRepositoryWork")` → `GitRepositoryCapability.resolveCommit(targetBranch)` → `ChangeSetIdGenerator.next()` → `RepositoryWork.planNewRepositoryWork(...)` | Entry + cross-cutting + Shared Git + Domain |
| **2. Create/prove work branch**<br>`BR-BLDR-START-CREATE-ONE-WORK-BRANCH` | `GitRepositoryCapability.createOrProveBranch(workBranch, startBaseCommit)` → `RepositoryWork.confirmCreatedWorkBranch(...)`; uncertain → `ExternalEffectReconciler.reconcileBranch(...)` | Shared Git + Domain + cross-cutting |
| **3. Create/reconcile Work Issue**<br>`BR-BLDR-START-CREATE-ONE-WORK-ISSUE` | `GitHubIssueCapability.createOrReconcileWorkIssue(...)`; uncertain → reconcile same intended Issue, never generate new work identity | Shared GitHub + cross-cutting |
| **4. Establish Issue text**<br>`BR-BLDR-START-WRITE-MANAGED-WORK-IDENTITY`, `BR-BLDR-START-PRESERVE-ACTOR-PROSE` | `WorkIssue.fromConfirmedIssue(...)` → `GitHubIssueCapability.updateAndConfirmBody(...)` → reread exact managed block | Domain + Shared GitHub |
| **5. Complete Start Work**<br>`BR-BLDR-START-RETURN-ONLY-PROVEN-WORK`, `BR-BLDR-START-USE-RECORDED-WORK-BRANCH`, `BR-BLDR-START-ONE-RECORDED-WORK-BRANCH` | `RepositoryWork.attachConfirmedWorkIssue(...)` → `OperationDiagnostics.complete(...)` → `StartRepositoryWorkResultPresenter.present(...)` | Domain + cross-cutting + application result |

## Feature integration tests

```text
test("successful_start_work_returns_one_exact_issue_and_one_exact_branch_from_the_fixed_base") {
    // Arrange
    let git = FakeGit(targetTip: ["main": "1111"])
    let github = FakeGitHub()
    let service = startWorkService(git, github, fixedChangeSetId: "cs-001")

    // Act
    let result = service.start(
        RepositoryIdentity("github:acme/repo"),
        RepositoryLocation("/repo"),
        BranchName("main"),
        IssueTitle("Implement X"),
        ActorIssueText("Goal and acceptance chosen by actor")
    )

    // Assert — Feature Result identity
    assertEqual(result.changeSetId, ChangeSetId("cs-001"))
    assertEqual(result.startBaseCommit, CommitId("1111"))
    assertEqual(result.workBranch, BranchName("work/cs-001"))

    // Assert — Git side effect
    assertEqual(git.createdBranches, [("work/cs-001", "1111")])

    // Assert — Work Issue side effect / continuity
    assertEqual(github.createdIssues.count, 1)
    assertTrue(github.issue(result.issueRef).body.contains("cs-001"))
    assertTrue(github.issue(result.issueRef).body.contains("work/cs-001"))
}
```

```text
test("uncertain_issue_creation_is_reconciled_without_new_changeset_branch_or_second_issue") {
    // Arrange
    let git = FakeGit(targetTip: ["main": "1111"])
    let github = FakeGitHub(createIssue: .uncertainButCreated(number: 42))
    let service = startWorkService(git, github, fixedChangeSetId: "cs-001")

    // Act
    let result = service.start(
        RepositoryIdentity("github:acme/repo"),
        RepositoryLocation("/repo"),
        BranchName("main"),
        IssueTitle("Implement X"),
        ActorIssueText("Goal and acceptance chosen by actor")
    )

    // Assert — recovered Feature Result
    assertEqual(result.issueRef.number, 42)

    // Assert — no duplicated durable work identity/effects
    assertEqual(git.createdBranches.count, 1)
    assertEqual(github.createIssueCallCount, 1)
    assertEqual(service.generatedChangeSetIds, [ChangeSetId("cs-001")])

    // Assert — uncertainty reconciliation
    assertEqual(github.reconcileIssueCallCount, 1)
}
```

## Future / Evolution planning

- **FUTURE CANDIDATE — Retarget Repository Work:** may add explicit retarget UI/application-service flow and invalidation rules. **BLOCKED BY PRODUCT DEFINITION**; no current `setTargetBranch`.
- **FUTURE SUPPORT:** Edit Work Issue is a separate future Feature and reuses `WorkIssue`; Start Work should not absorb that behavior.

---

# `F-BLDR-BUILD-REPLACEMENT-PACKAGE`

Status: **CURRENT/TARGET FEATURE**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Entry adapter | `BuildReplacementPackageEntryAdapter` | obtains exact selected work + desired resulting files/deletions |
| Application service | `BuildReplacementPackage` | selects source, derives operations, validates/materializes package |
| Feature-local | `PackageOperationDeriver` | maps desired result vs exact source to add/replace/delete operations |
| Feature-local | `PackageBuildContextFactory` | fixes work/source/package-build context |
| Domain | `RepositoryWork` | logical-work / expected-source continuity |
| Domain | `ReplacementPackage`, `PackageOperation` | package semantic consistency |
| Shared Git | `GitRepositoryCapability` | exact source bytes/readable commit state |
| Shared archive | `PackageArchiveCapability` | write/read/validate ZIP representation |
| Shared filesystem | `PackageOutputCapability` | unique safe package output path |
| Cross-cutting | `PackageIdGenerator` | new ID for every ZIP |
| Cross-cutting | `OperationDiagnostics` | validation/source failure diagnostics |

## Application-service entry

```text
BuildReplacementPackage.build(
    work: RepositoryWork,
    desiredResult: DesiredRepositoryResult
) -> BuiltReplacementPackage
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Select exact work/source**<br>`BR-BLDR-BUILD-CHANGESET-CONTINUITY`, `BR-BLDR-BUILD-FIX-EXPECTED-SOURCE`, `BR-BLDR-BUILD-PREAPPROVAL-SOURCE-CONTINUITY`, `BR-BLDR-BUILD-APPROVABLE-PACKAGE-IS-FROZEN` | `BuildReplacementPackageEntryAdapter.readSelection()` → `OperationDiagnostics.begin("BuildReplacementPackage")` → `PackageBuildContextFactory.create(work, desiredResult)` → read fixed expected source; APPROVABLE state blocks same-work new package where selected | Entry + cross-cutting + application service + Domain |
| **2. Derive operations**<br>`BR-BLDR-BUILD-PACKAGE-CONTENT-CONSISTENCY`, `BR-BLDR-BUILD-EXACT-BASE-CONTENT`, `BR-BLDR-BUILD-COMPLETE-REPLACEMENT-BYTES` | `GitRepositoryCapability.readFileBytes(expectedSource, path)` → `PackageOperationDeriver.derive(...)` → `PackageOperation.add/replace/delete(...)` | Shared Git + feature-local + Domain |
| **3. Construct package model**<br>`BR-BLDR-BUILD-NEW-PACKAGE-ID`, package consistency | `PackageIdGenerator.next()` → `ReplacementPackage.createValidatedPackage(...)` | Cross-cutting + Domain |
| **4. Materialize/validate ZIP**<br>`BR-BLDR-BUILD-ORDERED-SOURCE-AND-MATERIALIZATION` | `PackageOutputCapability.reserveUniqueOutput(packageId)` → `PackageArchiveCapability.write(...)` → `PackageArchiveCapability.readAndValidate(...)` → `OperationDiagnostics.complete(...)` → return exact `BuiltReplacementPackage` | Shared output/archive + cross-cutting + application service |

## Feature integration tests

```text
test("one_build_produces_a_new_valid_zip_with_exact_base_and_complete_replacement_bytes") {
    // Arrange
    let work = openWork(changeSetId: "cs-001", expectedSource: "1111")
    let source = FakeGit(filesAt: ["1111": ["a.txt": "old\n"]])
    let archive = InMemoryPackageArchive()
    let service = buildPackageService(source, archive, packageIds: ["pkg-001"])

    // Act
    let result = service.build(
        work,
        desiredRepositoryResult(replace: ["a.txt": "new\n"])
    )

    // Assert — package identity/source
    assertEqual(result.packageId, PackageId("pkg-001"))
    assertEqual(result.expectedSource, CommitId("1111"))

    // Assert — exact package payload
    assertEqual(archive.package(result.packageId).base("a.txt"), FileBytes("old\n"))
    assertEqual(archive.package(result.packageId).replacement("a.txt"), FileBytes("new\n"))

    // Assert — materialized package validity
    assertTrue(archive.package(result.packageId).isValid)
}
```

```text
test("preapproval_correction_keeps_work_and_source_but_materializes_a_new_package_identity") {
    // Arrange
    let work = openWork(changeSetId: "cs-001", expectedSource: "1111")
    let service = buildPackageService(
        FakeGit(filesAt: ["1111": ["a.txt": "old\n"]]),
        InMemoryPackageArchive(),
        packageIds: ["pkg-001", "pkg-002"]
    )

    // Act
    let first = service.build(work, desiredRepositoryResult("candidate-A"))
    let corrected = service.build(work, desiredRepositoryResult("candidate-B"))

    // Assert — logical-work/source continuity
    assertEqual(first.changeSetId, corrected.changeSetId)
    assertEqual(first.expectedSource, corrected.expectedSource)

    // Assert — new materialized artifact identity
    assertNotEqual(first.packageId, corrected.packageId)
}
```

## Future / Evolution planning

- **FUTURE / OPEN:** persistence/owner of `APPROVABLE` that closes same-work package production is not selected. Slice planning may depend on an approval source, but must not invent a command/status store.
- **FUTURE CANDIDATE:** richer package operations require explicit protocol/Feature Evolution; current Slice remains add/replace/delete.

---

# `F-BLDR-APPLY-PACKAGE-FOR-REVIEW`

Status: **CURRENT/TARGET FEATURE**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Entry/presentation | `PackageReviewEntryAdapter`, `PackageReviewResultPresenter` | starts review and exposes predicted tree/diffs/workspace |
| Application service | `ApplyPackageForReview` | full reconstruction orchestration |
| Feature-local | `ReviewArtifactAssembler` | derives latest/cumulative/full-result identities |
| Domain | `RepositoryWork` | Start Work base / recorded branch continuity |
| Domain | `ReplacementPackage` | exact reviewed package/source semantics |
| Domain | `PackageReview` | coherent immutable review-result identity |
| Shared workspace | `ReviewWorkspaceCapability` | isolated temporary worktree at exact source |
| Shared apply | `ReplacementPackageApplyCapability` | same exact package semantics used by consumer |
| Shared Git | `GitRepositoryCapability` | predicted tree + exact diff endpoints |
| Shared filesystem | `ReviewWorkspaceCleanup` | cleanup without touching recorded work branch |
| Cross-cutting | `OperationDiagnostics` | reconstruction failure evidence |

## Application-service entry

```text
ApplyPackageForReview.review(
    work: RepositoryWork,
    package: ReplacementPackage
) -> PackageReview
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Create isolated review state**<br>`BR-BLDR-REVIEW-ORDERED-RECONSTRUCTION`, `BR-BLDR-REVIEW-DOES-NOT-MUTATE-WORK-BRANCH` | `PackageReviewEntryAdapter.readSelection()` → `OperationDiagnostics.begin("ApplyPackageForReview")` → `ReviewWorkspaceCapability.createIsolatedAt(package.expectedSource)`; capture recorded branch tip for non-mutation proof | Entry + cross-cutting + Shared workspace |
| **2. Apply exact package**<br>`BR-BLDR-REVIEW-SAME-PACKAGE-SEMANTICS-AS-CONSUMER-APPLY` | `ReplacementPackageApplyCapability.verifyApplicability(...)` → `.apply(...)` | Shared package semantics |
| **3. Derive predicted result**<br>`BR-BLDR-REVIEW-LATEST-DIFF`, `BR-BLDR-REVIEW-CUMULATIVE-DIFF`, `BR-BLDR-REVIEW-FULL-RESULT` | `GitRepositoryCapability.identifyTree(...)` → `ReviewArtifactAssembler.assemble(expectedSource, startBase, predictedTree, workspace)` | Shared Git + feature-local |
| **4. Freeze review**<br>`BR-BLDR-REVIEW-ONE-RECONSTRUCTION`, `BR-BLDR-REVIEW-RESULT-IDENTITY-IS-IMMUTABLE` | `PackageReview.createValidatedReview(...)` → `PackageReviewResultPresenter.present(review, workspace)` → `OperationDiagnostics.complete(...)`; keep review workspace available while the Review Result is being inspected | Domain + presentation + cross-cutting |
| **Review Result lifetime / disposal** | after Scenario/actor finishes inspecting the exact Review Result → `ReviewWorkspaceCleanup.cleanup(workspace)`; cleanup is not allowed to change recorded work branch or historical `PackageReview` identity | Shared cleanup; post-result lifetime |

## Feature integration tests

```text
test("review_reconstructs_one_exact_predicted_tree_and_both_diffs_without_moving_the_work_branch") {
    // Arrange
    let work = activeWork(startBase: "0000", workBranch: "work/cs-1", branchTip: "1111")
    let package = package(packageId: "pkg-1", expectedSource: "1111", replace: ["a.txt": ("old", "new")])
    let git = FakeGit(branchTips: ["work/cs-1": "1111"])
    let service = reviewPackageService(git, realPackageApplySemantics())

    // Act
    let review = service.review(work, package)

    // Assert — review source identity
    assertEqual(review.expectedSource, CommitId("1111"))

    // Assert — exact diff endpoints
    assertEqual(review.latestDiff.from, CommitId("1111"))
    assertEqual(review.cumulativeDiff.from, CommitId("0000"))

    // Assert — one coherent predicted result
    assertEqual(review.latestDiff.toTree, review.predictedTree)
    assertEqual(review.cumulativeDiff.toTree, review.predictedTree)
    assertEqual(review.fullResult.tree, review.predictedTree)

    // Assert — full Review Result remains inspectable
    assertTrue(review.fullResult.isAvailableForInspection)

    // Assert — no durable work-branch mutation
    assertEqual(git.branchTip("work/cs-1"), CommitId("1111"))
}
```

```text
test("fresh_review_of_the_same_package_uses_the_same_apply_semantics_as_consumer_apply") {
    // Arrange
    let package = validReplacementPackage(
        packageId: "pkg-1",
        changeSetId: "cs-1",
        expectedSource: "1111",
        replace: ["a.txt": ("old", "new")]
    )
    let reviewSource = exactWorkspaceAt(package.expectedSource)
    let consumerSource = exactWorkspaceAt(package.expectedSource)

    // Act
    let review = reviewService.review(
        activeWork(
            changeSetId: "cs-1",
            startBase: "0000",
            workBranch: "work/cs-1"
        ),
        package
    )
    let consumerAppliedTree = packageApply.apply(package, consumerSource).tree

    // Assert
    assertEqual(review.predictedTree, consumerAppliedTree)
}
```

## Future / Evolution planning

- **FUTURE / OPEN:** persisted `APPROVABLE` / `NEEDS_CORRECTION` may later extend the review Slice, but semantic decision currently remains Scenario/actor-owned.
- **FUTURE EXTENSION:** renewed review authority for a changed published tree will require a selected producer/review flow before Finalize can consume it.

---

# `F-BLDR-ADD-ISSUE-REVIEW-COMMENT`

Status: **CURRENT/TARGET FEATURE**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Entry adapter | `AddReviewCommentEntryAdapter` | receives already-selected exact comment text |
| Application service | `AddIssueReviewComment` | verify → write → confirm |
| Domain | `RepositoryWork` | expected work identity |
| Domain | `WorkIssue`, `IssueComment` | exact Issue / confirmed comment semantics |
| Shared GitHub | `GitHubIssueCapability` | read, append, reconcile, reread |
| Cross-cutting | `ExternalEffectReconciler` | prevents duplicate comment on uncertain response |
| Presentation | `IssueCommentResultPresenter` | confirmed comment vs mismatch/uncertainty |

## Application-service entry

```text
AddIssueReviewComment.addComment(
    work: RepositoryWork,
    issue: WorkIssue,
    text: CommentText
) -> ConfirmedIssueComment
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Verify Issue**<br>`BR-BLDR-ADD-COMMENT-EXACT-ISSUE` | `AddReviewCommentEntryAdapter.readText()` → `GitHubIssueCapability.readIssue(issueRef)` → `WorkIssue.requireManagedWorkIdentity(...)` | Entry + Shared GitHub + Domain |
| **2. Append exact text**<br>`BR-BLDR-ADD-COMMENT-EXACT-TEXT`, `BR-BLDR-ADD-COMMENT-DOES-NOT-EDIT-BODY` | `GitHubIssueCapability.appendComment(issueRef, text)` | Shared GitHub |
| **3. Confirm write**<br>`BR-BLDR-ADD-COMMENT-VERIFY-CREATED-COMMENT`, `BR-BLDR-ADD-COMMENT-ORDERED-WRITE` | uncertain → `ExternalEffectReconciler.reconcileCommentWrite(...)`; confirmed → `GitHubIssueCapability.readComment(...)` → `WorkIssue.recordConfirmedComment(...)` → `IssueCommentResultPresenter.present(...)` | cross-cutting + Shared GitHub + Domain + presentation |

## Feature integration tests

```text
test("exact_review_comment_is_added_only_to_the_matching_work_issue_and_issue_body_is_unchanged") {
    // Arrange
    let issue = workIssue(number: 42, changeSetId: "cs-1", workBranch: "work/cs-1", body: "managed + actor")
    let github = FakeGitHub(issue)
    let service = addCommentService(github)

    // Act
    let result = service.addComment(
        activeWork(changeSetId: "cs-1", workBranch: "work/cs-1"),
        issue,
        CommentText("Missing deletion in pkg-7")
    )

    // Assert — confirmed comment Result
    assertEqual(result.issueRef.number, 42)
    assertEqual(result.body, CommentText("Missing deletion in pkg-7"))

    // Assert — Issue history mutation only
    assertEqual(github.issue(42).comments.count, 1)

    // Assert — forbidden Issue-body mutation absent
    assertEqual(github.issue(42).body, "managed + actor")
}
```

```text
test("uncertain_comment_write_is_reconciled_before_any_second_append") {
    // Arrange
    let github = FakeGitHub(append: .uncertainButCreated(commentId: 7001))
    let service = addCommentService(github)

    // Act
    let result = service.addComment(
        activeWork(changeSetId: "cs-1", workBranch: "work/cs-1"),
        workIssue(number: 42, changeSetId: "cs-1", workBranch: "work/cs-1"),
        CommentText("finding")
    )

    // Assert — confirmed reconciled Result
    assertEqual(result.commentId, IssueCommentId(7001))

    // Assert — no duplicate external append
    assertEqual(github.appendCommentCallCount, 1)

    // Assert — reconciliation was used
    assertEqual(github.reconcileCommentCallCount, 1)
}
```

## Future / Evolution planning

- **FUTURE FEATURE:** `F-BLDR-EDIT-WORK-ISSUE` changes durable actor prose; review comment remains append-only history and must not absorb edit semantics.

---

# `F-BLDR-EDIT-WORK-ISSUE`

Status: **FUTURE FEATURE — Introduction**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Entry/UI adapter | `EditWorkIssueEntryAdapter` | obtains replacement actor prose |
| Application service | `EditWorkIssue` | read → verify → replace actor prose → update → confirm |
| Domain | `WorkIssue` | protects managed identity while actor prose changes |
| Shared GitHub | `GitHubIssueCapability` | read/update/reread exact Issue |
| Feature-local | `IssueBodyRenderer` | renders actor + managed portions once exact representation is selected |
| Cross-cutting | `ExternalEffectReconciler` | reconcile uncertain Issue body update |
| Presentation | `WorkIssueEditResultPresenter` | confirmed edit / identity conflict |

## Application-service entry

```text
EditWorkIssue.edit(
    issue: WorkIssue,
    expectedChangeSetId: ChangeSetId,
    expectedWorkBranch: BranchName,
    newActorText: ActorIssueText
) -> ConfirmedWorkIssueEdit
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Verify exact Issue/protected identity**<br>`BR-BLDR-EDIT-ISSUE-EXACT-WORK`, `BR-BLDR-EDIT-ISSUE-PRESERVE-WORK-IDENTITY` | `EditWorkIssueEntryAdapter.readEdit()` → `GitHubIssueCapability.readIssue(...)` → `WorkIssue.requireManagedWorkIdentity(...)` | Entry + Shared GitHub + Domain |
| **2. Replace actor prose only**<br>`BR-BLDR-EDIT-ISSUE-PRESERVE-WORK-IDENTITY`, `BR-BLDR-EDIT-ISSUE-NO-HISTORY-CONFLATION` | `WorkIssue.replaceActorIssueText(...)` → `IssueBodyRenderer.render(...)` → `GitHubIssueCapability.updateIssueBody(...)` | Domain + feature-local + Shared GitHub |
| **3. Reread/prove result**<br>`BR-BLDR-EDIT-ISSUE-VERIFY-RESULT`, `BR-BLDR-EDIT-ISSUE-ORDERED-UPDATE` | uncertain update → `ExternalEffectReconciler.reconcileIssueBodyWrite(...)`; reread → `WorkIssue.verifyConfirmedActorText(...)` → `WorkIssueEditResultPresenter.present(...)` | cross-cutting + Shared GitHub + Domain + presentation |

## Feature integration tests

```text
test("editing_actor_prose_changes_only_actor_text_and_preserves_work_identity_and_history") {
    // Arrange
    let issue = workIssue(
        number: 42,
        changeSetId: "cs-1",
        workBranch: "work/cs-1",
        target: "main",
        base: "1111",
        actorText: "old",
        comments: ["history"]
    )
    let github = FakeGitHub(issue)
    let service = editWorkIssueService(github)

    // Act
    let result = service.edit(
        issue,
        ChangeSetId("cs-1"),
        BranchName("work/cs-1"),
        ActorIssueText("new")
    )

    // Assert — intended edit Result
    assertEqual(result.actorText, ActorIssueText("new"))

    // Assert — protected work identity
    assertEqual(result.managedIdentity, issue.managedIdentity)

    // Assert — history preservation
    assertEqual(github.issue(42).comments, issue.comments)
}
```

```text
test("mismatching_work_identity_blocks_issue_edit_before_external_write") {
    // Arrange
    let github = FakeGitHub(workIssue(changeSetId: "cs-1", workBranch: "work/cs-1"))
    let service = editWorkIssueService(github)

    // Act
    let result = service.edit(
        github.issue(42),
        ChangeSetId("cs-1"),
        BranchName("work/other"),
        ActorIssueText("new")
    )

    // Assert — Feature rejection
    assertTrue(result.isRejected)

    // Assert — no forbidden external mutation
    assertEqual(github.updateIssueCallCount, 0)
}
```

## Future / Evolution planning

Canonical planned Evolution: `EVO-BLDR-EDIT-DURABLE-WORK-ISSUE`.

- This entire Feature is **FUTURE — Introduction**.
- Exact Markdown/body representation separating actor text and managed identity remains **BLOCKED BY OPEN PRODUCT DETAIL**.
- **FUTURE CANDIDATE — Retarget Work:** changing target branch is intentionally not part of Edit Work Issue.

---

# `F-RPKG-APPLY-REPLACEMENT-PACKAGE`

Status: **CURRENT/TARGET FEATURE**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Swing UI | `ApplyPackageAction` | collects/starts Apply from selected package/handoff |
| UI model | `ApplyPackageFormModel` | validated selected repository/package/extent values |
| Presenter | `ApplyResultPresenter` | truthful Applied/Committed/Published/uncertain UI result |
| Entry adapters | `ApplyHandoffAdapter`, `ApplyUriAdapter`, `ManualApplyAdapter` | different transports to the same semantic service call |
| Application service | `ApplyReplacementPackage` | full Apply/Commit/Publish orchestration |
| Feature-local | `ApplyInvocationValidator` | cross-owner exact invocation checks |
| Domain | `RepositoryWork`, `ReplacementPackage` | exact work/package semantic input |
| Domain | `PackageApplication`, `PackageReview` | durable/proven execution state + reviewed-tree comparison |
| Persistence | `RepositoryWorkRepository`, `PackageApplicationRepository`, `PackageReviewRepository` | load/save semantic state |
| Shared package | `ReplacementPackageApplyCapability` | verify/apply exact file semantics |
| Shared Git | `GitWorkspaceCapability`, `GitPublicationCapability` | workspace source, commit exact paths, push/reconcile |
| Shared archive | `PackageArchiveReader` | exact package bytes/manifest resolution |
| Cross-cutting | `RepositoryOperationLock` | serialize mutation for one Repository Target/work |
| Cross-cutting | `CancellationToken` | cooperative pre-side-effect cancellation |
| Cross-cutting | `OperationDiagnostics` | exact stage/evidence/error output |
| Cross-cutting | `ExternalEffectReconciler` | push uncertainty handling |

## Application-service entry

```text
ApplyReplacementPackage.apply(
    repositoryIdentity: RepositoryIdentity,
    changeSetId: ChangeSetId,
    issueRef: IssueRef,
    workBranch: BranchName,
    targetBranch: BranchName,
    package: ReplacementPackage,
    requestedExtent: ApplyExtent,
    review: Optional<PackageReview>
) -> ApplyReplacementPackageResult
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Verify invocation/applicability**<br>`BR-RPKG-APPLY-EXACT-INVOCATION`, `BR-RPKG-APPLY-EXPECTED-SOURCE-AND-APPLICABILITY` | `ApplyPackageAction.onInvoked()` → `ApplyPackageFormModel.validate()` → `ApplyHandoffAdapter.toSemanticInput()` / `ApplyUriAdapter.toSemanticInput()` / `ManualApplyAdapter.toSemanticInput()` → `PackageArchiveReader.readAndValidate(...)` → `RepositoryOperationLock.acquire(repositoryIdentity)` → `OperationDiagnostics.begin("ApplyReplacementPackage")` → `CancellationToken.throwIfCancellationRequested()` → `RepositoryWorkRepository.load(changeSetId)` + (`PackageApplicationRepository.load(changeSetId, packageId)` or `PackageApplication.begin(...)`) + optional `PackageReviewRepository.load(...)` → `RepositoryWork.requireRecordedWorkBranch(workBranch)` → `ApplyInvocationValidator.verify(repositoryWork, issueRef, package, expectedSource, ...)` → `ReplacementPackageApplyCapability.verifyApplicability(...)` | UI/entry + Shared archive + cross-cutting + persistence + Domain + application + Shared package |
| **2. Apply files**<br>`BR-RPKG-APPLY-ORDERED-STAGES`, requested extent | `CancellationToken.throwIfCancellationRequested()` → `ReplacementPackageApplyCapability.apply(...)` → `PackageApplication.markApplied(appliedTree)` → `PackageApplicationRepository.save(application)` | cross-cutting + Shared package + Domain + persistence |
| **Decision: Commit?** | `ApplyExtent.requiresCommit()`; no → presenter returns Applied; yes → Step 3 | Value Object + presentation |
| **3. Commit exact work**<br>`BR-RPKG-APPLY-COMMIT-CONTAINS-ONLY-INTENDED-WORK`, ordered stages | `GitWorkspaceCapability.commitExactPaths(package.paths)` → `PackageApplication.markCommitted(commitId, committedTree)` → `PackageApplicationRepository.save(application)` | Shared Git + Domain + persistence |
| **Decision: Publish?** | `ApplyExtent.requiresPublish()`; no → presenter returns Applied+Committed; yes → Step 4 | Value Object + presentation |
| **4. Publish/reconcile**<br>`BR-RPKG-APPLY-PUBLISHED-REMOTE-TIP`, `BR-RPKG-APPLY-PUBLICATION-UNCERTAINTY` | `GitPublicationCapability.pushExactTip(workBranch, commitId)`; uncertain → `PackageApplication.markPublicationUncertain(...)` → `PackageApplicationRepository.save(...)` → `ExternalEffectReconciler.reconcilePublication(...)` / `GitPublicationCapability.reconcilePublication(...)`; proven → `PackageApplication.markPublished(...)` → save | Shared Git + cross-cutting + Domain + persistence |
| **5. Reviewed path verification**<br>`BR-RPKG-APPLY-PUBLISHED-TREE-EQUALS-REVIEWED-TREE` | optional `PackageReviewRepository.load(...)` → `ApplyInvocationValidator.requireReviewedPublishedTree(application, review)` → record diagnostics for exact compared tree identities | persistence + application cross-owner check + diagnostics |
| **6. Return/resume**<br>`BR-RPKG-APPLY-LAST-PROVEN-RESULT`, `BR-RPKG-APPLY-RESUME-WITHOUT-REPEATING-PROVEN-STAGES`, `BR-RPKG-APPLY-REQUESTED-EXTENT` | `PackageApplication.currentProvenResult()` → skip already-proven stages → `OperationDiagnostics.complete(...)` → `ApplyResultPresenter.present(...)` → `RepositoryOperationLock.release(...)` | Domain + application + cross-cutting + UI |

## Feature integration tests

```text
test("apply_only_mutates_files_and_returns_applied_without_commit_or_publish") {
    // Arrange
    let env = applyFeatureEnvironment(sourceCommit: "1111", package: validPackage("pkg-1"))
    let service = env.service

    // Act
    let result = service.apply(
        RepositoryIdentity("github:acme/repo"),
        ChangeSetId("cs-1"),
        issueRef(42),
        BranchName("work/cs-1"),
        BranchName("main"),
        env.package,
        ApplyExtent.Apply,
        nil
    )

    // Assert — Feature Result
    assertEqual(result.state, Applied)

    // Assert — applied workspace
    assertEqual(env.workspace.tree, env.package.expectedAppliedTree)

    // Assert — requested extent stops later effects
    assertEqual(env.git.commitCallCount, 0)
    assertEqual(env.git.pushCallCount, 0)
}
```

```text
test("apply_commit_publish_returns_published_only_after_exact_remote_tip_is_proven") {
    // Arrange
    let env = applyFeatureEnvironment(sourceCommit: "1111", package: validPackage("pkg-1"))

    // Act
    let result = env.service.apply(
        RepositoryIdentity("github:acme/repo"),
        ChangeSetId("cs-1"),
        issueRef(42),
        BranchName("work/cs-1"),
        BranchName("main"),
        env.package,
        ApplyExtent.ApplyCommitPublish,
        nil
    )

    // Assert — Feature Result
    assertEqual(result.state, Published)

    // Assert — proven remote publication identity
    assertEqual(env.git.remoteTip("work/cs-1"), result.commitId)
    assertEqual(env.git.remoteTree("work/cs-1"), result.publishedTree)

    // Assert — ordered external realization
    assertEqual(env.events, ["apply", "commit", "push", "prove-remote"])
}
```

```text
test("uncertain_publish_is_returned_truthfully_and_retry_resumes_at_publication_without_reapplying_or_recommitting") {
    // Arrange
    let env = applyFeatureEnvironment(pushResult: .uncertain)
    let first = env.service.apply(
        RepositoryIdentity("github:acme/repo"),
        ChangeSetId("cs-1"),
        issueRef(42),
        BranchName("work/cs-1"),
        BranchName("main"),
        env.package,
        ApplyExtent.ApplyCommitPublish,
        nil
    )

    // Act
    env.git.reconcileResult = .confirmedPublished
    let second = env.service.apply(
        RepositoryIdentity("github:acme/repo"),
        ChangeSetId("cs-1"),
        issueRef(42),
        BranchName("work/cs-1"),
        BranchName("main"),
        env.package,
        ApplyExtent.ApplyCommitPublish,
        nil
    )

    // Assert — truthful partial then terminal Result
    assertEqual(first.state, PublicationUncertain)
    assertEqual(second.state, Published)

    // Assert — proven earlier stages are not repeated
    assertEqual(env.packageApply.applyCallCount, 1)
    assertEqual(env.git.commitCallCount, 1)
    assertEqual(env.git.pushCallCount, 1)

    // Assert — uncertain effect is reconciled
    assertTrue(env.git.reconcileCallCount >= 1)
}
```

```text
test("reviewed_path_rejects_published_result_whose_tree_differs_from_builder_review") {
    // Arrange
    let env = applyFeatureEnvironment(publishedTree: "tree-B")
    let review = packageReview(predictedTree: "tree-A")

    // Act
    let result = env.service.apply(
        RepositoryIdentity("github:acme/repo"),
        ChangeSetId("cs-1"),
        issueRef(42),
        BranchName("work/cs-1"),
        BranchName("main"),
        env.package,
        ApplyExtent.ApplyCommitPublish,
        review
    )

    // Assert — Feature rejection
    assertTrue(result.isRejectedAsUnreviewedPublishedResult)

    // Assert — exact cause
    assertNotEqual(result.publishedTree, review.predictedTree)
}
```

## Future / Evolution planning

Canonical selected Evolution: `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`.

- **FUTURE EXTENSION — Confirm Reviewed Published Revision:** Step 5 becomes an explicit planned capability proving `publishedTree == reviewedTree` and correct execution identity. It remains part of Apply/continuation semantics, not a new command-dispatch workflow.
- **FUTURE / OPEN:** if approval attribution becomes durable, exact owner/state (`ReviewAuthority` or equivalent) must be selected before persistence is added.

### Future Feature integration test — reviewed-result confirmation

```text
test("future_reviewed_publication_is_confirmed_when_execution_identity_and_published_tree_equal_the_builder_review") {
    // Arrange
    let env = applyFeatureEnvironment(
        sourceCommit: "1111",
        publishedTree: "tree-A",
        package: validPackage("pkg-1")
    )
    let review = packageReview(
        changeSetId: "cs-1",
        packageId: "pkg-1",
        expectedSource: "1111",
        predictedTree: "tree-A"
    )

    // Act
    let result = env.service.apply(
        RepositoryIdentity("github:acme/repo"),
        ChangeSetId("cs-1"),
        issueRef(42),
        BranchName("work/cs-1"),
        BranchName("main"),
        env.package,
        ApplyExtent.ApplyCommitPublish,
        review
    )

    // Assert — exact reviewed publication
    assertEqual(result.publishedTree, review.predictedTree)
    assertEqual(result.packageId, review.packageId)
    assertEqual(result.expectedSource, review.expectedSource)

    // Assert — no second semantic-review requirement
    assertTrue(result.reviewedPublishedRevisionIsConfirmed)
}
```

---

# `F-RPKG-FINALIZE-REPOSITORY-WORK`

Status: **CURRENT/TARGET FEATURE + FUTURE integration extension**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Swing UI | `FinalizeWorkAction` | explicit user Finalize entry |
| UI model | `FinalizeWorkViewModel` | displays eligibility/current review authority/partial effect truth |
| Presenter | `FinalizeResultPresenter` | Finalized / blocked / partial / uncertain results |
| Application service | `FinalizeRepositoryWork` | eligibility + external-effect orchestration |
| Feature-local | `FinalizeEligibilityChecker` | exact work/result/target/review/Issue checks |
| Feature-local | `FinalizeEffectPlanner` | selected integration/comment order once product detail is chosen |
| Domain | `RepositoryWork`, `WorkIssue`, `PackageApplication` | input semantic owners |
| Value Object | `ReviewAuthority` | exact authority for the currently reviewed published tree |
| Domain | `WorkFinalization` | partial external-effect/recovery semantic state |
| Persistence | `RepositoryWorkRepository`, `WorkFinalizationRepository` | durable finalization progress |
| Shared integration | `IntegrationCapability` | integrate exact reviewed result into exact target |
| Shared GitHub | `GitHubIssueCapability` | final Issue comment/reconciliation |
| Cross-cutting | `RepositoryOperationLock` | serialize integration/finalization mutation |
| Cross-cutting | `ExternalEffectReconciler` | uncertain integration/comment reconciliation |
| Cross-cutting | `OperationDiagnostics` | exact proof/error output |

## Application-service entry

```text
FinalizeRepositoryWork.finalize(
    work: RepositoryWork,
    issue: WorkIssue,
    application: PackageApplication,
    reviewAuthority: ReviewAuthority,
    finalComment: Optional<CommentText>
) -> FinalizeRepositoryWorkResult
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Verify eligibility**<br>`BR-RPKG-FINALIZE-EXACT-WORK`, `BR-RPKG-FINALIZE-CURRENT-REVIEW-AUTHORITY` | `FinalizeWorkAction.onInvoked()` → `FinalizeWorkViewModel.readSelection()` → `RepositoryOperationLock.acquire(...)` → `OperationDiagnostics.begin("FinalizeRepositoryWork")` → `RepositoryWorkRepository.load(changeSetId)` + (`WorkFinalizationRepository.load(...)` or `WorkFinalization.begin(...)`) → `FinalizeEligibilityChecker.verify(work, application, reviewAuthority, issue)`; stale review → `FinalizeResultPresenter.presentBlocked(...)` before integration | UI + cross-cutting + persistence + application + Domain reads |
| **2. Perform first external effect**<br>`BR-RPKG-FINALIZE-ORDERING-IS-OPEN`, `BR-RPKG-FINALIZE-INTEGRATE-EXACT-RESULT`, `BR-RPKG-FINALIZE-FINAL-ISSUE-COMMUNICATION` | `FinalizeEffectPlanner.firstEffect()` → either `IntegrationCapability.integrateExactResult(...)` → `WorkFinalization.confirmIntegration(...)`, or `GitHubIssueCapability.appendFinalComment(...)` → `WorkFinalization.confirmFinalIssueComment(...)`; uncertain outcome → corresponding `mark*Uncertain(...)` before persistence | Feature-local + Shared + Domain |
| **3. Perform/reconcile remaining effect**<br>`BR-RPKG-FINALIZE-PRESERVE-PARTIAL-EXTERNAL-RESULTS` | `WorkFinalizationRepository.save(provenFirstEffect)` → uncertain effect uses `ExternalEffectReconciler.reconcileIntegration(...)` / `.reconcileFinalComment(...)` → resolution calls `WorkFinalization.confirmIntegration(...)` / `.confirmFinalIssueComment(...)` or preserves corresponding uncertain state → perform only missing effect → persist updated `WorkFinalization` | Domain + persistence + cross-cutting + Shared |
| **4. Complete**<br>`BR-RPKG-FINALIZE-MARK-FINALIZED-ONLY-AFTER-BOTH-PROVEN` | `WorkFinalization.complete()` → `RepositoryWork.markFinalized(...)` → `WorkFinalizationRepository.save(...)` + `RepositoryWorkRepository.save(...)` → `OperationDiagnostics.complete(...)` → `FinalizeResultPresenter.present(...)` → `RepositoryOperationLock.release(...)` | Domain + persistence + cross-cutting + UI |
| **Future extension: Ensure Integration PR** | `IntegrationCapability` may later be refined to PR-specific adapter/classes only after PR mechanism is selected | FUTURE / BLOCKED BY OPEN PRODUCT DETAIL |

## Feature integration tests

```text
test("finalize_is_blocked_before_any_external_effect_when_review_authority_is_stale") {
    // Arrange
    let env = finalizeFeatureEnvironment(
        publishedTree: "tree-B",
        reviewAuthorityTree: "tree-A"
    )

    // Act
    let result = env.service.finalize(
        env.work,
        env.issue,
        env.application,
        env.reviewAuthority,
        CommentText("Finalized exact reviewed result")
    )

    // Assert — eligibility Result
    assertTrue(result.isBlockedByStaleReview)

    // Assert — no forbidden integration/comment effects
    assertEqual(env.integration.callCount, 0)
    assertEqual(env.github.appendCommentCallCount, 0)
}
```

```text
test("finalize_returns_finalized_only_after_exact_integration_and_final_issue_comment_are_both_proven") {
    // Arrange
    let env = finalizeFeatureEnvironment(
        publishedTip: "aaaa",
        publishedTree: "tree-A",
        reviewAuthorityTree: "tree-A"
    )

    // Act
    let result = env.service.finalize(
        env.work,
        env.issue,
        env.application,
        env.reviewAuthority,
        CommentText("Finalized exact reviewed result")
    )

    // Assert — terminal Feature Result
    assertEqual(result.state, Finalized)

    // Assert — exact integration proof
    assertTrue(env.integration.provedExactSourceTip("aaaa"))
    assertTrue(env.integration.provedExactTarget("main"))

    // Assert — final Issue communication proof
    assertTrue(env.github.hasConfirmedFinalComment(issue: 42))

    // Assert — durable Repository Work lifecycle
    assertTrue(env.repositoryWorkRepository.load("cs-1").isFinalized)
}
```

```text
test("retry_after_one_proven_finalize_effect_performs_only_the_missing_effect") {
    // Arrange
    let env = finalizeFeatureEnvironment(existingState: .integrationConfirmed)
    env.github.firstCommentResult = .failure

    // Act
    let first = env.service.finalize(
        env.work,
        env.issue,
        env.application,
        env.reviewAuthority,
        CommentText("Finalized exact reviewed result")
    )
    env.github.nextCommentResult = .confirmed
    let second = env.service.finalize(
        env.work,
        env.issue,
        env.application,
        env.reviewAuthority,
        CommentText("Finalized exact reviewed result")
    )

    // Assert — first proven effect is preserved
    assertTrue(first.integrationRemainsProven)
    assertEqual(env.integration.callCount, 0)

    // Assert — missing effect is retried
    assertEqual(env.github.appendCommentCallCount, 2)

    // Assert — terminal completion after missing proof
    assertEqual(second.state, Finalized)
}
```

## Future / Evolution planning

Canonical selected Evolution: `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`.

- **SELECTED FUTURE PRESSURE — Ensure Integration PR:** the Evolution target says the reviewed-result workflow eventually establishes one correct/current integration PR.
- The current `F-RPKG-FINALIZE-REPOSITORY-WORK` owner still leaves the exact integration mechanism and PR mechanics OPEN.
- Therefore the implementable Slice boundary remains mechanism-neutral:

```text
IntegrationCapability.integrateExactResult(
    sourceTip: CommitId,
    sourceTree: GitTreeId,
    targetBranch: BranchName
) -> IntegrationAttemptEvidence
```

- PR-specific classes, methods, persistence identity, update-vs-recreate policy, merge mechanics and PR-specific tests are **BLOCKED BY OPEN PRODUCT DETAIL** until the Feature/Evolution owner selects those exact semantics.
- **FUTURE EXTENSION:** renewed review authority after post-review work-tree change must be supplied by a selected upstream flow; Finalize must continue to fail closed meanwhile.

### Future integration-boundary test

```text
test("future_integration_uses_the_exact_reviewed_published_result_and_exact_target_without_assuming_transport") {
    // Arrange
    let env = finalizeFeatureEnvironment(
        publishedTip: "aaaa",
        publishedTree: "tree-A",
        reviewAuthorityTree: "tree-A"
    )

    // Act
    let result = env.service.finalize(
        env.work,
        env.issue,
        env.application,
        env.reviewAuthority,
        CommentText("Finalized exact reviewed result")
    )

    // Assert — selected semantic boundary
    assertEqual(env.integration.lastSourceTip, CommitId("aaaa"))
    assertEqual(env.integration.lastSourceTree, GitTreeId("tree-A"))
    assertEqual(env.integration.lastTargetBranch, BranchName("main"))

    // Assert — transport remains abstract
    assertTrue(result.integrationEvidence.isConfirmed)
}
```

---

# `F-RPKG-EXPORT-REPOSITORY-SNAPSHOT`

Status: **CURRENT/TARGET FEATURE**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Swing UI | `RepositorySnapshotDialog` | source mode/output/delivery selection |
| Swing Action | `ExportRepositorySnapshotAction` | starts export from dialog selection |
| UI model | `SnapshotExportFormModel` | validated target/source/output selection |
| Presenter | `SnapshotExportResultPresenter` | exact artifact / failure / optional delivery result |
| Application service | `ExportRepositorySnapshot` | source branch + publish orchestration |
| Feature-local | `SnapshotSourceSelector` | Local vs Commit semantic source selection |
| Domain | `RepositoryTarget` | registered exact repository identity/path |
| Domain | `SnapshotExport` | coherent capture/publication state |
| Persistence | `RepositoryTargetRepository` | registered target lookup/revalidation |
| Shared Git | `GitRepositoryCapability` | frozen HEAD, tracked/ignored, commit-object reads, diff |
| Shared filesystem | `SnapshotFilesystemCapability` | exact bytes, inventory, temp ZIP, atomic publish |
| Shared archive | `SnapshotArchiveWriter` | ZIP layout/entry write |
| Cross-cutting | `CanonicalPathResolver` | alias/symlink path normalization for output boundary |
| Cross-cutting | `ArtifactFingerprintService` | exact produced artifact identity |
| Cross-cutting | `OperationDiagnostics` | failure detail without misleading final ZIP |

## Application-service entry

```text
ExportRepositorySnapshot.export(
    target: RepositoryTarget,
    source: SnapshotSource,
    outputDirectory: CanonicalPath
) -> ExportRepositorySnapshotResult
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **1. Select/freeze source**<br>`BR-RPKG-SNAPSHOT-LOCAL-SOURCE-MEANS-ACTUAL-WORKING-TREE`, `BR-RPKG-SNAPSHOT-COMMIT-ORDERED-CAPTURE` | `ExportRepositorySnapshotAction.onInvoked()` → `RepositorySnapshotDialog.show()` → `SnapshotExportFormModel.validate()` → `RepositoryTargetRepository.load(targetId)` → `OperationDiagnostics.begin("ExportRepositorySnapshot")` → `SnapshotSourceSelector.select(...)`; Local path: `GitRepositoryCapability.readHead()` → `SnapshotExport.beginLocal(frozenHead, ...)`; Commit path: `GitRepositoryCapability.resolveCommitOnce(selectedRef)` → `SnapshotExport.beginCommit(resolvedCommit, ...)` | UI + persistence + cross-cutting + application + Shared Git + Domain |
| **2L. Local capture proof**<br>`BR-RPKG-SNAPSHOT-LOCAL-DIFF-MATCHES-SAME-CAPTURE`, `BR-RPKG-SNAPSHOT-LOCAL-ORDERED-CONSISTENCY-PROOF` | first `SnapshotFilesystemCapability.captureInventoryAndBytes()` + `GitRepositoryCapability.diff(frozenHead, firstInventory)` → `SnapshotExport.recordFirstLocalCapture(...)` → second capture + `GitRepositoryCapability.readHead()` + repeated diff → `SnapshotExport.confirmSecondLocalCapture(...)` | Shared FS + Git + Domain |
| **2C. Commit capture**<br>`BR-RPKG-SNAPSHOT-COMMIT-ORDERED-CAPTURE` | `GitRepositoryCapability.readCommitFiles(snapshotExport.source.resolvedCommit)` → `SnapshotExport.recordCommitCapture(inventory)`; local dirty/index/untracked state is never read as content authority | Shared Git + Domain |
| **3. Reject unsupported entries**<br>`BR-RPKG-SNAPSHOT-UNSUPPORTED-ENTRIES-FAIL` | `SnapshotFilesystemCapability.classifyEntry(...)`; symlink/submodule → `SnapshotExport.rejectUnsupportedSourceEntry(entryType)`; do not create final artifact | Shared FS + Domain |
| **4. Validate/publish**<br>`BR-RPKG-SNAPSHOT-OUTPUT-BOUNDARY`, `BR-RPKG-SNAPSHOT-NO-MISLEADING-FINAL-ZIP`, `BR-RPKG-SNAPSHOT-READ-ONLY` | `CanonicalPathResolver.resolve(...)` → validated output → `SnapshotArchiveWriter.writeTemp(...)` → `SnapshotFilesystemCapability.publishAtomically(...)` → `ArtifactFingerprintService.fingerprint(...)` → `SnapshotExport.publish(...)` → `OperationDiagnostics.complete(...)` → `SnapshotExportResultPresenter.present(...)` | cross-cutting + Shared archive/FS + Domain + UI |

## Feature integration tests

```text
test("local_snapshot_contains_one_coherent_machine_file_capture_and_leaves_repository_state_unchanged") {
    // Arrange
    let env = snapshotFeatureEnvironment(
        head: "1111",
        localFiles: ["a.txt": "local"],
        gitFiles: ["a.txt": "committed"]
    )
    let before = env.git.captureRepositoryState()

    // Act
    let result = env.service.export(
        env.target,
        SnapshotSource.Local(frozenHead: CommitId("1111")),
        CanonicalPath("/exports")
    )

    // Assert — published artifact Result
    assertTrue(result.isPublished)
    assertEqual(result.zip.file("a.txt"), FileBytes("local"))

    // Assert — source provenance
    assertEqual(result.diff.fromCommit, CommitId("1111"))

    // Assert — repository read-only behavior
    assertEqual(env.git.captureRepositoryState(), before)
}
```

```text
test("moving_local_source_fails_without_publishing_a_mixed_final_zip") {
    // Arrange
    let env = snapshotFeatureEnvironment(
        firstCapture: ["a.txt": "A"],
        secondCapture: ["a.txt": "B"]
    )

    // Act
    let result = env.service.export(
        env.target,
        SnapshotSource.Local(frozenHead: CommitId("1111")),
        CanonicalPath("/exports")
    )

    // Assert — explicit unstable-source failure
    assertTrue(result.isFailedAsUnstableSource)

    // Assert — no misleading final artifact
    assertFalse(env.filesystem.exists("/exports/snapshot.zip"))
}
```

```text
test("commit_snapshot_uses_only_the_once_resolved_commit_and_ignores_local_dirty_state") {
    // Arrange
    let env = snapshotFeatureEnvironment(
        resolvedCommit: "1111",
        commitFiles: ["a.txt": "committed"],
        localFiles: ["a.txt": "dirty"]
    )

    // Act
    let result = env.service.export(env.target, SnapshotSource.Commit("main"), CanonicalPath("/exports"))

    // Assert — source resolution occurs once
    assertEqual(env.git.resolveRefCallCount, 1)

    // Assert — artifact bytes come from resolved commit
    assertEqual(result.zip.file("a.txt"), FileBytes("committed"))
}
```

## Future / Evolution planning

- Core Snapshot export has no selected semantic Evolution.
- **FUTURE SHARED EXTENSION:** delivery/browser mechanics may evolve through `ExternalInteraction` / `ChatGPTDeliveryCapability`; do not move browser lifecycle into Snapshot export.

---

# `F-RPKG-INSPECT-CURRENT-CHANGE`

Status: **CURRENT diagnostic + TARGET DETAIL OPEN**

## Whole-Slice candidate class map

| Kind | Candidate class | Role |
|---|---|---|
| Swing UI | `InspectCurrentChangeAction` | diagnostic entry |
| Presenter | `CurrentChangePresenter` | render exact selected projection identity/endpoints |
| Application service | `InspectCurrentChange` | read-only diagnostic orchestration |
| Domain/read model | `RepositoryWork` | exact selected work identity |
| Shared Git | `GitRepositoryCapability` | derive diff/tree projection once endpoints are selected |
| Cross-cutting | `OperationDiagnostics` | explicit unsupported/OPEN projection result |

## Application-service entry

```text
InspectCurrentChange.inspect(
    work: RepositoryWork,
    projection: CurrentChangeProjection
) -> CurrentChangeResult
```

## Step-by-step realization

| Feature Step / BR | Candidate realization calls | Layer / responsibility |
|---|---|---|
| **Legacy mode** | `InspectCurrentChangeAction.onInvoked()` → `OperationDiagnostics.begin("InspectCurrentChange")` → existing ReviewDiff-compatible adapter → `CurrentChangePresenter.present(...)` | UI + compatibility + diagnostics |
| **Target Git-backed mode** | `InspectCurrentChange.inspect(...)` detects unresolved target projection → `OperationDiagnostics.recordUnsupportedProjection(...)` → `CurrentChangePresenter.presentUnsupported(...)`; `GitRepositoryCapability.diff(...)` is intentionally not called until endpoints are selected | application + diagnostics + UI; Git call blocked by OPEN detail |
| **Any mode** | read-only; presenter must not label an arbitrary checkout/dirty/target diff as Current Change | Application + UI |

## Feature integration tests

```text
test("target_git_backed_current_change_does_not_guess_projection_endpoints_while_target_definition_is_open") {
    // Arrange
    let service = inspectCurrentChangeService(targetProjectionDefinition: .open)

    // Act
    let result = service.inspect(gitBackedWork(), .current)

    // Assert — explicit unsupported Result
    assertTrue(result.isUnsupportedUntilProjectionIsDefined)

    // Assert — no guessed Git projection
    assertEqual(service.git.diffCallCount, 0)
}
```

## Future / Evolution planning

Canonical selected Evolution: `EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`.

- **FUTURE TARGET DEFINITION:** select exact Git-backed `from`, `to`, projection identity and currentness.
- Until selected, implementation remains explicitly unsupported rather than guessing current checkout/target/local-dirty/published semantics.

---

# Scenario-derived Snapshot delivery support

Status: Scenario-owned composition, not another Feature.

## Candidate classes

| Kind | Candidate class | Role |
|---|---|---|
| UI | `SnapshotDeliverySelectionModel` | frozen Export / Attach / Attach+Send choice |
| Application coordinator | `DeliverSnapshotArtifact` | coordinates exact produced artifact with destination |
| Domain | `ExternalInteraction` | one delivery-attempt semantic state |
| Shared browser | `ChatGPTDeliveryCapability` | attach/send mechanics |
| Cross-cutting | `ConversationResolver`, `ArtifactFingerprintService` | exact destination/artifact identity |
| Presenter | `SnapshotDeliveryResultPresenter` | Attached/Sent/Failed/Unknown truth |

## Scenario integration tests

```text
test("snapshot_delivery_uses_the_exact_exported_artifact_and_does_not_change_review_binding") {
    // Arrange
    let export = publishedSnapshot(fingerprint: "sha256:abc")
    let reviewBindingBefore = reviewBinding("cs-1")
    let delivery = snapshotDeliveryEnvironment()

    // Act
    let result = delivery.service.deliver(
        export,
        ConversationKey("chat-7"),
        DeliveryMode.AttachAndSend
    )

    // Assert — exact artifact continuity
    assertEqual(result.artifactFingerprint, ArtifactFingerprint("sha256:abc"))
    assertEqual(delivery.browser.attachedFingerprint, ArtifactFingerprint("sha256:abc"))

    // Assert — unrelated review binding is untouched
    assertEqual(reviewBinding("cs-1"), reviewBindingBefore)
}
```

```text
test("browser_delivery_failure_does_not_rewrite_successful_snapshot_export") {
    // Arrange
    let export = publishedSnapshot(
        finalPath: "/exports/snapshot.zip",
        fingerprint: "sha256:abc"
    )
    let delivery = snapshotDeliveryEnvironment(sendResult: .failedBeforeSend)

    // Act
    let result = delivery.service.deliver(
        export,
        ConversationKey("chat-7"),
        DeliveryMode.AttachAndSend
    )

    // Assert — export Result remains successful
    assertTrue(export.isPublished)

    // Assert — delivery failure stays separate
    assertEqual(result.state, FailedBeforeSend)
}
```

## Future / Evolution planning

- **FUTURE EXTENSION:** stronger browser reconciliation may convert `UnknownAfterSend` into proven Sent/NotSent when reliable evidence becomes available.
- **FUTURE SHARED CHANGE:** browser automation can evolve without changing Snapshot export success or Repository Work review binding.


---

# Slice-wide shared/cross-cutting candidates

These classes are candidates for reuse only where real reuse is proven.

```text
GitRepositoryCapability
GitWorkspaceCapability
GitPublicationCapability
GitHubIssueCapability
ReplacementPackageApplyCapability
PackageArchiveCapability
ReviewWorkspaceCapability
SnapshotFilesystemCapability
SnapshotArchiveWriter
ChatGPTDeliveryCapability
IntegrationCapability

RepositoryOperationLock
ExternalEffectReconciler
OperationDiagnostics
CanonicalPathResolver
ArtifactFingerprintService
ChangeSetIdGenerator
PackageIdGenerator
ReviewIdGenerator
Clock
CancellationToken
```

Do not turn this list into a mandatory shared layer. Keep a capability Feature-local until multiple Slices genuinely need the same responsibility.


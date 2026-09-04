# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: active current Scenario owner

## Application Benefit / Desired Result

Prepared or already-existing logical repository work is brought into the exact intended repository safely, progresses without losing established truth, and either reaches its currently supported published/finalized result or remains in an explicit recoverable state without capturing unrelated work.

This current Scenario intentionally describes the **implemented migration state**. It does not claim the planned reviewed-result confirmation / PR / target Finalize workflow is current.

## Process Specification

### Scenario Process / Feature Interaction Map

```text
FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK
├─ target-mode package
│    ↓
│  FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT
│    ↓
│  FI-RPKG-REALIZE-CURRENT-PACKAGE
│    ↓
│  published Ready
│    ↓
│  STOP at current Git-backed migration boundary
│
└─ legacy-compatible package/work
     ↓
   FI-RPKG-REALIZE-CURRENT-PACKAGE
     ↓
   FI-RPKG-INSPECT-LEGACY-CURRENT-CHANGE
     ↓
   FI-RPKG-FINALIZE-LEGACY-CURRENT-WORK
```

The same top-level target-mode `apply-package` request resumes from persisted execution truth rather than requiring the user to drive internal Apply / Commit / Publish stages manually.

### FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK — Resolve exact repository work

Scenario Role / Local Purpose:
Bind the operation to the exact repository target, package ChangeSet identity and current supported execution route before mutation.

Context / Preconditions:
A registered Repository Target exists and a replacement package / action has been supplied.

Required Inputs:
Repository Target context, package manifest identity and optional explicit `targetBranch`.

Interaction Process:
The application resolves and validates the concrete package, repository identity, Repository Target and `changeSetId`. Package identity is authoritative for logical continuation; UI selection, label similarity, recency and same-origin clone convenience cannot retarget the work. Explicit `targetBranch` selects the Git-backed target-mode route; absence preserves legacy/manual compatibility.

Outcomes:
- exact target/work is established → continue;
- invalid, conflicting, unverifiable or incompatible identity → fail before repository mutation.

Result:
One exact current repository-work context and route is fixed for execution.

Outputs:
Resolved Repository Target, ChangeSet identity, package identity and route context.

Next Interactions:
Target-mode → `FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT`; legacy → `FI-RPKG-REALIZE-CURRENT-PACKAGE`.

Behavior Items:

#### BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET — Execute only against the exact Repository Target
Requirement:
Repository mutation must remain bound to the exact registered Repository Target resolved for the operation; a convenient same-origin clone or later UI selection must not substitute another target.

Reason:
Repository identity alone does not identify one concrete local work target.

#### BI-RPKG-CURRENT-CHANGESET-ID-AUTHORITY — Package ChangeSet identity controls continuation
Requirement:
`PACKAGE.json.changeSetId` is the logical continuation identity and must not be replaced by label similarity, recency or current UI selection.

Reason:
Continuation must address the same logical work rather than whichever work appears most convenient.

#### BI-RPKG-CURRENT-PREFLIGHT-BEFORE-MUTATION — Fail closed before mutation
Requirement:
Package, repository, target, ownership/source and route applicability that can be proven before mutation must be proven before the first repository-file mutation.

Reason:
Invalid or stale input must not create partial repository work merely to discover that it was inapplicable.

### FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT — Establish durable semantic work intent

Scenario Role / Local Purpose:
Ensure the target-mode ChangeSet has one durable semantic GitHub Issue identity before Git workspace/package mutation.

Context / Preconditions:
The resolved action has explicit `targetBranch` and the package carries valid `workIntent`.

Required Inputs:
Repository identity, `changeSetId`, Title, Goal, Why and Acceptance.

Interaction Process:
The application ensures one exact managed Issue represents the `ChangeSet-Id`, adopts/verifies an existing exact match, fails closed on conflicting exact matches and preserves truthful recovery when external Issue creation/update outcome is uncertain. The resulting Issue identity remains durable for the same logical work.

Outcomes:
- exact Issue exists and is verified → continue;
- transport/auth failure before create → fail without workspace/package mutation;
- duplicate marker or unresolved create truth → explicit failure/uncertainty, no blind duplicate.

Result:
One exact durable Work Intent exists for this ChangeSet.

Outputs:
Persisted Work Intent and exact Issue reference.

Next Interactions:
`FI-RPKG-REALIZE-CURRENT-PACKAGE`.

Behavior Items:

#### BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE — One exact managed Issue
Requirement:
One ChangeSet marker must resolve to exactly one managed GitHub Issue; zero may create one, one is adopted, and multiple exact matches fail closed.

Reason:
Semantic work identity must not fork through duplicate external records.

#### BI-RPKG-WORK-INTENT-DURABLE — Work Intent survives interruption
Requirement:
Work Intent identity and create/reconciliation state must be persisted strongly enough that retry can recover the same external intent instead of blindly creating another one.

Reason:
External create success can outlive a lost local response.

### FI-RPKG-REALIZE-CURRENT-PACKAGE — Apply, commit and publish the package using current semantics

Scenario Role / Local Purpose:
Realize one exact package while preserving exact source applicability, unrelated work and truthful recoverable execution state.

Context / Preconditions:
Exact repository work is resolved. Target-mode work has durable Work Intent; legacy work satisfies its current ownership/source guards.

Required Inputs:
Validated package operations/payloads, exact expected source, persisted ChangeSet state and route-specific repository context.

Interaction Process:
For target-mode work, the application realizes the exact package against the exact expected published source, preserving truthful applied/committed/published boundaries. Retry proves established effects and resumes `Ready → AppliedUncommitted → CommittedUnpublished → Ready`; `PublicationUncertain` must be reconciled before another publication attempt or later package.

For legacy work, package/source/ownership preflight precedes main-workspace mutation and current Path Ownership semantics remain active.

Outcomes:
- exact target-mode package published and proven `Ready`;
- exact legacy package applied under current legacy semantics;
- deterministic failure before/at a proven boundary;
- recoverable partial/uncertain execution state.

Result:
The package is realized as far as current semantics safely allow, with repository truth and recovery state explicit.

Outputs:
Updated ChangeSet execution/published state; legacy path may also produce a persisted Current Change.

Next Interactions:
Target-mode published `Ready` → Scenario currently stops. Legacy successful Apply → `FI-RPKG-INSPECT-LEGACY-CURRENT-CHANGE`.

Behavior Items:

#### BI-RPKG-CURRENT-APPLY-EXACT-PACKAGE — Mutate only from the exact validated package
Requirement:
The package operations and complete payload bytes validated for this execution are the repository-file mutation authority.

Reason:
An equivalent reconstruction is not the same operation identity as the supplied package.

#### BI-RPKG-CURRENT-APPLY-EXACT-SOURCE — Prove expected source before replacement/deletion
Requirement:
Every replace/delete operation must prove that its current target source is the exact expected source or Git-path-equivalent source permitted by the package protocol before mutation.

Reason:
A stale package must not overwrite a source state it was not built against.

#### BI-RPKG-CURRENT-GIT-RETRY-RESUMES — Retry resumes proven Git-backed execution
Requirement:
Retry must prove already-established workspace/apply/commit/publish side effects and resume from the latest proven state instead of restarting the logical package operation.

Reason:
Blind restart can duplicate commits, overwrite remote truth or lose interruption evidence.

#### BI-RPKG-CURRENT-PARTIAL-STATE-TRUTHFUL — Preserve truthful partial execution state
Requirement:
If an internal stage succeeds and a later stage fails, the successful established state must remain persisted rather than being reported or rolled back as if it never happened.

Reason:
Recovery depends on knowing which irreversible/local side effects are already true.

#### BI-RPKG-CURRENT-PUBLICATION-UNCERTAIN-BLOCKS-NEXT — Reconcile uncertain publication first
Requirement:
While publication outcome is uncertain, no next package may proceed until the exact remote state is reconciled.

Reason:
The expected source for a later package is undefined until the previous publication boundary is known.

#### BI-RPKG-CURRENT-LEGACY-OWNERSHIP-PROTECTS-UNRELATED-WORK — Legacy ownership protects unrelated work
Requirement:
Legacy Apply must not silently adopt or overwrite paths owned by sibling unfinished work or unrelated dirty/unowned content.

Reason:
Compatibility mode must preserve the repository-work isolation guarantees on which legacy Finalize depends.

### FI-RPKG-INSPECT-LEGACY-CURRENT-CHANGE — Inspect cumulative legacy Current Change

Scenario Role / Local Purpose:
Materialize and inspect the exact cumulative current legacy ChangeSet without mutating the real Git index.

Context / Preconditions:
A legacy ChangeSet has current owned work and can produce its canonical persisted ReviewDiff.

Required Inputs:
Exact ChangeSet identity, owned paths and repository baseline/current state.

Interaction Process:
The application derives the cumulative canonical ReviewDiff for the selected ChangeSet without mutating repository truth, persists the exact current review identity and exposes Refresh / Copy / Open / optional ChatGPT delivery.

Outcomes:
- exact current ReviewDiff produced;
- no changes;
- stale/unavailable/failed derivation with no mutation of repository truth.

Result:
One exact cumulative legacy Current Change is available for current legacy review/finalization semantics.

Outputs:
Persisted ReviewDiff + identity/freshness state.

Next Interactions:
`FI-RPKG-FINALIZE-LEGACY-CURRENT-WORK` when the user chooses Finalize; otherwise inspection/support may repeat.

Behavior Items:

#### BI-RPKG-CURRENT-REVIEWDIFF-CUMULATIVE — Current ReviewDiff is cumulative for one legacy ChangeSet
Requirement:
Legacy Current Change must represent the cumulative exact logical change of the selected ChangeSet rather than only the last package delta.

Reason:
Legacy Finalize is defined over the full logical ChangeSet and therefore requires a cumulative review projection.

#### BI-RPKG-CURRENT-REVIEW-NONMUTATING — Review generation does not alter repository state
Requirement:
Current Change generation must not mutate the real repository index or working-tree truth merely to compute a review artifact.

Reason:
Computing a review must not alter the work whose current state is being reviewed.

#### BI-RPKG-CURRENT-REVIEW-BINDS-CHANGESET — Review identity belongs to the selected ChangeSet
Requirement:
A persisted Current Change used by legacy Finalize must be bound to the exact ChangeSet/repository state from which it was derived.

Reason:
Freshness and Finalize checks require an exact relationship between the review artifact and the work state it describes.

### FI-RPKG-FINALIZE-LEGACY-CURRENT-WORK — Finalize current legacy work

Scenario Role / Local Purpose:
Close legacy work only from a fresh exact Current Change while preserving successful local work when publication cannot complete.

Context / Preconditions:
A legacy ChangeSet has a current persisted ReviewDiff and current ownership state.

Required Inputs:
Exact ChangeSet, fresh Current Change identity and local commit message.

Interaction Process:
Finalize proves that the persisted Current Change is still fresh and that only the ChangeSet-owned work will be included, then commits/publishes that legacy work. Publication failure preserves successful local work as Publication Pending. Explicit Reopen may later return finalized legacy identity to Active only when ownership can be safely reacquired.

Outcomes:
- Finalized;
- Publication Pending/retryable;
- blocked because Current Change is stale or ownership/repository state changed;
- Reopen succeeds or fails without partial ownership/lifecycle mutation.

Result:
Legacy work is finalized/published, preserved for publication recovery, or left unchanged with a truthful blocking result.

Outputs:
Lifecycle/finalization/publication state.

Next Interactions:
Terminal current legacy result or explicit later Reopen.

Behavior Items:

#### BI-RPKG-CURRENT-FINALIZE-REQUIRES-FRESH-REVIEW — Legacy Finalize requires a fresh Current Change
Requirement:
Finalize must fail if the persisted Current Change no longer represents the exact current ChangeSet state.

Reason:
Legacy Finalize must not integrate repository state that has changed since the user-visible Current Change was derived.

#### BI-RPKG-CURRENT-FINALIZE-OWNED-ONLY — Legacy Finalize stages only owned work
Requirement:
Finalize must not capture repository paths outside the ChangeSet's established ownership.

Reason:
Finalization must not accidentally capture unrelated or sibling unfinished repository work.

#### BI-RPKG-CURRENT-PUBLICATION-FAILURE-PRESERVES-WORK — Publication failure preserves successful local work
Requirement:
If local finalization succeeds but publication fails, the application must preserve the local result and expose recoverable publication state instead of recreating unrelated logical work.

Reason:
A successful local commit remains real even if remote publication fails and should be recoverable without recreating the work.

#### BI-RPKG-CURRENT-REOPEN-EXPLICIT — Reopen is explicit and guarded
Requirement:
Finalized legacy work may return to Active only through explicit Reopen that proves ownership can be reacquired without stealing sibling work or silently adopting unrelated changes.

Reason:
Reacquiring finalized ownership changes repository-work authority and therefore must not happen as a side effect of navigation or continuation.

## Screen references

Selected current spatial/window responsibility is documented in [`../screens.md`](../screens.md). Screen rules do not redefine this Scenario's behavioral authority.

## Evolution Steps

<a id="evo-rpkg-downgrade-current-change-to-diagnostic"></a>
### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC — Make Current Change diagnostic for target work
Intent: PLANNED

Change:
Git-backed Current Change becomes a Git-derived optional diagnostic/support projection and no longer acts as semantic approval authority for ordinary target-mode work.

Scenario Process / Feature Interaction impact:
`FI-RPKG-INSPECT-LEGACY-CURRENT-CHANGE` remains only for legacy compatibility until legacy work is retired; target work uses diagnostic inspection separately from approval.

Related / Replacement Scenario:
[`planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md`](planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md).

<a id="evo-rpkg-adopt-reviewed-result-workflow"></a>
### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW — Complete work from Builder-reviewed result identity
Intent: PLANNED

Change:
Target-mode Complete Repository Work gains the selected three-route contract: Apply Only stops applied/uncommitted; Apply And Publish publishes and confirms actual result equals the reviewed predicted result, then stops pre-integration; Apply And Finalize continues through correct integration, final work record and Issue closure.

Scenario Process / Feature Interaction impact:
The current target-mode stop after published `Ready` evolves into route-dependent planned behavior while preserving one semantic authority and resumable state.

Related / Replacement Scenario:
[`planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md`](planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md).

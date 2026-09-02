# Repository Work / ChangeSet

Status: active current Aggregate owner with selected planned expansion

## Responsibility

Own one logical repository-work consistency boundary across repository target association, pinned Git execution identity, package realization/recovery and lifecycle facts that must remain mutually compatible. Selected future expansion adds reviewed-result identity, PR currentness and approval/finalization state to this same logical work boundary.

## Behavior Items implemented

Current:
- `BI-RPKG-CURRENT-CHANGESET-ID-AUTHORITY`
- `BI-RPKG-CURRENT-GIT-RETRY-RESUMES`
- `BI-RPKG-CURRENT-PARTIAL-STATE-TRUTHFUL`
- `BI-RPKG-CURRENT-PUBLICATION-UNCERTAIN-BLOCKS-NEXT`
- current legacy review/finalize binding BIs where persisted ChangeSet state is authority.

Future BI families are referenced only from `Evolution Impact` below; they are not claimed as implemented by this current owner.

## Domain Concepts / Invariants

Current Git-backed:
- stable `changeSetId` / label and exact Repository Target;
- Work Intent Issue reference when established;
- exact target branch, deterministic ChangeSet branch/worktree and common-repository relation;
- immutable `baseCommit` plus current proven `publishedTip`;
- explicit execution truth such as `Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain`;
- package Apply/commit/publication evidence belongs to this same logical work identity.

Legacy compatibility:
- Path Ownership, persisted Current Change and legacy lifecycle/finalization facts remain valid only for legacy ChangeSets and are not silently projected onto Git-backed target work.

Planned reviewed-result expansion:
- exact Builder review binding: ChangeSet + package + expected source + reviewed predicted result identity;
- actual published revision verification/currentness;
- one current integration PR identity;
- approval staleness determined by whether the reviewed result changed, not by target movement alone;
- finalized target work is closed to package continuation.

## Domain Implementation Items

### DI-RPKG-CHANGESET-PINNED-GIT-BOUNDARY — Persist exact Git execution identity
Requirement:
Git-backed execution decisions must use persisted exact target branch/branch/worktree/common-repository/`baseCommit`/`publishedTip` facts rather than mutable current-checkout state.

Reason:
Retry, applicability and publication proof require stable revision/workspace authority.

## Tests

Most current proof is integration-oriented and therefore lives with `SL-RPKG-01`, `SL-RPKG-02`, `SL-RPKG-03` and `SL-RPKG-11`. New reviewed-result/currentness invariants should receive local Domain proof when they can be observed deterministically without reproducing Git orchestration.

### Test Items

#### TST-RPKG-CHANGESET-PARTIAL-STATE-CANNOT-BE-SILENTLY-NORMALIZED
Requirement:
Recovery/state tests must prove that uncertain or partially established durable state cannot be collapsed into a clean `Ready`/unstarted state without the required external/Git proof.

Reason:
False normalization would authorize unsafe retry or later package work.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Refactoring:
Target Current Change projection stops being approval/finalization authority; legacy fields remain only while legacy ChangeSets require them.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
Canonical Scenario step:
[`EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-adopt-reviewed-result-workflow)

Target BI references:
- `BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE`
- `BI-RPKG-VERIFY-EXECUTION-IDENTITY`
- `BI-RPKG-VERIFY-FAILS-CLOSED`
- `BI-RPKG-ONE-CORRECT-PR`
- target Finalize/approval-staleness/closure BI family in the planned reviewed-work Scenario.

Expansion:
Add reviewed-result binding, actual-published-result proof/currentness, PR reference/currentness and target Finalize/closure state around the existing ChangeSet identity. The future implementation must preserve enough immutable identity to relate ChangeSet, reviewed package, expected source, reviewed predicted result and actual published revision, and approval currentness must follow result identity rather than incidental target movement. These are future owner-shape requirements here, not current `DI-*` items.

Forced Migration:
Target Finalize authority must not depend on legacy Path Ownership/ReviewDiff approval semantics.

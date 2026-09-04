# Repository Work / ChangeSet

Status: active current Aggregate owner

## Responsibility

Own one logical current repository-work consistency boundary across repository target association, pinned Git execution identity, package realization/recovery and current lifecycle facts that must remain mutually compatible. Planned reviewed-result/PR/finalization behavior may require this owner to evolve, but that future ownership is not selected here.

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

Planned reviewed-result note:
- the planned Scenario introduces new result/currentness/integration requirements;
- their durable owner and Item shape are selected later by Requirements Discovery rather than assumed to belong to ChangeSet.

## Domain Implementation Items

### DI-RPKG-CHANGESET-PINNED-GIT-BOUNDARY — Persist exact Git execution identity
Requirement:
Git-backed execution decisions must use persisted exact target branch/branch/worktree/common-repository/`baseCommit`/`publishedTip` facts rather than mutable current-checkout state.

Reason:
Retry, applicability and publication proof require stable revision/workspace authority.

## Tests

Most current proof is integration-oriented and therefore lives with `SL-RPKG-01`, `SL-RPKG-02`, `SL-RPKG-03` and `SL-RPKG-11`. If downstream Requirements Discovery selects new ChangeSet-owned reviewed-result/currentness invariants, they should receive local Domain proof when they can be observed deterministically without reproducing Git orchestration.

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
Candidate impact: the planned Scenario requires durable relationships among logical work, reviewed package/source/result, actual published result, integration currentness and final closure. Because current ChangeSet already owns related repository-work identity, it is a natural candidate to participate, but downstream Domain/Slice/Shared Requirements Discovery must decide which requirements actually belong here and create `DI-*`/`SI-*`/shared Items only after that selection.

Forced Migration:
Regardless of downstream owner selection, target Finalize authority must not depend on legacy Path Ownership/ReviewDiff approval semantics.

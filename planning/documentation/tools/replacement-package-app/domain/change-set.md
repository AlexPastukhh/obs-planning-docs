# Repository Work / ChangeSet

Status: active current Aggregate owner with selected planned expansion/migration

## Responsibility

Own current App repository-work consistency across Repository Target association, pinned Git execution identity, package realization/recovery and lifecycle facts.

Selected future behavior additionally relates the consumer execution to Builder-established repository work, exact reviewed-result identity, PR currentness, final logging and closure.

## Behavior Items Implemented

Current:
- `BI-RPKG-CURRENT-CHANGESET-ID-AUTHORITY`
- `BI-RPKG-CURRENT-GIT-RETRY-RESUMES`
- `BI-RPKG-CURRENT-PARTIAL-STATE-TRUTHFUL`
- `BI-RPKG-CURRENT-PUBLICATION-UNCERTAIN-BLOCKS-NEXT`
- current legacy review/finalize binding BIs where persisted ChangeSet state is authority.

Future BI families remain Scenario-owned and are not claimed implemented here.

## Domain Concepts / Invariants

Current Git-backed:
- stable internal `changeSetId` / label and exact Repository Target;
- Work Intent Issue reference when established;
- exact target branch, deterministic ChangeSet branch/worktree and common-repository relation;
- immutable `baseCommit` plus current proven `publishedTip`;
- explicit execution truth such as `Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain`;
- package Apply/commit/publication evidence belongs to the same logical work identity.

Legacy compatibility remains current only for legacy work.

Planned reviewed-result target:
- consume exact Builder-established Issue/work branch/target/source context;
- exact Builder review binding: repository work + package + expected source + reviewed result;
- actual published revision verification/currentness;
- one correct integration PR when Finalize is requested;
- approval staleness follows whether the reviewed work result changes, not target movement alone;
- successful Finalize includes exact Final Work Record persistence/reconciliation before Issue closure;
- automatic route and modular continuation share the same execution truth.

Current internal `changeSetId` may remain a hidden migration/runtime identity. This planned target does not require it to become the user-facing work identity.

## Domain Implementation Items — Current

### DI-RPKG-CHANGESET-PINNED-GIT-BOUNDARY

Requirement:
Current Git-backed execution decisions use persisted exact target/branch/worktree/common-repository/`baseCommit`/`publishedTip` facts rather than mutable checkout state.

## Tests

Current proof remains integration-oriented in `SL-RPKG-01`, `SL-RPKG-02`, `SL-RPKG-03` and `SL-RPKG-11`.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC

Target Current Change stops being approval/finalization authority; legacy fields remain while legacy ChangeSets require them.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Canonical target Scenario:
[`SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`](../scenarios/planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md)

Expansion/migration:
- bind current App execution to Builder-established repository work instead of silently creating a competing Issue/work branch;
- persist/prove reviewed package/source/result identity through Apply/Commit/Push;
- support automatic route stopping at AppliedUncommitted, ReviewedPublished or Finalized;
- preserve semantic stage inputs across retry when the handoff supplied them;
- own PR/finalization currentness and truthful partial finalization state;
- preserve enough exact state to reconcile Final Work Record/Issue-close uncertainty without duplicate final records.

These are future owner-shape requirements, not new current `DI-*` items.

Forced migration:
Target Finalize must not depend on legacy ReviewDiff/Path Ownership approval semantics.

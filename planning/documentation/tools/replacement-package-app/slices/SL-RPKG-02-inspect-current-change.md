# SL-RPKG-02 — Inspect Current Change

Status: active current Slice owner

## Result / Responsibility

Derive and expose the exact current change of one ChangeSet without mutating real repository work. Current implementation is the legacy owned-path cumulative ReviewDiff projection.

## Scenario behavior realized

Current:
- `FI-RPKG-INSPECT-LEGACY-CURRENT-CHANGE`
- `FI-RPKG-MATERIALIZE-LEGACY-CURRENT-CHANGE`

Behavior Items:
- `BI-RPKG-CURRENT-REVIEWDIFF-CUMULATIVE`
- `BI-RPKG-CURRENT-REVIEW-NONMUTATING`
- `BI-RPKG-CURRENT-REVIEW-BINDS-CHANGESET`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-CUMULATIVE`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-NONMUTATING`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-WORK`

## Domain used

Repository Work / ChangeSet.

## Slice Implementation Items

### SI-RPKG-CURRENT-CHANGE-ISOLATED-DERIVATION — Derivation cannot perturb real index
Requirement:
Current Change calculation must use an isolated derivation mechanism when Git indexing is required and must not leave the real index/worktree modified.

## Tests

Current responsibility: `CoreTests` for cumulative ReviewDiff identity, temporary-index isolation, persistence/freshness and captured-ChangeSet ownership.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Canonical Scenario step:
[`EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-downgrade-current-change-to-diagnostic)

Target BI references:
- `BI-RPKG-CURRENT-CHANGE-GIT-DERIVED`
- `BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL`
- `BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC`

Candidate impact:
Target diagnostic Current Change should be Git-derived and must not recreate a second owned-path approval authority. Whether this existing Slice remains the implementation owner for that target projection is selected by downstream Requirements Discovery; this Impact does not create a future `SI-*` by itself.

Refactoring:
Remove semantic-approval/finalize authority from target Current Change use while preserving the legacy path until legacy retirement.

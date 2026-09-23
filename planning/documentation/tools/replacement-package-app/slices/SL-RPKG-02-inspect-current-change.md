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

The former `CoreTests` source is preserved under `legacy/tests/` as historical proof intent and is not current executable evidence. Current proof claims must be limited to tests compiled by `build.cmd` plus current source/contracts; no passing regression claim is made here for legacy-only cases.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Canonical Evolution Step owner: **not separately materialized in the current document set**. This Slice section records only the local impact of the named transition.

Target BI references:
- `BI-RPKG-CURRENT-CHANGE-GIT-DERIVED`
- `BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL`
- `BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC`

Expansion:
Add Git-derived latest/cumulative projections from exact persisted ChangeSet Git boundaries. Target work already has exact base/published revision identity and should not recreate a second owned-path authority. This is future Slice delta, not a current `SI-*` requirement.

Refactoring:
Remove semantic-approval/finalize authority from target Current Change use while preserving the legacy path until legacy retirement.

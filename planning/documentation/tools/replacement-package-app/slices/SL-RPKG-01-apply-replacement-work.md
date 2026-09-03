# SL-RPKG-01 — Apply Replacement Work

Status: active current Slice owner with planned evolution impact

## Current Result / Responsibility

Realize one validated replacement package against the exact current repository-work context. Current target-mode composition ensures Work Intent/workspace dependencies, applies exact package files, commits proven package paths and publishes the exact ChangeSet branch with retry/recovery by persisted proof. Legacy Apply remains supported.

## Current Scenario Behavior Realized

- `FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK`
- `FI-RPKG-REALIZE-CURRENT-PACKAGE`
- current Apply/source/retry/partial-state BIs.

## Domain / Shared Capabilities Used

Repository Target; Work Intent; Repository Work / ChangeSet; `PACKAGE-PROTOCOL.md`.

## Slice Implementation Items — Current

### SI-RPKG-APPLY-JOURNAL-BEFORE-MUTATION

Persist exact package/base-head and prior/intended package-path evidence before target-mode package-file mutation.

### SI-RPKG-RETRY-BY-PROOF-NOT-RESTART

Retry proves established workspace/file/commit/remote side effects and continues from the latest proven boundary instead of blindly replaying the whole operation.

## Tests

Primary current proof: repository/integration cases in `CoreTests`.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Canonical target behavior includes `FI-RPKG-REALIZE-REVIEWED-PACKAGE` plus route-selected continuation into later Scenario FIs.

This current Slice is affected because it already owns substantial Apply/Commit/Push mechanics and recovery behavior that implementation planning may reuse.

Target Scenario requirements relevant to that migration include:
- Apply against the exact Builder-reviewed package and exact existing repository work;
- Apply Only may stop at `AppliedUncommitted`;
- automatic or manual Commit uses equivalent semantic input rules;
- publication must preserve truthful retry/recovery state;
- successful Push/Publish of reviewed work continues into deterministic reviewed-result confirmation;
- the consumer must not create a competing logical Issue/work branch.

These requirements do **not** yet select `SL-RPKG-01` as the final owner of all target realization or route composition.

Target Slice allocation may reuse, narrow or split this Slice after Domain boundaries and cross-FI composition responsibilities are selected. No future `SI-*` item is selected here.

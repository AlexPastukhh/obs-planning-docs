# Replacement Package App — Evolution Steps Map

Status: active evolution planning owner

Scope: canonical application-wide migration steps plus navigation to Scenario-owned steps. Feature/Screen/Slice owners carry owner-local Evolution Impact without creating competing migration roadmaps.

## Current mixed migration state

```text
legacy giant Core / mixed screen
    |
    | target-mode Core can internally traverse
    | Ready → AppliedUncommitted → CommittedUnpublished → Ready
    |
    +--> selected migration below
```

The persisted legacy states remain compatibility evidence during migration. They are not the target public Feature model.

## EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION — Make Apply, Commit and Publish explicit operations

Evolution Kinds:
- Refactoring
- Introduction
- Forced Migration

Resulting usable application state:

```text
Start workspace

Replacement Package
    Apply Package
    Commit applied
    Publish
    Retry Publish

Finalize remains a separate ChangeSet operation.
```

### Target Feature: `F-RPKG-APPLY-REPLACEMENT-PACKAGE`

Intent:
[CHANGED] Apply exact package files only.

Result:
[CHANGED] `Result<ReplacementPackageState, ApplyFailure>`.

Behavior:
[REMOVED] `ApplyExtent`.
[REMOVED] `ApplyRequest.Resume`.
[REMOVED] generic advance-to-requested-extent orchestration.
[NEW] persist exact replacement-package state after Apply.
[NEW] exact archive content identity is recorded for state created by the new module.

### Target Feature: `F-RPKG-COMMIT-APPLIED-PACKAGE`

[NEW] independent Commit Applied operation.
[NEW] consumes durable Applied package state.
[NEW] returns its own typed Result and persists exact commit SHA.
[NEW] repeated invocation proves/reuses the established commit rather than duplicating it.

### Target Feature: `F-RPKG-PUBLISH-APPLIED-COMMIT`

[NEW] independent Publish operation.
[NEW] `Retry Publish` is a UI retry/reconciliation entry for this same operation.
[NEW] publication evidence is `PublicationObservation = NotRequested | NotConfirmed | ConfirmedAbsent | ConfirmedTip(sha)`.
[NEW] `NotConfirmed` forces confirmation before another push.
[NEW] inability to confirm is failure of the confirmation operation, not a synthetic progress/success state.

### State ownership

[CHANGED] `PackageApplication` → `ReplacementPackageState`.

`ReplacementPackageState` is durable continuity shared by the three operations. It answers “what is currently proven about this exact package?” and never answers whether a particular operation call succeeded.

`Result<T,E>` / `OperationResult<E>` answer operation outcome. `ReplacementPackageState` / `PublicationObservation` answer durable state/evidence.

### Migration

1. Introduce `ReplacementPackageState` and its dedicated repository beside legacy `Core.ChangeSet`.
2. New Apply writes exact package identity and Applied state into that repository.
3. Commit Applied and Publish read/write the new state owner.
4. When no new state exists yet for already-running work, a compatibility adapter may project legacy `Core.ChangeSet` into the new state. That projection must not become the target API.
5. Once a new state exists, later operations use it as the durable Feature continuity owner; exact publication observations are persisted there and are not discarded on the next call.
6. Automatic `OBS-ACTION apply-package` remains a convenience composition entry: ensure Work Intent/workspace then invoke/prove Apply → Commit → Publish semantics. Its internal compatibility implementation may still delegate to Core while mechanics are extracted.
7. Manual screen actions use the explicit operation boundaries. There is no user/domain `Resume` action.
8. After all supported active ChangeSets can be read through the new state and all operation entries use the new services, remove `ApplyExtent`, Resume/advance code and legacy package-state projection.
9. Later extraction moves file/Git mechanics out of giant Core behind capabilities without changing the Feature Results.

Forced Migration:
Historical legacy state may lack a durable archive hash that was never stored after its Apply journal was retired. The migration must fail closed rather than bind a newly supplied ZIP to such old state by `packageId` alone. Commit/Publish continuity can still migrate from already-proven legacy package/commit state where no new ZIP identity assertion is required.

Readiness / proof gate:
- no Feature integration test depends directly on `CoreTests` internals;
- Apply never implicitly Commit/Publishes through the modular service;
- Commit never Publishes;
- Retry Publish confirms `NotConfirmed` before another push;
- exact remote observation survives another operation/restart;
- old `ApplyExtent` / Resume production and tests are gone.

## EVO-RPKG-RETIRE-LEGACY-INTERACTION-SURFACE — Remove interaction controls from the work screen

Evolution Kinds:
- Refactoring
- Retirement
- Forced Migration

Resulting usable Screen state:

```text
Repository / ChangeSet
Archive / OBS action

Start workspace
Apply Package
Commit applied
Publish
Retry Publish

Current Change diagnostic controls where still required

Finalize message
Finalize
Reopen when applicable

Operation / Output / diagnostics
```

[REMOVED from selected Main Work Window]
- Review chat selector / Refresh chats / Bind / Open / Unbind
- Chat delivery / Send current ReviewDiff
- External interactions selector and interaction management buttons
- interaction-oriented Chat bridge/retry/title controls
- `Retry Push` beside Finalize

[UNCHANGED]
- Finalize remains a separate ChangeSet operation.
- Legacy backend/bridge compatibility may remain temporarily while other Snapshot/legacy owners still consume it; removal from this screen does not silently redefine those other contracts.

[CHANGED]
- publication recovery appears beside Publish as `Retry Publish`.
- when selected work is legacy Finalize publication-pending, the same visible recovery location may adapt to the legacy retry mechanics until that legacy lifecycle retires.

Migration:
First remove the interaction-oriented controls from the selected Main Work Window and move publication retry beside Publish. Keep backend compatibility only for remaining separately-owned legacy/Snapshot use cases. Retire backend interaction machinery later only when no remaining owner consumes it.

## Existing Scenario-owned evolution

The following existing steps remain separately owned by `SCN-RPKG-COMPLETE-REPOSITORY-WORK`:
- `EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`
- `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`

The modular package-realization migration can proceed before the reviewed-result workflow. Reviewed-result adoption should consume the modular Apply/Commit/Publish state rather than restore the old ApplyExtent/Resume model.

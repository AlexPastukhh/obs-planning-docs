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
4. New package state does not project/import legacy `Core.ChangeSet`; old works remain owned by the deployed old executable.
5. Automatic `OBS-ACTION apply-package` remains a convenience composition entry: ensure Work Intent/workspace then invoke Apply → Commit → Publish semantics.
6. Manual screen actions use the explicit operation boundaries. There is no user/domain `Resume` action.
7. Runtime cutover then stops creating/updating `Core.ChangeSet` for new-model work and moves Git mechanics behind narrow capabilities.

Forced Migration:
No legacy package state is imported by the new executable. Exact archive identity is mandatory for every new-model `ReplacementPackageState`.

Readiness / proof gate:
- no Feature integration test depends directly on `CoreTests` internals;
- Apply never implicitly Commit/Publishes through the modular service;
- Commit never Publishes;
- Retry Publish confirms `NotConfirmed` before another push;
- `NotConfirmed` is durable before any possible Publish push, so persistence failure cannot authorize a blind side effect/retry;
- exact remote observation survives another operation/restart;
- per-Work locking prevents concurrent new-model package transitions from violating the one-unfinished-package invariant;
- persisted package-state lookup identity is fenced and corrupt state never becomes "absent";
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


## EVO-RPKG-RETIRE-CHANGESET-AGGREGATE — Replace central state bucket with Work-centered owners

Canonical Scenario step:
[`EVO-RPKG-RETIRE-CHANGESET-AGGREGATE`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-retire-changeset-aggregate)

Evolution Kinds: Refactoring / Introduction / Retirement / Forced Migration.

Selected target:
`WorkId` correlates `WorkIntent`, `GitWorkspace` and per-package `ReplacementPackageState`. Work branch is derived from WorkId; worktree remains persisted. Package commit/publication facts never return to a central Work bucket.

Migration decision:
Old persisted works are not imported by the new executable. The deployed old executable remains their owner. New package state starts in `work-state-v2`; schema-1 `changeSetId` remains only a transport alias for WorkId.

Current increment proof:
Aggregate model + package-state persistence are introduced and tested. The consistency correction adds same-commit evidence preservation, exact persisted-key fencing, per-Work cross-instance/process locking and a durable pre-Publish `NotConfirmed` guard. Legacy Core remains a **transitional current runtime authority** until the following cutover increment; it is retired as a target Aggregate owner but is not yet legacy-only at runtime.

## Existing Scenario-owned evolution

The following existing steps remain separately owned by `SCN-RPKG-COMPLETE-REPOSITORY-WORK`:
- `EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`
- `EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW`

The modular package-realization migration can proceed before the reviewed-result workflow. Reviewed-result adoption should consume the modular Apply/Commit/Publish state rather than restore the old ApplyExtent/Resume model.

# SL-RPKG-01 — Replacement Package Realization

Status: active current Slice owner

## Result / Responsibility

Realize one exact replacement package through explicit application operations:

```text
Apply Package
Commit applied
Publish
Retry Publish
```

The operations share one durable `ReplacementPackageState` but have independent operation Results. Automatic `OBS-ACTION apply-package` may compose Apply → Commit → Publish as an entry-adapter/Scenario convenience.

## Domain / state boundary

`ReplacementPackageState` owns durable facts for one Work/package:
- exact package identity (`packageId + archiveSha256`);
- state existence itself proves package-file Apply;
- exact package commit SHA when committed;
- latest durable `PublicationObservation`.

`PublicationObservation`:
- `NotRequested`
- `NotConfirmed`
- `ConfirmedAbsent`
- `ConfirmedTip(sha)`

State is not success/failure. `Result<T,E>` and `OperationResult<E>` represent the outcome of concrete operations.

## Slice Implementation Items

### SI-RPKG-APPLY-JOURNAL-BEFORE-MUTATION
Before first package-file mutation, existing exact prior/intended recovery evidence remains required.

### SI-RPKG-PACKAGE-STATE-DURABLE
After successful modular Apply/Commit/confirmation, write the corresponding `ReplacementPackageState` before a later independent operation relies on it. Persisted state identity is fenced to exact WorkId/packageId and unreadable/corrupt state fails closed rather than becoming "absent".

### SI-RPKG-WORK-OPERATION-LOCK
Apply / Commit / Publish for one Work execute under the same per-Work operation lock; repository save re-enters the same boundary when enforcing the unique unfinished-package invariant.

### SI-RPKG-NO-GENERIC-RESUME
No application/domain API accepts a desired Apply extent or generic Resume request. Retry is local to the operation being retried.

### SI-RPKG-PUBLISH-CONFIRM-BEFORE-RETRY
`PublicationObservation.NotConfirmed` requires exact remote observation before another push. Before a fresh Publish attempt crosses the possible-push boundary, `NotConfirmed` is persisted first; inability to persist that guard blocks the side effect.

### SI-RPKG-NO-LEGACY-PACKAGE-STATE-IMPORT
New-model package state is stored in state-v2 and is never inferred from legacy Core ChangeSet persistence. Old works stay with the deployed old executable.

## Tests

Feature integration tests live in the Feature package and use dedicated test support rather than `CoreTests` internals.

Required proof:
- Apply stops after file application;
- Commit stops after commit;
- Publish proves exact remote tip;
- Retry Publish reconciles unconfirmed publication before another push;
- state persists across repository/service re-instantiation;
- same `packageId` with different proven archive content is rejected;
- operation failure can return current durable package state without treating that state as failure;
- persistence failure before Publish side effect blocks push; persistence failure after push leaves durable `NotConfirmed`;
- two independent state-repository instances cannot create two unfinished packages for one Work.

## Evolution Impact

### EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION
Refactoring / Forced Migration:
remove `ApplyExtent`, `ApplyRequest.Resume`, advance-to-extent orchestration and `PackageApplication`; introduce the explicit operations and `ReplacementPackageState`.

### EVO-RPKG-RETIRE-LEGACY-INTERACTION-SURFACE
Screen impact:
Retry Publish appears with Publish; generic external-interaction controls disappear from the selected Main Work Window. Finalize remains separately owned.

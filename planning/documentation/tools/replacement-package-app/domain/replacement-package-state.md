# Replacement Package State

Status: active target Aggregate owner for modular package realization

## Responsibility

Own durable facts for one exact replacement package realized within one Work. It is shared continuity for Apply Package, Commit Applied and Publish/Retry Publish, but it never represents operation success/failure.

## Domain Concepts / Invariants

`ReplacementPackageState = (WorkId, ReplacementPackageIdentity, commitSha?, PublicationObservation)`.

- existence of the state is proof that exact package Apply succeeded; there is no separate `applied` flag;
- `ReplacementPackageIdentity = packageId + required archiveSha256`; legacy unknown archive identity is not supported by the new EXE;
- commit identity belongs here, not to Work or GitWorkspace;
- publication evidence is `NotRequested | NotConfirmed | ConfirmedAbsent | ConfirmedTip(sha)`;
- Published is derived only when `ConfirmedTip` equals the exact package commit;
- one Work may have many completed package states but at most one unfinished package realization;
- re-proving the same exact commit is idempotent and must preserve existing publication evidence;
- persisted storage identity must match the exact `(WorkId, packageId)` lookup key; corruption never rebinds state to another Work/package;
- Work-mutating package operations are serialized through one durable per-Work operation lock;
- before Publish enters mechanics that may push, `NotConfirmed` is persisted as a conservative uncertainty guard.

## Domain Implementation Items

### DI-RPKG-ONE-UNFINISHED-PACKAGE-PER-WORK
Requirement:
A second different package cannot become unfinished while another package for the same Work is not yet proven published.

Reason:
The expected source/publication boundary for a later package is ambiguous until the earlier package realization is complete.


### DI-RPKG-WORK-MUTATION-SERIALIZED
Requirement:
Apply / Commit / Publish transitions for one Work must execute under one per-Work lock that coordinates independent repository instances/processes. Repository save itself must enforce the unfinished-package invariant under the same lock.

Reason:
Two application processes must not both observe an empty unfinished state and create conflicting package realizations or overlapping Git side effects.

### DI-RPKG-PERSISTED-STATE-KEY-FENCE
Requirement:
A persisted state loaded through `(WorkId, packageId)` must contain the same WorkId/packageId and occupy the canonical storage key for that identity; disagreement fails closed as corrupt/unreadable state.

Reason:
Durable state identity must not be rebound by stale or corrupted file content.

### DI-RPKG-PUBLISH-UNCERTAINTY-GUARD
Requirement:
Before Publish crosses a mechanics boundary that may perform a remote push, durable package state must already be `NotConfirmed`. If that guard cannot be persisted, no push may begin. After the side-effect boundary, failure to persist stronger confirmation leaves `NotConfirmed` as the durable retry authority.

Reason:
A lost response or failed state write after an external side effect must never make restart look like publication was never attempted.

### DI-RPKG-NEW-STATE-DOES-NOT-IMPORT-LEGACY
Requirement:
The new state namespace must not infer or import package state from legacy `Core.ChangeSet` records.

Reason:
The deployed old EXE owns old works; the new EXE starts from the new model and therefore does not need lossy compatibility projection.

## Tests

`WorkAggregateTests` proves state shape, exact archive identity, publication derivation, same-commit evidence preservation, storage-key fencing, per-Work locking, concurrent unfinished-package exclusion and state-v2 isolation from schema-1 legacy files. Feature integration additionally proves legacy-only state rejection, corrupt-state fail-closed behavior and durable Publish uncertainty fencing around persistence failures.

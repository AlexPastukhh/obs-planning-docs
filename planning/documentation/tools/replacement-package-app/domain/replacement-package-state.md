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
- one Work may have many completed package states but at most one unfinished package realization.

## Domain Implementation Items

### DI-RPKG-ONE-UNFINISHED-PACKAGE-PER-WORK
Requirement:
A second different package cannot become unfinished while another package for the same Work is not yet proven published.

Reason:
The expected source/publication boundary for a later package is ambiguous until the earlier package realization is complete.

### DI-RPKG-NEW-STATE-DOES-NOT-IMPORT-LEGACY
Requirement:
The new state namespace must not infer or import package state from legacy `Core.ChangeSet` records.

Reason:
The deployed old EXE owns old works; the new EXE starts from the new model and therefore does not need lossy compatibility projection.

## Tests

`WorkAggregateTests` proves state shape, exact archive identity, publication derivation, unique unfinished-package behavior and state-v2 isolation from schema-1 legacy files. Feature integration additionally proves Commit rejects a legacy-only package state.

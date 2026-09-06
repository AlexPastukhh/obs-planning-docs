# Replacement Package State

Status: active current Aggregate/runtime owner for package realization

## Responsibility

Own durable facts for one exact replacement package realized within one Work. It is shared continuity for Apply Package, Commit applied and Publish/Retry Publish, but it never represents operation success/failure.

## Domain Concepts / Invariants

`ReplacementPackageState = (WorkId, ReplacementPackageIdentity, commitSha?, PublicationObservation)`.

- existence of the state proves that the exact package Apply succeeded; there is no separate `applied` flag;
- `ReplacementPackageIdentity = packageId + required archiveSha256`;
- commit identity belongs here, not to Work or GitWorkspace;
- publication evidence is `NotRequested | NotConfirmed | ConfirmedAbsent | ConfirmedTip(sha)`;
- `NotConfirmed` means publication of the intended commit is not currently proven and exact remote observation is required before any further push; it may be written conservatively before the possible-push boundary;
- Published is derived only when `ConfirmedTip` equals the exact package commit;
- one Work may have many completed package states but at most one unfinished package realization;
- re-proving the same exact commit is idempotent and preserves publication evidence;
- persisted storage identity is fenced to exact `(WorkId, packageId)`;
- Work-mutating package operations execute under one durable per-Work `WorkOperationLock` application boundary; this Aggregate/repository does not own overall Work execution serialization.

## Durable side-effect rules

- Apply journals prior/intended file bytes before mutation under a self-validating integrity digest, rebinds recovery bytes to the captured exact archive payload, and persists this Aggregate only after exact intended bytes are established;
- Commit may recover an exact journal-proven Git commit if commit creation succeeded before package-state persistence;
- before a Publish push can occur, `NotConfirmed` must be durable; if that write fails no push begins;
- after a possible push, failure to persist stronger observation leaves durable `NotConfirmed` as retry authority.

No legacy package state is inferred from `Core.ChangeSet`; old works remain with the deployed old executable.

## Tests

`WorkAggregateTests` proves state shape, exact archive identity, publication derivation, evidence preservation, storage-key fencing, per-Work locking, concurrent unfinished-package exclusion and state-v2 isolation. Feature/Scenario integration proves Apply/Commit recovery, corrupt-state fail-closed behavior, publication fencing, no-blind-retry and sequential packages without `publishedTip`/execution-state authority.

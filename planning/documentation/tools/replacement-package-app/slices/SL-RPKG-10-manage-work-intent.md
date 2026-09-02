# SL-RPKG-10 — Manage Repository Work Intent

Status: active current Slice owner

## Result / Responsibility

Ensure one durable exact GitHub Issue carries the ChangeSet semantic Work Intent before target-mode repository execution; also support the standalone `create-work-intent` operation that stops after this result.

## Scenario behavior realized

FI:
- `FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT`
- planned `FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT`

Behavior Items:
- `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`
- `BI-RPKG-WORK-INTENT-DURABLE`

## Domain used

Work Intent; Repository Target; Repository Work / ChangeSet.

## Slice Implementation Items

### SI-RPKG-WORK-INTENT-DURABLE-CREATE-RECOVERY
Requirement:
Persist exact Issue-create intent before the external create side effect and reconcile by exact `ChangeSet-Id` marker after uncertain/lost response before another create is considered.

Reason:
External Issue truth may exist even when the local transport response was lost.

## Tests

`CoreTests` for external action routing, package Work Intent validation, exact marker identity, durable state/journal, duplicate conflict, uncertain-create reconciliation and Issue-reference propagation. Live GitHub authentication/network is practical/integration environment evidence.

## Evolution Impact

The planned reviewed-result Scenario keeps this FI and owner; later stages consume the same established Work Intent identity.

# SL-RPKG-10 — Manage Work Intent

Status: active current Slice owner

## Result / Responsibility

Ensure one durable exact GitHub Issue carries the semantic Work Intent for one WorkId before target repository execution; also support standalone `create-work-intent`, which stops after this result.

## Scenario behavior realized

- `FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT`
- `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`
- `BI-RPKG-WORK-INTENT-DURABLE`

## Domain used

Work Intent; WorkId; Repository Target.

## Slice Implementation Items

### SI-RPKG-WORK-INTENT-DURABLE-CREATE-RECOVERY
Persist exact Issue-create intent before the external create side effect and reconcile by exact schema-1 `ChangeSet-Id: <WorkId>` marker after uncertain/lost response before another create is considered.

The wire marker is compatibility naming only and does not create or attach runtime authority to `Core.ChangeSet`.

## Tests

Target integration/practical evidence must prove exact marker identity, durable state/journal, duplicate conflict and uncertain-create reconciliation. Live GitHub authentication/network remains environment evidence.

## Evolution Impact

Future reviewed-result/PR/Finalize stages consume the same established Work Intent through WorkId and must not rebuild a central ChangeSet state owner.

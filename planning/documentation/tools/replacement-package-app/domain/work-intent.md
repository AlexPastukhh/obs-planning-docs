# Work Intent

Status: active current Aggregate owner

## Responsibility

Own the durable semantic work identity that must exist before target-mode repository execution. One exact `changeSetId` marker corresponds to one managed GitHub Issue carrying Title / Goal / Why / Acceptance and its verified Issue reference.

## Behavior Items implemented

- `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`
- `BI-RPKG-WORK-INTENT-DURABLE`

## Domain Concepts / Invariants

- Work Intent may exist before a ChangeSet workspace is created;
- the exact `ChangeSet-Id` marker is external identity authority;
- zero exact Issue matches may create, one is adopted/verified, multiple exact matches are conflict;
- an uncertain create side effect is not permission to create another Issue blindly;
- when a ChangeSet exists, its Issue reference must agree with the persisted Work Intent.

## Domain Implementation Items

### DI-RPKG-WORK-INTENT-EXACT-EXTERNAL-IDENTITY — Exact marker owns external identity
Requirement:
Issue lookup/adoption/update/recovery must be keyed by the exact ChangeSet marker rather than title similarity, recency or UI state.

Reason:
One semantic work stream must not fork into multiple external work records.

Derived from:
`BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`.

## Tests

Local Slice proof is owned primarily by [`../slices/SL-RPKG-10-manage-work-intent.md`](../slices/SL-RPKG-10-manage-work-intent.md), including durable create-journal recovery and duplicate-marker failure.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
The planned Complete Reviewed Repository Work Scenario keeps durable Work Intent as its first FI. Later FIs consume that established identity, but their reviewed-result/PR/integration/final-record requirements are not automatically owned by Work Intent.

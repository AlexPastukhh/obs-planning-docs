# Work Intent

Status: active current Aggregate owner with planned ownership migration

## Current Responsibility

Own the durable semantic work identity created/managed by the current App target-mode flow. One exact `changeSetId` marker corresponds to one managed GitHub Issue carrying Title / Goal / Why / Acceptance and its verified Issue reference.

## Current Behavior Items Implemented

- `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`
- `BI-RPKG-WORK-INTENT-DURABLE`

## Current Domain Concepts / Invariants

- Work Intent may exist before a ChangeSet workspace is created;
- the exact `ChangeSet-Id` marker is current external identity authority;
- zero exact Issue matches may create, one is adopted/verified, multiple exact matches are conflict;
- an uncertain create side effect is not permission to create another Issue blindly;
- when a ChangeSet exists, its Issue reference must agree with persisted Work Intent.

## Domain Implementation Items — Current

### DI-RPKG-WORK-INTENT-EXACT-EXTERNAL-IDENTITY

Requirement:
Current Issue lookup/adoption/update/recovery is keyed by the exact ChangeSet marker rather than title similarity, recency or UI state.

Reason:
One semantic work stream must not fork into multiple external work records.

## Tests

Current local Slice proof is primarily owned by [`../slices/SL-RPKG-10-manage-work-intent.md`](../slices/SL-RPKG-10-manage-work-intent.md).

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Planned target ownership changes materially.

Builder `FI-BLDR-START-REPOSITORY-WORK` creates the repository-work Issue and durable work context before ChatGPT development.

Replacement Package App target flow therefore consumes/verifies the exact existing Issue/work identity from the reviewed handoff rather than creating a second independent Issue as the first consumer FI.

Current Work Intent persistence/marker/create-recovery remains current implementation authority until migration. Implementation planning must decide whether the App Work Intent Aggregate:
- narrows to verification/reference of Builder-established work;
- shares lower-level Issue mechanics with a Builder-side owner; or
- is retired/replaced after migration.

No future DI/SI shape is selected here merely by the behavioral ownership change.

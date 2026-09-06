# Work Intent

Status: active current Aggregate owner

## Responsibility

Own the durable semantic identity of one Work: one exact WorkId corresponds to one managed GitHub Issue carrying Title / Goal / Why / Acceptance and its verified Issue reference.

Schema-1 transport and the current managed Issue marker still call WorkId `changeSetId` / `ChangeSet-Id`; this is wire compatibility naming only.

## Behavior Items implemented

- `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`
- `BI-RPKG-WORK-INTENT-DURABLE`

## Domain Concepts / Invariants

- Work Intent may exist before a GitWorkspace is created;
- exact WorkId marker is external identity authority;
- zero exact Issue matches may create, one is adopted/verified, multiple exact matches are conflict;
- an uncertain create side effect is not permission to create another Issue blindly;
- GitWorkspace and package states correlate through WorkId and do not copy Issue identity as their own authority.

## Domain Implementation Items

### DI-RPKG-WORK-INTENT-EXACT-EXTERNAL-IDENTITY
Requirement:
Issue lookup/adoption/update/recovery must be keyed by exact WorkId marker rather than title similarity, recency or UI state.

Reason:
One semantic work stream must not fork into multiple external work records.

## Tests

External Issue proof remains in `SL-RPKG-10`; the completed Work-centered runtime cutover retains the exact-marker invariant without introducing ChangeSet runtime authority.

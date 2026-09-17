# External Interaction

Status: active current Aggregate owner for retained legacy/diagnostic external handoff. Snapshot-related implementation is Evidence only.

## Responsibility

Own one exact current external handoff intent and its truthful lifecycle: exact source/artifact + exact destination + semantic attach/send/cancel/failure/post-Send uncertainty state.

External browser state must not rewrite repository truth.

## Current behavior implemented

Current semantic behavior is limited to retained legacy/diagnostic Current Change handoff and its truthful uncertainty boundaries.

Existing Snapshot handoff/export references in code/tests are **not current Domain behavior authority**. They are Evidence/reuse candidates for [`EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW`](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md).

## Domain Concepts / Invariants

- source/artifact + destination + mode identify actionable semantic intent;
- ordinary terminal outcomes do not need accumulated working-list history;
- `UnknownAfterSend` is attention truth and cannot be rewritten into clean unsent state;
- cancellation before possible Send stops future automation; after possible Send it cannot claim non-delivery;
- retry after a terminal outcome is a new interaction identity;
- destination changes may cancel only safely cancellable older work; already-preparing/possible-Send tasks retain frozen destination.

## Domain Implementation Items

### DI-RPKG-EXTERNAL-INTERACTION-TRUTHFUL-UNCERTAINTY
Requirement:
Once an external Send may have occurred, the Aggregate must preserve that uncertainty until stronger evidence resolves it; UI dismissal may hide attention but cannot rewrite semantic truth.

## Tests

Local Aggregate/bridge proof is realized mainly by `SL-RPKG-08` and the shared ChatGPT handoff capability. Snapshot-oriented tests remain Evidence only until Snapshot materialization.

## Evolution Impact

Repository Snapshot may reuse or change this Aggregate only through [`EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW`](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md).

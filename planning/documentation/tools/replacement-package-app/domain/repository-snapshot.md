# Repository Snapshot

Status: active current Domain Object owner

## Responsibility / Meaning

Represent one exact immutable portable repository-context artifact produced from a selected Local or Committed source state.

## Behavior Items implemented

- `BI-RPKG-SNAPSHOT-READ-ONLY`
- `BI-RPKG-SNAPSHOT-EXACT-SOURCE`
- `BI-RPKG-SNAPSHOT-NO-MIXED-CAPTURE`

Delivery BIs are jointly realized by External Interaction plus the Snapshot delivery Slice.

## Identity / Relationships / Invariants

- artifact identity includes the exact exported bytes/source metadata;
- Local mode represents one proven-stable capture state or no final artifact;
- Committed mode represents one immutable resolved commit;
- successful artifact truth is independent from later browser delivery outcome.

## Domain Implementation Items

No separate `DI-*` is required now. Local stability mechanics are Slice-level orchestration owned by `SL-RPKG-04`.

## Tests

Repository/file consistency proof is owned by [`../slices/SL-RPKG-04-export-repository-snapshot.md`](../slices/SL-RPKG-04-export-repository-snapshot.md).

## Evolution Impact

No selected Scenario Evolution Step currently changes the Snapshot semantic owner.

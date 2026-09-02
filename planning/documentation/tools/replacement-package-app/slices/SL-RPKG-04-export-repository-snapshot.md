# SL-RPKG-04 — Export Repository Snapshot

Status: active current Slice owner

## Result / Responsibility

Produce one exact Local or Committed Repository Snapshot ZIP from the selected Repository Target without changing repository work.

## Scenario behavior realized

FI:
- `FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT`

Behavior Items:
- `BI-RPKG-SNAPSHOT-READ-ONLY`
- `BI-RPKG-SNAPSHOT-EXACT-SOURCE`
- `BI-RPKG-SNAPSHOT-NO-MIXED-CAPTURE`

## Domain used

Repository Target; Repository Snapshot.

## Slice Implementation Items

### SI-RPKG-SNAPSHOT-CONSISTENCY-PROOF — Prove one Local capture state
Requirement:
Local export must verify that inventory/content/source identity used for the artifact remained stable across capture or fail without publishing a mixed final ZIP.

### SI-RPKG-SNAPSHOT-IMMUTABLE-COMMITTED-SOURCE — Resolve Committed source once
Requirement:
Committed mode must resolve the requested ref to one immutable commit identity before reading artifact content.

## Tests

Primary current responsibility: `CoreTests` using disposable repositories/filesystems for Local/Committed bytes/metadata, readiness, index safety, confinement and stability cases.

### Test Items

#### TST-RPKG-SNAPSHOT-FAILURE-PUBLISHES-NO-MIXED-ZIP
Requirement:
Instability/confinement/unsupported-entry negative tests must assert that no misleading final artifact is published.

## Evolution Impact

No selected Scenario Evolution Step currently changes the Snapshot result.

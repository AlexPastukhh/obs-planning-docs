# SL-RPKG-08 — Manage External Interactions

Status: active current Slice owner for retained legacy/diagnostic external interactions. Snapshot-related implementation is Evidence only.

## Result / Responsibility

Persist and project current actionable/attention truth for exact retained browser handoff interactions without accumulating ordinary terminal history or rewriting uncertainty.

## Current behavior realized

Current semantic scope is the retained legacy Current Change / diagnostic handoff path, including truthful uncertainty after possible Send.

Snapshot export/attachment is **not** accepted current semantic behavior. Existing Snapshot-facing code/tests under this Slice are implementation Evidence for [`EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW`](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md). Do not reintroduce `FI-RPKG-DELIVER-REPOSITORY-CONTEXT` or `BI-RPKG-SNAPSHOT-*` as current authority merely because those mechanics exist.

## Domain used

External Interaction.

## Slice Implementation Items

### SI-RPKG-EXTERNAL-INTERACTION-SEMANTIC-IDENTITY
Requirement:
Actionable dedupe/retry/cancel/dismiss decisions must use exact semantic source + destination + intent identity, not row position or presentation text.

### SI-RPKG-UNKNOWN-AFTER-SEND-IMMUTABLE
Requirement:
Once Send may have occurred and cannot be confirmed, later cancellation/dismissal may hide/stop work but must not rewrite the interaction into a clean unsent state.

## Tests

`ChatBridgeTests` remain current proof for the retained interaction mechanics. Snapshot-related cases are Evidence/reuse candidates until Snapshot target realization.

## Evolution Impact

- Current Change delivery may reduce under later workflow changes.
- Repository Snapshot may reuse this Slice or replace its allocation only through [`EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW`](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md).

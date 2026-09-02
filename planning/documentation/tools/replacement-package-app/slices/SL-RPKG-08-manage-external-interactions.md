# SL-RPKG-08 — Manage External Interactions

Status: active current Slice owner

## Result / Responsibility

Persist and project current actionable/attention truth for exact browser handoff interactions without accumulating ordinary terminal history or rewriting uncertainty.

## Scenario behavior realized

Supports:
- `FI-RPKG-DELIVER-REPOSITORY-CONTEXT`
- `FI-RPKG-DELIVER-LEGACY-CURRENT-CHANGE`

Behavior Items:
- `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT`
- `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-UNCERTAINTY-TRUTHFUL`

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

Primary current proof: `ChatBridgeTests` for identity, dedupe, cancellation boundaries, uncertainty persistence/dismissal and retry identity.

## Evolution Impact

Current Change delivery may reduce under the target workflow; Snapshot delivery keeps this Aggregate/Slice useful.

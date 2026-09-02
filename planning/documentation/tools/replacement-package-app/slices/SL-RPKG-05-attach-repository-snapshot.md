# SL-RPKG-05 — Attach Repository Snapshot To ChatGPT

Status: active current Slice owner

## Result / Responsibility

After successful Snapshot creation, create/manage exact Snapshot delivery intent for one frozen conversation and attach or attach+send through the shared ChatGPT handoff capability.

## Scenario behavior realized

FI:
- `FI-RPKG-DELIVER-REPOSITORY-CONTEXT`

Behavior Items:
- `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT`
- `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION`
- `BI-RPKG-SNAPSHOT-DELIVERY-DOES-NOT-CHANGE-REVIEW-BINDING`
- `BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT`

## Domain / Shared capabilities used

Repository Snapshot; External Interaction; [`../shared-implementation/chatgpt-handoff.md`](../shared-implementation/chatgpt-handoff.md).

## Slice Implementation Items

### SI-RPKG-SNAPSHOT-HANDOFF-STARTS-AFTER-EXPORT — Separate artifact success from browser success
Requirement:
Automatic Snapshot interaction may be created only after the exact Snapshot artifact has been successfully published.

Reason:
Browser automation must not become part of Snapshot artifact truth.

## Tests

`ChatBridgeTests` plus relevant Core/source contracts for exact task identity, frozen destination/mode, deadlines and attach-only versus auto-send truth. Live browser behavior remains Practical Acceptance/Evidence.

## Evolution Impact

No selected Scenario Evolution Step changes Snapshot delivery semantics.

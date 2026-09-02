# SL-RPKG-06 — Deliver Current Change To ChatGPT

Status: active current Slice owner

## Result / Responsibility

Deliver the exact persisted legacy ReviewDiff to one intended conversation through the shared handoff capability while preserving truthful cancellation/failure/post-Send uncertainty.

## Scenario behavior realized

FI:
- `FI-RPKG-DELIVER-LEGACY-CURRENT-CHANGE`

Behavior Items:
- `BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-ARTIFACT`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-FROZEN-DESTINATION`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-UNCERTAINTY-TRUTHFUL`
- `BI-RPKG-LEGACY-BROWSER-DOES-NOT-AUTHORIZE-REPOSITORY`

## Domain / Shared capabilities used

Repository Work / ChangeSet; External Interaction; [`../shared-implementation/chatgpt-handoff.md`](../shared-implementation/chatgpt-handoff.md).

## Slice Implementation Items

### SI-RPKG-REVIEW-HANDOFF-USES-PERSISTED-SOURCE — Resolve exact source on invocation
Requirement:
Copy/Open/Send operations must use the exact persisted Current Change source for the captured ChangeSet rather than a mutable screen/text buffer.

## Tests

`ChatBridgeTests` + Node DOM regression + relevant source contracts for exact `.diff` task, binding/token/title resolution, guarded Send, runtime-agent fencing and uncertainty truth.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Refactoring:
Remove Current Change ChatGPT delivery from the ordinary target approval path. Retain only optional diagnostic/support delivery if it remains useful; legacy behavior stays current while legacy ChangeSets exist.

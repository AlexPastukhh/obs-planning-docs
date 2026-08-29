
# SL-RC-01 — Durable Core Capture

Target Module: `TM-IMPLEMENTATION-SLICE`  
Invocation mode shown here: `CREATE → REFINE`

## Primary Scenario

`SCN-RC-CAPTURE`

## Useful Vertical Result

User can durably preserve selected material + source context and receive truthful success/failure feedback.

## Semantic Obligations

```text
Behavior:
  accept capture
  confirm durability truthfully
  report persistence failure

DATA:
  selected material
  source context
  capture result

Domain:
  CaptureItem
  SourceContext

Negative guarantee:
  no false success after persistence failure
```

## Runtime Path

```text
capture action
→ normalized capture input
→ application orchestration
→ CaptureItem / SourceContext rules
→ repository persistence
→ consistency result
→ truthful UI result
```

## Codebase Integration Path

```text
CaptureScreen.onSave()
→ CaptureController.capture(command)
→ CaptureApplicationService.capture(command)
→ CaptureItem.create(...)
→ CaptureRepository.save(item)
→ CaptureController.toResponse(result)
→ CaptureScreen.applyCaptureResult(result)
```

## Testing Handoff

Domain unit proof already exists. Slice proof must focus on real orchestration/persistence/result.

```text
→ testing/slices/SL-RC-01.test-design.md
```

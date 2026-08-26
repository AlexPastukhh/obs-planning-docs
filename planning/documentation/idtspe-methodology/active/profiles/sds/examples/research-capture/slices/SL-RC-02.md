
# SL-RC-02 — Optional Short Thought Extension

Target Module: `TM-IMPLEMENTATION-SLICE`  
Worked TDD interleave: `CREATE semantic pass → Test Design → REFINE same owner`

## Initial Semantic Pass

```text
Role:
  EXTENDING_VERTICAL

Primary Scenario:
  SCN-RC-CAPTURE

Extends:
  SL-RC-01

Useful Vertical Result:
  user may attach an optional short thought
  while all SL-RC-01 durability/feedback guarantees remain true
```

At this point detailed call-level realization is intentionally not frozen.

## TDD Interleave

Next invocation:

```text
TM-TEST-DESIGN
→ testing/slices/SL-RC-02.test-design.md
```

Then this **same Target/file** is reopened in `REFINE` mode.

## Refined Implementation Plan

After proof design:

```text
CaptureScreen.onSave(material, source, thought?)
→ CaptureController.capture(command)
→ CaptureApplicationService.capture(command)
→ CaptureItem.create(material, source, thought?)
→ CaptureRepository.save(item)
→ response / truthful UI result
```

The existing core path is reused; optional-thought handling does not create a separate horizontal Slice.


# Research Capture — Test Strategy

Target Module: `TM-TEST-STRATEGY`

## Entry Gate Evidence

```text
Domain Test Designs:
  CaptureItem — PLANNED
  SourceContext — PLANNED

Slice portfolio:
  SL-RC-01
  SL-RC-02
```

So Strategy can coordinate layers without inventing Domain tests or Slices.

## Layer Responsibility Matrix

### Unit

```text
CaptureItem rules/state cases
SourceContext validation/normalization/equality
```

### Integration — default per Slice

```text
SL-RC-01:
  capture entry
  → application orchestration
  → Domain creation
  → repository/persistence
  → truthful result

SL-RC-02:
  same vertical collaboration
  + optional short thought persistence/recovery
```

### E2E — selective

No per-Slice E2E by default. One later critical browser-to-durable-capture path may be justified after real frontend/server integration exists.

### Practical

```text
reading
→ capture
→ interpret feedback
→ resume reading
→ later recover capture
```

## Non-Duplication Boundary

Integration tests do not enumerate every CaptureItem/SourceContext unit case. They prove collaborators/wiring/persistence/result across Slice boundaries.

## Methodology Direction

```text
Recommended next:
  TM-IMPLEMENTATION-SLICE / SL-RC-01

Then:
  TM-TEST-DESIGN / SL-RC-01
```

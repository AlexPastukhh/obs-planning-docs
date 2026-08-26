
# CaptureItem Test Design

Target Module: `TM-TEST-DESIGN`  
Invocation position: Domain proof, before Slice planning

## Property → Proof

### TD-DOM-CI-01 — selected material required

```text
Layer:
  UNIT

Setup:
  valid SourceContext; missing selected material

Action:
  construct/accept CaptureItem

Assert:
  invalid state is rejected
```

### TD-DOM-CI-02 — SourceContext required

```text
Layer:
  UNIT

Setup:
  selected material; invalid/missing SourceContext

Assert:
  CaptureItem cannot enter accepted state
```

### TD-DOM-CI-03 — valid core state

```text
Layer:
  UNIT

Assert:
  valid material + valid SourceContext can create the intended Domain state
```

## Boundary

These tests prove isolated Domain rules. They do **not** prove repository durability, controller/service wiring or user-visible feedback; those belong to Slice integration proof.

## Methodology Direction

```text
Current Domain owner proof:
  PLANNED

Next:
  continue remaining Domain owners / Domain Test Designs
```

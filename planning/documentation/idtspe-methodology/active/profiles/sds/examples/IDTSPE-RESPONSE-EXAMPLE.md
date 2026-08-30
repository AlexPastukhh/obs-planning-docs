# SDS IDTSPE Response Example — Integration Checkpoint

Status: active worked response projection; not a universal response template

This example shows one compact Integration Checkpoint after planning a vertical
Slice. Generic response/checkpoint mechanics remain owned by IDTSPE Core.

## Current Target

```text
Target: SL-CAPTURE
Module: TM-IMPLEMENTATION-SLICE
Primary Scenario: SCN-CAPTURE
```

## Accepted Target Step Result

```text
RU-SLICE-01 — Outcome / obligations / proof intent
  Useful result:
    user captures one item and receives truthful success/failure
  Behavior:
    B-CAPTURE-SUBMIT
    B-CAPTURE-RESULT
  Proof intent:
    success is reported only after durable acceptance

RU-SLICE-02 — Uses / Ownership Boundary
  Uses CaptureItem:
    create valid item
  Uses SourceContext:
    preserve semantic source context
  XC-AUDIT local obligation:
    supply actor/source context

RU-SLICE-03 — Runtime Path — optional/material here
  capture request
  → selected application coordination
  → Domain acceptance
  → persistence/result

RU-SLICE-04 — Evolution Steps

  ### Add another source type
  Behavioral Source:
    SCN-CAPTURE / Development Change Outlook
  Slice Change:
    capture accepts another selected source variant
  Domain Changes:
    SourceContext represents the new source meaning
  Implementation Outlook:
    preserve one local source-variation boundary;
    do not introduce a generic plugin framework.
```

## Lens Check

```text
Slice Verticality:
  PASS — one useful vertical result / one Primary Scenario

DDD:
  CaptureItem / SourceContext use is semantic, not one-Slice-one-Aggregate mapping

L5 Evolution / Change Isolation:
  new source should not force unrelated Review Slice change

Simplicity:
  no extra framework justified by the accepted future variant
```

Lens observations become accepted State/result changes only through ordinary Core
Finding Disposition/Resolution.

## Persistence / Placement

```text
SL-CAPTURE owner:
  may remain inline in SLICE-STRATEGY.md
  OR use a dedicated Slice file if independent review/size pressure justifies it

Evolution:
  embedded in the same Slice owner by default
```

See `../ARTIFACT-PLACEMENT-MAP.md` for LIGHT/MIXED/COMPLEX owner/file examples.

## Next Direction

```text
proof obvious
→ TM-EXACT-REALIZATION

proof method independently non-trivial
→ TM-TEST-DESIGN
→ TM-EXACT-REALIZATION
```

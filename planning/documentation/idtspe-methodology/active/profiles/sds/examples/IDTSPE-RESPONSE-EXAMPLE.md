# SDS IDTSPE Response Example — Integration Checkpoint

Status: active worked response projection; not a universal response template

This example shows one **situational Integration Checkpoint** after transient Slice Discovery. Generic response/checkpoint mechanics remain owned by IDTSPE Core.

## Situation / Current Work Context

The selected Feature requires truthful failure handling, and concrete realization has become detailed enough that distributed working meaning is worth integrating.

```text
Feature:
  FEAT-CAPTURE-ITEM

Material BR:
  BR-CAP-01 — success is exposed only after durable acceptance

Current Target:
  SL-CAPTURE-DISCOVERY

Module:
  TM-IMPLEMENTATION-SLICE

Relevant Scenario source:
  SCN-CAPTURE-THEN-REVIEW

Relevant Domain source:
  CaptureItem durable owner
```

## Current Target Step Result

```text
RU-SLICE-01 — Whole-Slice Responsibility / Candidate Structure
  responsibility:
    realize FEAT-CAPTURE-ITEM end to end
  candidate structure:
    capture adapter
    CaptureApplicationService
    CaptureItem Domain owner
    persistence boundary

RU-SLICE-02 — Semantic Application Entry / Result Boundary
  entry:
    capture selected material + source context
  result:
    accepted(item-id)
    or rejected/failure with truthful semantics

RU-SLICE-03 — Step-by-Step End-to-End Realization
  adapter input
  → CaptureApplicationService
  → CaptureItem semantic validation/creation
  → repository save
  → semantic result mapping
  → adapter/UI truthful projection

RU-SLICE-04 — Feature Integration Proof
  prove through the semantic application boundary that:
    successful durable acceptance → success
    persistence failure → never success
    forbidden mutation/result states do not escape

RU-SLICE-05 — Evolution / OPEN Slice Pressure
  selected Evolution Step:
    add another source type
  current implication:
    preserve one local source-variation seam only if justified now
```

Only material Units are present. If Evolution had no current consequence, `RU-SLICE-05` would simply be absent.

## Material Core State

```text
Decision:
  CaptureApplicationService owns mapping from repository outcome
  to the semantic capture result.

Risk:
  repository failure could otherwise be reported as success.

Methodology Usage State — retained only because this checkpoint is a handoff/review point:
  Active UC: UC-IDTSPE-INTEGRATE-CURRENT-WORK
  Applied Lenses:
    LENS-SLICE-VERTICALITY-INTEGRATION / CHECK
    LENS-QUALITY-RISK-MATERIALITY / CHECK
  Recheck:
    if persistence/result semantics or the selected Evolution Step changes
```

There is no log of every registry/file read.

## Lens Findings / Disposition

```text
Slice Verticality / Integration:
  current responsibility still forms one coherent end-to-end Feature path

Quality / Risk:
  truthful failure projection is material and must survive realization

Evolution:
  no generic plugin framework justified by the selected future source variant
```

A Lens observation becomes accepted State/result meaning only through normal Core Finding Disposition/Resolution.

## Persistence / Placement

```text
transient Slice Discovery working plan
→ may remain conversational/non-persistent

selected durable end-to-end responsibility
→ TM-SLICE-OWNER when independent durable ownership is useful

exact classes/methods/files/tests
→ implementation-native / TM-EXACT-REALIZATION
```

No `SLICE-STRATEGY.md` or mandatory dedicated Slice file is implied.

See [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md).

## Next Direction

```text
accepted meaning sufficient + proof route obvious
→ TM-EXACT-REALIZATION

proof choice/coverage materially non-trivial
→ LENS-TEST-PROOF-EVIDENCE
→ transient natural-owner proof planning as needed
→ TM-EXACT-REALIZATION

real implemented environment must be observed
→ TM-PRACTICAL-TEST after the real subject exists
```

The checkpoint itself does not force the next Target or implementation action.

# SDS Worked Flow Reference — Research Capture

Status: active compact semantic example

This replaces the former numbered-phase research-capture tree. It demonstrates
current direction without making one physical project tree authoritative.

## 1. Optional Generic Need / Solution Discovery

```text
Need:
  preserve useful research material without losing reading context

Routes considered:
  bookmarks
  existing read-later/notes tools
  manual copy
  small own capture application

Selected own-software contribution:
  very fast capture now + later review/triage
```

## 2. Application Definition

```text
Application contribution:
  capture selected research material/context quickly;
  keep later review separate

Outside:
  replace the browser/reader
  become a universal knowledge-management system
```

A Prototype may test whether capture can actually be low-friction enough.

## 3. Scenarios

```text
SCN-CAPTURE
  current: capture selected material + source context → truthful result
  future/change: additional source types may be added

SCN-REVIEW
  current: review captured items later
  future/change: richer triage may be added
```

If a future independently meaningful “share captured item” result becomes real,
it becomes a new Scenario candidate rather than being forced into `SCN-CAPTURE`.

## 4. Screen — conditional

```text
SCREEN-CAPTURE
  capture action + current source context

SCREEN-REVIEW
  captured-item list/detail
```

Screen owns spatial availability, not frontend implementation.

## 5. Slice Strategy

```text
SL-CAPTURE
  Primary Scenario: SCN-CAPTURE
  Useful result: one item captured with truthful result
  May Change: more source types
  Uses CaptureItem / SourceContext

SL-REVIEW
  Primary Scenario: SCN-REVIEW
  Useful result: captured items can be reviewed
  May Change: richer triage
  Uses CaptureItem
```

Derived Domain view:

```text
CaptureItem
  used by SL-CAPTURE + SL-REVIEW
```

The canonical Strategy layout remains Slice-centric.

## 6. Domain / Aggregate Modeling

Shallow Strategy use may be sufficient at first.

If `CaptureItem` has independently material state/invariant questions, deepen the
same Domain/Aggregate Modeling family:

```text
identity
accepted/rejected state
invariant: accepted item has durable content + source context
```

Code/types/tests may be the durable Domain representation.

## 7. Slice / Aggregate Realization Loop

Possible order:

```text
deepen CaptureItem enough
↔ plan SL-CAPTURE
↔ plan SL-REVIEW
```

There is no required all-Domain-first or all-Slices-first order.

## 8. Slice Evolution

```text
SL-CAPTURE / Add PDF source
  Slice Change: PDF becomes another capture source
  Domain Changes: SourceContext represents PDF source meaning
  Implementation Outlook:
    reuse/localize source variation;
    do not change SL-REVIEW merely because source acquisition changed.
```

L5 evaluates the isolation claim; Simplicity challenges speculative abstraction.

## 9. Exact Realization / Evidence

```text
sufficiently resolved Slice
→ TM-EXACT-REALIZATION
→ exact code/tests
→ Practical Evidence / proof review
→ narrow revalidation only if actual Evidence challenges accepted meaning
```

Physical owner/file layouts are examples only; see `../ARTIFACT-PLACEMENT-MAP.md`.


# Phase 04 — Scenario / Screen System — Research Capture

Status: active worked module-driven example

## Invocation A — Scenario Discovery

```text
TM-SCENARIO-DISCOVERY
→ CREATE scenarios/SCENARIO-CATALOG.md
```

Selected:

```text
SCN-RC-CAPTURE
SCN-RC-REVIEW
```

Deferred:

```text
SCN-RC-TRANSFER
```

## Invocation B — Capture Scenario

```text
TM-SCENARIO-DRAFT / SCN-RC-CAPTURE
→ CREATE scenarios/SCN-RC-CAPTURE.md
```

Scenario DATA and Behavior Items remain embedded/addressable inside that owner.

Local guarantees:

```text
REQ-RC-DURABLE-SUCCESS
REQ-RC-SOURCE-CONTEXT
```

remain Scenario-owned in this example.

```text
TM-REQUIREMENT:
  NOT ACTIVATED
```

because no independent shared Requirement owner is justified.

## Invocation C — Review Scenario

```text
TM-SCENARIO-DRAFT / SCN-RC-REVIEW
→ CREATE scenarios/SCN-RC-REVIEW.md
```

## Invocation D — Screen

Spatial ownership is material:

```text
TM-SCREEN
→ CREATE screens/SCREEN-MAP.md
```

Screen does not redefine Scenario behavior.

## Methodology Direction

Enough Application/Scenario direction now exists for two conditional paths:

```text
Recommended next:
  TM-WEUC EARLY_INTERPRETATION
  because planned capture-source evolution is already known

Then:
  TM-DOMAIN-DISCOVERY
```

If later Screen work exposes missing behavior, the same Scenario file is reopened through `TM-SCENARIO-DRAFT REFINE` rather than creating duplicate Scenario truth.

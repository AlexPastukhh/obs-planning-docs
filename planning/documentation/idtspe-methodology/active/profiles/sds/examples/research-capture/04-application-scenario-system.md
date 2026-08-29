
# Phase 04 — Scenario / Screen System — Research Capture

Status: active worked module-driven example

## Boundary discovery / Target Formation

The focused Scenario-boundary entry inspects the Application behavior space and identifies independently meaningful Need/result boundaries. It does not create a separate Scenario Discovery Target.

```text
selected Scenario Targets:
  SCN-RC-CAPTURE
  SCN-RC-REVIEW

future/deferred Scenario candidate:
  SCN-RC-TRANSFER
```

`scenarios/SCENARIO-CATALOG.md` is kept only as an optional navigation/index projection over Scenario owners and candidates.

## Invocation A — Capture Scenario

```text
TM-SCENARIO-PLANNING / SCN-RC-CAPTURE
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

## Invocation B — Review Scenario

```text
TM-SCENARIO-PLANNING / SCN-RC-REVIEW
→ CREATE scenarios/SCN-RC-REVIEW.md
```

## Invocation C — Screen

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

If later Screen work exposes missing behavior, surface a Scenario Finding Candidate. Core Finding Disposition may select revalidation of the same Scenario through `TM-SCENARIO-PLANNING REFINE` rather than creating duplicate Scenario truth.

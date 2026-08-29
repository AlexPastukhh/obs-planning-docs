
# Research Capture — SDS Planning Context

Status: active worked-example planning-run navigation owner

## Goal

Demonstrate the complete directed IDTSPE workflow for a fictional Research Capture application, including persistent artifact creation, repeated Target invocation, WEUC, Domain-before-Slice proof planning, per-Slice integration proof and post-realization coverage/revalidation.

## Physical Profile

```text
Full
```

This affects addressability only, not semantic quality.

## Canonical Direction

Authoritative workflow:

```text
active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md
```

The `00..11` example chapters are navigation, not a strict chronological loop.

## Worked Target Direction

```text
Need / Reality
→ real-life solution Targets
→ Application Definition
→ Prototype
→ Scenario Discovery / Draft / Screen
→ TM-WEUC EARLY_INTERPRETATION
→ Domain Discovery
→ CaptureItem Domain
→ CaptureItem Test Design
→ SourceContext Domain
→ SourceContext Test Design
→ Slice Strategy
→ Test Strategy
→ SL-RC-01
→ SL-RC-01 Test Design
→ SL-RC-02 semantic pass
→ SL-RC-02 Test Design
→ SL-RC-02 REFINE
→ Practical Test plan
→ realization / execution
→ Test Coverage
→ selective Revalidation
```

## Repeated Invocation Example

```text
slices/SL-RC-02.md

CREATE
→ semantic Slice contract

then Test Design

REFINE
→ same Slice identity/file receives detailed call-level plan
```

## Artifact Rule

The worked run accumulates files under:

```text
application/
scenarios/
screens/
domain/
slices/
testing/
SDS-PLANNING-STATE/
```

Every material IDTSPE response should show current artifact context + Artifact Placement View + Methodology Direction.

## Conditional Owners

```text
TM-REQUIREMENT
  not used for local Scenario rules;
  only if a genuinely shared canonical must-hold appears

TM-TEST-STRATEGY
  used here because Domain unit proof + multiple Slice integration paths + practical proof need coordination

TM-FRONTEND-SLICE
  not promoted in the current worked slice; ordinary frontend Part Plan is sufficient

TM-CROSS-CUTTING-CONCERN
  not currently material
```

## Reopen Rule

Forward direction is normal, but actual Evidence may challenge current meaning; Core Finding Disposition may revalidate/reopen the narrowest current owner:

```text
Scenario
Domain
Slice
Test Design
Workspace Evolution + Current Global Architecture Position
```

Do not restart the whole methodology without evidence that broader ownership is invalid.

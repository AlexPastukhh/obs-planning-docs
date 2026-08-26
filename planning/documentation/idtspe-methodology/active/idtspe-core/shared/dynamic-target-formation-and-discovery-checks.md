
# Dynamic Target Formation — Narrative Guide

Status: active explanatory projection  
Canonical state model: `resolution-slot-and-target-formation-resolution-set.md`

## Purpose

Explain how IDTSPE forms a Target when no existing Target Module already determines the exact planning object.

This file does not define a second numbered mechanism.

```text
Canonical mechanism
= TARGET_FORMATION_RESOLUTION_SET
```

## Formation Outcomes

Before starting a material Target, IDTSPE may conclude:

```text
reuse an existing Target Module
reuse a Target Module with a local specialization
create a one-off Local Target Contract
split one apparent Target into sibling Targets
reuse an existing Target Instance
no new Target is needed
```

A local Target Contract does not automatically become methodology-global.

## Canonical Resolution Flow

### TF-01 PURPOSE_OUTPUT

```text
What independently useful planning result should exist?
```

Bad:

```text
"analyze architecture"
"think about options"
```

Better:

```text
select a synchronization strategy
identify the smallest useful capture Slice
decide whether an own Application is justified
```

### TF-02 TARGET_TYPE_FORM

```text
Which Target Module/local form should own that result?
```

### TF-03 TARGET_SCOPE

```text
What is inside/outside this Target?
```

### TF-04 SOURCE_SET

Resolve actual semantic/Evidence/constraint Sources.

### TF-05 TARGET_RELATIONS

Resolve topology such as:

```text
PART_OF
PARALLEL_WITH
PRECEDES
FLOW_TO
OVERLAPS_WITH
ALTERNATIVE_TO
CONTRIBUTES_TO
```

Topology never silently creates Source authority.

### TF-06 QUESTION_SET

Choose only questions that materially help resolve the Target.

### TF-06A LENS_SET

Compose:

```text
L1-L3 required Core Pack
Target Module Lens Profile
applicable L4/L5/L6/Quality
genuinely local Lens only when needed
```

### TF-07 IDEA_SPACE

Discover materially different answer candidates.

### TF-08 BRANCH_POLICY

Use shallow comparison by default; create Planning Branches only when alternatives imply materially different downstream networks.

### TF-09 HANDOFF

Define what accepted output becomes a downstream Source and for whom.

### TF-10 PERSISTENCE_ADDRESSABILITY

Decide what needs stable addressability and how it should be represented physically.

## High-Level Example — Local Architecture Problem Inside A Slice

Parent Target:

```text
SL-CAP-01
```

During implementation planning, L5 exposes:

```text
three materially different server-integration strategies
with different future provider-change costs
```

A simple Answer Decision is insufficient because each alternative requires its own runtime/dependency investigation.

Target Formation resolves:

```text
TF-01:
  select server-integration strategy

TF-02:
  no reusable Target Module fits exactly
  → Local Target Contract

TF-03:
  only integration responsibility, not entire Slice

TF-04:
  parent Slice
  current API/client
  current server
  accepted Evolution Items

TF-05:
  PART_OF SL-CAP-01

TF-06:
  contract ownership?
  retry semantics?
  provider coupling?
  migration?

TF-06A:
  L1-L3 + L4 + L5 + L6

TF-07:
  direct calls
  feature-local gateway
  shared generic client

TF-08:
  branch only if shallow comparison is insufficient

TF-09:
  accepted strategy returns to SL-CAP-01 as Source

TF-10:
  persist Decision and supporting plan
```

The child Target uses the same IDTSPE Shell; no special Architecture workflow is required.

## High-Level Example — No New Target

User already supplies:

```text
accepted Scenario
accepted Domain
one obvious small Useful Vertical Result
```

Target Formation can conclude:

```text
TM-SLICE-STRATEGY not needed
→ directly form TM-IMPLEMENTATION-SLICE
```

Dynamic formation is therefore also allowed to **avoid unnecessary Targets**.

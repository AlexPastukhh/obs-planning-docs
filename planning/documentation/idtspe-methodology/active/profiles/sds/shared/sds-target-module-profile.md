# SDS Target Module / Lens Profile

Status: active SDS preset  
Purpose: map SDS navigation phases to candidate Target Modules **and cross-cutting Lens checkpoints** while preserving generic Target Formation.

## Core Rule

```text
SDS Phase
→ suggests Target Module candidates + Lens profiles

Target Formation Resolution Set
→ verifies actual Target applicability / scope / Sources / output

Lens Registry
→ supplies required/frequent/target-profile evaluation perspectives
```

Therefore:
```text
preset module ≠ mandatory Target
Lens activation ≠ new Target
```

## Phase Profile

| SDS phase | Candidate Target Modules / Lens work | Typical behavior |
|---|---|---|
| 00 Invocation | orchestration + required Lens setup | no semantic Target required |
| 01 Need / Reality | generic Need/Reality Target when needed | `LENS-NEED-VALUE-SCOPE` + `LENS-AUTHORITY-SOT-REUSE` are core |
| 02 Solution Space | dynamic formation + generic IDTSPE | arbitrary Targets/Branches; frequent Lenses proportional |
| 03 Application Definition | `TM-APPLICATION-DEFINITION`; `TM-PROTOTYPE` conditional | one Application Definition Target; Prototype only for material uncertainty/Evidence |
| 04 Scenario System | `TM-SCENARIO-DISCOVERY`, `TM-SCENARIO-DRAFT`; supporting `TM-REQUIREMENT`, `TM-SCREEN` | Scenario DATA/Behavior are internal Scenario contracts |
| 05 Domain | `TM-DOMAIN-DISCOVERY`, `TM-DOMAIN-DRAFT` | optional; no-Domain valid |
| 06 Delivery Shaping | `TM-SLICE-STRATEGY` | only when decomposition/order itself is material |
| 07 Workspace Evolution / Architecture | `TM-WEUC` when the global Workspace Evolution Map or Current Global Architecture Position needs create/refresh + L4/L5/L6 Workspace Pack | map/global architecture ownership is a Target; L5 evaluates concrete Targets or whole-Workspace architecture; bounded local architecture child Target only on generic escalation |
| 08 Detailed Realization | `TM-IMPLEMENTATION-SLICE`; `TM-FRONTEND-SLICE` / `TM-CROSS-CUTTING-CONCERN` conditional | one vertical Slice Target; child/specialized Targets only when independently material |
| 09 Consistency / Verification | `UC-IDTSPE-REVIEW-CONSISTENCY`; `TM-TEST-STRATEGY`, `TM-TEST-DESIGN`, `TM-PRACTICAL-TEST` | review + proof planning; tests never become semantic authority |
| 10 Authorized Realization | execution/Artifact/File Pack | not automatically a semantic Target |
| 11 Evidence / Reconciliation | `TM-TEST-COVERAGE` + revalidation + frequent Lens refresh | reopen narrowest challenged owner/Decision only |

## Required Lens Inheritance

Every material Target checks:

```text
L1 LENS-NEED-VALUE-SCOPE
L2 LENS-AUTHORITY-SOT-REUSE
L3 LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY
```

L3 may resolve immediately as `no material uncertainty`; it does not force research.

Frequent gates are checked proportionally:

```text
L4 LENS-DEPENDENCY-CHANGE-IMPACT
L5 LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
L6 LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY
LENS-QUALITY-RISK-MATERIALITY
```

For substantial Workspace/codebase/repository planning, L4–L6 are the default conditional Workspace Pack.

Target-profile reusable Lens packs are selected by each module's `## Lens Profile`.

## Scenario Composite Rule

```text
TM-SCENARIO-DRAFT
  ↔ internal Scenario DATA contract
  ↔ internal Behavior Item contract
  ↔ TM-REQUIREMENT — supporting/exceptional
  ↔ TM-SCREEN — conditional spatial owner
```

Separate Target Instance only when the supporting concern has independent useful/revalidatable choice surface.

## Architecture Escalation Rule

```text
current local Target
+ LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
→ architecture finding / Idea / local Answer Decision

local Decision becomes applicable across independent Targets
→ global architecture-position update candidate
→ TM-WEUC
```

Whole-Workspace architecture review is also valid:

```text
TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
+ LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
→ project-global architecture principles/defaults/conventions
→ Current Global Architecture Position
```

Only if a bounded architectural problem itself becomes independently useful/revalidatable:
```text
→ generic Target Formation
→ bounded local architecture Target
→ same Lens Pack
```

There is no dedicated `TM-ARCH-DECISION`. `TM-WEUC` owns creation/refresh of the canonical `SDS-WORKSPACE-EVOLUTION.md` and its Current Global Architecture Position; the WEUC Lens applies that owner cross-cutting.

## Correct-Module / Lens Selection Check

```text
What accepted output is needed now?
Does a Target Module own that recurring output methodology?
Which reusable Lenses are required/profiled/applicable?
Would a Lens finding stay within current Target authority?
Would a new Target create independent useful output or only ceremony?
```


## TM-WEUC / Lens Boundary

```text
TM-WEUC
  create/refine/extend/reconcile global SDS-WORKSPACE-EVOLUTION.md
  own Current Global Architecture Position

LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
  consume current map inside a concrete Target
  or evaluate whole Workspace architecture through TM-WEUC scope
  plan target-local evolution
  check change isolation/prepared seams
  evaluate architecture fitness
  emit map/global-architecture update candidate back to TM-WEUC
```


## Directed Workflow Attachment

Canonical cross-Target ordering is not inferred from numeric Phase labels. Use:

```text
directed-methodology-workflow-and-next-step-resolution.md
```

Testing-specific direction:

```text
Domain Draft per owner
→ per-Domain Test Design when material
→ Slice Strategy / selected Slice portfolio
→ conditional Test Strategy
→ per-Slice Implementation Slice ↔ per-Slice Test Design
```

TDD may interleave Slice Test Design before the detailed call-level Slice plan, but only after the Slice semantic result/obligations are stable.

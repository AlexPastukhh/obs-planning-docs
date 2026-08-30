# SDS Target Module / Lens Profile

Status: active SDS preset  
Purpose: map SDS navigation phases to candidate Target Modules **and cross-cutting Lens checkpoints** while preserving generic Target Formation.

## Core Rule

```text
SDS Phase
→ suggests Target Module candidates + Lens profiles

Target Formation Resolution Set
→ verifies actual Target applicability / scope / Sources / output

Optional Target Module Knowledge Basis
→ may select/reference reusable target-family theory when it materially helps the module

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
| 03 Application Definition | `TM-APPLICATION-DEFINITION`; `TM-PROTOTYPE` conditional | Prototype is a separate practical-evidence Target when material uncertainty needs a planned pre-implementation experiment/data collection |
| 04 Scenario System | `TM-SCENARIO-PLANNING`; supporting `TM-REQUIREMENT`, `TM-SCREEN` | one Scenario owner; DATA/Behavior Items are processed internal contracts; Development/Change Outlook stays Scenario-local |
| 05 Domain | `TM-DOMAIN-DISCOVERY`, `TM-DOMAIN-DRAFT` | optional; no-Domain valid |
| 06 Delivery Shaping | `TM-SLICE-STRATEGY` | only when decomposition/order itself is material |
| 07 Workspace Evolution / Architecture | `TM-WEUC` when the global Workspace Evolution Map or Current Global Architecture Position needs create/refresh + L4/L5/L6 Workspace Pack | map/global architecture ownership is a Target; L5 evaluates concrete Targets or whole-Workspace architecture; independently substantial local architecture work → Target Formation candidate; Target Formation may form a bounded local Target |
| 08 Detailed Realization | `TM-IMPLEMENTATION-SLICE`; `TM-FRONTEND-SLICE` / `TM-CROSS-CUTTING-CONCERN` conditional | one vertical Slice Target; independently material specialized work becomes a Target Formation candidate rather than an automatic child Target |
| 09 Consistency / Verification | `UC-IDTSPE-REVIEW-CONSISTENCY`; `TM-TEST-STRATEGY`, `TM-TEST-DESIGN`, `TM-PRACTICAL-TEST` | review + proof planning + implemented practical Evidence; `TM-PRACTICAL-TEST` intent/collection planning may precede realization, while actual Evidence/results require the real implemented subject; Evidence never becomes product semantic authority |
| 10 Authorized Realization | execution/Artifact/File Pack | not automatically a semantic Target |
| 11 Evidence / Reconciliation | `TM-TEST-COVERAGE` + revalidation + frequent Lens refresh | Core Finding Disposition selects revalidation/reopen of the narrowest challenged owner/Decision only when warranted |

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

Target-profile reusable Lens packs are selected separately through each module's `## Lens Profile`. A Target Module may also use a Knowledge Basis when reusable theory materially helps; Generic Core does not require one fixed Knowledge Basis section, mode or load-policy shape, and `TM-SCENARIO-PLANNING` intentionally needs no separate Knowledge Basis now.

## Scenario Composite Rule

```text
TM-SCENARIO-PLANNING
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
→ architecture/evolution Finding Candidate(s) + optional likely-owner hints
→ Core Finding Disposition
→ dispositioned local Idea / Q/R/P / Answer Decision input when the current Target is the resolved owner

local Decision may become applicable across independent Targets
→ global architecture-position update Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ TM-WEUC global position update when that owner/handoff is selected
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
→ surface a Target Formation candidate
→ Target Formation decides reuse existing Target / handoff existing owner / form new bounded local architecture Target
→ any selected/formed architecture Target uses the same Lens Pack
```

There is no dedicated `TM-ARCH-DECISION`. `TM-WEUC` owns creation/refresh of the canonical `SDS-WORKSPACE-EVOLUTION.md` and its Current Global Architecture Position; the WEUC Lens consumes/evaluates that global owner cross-cutting without inheriting its semantic authority.

## Correct-Module / Lens Selection Check

```text
What accepted output is needed now?
Does a Target Module own that recurring output methodology?
Which reusable Lenses are required/profiled/applicable?
Would Core Finding Disposition resolve this Lens Finding Candidate within the current Target, another existing owner, or Target Formation?
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
  surface map/global-architecture update Finding Candidate + likely TM-WEUC owner hint
  let Core Finding Disposition resolve actual global owner/handoff
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

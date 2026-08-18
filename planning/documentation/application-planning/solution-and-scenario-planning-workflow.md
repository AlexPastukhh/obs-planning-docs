# Solution And Scenario Planning Workflow

Status: active reusable workflow
Scope: repeated whole-solution planning and, when Application responsibility exists, Spine-assisted Scenario discovery followed by detailed Scenario/Screen/Domain/Slice planning.

## Whole-Solution Flow

```text
source / current context
→ clarify Need / Desired Result
→ capture Current Reality when useful
→ inspect existing solutions / alternatives proportionally
→ formulate whole Solution / Workflow Variants when material
→ use shared Idea Review/Deep Planning for answer-seeking uncertainty
→ evaluate local + integrated/combination quality
→ select current whole-solution responsibility
```

Do not force a custom application, branch, prototype, research exercise or artifact merely because the methodology supports it.

## Application Handoff

When Application responsibility is justified/already confirmed:

```text
selected application responsibility
→ optional Spine Scenario(s) while boundaries are unclear
→ discover independently meaningful Scenarios
→ register Application Use Cases
→ create detailed Scenario Draft workspaces
   + shared/local Ideas
   + Scenario DATA
   + Behavior Items
   + Scenario visual material
→ add Screen spatial owners when useful
→ add Domain owners when useful
→ add Implementation Slices when useful
→ derive verification/testing evidence proportionally
→ review cross-Scenario / Screen / Domain / Slice / whole-application consistency
```

Shared detailed-planning contract: [`detailed-planning/README.md`](detailed-planning/README.md).

## Spine Use

Use a Spine only when a concrete end-to-end traversal helps expose missing behavior or Scenario boundaries. Revise/split it as real Scenarios emerge. Do not preserve a Spine as a parallel permanent behavior owner or grow it into a generic Draft Workspace layer.

## Scenario Discovery

For each candidate boundary ask:

```text
Is there a meaningful user Need?
Is there an independently meaningful observable result?
Can the behavior be understood/tested/re-entered/reused independently enough to justify a boundary?
```

Instrumental sub-steps remain inside the parent Scenario.

## Application Use-Case Registration

Every independently useful current application capability gets one semantic Use Case with trigger/purpose/result/boundaries and Scenario owner route(s). Detailed behavior stays in Scenario owners.

## Detailed Scenario Work

Each detailed Scenario uses one workspace with standard `ideas/`, `data/`, `behavior/`, `visual/` areas. Meaning shared by several Scenarios belongs at the Scenario collection level rather than being copied into every Scenario.

Detailed owner state follows:

```text
semantic body
→ Current Decisions
→ Q/R/P relative to Current Draft Plan
→ Potential Better Routes when material
```

Use scoped Idea work only when a real answer-seeking question deserves it.

## Variant Work

Do not create explicit Variant structure while only one integrated design exists. When a second materially distinct whole-unit design appears:

```text
existing root design
→ implicit/explicit VAR-A

new design
→ VAR-B candidate

compare as semantic peers
→ local evaluation
→ integrated evaluation
→ select exactly one current Variant
```

The first Variant need not be physically moved under `variants/`. Variant-local supporting material records only real differences; unchanged meaning stays shared/parent-owned.

Runtime branches and local Idea Variants are not whole Scenario Variants.

## Screen Planning

Create Screen owners only when spatial/screen UI benefits from separate ownership.

Screen planning answers spatial questions: boundary, zones, composition, visual states and Scenario-to-space relations. Scenario owners continue to own actor behavior/result/acceptance. Do not create Screen-local DATA/Behavior copies.

## Domain / Slice / Verification

Create Domain only when a separate conceptual language/lifecycle/rules owner materially helps.

Create Slice only when understood behavior can form a separately deliverable/checkable integrated increment. A Slice may split implementation-part plans such as frontend/server when useful while retaining one integrated Slice owner.

Verification derives from Scenario Acceptance, Behavior Items, Domain invariants when present and the Slice verification target. Tests are evidence, not semantic authority.

## Integration Loop

```text
local Idea / Scenario / Screen / Domain / Slice conclusion
→ identify affected owners
→ integrate/review into whole application/workflow
→ review neighboring Scenarios and relevant spatial/domain/delivery owners
→ confirm unchanged or revise selected meaning
→ return to whole solution when material
```

Best local result is not automatically best integrated solution.

## Current Reality / Research / Prototypes

Use only as needed to resolve real uncertainty. Evidence updates affected Ideas, selected solution meaning and current owners; it does not create an automatic architecture decision.

## Repository Boundary

This workflow plans meaning only. Repository file updates require the file-update/update/package routes and their explicit permissions.

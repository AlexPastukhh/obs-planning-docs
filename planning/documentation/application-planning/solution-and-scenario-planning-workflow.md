# Solution And Scenario Planning Workflow

Status: active reusable workflow
Scope: repeated whole-solution planning and, when Application responsibility exists, Spine-assisted Scenario discovery followed by detailed Scenario/Screen/Domain/Slice planning.

## Whole-Solution Flow

```text
source / current context
→ clarify Need / Desired Result
→ capture Current Reality when useful
→ model complete real-world problem-resolution Workflow Variant(s) when sequence/context matters
→ mark Open Solution Slot(s) where Need/input/output are known but the best fill is not
→ inspect existing solutions / alternatives proportionally
→ classify materially relevant existing routes as viable / rejected / needs evidence
→ formulate candidate slot fills / whole Solution / Workflow Variants
→ review Application Concept candidate(s) when own software may be useful
→ use shared Idea Review/Deep Planning for answer-seeking uncertainty
→ evaluate local + integrated/combination quality
→ compare Application Concept against viable existing alternatives while custom-vs-existing remains open
→ select current whole-solution responsibility
```

Do not force a custom application, branch, prototype, research exercise or artifact merely because the methodology supports it.

### Real-World Workflow And Open Solution Slots

When the problem is solved through a sequence, keep the user's real-world context visible from problem to primary result. Application use may occupy one step or several steps inside that larger path rather than becoming the path itself.

An Open Solution Slot records proportionally:

```text
context / what happened before
user-world Need
available inputs/resources
desired output / intermediate result
constraints when material
continuation after the output
relation to the primary Desired Result
candidate fills when known
```

Different Workflow Variants may move, split, combine or eliminate slots. A slot is a planning surface, not a mandatory new owner/entity.

### Existing Alternatives

Do not let checked existing solutions disappear merely because a custom idea appears. When an existing product/process/integration materially covers the relevant Need/slot, keep it as a viable comparator until the custom-vs-existing decision is actually resolved.

## Application Concept Review

Use Application Concept planning when own software is a material candidate, or when application creation is already confirmed but the value/feasibility concept is not grounded.

Review proportionally:

```text
real-world Need / slot coverage
concept statement / simplification mechanism
what users would be able to do / know / obtain
Concept Features
interaction / solution hypotheses
technical feasibility / likely shape
important implementation unknowns / dependencies
rough development complexity / effort / time
maintenance / support burden
estimate assumptions / confidence
viable existing alternatives
local + whole-solution integrated evaluation
current worth-it conclusion
```

Technical shape here exists only to judge feasibility/cost. Do not turn Concept review into detailed architecture or Slice planning. Prefer ranges/relative complexity and confidence over false precision; use research/prototype evidence when an unknown can change selection.

An Application Concept can be rejected in favor of an existing/process route. That is a successful result.

## Application Handoff

When the selected whole solution includes own Application responsibility, or that responsibility is already explicitly confirmed:

```text
selected/current Application Concept
→ explicit Application responsibility / inside-outside boundary
→ candidate/current Application Use Cases grounded in real-world Needs/results
→ optional Spine Scenario(s) while behavioral boundaries are unclear
→ discover independently meaningful Scenarios
→ validate / split / merge Application Use Cases from discovered Scenario coverage
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
→ return to Application Concept / real-world workflow / whole solution when material
```

If application responsibility is externally mandated, do not manufacture a custom-vs-existing decision merely to satisfy the flow; still ground the Concept, real-world Need coverage and application boundary.

Shared detailed-planning contract: [`detailed-planning/README.md`](detailed-planning/README.md).

## Spine Use

Use a Spine only when a concrete end-to-end traversal helps expose missing behavior or Scenario boundaries. Revise/split it as real Scenarios emerge. Do not preserve a Spine as a parallel permanent behavior owner or grow it into a generic Draft Workspace layer.

## Scenario Discovery

For each candidate boundary ask:

```text
1. What meaningful user-world Need motivates this behavior?
2. What independently meaningful observable result is obtained?
3. What user/actor-visible behavior or information interaction bridges them?
4. Would the informational result still matter if no mutation/later command follows?
5. Is this candidate merely a command, UI action, Screen, API/backend/implementation operation?
6. Is it only an instrumental sub-step of a larger Need/result unit?
7. Do re-entry/reuse/wait/handoff/independent acceptance signals strengthen a separate boundary?
```

A read-only/informational Scenario is valid when trustworthy information/understanding itself is an independently meaningful result. Showing one field, opening one view or executing one implementation command is not sufficient by itself.

```text
command identity
≠ Scenario identity
```

A Scenario may contain one or many commands/actions, and one command may happen to implement most of one Scenario. The Scenario exists because of the Need/result behavioral boundary, not the command name.

Technical requirements/implementation constraints remain constraints unless they create required user-visible behavior that participates in an independently meaningful Need/result; the mechanism itself is not a Scenario.

## Application Use-Case Registration

Every independently useful current application capability gets one semantic Use Case with trigger/purpose/result/boundaries and Scenario owner route(s). Ground Need/Purpose in real user/work outcomes rather than merely application commands. Candidate Use Cases may come from the selected Concept and are validated/split/merged during Scenario discovery. Detailed behavior stays in Scenario owners.

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

Screen planning answers spatial questions: boundary, zones, composition, visual states and Scenario-to-space relations. Every material Scenario↔Screen relation is discoverable from both sides: Scenario names the Screen/role/flow relation and Screen names the Scenario/relevant zones or states. Scenario owners continue to own actor behavior/result/acceptance. Do not create Screen-local DATA/Behavior copies.

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

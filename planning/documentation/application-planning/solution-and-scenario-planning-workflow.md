# Solution And Scenario Planning Workflow

Status: active reusable workflow
Scope: repeated whole-solution planning and, when own Application responsibility exists, progressive Concept → Prototype → Scenario/Screen → optional Domain/Slice planning.

Cross-cutting Requirement/change semantics: [`requirements-and-change-context.md`](requirements-and-change-context.md)

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

Do not force a custom application, prototype, research exercise, Domain, Slice Strategy or other artifact merely because the methodology supports it.

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

Technical shape here exists only to judge feasibility/cost. Do not turn Concept review into detailed architecture or Slice planning. Prefer ranges/relative complexity and confidence over false precision.

A decision-sensitive technical uncertainty may use a feasibility spike/research experiment inside Concept work. That differs from `UC-PLAN-PROTOTYPE`, whose purpose is provisional interaction/workflow/spatial planning.

An Application Concept can be rejected in favor of an existing/process route. That is a successful result.

## Application Handoff

When the selected whole solution includes own Application responsibility, or that responsibility is already explicitly confirmed:

```text
selected/current Application Concept
→ explicit Application responsibility / inside-outside boundary
→ candidate/current Application Scenarios grounded in real-world Needs/results
→ Prototype Planning when material interaction/workflow/spatial uncertainty remains
   → Prototype Scenarios
   → Prototype Screens
   → candidate Requirements
   → candidate Scenario DATA / Behavior
   → Future Scenario Ideas / Change Axes when material
→ discover independently meaningful current Scenarios
→ validate / split / merge Application Scenarios from prototype/discovered Scenario coverage
→ create detailed Scenario Draft workspaces
   + shared/local Ideas
   + Scenario DATA
   + Behavior Items
   + Scenario visual material
   + Related Requirements
→ add canonical Screen spatial owners when useful
→ add Domain owners when useful
→ add Slice Strategy when implementation decomposition/order materially helps
→ add individual Implementation Slices when useful
→ derive verification/testing evidence proportionally
→ review cross-Scenario / Screen / Requirement / Domain / Slice / whole-application consistency
→ return to Application Concept / real-world workflow / whole solution when material
```

If application responsibility is externally mandated, do not manufacture a custom-vs-existing decision merely to satisfy the flow; still ground the Concept, real-world Need coverage and application boundary.

Prototype workflow: [`prototype-planning-workflow.md`](prototype-planning-workflow.md).

Shared detailed-planning contract: [`detailed-planning/README.md`](detailed-planning/README.md).

## Prototype Planning

Use `UC-PLAN-PROTOTYPE` only when concrete provisional interaction/spatial work is useful before canonical Scenario/Screen ownership.

Prototype output may contain `PSCN-*` Prototype Scenarios and `PSCR-*` Prototype Screens, candidate Requirements/DATA/Behavior and evolution observations. These are evidence/provisional planning and do not become current `SCN-*` / `SCR-*` truth automatically.

When a lightweight end-to-end representation helps discover boundaries, use a rough walkthrough/sketch/sequence as disposable evidence rather than a named planning entity:

```text
concrete user situation
+ meaningful Need
→ plausible end-to-end navigation / information / actions / responses
→ intermediate/final meaningful result
→ discover candidate Scenario / Screen / Requirement / DATA / Behavior boundaries
```


## Scenario Discovery

Use selected Concept/Application responsibility, candidate/current Application Scenarios and prototype evidence when present.

For each candidate current boundary ask:

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

Technical requirements/implementation constraints remain Requirements/constraints unless they create required user-visible behavior that participates in an independently meaningful Need/result; the mechanism itself is not a Scenario.

During discovery also preserve, when genuinely supported:

```text
Future Scenario Ideas
→ not current Scenario truth

Change Axes
→ evidence-backed expected variation
→ input to later Domain/Slice stress checks
→ not authorization to generalize now
```

## Scenario ↔ DATA ↔ Behavior Discovery Loop

Scenario planning is iterative. Do not wait for a supposedly final Scenario before decomposing DATA and Behavior, and do not treat DATA/Behavior as passive documentation written only after the Scenario is settled.

```text
Real-Life Need / selected Application responsibility
→ candidate Scenario boundary
→ Scenario DATA discovery
→ Behavior Item discovery
→ missing information / branch / invariant / outcome becomes visible
→ refine / split / merge Scenario when evidence requires
→ refine DATA / Behavior
→ repeat until the selected Scenario boundary and its addressable meaning are coherent enough for the current planning depth
```

Useful feedback examples:

```text
Behavior needs information the Scenario never obtains
→ Scenario/DATA gap

DATA appears only because an implementation schema has a field
→ remove from Scenario DATA unless user/scenario meaning requires it

Behavior branch produces a separately meaningful Need/result
→ re-evaluate Scenario split

several Behavior Items depend on one must-hold rule
→ preserve it for Requirement/Domain discovery instead of hiding it in prose
```

The loop refines one current plan. It does not authorize implementation details to redefine user-visible behavior.

## Application Scenario Registration

Every independently useful current application Need/result boundary is represented by an Application Scenario with stable identity, status and owner route in the application's Scenario Catalog. Ground Scenario identity in real user/work outcomes rather than merely application commands, screens or implementation operations.

Candidate Scenarios may come from the selected Concept, be explored by Prototype Scenarios and then be validated/split/merged during current Scenario discovery. Detailed behavior and trigger/context/result/boundaries stay in the Scenario owner; do not add a parallel Application Use-Case alias layer.

## Requirements

A Requirement is a must-hold condition/property/constraint, not a Scenario identity. Prototype/Scenario/Screen work may discover Requirements and route them to their narrowest canonical owner.

Use [`requirements-and-change-context.md`](requirements-and-change-context.md) for status, stability, placement, Change Axes and implementation-scoped Ideas.

## Detailed Scenario Work

Each detailed Scenario uses one workspace with standard `ideas/`, `data/`, `behavior/`, `visual/` areas. Meaning shared by several Scenarios belongs at the Scenario collection level rather than being copied into every Scenario.

Detailed owner state follows:

```text
semantic body
→ Current Decisions
→ Area Concern Register when material
→ Planning Concerns / Q/R/P + Concern Groups relative to Current Draft Plan
→ retained Concern/Decision trace when material
→ Potential Better Routes when material
```

Use the shared `../planning-concerns-and-decisions-model.md` for generic concern/group/priority/category/AI-comment/Decision-retention semantics. Use scoped Idea work only when a real answer-seeking question deserves it. Link relevant Requirements rather than copying or turning them into flow steps mechanically.

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

```text
Scenario / Behavior
→ when/why interaction happens, what actions mean, transitions/results

Screen
→ spatial boundary, zones, hierarchy, placement, visibility/arrangement, visual/layout states

frontend Slice
→ implementation mechanism that realizes selected behavioral/spatial Requirements
```

Every material Scenario↔Screen relation is discoverable from both sides. Scenario owners continue to own actor behavior/result/acceptance. Do not create Screen-local DATA/Behavior copies.

`Scenario/visual/` visualizes journey/flow/transition. `Screen/visual/` visualizes spatial composition. Do not use either as accidental frontend implementation authority.

## Domain Planning

Create Domain only when separate conceptual language/lifecycle/rules/boundaries materially help. Follow [`domain-planning-workflow.md`](domain-planning-workflow.md): derive stable semantics from current Scenarios/Requirements, distinguish invariant from policy, use justified Change Axes to stress boundaries and reject abstractions justified only by speculation.

A valid Domain-planning result may be that no separate Domain owner is necessary.

## Slice Strategy / Slice Planning

Follow [`slice-planning-workflow.md`](slice-planning-workflow.md).

```text
UC-PLAN-SLICE-STRATEGY
→ selected vertical decomposition/order when that decision itself matters

UC-PLAN-SLICE
→ one selected separately deliverable/checkable integrated increment
```

A simple project may skip explicit strategy and/or separate Slice owners. Frontend/server/verification plans are parts of one Slice, not separate Use Cases by default.

## Verification

Verification derives from current semantic owners:

```text
Scenario Acceptance
+ Behavior Items
+ Requirements
+ Domain invariants when present
+ Slice verification target
→ planned verification evidence
```

Tests are evidence, not semantic authority.

## Integration Loop

```text
local Idea / Prototype finding / Scenario / Screen / Requirement / Domain / Slice conclusion
→ identify affected owners
→ integrate/review into whole application/workflow
→ review neighboring current owners
→ confirm unchanged or revise selected meaning
→ return upstream to Concept / whole solution when material
```

Domain/Slice planning may expose an upstream inconsistency or unreasonable implementation cost. Return it as an explicit finding/review need rather than silently redefining product/behavior truth.

Best local result is not automatically best integrated solution.

## Repository Boundary

This workflow plans meaning only. Repository file updates require the file-update/update/package routes and their explicit permissions.

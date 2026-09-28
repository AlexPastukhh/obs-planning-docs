<a id="application-solution-scenario-planning"></a>
# Solution And Scenario Planning Workflow

Responsibility ID: `APP.SOLUTION-SCENARIO-PLANNING`

> **Compatibility vocabulary boundary.** This supporting file preserves older application-planning discovery/workspace heuristics. Terms such as `Scenario DATA`, `Behavior Items`, standalone `Requirement`, or `Slice Strategy` below do not define current SDS owner identities. Current authority is the active SDS Target/Lens registries: Feature owns behavior/semantic data, Scenario owns the real-life actor/external/Application journey and Application Contributions (including provisional behavior while Feature ownership is OPEN), requirements stay with natural Feature/Domain/Slice/Shared owners, and Slice Strategy is not an active Target family. Use older terms only as supporting heuristics where they do not conflict with current owners.


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
→ use canonical Proposal candidate review for answer-seeking uncertainty
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

## Application Definition / Concept Review

Use current SDS Application Definition planning when own software is a material candidate, or when application creation is already confirmed but its justification/focus/feasibility is not grounded.

Keep the responsibilities separate:

```text
RU-APP-05 — concise Application Concept
RU-APP-02 — Existing-Solution / Reference Position
RU-APP-08 — Own-Application Justification / Key Behavior Focus
RU-APP-07 — Realization Feasibility / Early Implementation Planning
```

The Application Definition does not own full real-life journeys or a Benefit→Scenario coverage catalog. `KBF-*` is optional addressability for key behavior focus, not a Feature or Requirement.

When the selected whole solution includes own Application responsibility, or that responsibility is already explicitly confirmed:

```text
selected/current Application Definition when material
↕ real-life Need/workflow evidence may also form Scenario first
→ Prototype Planning when material interaction/workflow/spatial uncertainty remains
→ discover materially distinct real-life Scenario journeys
   → normative SPS-* path + Application Contributions
   → step-attached / Scenario-wide SR-* when independently useful
   → Feature Resolution OPEN with provisional behavior planning when needed
   → resolve coherent Features when supported; Features record realized SPS/SR meaning
→ Screen planning maps participating SPS to spatial presentation and Screen-local SCR-* / SCR-G-*
→ register concrete Evolution Steps and material Application/Scenario driver coverage in the Map
→ add Domain, Slice and Shared Target Bodies when materially required
→ realization, proof/revalidation and Target Owner Materialization
↺ evidence may revalidate Scenario, Application Definition and neighboring owners
```

The sequence is orientation, not a compulsory waterfall. Scenario may precede Application Definition or Feature when the real-life path is already grounded.

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

Use Need/workflow evidence, material Application Definition key-behavior/feasibility pressure when available, actor/external context,
existing Scenario/Feature evidence when present and prototype evidence when
material. Do not wait for a Feature identity before forming a Step-owned
Scenario Target with Application Contributions.

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
Future Scenario Proposals
→ not current Scenario truth

Change Axes
→ evidence-backed expected variation
→ input to later Domain/Slice stress checks
→ not authorization to generalize now
```

## Scenario Contribution ↔ Feature Boundary Discovery Loop

Scenario planning is iterative. Use real-life path and Application Contribution
pressure before assuming Feature identity. While ownership is OPEN, provisional
behavior and data pressure may be explored in the Step-owned Scenario; once a
coherent Feature boundary is selected, detailed behavior and semantic data move
to its Step-owned Feature Target Body.

```text
Real-Life Need / Application Definition key-behavior pressure
→ candidate real-life Scenario path / Application Contributions
→ provisional behavior, information, failure and continuity pressure while Feature OPEN
→ refine / split / merge materially distinct Scenario paths
→ resolve coherent Feature/result owner when supported
→ move detailed behavior/data to Feature; keep Scenario journey/contribution refs
→ repeat coverage and maturity review after material change
```

Useful feedback examples:

```text
Application Contribution needs information the journey never supplies
→ Scenario path / external-boundary gap

Information appears only because an implementation schema has a field
→ omit from Scenario journey; keep Feature/Domain detail with its owner

Contribution branch produces a materially different real-life path/result
→ re-evaluate Scenario split

several contributions or Features depend on one must-hold rule
→ preserve it for Requirement/Domain discovery instead of hiding it in prose
```

The loop refines one bounded Step plan when meaning is unrealized. It does not
authorize implementation details to redefine upstream Application proposition/focus or
materialize future Target Bodies as current truth.

## Application Scenario Registration

Every materially distinct real-life path/experience/Application-Contribution
boundary should be covered by a Scenario identity and an authority route.
Step-owned future Target Bodies remain in their Evolution Step; current
Scenario owners represent only materialized meaning. A separate mandatory
Scenario Catalog is not required. Ground identity in the real-world journey,
not application commands, screens or implementation operations.

Candidate Scenarios may be informed by Application intent and Prototype
Scenarios, then split/merged by material path differences. Their Application
Contributions and provisional behavior stay in the Scenario while Feature
ownership is OPEN; resolved detailed behavior moves to Feature. Do not add a
parallel Application Use-Case alias layer or require one Scenario per repeating
equivalent instance.

## Requirements

A Requirement is a must-hold condition/property/constraint, not a Scenario identity. Prototype/Scenario/Screen work may discover Requirements and route them to their narrowest canonical owner.

Use [`requirements-and-change-context.md`](requirements-and-change-context.md) for status, stability, placement, Change Axes and implementation-scoped Proposals.

## Detailed Scenario Work

Use one Scenario Target Instance and only the representation needed for its
journey, Application Contributions and material resolution state. No standard
`ideas/`, `data/`, `behavior/`, `visual/` directory tree is required. While
Feature ownership is OPEN, bounded provisional behavior may remain in the
Step-owned Scenario; once resolved, detailed behavior/data move to Feature.

Detailed owner state follows:

```text
semantic body
→ Current Decisions
→ optional Q/R/P register/index when material
→ Q/R/P + Q/R/P Groups relative to Current Draft Plan
→ retained Concern/Decision trace when material
→ Potential Better Routes when material
```

Use Core `../idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md` for Q/R/P lifecycle/grouping and `../idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md` for candidate/Decision semantics. Use scoped Proposal review only when a real answer-seeking candidate exists. Link relevant Requirements rather than copying or turning them into flow steps mechanically.

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

Runtime branches and local Proposal alternatives are not whole Scenario Variants.

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
Scenario journey / Contribution coverage
+ resolved Feature behavior when present
+ natural-owner Requirements
+ Domain invariants when present
+ Slice verification target
→ planned verification evidence
```

Tests are evidence, not semantic authority.

## Integration Loop

```text
local Proposal / Prototype finding / Scenario / Screen / Requirement / Domain / Slice conclusion
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

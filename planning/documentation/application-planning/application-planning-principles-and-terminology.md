# Solution And Application Planning Principles And Terminology

Status: active reusable canonical owner
Scope: stable concepts/invariants for whole-solution/workflow planning and Scenario-based detailed application planning.

## Evidence And Decision States

Keep explicit user statements/checked facts, inference, questions, decision candidates, decisions and evidence distinct. Idea, risk, implementation thought, prototype and generated explanation do not silently become accepted architecture/current truth.

## Whole-Solution First

Equal solution candidates include existing tools, manual process, process change, automation, integrations, no-change, custom application and hybrids.

```text
Problem / Question / Idea
→ Need / Desired Result
→ Current Reality when useful
→ existing solutions / alternatives
→ candidate whole Solution / Workflow Variants
→ scoped Idea work where material
→ repeated whole-solution integration evaluation
→ selected solution responsibility
```

Invariant:

```text
best local variant ≠ automatically best whole solution/workflow
```

## Application Responsibility

Do not assume an application. Enter application planning only when Application responsibility is justified by the selected whole solution or already explicitly confirmed.

## Application Use Case

An Application Use Case owns semantic/navigation identity for one independently useful application capability:

```text
Need / Purpose
Trigger / accepted input
Meaningful result / end state
Boundaries
Scenario owner route(s)
```

It does not duplicate detailed Main Flow.

## Scenario

A Scenario is one coherent motivated actor/context + Need/Goal + meaningful observable-result behavioral unit.

Primary boundary test:

```text
meaningful user Need
+
independently meaningful observable result
```

Supporting signals for ambiguous boundaries include independent entry/re-entry, recurrence/reuse, wait/handoff and independent acceptance/testing value. Need alone is insufficient; distinguish an independent user Need from an instrumental sub-need.

## Spine Scenario

One or several early Spine Scenarios may temporarily provide representative end-to-end traversal while Scenario boundaries are being discovered.

```text
Spine Scenario
→ temporary discovery/integration scaffold
≠ permanent canonical entity layer
```

No `Spine Unit` entity exists.

## Scenario Draft

A detailed Scenario Draft is the canonical behavioral owner plus its workspace. Standard workspace areas are `ideas/`, `data/`, `behavior/` and `visual/`; shared material for several Scenarios belongs at their collection level.

Recommended semantic Scenario body:

```text
Identity
Motivation / Starting Situation
Actor Understanding / Plan
Entry Points / Preconditions
Main Flow
Branches / Invariants
Outcomes / Acceptance
Scenario DATA references
Behavior Item references
Visual / Screen references
Current Decisions
Questions / Risks / Problems relative to Current Draft Plan
Potential Simplifications / Better Routes when material
```

`Motivational Trigger ≠ Application Entry Point`.

Main Flow may proportionally add Surface/Screen, DATA/information, Actor Understanding, Desired User Response, System Response/State Change, Presentation/Visual Requirement and Result/Transition when material. Do not expand every step mechanically.

## Current Draft / Current Draft Plan

The current draft is the selected semantic owner/Variant for one detailed planning unit.

`Current Draft Plan` is not a file/entity/stage. It is the relevant selected baseline named inside a detailed draft's unresolved/adverse Q/R/P or unselected Better Route.

```text
Current Draft
= baseline

Q/R/P
= material unresolved/adverse delta to baseline

Potential Better Route
= material unselected candidate change to baseline
```

Resolved findings leave Q/R/P. Selected routes leave Better Routes and are integrated into the semantic body; material selected choices may remain in `Current Decisions` for rationale/traceability.

## Current Decision

A Current Decision records a material selected choice that is already integrated into current semantic meaning. It is not a candidate and it is not a replacement for the semantic body.

## Scenario DATA

User-visible/scenario-relevant values needed to understand or validate behavior. Not automatically DTO/API/database/UI state.

Scenario DATA may be addressable through a dedicated file or shared registry. It may become a Reference Object Candidate when a canonical literal value genuinely needs exact cross-file materialization/synchronization.

## Behavior Item

Stable addressable unit of required behavior inside a Scenario. It is not automatically an implementation task or Slice.

A Behavior Item may become a Reference Object Candidate when its canonical literal meaning genuinely needs exact materialized copies elsewhere; ordinary semantic references use ordinary links.

## Screen

A Screen is an optional spatial/visual owner for one application surface.

```text
Scenario
→ behavioral flow / actor understanding / observable result / acceptance

Screen
→ spatial boundary / zones / composition / visual states
```

A Screen may list Scenarios that use it without becoming their behavioral authority. Screen planning does not require `data/` or `behavior/` folders.

## Planning Unit Variant

A Planning Unit Variant is an integrated alternative design of a Scenario, Screen, Domain or Slice.

```text
Planning Unit Variant
≠ runtime Branch
≠ Idea Variant
≠ small technical alternative
≠ document revision/version history
```

Do not create explicit VAR-A ceremony while only one integrated design exists. When a second design appears, the root draft may become explicit VAR-A and remain physically at the root while the alternative lives under `variants/`; both are semantic peers for evaluation. Exactly one selected current Variant must be routed explicitly.

## Domain / Slice

Domain is optional conceptual model/language/lifecycle/rules when separate ownership improves planning.

Slice is an optional separately deliverable/checkable implementation increment after enough behavior/concepts are understood. A Slice may use a product-facing feature label without introducing a mandatory Feature layer.

## Reference Object Candidate

A Reference Object Candidate is canonical literal meaning/value established in one defining file/context through real planning/reasoning/decision work and likely to be intentionally materialized in other files where exact equality matters.

Strong signal:

```text
If the definition changes here,
would I want tooling to identify materialized literal copies
that may now be stale and need explicit review/update?
```

If yes, it may be a good candidate for the Linked Notes Reference Object mechanism. Semantic dependency, ownership relation, or ordinary cross-file linking alone is not sufficient.

Detailed rules and Linked Notes route: [`detailed-planning/README.md`](detailed-planning/README.md).

## Optional Application-Level Views

Surface Map and Core Loop remain explicit opt-in views only when a concrete application benefits. Scenario-local Screen references or recurring Scenario-chain notation are sufficient otherwise.

## Historical Boundary

Planning Item, Planning Draft and Full Picture Matrix are not active reusable ontology/stages. Workspace folders do not revive them. Current owners remain real responsibilities. Whole-solution / cross-owner integration review remains required when relevant but is a review responsibility, not a separate mandatory entity/file/stage. Historical project artifacts may remain provenance/migration sources but never win over current Use Cases/Scenarios/current owners.

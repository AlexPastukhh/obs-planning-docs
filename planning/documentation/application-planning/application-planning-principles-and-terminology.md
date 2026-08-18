# Solution And Application Planning Principles And Terminology

Status: active reusable canonical owner
Scope: stable concepts/invariants for whole-solution/workflow planning and Scenario-based application planning.

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

Recommended semantic shape:

```text
Identity
Motivation / Starting Situation
Actor Understanding / Plan
Entry Points / Preconditions
Main Flow
Branches / Invariants
Outcomes / Acceptance
Scenario DATA
Behavior Items
Open Questions
```

`Motivational Trigger ≠ Application Entry Point`.

Main Flow may proportionally add Surface/Window, DATA/information, Actor Understanding, Desired User Response, System Response/State Change, Presentation/Visual Requirement and Result/Transition when material. Do not expand every step mechanically.

## Scenario DATA

User-visible/scenario-relevant values needed to understand or validate behavior. Not automatically DTO/API/database/UI state.

## Behavior Item

Stable addressable unit of required behavior inside a Scenario. It is not automatically an implementation task or Slice.

## Domain / Slice

Domain is optional conceptual model/language/lifecycle/rules when separate ownership improves planning. Slice is an optional separately deliverable/checkable implementation increment after enough behavior/concepts are understood.

## Optional Application-Level Views

Surface Map and Core Loop remain explicit opt-in views only when a concrete application benefits. Scenario-local Surface references or recurring Scenario-chain notation are sufficient otherwise.

## Historical Boundary

Planning Item, Planning Draft and Full Picture Matrix are not active reusable ontology/stages. Current owners remain real responsibilities. Whole-solution / cross-Scenario integration review remains required when relevant but is a review responsibility, not a separate mandatory entity/file/stage. Historical project artifacts may remain provenance/migration sources but never win over current Use Cases/Scenarios/current owners.

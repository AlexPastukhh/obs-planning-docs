# Scenario / Domain / Slice Docs Profile

Status: active reusable specialized profile
Doc version: v0.4.0-explicit-optionality
Scope: optional reusable guidance for projects that organize detailed application/software planning as clean scenarios, scenario DATA, Behavior Items, domain work and implementation slices.

## 1. Purpose

Use this profile when a project needs separate Scenario/Domain/Slice documentation boundaries after application/solution planning is sufficiently stable for the relevant detail. An optional Spine Scenario may precede stable Scenario boundaries.

This is a specialized profile, not a universal planning stage.

For a simple application or a solution that is not application development, the project may keep Scenarios in the Planning Draft and omit separate Scenario DATA, Behavior Item, Domain and Slice artifacts when they do not improve the work.

When selected, the profile preserves this dependency direction:

```text
Planning Draft / current application meaning
  → optional Spine Scenario while boundaries are unclear
  → clean Scenario Reference Objects
  → Scenario DATA Reference Objects
  → Behavior Item Reference Objects
  → later responsibility/domain analysis
  → later Implementation Slice planning.
```

## 2. Core Split

```text
Scenario:
  one coherent motivated actor/context + Need/Goal + meaningful observable result;
  pure user-facing and verifiable behavior;
  no implementation design.

Scenario DATA:
  user-visible or scenario-relevant values that the actor enters,
  selects, sees, filters/searches, attaches, reviews or receives;
  not a domain model, DTO, API contract, database schema or UI-component state.

Behavior Item:
  one stable addressable unit of required behavior inside a Scenario;
  precondition, entry, step, include, branch, invariant,
  postcondition, acceptance or observable outcome;
  not an implementation task or Slice.

Domain:
  conceptual model, language, lifecycle, rules and boundaries
  discovered after scenario behavior is understood.

Slice:
  separately deliverable/checkable implementation increment
  planned after the scenario and relevant domain boundaries are understood.
```

## 3. Scenario Reference Object Contract

A Scenario is a first-class Reference Object with a stable identity and its own definition owner.

Recommended content:

```text
Scenario ID and title;
actor / application context;
starting situation / motivational trigger;
Need / motivation;
goal;
Actor Understanding / Plan when material;
entry points;
preconditions;
main flow;
include / extend / branches;
invariants;
postconditions;
acceptance;
observable outcomes;
open questions;
related Idea / source provenance references when useful;
optional step-local / cross-cutting presentation and visual requirements;
Scenario DATA references;
Behavior Item references;
source-review state.
```

Create a separate file per Scenario Object when the project benefits from independent review, linking and change-impact notification. A catalog/index may summarize them without becoming a second owner.

## 4. Source / Idea / Current-Owner Traceability

When Scenario meaning is derived from current planning or scoped Idea work, preserve links only where they materially improve provenance/change review.

Rules:

```text
- link the current owner / Idea / source that contributes material Scenario meaning when useful;
- do not copy complete Idea/source bodies into the Scenario;
- the Scenario owns its behavioral composition;
- Scenario DATA and Behavior Items may link to narrower sources/Ideas when useful;
- later Domain/Slice/Prototype artifacts reference Scenario and Behavior Item identities instead of copying scenario text.
```

A later related source/Idea/current-owner change does not rewrite a Scenario automatically. It creates an explicit review need when the project tracks that relation; the previous reviewed Scenario remains until reviewed/confirmed/replaced.

## 5. Scenario DATA Rules

Add DATA only when supported by explicit source or checked current facts and needed for scenario behavior, validation, selection, filtering/search, access/security behavior or observable results.

Do not add fields merely because they are common in applications. Keep unknown DATA absent or explicit as an open question.

## 6. Behavior Item Rules

Behavior Items are separate Reference Objects. Each one has:

```text
Behavior Item ID;
parent Scenario;
type;
required observable behavior;
Scenario DATA references when applicable;
related Idea / source provenance references when traceability is useful;
scope/change markers when already supported;
open questions when present.
```

Responsibility-layer classification is a later analytical artifact. Do not put controllers, handlers, repositories, tables, framework components, storage mechanisms or exact implementation seams into clean Behavior Items.

## 7. Boundaries

```text
- Do not force this profile on projects
  that do not use Scenario/Domain/Slice planning.
- Do not require this profile merely because a Planning Draft has Scenarios.
- For simple or non-application solutions, do not require separate
  Scenario DATA, Behavior Item, Domain or Slice artifacts.
- Do not use `one Need = one Scenario`; require a meaningful result and use independence signals only as supporting lenses.
- Do not turn every view, button, rule or workflow step into a peer Scenario.
- Do not treat Scenario DATA as domain or persistence design.
- Do not treat Behavior Items as Slices.
- Do not update upstream Ideas/current owners automatically from downstream deep planning.
- Do not make a source change silently rewrite dependent scenario artifacts.
- Keep project-specific routes in the project root UCM.
- Keep reusable route setup in the field kit.
```

Related setup kit:

```text
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
```

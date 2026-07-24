# Scenario / Domain / Slice Docs Profile

Status: active reusable specialized profile
Doc version: v0.3.0-item-backed-scenario-objects
Scope: optional reusable guidance for projects that organize detailed planning as clean scenarios, scenario DATA, Behavior Items, domain work and implementation slices.

## 1. Purpose

Use this profile when a project needs scenario/domain/slice documentation boundaries after an item-backed Planning Draft or Full Picture is sufficiently stable.

The profile preserves this dependency direction:

```text
Planning Items / Planning Draft
  → clean Scenario Reference Objects
  → Scenario DATA Reference Objects
  → Behavior Item Reference Objects
  → later responsibility/domain analysis
  → later Implementation Slice planning.
```

## 2. Core Split

```text
Scenario:
  one coherent actor/context + goal + observable result;
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
goal;
entry points;
preconditions;
main flow;
include / extend / branches;
invariants;
postconditions;
acceptance;
observable outcomes;
open questions;
Planning Item references;
Scenario DATA references;
Behavior Item references;
source-review state.
```

Create a separate file per Scenario Object when the project benefits from independent review, linking and change-impact notification. A catalog/index may summarize them without becoming a second owner.

## 4. Planning Item Traceability

When a Scenario Object is created from an item-backed Planning Draft or Full Picture:

```text
Scenario
  -- derived from -->
Planning Item.
```

Rules:

- link every Planning Item that contributes material scenario meaning;
- use a multi-value `Planning Items` field/projection whose members are Planning Item Reference Objects;
- do not copy complete Planning Item bodies into the Scenario;
- the Scenario owns only the new behavioral composition;
- Scenario DATA and Behavior Items may link to the narrower contributing item subset;
- later Domain/Slice/Prototype artifacts reference Scenario and Behavior Item identities instead of copying scenario text.

A later Planning Item change does not rewrite a Scenario automatically. It marks dependent Scenario/DATA/Behavior objects and their definition files as review-needed through the normal dependency-review mechanism. The previous reviewed scenario content remains until a user reviews and refreshes, confirms it is still current, or deliberately removes/replaces the relation.

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
Planning Item references when traceability is useful;
scope/change markers when already supported;
open questions when present.
```

Responsibility-layer classification is a later analytical artifact. Do not put controllers, handlers, repositories, tables, framework components, storage mechanisms or exact implementation seams into clean Behavior Items.

## 7. Boundaries

```text
- Do not force this profile on projects that do not use scenario/domain/slice planning.
- Do not turn every view, button, rule or workflow step into a peer Scenario.
- Do not treat Scenario DATA as domain or persistence design.
- Do not treat Behavior Items as Slices.
- Do not update Planning Items automatically from downstream deep planning.
- Do not make a source change silently rewrite dependent scenario artifacts.
- Keep project-specific routes in the project root UCM.
- Keep reusable route setup in the field kit.
```

Related setup kit:

```text
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
```

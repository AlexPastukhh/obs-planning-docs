# Scenario / Domain / Slice Use-Case Field Kit

Status: active reusable profile-specific field kit
Doc version: v1.1.0-detailed-workspace-aligned
Scope: setup guidance for adding Scenario/Domain/Slice route families to a concrete project root Command Routing when the specialized profile and commands are explicitly selected.

Core detailed-planning contract:

[`../application-planning/detailed-planning/README.md`](../application-planning/detailed-planning/README.md)

## 1. Purpose

Use this field kit only when both are true:

```text
1. the project explicitly selected the specialized
   Scenario/Domain/Slice profile;
2. the project explicitly wants one or more related root commands.
```

A project may use the profile without commands. This file is setup guidance, not a runtime router.

## 2. Route Families

Create only the route families the project actually needs.

```text
scenario plan:
  create/update the selected detailed Scenario workspace;
  maintain Scenario semantic owner + standard ideas/data/behavior/visual areas;
  use shared Scenario-level areas for meaning spanning several Scenarios;
  preserve source / Idea / current-owner traceability when useful;
  identify review needs when upstream meaning changes;

screen/spatial support when applicable:
  route Scenario work to canonical Screen owners
  for spatial boundary / zones / visual states;
  do not move Scenario behavior into Screen owners;

domain review:
  align terms, model, lifecycle, rules and boundaries
  from reviewed Scenario/Behavior meaning
  when a separate Domain owner is useful;

slice planning:
  turn accepted Scenario/Behavior coverage
  into separately deliverable/checkable integrated increments;
  optionally split implementation-part plans such as frontend/server;

consistency review:
  review contradictions across the selected Scenario, Screen,
  Domain and Slice owners that actually exist.
```

The profile requires unambiguous logical/addressable ownership for Scenario, DATA and Behavior meaning. DATA/Behavior items may share registry files; separate logical objects do not require separate physical files.

## 3. Scenario Route Expectations

A concrete Scenario route should identify:

```text
selected current application planning / application responsibility;
optional Spine origin when used;
Application Use Case;
Scenario collection root;
Scenario workspace README;
current selected Scenario owner/Variant;
Scenario-local ideas/data/behavior/visual areas;
shared Scenario ideas/data/behavior/visual areas;
related Screen owners when spatial UI matters;
manual review behavior when related upstream meaning changes;
permission boundary.
```

For empty standard Scenario folders, neutral `.gitkeep` is preferred over repeated local README guidance.

Do not invent DATA, acceptance criteria, command names, storage architecture or automatic dependency runtime.

## 4. Variant Expectations

Do not create explicit VAR-A while there is only one integrated design.

When a second integrated design appears, identify:

```text
root/first Variant identity;
new candidate Variant identity;
selected / not-selected / candidate state;
workspace README route to exactly one selected current Variant;
variant-local supporting owners only where meaning differs;
local + integrated evaluation when material.
```

The first Variant may remain physically outside `variants/`. Physical symmetry is optional.

Do not confuse runtime Branch, Idea Variant or document revision with a whole Planning Unit Variant.

## 5. Domain Route Expectations — When Selected

Identify:

```text
selected reviewed Scenario/Behavior meaning;
Domain workspace/owner;
Domain ideas/ area;
terms, lifecycle, rules and boundaries in scope;
current decisions;
Current-Draft-relative Q/R/P;
open consistency conflicts;
permission boundary.
```

Do not create a Domain route merely because Scenario artifacts exist. Do not require default Domain visual planning.

## 6. Slice Route Expectations — When Selected

Identify:

```text
selected accepted Scenario/Behavior coverage;
relevant Domain boundaries when they exist;
integrated Slice owner;
ideas/ and visual/ areas;
optional frontend/server/other implementation-part plans;
optional verification plan;
deliverable/checkable result;
current decisions;
Current-Draft-relative Q/R/P;
permission boundary.
```

Do not require Slice planning for one-step work, a narrow script, a process change or another solution that does not benefit from separate increments.

## 7. Reference Object Candidate Handling

Ordinary semantic references between planning files use ordinary repository links.

A canonical literal value becomes a `Reference Object Candidate` only when exact materialized copies may exist elsewhere and stale-copy review/synchronization would be valuable after the definition changes.

When a route needs actual Linked Notes Reference Object materialization, read the repository-facing contract instead of inventing marker/registry behavior:

1. [`../../../.linked-notes/AGENT-GUIDE.md`](../../../.linked-notes/AGENT-GUIDE.md)
2. [`../../../.linked-notes/REFERENCE-OBJECTS.md`](../../../.linked-notes/REFERENCE-OBJECTS.md)
3. current registry only when live object state matters.

## 8. Do Not

```text
- Do not create a second Command Routing inside the reusable layer.
- Do not copy project-specific route rows as active configuration.
- Do not treat this field kit as a runtime router after root Command Routing rows exist.
- Do not require a command merely because Scenario artifacts exist.
- Do not require one physical file per addressable Scenario DATA/Behavior Item.
- Do not label every addressable planning object as an already-materialized Linked Notes RO.
- Do not require contributing Planning Items or a Planning Item layer.
- Do not introduce a permanent Spine Unit.
- Do not make Domain/Slice details part of clean Scenario behavior.
- Do not infer repository edit, archive, commit or push permission.
```

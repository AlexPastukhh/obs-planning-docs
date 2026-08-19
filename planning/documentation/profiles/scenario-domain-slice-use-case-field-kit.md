# Scenario / Domain / Slice Use-Case Field Kit

Status: active reusable profile-specific field kit
Doc version: v1.1.0-detailed-workspace-aligned
Scope: setup guidance for adding Prototype/Scenario/Domain/Slice route families to a concrete project root Command Routing when the specialized profile and commands are explicitly selected.

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
prototype planning:
  when interaction/workflow uncertainty merits it, plan/review provisional
  Prototype Scenarios / Prototype Screens / candidate Requirements;
  Spine Pass/Walkthrough is a supporting discovery method, not a separate UC;

scenario plan:
  create/update the selected detailed Scenario workspace;
  maintain Scenario semantic owner + standard ideas/data/behavior/visual areas;
  link relevant Requirements and prototype evidence;
  preserve source / Idea / current-owner traceability when useful;

screen/spatial support when applicable:
  route Scenario work to canonical Screen owners
  for spatial boundary / zones / placement / visual states / spatial Requirements;
  do not move Scenario behavior into Screen owners;

domain review:
  derive stable concepts/lifecycle/rules/boundaries
  from reviewed Scenario/Behavior/Requirement meaning;
  use justified Change Axes to stress likely evolution without speculative over-generalization;

slice strategy when applicable:
  choose/review vertical Slice decomposition and delivery order;

slice planning:
  plan one selected separately deliverable/checkable integrated increment;
  optionally split implementation-part plans such as frontend/server;

consistency review:
  review contradictions across selected Scenario, Screen, Requirement,
  Domain and Slice owners that actually exist.
```

The profile requires unambiguous logical/addressable ownership for Scenario, DATA and Behavior meaning. DATA/Behavior items may share registry files; separate logical objects do not require separate physical files.

## 3. Scenario Route Expectations

A concrete Scenario route should identify:

```text
selected current Application Concept / application responsibility;
Prototype evidence/origin when used;
Application Use Case;
related Requirements / Change Axes when material;
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
confirmed Requirements;
relevant prototype evidence / justified Change Axes;
Domain workspace/owner;
Domain ideas/ area;
stable semantic core, terms, lifecycle, invariants/policies and boundaries in scope;
current-Scenario and likely-evolution stress checks;
current decisions;
Current-Draft-relative Q/R/P;
open consistency conflicts;
permission boundary.
```

Do not create a Domain route merely because Scenario artifacts exist. Do not require default Domain visual planning.

## 6. Slice Route Expectations — When Selected

### Slice Strategy — When decomposition/order matters

Identify:

```text
selected accepted Scenario/Behavior/Requirement coverage;
relevant Domain boundaries when they exist;
candidate vertical Slices;
dependencies / delivery order;
learning/risk rationale;
Change Axes considered without automatic generalization;
current selected decomposition/order;
permission boundary.
```

### One Implementation Slice

Identify:

```text
selected Slice Strategy when one exists;
selected accepted Scenario/Behavior/Requirement coverage;
relevant Domain boundaries;
integrated Slice owner;
ideas/ and visual/ areas;
optional frontend/server/other implementation-part plans;
optional verification plan;
deliverable/checkable result;
implementation-scoped Ideas promoted/rejected when material;
current decisions;
Current-Draft-relative Q/R/P;
permission boundary.
```

Do not require Slice Strategy for trivial one-step work. Do not turn frontend/server files into separate planning Use Cases merely because one Slice splits implementation-part plans.

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
- Do not introduce a permanent Spine Unit or standalone `UC-PLAN-SPINE`; Spine Pass/Walkthrough is a supporting method.
- Do not treat Prototype Scenario/Screen as canonical current Scenario/Screen authority.
- Do not turn Requirements or Change Axes into Scenarios mechanically.
- Do not make Domain/Slice details part of clean Scenario behavior.
- Do not infer repository edit, archive, commit or push permission.
```

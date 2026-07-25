# Solution And Workflow Planning Direction Registry

Status: active reusable-family semantic Direction Registry
Doc version: v1.0.0-planning-draft-topology
Scope: semantic Direction entries for reusable solution/workflow planning under `planning/documentation/application-planning/`.

Parent root registry: [`planning/direction-registry.md`](../../direction-registry.md)

Child Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## 1. Direction Index

| Direction ID | Semantic name | Status | Use-Case Registry |
|---|---|---|---|
| `DIR-PLAN-SOLUTION` | Plan A Solution Or Workflow | active | [`use-case-registry.md`](use-case-registry.md) |
| `DIR-DETAILED-SDS` | Perform Detailed Scenario/Domain/Slice Planning | active supported / optional profile-limited | [`use-case-registry.md`](use-case-registry.md) |

## 2. `DIR-PLAN-SOLUTION` — Plan A Solution Or Workflow

### Purpose

Turn incomplete source or checked current context into a reviewed, evidence-aware candidate solution or workflow without imposing one rigid ceremony, one application assumption or one mandatory artifact sequence.

### Boundaries

Included:

```text
- current-reality understanding when needed;
- Planning Item formation and review;
- item-backed Planning Draft work;
- repository semantic reconciliation;
- proportional alternatives, research, concerns, tests and prototypes;
- optional handoff to specialized detailed planning when justified.
```

Excluded:

```text
- mandatory execution of every supported use case;
- a separate required Planning Full Picture artifact;
- automatic build or architecture decisions;
- runtime, storage or serialization selection;
- automatic downstream rewrites;
- repository writes without a separate authorized route.
```

### Topology

```text
optional current-reality understanding
  → source-linked Planning Item formation and review
  → item-backed Planning Draft work
  → repository reconciliation when current owners matter;

optional or conditional:
  research existing solutions;
  compare alternatives or branches;
  suggest and review concerns;
  test uncertainty with research or prototypes;
  revise items, decisions and the Planning Draft from evidence;

optional downstream handoff:
  Perform Detailed Scenario/Domain/Slice Planning
  only after the specialized profile is selected.
```

A Planning Draft is the high-level owner. Every sufficient Planning Draft contains complete Key Scenarios and one Full Picture Matrix view; no parallel Full Picture artifact is required.

Use cases are supported capabilities. Some may be independently triggered, repeated or omitted.

### Child Use Cases

| Use Case | Activation | Owner |
|---|---|---|
| `UC-AP-REALITY` — Understand Current Workflow And Reality | optional / independent | `application-planning-drafting-workflow.md` |
| `UC-AP-FORM-ITEMS` — Form Planning Items From Discussion | independent / repeatable | `planning-item-formation-workflow.md` |
| `UC-AP-FULL-PICTURE` — Build Or Review An Item-Backed Planning Draft | independent / repeatable; legacy ID retained | `application-planning-drafting-workflow.md` |
| `UC-AP-RECONCILE` — Reconcile Planning Items | independent / command-related | `application-planning-drafting-workflow.md` |
| `UC-AP-RESEARCH` — Research Existing Solutions And Alternative Workflows | optional / provisional | current Planning Draft plus proportional checked research |

The stable ID `UC-AP-FULL-PICTURE` remains for route compatibility. Its current semantic result is a Planning Draft, not a separate Full Picture owner.

### Activation

**Adaptive**

```text
Read this entry when planning direction or context is uncertain.
Use the current relevant use case and owner route;
do not run every capability automatically.
```

**Full**

```text
Read this complete Direction entry, use-case-registry.md,
the complete selected use-case owner
and the current project-local planning owner.
```

## 3. `DIR-DETAILED-SDS` — Perform Detailed Scenario/Domain/Slice Planning

### Purpose

Coordinate optional later planning across observable behavior, conceptual language/model and separately deliverable/checkable implementation work when those layers materially reduce risk or coordination cost.

### Activation Boundary

Use this Direction only after the project explicitly selects the specialized Scenario/Domain/Slice profile.

It is not required for:

```text
- a simple application;
- use of an existing tool;
- a narrow script or automation;
- a process or documentation change;
- a non-application solution;
- work already sufficiently planned in one Planning Draft.
```

### Current Reusable Boundary

When this profile is selected, the project may use:

```text
Scenario:
  coherent actor/context + goal + observable-result behavior;

Scenario DATA:
  supported user-visible or scenario-relevant values;

Behavior Item:
  stable addressable units of required observable behavior;

Domain:
  conceptual model, language, lifecycle, rules and boundaries
  when a separate model materially helps;

Slice:
  separately deliverable and checkable implementation increments.
```

Exact file, section, catalog and object representation remains owned by the selected profile and project-local owners. The Direction Registry does not require one storage topology.

Supporting owners:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md
```

### Topology

```text
sufficiently stable item-backed Planning Draft
  → explicit selection of the specialized profile
  → selected Scenario representation and review
  ↔ optional Domain review and alignment
  → optional Implementation Slice planning
  → consistency review only across artifacts that actually exist
  → source changes create an explicit review need,
    not an automatic rewrite.
```

### Child Use Cases

| Use Case | Status | Owner boundary |
|---|---|---|
| `UC-AP-SCENARIO` — Draft Detailed Scenario | active supported / optional profile-limited | profile and project owners |
| `UC-AP-DOMAIN` — Draft Or Review Domain | active supported / optional profile-limited | profile and project owners |
| `UC-AP-SLICE` — Plan Implementation Slice | active supported / optional profile-limited | profile and project owners |
| `UC-AP-SDS-CONSISTENCY` — Review Scenario/Domain/Slice Consistency | active supported / optional profile-limited | selected complete artifacts and profile |

### Boundaries

```text
- Do not activate this Direction merely because a Planning Draft contains Scenarios.
- Do not require separate DATA, Behavior, Domain or Slice artifacts for simple work.
- Do not infer a project command from a reusable Use Case.
- Do not invent project storage, runtime or automatic dependency handling.
- Do not put Domain or Slice implementation detail into clean Scenario behavior.
```

## 4. Auxiliary Solution Principle

When a planned solution includes an auxiliary planning, documentation or tooling layer, expose its independently useful capabilities proportionally instead of hiding them as implementation detail.

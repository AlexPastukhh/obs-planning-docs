# Solution And Workflow Planning Direction Registry

Status: active reusable-family semantic Direction Registry
Doc version: v0.1.0-initial-planning-directions
Scope: complete semantic Direction entries for reusable solution/workflow planning under `planning/documentation/application-planning/`.

Parent root registry: [`planning/direction-registry.md`](../../direction-registry.md)

Child Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## 1. Direction Index

| Direction ID | Semantic name | Status | Use-Case Registry |
|---|---|---|---|
| `DIR-PLAN-SOLUTION` | Plan A Solution Or Workflow | active | [`use-case-registry.md`](use-case-registry.md) |
| `DIR-DETAILED-SDS` | Perform Detailed Scenario/Domain/Slice Planning | active / profile-limited | [`use-case-registry.md`](use-case-registry.md) |

## 2. `DIR-PLAN-SOLUTION` — Plan A Solution Or Workflow

### Purpose

Turn incomplete source/current context into a reviewed, evidence-aware candidate solution or workflow without imposing one rigid ceremony.

### Boundaries

Included:

- current-reality understanding when needed;
- Planning Item formation/review;
- item-backed Full Picture work;
- repository semantic reconciliation;
- proportional alternatives/research/concerns/tests/prototypes;
- handoff to detailed planning when justified.

Excluded:

- mandatory execution of every supported use case;
- automatic build decision;
- runtime architecture/storage selection;
- repository writes without a separate route.

### Topology

```text
optional current-reality understanding
  → source-linked Planning Item formation/review
  → item-backed Full Picture work
  → repository reconciliation when current owners matter;

optional/conditional:
  research existing solutions;
  compare alternatives/branches;
  suggest/review concerns;
  prototype/test uncertainty;
  revise from evidence;

optional downstream handoff:
  Perform Detailed Scenario/Domain/Slice Planning.
```

Use cases are supported capabilities. Some may be independently triggered or repeated.

### Child Use Cases

| Use Case | Activation | Owner |
|---|---|---|
| `UC-AP-REALITY` — Understand Current Workflow And Reality | optional / independent | `application-planning-drafting-workflow.md` |
| `UC-AP-FORM-ITEMS` — Form Planning Items From Discussion | independent / repeatable | `planning-item-formation-workflow.md` |
| `UC-AP-FULL-PICTURE` — Build Or Review An Item-Backed Full Picture | independent / repeatable | `application-planning-drafting-workflow.md` |
| `UC-AP-RECONCILE` — Reconcile Planning Items | independent / command-related | `application-planning-drafting-workflow.md` |
| `UC-AP-RESEARCH` — Research Existing Solutions And Alternative Workflows | optional / provisional | current Planning Draft plus proportional checked research |

### Activation

**Adaptive**

```text
Read this entry when planning direction/context is uncertain.
Use the current relevant use case and owner route; do not run every branch automatically.
```

**Full**

```text
Read this complete Direction entry, use-case-registry.md,
the complete selected use-case owner and current project-local planning owner.
```

## 3. `DIR-DETAILED-SDS` — Perform Detailed Scenario/Domain/Slice Planning

### Purpose

Coordinate later detailed planning across target behavior, conceptual language/model and separately deliverable/checkable work.

### Current Reusable Boundary

```text
Scenario:
  target future/use case and acceptance criteria;

Domain:
  conceptual model and language;

Slice:
  separately deliverable/checkable increment.
```

Supporting owners:

```text
planning/documentation/profiles/scenario-domain-slice-docs-profile.md
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
```

### Topology

```text
accepted planning direction/current picture
  → Detailed Scenario
  ↔ Domain review/alignment
  → Implementation Slice planning
  → cross-artifact consistency review
  → return corrections upstream when needed.
```

### Child Use Cases

| Use Case | Status | Owner boundary |
|---|---|---|
| `UC-AP-SCENARIO` — Draft Detailed Scenario | active supported / profile-limited | profile and project owners |
| `UC-AP-DOMAIN` — Draft Or Review Domain | active supported / profile-limited | profile and project owners |
| `UC-AP-SLICE` — Plan Implementation Slice | active supported / profile-limited | profile and project owners |
| `UC-AP-SDS-CONSISTENCY` — Review Scenario/Domain/Slice Consistency | active supported / profile-limited | selected complete artifacts and profile |

### Deferred Boundary

Prototype-depth adaptation is not defined here. Do not invent prototype-specific SDS lifecycle, implementation architecture or project command routes.

## 4. Auxiliary Solution Principle

When the planned solution includes an auxiliary planning/documentation/tooling layer, that layer should expose its own use-case inventory proportionally rather than remain hidden as implementation detail.

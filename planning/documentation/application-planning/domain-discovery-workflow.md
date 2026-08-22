# Domain Discovery Workflow

Status: active reusable workflow
Scope: discover evidence-backed Domain candidates/invariants/policies/consistency boundaries from current application behavior before selecting a current Domain model.

Generic Architecture Lens: [`../architecture-planning/README.md`](../architecture-planning/README.md)
Application change context: [`requirements-and-change-context.md`](requirements-and-change-context.md)
Selection/review workflow: [`domain-planning-workflow.md`](domain-planning-workflow.md)

## 1. Purpose

`UC-PLAN-DOMAIN-DISCOVERY` and `UC-PLAN-DOMAIN` have different useful results:

```text
Domain Discovery
→ evidence + candidates + integrated Domain Variants when material

Domain Planning
→ compare/refine/select/review current Domain meaning
```

Discovery remains proportional; simple behavior may not need a separately materialized result.

## 2. Inputs

Read proportionally:

```text
current Scenarios
Scenario DATA
Behavior Items
confirmed Requirements
prototype evidence when still relevant
material Change Axes from Architecture Planning
existing Domain/current implementation evidence when reviewing an existing system
```

## 3. Extract Domain Evidence

From current Scenario/DATA/Behavior/Requirements identify:

```text
semantic facts
identity clues
state/lifecycle clues
relationship clues
rule clues
consistency constraints
prohibited states/transitions
cross-Scenario recurring meaning
```

Guards:

```text
noun ≠ Entity
DATA field ≠ Domain Entity
database table ≠ Domain Entity
```

## 4. Entity / Identity Candidate Evidence

Strong evidence may include:

```text
stable identity
+ survives several behaviors/states
+ participates in lifecycle
+ rules/invariants attach to it
+ remains meaningful across relevant Scenarios
→ strong Entity Candidate
```

Do not mechanically infer entities from terminology alone.

## 5. Explicit Invariant Discovery

For each material Behavior Item ask:

```text
What must already be true before this behavior?
What must become true afterward?
What must remain true throughout?
What state / combination must be impossible?
What concepts participate?
Is the rule Scenario-local or cross-Scenario?
Does violation make current required behavior incorrect?
Is it invariant, current policy, workflow choice, presentation rule or implementation mechanism?
```

## 5.1 Behavior Evidence Classification — When Useful

Before modeling, classify material evidence by what it is trying to prove rather than by nouns/files:

```text
change / command behavior
lifecycle / state / condition
impossible state / combination
value integrity
coordination / consistency
read / query meaning
integration concern
failure / no-write guarantee
```

These labels are a reasoning aid, not mandatory ontology. They prevent every Behavior Item from becoming an Entity/Aggregate concern.

## 5.2 State / Condition Matrix — When Material

When behavior availability/result depends on state or conditions, enumerate materially distinct combinations:

| Current condition | Action / behavior | Result condition | Allowed? | Required guarantee | Failure / no-write guarantee | Evidence |
|---|---|---|---|---|---|---|
| `<state/condition>` | `<behavior>` | `<result>` | yes/no | `<must become true>` | `<must not change>` | `<source>` |

Use the matrix to discover lifecycle states, allowed/forbidden transitions, preconditions, policies and invariants. Do not build a Cartesian product of every field; include combinations that can materially change behavior or correctness.

## 5.3 Impossible State / Combination Review — When Material

State-transition validity and impossible-state validity are different questions. Separately review combinations that must never exist:

| State / data combination | Valid? | Why | Protecting invariant / consistency rule | Evidence |
|---|---|---|---|---|
| `<combination>` | yes/no | `<reason>` | `<invariant>` | `<source>` |

An impossible combination may exist even when no single transition row directly exposes it. Feed selected findings into Domain lifecycle/invariants/policies/consistency boundaries and later verification meaning.

## 6. Form Domain Candidates

Candidate kinds include:

```text
concept
entity/identity
value/concept
relationship
lifecycle/state
invariant
policy
consistency boundary
```

`Domain Candidate` is one possible semantic piece. `Domain Variant` is one coherent integrated model combining candidates into a current answer.

## 7. Apply Change Axes Where They Cross

Ask for each material candidate/boundary whether a material evidence-backed Change Axis crosses it.

```text
No current Requirement
+ no current Scenario need
+ no material Change Axis crossing here
→ no abstraction pressure here.
```

## 8. Integrated Variants When Material

Create integrated Domain Variants only when materially different coherent models exist. Do not create a Variant for each small implementation alternative.

## 9. Exit Result

```text
Domain Evidence
Domain Candidates
Invariant / Policy findings
Candidate consistency boundaries
Integrated Domain Variants when needed
unresolved semantic findings
```

The result is not yet selected Domain authority; `UC-PLAN-DOMAIN` owns selection/review.

## Comparative Realization Handoff

If several serious Domain candidates remain and high-level realization could materially distinguish them, hand off a bounded comparison to `UC-PLAN-REALIZATION`. Preserve each candidate's semantic assumptions; request only enough realization detail to discriminate the decision. The returned evidence is input to Domain selection, not selected Domain authority.

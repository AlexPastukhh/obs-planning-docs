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

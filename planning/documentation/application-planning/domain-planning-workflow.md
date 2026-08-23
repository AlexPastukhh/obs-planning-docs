# Domain Planning Workflow

Status: active reusable workflow
Scope: compare/refine/select/review an optional current Domain owner from discovered semantic evidence, current application behavior, requirements and justified expected change without over-generalizing for speculative futures.

Discovery workflow: [`domain-discovery-workflow.md`](domain-discovery-workflow.md)
Canonical application change context: [`requirements-and-change-context.md`](requirements-and-change-context.md)
Generic Architecture Lens / Change Axes: [`../architecture-planning/README.md`](../architecture-planning/README.md)
Recommended Domain shape: [`templates/DOMAIN-DRAFT-TEMPLATE.md`](templates/DOMAIN-DRAFT-TEMPLATE.md)
Shared draft-state contract: [`detailed-planning/README.md`](detailed-planning/README.md)

## 1. Purpose

Domain planning exists when a separate conceptual language/lifecycle/rules/boundary owner materially improves clarity, consistency or change cost.

`UC-PLAN-DOMAIN-DISCOVERY` owns evidence/candidate discovery. `UC-PLAN-DOMAIN` owns comparison/refinement/selection/review of current Domain meaning.

Primary goal:

```text
make stable meaning explicit and hard to violate
+
make justified likely variation local/easy enough to change
+
keep the current model as simple as possible
```

Not maximum extensibility or implementation-convenience-shaped semantics.

## 2. Inputs

Read proportionally:

```text
selected Application Concept / responsibility
current Application Scenarios
current detailed Scenarios
Scenario DATA / Behavior Items
confirmed Requirements
Domain Discovery evidence/candidates/Variants when available
prototype evidence when relevant
material Change Axes / Change Pressure from Architecture Planning
relevant implementation-scoped Ideas
existing Domain/current implementation evidence when reviewing an existing system
```

Current Requirements and selected Scenario meaning outrank speculative future possibilities.

## 3. Review Semantic Core / Candidates

Confirm that candidate concepts/identities/relationships/lifecycle/rules are justified by current selected meaning. If evidence/candidates are not grounded enough, return to `UC-PLAN-DOMAIN-DISCOVERY` instead of inventing Domain structure during selection.

## 3.1 Review / Select Value And Aggregate Boundaries — When Material

When discovery produced Value Object or Aggregate candidates, review them as semantic/ownership choices rather than implementation containers.

For a Value Object candidate ask whether value integrity, equality, validation or domain operations justify one stable concept. Reject primitive-wrapper ceremony with no meaningful semantic payoff.

For each Aggregate candidate ask:

```text
Which concrete current invariant(s) justify one ownership boundary?
Does the proposed Root naturally own lifecycle/state changes and invariant protection for its children?
Can owned children/value-like state be changed through that Root without awkward bypasses?
What is explicitly outside the Aggregate?
Are external Aggregates referenced rather than owned/mutated as children?
Which cross-Aggregate rule is really application coordination unless one Aggregate clearly owns it?
Is this the smallest useful consistency/ownership boundary?
Would split / merge / rejection make current behavior simpler and still correct?
Is read/query/persistence convenience merely making a larger boundary look attractive?
```

Selection result for each material candidate is explicit:

```text
select
split
merge
reject
no explicit Aggregate needed
```

Guardrails:

- one Aggregate Root should not directly own/create/mutate another Aggregate Root;
- external Aggregates are normally referenced by identity/reference;
- cross-Aggregate invariants default to application coordination unless ownership is genuinely clear;
- read/query joins, UI shape, ORM navigation and database layout do not define write ownership;
- a larger Aggregate is not safer merely because it can enforce more rules atomically;
- `no explicit Aggregate needed` is a valid selected Domain result for simple meaning.

## 4. Separate Invariant From Policy / Mechanism

For each material rule/relationship distinguish:

```text
Invariant
→ must remain true for current model correctness

Policy / selected current rule
→ current choice that may legitimately vary

Implementation mechanism
→ how selected meaning is realized; normally not Domain truth
```

## 5. Evaluate Material Change Axes

For each axis crossing the candidate Domain:

```text
current assumption
material likely variation / evidence
what Domain meaning would change
how far change propagates under candidate model
whether a boundary now is actually cheaper than direct future change
```

An axis elsewhere does not justify abstraction here.

## 6. Compare Integrated Domain Variants

A Domain Variant is one coherent integrated semantic model, not one small implementation alternative. Compare material Variants against current Scenario/Requirement correctness, semantic clarity, invariant enforceability and justified likely evolution.

## 7. Stress Checks

### Current-Scenario Check

```text
Can required current behavior be expressed simply?
Are Scenario/Requirement rules contradicted?
Is important user-visible meaning missing?
Did Domain planning invent behavior?
```

### Aggregate-Boundary Check — When Material

```text
Does each selected Aggregate protect specific current invariants/lifecycle ownership?
Is the Root actually responsible for child state changes and invariant protection?
Is the boundary minimal rather than a convenience-based giant Aggregate?
Are outside concepts and external Aggregate references explicit?
Are cross-Aggregate rules routed to coordination instead of hidden inside one Aggregate?
Would read/persistence structure be different without changing Domain ownership? If yes, keep them separate.
```

### Change-Axis Check

```text
If the material axis moves, what semantic owners change?
Is likely variation localized enough?
Would a small boundary now materially reduce evidence-backed future cost?
```

### Premature-Generalization Check

```text
No current Requirement/Scenario need
+ no material Change Axis crossing here
→ remove/simplify unsupported abstraction.
```

### Realization Sanity Check

Before selecting a materially complex Variant, ask proportionally whether representative current Scenarios can be realized reasonably, invariants can be enforced at required consistency, persistence/transactions are non-pathological, data/algorithm constraints are acceptable and important rules remain verifiable.

`slightly more code` is not a reason to reject semantically correct Domain meaning. A real consistency/performance/technical impossibility is valid upstream evidence and may require Domain Variant review or `UC-PLAN-REALIZATION`.

Persistence is stress input, not Domain authority.

## 8. Select And Integrate

Selected Domain meaning belongs in the Domain owner/template, with material rationale in Current Decisions when useful. Implementation-scoped Ideas promoted into Domain are no longer separate current implementation authority.

If Domain planning exposes an upstream Requirement/Scenario problem, return an explicit finding rather than silently changing upstream meaning.

## 9. Domain Verification Meaning

For nontrivial selected Domain meaning, establish proportionally before detailed Slice planning:

```text
invariant examples
allowed transitions
forbidden transitions
business-rule examples
important derived-value examples
cross-object consistency examples
```

This is a verification contract/meaning derived from Domain semantics, not a second Domain semantic authority and not necessarily a separate file. When an executable Domain API is already sufficiently selected, these cases may be materialized early as tests. In unresolved greenfield architecture, keep them technology-neutral until the proper executable boundary becomes concrete.

```text
verification meaning should precede implementation detail where practical
but test framework must not prematurely design Domain API.
```

## 10. Exit Criteria

A useful Domain plan has:

```text
clear purpose/boundary
stable semantic core
canonical concepts/relationships
Value Object boundaries when justified
selected/split/merged/rejected Aggregate boundaries when justified
lifecycle/rules/invariants when needed
explicit policy/variation where materially useful
traceability to current Scenarios/Requirements
justified Change-Axis reasoning
selected current Variant when alternatives exist
proportional Domain verification meaning
no unsupported future abstractions
current draft state / decisions / findings
```

A valid result may also be: `no separate Domain owner is justified; keep meaning in existing Scenario/Requirement owners`.

## Consume Realization Evidence Without Authority Reversal

Domain review may consume comparative `UC-PLAN-REALIZATION` evidence before selection when material. Weigh correctness, invariant fit, feasibility, operational/verification cost and justified evolution pressure. Select the simplest correct Domain that satisfies current meaning; reject complexity justified only by generic future flexibility.

# TM-DOMAIN-DISCOVERY — Transient Domain Discovery

Entry Point: `tm.domain_discovery`  
Role: transient/non-persistent implementation discovery Target Module

## Purpose

Produce a bounded working Domain plan when semantic state, identity, lifecycle, invariant or consistency ownership is unclear enough that concrete exploration is useful.

This Target is a **Source**, not durable Domain authority. One discovery may yield zero, one or several durable Domain owners. It is not one Target per Aggregate.

Concrete candidate classes, types, methods, signatures, persistence seams and literal unit-test candidates are allowed because this is working implementation discovery.

## Activation / Scope Gate

Use when a Feature/Slice/current implementation reaches material Domain questions that cannot be resolved proportionally by a lighter Lens check.

Do not create Domain discovery merely because implementation contains data or classes.

## Lens Profile

Required primary lens: `LENS-DOMAIN-MODELING-DDD`.

Compose with Evolution, Implementation Requirements Discovery or other thematic Lenses when those concerns are material; use selected [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge through the natural evaluator rather than a Programming Principles Lens.

## Production Method

```text
material semantic ownership question
→ classify Domain vs orchestration/infrastructure
→ discover identity/state/lifecycle/consistency
→ sketch candidate realization concretely enough to test the model
→ define Domain unit proof candidates
→ inspect known Evolution / OPEN pressure
→ proposal to zero/one/several durable natural owners
→ discard working discovery by default after selected meaning is materialized
```

Discovery may loop with Slice Discovery. Neither is a mandatory stage before the other.

## Target Step-Result Contract

**Target Step Result:** `Domain Discovery Working Plan`

| Result Unit | Meaning |
|---|---|
| `RU-DOM-01` | Ownership / Classification |
| `RU-DOM-02` | Semantic State / Lifecycle / Consistency |
| `RU-DOM-03` | Candidate Realization + Domain Unit Proof |
| `RU-DOM-04` | Evolution / OPEN Domain Pressure |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-DOM-01` | when semantic ownership/classification is uncertain enough to justify bounded Domain discovery | omit the entire discovery Target when shallow Lens reasoning is sufficient |
| `RU-DOM-02` | when state/lifecycle/invariant/consistency meaning affects owner selection or correctness | omit categories that have no selected semantic pressure |
| `RU-DOM-03` | when concrete candidate realization/proof helps discriminate Domain alternatives | omit implementation-shaped detail when semantic ownership can be resolved without it |
| `RU-DOM-04` | when selected Evolution or unresolved Domain pressure can change the current candidate | omit speculative future pressure and already-resolved questions |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

### RU-DOM-01 — Ownership / Classification

Capture candidate semantic owners and classification decisions proportionally:

- what is Domain meaning vs application orchestration/infrastructure;
- candidate Entity/Value Object/Aggregate/Domain Service/Policy responsibilities;
- one coherent ownership/consistency boundary vs several owners;
- explicit `no Domain owner` outcome when correct.

### RU-DOM-02 — Semantic State / Lifecycle / Consistency

Explore:

- identity and equality semantics;
- states and valid transitions;
- invariants / immediate vs eventual consistency;
- semantic operations;
- failure/result semantics when material;
- persistence/concurrency semantics only to the degree they affect Domain meaning.

### RU-DOM-03 — Candidate Realization + Domain Unit Proof

Working detail may include:

```text
candidate types/classes
methods / signatures
state representation
repository/persistence seam
atomicity/concurrency mechanism candidate
literal unit-test cases and expected semantic result
alternatives / trade-offs
```

These details are not durable authority merely because they were useful during discovery.

### RU-DOM-04 — Evolution / OPEN Domain Pressure

Record known Step pressure, unresolved ownership/model questions and which future evidence could discriminate alternatives. Do not turn hypothetical future change into current implementation requirements.

## Upstream Source Contract

Use proportionally:
- selected Feature behavior / `BR-*`;
- Scenario journey constraints only where Domain meaning depends on them;
- Feature Implementation Concerns;
- current Slice discovery/owner question;
- current implementation/types/tests/Evidence;
- known selected Evolution Steps;
- accepted Proposal/Decision context.

Source Discovery is evidence-driven. Do not build a global Domain model merely because source exists.

## Knowledge Basis

Primary reusable guidance is owned by `LENS-DOMAIN-MODELING-DDD` and the reusable DDD guidance corpus. The Target does not duplicate the full DDD question catalog.

## Representation / Artifact Contract

Working Domain Discovery is transient/non-persistent by default.

```text
working discovery
→ zero owners: discard after result is clear
→ one/several durable owners: move selected durable semantic meaning into TM-DOMAIN-OWNER
→ exact literal realization: Core Exact/code/tests
```

Persistence of the working plan for handoff/review does not make it Domain authority.

## Domain Evolution Query

Use `RU-DOM-04` for current discovery pressure such as:
- which known Step changes identity/state/invariant/lifecycle/ownership;
- whether current candidate boundary would force avoidable migration;
- what remains OPEN.

Selected future target meaning itself belongs to `TM-EVOLUTION-STEP`. The Evolution Lens evaluates change isolation.

## Validators

```text
Domain vs orchestration/infrastructure ownership is explicit
zero/one/several durable owner outcome is allowed
identity/equality/state/lifecycle/invariant/consistency meaning is coherent
persistence/concurrency details are included only where semantic or useful to candidate realization
candidate realization is concrete enough to test the model
Domain unit proof targets semantic rules rather than private structure
durable IR/PFR candidates are routed to natural durable owner
working plan is not retained as competing durable authority
```

## Handoff / Revalidation

```text
selected Domain meaning
→ TM-DOMAIN-OWNER when durable ownership exists
→ TM-IMPLEMENTATION-SLICE / TM-SLICE-OWNER as consumer context
→ Core Exact for literal realization

Domain discovery contradicts Feature/Slice/Shared assumptions
→ Finding → natural upstream owner revalidation
```

## Durable Handoff

```text
selected durable semantic contract
→ TM-DOMAIN-OWNER / RU-DOWN-01

selected durable owner-local implementation constraint
→ TM-DOMAIN-OWNER / RU-DOWN-02

unselected/uncertain candidate
→ Proposal / Finding / OPEN as appropriate
```

The discovery plan is normally disposable after the durable owner/code/tests carry current authority.

## Guards

```text
Domain Discovery ≠ durable Domain owner
Domain Discovery ≠ one Target per Aggregate
candidate type/method ≠ accepted implementation
working test candidate ≠ Requirement authority
no Domain owner is a valid result
zero/one/many durable Domain owners may follow
```

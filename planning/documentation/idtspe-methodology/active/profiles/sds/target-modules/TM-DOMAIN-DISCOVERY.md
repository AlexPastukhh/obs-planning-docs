<a id="tm-domain-discovery"></a>
# TM-DOMAIN-DISCOVERY — Transient Domain Discovery

Module ID: `TM-DOMAIN-DISCOVERY`

Entry Point: `tm.domain_discovery`
Role: bounded implementation discovery Target Module; working Target is transient by default, selected Result Content may hand off to Step-owned Evolution Impact

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Produce a bounded working Domain plan when semantic state, identity, lifecycle, invariant or consistency ownership is unclear enough that concrete exploration is useful.

This Target is a **Source**, not durable Domain authority. One discovery may yield zero, one or several durable Domain owners. It is not one Target per Aggregate.

Concrete candidate classes, types, methods, signatures, persistence seams and literal unit-test candidates are allowed because this is working implementation discovery.

## Activation / Scope Gate

Use when a Feature/Slice/current implementation reaches material Domain questions that cannot be resolved proportionally by a lighter Lens check.

Do not create Domain discovery merely because implementation contains data or classes.

## Lens Profile

Required primary lens: `LENS-DOMAIN-MODELING-DDD`.

Compose with Evolution, Implementation Requirements Discovery or other thematic Lenses when those concerns are material; use selected [`RG-PRG-*`](../knowledge-bases/programming-principles/README.md) knowledge through the natural evaluator rather than a Programming Principles Lens.

## Production Method

```text
material semantic ownership question
→ classify Domain vs orchestration/infrastructure
→ discover identity/state/lifecycle/consistency
→ sketch candidate realization concretely enough to test the model
→ define Domain unit proof candidates
→ inspect known Evolution / OPEN pressure
→ for unrealized work: integrate selected useful Result Content into the applicable Evolution Impact(s) in the active Evolution Step
→ when durable post-Step Domain responsibility is resolved: zero/one/several Target Domain Bodies
→ for current-state review: proposal/revalidation to existing current Domain owner(s) when applicable
→ discard exploratory resolution/rejected alternatives by default after selected meaning reaches its proper Step/current-owner destination
```

Discovery may loop with Slice Discovery. Neither is a mandatory stage before the other.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Domain Discovery Working Plan`

| Result Unit | Meaning |
|---|---|
| `RU-DOM-01` | Ownership / Classification |
| `RU-DOM-02` | Semantic State / Lifecycle / Consistency |
| `RU-DOM-03` | Candidate Realization + Domain Unit Proof |
| `RU-DOM-04` | Evolution / OPEN Domain Pressure |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-DOM-01` | always once a Domain Discovery Target is formed; it owns the bounded ownership/classification discovery subject | no Unit-level omission: when shallow Lens reasoning is sufficient, the Target-level discovery gate fails and the discovery Target should not be formed |
| `RU-DOM-02` | when state/lifecycle/invariant/consistency meaning affects owner selection or correctness | `OMITTED` when state/lifecycle/invariant/consistency meaning is not material to owner selection or correctness |
| `RU-DOM-03` | when concrete candidate realization/proof helps discriminate Domain alternatives | `OMITTED` when candidate realization/proof detail is unnecessary to discriminate Domain alternatives |
| `RU-DOM-04` | when selected Evolution or unresolved Domain pressure can change the current candidate | `OMITTED` when no selected Evolution or unresolved Domain pressure can change the current candidate |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-DOM-01` processing envelope

1. **Opening Unit Checkpoint — `RU-DOM-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOM-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOM-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-DOM-02` processing envelope

1. **Opening Unit Checkpoint — `RU-DOM-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOM-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOM-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-DOM-03` processing envelope

1. **Opening Unit Checkpoint — `RU-DOM-03`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOM-03`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOM-03`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-DOM-04` processing envelope

1. **Opening Unit Checkpoint — `RU-DOM-04`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOM-04`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOM-04`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

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

These details are not durable authority merely because they were useful during discovery. Selected portions may nevertheless be retained as Step-owned `Evolution Impact` Result Content when continuation/realization/review/revalidation still depends on them; that retention does not make them Domain owner authority or exact implementation commitment.

### RU-DOM-04 — Evolution / OPEN Domain Pressure

Record known Step pressure, unresolved ownership/model questions and which future evidence could discriminate alternatives. Do not turn hypothetical future change into current implementation requirements.

## Upstream Source Contract

Use proportionally:
- selected Feature behavior / `BR-*`;
- Scenario journey constraints only where Domain meaning depends on them;
- Feature Implementation Concerns;
- current Slice discovery/owner question;
- current implementation/types/tests/Evidence;
- relevant concrete candidate/selected Evolution Steps, preserving their planning position;
- accepted Proposal/Decision context.

Source Discovery is evidence-driven. Do not build a global Domain model merely because source exists.

## Knowledge Basis

Primary reusable guidance is owned by `LENS-DOMAIN-MODELING-DDD` and the reusable DDD guidance corpus. The Target does not duplicate the full DDD question catalog.

## Representation / Artifact Contract

Working Domain Discovery Target/artifact is transient/non-persistent by default; this does not require discarding selected Result Content that has an explicit Step destination.

```text
working discovery Unit Resolution / rejected alternatives
→ discard by default after resolution

selected useful Result Content for unrealized work
→ applicable TM-EVOLUTION-STEP / RU-EVO-02 Evolution Impact
→ optional Target Domain Body/Bodies when durable post-Step Domain meaning is resolved

zero owner/body outcome
→ Impact may record the selected ownership conclusion without inventing a Domain owner

already-realized current-state revalidation
→ current Domain owner through normal accepted correction semantics

exact literal realization
→ Core Exact/code/tests
```

Retaining selected planning meaning in a Step does not promote the discovery artifact or candidate implementation shape into Domain semantic authority.

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
selected Domain discovery meaning
→ if unrealized: applicable Evolution Impact(s) in the active TM-EVOLUTION-STEP
→ when durable post-Step Domain contract is resolved: Target Domain Body/Bodies in that Step
→ if revalidating realized truth: current TM-DOMAIN-OWNER
→ Slice discovery/Target Slice Body as consumer context when applicable
→ Core Exact for literal realization once the selected Step/current meaning is sufficient

Domain discovery contradicts Feature/Slice/Shared assumptions
→ Finding → natural upstream owner revalidation
```

## Durable Handoff

```text
selected durable semantic contract
→ unrealized state: Target Domain Body shaped by TM-DOMAIN-OWNER / RU-DOWN-01 inside Evolution Step
→ realized current-state correction: current TM-DOMAIN-OWNER / RU-DOWN-01 after the correction is actually materialized

selected durable owner-local implementation constraint
→ same temporal routing for the Target/current Domain Body / RU-DOWN-02

unselected/uncertain candidate
→ Proposal / Finding / OPEN as appropriate
```

The discovery Target/artifact is normally disposable after selected Result Content has reached the applicable Evolution Impact/Target Domain Body/current owner/Exact destination. Step-retained selected planning meaning may remain while the transition is unrealized and later as lineage when independently useful.

## Guards

```text
Domain Discovery ≠ durable Domain owner
Domain Discovery ≠ one Target per Aggregate
candidate type/method ≠ accepted implementation
working test candidate ≠ Requirement authority
no Domain owner is a valid result
zero/one/many durable Domain owners may follow
```

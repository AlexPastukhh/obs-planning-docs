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
→ for unrealized work: proposal to zero/one/several Target Domain Bodies in the active Evolution Step
→ for current-state review: proposal/revalidation to existing current Domain owner(s) when applicable
→ discard working discovery by default after selected meaning reaches its proper Step/current-owner destination
```

Discovery may loop with Slice Discovery. Neither is a mandatory stage before the other.

## Unit Contract Conformance

Declared target-specific `RU-*` responsibilities in this module are interpreted as **Module-defined Unit Contracts**, not output buckets only. For each material Unit:

```text
Unit responsibility
→ relevant inputs / shared or Unit-specific reusable guidance
→ Unit Resolution with Core Question/QRP/Proposal/Evidence/Decision state only when useful
→ Current Result Content when sufficiently resolved
```

Module-wide Source/Knowledge/Production/Lens/validator guidance is a shared default only where it genuinely applies across Units. Unit-specific subsection text specializes that guidance. Do not duplicate Core lifecycle semantics inside Result Content, and do not require a formal Proposal/Decision when trusted Sources/Evidence determine the result without a material choice.

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


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

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
→ zero owner/body outcome: discard after result is clear
→ unrealized future state: move selected semantic meaning into Target Domain Body/Bodies in TM-EVOLUTION-STEP
→ already-realized current-state revalidation: update the current Domain owner only through normal accepted correction semantics
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
→ if unrealized: Target Domain Body in the active TM-EVOLUTION-STEP
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

The discovery plan is normally disposable after the Evolution Step/current owner/code/tests carry the appropriate planning/current authority.

## Guards

```text
Domain Discovery ≠ durable Domain owner
Domain Discovery ≠ one Target per Aggregate
candidate type/method ≠ accepted implementation
working test candidate ≠ Requirement authority
no Domain owner is a valid result
zero/one/many durable Domain owners may follow
```

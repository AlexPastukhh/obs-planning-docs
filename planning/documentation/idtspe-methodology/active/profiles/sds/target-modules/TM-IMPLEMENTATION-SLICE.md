# TM-IMPLEMENTATION-SLICE — Slice Discovery / Non-Persistent Slice Planning

Entry Point: `tm.implementation_slice`  
Role: bounded whole-Slice implementation discovery Target Module; working Target is transient by default, selected Result Content may hand off to Step-owned Evolution Impact

## Purpose

Produce a concrete working end-to-end realization plan for a selected Feature when detailed implementation discovery is useful.

This Target is transient. It may contain concrete classes, methods, calls, signatures, adapters, persistence/external boundaries and literal integration-test candidates. Selected durable responsibility is later owned by `TM-SLICE-OWNER`; volatile class/call topology does not become durable owner truth by default.

## Activation / Scope Gate

Use when Feature meaning is sufficiently selected but exact end-to-end realization is not yet clear enough for safe implementation/Exact work.

Do not create a Slice discovery plan merely to restate Feature behavior.

## Lens Profile

Required primary lens: `LENS-SLICE-VERTICALITY-INTEGRATION`.

Conditional Lenses include DDD, Evolution, Implementation Requirements Discovery, UI/spatial and quality/verifiability perspectives; selected [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge may support their evaluation when material.

## Production Method

```text
selected Feature
→ re-check Feature/Slice boundary with stronger implementation evidence
→ define whole-Slice responsibility / candidate structure
→ establish semantic application entry/result boundary
→ walk realization end to end
→ discover Domain / Shared dependencies and effect/recovery seams
→ design whole-Feature integration proof
→ record known Evolution / OPEN pressure
→ for unrealized work: proposal to Target Slice/Domain/Shared Bodies in the active Evolution Step as warranted
→ for current-state review: route findings to existing current owners as warranted
→ implementation / Exact
→ discard working discovery by default when planning/current authority lives naturally elsewhere
```

Slice and Domain discovery may alternate as evidence demands.

## Unit Contract Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/shared/target-module-model.md) and [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Slice Discovery Working Plan`

| Result Unit | Meaning |
|---|---|
| `RU-SLICE-01` | Whole-Slice Responsibility / Candidate Structure |
| `RU-SLICE-02` | Semantic Application Entry / Result Boundary |
| `RU-SLICE-03` | Step-by-Step End-to-End Realization |
| `RU-SLICE-04` | Feature Integration Proof |
| `RU-SLICE-05` | Evolution / OPEN Slice Pressure |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--disposition-contract). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-SLICE-01` | always once an Implementation Slice discovery Target is formed; it owns the whole-Slice responsibility/candidate structure | no Unit-level omission: when the current implementation path is already sufficiently clear, the Target-level discovery gate fails and the discovery Target should not be formed |
| `RU-SLICE-02` | when semantic application entry/result boundaries are material to integration/ownership/proof | `OMITTED` when no semantic application entry/result boundary needs independent resolution for integration/ownership/proof |
| `RU-SLICE-03` | when concrete end-to-end realization detail is needed to resolve dependencies/effects/failure/proof | `OMITTED` when concrete end-to-end realization detail is unnecessary to resolve dependencies/effects/failure/proof |
| `RU-SLICE-04` | when whole-Feature integration proof needs explicit planning to validate the selected Slice | `OMITTED` when no explicit whole-Feature integration-proof result is needed beyond accepted owner/proof meaning |
| `RU-SLICE-05` | when selected Evolution or unresolved Slice pressure can affect current boundary/realization | `OMITTED` when no selected Evolution or unresolved Slice pressure has a current boundary/realization consequence |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SLICE-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SLICE-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SLICE-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SLICE-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SLICE-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SLICE-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SLICE-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SLICE-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SLICE-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SLICE-03`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SLICE-03`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SLICE-03`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SLICE-04` processing envelope

1. **Opening Unit Checkpoint — `RU-SLICE-04`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SLICE-04`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SLICE-04`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SLICE-05` processing envelope

1. **Opening Unit Checkpoint — `RU-SLICE-05`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SLICE-05`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SLICE-05`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

### RU-SLICE-01 — Whole-Slice Responsibility / Candidate Structure

Capture the Feature-local end-to-end responsibility and enough candidate structure to reason about locality. Evaluate module/branch/entry-adapter/shared-extraction alternatives using the Vertical Slice Lens.

### RU-SLICE-02 — Semantic Application Entry / Result Boundary

Prefer explicit semantic typed entry/result boundaries. A button, route, endpoint or CLI adapter is not automatically a distinct semantic application operation.

### RU-SLICE-03 — Step-by-Step End-to-End Realization

Concrete plan may include:

```text
entry adapter
application orchestration
Domain owners used
Shared capabilities used
repositories/persistence
external side effects
effect fencing / uncertainty / retry / recovery
result mapping/presentation
candidate classes / methods / calls / signatures
```

Keep Feature-specific policy local. Extract Shared capability only for coherent reusable non-end-to-end responsibility.

### RU-SLICE-04 — Feature Integration Proof

Define whole-Feature proof through the semantic application boundary. Keep real Domain behavior real where useful; fake expensive/incidental external mechanics proportionally. Assert meaningful Feature result, important effects and forbidden effects rather than private call sequence.

### RU-SLICE-05 — Evolution / OPEN Slice Pressure

Record known Evolution Steps and unresolved realization/boundary pressure. Known evolution is evidence; speculative future behavior is not current scope.

## Upstream Source Contract

Use proportionally:
- selected Feature + `BR-*`;
- Scenario journey continuity/E2E pressure where relevant;
- Screen spatial/UI constraints where relevant;
- selected/working Domain owners;
- selected Shared capabilities/bindings;
- Feature Implementation Concerns;
- current code/tests/Evidence;
- known Evolution Steps;
- accepted Proposal/Decision context.

## Knowledge Basis

`LENS-SLICE-VERTICALITY-INTEGRATION` owns the reusable Feature/Slice/end-to-end discovery method. DDD and IR Discovery Lenses plus selected [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge are composed only when material.

## Behavioral Coverage / Old Strategy Semantics

This Target discovers **one** bounded Slice candidate. Cross-Slice portfolio coverage is a workflow/Lens projection.

Still enforce both directions:

```text
material accepted Feature behavior
→ selected Slice responsibility OR explicit deferred/outside position

candidate Slice behavior/result claim
→ grounded in accepted Feature behavior/result
```

Do not invent behavior in implementation planning.

## Representation / Artifact Contract

This discovery Target/artifact is working/non-persistent by default. Its selected Result Content may still have continuing Step value before implementation exists.

```text
working Unit Resolution / rejected alternatives
→ discard by default after resolution

selected useful whole-path Result Content for unrealized work
→ applicable TM-EVOLUTION-STEP / RU-EVO-02 Slice/Domain/Shared Impact(s)

selected durable post-Step responsibility/boundary
→ corresponding Target Slice/Domain/Shared Body when sufficiently resolved

exact literal classes/methods/files/tests
→ Core Exact/code
```

Retaining selected planning meaning inside an Impact does not make the discovery Target or volatile class/call topology a current durable Slice authority.

## Validators

```text
one whole meaningful Feature path is understandable end to end
semantic entry/result boundary is explicit
Domain/Shared dependencies retain their own authority
side effects/failure/retry/uncertainty are understood where material
technical layers are not treated as independent Slices by default
RU-SLICE-04 proof exercises meaningful Feature boundary
RU-SLICE-05 future pressure routes to Evolution Step when selected
durable IR/PFR candidates move to TM-SLICE-OWNER
working discovery does not become a shadow class/call registry
```

## Handoff / Revalidation

```text
selected Slice discovery meaning
→ unrealized work: applicable Evolution Impact(s) in TM-EVOLUTION-STEP
→ when durable post-Step Slice responsibility is resolved: Target Slice Body in that Step
→ realized current-state revalidation: current TM-SLICE-OWNER

shared reusable responsibility discovered
→ TM-SHARED-IMPLEMENTATION-CAPABILITY gate

Domain semantics unclear
→ TM-DOMAIN-DISCOVERY / TM-DOMAIN-OWNER

literal implementation ready
→ Core TM-EXACT-REALIZATION

stronger Evidence contradicts Feature/Slice boundary
→ Finding → Feature/owner revalidation
```

## Durable Handoff

```text
selected durable Slice responsibility / boundary contract
→ unrealized state: Target Slice Body shaped by TM-SLICE-OWNER / RU-SOWN-01 inside Evolution Step
→ realized current-state revalidation: current TM-SLICE-OWNER

selected durable Slice implementation constraints
→ same temporal routing for RU-SOWN-02

reusable non-end-to-end responsibility with genuine consumers
→ selected planning consequence into Shared Evolution Impact; Target Shared Body when sufficiently resolved, or current Shared owner when already realized

semantic Domain meaning
→ selected planning consequence into Domain Evolution Impact; Target Domain Body when sufficiently resolved, or current TM-DOMAIN-OWNER when revalidating realized truth
```

## Guards

```text
Slice Discovery ≠ durable Slice owner
Slice ≠ frontend/backend/database layer
Slice dependency ≠ loss of Slice independence
concrete working topology ≠ durable contract by default
Feature behavior remains owned by Feature
one Requirement ≠ one test
```

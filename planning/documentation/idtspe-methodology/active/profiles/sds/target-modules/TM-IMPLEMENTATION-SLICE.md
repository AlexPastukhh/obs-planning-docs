# TM-IMPLEMENTATION-SLICE — Slice Discovery / Non-Persistent Slice Planning

Entry Point: `tm.implementation_slice`  
Role: transient whole-Slice implementation discovery Target Module

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
→ proposal to durable Slice/Domain/Shared owners as warranted
→ implementation / Exact
→ discard working discovery by default when current authority lives naturally elsewhere
```

Slice and Domain discovery may alternate as evidence demands.

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

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-SLICE-01` | when whole-Slice responsibility/candidate structure is needed to reason end-to-end | omit the whole discovery Target when current implementation path is already sufficiently clear |
| `RU-SLICE-02` | when semantic application entry/result boundaries are material to integration/ownership/proof | omit adapter/transport detail that does not alter semantic entry/result meaning |
| `RU-SLICE-03` | when concrete end-to-end realization detail is needed to resolve dependencies/effects/failure/proof | stop at the minimum detail that discriminates decisions; do not build a shadow class/call registry |
| `RU-SLICE-04` | when whole-Feature integration proof needs explicit planning to validate the selected Slice | omit trivial proof mechanics already implied by the accepted boundary |
| `RU-SLICE-05` | when selected Evolution or unresolved Slice pressure can affect current boundary/realization | omit speculative future change or questions with no current consequence |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

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

This Target is working/non-persistent by default.

Its temporary result may be conversational or a working implementation plan. Selected durable responsibility moves into `TM-SLICE-OWNER`; exact classes/methods/files/tests go to Core Exact/code.

If retained for review/handoff, mark it as working Source, not current durable Slice authority.

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
selected durable responsibility
→ TM-SLICE-OWNER

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
→ TM-SLICE-OWNER / RU-SOWN-01

selected durable Slice implementation constraints
→ TM-SLICE-OWNER / RU-SOWN-02

reusable non-end-to-end responsibility with genuine consumers
→ TM-SHARED-IMPLEMENTATION-CAPABILITY

semantic Domain meaning
→ TM-DOMAIN-OWNER (possibly via Domain Discovery)
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

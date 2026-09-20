# TM-SLICE-OWNER — Durable End-to-End Slice Owner

Entry Point: `tm.slice_owner`
Role: durable implementation responsibility owner

## Purpose

Own one durable end-to-end implementation responsibility corresponding to a selected Feature boundary. Slice independence means locality of responsibility/change, not absence of dependencies.

Transient `TM-IMPLEMENTATION-SLICE` may discover the realization but is not durable authority.

## Temporal Authority / Evolution-Step Hosting

A canonical Slice owner describes a currently realized end-to-end implementation responsibility. For a responsibility/boundary that is selected but not yet implemented, use this module inside `TM-EVOLUTION-STEP` to produce a **Target Slice Body**.

Future `IR-SLICE-*` / owner-local `PFR-*` remain in the Target Slice Body until realization/materialization. Selection of a Slice boundary is planning authority for the Step, not proof that the Slice already exists in current implementation.

## Source Contract

Possible sources:
- selected Feature `FBS-*` / `BR-*` and material Scenario `SR-*`;
- Slice Discovery working plan;
- selected Domain owners;
- selected Shared capabilities;
- current implementation/tests/Evidence;
- relevant Screens/Scenarios where realization depends on them;
- known Evolution Step(s);
- accepted Proposal payload.

## Lens Profile

Required primary lens: `LENS-SLICE-VERTICALITY-INTEGRATION`.

Conditional: DDD, Evolution, Implementation Requirements Discovery, UI/spatial, quality/verifiability and Representation Lenses, plus selected [`RG-PRG-*`](../knowledge-bases/programming-principles/README.md) knowledge when material.

## Unit Contract Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Durable Slice Owner Contract`

| Result Unit | Meaning |
|---|---|
| `RU-SOWN-01` | Slice Responsibility / Boundary Contract |
| `RU-SOWN-02` | Slice Implementation Requirements |
| `RU-SOWN-03` | Evolution Impact — current-owner reverse references to concrete unrealized Evolution Steps that materially affect this realized Slice owner |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#5a-unit-applicability--materiality--disposition-contract). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-SOWN-01` | always once a durable Slice Owner Target is formed; it owns the durable end-to-end responsibility/boundary | no Unit-level omission after Target formation; when transient Slice Discovery is sufficient, the Target-level Slice-owner formation gate fails and no durable Slice Owner Target is formed |
| `RU-SOWN-02` | when durable owner-local implementation/proof constraints are needed | `OMITTED` when no Slice-local `IR/PFR` is necessary; zero Requirements is valid |
| `RU-SOWN-03` | for a current realized Slice owner, when concrete unrealized Steps materially affect its responsibility/boundary and reverse navigation/revalidation is useful | use `OMITTED` with a concise reason when no relevant Step exists; in a future Target Slice Body keep the Unit present but `OMITTED` because current-owner reverse projection is not applicable inside the Step-owned future body |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SOWN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SOWN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SOWN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SOWN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SOWN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SOWN-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SOWN-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SOWN-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SOWN-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SOWN-03`** — determine whether this Slice's responsibility/boundary is materially affected, then apply the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).
2. **Unit Work — `RU-SOWN-03`** — produce the Slice-local reverse navigation/revalidation projection under that shared contract.
3. **Closing Unit Checkpoint — `RU-SOWN-03`** — validate Slice-local revalidation/handoff needs and the shared projection-contract guards.

### RU-SOWN-01 — Slice Responsibility / Boundary Contract

Own proportionally:

```text
end-to-end responsibility / implementation result
Feature reference
FBS-* / BR-* realization references
material SR-* realization references when genuinely cross-Feature
semantic application entry/result when durable/useful
Domain owners used
Shared capability owners used
material persistence/external/side-effect boundaries
durable module / branch / adapter boundary meaning when material
```

Do not own Feature behavior itself and do not freeze volatile class/call topology as durable contract.

### RU-SOWN-02 — Slice Implementation Requirements

Own durable must-hold implementation constraints natural to this Slice:

```text
IR-SLICE-*
optional owner-local PFR-* when genuinely durable/non-obvious
```

A selected Shared capability realization may be shown adjacent to the IR without putting capability identity into the IR meaning unless that identity is itself contractually required:

```text
IR-SLICE-...
Requirement:
  <must-hold constraint>

Selected capability realization:
  SH-...

Capability binding:
  <binding ref when useful>
```

The Slice owns the `IR-SLICE-*` meaning; the Shared capability owns the selected consumer-to-capability binding. Use the shared [`Requirement Classification And Representation Contract`](../profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md). When addressable Slice IRs are represented as a table, use the exact reusable schema:

```text
Slice Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples
```

When owner-local `PFR-*` is material, use the shared exact `Proof Requirement | Type | Plain proof-realization requirement | Protects / verifies | QRPE / Examples` schema from the same contract.

### RU-SOWN-03 — Evolution Impact

This Slice owner-local Unit specializes the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). Its local affected surface is **Slice responsibility/boundary**. The shared contract owns inclusion threshold across candidate/selected/conditional/deferred Steps, truthful planning-position projection, depth/no-copy rules and post-realization removal from active future impact. This Target Module owns only the Unit identity, Slice owner-specific materiality test and local revalidation/handoff use.

## Production / Revalidation Method

```text
selected Feature FBS/BR/SR obligations + discovery/current implementation
→ establish a behavior-aligned end-to-end realization path and durable responsibility/boundary
→ reference Domain/Shared owners explicitly
→ select only durable owner-local IR/PFR
→ keep volatile class/call detail implementation-native
↺ revalidate from proof/Evidence/Feature or Evolution changes
```

## Proof Boundary

Normal Slice proof is whole-Slice / Feature integration proof through the semantic application boundary. It should assert meaningful Feature result/effects/forbidden effects rather than private call sequence.

Literal tests remain code/Exact authority; this Target owns only durable responsibility/constraints.

## Evolution

Future Slice impact belongs to the applicable `TM-EVOLUTION-STEP` / `RU-EVO-02`. When a candidate/selected post-Step Slice responsibility/boundary is sufficiently resolved for the requested Target Result depth, it may be represented by a Target Slice Body; selection is still required for canonical integration/materialization. `RU-SOWN-03` in the current owner is only reverse navigation/revalidation projection and does not maintain a second future roadmap.

## Validators / Handoff

```text
responsibility realizes selected Feature meaning without owning Feature behavior
semantic entry/result is coherent
Domain/Shared dependencies and ownership are explicit
IR-SLICE-* are truly durable/natural to this Slice
Shared realization bindings do not replace the Slice IR meaning
integration proof boundary is credible
known change can be revalidated without hidden duplicate roadmap
```

Handoff to Shared, Domain, Exact, Practical Test or affected upstream owners follows normal workflow/Findings.

## Representation

Use `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` per owner. Dedicated/hybrid representation is often useful because end-to-end responsibility can be distributed, but no dedicated file is mandatory.

## Guards

```text
Slice owner ≠ Feature behavior owner
Slice owner ≠ volatile class/call graph
Slice dependency ≠ loss of Slice locality
IR-SLICE-* ≠ Shared capability contract
representation choice ≠ semantic identity
```

## Behavior Realization Contract

```text
FBS / BR / material SR
→ Domain realization vs Slice realization vs joint realization
→ durable IR-SLICE-* only when a separate implementation must-hold exists
```

Reference upstream behavior instead of rewriting it. Slice-owned `ERR-IMP-SLICE-*` are expected failures created by selected Slice mechanisms.

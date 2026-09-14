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
- selected Feature and `BR-*`;
- Slice Discovery working plan;
- selected Domain owners;
- selected Shared capabilities;
- current implementation/tests/Evidence;
- relevant Screens/Scenarios where realization depends on them;
- known Evolution Step(s);
- accepted Proposal payload.

## Lens Profile

Required primary lens: `LENS-SLICE-VERTICALITY-INTEGRATION`.

Conditional: DDD, Evolution, Implementation Requirements Discovery, UI/spatial, quality/verifiability and Representation Lenses, plus selected [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge when material.

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

**Target Step Result:** `Durable Slice Owner Contract`

| Result Unit | Meaning |
|---|---|
| `RU-SOWN-01` | Slice Responsibility / Boundary Contract |
| `RU-SOWN-02` | Slice Implementation Requirements |
| `RU-SOWN-03` | Evolution Impact — current-owner reverse references to concrete unrealized Evolution Steps that materially affect this realized Slice owner |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-SOWN-01` | when an end-to-end Slice responsibility/boundary deserves durable ownership/addressability | omit the durable owner when transient Slice Discovery is sufficient |
| `RU-SOWN-02` | when durable owner-local implementation/proof constraints are needed | omit when no Slice-local IR/PFR is necessary; zero Requirements is valid |
| `RU-SOWN-03` | for a current realized Slice owner, when concrete unrealized Steps materially affect its responsibility/boundary and reverse navigation/revalidation is useful | omit when no relevant Step exists; omit from the Target Slice Body of the Step that owns the future change |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SOWN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SOWN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SOWN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SOWN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SOWN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SOWN-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SOWN-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SOWN-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SOWN-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SOWN-03`** — inspect concrete relevant Steps and confirm material impact on this current Slice responsibility/boundary.
2. **Unit Work — `RU-SOWN-03`** — retain compact Step references/revalidation pressure only; future Slice impact, selected Slice Discovery planning meaning and Target Slice Body remain Step-owned.
3. **Closing Unit Checkpoint — `RU-SOWN-03`** — ensure current Slice authority contains no copied future roadmap or volatile planned class/call topology.

### RU-SOWN-01 — Slice Responsibility / Boundary Contract

Own proportionally:

```text
end-to-end responsibility / implementation result
Feature reference
BR-* references
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

The Slice owns the `IR-SLICE-*` meaning; the Shared capability owns the selected consumer-to-capability binding.

### RU-SOWN-03 — Evolution Impact

For a current realized Slice owner, expose compact navigation/revalidation references to concrete unrealized Steps that materially affect this responsibility/boundary. Canonical future impact belongs to Step-side `RU-EVO-02`; selected Slice Discovery planning detail and any Target Slice Body remain in the Step. This reverse projection may be stored, generated or derived.

## Production / Revalidation Method

```text
selected Feature + discovery/current implementation
→ establish durable end-to-end responsibility/boundary
→ reference Domain/Shared owners explicitly
→ select only durable owner-local IR/PFR
→ keep volatile class/call detail implementation-native
↺ revalidate from proof/Evidence/Feature or Evolution changes
```

## Proof Boundary

Normal Slice proof is whole-Slice / Feature integration proof through the semantic application boundary. It should assert meaningful Feature result/effects/forbidden effects rather than private call sequence.

Literal tests remain code/Exact authority; this Target owns only durable responsibility/constraints.

## Evolution

Future Slice impact belongs to the applicable `TM-EVOLUTION-STEP` / `RU-EVO-02`. When a selected post-Step Slice responsibility/boundary is sufficiently resolved for materialization, it is represented by a Target Slice Body. `RU-SOWN-03` in the current owner is only reverse navigation/revalidation projection and does not maintain a second future roadmap.

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

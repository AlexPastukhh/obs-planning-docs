# TM-SLICE-OWNER — Durable End-to-End Slice Owner

Entry Point: `tm.slice_owner`  
Role: durable implementation responsibility owner

## Purpose

Own one durable end-to-end implementation responsibility corresponding to a selected Feature boundary. Slice independence means locality of responsibility/change, not absence of dependencies.

Transient `TM-IMPLEMENTATION-SLICE` may discover the realization but is not durable authority.

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

## Target Step-Result Contract

**Target Step Result:** `Durable Slice Owner Contract`

| Result Unit | Meaning |
|---|---|
| `RU-SOWN-01` | Slice Responsibility / Boundary Contract |
| `RU-SOWN-02` | Slice Implementation Requirements |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-SOWN-01` | when an end-to-end Slice responsibility/boundary deserves durable ownership/addressability | omit the durable owner when transient Slice Discovery is sufficient |
| `RU-SOWN-02` | when durable owner-local implementation/proof constraints are needed | omit when no Slice-local IR/PFR is necessary; zero Requirements is valid |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

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

Selected future Slice target state belongs to `TM-EVOLUTION-STEP`. Current owner may reference relevant Steps/impact but does not maintain a second owner-local Evolution Steps roadmap.

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

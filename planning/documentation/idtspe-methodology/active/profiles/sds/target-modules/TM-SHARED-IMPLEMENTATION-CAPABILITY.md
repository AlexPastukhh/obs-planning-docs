# TM-SHARED-IMPLEMENTATION-CAPABILITY — Durable Shared Implementation Capability

Entry Point: `tm.shared_implementation_capability`  
Role: durable reusable non-end-to-end implementation owner

## Purpose

Own one coherent reusable **non-end-to-end** implementation responsibility used by multiple Slice owners.

Ordinary explicit shared collaborators and concerns applied cross-cutting around Slice execution are the same Target family when the semantic responsibility is coherent. The difference is participation/application shape, not Target type.

## Existence Gate

Create/retain a Shared Capability when multiple selected Slice implementation requirements need the same coherent reusable responsibility.

Typical evidence:

```text
2+ concrete selected Slice consumers
```

Allowed exception:

```text
1 current selected consumer
+ a selected known Evolution Step establishes another concrete consumer
+ the seam is materially justified now
```

Reject extraction for common utility dumping, superficial duplication, one-Slice concern without real reuse/evolution pressure, Slice-specific policy, Domain semantics, or framework technique without independently coherent responsibility.

## Source Contract

Primary sources are selected `IR-SLICE-*` identities and concrete consumer Slices. Feature/Domain/Evolution/current implementation evidence may help classify ownership but do not replace the consumer requirement trace.

## Lens Profile

Required Core pack applies. Primary formation/extraction lens: `LENS-SLICE-VERTICALITY-INTEGRATION`.

Frequent conditional lenses: dependency/change impact, Evolution, simplicity/implementation economy, quality/risk/materiality, verifiability/observability/operability, DDD when the candidate may actually be Domain-owned, and Representation.

No Shared-specific or cross-cutting-specific Lens is required.

## Target Step-Result Contract

**Target Step Result:** `Shared Implementation Capability Contract`

| Result Unit | Meaning |
|---|---|
| `RU-SHARED-01` | Shared Capability Contract |
| `RU-SHARED-02` | Consumer Requirement Bindings |
| `RU-SHARED-03` | Shared Capability Implementation Requirements |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-SHARED-01` | when a coherent reusable non-end-to-end responsibility passes the Shared formation gate | omit the entire Shared owner when reuse/consumer pressure is insufficient |
| `RU-SHARED-02` | when concrete selected Slice consumers need durable realization bindings to the Shared capability | omit hypothetical consumers and bindings not grounded in selected Slice IR |
| `RU-SHARED-03` | when durable implementation constraints are naturally owned by the Shared capability | omit when implementation choices remain local/transient; no proof RU is required by default |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

### RU-SHARED-01 — Shared Capability Contract

Own proportionally:
- Responsibility;
- semantic capability/concern boundary;
- what is provided/applied;
- what remains Slice-local;
- material result/failure semantics;
- durable authority/dependency boundary;
- durable application/composition semantics when part of reusable capability.

Exact class/method/framework mechanism is not Target authority unless separately contractual.

### RU-SHARED-02 — Consumer Requirement Bindings

Canonical relation:

```text
Consumer Slice
+ selected IR-SLICE-*
+ SATISFIES | CONTRIBUTES_TO
+ compact semantic participation/application description when useful
```

Example — explicit dependency:

```text
Consumer Slice: SL-A
Requirement: IR-SLICE-A-RESOURCE-AUTHORITY
Role: SATISFIES
Participation:
  explicit semantic dependency
```

Example — cross-cutting application shape:

```text
Consumer Slice: SL-B
Requirement: IR-SLICE-B-UNCERTAIN-EFFECT
Role: CONTRIBUTES_TO
Participation:
  applied around external-effect boundary
```

Do not require a closed participation enum. One capability may have different participation shapes across bindings while its semantic responsibility remains coherent. Do not copy canonical Slice Requirement prose here.

### RU-SHARED-03 — Shared Capability Implementation Requirements

Own only durable constraints naturally owned by the Shared Capability:

```text
IR-SHARED-*
```

Do not duplicate consumer `IR-SLICE-*`.

## Production Method

```text
repeated consumer pressure
→ prove one coherent reusable responsibility exists
→ prove concrete consumer Slice IR need
→ define capability contract + consumer bindings
→ select Shared-local durable IR only when necessary
→ keep consumer-specific policy in each Slice
↺ revalidate from new/removed consumers and Evolution
```

## Runtime / Operability / Migration Position

Old Cross-Cutting semantics around runtime/operability/migration are preserved without a dedicated RU.

When durable and naturally owned by the Shared Capability, express the must-hold constraint in `RU-SHARED-03 / IR-SHARED-*`.

When it is only current mechanism detail, keep it implementation-native.

When it is future transition meaning, route it through `TM-EVOLUTION-STEP`.

Use Verifiability/Observability/Operability and Evolution Lenses plus selectively routed [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge as evaluation guidance when material.

## Domain Ownership Guard

A Shared Capability may consume Domain identity/events/semantic contracts, but it must not silently become owner of:
- Aggregate/Entity semantic state;
- invariants/consistency boundary;
- Domain lifecycle/transitions;
- Domain policy/semantic operations.

If such ownership pressure appears:

```text
Shared candidate
→ Finding / DDD evaluation
→ Domain owner or revised boundary
```

## Evolution

A future change to Shared capability target state belongs to `TM-EVOLUTION-STEP`. Current Shared owner records only current contract/IR/bindings and relevant Step references.

## Validators / Handoff

```text
coherent reusable non-end-to-end responsibility exists
existence gate is satisfied
each durable consumer binding traces to a selected Slice implementation need
consumer Slice policy/IR authority is not copied here
Domain ownership is not stolen
Shared IRs are natural-owner durable constraints only
proof is credible through consumers; local tests are supplemental
runtime/operability/migration meaning is placed as current IR, implementation detail or Evolution Step correctly
```

## Consumer Invariant

Durable architecturally meaningful consumption must trace to a selected Slice implementation need:

```text
TM-SLICE-OWNER / RU-SOWN-02 / IR-SLICE-*
↓ selected realization binding
TM-SHARED-IMPLEMENTATION-CAPABILITY / RU-SHARED-02
```

Not every import/helper/library is modeled.

If no selected Slice IR justifies the dependency, reconsider whether it is incidental implementation detail, Slice-local, missing IR, wrong natural owner or unnecessary shared ownership.

## Proof Boundary

Normal proof is through the consuming whole-Slice integration path. Shared Capability may have focused local implementation tests when useful. This Target has no mandatory Shared Proof/Test RU and does not imply a generic Test/Proof owner.

## Representation

Use `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`. Implementation-native, hybrid, dedicated owner artifact and existing-owner-section are all valid. The binding inventory is a strong candidate for compact textual representation when cross-Slice use would otherwise be hard to discover.

## Guards

```text
Shared Capability ≠ generic utility bucket
Shared Capability ≠ Domain semantic owner
Shared Capability ≠ Slice-specific policy
cross-cutting application shape ≠ separate Target type
consumer binding ≠ copied Slice Requirement
```

# TM-SHARED-IMPLEMENTATION-CAPABILITY — Durable Shared Implementation Capability

Module ID: `TM-SHARED-IMPLEMENTATION-CAPABILITY`

Entry Point: `tm.shared_implementation_capability`
Role: durable reusable non-end-to-end implementation owner

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Own one coherent reusable **non-end-to-end** implementation responsibility used by multiple Slice owners.

Ordinary explicit shared collaborators and concerns applied cross-cutting around Slice execution are the same Target family when the semantic responsibility is coherent. The difference is participation/application shape, not Target type.

## Temporal Authority / Evolution-Step Hosting

A canonical Shared owner describes a reusable capability and bindings that are **currently realized**. Future Shared responsibility or future consumer bindings are represented as a **Target Shared Body** inside `TM-EVOLUTION-STEP`.

A future consumer may justify a future Target Shared Body or a prepare-now Decision, but it does not count as an already-realized current consumer and does not create current Shared authority ahead of implementation.

## Existence Gate

Resolve the gate against the state being represented.

For a **current Shared owner**, require current implemented evidence that the capability has coherent reusable responsibility. Multiple current Slice consumers are the normal strong signal; a retained existing capability with fewer current consumers still needs independent current responsibility rather than hypothetical future demand.

For a **Target Shared Body inside an Evolution Step**, evaluate the complete post-Step target consumer set. Current consumers plus future Target Slice Bodies may justify the planned Shared responsibility when the selected/candidate route makes that reuse concrete.

```text
future consumer in Step
≠ current consumer
```

A prepare-now seam in current implementation requires its own current justification/Decision; the future Step is Evidence for that decision, not automatic current Shared-owner creation.

Reject extraction for common utility dumping, superficial duplication, one-Slice concern without real reuse/evolution pressure, Slice-specific policy, Domain semantics, or framework technique without independently coherent responsibility.

<a id="sds-commodity-shared-no-owner"></a>
## Commodity shared no-owner gate

Shared reuse alone does not justify a Shared semantic owner. When the realization is **commodity/obvious**, has **low independent complexity**, and has **non-custom semantics**, prefer no Shared Capability owner even if several Slices use it. Examples: a simple string parser, thin wrapper, routine helper or library/framework feature. Form a Shared owner only when it has independent durable responsibility such as custom policy/invariant, nontrivial failure/recovery, compatibility/evolution boundary, security/operability guarantee or applicability/bypass policy. Preserve the natural `IR-SLICE-*` owner and use an adjacent selected implementation realization reference. One optional retained Decision may coordinate a common selected library/module for several Slice requirements, for as long as the USER finds it useful; this is a selection trace, never a surrogate Shared owner.

## Source Contract

Primary sources are selected `IR-SLICE-*` identities and concrete consumer Slices **in the state being represented**: current realized Slices for a current Shared owner, or current/Target Slice Bodies for a future Target Shared Body. Feature/Domain/Evolution/current implementation evidence may help classify ownership but do not replace the consumer requirement trace.

## Lens Profile

Required Core pack applies. Primary formation/extraction lens: `LENS-SLICE-VERTICALITY-INTEGRATION`.

Frequent conditional lenses: dependency/change impact, Evolution, simplicity/implementation economy, quality/risk/materiality, verifiability/observability/operability, DDD when the candidate may actually be Domain-owned, and Representation.

No Shared-specific or cross-cutting-specific Lens is required.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Shared Implementation Capability Contract`

| Result Unit | Meaning |
|---|---|
| `RU-SHARED-01` | Shared Capability Contract |
| `RU-SHARED-02` | Consumer Requirement Bindings |
| `RU-SHARED-03` | Shared Capability Implementation Requirements |
| `RU-SHARED-04` | Evolution Impact — current-owner reverse references to concrete unrealized Evolution Steps that materially affect this realized Shared capability/bindings |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-SHARED-01` | always once a Shared capability Target is formed; it owns the coherent reusable responsibility | no Unit-level omission: when reuse/consumer pressure is insufficient, the Target-level Shared formation gate fails and no Shared owner Target should be formed |
| `RU-SHARED-02` | when concrete Slice consumers in the represented current/target state need durable realization bindings to the Shared capability | `OMITTED` when no grounded current/Target Slice consumer needs a durable realization binding |
| `RU-SHARED-03` | when durable implementation constraints are naturally owned by the Shared capability | `OMITTED` when no Shared-owned durable implementation constraint is material; zero Shared `IR/PFR` is valid |
| `RU-SHARED-04` | for a current realized Shared owner, when concrete unrealized Steps materially affect its capability/consumer bindings and reverse navigation/revalidation is useful | use `OMITTED` with a concise reason when no relevant Step exists; in a future Target Shared Body keep the Unit present but `OMITTED` because current-owner reverse projection is not applicable inside the Step-owned future body |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SHARED-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SHARED-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SHARED-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SHARED-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SHARED-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SHARED-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SHARED-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SHARED-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SHARED-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SHARED-03`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SHARED-03`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SHARED-03`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SHARED-04` processing envelope

1. **Opening Unit Checkpoint — `RU-SHARED-04`** — determine whether this Shared capability/consumer-binding surface is materially affected, then apply the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).
2. **Unit Work — `RU-SHARED-04`** — produce the Shared-local reverse navigation/revalidation projection under that shared contract.
3. **Closing Unit Checkpoint — `RU-SHARED-04`** — validate Shared-local revalidation/handoff needs and the shared projection-contract guards.

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

Do not duplicate consumer `IR-SLICE-*`. Use the shared [`Requirement Classification And Representation Contract`](../profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md). When addressable Shared IRs are represented as a table, use the exact reusable schema:

```text
Shared Implementation Requirement | Type | Plain implementation requirement | Realizes / protects | Related expected errors | QRPE / Examples
```

### RU-SHARED-04 — Evolution Impact

This Shared owner-local Unit specializes the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). Its local affected surface is **Shared capability/consumer bindings**. The shared contract owns inclusion threshold across candidate/selected/conditional/deferred Steps, truthful planning-position projection, depth/no-copy rules and post-realization removal from active future impact. This Target Module owns only the Unit identity, Shared owner-specific materiality test and local revalidation/handoff use.

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

Use Verifiability/Observability/Operability and Evolution Lenses plus selectively routed [`RG-PRG-*`](../knowledge-bases/programming-principles/README.md) knowledge as evaluation guidance when material.

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

Unresolved distant future Shared capability/binding impact may be bounded in the applicable `TM-EVOLUTION-STEP / RU-EVO-02`. A complete created/replaced post-Step Shared contract belongs in the Step Target Shared Body, mandatory when that owner is materialized by the next Step for realization; selection is still required for canonical integration/materialization. Current `RU-SHARED-04` records only reverse Step navigation/revalidation and never copies the future plan.

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

Durable architecturally meaningful consumption must trace to a selected Slice implementation need **in the same represented state**:

```text
current state:
  current TM-SLICE-OWNER / IR-SLICE-*
  ↓ realized binding
  current Shared owner / RU-SHARED-02

future Step state:
  Target Slice Body / future IR-SLICE-*
  ↓ selected future binding
  Target Shared Body / RU-SHARED-02
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

## Behavior / Error Ownership Guard

Shared capability owns reusable mechanics and `IR-SHARED-*`, not Feature/Scenario behavior meaning. The same shared mechanism may realize several behavior owners without becoming their semantic owner.

Expected failures created only by that mechanism may be `ERR-IMP-SHARED-*`. Shared typed-result transport must preserve consumer-defined error semantics instead of creating one global application error ontology.

## Copied project example

[Study Tab Launcher — Shared owner и честный OPEN P-STL-HANDOFF-01](../examples/study-tab-launcher/project/planning/documentation/shared/prepared-project-handoff.md). Read the [case guide and capture limits](../examples/study-tab-launcher/README.md) with the current module contract; the copied project is a dated example, not live application authority.

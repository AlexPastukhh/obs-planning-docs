# TM-DOMAIN-OWNER — Durable Domain Semantic Owner

Entry Point: `tm.domain_owner`
Role: durable semantic owner

## Purpose

Own one coherent durable Domain responsibility. Do not create one Target for every Entity, Value Object or Aggregate member; use a Target only where independent semantic ownership/review/revalidation is useful.

Transient `TM-DOMAIN-DISCOVERY` may be a Source, but never remains authority merely because it discovered the model.

## Temporal Authority / Evolution-Step Hosting

A canonical Domain owner describes the Domain semantics that are currently realized. If Domain meaning is being created/changed for an unrealized future state, use this module as supporting methodology inside `TM-EVOLUTION-STEP` and produce a **Target Domain Body**.

Future `IR-DOMAIN-*` / owner-local `PFR-*` remain inside that Target Domain Body. Selection alone does not replace the current Domain owner. After realization + required proof/revalidation, Target Owner Materialization may `CREATE`, `REPLACE` or `RETIRE` the current Domain owner.

## Source Contract

Possible sources:
- selected Feature behavior (`FBS-*` and `BR-*`);
- Domain Discovery working plans;
- current implementation/tests/Evidence;
- selected Slice consumers;
- known Evolution Step(s);
- accepted Proposal payload.

## Lens Profile

Required primary lens: `LENS-DOMAIN-MODELING-DDD`.

Conditional: Evolution, Implementation Requirements Discovery, quality/verifiability and Representation Lenses, plus selected [`RG-PRG-*`](../knowledge-bases/programming-principles/README.md) knowledge when material.

## Unit Contract Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Durable Domain Owner Contract`

| Result Unit | Meaning |
|---|---|
| `RU-DOWN-01` | Domain Semantic Contract |
| `RU-DOWN-02` | Domain Implementation Requirements |
| `RU-DOWN-03` | Evolution Impact — current-owner reverse references to concrete unrealized Evolution Steps that materially affect this realized Domain owner |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#5a-unit-applicability--materiality--disposition-contract). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-DOWN-01` | always once a durable Domain owner Target is formed; it owns that durable responsibility/boundary | no Unit-level omission: when discovery does not justify a durable Domain responsibility, the Target-level owner-formation gate fails and no Domain owner Target should be formed |
| `RU-DOWN-02` | when durable implementation/proof constraints are naturally owned by the Domain | `OMITTED` when no Domain-owned `IR/PFR` is needed; zero Requirements is valid |
| `RU-DOWN-03` | for a current realized Domain owner, when concrete unrealized Steps materially affect its semantics/responsibility and reverse navigation/revalidation is useful | use `OMITTED` with a concise reason when no relevant Step exists; in a future Target Domain Body keep the Unit present but `OMITTED` because current-owner reverse projection is not applicable inside the Step-owned future body |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-DOWN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-DOWN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOWN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOWN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-DOWN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-DOWN-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOWN-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOWN-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-DOWN-03` processing envelope

1. **Opening Unit Checkpoint — `RU-DOWN-03`** — determine whether this Domain's semantics/responsibility is materially affected, then apply the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).
2. **Unit Work — `RU-DOWN-03`** — produce the Domain-local reverse navigation/revalidation projection under that shared contract.
3. **Closing Unit Checkpoint — `RU-DOWN-03`** — validate Domain-local revalidation/handoff needs and the shared projection-contract guards.

### RU-DOWN-01 — Domain Semantic Contract

Own proportionally:

```text
responsibility / meaning
identity / equality
state / lifecycle
invariants / consistency boundary
semantic operations / rules
Domain failure/result semantics when material
FBS-* / BR-* realization references where Feature behavior is a source
useful neighbor / consumer relations
```

Exact class/file layout is not part of this RU unless independently contractual.

### RU-DOWN-02 — Domain Implementation Requirements

Own durable must-hold constraints whose natural implementation owner is this Domain owner:

```text
IR-DOMAIN-*
optional owner-local PFR-* when a non-obvious durable proof-realization constraint genuinely exists
```

Requirement wording owns the must-hold meaning. Tests prove it; they do not define it. Use the shared [`Requirement Classification And Representation Contract`](../profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md). When addressable Domain IRs are represented as a table, use the exact reusable schema:

```text
Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples
```

When owner-local `PFR-*` is material, use the shared exact `Proof Requirement | Type | Plain proof-realization requirement | Protects / verifies | QRPE / Examples` schema from the same contract.

### RU-DOWN-03 — Evolution Impact

This Domain owner-local Unit specializes the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). Its local affected surface is **Domain semantics/responsibility**. The shared contract owns inclusion threshold across candidate/selected/conditional/deferred Steps, truthful planning-position projection, depth/no-copy rules and post-realization removal from active future impact. This Target Module owns only the Unit identity, Domain owner-specific materiality test and local revalidation/handoff use.

## Production / Revalidation Method

```text
selected Feature FBS/BR + discovery/current Domain truth
→ state which FBS/BR this owner realizes fully/partially/jointly
→ establish only Domain semantics needed for that realization
→ keep only durable implementation constraints in RU-DOWN-02
→ prove Domain semantics through focused implementation-native unit proof
↺ revalidate from Slice consumer Evidence / known Evolution / changed Feature behavior
```

A durable owner may exist without a dedicated Markdown artifact when implementation-native representation is sufficient.

## Proof Boundary

Domain unit proof belongs with the Domain realization and proves semantic rules/invariants directly. It is not a separate Domain Proof Result Unit and does not transfer semantic authority to tests.

## Evolution

Relevant concrete Evolution Steps are Sources for revalidation and are exposed proportionally through `RU-DOWN-03`. Future Domain impact belongs to Step-side `RU-EVO-02`; a sufficiently resolved candidate/selected post-Step Domain contract may be represented by the Step Target Domain Body at the requested Target Result depth, while actual selection remains required for canonical integration/materialization. Current Domain owner remains current semantic authority until realization and Target Owner Materialization change it. Physical representation promotion/demotion remains a separate P-14 concern.

## Validators / Handoff

```text
semantic responsibility is independently coherent
Feature BR refs are sources, not duplicated behavior authority
identity/lifecycle/invariants/operations agree
IR-DOMAIN-* are only durable natural-owner constraints
proof can observe Domain semantics without unnecessary UI/network coupling
representation preserves discoverability of material non-code meaning
```

Consumers reference this owner from Slice/Shared relations. Material owner changes trigger dependent revalidation through Core consistency/finding mechanics.

## Representation

Use Core `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` per owner.

Valid representations include implementation-native, hybrid, dedicated owner artifact or an existing owner section. Domain-native representation is often enough when types/state/invariants/operations/tests make the whole durable contract discoverable; promote to hybrid/dedicated representation when material non-code residue remains.

## Guards

```text
one Domain owner ≠ one DDD type
Domain owner ≠ persistence schema
Domain owner ≠ discovery plan
Feature BR remains Feature authority
IR-DOMAIN-* belongs here only when this owner is natural authority
representation choice ≠ semantic identity
```

## Behavior Realization Contract

Make upstream realization explicit when material:

```text
FBS-* / BR-* realized
→ FULL | PARTIAL | JOINT (descriptive, not mandatory enum)
→ Domain responsibility / invariant / semantic operation that realizes it
```

Do not turn the owner into a generic code state/lifecycle catalog. Domain-owned `ERR-IMP-DOMAIN-*` exist only for expected failures created by the selected Domain mechanism.

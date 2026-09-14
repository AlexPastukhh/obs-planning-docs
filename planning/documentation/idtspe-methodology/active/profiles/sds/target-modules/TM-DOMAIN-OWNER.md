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
- selected Feature behavior (`BR-*`);
- Domain Discovery working plans;
- current implementation/tests/Evidence;
- selected Slice consumers;
- known Evolution Step(s);
- accepted Proposal payload.

## Lens Profile

Required primary lens: `LENS-DOMAIN-MODELING-DDD`.

Conditional: Evolution, Implementation Requirements Discovery, quality/verifiability and Representation Lenses, plus selected [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge when material.

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

**Target Step Result:** `Durable Domain Owner Contract`

| Result Unit | Meaning |
|---|---|
| `RU-DOWN-01` | Domain Semantic Contract |
| `RU-DOWN-02` | Domain Implementation Requirements |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-DOWN-01` | when a durable Domain owner has independently useful semantic responsibility | omit the entire durable owner when discovery does not justify that responsibility |
| `RU-DOWN-02` | when durable implementation/proof constraints are naturally owned by the Domain | omit when no owner-local IR/PFR is needed; zero Requirements is valid |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-DOWN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-DOWN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOWN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOWN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-DOWN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-DOWN-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-DOWN-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-DOWN-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

### RU-DOWN-01 — Domain Semantic Contract

Own proportionally:

```text
responsibility / meaning
identity / equality
state / lifecycle
invariants / consistency boundary
semantic operations / rules
Domain failure/result semantics when material
BR-* references where Feature behavior is a source
useful neighbor / consumer relations
```

Exact class/file layout is not part of this RU unless independently contractual.

### RU-DOWN-02 — Domain Implementation Requirements

Own durable must-hold constraints whose natural implementation owner is this Domain owner:

```text
IR-DOMAIN-*
optional owner-local PFR-* when a non-obvious durable proof-realization constraint genuinely exists
```

Requirement wording owns the must-hold meaning. Tests prove it; they do not define it.

## Production / Revalidation Method

```text
selected discovery/current Domain truth
→ establish semantic responsibility + identity/state/lifecycle/invariants/operations
→ keep only durable implementation constraints in RU-DOWN-02
→ prove Domain semantics through focused implementation-native unit proof
↺ revalidate from Slice consumer Evidence / known Evolution / changed Feature behavior
```

A durable owner may exist without a dedicated Markdown artifact when implementation-native representation is sufficient.

## Proof Boundary

Domain unit proof belongs with the Domain realization and proves semantic rules/invariants directly. It is not a separate Domain Proof Result Unit and does not transfer semantic authority to tests.

## Evolution

Relevant selected Evolution Steps are Sources for revalidation. Future target Domain state belongs inside the Step Target Domain Body; current Domain owner remains current authority until realization and Target Owner Materialization change it. Physical representation promotion/demotion remains a separate P-14 concern.

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

# TM-EVOLUTION-STEPS-MAP — Evolution Steps Map

Entry Point: `tm.evolution_steps_map`  
Role: persistent registry/coordination Target

## Purpose

Provide discoverable routing across **concrete known future transitions** without duplicating each Evolution Step's complete future-state plan or Target Owner Bodies.

The Map coordinates identity, selection/candidate visibility, prerequisites, alternatives/conditions, horizon, readiness and compact uncertainty. `TM-EVOLUTION-STEP` owns the full future-transition planning state.

## Registry Boundary

A Map row does not imply that a Step is selected or will definitely be realized.

Valid registered future-transition states include, proportionally:

```text
concrete candidate Step
selected Step
conditional Step
deferred Step
alternative/mutually exclusive Step route
```

Use ordinary Core Proposal/Planning-Branch/Decision semantics to represent actual selection/alternative authority. The Map may project those relations for navigation.

Do **not** register vague speculative ideas whose transition/driver is not concrete enough to deserve Step identity. Such pressure can remain Proposal/Q/R/P/working discussion until it becomes an addressable Step candidate.

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

**Target Step Result:** `Evolution Steps Registry / Coordination Map`

| Result Unit | Meaning |
|---|---|
| `RU-EVOMAP-01` | Registry / Routing |
| `RU-EVOMAP-02` | Relations / Horizon / Readiness / Uncertainty Summary |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-EVOMAP-01` | when several concrete Evolution Steps/candidates need lightweight registry/routing visibility | omit rows for vague unbounded future ideas that do not yet deserve Step identity |
| `RU-EVOMAP-02` | when prerequisite/alternative/condition/horizon/readiness/uncertainty relations materially affect navigation, selection or revalidation | omit relation/detail that does not affect routing/readiness/decision quality |

Do not create `N/A` placeholders.

### Explicit Unit Checkpoint Placement

Each material Unit inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints).

#### `RU-EVOMAP-01` processing envelope

1. **Opening Unit Checkpoint — `RU-EVOMAP-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates before material registry work.
2. **Unit Work — `RU-EVOMAP-01`** — register only concrete Step identities/routes needed for discovery/navigation.
3. **Closing Unit Checkpoint — `RU-EVOMAP-01`** — ensure every row resolves to one Step authority and no vague wishlist item was promoted to Step identity by registry existence alone.

#### `RU-EVOMAP-02` processing envelope

1. **Opening Unit Checkpoint — `RU-EVOMAP-02`** — identify only relation/readiness/uncertainty dimensions that materially affect current navigation or decisions.
2. **Unit Work — `RU-EVOMAP-02`** — maintain compact relations and projections without copying Step target-state bodies.
3. **Closing Unit Checkpoint — `RU-EVOMAP-02`** — verify readiness uses actual realized Entry State and projected selection/confidence does not masquerade as realization.

### RU-EVOMAP-01 — Registry / Routing

For each registered Step keep enough navigation to find its authority:

```text
Step ID / name
kind when useful
Step authority / artifact reference or embedded shallow Step
brief transition purpose / affected capability
candidate/selected/conditional/deferred visibility when useful
Proposal / Decision / Planning Branch reference when selection meaning matters
```

A shallow Step may be embedded when independent artifact depth adds no value. A substantial Step should have dedicated addressability. Representation choice does not change Step identity.

### RU-EVOMAP-02 — Relations / Horizon / Readiness / Uncertainty

Own coordination such as:

```text
semantic requires relations
derived enables navigation
alternative / mutually-exclusive / conditional relation projection
planning horizon / selected vs candidate vs deferred visibility
readiness based on expected Entry State vs actual realized state
compact uncertainty/confidence basis when it materially affects selection/readiness
cycle / contradiction pressure
```

Do not invent a mandatory Step-status or confidence enum. Use compact projections over canonical Proposal/Decision/Branch/Evidence/uncertainty state.

Readiness distinguishes:

```text
predecessor planned or selected
≠ predecessor target state realized
```

## Production / Representation

Maintain the smallest registry sufficient for discovery/routing.

A map entry may reference a dedicated Step or embed a shallow Step. Do not copy detailed Target Feature/Scenario/Screen/Domain/Slice/Shared bodies from a substantial Step.

A generated/derived relation view is valid when it can be regenerated from Step/Core authorities.

## Post-Realization Projection

After successful realization + required proof/revalidation + Target Owner Materialization, a Step is no longer an active unrealized future transition. Remove it from the active candidate/selected/deferred/readiness projection.

When later `requires` interpretation, readiness, navigation or lineage still depends on that Step identity, the Map may retain or derive a compact **realized prerequisite / lineage reference** sufficient to resolve the Step and the fact that its target state was realized. Do not copy its former Target Owner Bodies back into the Map.

```text
selected/planned Step
→ active future projection

realization + proof/revalidation + materialization
→ leave active future projection

identity still needed by later requires/readiness/lineage
→ compact realized prerequisite / lineage reference
```

This is a lifecycle/projection rule, not a mandatory Step-status enum. A realized Step may remain historical lineage, but it must not continue to look like pending future work. Current-owner `Evolution Impact` reverse projections likewise stop presenting that Step as active future impact after realization/materialization; any independently useful historical reference is lineage/navigation, not current evolution pressure.

## Validators / Handoff

```text
every listed Step resolves to one Step authority
candidate/selected/conditional visibility is truthful
requires direction is unambiguous
enables is treated as derived navigation
alternative relations do not invent a second Proposal/Branch lifecycle
readiness compares actual realized state to expected Entry State
selected/planned Step is not treated as realized
confidence/uncertainty summary has evidence/assumption basis when material
Map does not duplicate full Step Target Owner Bodies
cycle/contradiction pressure is surfaced
source discovery loads only relevant Steps
realized Steps are not left in the active future projection
realized prerequisite/lineage references remain compact and do not copy old target state
```

## Source Discovery Rule

Material SDS future-planning/current-impact work may scan the Steps Map directly. A separate “plan the Map first” invocation is not required before planning one concrete Step.

```text
current concern / direct Step request
→ scan Map when available/useful for identity/requires/alternatives/readiness context
→ open only relevant Step authority
→ if a newly concrete Step needs registry visibility, hand its identity/relations back to Map
```

Do not force every Target operation to load every Evolution Step.

## Guards

```text
Steps Map ≠ full Step target state
Map relation ≠ copied owner semantics
Map row ≠ selection
selection ≠ realization
requires is semantic prerequisite
readiness is not inferred from plan existence alone
vague future idea ≠ Step merely because a Map could list it
realized Step ≠ active future Step
realized prerequisite reference ≠ duplicated historical target state
```

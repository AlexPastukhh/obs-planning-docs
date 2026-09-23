# TM-EVOLUTION-STEPS-MAP — Evolution Steps Map

Module ID: `TM-EVOLUTION-STEPS-MAP`

Entry Point: `tm.evolution_steps_map`
Role: persistent registry/coordination Target

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Provide discoverable routing across **concrete known future transitions** without duplicating each Evolution Step's complete future-state plan or Target Owner Bodies.

The Map coordinates discoverable **projections** of Step identity, planning position, relations, target-resolution visibility, concern/readiness state and compact uncertainty. `TM-EVOLUTION-STEP` owns those Step semantics; the Map owns only registry/routing/projection behavior.

## Registry Boundary

A Map row does not imply that a Step is selected or will definitely be realized.

Valid registered future-transition states include, proportionally:

```text
concrete candidate / Probable Step
selected Step
conditional Step
deferred Step
alternative/mutually exclusive Step route
```

Use ordinary Core Proposal/Planning-Branch/Decision semantics to represent actual selection/alternative authority. The Map projects those relations for navigation.

Do **not** register vague speculative ideas whose transition/driver is not concrete enough to deserve Step identity. Such pressure can remain Proposal/Q/R/P/working discussion until it becomes an addressable Step candidate.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). Core owns generic Unit lifecycle/presence/disposition semantics; this module owns only the Map-specific projection Unit responsibilities, materiality, production guidance and validators below.

## Target Step-Result Contract

**Target Step Result:** `Evolution Steps Registry / Coordination Map`

| Result Unit | Meaning |
|---|---|
| `RU-EVOMAP-01` | Registry / Routing — concrete Step identity, authority/navigation, purpose and planning-position projection |
| `RU-EVOMAP-02` | Semantic Relations / Concerns / Planning Completeness / Start Readiness — direct `Entering From`, alternative/condition/horizon, compact Step-wide concern status and the two distinct readiness conclusions |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only Map-specific substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-EVOMAP-01` | one or more concrete Steps need discoverable registry/routing visibility | `OMITTED` — no concrete Evolution Step currently deserves registry identity |
| `RU-EVOMAP-02` | predecessor/alternative/condition/horizon/concern/readiness/uncertainty projection materially affects navigation, realization ordering or review | `OMITTED` with a concise reason when no cross-Step relation/readiness detail is material beyond the registry rows |


### Explicit Unit Checkpoint Placement

Each material Unit inherits the Core [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope).

#### `RU-EVOMAP-01` processing envelope

1. **Opening Unit Checkpoint — `RU-EVOMAP-01`** — bind the Map Unit method and inspect only plausible concrete Step authorities.
2. **Unit Work — `RU-EVOMAP-01`** — register concrete Step identities/routes needed for discovery/navigation and project truthful planning position.
3. **Closing Unit Checkpoint — `RU-EVOMAP-01`** — every row resolves to one Step authority; no vague wishlist item is promoted to Step identity by registry existence alone.

#### `RU-EVOMAP-02` processing envelope

1. **Opening Unit Checkpoint — `RU-EVOMAP-02`** — load only relation/concern/readiness/uncertainty dimensions material to current navigation/review.
2. **Unit Work — `RU-EVOMAP-02`** — project direct semantic predecessor relations, Step-wide concern status and both readiness conclusions without copying Target Bodies/concerns.
3. **Closing Unit Checkpoint — `RU-EVOMAP-02`** — verify the projected relation/concern/readiness values resolve to the Step authority and do not invent or recompute Step semantics locally.

## `RU-EVOMAP-01` — Registry / Routing

For each registered Step keep enough navigation to find its authority:

```text
Step ID / name
Step authority / artifact reference or embedded shallow Step
brief transition purpose / affected capability
kind when useful
planning position / Proposal / Decision / Planning Branch reference when material
principal target owners / target-resolution summary
```

A shallow Step may be embedded when independent artifact depth adds no value. A substantial Step should have dedicated addressability. Representation choice does not change Step identity.

## `RU-EVOMAP-02` — Semantic Relations / Concerns / Planning Completeness / Start Readiness

Own compact coordination projections such as:

```text
Entering From direct semantic predecessor Step(s)
derived enables navigation
alternative / mutually-exclusive / conditional relation projection
planning horizon / candidate vs selected vs deferred visibility
Step-wide Implementation Concern status/reference
Planning Completeness: COMPLETE | INCOMPLETE
Realization Start Readiness: READY | BLOCKED
compact uncertainty/confidence basis when material
cycle / contradiction pressure
```

### Projection Source Contracts

`RU-EVOMAP-02` reads and projects, but does not independently define or recompute:

- `Entering From` semantic predecessor meaning;
- `RU-EVO-03` Step-wide Implementation Concern status;
- Planning Completeness;
- Realization Start Readiness.

Those semantics are owned by [`TM-EVOLUTION-STEP`](TM-EVOLUTION-STEP.md). The Map stores enough Step reference/status information for navigation/coordination and points readers back to that authority for reasons and conditions. Current-owner reverse Evolution Impact lifecycle is governed separately by the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).

## Production / Representation

Prefer a compact registry/table with these canonical columns when a table is useful:

```text
Step
Planning Position
Change Surface / Role
Principal Target Owners / Target Resolution
Enters From
Step-wide Implementation Concerns
Planning Completeness
Realization Start Readiness
```

Planning Position, Target Resolution, Planning Completeness, Start Readiness and Realization are independent. `Probable ≠ Selected`; `Complete Target ≠ Start Ready`; `Start Ready ≠ Realized`. Project an accounted but incompletely planned distant Step as `INCOMPLETE`, and the next Step as `READY` only after the Step-owned `RU-EVO-06` verifies its full target state and reciprocal impact references for other concrete Steps. The Map does not invent an `ACCOUNTED` completion status.

For non-trivial branching include a compact derived semantic DAG/read-path view. `Entering From` edges are semantic predecessor edges; do not create a second technical-foundation DAG. Detailed reasons/Q/R/P remain in each Step.

## Post-Realization Projection

After successful realization + required proof/revalidation + Target Owner Materialization, a Step is no longer an active unrealized future transition. Remove it from the active candidate/selected/deferred/start-readiness projection.

When later `Entering From` interpretation, readiness, navigation or lineage still depends on that Step identity, the Map may retain/derive a compact **realized predecessor / lineage reference** sufficient to resolve the Step and the fact that its target state was realized. Do not copy former Target Owner Bodies back into the Map.

The active/future projection is a navigation/readiness projection, **not a mandatory Step-status enum**. Once realized/materialized, a Step must not continue to look like pending future work; only the compact realized predecessor / lineage reference may remain when later semantic lineage needs it.

```text
candidate/selected Step
→ active future projection

realization + proof/revalidation + materialization
→ leave active future projection

identity still needed by later Entering From/readiness/lineage
→ compact realized predecessor / lineage reference
```

Current-owner reverse Evolution Impact projection lifecycle follows the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md); the Map does not maintain a second copy of that rule.

## Validators / Handoff

```text
every listed Step resolves to one Step authority
planning position is truthful
projected Entering From / concern / readiness values resolve to and match the Step authority
enables remains derived navigation
no copied Expected Entry State or concern/readiness authority exists in the Map
Step-wide concern projection points to the Step and does not copy concern bodies
candidate/Probable/conditional/deferred does not masquerade as Selected
Map does not duplicate Target Owner Bodies
realized Steps are not left in active future projection
```

## Source Discovery Rule

Material SDS future-planning/current-impact work may scan the Steps Map directly. A separate “plan the Map first” invocation is not required before planning one concrete Step.

```text
current concern / direct Step request
→ scan Map when available/useful for identity/Entering From/alternatives/readiness context
→ open only relevant Step authority
→ if a newly concrete Step needs registry visibility, hand identity/relations/readiness projection back to Map
```

Do not force every Target operation to load every Evolution Step.

## Guards

```text
Steps Map ≠ full Step target state
Map relation ≠ copied owner semantics
Map row ≠ selection
selection ≠ realization
Entering From / concern / readiness semantics → project from `TM-EVOLUTION-STEP`, do not redefine
Map projection ≠ Step authority
Start-readiness projection ≠ realization authority
vague future idea ≠ Step merely because a Map could list it
realized predecessor reference ≠ duplicated historical target state
```

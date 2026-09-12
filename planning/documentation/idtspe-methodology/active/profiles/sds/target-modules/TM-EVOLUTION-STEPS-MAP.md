# TM-EVOLUTION-STEPS-MAP — Evolution Steps Map

Entry Point: `tm.evolution_steps_map`  
Role: persistent registry/coordination Target

## Purpose

Provide discoverable routing across selected Evolution Steps without duplicating each Step's complete target state.

The Map coordinates identity, prerequisites, horizon and readiness. `TM-EVOLUTION-STEP` owns the full target state.

## Target Step-Result Contract

**Target Step Result:** `Evolution Steps Registry / Coordination Map`

| Result Unit | Meaning |
|---|---|
| `RU-EVOMAP-01` | Registry / Routing |
| `RU-EVOMAP-02` | Relations / Horizon / Readiness |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-EVOMAP-01` | when several selected Evolution Steps need lightweight registry/routing visibility | omit rows for speculative/unselected future ideas |
| `RU-EVOMAP-02` | when prerequisite/order/horizon/readiness relations materially affect navigation or revalidation | omit relation detail that does not affect routing/readiness |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

### RU-EVOMAP-01 — Registry / Routing

For each selected Step keep enough navigation to find its authority:

```text
Step ID / name
kind
owner/artifact reference or embedded shallow Step
brief purpose / affected capability
```

A shallow Step may be embedded when independent artifact depth adds no value; a substantial Step should have dedicated addressability. Representation choice does not change Step identity.

### RU-EVOMAP-02 — Relations / Horizon / Readiness

Own coordination such as:

```text
semantic requires relations
derived enables navigation
planning horizon / selected vs deferred visibility
readiness based on expected Entry State vs actual realized state
cycle / contradiction pressure
```

Readiness distinguishes:

```text
predecessor planned
≠ predecessor target state realized
```

## Production / Representation

Maintain the smallest registry sufficient for discovery/routing.

A map entry may reference a dedicated Step or embed a shallow Step. Do not copy detailed target Feature/Scenario/Domain/Slice/Shared state from a substantial Step.

A generated/derived relation view is valid when it can be regenerated from Step authorities.

## Validators / Handoff

```text
every listed Step resolves to one Step authority
requires direction is unambiguous
enables is treated as derived navigation
readiness compares actual realized state to expected Entry State
horizon/deferred state does not masquerade as current product truth
cycle/contradiction pressure is surfaced
source discovery loads only relevant Steps
```

## Source Discovery Rule

Material SDS Target Source Discovery should lazily scan the Steps Map, then read only relevant Step authority when known Evolution may affect the current work.

Do not force every Target operation to load every Evolution Step.

## Guards

```text
Steps Map ≠ full Step target state
Map relation ≠ copied owner semantics
requires is semantic prerequisite
readiness is not inferred from plan existence alone
```

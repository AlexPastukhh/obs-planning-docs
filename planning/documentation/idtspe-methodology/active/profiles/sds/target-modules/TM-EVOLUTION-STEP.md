# TM-EVOLUTION-STEP — Evolution Step

Entry Point: `tm.evolution_step`  
Role: persistent selected future-state planning owner

## Purpose

Own one coherent qualitative transition to a complete, internally consistent, usable target state.

An Evolution Step is not a detached delta list. It states the expected Entry State and the complete selected target meaning at completion within the affected coherent capability boundary.

## Step Semantics

```text
Expected Entry State
+ retained meaning
+ new / changed / removed meaning
= complete Step Target State at completion
```

Annotate target-state elements relative to Step Entry State when useful:

```text
[EXISTING]
[NEW]
[CHANGED]
[REMOVED]
```

Meaning created by an earlier required Step is `[EXISTING]` in a later Step once it belongs to that later Step's expected Entry State.

## Relations

Canonical prerequisite relation:

```text
Step B requires Step A
```

`requires` states a semantic prerequisite. `enables` is derived reverse navigation. Dependency cycles are architecture pressure and require re-evaluation rather than acceptance as normal planning topology.

## Step Kinds

Use one or more proportionally; Kinds are composable rather than a mandatory exclusive enum:

- Introduction;
- Expansion;
- Refactoring;
- Forced Migration;
- Retirement.

The kind describes transition character; it does not replace the target-state contract.

## Source / Readiness Contract

Before realization, compare actual current state to the Step's expected Entry State. Planned predecessor existence is not equivalent to Entry State being realized.

A Step must be independently valid/usable at its own finish. Do not create an intermediate Step that only makes sense if a later Step is also completed unless the intermediate result is itself coherent.

## Target Step-Result Contract

**Target Step Result:** `Evolution Step Target State`

| Result Unit | Meaning |
|---|---|
| `RU-EVO-01` | Step Target State — expected Entry State plus the complete target meaning at completion, including prerequisite relations and material realization/proof consequences |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-EVO-01` | when a selected known qualitative future transition has enough meaning to state entry prerequisites and complete target state | omit the whole Step for vague/speculative “may change later” pressure |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

Natural target planning forms are reused inside `RU-EVO-01` rather than inventing a generic delta schema. Depending on the affected meaning, a Step may describe selected Feature, Scenario, Screen, Domain, Slice, Shared, application or other owner state.

Within the affected coherent capability boundary the target state is complete. Unaffected owners may be referenced instead of copied.

## Production Method

```text
material selected future transition
→ define coherent Step boundary / expected Entry State
→ identify affected Benefits/Features/Scenarios/Screens/Domain/Slice/Shared meaning
→ progressively refine complete target state
→ use [EXISTING]/[NEW]/[CHANGED]/[REMOVED] when useful
→ record real semantic prerequisites with requires
→ verify Step is internally usable/coherent at completion
```

One Step may contain several Feature/Slice changes when only their composition creates a usable target state. Several commits/packages may realize one Step; implementation packaging does not define application Evolution Step boundaries.

## Representation

Early shallow representation is valid. A substantial Step may have a dedicated owner artifact; a shallow Step may be embedded in the Steps Map. Representation does not change semantic Step identity.

## Validators / Handoff

```text
Step ends in complete internally consistent usable target state
Expected Entry State is explicit enough for readiness
planned predecessor is not confused with realized Entry
requires relations are semantic prerequisites
cycles trigger architecture re-evaluation
future Feature/Scenario/Screen/owner state is complete enough for current planning depth
unaffected owners are referenced rather than copied
current owners remain current authority until realization
```

Before implementation, compare actual state to expected Entry. After realization, revalidate durable owners/code/tests and retain the Step as historical/planning lineage.

## Evolution Impact

Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` to evaluate impact/change isolation against the natural owners. There is no generic durable Evolution Impact Target; impact remains owner-local.

## After Realization

After implementation, current durable owners/code/tests regain current-state authority. The Evolution Step remains transition history and selected planning lineage; it does not become a second current-state semantic owner.

## Guards

```text
Step ≠ detached change list
planned predecessor ≠ realized Entry State
requires ≠ chronology-only ordering
Step target state must be coherent at finish
future Step ≠ authority for current state
```

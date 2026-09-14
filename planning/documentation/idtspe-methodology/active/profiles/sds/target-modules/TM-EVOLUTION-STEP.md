# TM-EVOLUTION-STEP — Evolution Step

Entry Point: `tm.evolution_step`  
Role: persistent bounded future-transition planning owner

## Purpose

Own one coherent **not-yet-realized** qualitative transition from an expected Entry State toward one or more concrete candidate/selected future target-state routes.

An Evolution Step is the canonical SDS semantic owner for materially planned future state. Current natural owners remain authority for realized/current truth until the represented transition is actually implemented and the required proof/revalidation succeeds.

```text
current realized owners / implementation / Evidence
+ transition driver / constraints
+ candidate or selected future meaning
= Evolution Step planning state
```

The Step is not a detached delta list and not a second current-state owner.

## Temporal Authority Boundary

```text
current natural owner
= realized / implemented current truth

Evolution Step Target Owner Body
= selected or candidate post-Step owner-shaped meaning
  while that meaning is still unrealized

Target Owner Materialization
= semantic authority transition after implementation + required proof/revalidation
```

Selection is not realization:

```text
Proposal selected
≠ target body materialized
≠ current owner changed
```

Absence is a valid current Entry State. Creating the first Feature, Scenario, Screen, Domain, Slice, Shared capability, Application Definition or owner-local Requirement may therefore be planned as an Evolution Step from `not present` to the selected post-Step body.

## Step Identity, Alternatives And Uncertainty

A Step may be worth addressability before one final route is selected when the transition itself is concrete enough to plan/review. Use existing Core semantics rather than a Step-specific alternative ontology:

```text
materially different future route
→ Proposal

route needs deep downstream counterfactual exploration
→ Planning Branch

USER / applicable authority selection
→ Decision
```

`ASSUMED_FOR_BRANCH ≠ SELECTED`; `SELECTED ≠ REALIZED`.

A Planning Branch may reuse this Step's Target Owner Body production methods and carry **branch-local candidate bodies** as downstream branch planning. Those bodies are branch-scoped Target results/state for comparison, not the canonical selected `RU-EVO-01`. After root selection, run the normal branch promotion/consistency check before integrating justified body meaning into the canonical Step Result.

Uncertainty/confidence is also independent of selection and realization. Use the Core uncertainty/assumption/evidence model. When a compact Step summary is useful, state the **subject + basis** of uncertainty, for example:

```text
Target-state confidence: MEDIUM
Basis: current API docs + prototype Evidence
Main uncertainty: provider callback ordering in production
Recheck when: real integration Evidence exists
```

Do not invent numeric probabilities. Attach material uncertainty to the smallest useful subject: the whole Step, one Proposal/Branch, one Target Owner Body, or one assumption/Decision.

## Step Semantics

For a selected route:

```text
Expected Entry State
+ retained meaning
+ new / changed / retired meaning
= coherent post-Step target state
```

Annotations relative to Entry State may be used for provenance/review:

```text
[EXISTING]
[NEW]
[CHANGED]
[REMOVED]
```

These annotations do **not** replace complete Target Owner Bodies. A material affected owner body describes the complete post-Step meaning needed at the current planning depth, not only the changed lines.

Meaning created by an earlier required Step is `[EXISTING]` in a later Step once it belongs to that later Step's expected Entry State.

## Relations

Canonical prerequisite relation:

```text
Step B requires Step A
```

`requires` states a semantic prerequisite. `enables` is derived reverse navigation. Dependency cycles are architecture pressure and require re-evaluation rather than acceptance as normal planning topology.

Alternative/conditional relations may be represented through ordinary Proposal/Planning-Branch/Decision relations or compact Map navigation. Do not invent a closed Step-variant relation taxonomy unless a real later need appears.

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

A selected Step must be independently usable/coherent at its own finish. Do not create an intermediate selected Step that only makes sense if a later Step is also completed unless the intermediate result is itself coherent.

A candidate/branch route may remain incomplete where the incompleteness is explicit and is exactly what the branch/question exists to resolve.

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

**Target Step Result:** `Evolution Step Future-State Plan`

| Result Unit | Meaning |
|---|---|
| `RU-EVO-01` | Future-State Plan — resolved Step frame (Entry State, transition scope/driver), selected target-state meaning when selected, material Target Owner Bodies, transition/proof obligations, uncertainty/revalidation state references and Target Owner Materialization Set; unresolved alternatives remain Core Proposal/Planning Branch state |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-EVO-01` | when a concrete unrealized transition has enough meaning to deserve planning/review/addressability, whether its final route is already selected or still represented by real candidate branches | omit the whole Step for vague speculative “may change later” pressure with no concrete transition, driver, route or decision value |

Do not create `N/A` placeholders. Re-evaluate previously omitted detail only when its trigger/materiality changes.

### Explicit Unit Checkpoint Placement

Each material Unit inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints).

#### `RU-EVO-01` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-EVO-01`** — produce/refine only material future-transition meaning; apply supporting SDS Target Modules/Lenses proportionally, keep unresolved alternatives in Core Proposal/Planning Branch state and integrate only actually selected route meaning into the canonical Step Result.
3. **Closing Unit Checkpoint — `RU-EVO-01`** — disposition material Findings/owner consequences, confirm selection/uncertainty/readiness truthfully and ensure unrealized meaning has not leaked into current-owner authority.

## Target Owner Bodies

For every **materially affected natural owner on the selected route**, represent the post-Step meaning using that owner's ordinary Target Module/contract shape inside `RU-EVO-01`.

Examples:

```text
Target Application Body
Target Feature Body
Target Scenario Body
Target Screen Body
Target Domain Body
Target Slice Body
Target Shared Body
```

These are descriptive roles inside the Step, **not new Core State/Target types** such as `FutureFeature` or `FutureDomain`.

Supporting Target Modules may be used inside the Evolution Step without forming a second Target Instance when their reusable production method is useful. For the selected route, their output is Step-owned future target-state meaning until materialization. For unresolved alternatives, the same module output remains explicitly Proposal/Planning-Branch scoped and is not canonical Step Result authority.

Owner-local `BR-*`, `IR-*`, `PFR-*` or other must-holds belonging to the selected future state stay inside the corresponding Target Owner Body. Candidate alternative requirements stay branch/proposal-scoped until selection. Current owner Requirements remain unchanged until materialization.

Unaffected owners are referenced rather than copied.

## Target Owner Materialization Set

For each materially affected owner, state the semantic transition needed after successful realization:

```text
CREATE
  no current owner exists
  → create current owner from the realized Target Body

REPLACE
  current owner exists
  → replace its current semantic body with the realized Target Body

RETIRE
  current owner exists
  → remove current owner authority because the realized state no longer contains it
```

This set is semantic authority planning. It is distinct from physical representation operations such as file create/update/move/split/merge or embedded→dedicated representation promotion/demotion, which remain owned by Documentation / Representation + P-14 / TF-10.

## Production Method

```text
material unrealized transition
→ inspect current realized owners / implementation / Evidence
→ define coherent Step boundary + expected Entry State
→ identify concrete driver / decision surface
→ form/refine Proposal alternatives or Planning Branches when useful
→ use supporting Application/Feature/Scenario/Screen/Domain/Slice/Shared methods inside those candidate surfaces as needed
→ keep candidate Target Bodies explicitly Proposal/branch-scoped
→ make uncertainty / Evidence basis explicit where material
→ select route only through normal authority
→ integrate selected route bodies into canonical RU-EVO-01
→ establish transition + proof obligations
→ establish the selected Target Owner Materialization Set
→ enter Exact Realization only when selected upstream meaning is sufficient
```

One Step may contain several owner changes when only their composition creates a usable target state. Several commits/packages may realize one Step; implementation packaging does not define application Evolution Step boundaries.

## Representation

Early shallow representation is valid. A substantial Step may have a dedicated owner artifact; a shallow Step may be embedded in the Steps Map when that still preserves identity, candidate/selection state and the necessary target-state meaning.

Full Target Owner Bodies for a substantial Step strongly favor dedicated Step addressability but do not require one file per body or one file per natural owner.

Representation does not change semantic Step identity.

## Realization / Materialization Gate

Before implementation:

```text
actual state matches required Entry State?
selected route sufficiently resolved for the requested realization depth?
material uncertainty either resolved or explicitly tolerated/handled?
```

After implementation:

```text
Exact/integration Evidence
+ required proof/revalidation
↓
confirm what was actually realized
↓
materialize only the Target Owner Bodies that the realized result establishes
↓
current natural owners now describe the new realized truth
```

If actual realization differs materially from the selected Step meaning, do not materialize the planned body blindly. Surface a Finding/revalidation and reconcile the Step/realization first.

## Validators / Handoff

```text
Step is concrete enough to deserve future-transition ownership
current owners remain current authority until realization/materialization
candidate Proposal/branch body meaning is not mislabeled canonical Step Result or selected
selected meaning is not mislabeled realized
material uncertainty has a subject + basis rather than invented precision
material affected owners on the selected route have complete-enough post-Step Target Bodies
unaffected owners are referenced rather than copied
future Requirements remain inside their target bodies
materialization set identifies CREATE / REPLACE / RETIRE semantics where needed
physical P-14 representation operations are not confused with semantic materialization
requires relations are semantic prerequisites
cycles trigger architecture re-evaluation
```

Handoff to Core Exact Realization uses the selected Step target state as upstream planning authority. After proof/materialization, retain the Step as transition/decision lineage; it does not remain a competing current-state semantic owner.

## Evolution Impact

Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` to evaluate impact/change isolation against current owners and candidate/selected Step routes. There is no generic durable Evolution Impact Target; impact remains Step/owner-local or transient evaluation as appropriate.

## Guards

```text
Step ≠ detached change list
Step ≠ vague future wishlist
Step Target Body ≠ current owner before realization
selected ≠ realized
confidence ≠ selection
confidence ≠ realization
planned predecessor ≠ realized Entry State
requires ≠ chronology-only ordering
future owner-shaped body ≠ new Future* ontology
Target Owner Materialization ≠ P-14 representation promotion
```

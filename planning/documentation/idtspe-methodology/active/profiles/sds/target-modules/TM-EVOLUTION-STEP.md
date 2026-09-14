# TM-EVOLUTION-STEP — Evolution Step

Entry Point: `tm.evolution_step`  
Role: persistent bounded future-transition planning owner

## Purpose

Own one coherent **not-yet-realized** qualitative transition from an expected Entry State toward one or more concrete candidate/selected future target-state routes.

An Evolution Step is the canonical SDS semantic owner for materially planned future state. Current natural owners remain authority for accepted current semantic contracts until the represented transition is actually implemented and the required proof/revalidation succeeds.

Every Step is behaviorally grounded by one or more Feature target states. Material consequences for Scenario, Screen, Domain, Slice and Shared responsibilities are resolved through bounded `Evolution Impact` Units.

```text
current natural owners + actual implementation / Evidence
+ transition driver / constraints
+ one or more Feature target states
+ material Evolution Impacts
= Evolution Step planning state
```

The Step is not a detached delta list and not a second current-state owner.

## Temporal Authority Boundary

```text
current natural owner
= accepted current semantic contract for the materialized state

actual implementation / Evidence
= what is actually realized and observed;
  it may conform to or contradict the current owner contract

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

An implementation defect does not silently rewrite the current semantic owner. A selected correction/change that is still unrealized belongs to an Evolution Step until realization/materialization.

Absence is a valid current Entry State. Creating the first Feature, Scenario, Screen, Domain, Slice, Shared capability, Application Definition or owner-local Requirement may therefore be planned from `not present` to selected post-Step meaning.

For Requirements and other owner-local must-holds, `not present` here means **semantically absent from accepted current owner meaning**, not merely absent as an explicit sentence/ID/file fragment.

```text
newly surfaced owner meaning
→ is it already entailed by accepted current semantics?

YES
→ CURRENT SEMANTIC COMPLETION and/or CURRENT REALIZATION CORRECTION
→ current natural owner remains temporal authority
→ this Step is not the semantic host merely because representation was missing

NO + new/revised meaning is selected and materially unrealized
→ FUTURE SEMANTIC CHANGE
→ Evolution Step may be the temporal host
```

`Discovery time ≠ semantic time`; `representation absence ≠ semantic absence`.

## Step Identity, Alternatives And Uncertainty

A Step may be worth addressability before one final route is selected when the transition itself is concrete enough to plan/review. A Core `Need Candidate` / Desired Outcome or newly explicit Requirement alone is change pressure/representation pressure, not sufficient Step formation: disposition must first establish that the meaning is **not already entailed by accepted current semantics** and then establish enough concrete materially unrealized transition meaning to justify a coherent Step boundary. Reuse an existing Step when the resolved change naturally belongs to that transition. Use existing Core semantics rather than a Step-specific alternative ontology:

```text
materially different future route
→ Proposal

route needs deep downstream counterfactual exploration
→ Planning Branch

USER / applicable authority selection
→ Decision
```

`ASSUMED_FOR_BRANCH ≠ SELECTED`; `SELECTED ≠ REALIZED`.

A Planning Branch may reuse this Step's Feature/Impact/Target Owner Body production methods and carry **branch-local candidate meaning** as downstream branch planning. That meaning is branch-scoped Target result/state for comparison, not canonical selected Step Result. After root selection, run the normal branch promotion/consistency check before integrating justified meaning into the canonical Step Result.

Uncertainty/confidence is independent of selection and realization. Use the Core uncertainty/assumption/evidence model. When a compact summary is useful, state **subject + basis**, for example:

```text
Target-state confidence: MEDIUM
Basis: current API docs + prototype Evidence
Main uncertainty: provider callback ordering in production
Recheck when: real integration Evidence exists
```

Do not invent numeric probabilities or a Step-specific confidence lifecycle. Attach material uncertainty to the smallest useful subject: the whole Step, one Proposal/Branch, one `Evolution Impact`, one Target Owner Body, or one assumption/Decision.

## Step Semantics

For a selected route:

```text
Expected Entry State
+ Feature target state(s)
+ material Evolution Impacts
+ transition-only obligations when needed
= coherent post-Step target state
```

Annotations relative to Entry State may be used for provenance/review:

```text
[EXISTING]
[NEW]
[CHANGED]
[REMOVED]
```

These annotations are change/provenance views. They do **not** replace a complete Target Owner Body when such a body is required.

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

Direct Step work is self-sufficient: resolve current affected owners, lazily inspect the Steps Map when it exists, reuse applicable Step identity/relations, read only material prerequisite Steps, and return Map consequences. The USER does not need to plan the Map first.

## Unit Contract Conformance

Declared target-specific `RU-*` responsibilities in this module are interpreted as **Module-defined Unit Contracts**, not output buckets only. For each material Unit:

```text
Unit responsibility
→ relevant inputs / shared or Unit-specific reusable guidance
→ Unit Resolution with Core Question/QRP/Proposal/Evidence/Decision state only when useful
→ Current Result Content when sufficiently resolved
```

`RU-EVO-02` is a repeatable Unit Contract: instantiate one bounded Unit per material affected/proposed subject when separate resolution/addressability is useful. Do not create placeholder Impact Units for unaffected subjects.

Module-wide Source/Knowledge/Production/Lens/validator guidance is a shared default only where it genuinely applies across Units. Unit-specific subsection text specializes that guidance. Do not duplicate Core lifecycle semantics inside Result Content, and do not require a formal Proposal/Decision when trusted Sources/Evidence determine the result without a material choice.

## Target Step-Result Contract

**Target Step Result:** `Evolution Step Future-State Plan`

| Result Unit | Meaning |
|---|---|
| `RU-EVO-01` | Future-State Plan / Step Frame — Expected Entry State, transition scope/driver, Feature target states, Step relations, transition/proof obligations, uncertainty/revalidation references and Target Owner Materialization Set; unresolved alternatives remain Core Proposal/Planning Branch state |
| `RU-EVO-02` | Evolution Impact — repeatable bounded future consequence for one Scenario/Screen/Domain/Slice/Shared or unresolved ownership/responsibility subject, including selected planning meaning and an optional Target Owner Body when sufficiently resolved |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-EVO-01` | when a concrete unrealized transition has enough meaning to deserve planning/review/addressability, whether its final route is selected or represented by real candidate branches | omit the whole Step for vague speculative “may change later” pressure with no concrete transition, driver, route or decision value |
| `RU-EVO-02` | when the Step materially affects or may introduce/redistribute/retire one Scenario/Screen/Domain/Slice/Shared responsibility and that impact benefits from bounded resolution/addressability | omit unaffected subjects and vague hypothetical pressure; keep OPEN ownership explicit rather than inventing a premature owner |

Do not create `N/A` placeholders. Re-evaluate previously omitted detail only when its trigger/materiality changes.

### Explicit Unit Checkpoint Placement

Each material Unit inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints).

#### `RU-EVO-01` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-EVO-01`** — resolve the Step frame and Feature target states, compose material `RU-EVO-02` results, keep unresolved alternatives in Core Proposal/Planning Branch state and integrate only actually selected route meaning into canonical Step Result.
3. **Closing Unit Checkpoint — `RU-EVO-01`** — disposition material Findings/owner consequences, confirm selection/uncertainty/readiness truthfully and ensure unrealized meaning has not leaked into current-owner authority.

#### `RU-EVO-02` processing envelope — one per material Impact subject

1. **Opening Unit Checkpoint — `RU-EVO-02`** — resolve/reuse applicable Lenses/supporting Target Modules for this specific affected/proposed subject and distinguish current owner truth from Step-owned future meaning.
2. **Unit Work — `RU-EVO-02`** — resolve only this Impact's useful future consequence; use supporting Scenario/Screen/Domain/Slice/Shared methods and Discovery Working Plans proportionally, retain selected planning Result Content only when it has continuing Step value, and keep candidate alternatives Proposal/Branch scoped.
3. **Closing Unit Checkpoint — `RU-EVO-02`** — ensure selected durable must-holds are in the natural Target Owner Body/Decision rather than hidden in planning detail, and ensure any materializable owner change converges on one coherent post-Step Target Owner Body.

## Feature Target State Contract

Feature is the central behavioral target of an Evolution Step. Every Step identifies one or more Feature target states.

```text
Feature unchanged by this Step
→ reference the current Feature as retained post-Step behavior
→ do not copy a full Target Feature Body merely for completeness

Feature NEW
→ one complete Target Feature Body
→ Target Owner Materialization: CREATE

Feature CHANGED
→ one complete replacement Target Feature Body
→ Target Owner Materialization: REPLACE

Feature RETIRED
→ explicit retirement consequence
→ Target Owner Materialization: RETIRE
```

Every selected `NEW` or `CHANGED` Feature uses the ordinary complete `TM-FEATURE` **Feature Definition** contract. The body must be readable as the Feature expected after the Step and suitable as the semantic source for later materialization. `[EXISTING] / [NEW] / [CHANGED] / [REMOVED]` annotations may explain provenance but never substitute for the complete Target Feature Body.

A pure Refactoring/Forced Migration may keep Feature behavior unchanged while materially changing Domain/Slice/Shared realization; the Step remains behaviorally grounded by the retained Feature target state.

Feature does not use `RU-EVO-02` as its primary future mechanism. Current Feature representation may keep lightweight relevant-Step navigation where useful, but future Feature authority is the Step's Feature target state/Target Feature Body.

## `RU-EVO-02` — Evolution Impact

Use one bounded Impact for one smallest useful subject. Normal subjects are:

```text
existing Scenario
existing Screen
existing Domain owner
existing Slice owner
existing Shared capability
bounded ownership/responsibility pressure whose final owner is still OPEN
```

Current Result Content is proportional. It may contain:

```text
Subject / current state (including ABSENT/OPEN ownership when accurate)
Evolution Kinds when useful
[EXISTING] / [NEW] / [CHANGED] / [REMOVED] provenance when useful
selected future consequence / change-isolation meaning
selected Domain/Slice Discovery Result Content with continuing Step value
uncertainty / Evidence basis / recheck condition when material
optional Target Scenario/Screen/Domain/Slice/Shared Body when sufficiently resolved
materialization consequence reference when resolved
```

An Impact may remain intentionally shallow when that is enough to guide current architecture/evolution decisions. Do not force a complete future owner merely to record known direction.

For a new/redistributed responsibility, keep owner outcome `OPEN` until supporting discovery/decision resolves whether there are zero/one/several natural owners. Do not name a future Domain/Slice/Shared owner merely to make the Impact look complete.

Selected implementation-shaped planning detail is not automatically `BR-*`, `IR-*`, `PFR-*`, a Decision or an exact implementation commitment. If detail must remain a durable must-hold after realization, route it to its natural Target Owner Body/Decision. Literal files/code/tests/config/schema remain Core Exact Realization territory.

## Target Owner Bodies

Target Owner Bodies use the affected owner's ordinary Target Module/contract shape and remain Step-owned future meaning until materialization.

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

For selected `NEW`/`CHANGED` Features, the full Target Feature Body rule above is mandatory. For Scenario/Screen/Domain/Slice/Shared, an Impact may remain shallower until a selected owner change is sufficiently resolved; when the Step intends to materialize a `CREATE` or `REPLACE`, the corresponding Target Owner Body must be complete enough for the requested realization/materialization depth.

One natural owner on one selected Step route has **one coherent canonical post-Step Target Owner Body**. Several Impact aspects/resolution threads must converge into that body rather than create competing future versions.

Supporting Target Modules may be used inside the Evolution Step without forming a second Target Instance when their reusable production method is useful. For the selected route, their selected output is Step-owned future target-state meaning. For unresolved alternatives, output remains explicitly Proposal/Planning-Branch scoped and is not canonical Step Result authority.

Owner-local `BR-*`, `IR-*`, `PFR-*` or other must-holds belonging to the selected future state stay inside the corresponding Target Owner Body. Candidate alternative requirements stay branch/proposal-scoped until selection. Current owner Requirements remain unchanged until materialization.

Unaffected owners are referenced rather than copied.

## Discovery Result Hosting

`TM-DOMAIN-DISCOVERY` and `TM-IMPLEMENTATION-SLICE` remain working/discovery Targets, not durable semantic owners. Their exploratory Unit Resolution and rejected alternatives are transient by default.

However, selected Current Result Content may have continuing pre-realization handoff/review/revalidation value while the Step remains unrealized. In that case integrate or project only that useful selected meaning into the applicable `RU-EVO-02` rather than retaining the whole discovery Target as competing authority.

```text
Domain Discovery Working Plan
→ selected useful Result Content
→ applicable Domain Evolution Impact
→ optional Target Domain Body when durable post-Step Domain meaning is resolved

Slice Discovery Working Plan
→ selected useful Result Content
→ applicable Slice/Domain/Shared Evolution Impact(s)
→ optional Target Slice/Domain/Shared Body when durable post-Step meaning is resolved
```

Persistence of selected planning meaning does not promote it into semantic owner authority. After realization, actual implementation becomes current realization truth; durable semantic meaning materializes to natural owners; pre-realization planning detail may remain only as lineage when independently useful.

## Target Owner Materialization Set

For each materially affected owner whose selected post-Step authority changes, state the semantic transition needed after successful realization:

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

`Evolution Kinds` describe transition character; do not create a parallel `INTRODUCTION/CHANGE/RETIREMENT` materialization enum.

## Transition Obligations

Keep transition-only meaning separate from steady-state owner impact/target meaning. Examples include:

```text
migration / backfill
cutover
compatibility window
old-representation retirement
one-time bridge/reconciliation
```

Do not move steady-state Feature behavior or durable Domain/Slice/Shared requirements into transition obligations merely because they become relevant during the transition.

## Production Method

```text
material unrealized transition
→ inspect current natural owners + actual implementation / Evidence
→ define coherent Step boundary + Expected Entry State
→ identify concrete driver / decision surface
→ establish one or more Feature target states
   → unchanged Feature: reference retained current behavior
   → NEW/CHANGED Feature: complete Target Feature Body
→ form/refine Proposal alternatives or Planning Branches when useful
→ instantiate material Evolution Impact Units for Scenario/Screen/Domain/Slice/Shared/OPEN ownership pressure
→ use supporting Scenario/Screen/Domain/Slice/Shared methods and Discovery Working Plans proportionally
→ retain only selected planning Result Content with continuing Step value
→ form complete Target Owner Bodies when selected materialization/realization needs them
→ keep candidate meaning explicitly Proposal/branch-scoped
→ make uncertainty / Evidence basis explicit where material
→ select route only through normal authority
→ establish transition/proof obligations and Target Owner Materialization Set
→ enter Exact Realization only when selected upstream meaning is sufficient
```

One Step may contain several Feature target states and several owner changes when only their composition creates a usable target state. Several commits/packages may realize one Step; implementation packaging does not define application Evolution Step boundaries.

## Current-Owner Evolution Impact Projection

Current realized Scenario/Screen/Domain/Slice/Shared owners may expose their own optional `Evolution Impact` Unit as reverse navigation/revalidation projection to concrete unrealized Steps that materially affect them.

```text
Step / RU-EVO-02
→ canonical future-impact meaning

current owner / Evolution Impact Unit
→ Step reference / compact navigation-revalidation projection only
```

The current owner does not copy the Step's Target Body, selected discovery detail, future Requirements or full Impact prose. The reverse projection may be stored, generated or derived according to representation needs.

## Representation

Early shallow representation is valid. A substantial Step may have a dedicated owner artifact; a shallow Step may be embedded in the Steps Map when that still preserves identity, candidate/selection state, Feature target state(s) and necessary Impact meaning.

Full Target Owner Bodies for a substantial Step strongly favor dedicated Step addressability but do not require one file per body or one file per natural owner. `RU-EVO-02` Unit identity does not imply one file per Impact.

Representation does not change semantic Step identity.

## Realization / Materialization Gate

Before implementation:

```text
actual state matches required Entry State?
selected Feature target state(s) are clear enough for requested realization?
material Impact meaning is resolved deeply enough for requested realization?
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
current natural owners now own the accepted materialized semantic contracts
↓
actual code/runtime remains realization Evidence/truth, not an automatic semantic-owner rewrite
```

If actual realization differs materially from the selected Step meaning, do not materialize the planned body blindly. Surface a Finding/revalidation and reconcile the Step/realization first.

## Validators / Handoff

```text
Step is concrete enough to deserve future-transition ownership
Step is behaviorally grounded by one or more Feature target states
NEW/CHANGED Feature has one complete Target Feature Body using TM-FEATURE Feature Definition
unchanged Feature is referenced rather than copied
current owners remain current semantic authority until realization/materialization
candidate Proposal/branch meaning is not mislabeled canonical Step Result or selected
selected meaning is not mislabeled realized
material uncertainty has a subject + basis rather than invented precision
Evolution Impact is bounded to Scenario/Screen/Domain/Slice/Shared or OPEN responsibility, not Feature delta
OPEN ownership is not prematurely converted into an invented owner
selected planning detail is not silently treated as Requirement/Decision/exact commitment
one selected post-Step Target Owner Body exists per materially changed natural owner
unaffected owners are referenced rather than copied
future Requirements remain inside their target bodies
transition-only obligations remain separate from steady-state target meaning
materialization set identifies CREATE / REPLACE / RETIRE semantics where needed
physical P-14 representation operations are not confused with semantic materialization
requires relations are semantic prerequisites
cycles trigger architecture re-evaluation
```

Handoff to Core Exact Realization uses the selected Step future-state plan as upstream planning authority. After proof/materialization, retain the Step as transition/decision lineage; it does not remain a competing current-state semantic owner. Surface changed Step identity/`requires`/readiness/addressability consequences back to `TM-EVOLUTION-STEPS-MAP` without copying full Step meaning there.

## Evolution Impact Evaluation

Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` to evaluate impact/change isolation against current owners and candidate/selected Step routes. There is no generic durable `TM-EVOLUTION-IMPACT`; `Evolution Impact` is a module-defined bounded Unit responsibility in the Step and a reverse navigation/revalidation Unit in affected current owners.

## Guards

```text
Step ≠ detached change list
Step ≠ vague future wishlist
Feature delta ≠ complete Target Feature Body
Evolution Impact ≠ generic Target family
Evolution Impact planning detail ≠ hidden durable Requirement
Discovery Working Plan ≠ durable owner
Step Target Body ≠ current owner before realization
selected ≠ realized
confidence ≠ selection
confidence ≠ realization
planned predecessor ≠ realized Entry State
requires ≠ chronology-only ordering
future owner-shaped body ≠ new Future* ontology
Target Owner Materialization ≠ P-14 representation promotion
```

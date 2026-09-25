<a id="tm-evolution-step"></a>
# TM-EVOLUTION-STEP — Evolution Step

Module ID: `TM-EVOLUTION-STEP`

Entry Point: `tm.evolution_step`
Role: persistent bounded future-transition planning owner

> Semantic Owner Dependencies
> - Type: `EXTENDS`; Responsibility: `TARGET-MODULE.META-MODEL`; Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)
> - Type: `CONTEXTUALIZES`; Responsibility: `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS`; Owner: [Application Benefit Boundary / Constraints](TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints)

## Purpose

Own one coherent **not-yet-realized** qualitative transition toward one or more concrete candidate/selected future target-state routes.

An Evolution Step is the canonical SDS semantic owner for materially planned future downstream state. Current natural owners remain authority for accepted current semantic contracts until the represented transition is implemented and the required proof/revalidation succeeds.

A Step may be Behavioral, Implementation or Mixed. Material downstream consequences for Feature, Scenario, Screen, Domain, Slice and Shared are represented through complete Target Owner Bodies plus the bounded `RU-EVO-02` Impact collection without turning the Step into a duplicate owner catalog.

```text
current natural owners + actual implementation / Evidence
+ transition driver / constraints
+ direct semantic predecessor relation(s)
+ future Target Owner Bodies / bounded Impacts
+ Step-wide implementation concerns
+ transition/proof/materialization obligations
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
CANDIDATE / PROBABLE / CONDITIONAL / DEFERRED Step
≠ SELECTED Step

SELECTED Step
≠ REALIZED Step

Planning Complete
≠ Realization Start Ready
```

Candidate route meaning remains Core Proposal/Planning-Branch scoped until normal authority selects it. A Planning Branch may reuse this Step's production methods and carry branch-local Target Bodies/Impacts for comparison without becoming canonical Step Result authority.

## Step Semantic Prerequisite — `Entering From`

`Entering From` is the canonical semantic-prerequisite relation for an Evolution Step.

```text
current Step requires prior semantic evolution
→ reference the smallest sufficient direct predecessor Step set

predecessor Step authority
+ its realized/materialized Target Owner meaning
→ defines the semantic state required before realization of this Step may start
```

Do not maintain a second hand-authored `Expected Entry State` inventory that copies predecessor Feature/Scenario/Domain/Slice/Shared state.

Examples:

```text
greenfield Step
Entering From: None

single direct predecessor
Entering From: EVO-02

several independent direct predecessors
Entering From:
- EVO-A
- EVO-B
```

Direct predecessors are the smallest sufficient set. Transitive predecessor history is followed through predecessor Step authority; do not copy the full chain into every later Step.

A Step may be **Planning Complete** while a selected/planned predecessor is not yet realized. **Realization Start Readiness** is different: every direct predecessor must be realized/materialized before this Step may start realization.

An optional human-readable entry-state summary may be derived from `Entering From` and current materialized owner truth, but it is a projection only and never separately maintained authority.

`enables` may be derived reverse navigation. Do not turn technical implementation pressure into a fake semantic predecessor or force one total chronology.

## Step Kinds

Use one or more proportionally; Kinds are composable rather than a mandatory exclusive enum:

- Introduction;
- Expansion;
- Refactoring;
- Forced Migration;
- Retirement.

The kind describes transition character; it does not replace the target-state contract.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). Core owns generic Unit lifecycle/presence/disposition semantics; this module owns the Evolution-Step-specific Unit identities, dependencies, materiality, production guidance, validators and handoffs below.

When `Driven By` references Application Definition value intent, a plain `AB-*` reference remains valid for a whole-Benefit driver. If only a bounded Benefit Responsibility Boundary / Constraint clause actually drives the Step, prefer the more precise `AB-* / BC-*` reference when that clause is addressable. This is reference precision only; the Evolution Step does not become owner of the Benefit or claim whole-Benefit realization.

`RU-EVO-02` is one Module-defined Unit responsibility in every formed Step inventory. Its Result Content Contract declares the `Evolution Impacts` Collection with `0..N` bounded Impact items governed by the same existing Impact item meaning. Impact items are runtime result values inside this Unit, not child Target Work Units and not Unit Resolution Slots merely by count. This Module defines a stricter domain-specific rule than generic Collection semantics: if there are no material Impact subjects left after full Target Bodies and other Step Units own their natural meaning, `RU-EVO-02` carries its Unit-level omission disposition and no placeholder items are manufactured. This does not redefine a generic empty Collection result as omission for other Units. The other Step Units likewise represent their own distinct Step-level responsibilities.

## Target Step-Result Contract

**Target Step Result:** `Evolution Step Future-State Plan`

| Result Unit | Meaning |
|---|---|
| `RU-EVO-01` | Step Frame / Semantic Relations — Step identity/boundary/driver/kinds, `Driven By`, direct `Entering From`, and composition/index of post-Step Target Owner Bodies without copying their bodies |
| `RU-EVO-02` | Evolution Impacts — coherent `0..N` collection of bounded future consequences for material Feature/Scenario/Screen/Domain/Slice/Shared or unresolved ownership/responsibility subjects, all governed by one Unit contract |
| `RU-EVO-03` | Step-wide Implementation Concerns — cross-owner realization/proof/integration pressure whose natural subject is the transition as a whole; owner-local concerns are referenced, not copied |
| `RU-EVO-04` | Target Owner Materialization Set — planned `CREATE / REPLACE / RETIRE` semantic authority transitions after successful realization/proof |
| `RU-EVO-05` | Transition / Proof Obligations — one-time migration/cutover/compatibility/bridge/proof obligations whose natural subject is the transition rather than steady-state owners |
| `RU-EVO-06` | Planning Completeness / Realization Start Readiness — separate conclusions about whether the Step is sufficiently planned and whether realization may begin now |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only Evolution-Step-specific substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-EVO-01` | always once a concrete Evolution Step Target is formed; it owns Step identity/boundary/driver/relations | no Unit-level omission: vague speculative pressure that does not deserve Step identity fails the Target-level Step formation gate, so no Evolution Step Target should be formed |
| `RU-EVO-02` | one or more Feature/Scenario/Screen/Domain/Slice/Shared/OPEN responsibilities are materially affected and bounded impact resolution helps planning | `OMITTED` — no material peer/supporting-owner impact subjects; keep no placeholder Impact items |
| `RU-EVO-03` | owner-local concern surfaces compose into a cross-owner Step-wide realization/proof/integration concern | `OMITTED` — no Step-wide implementation concern; owner-local concerns remain sufficient |
| `RU-EVO-04` | the Step is intended eventually to create/replace/retire downstream semantic owner authority | `OMITTED` only for an intentionally non-materializing investigative Step; ordinary product/application Steps should resolve the set |
| `RU-EVO-05` | transition-only migration/cutover/compatibility/proof meaning exists | `OMITTED` — no transition-only/proof obligation beyond ordinary owner/Exact proof |
| `RU-EVO-06` | always for a concrete Step that may be reviewed/realized | do not omit; keep conclusions `INCOMPLETE/BLOCKED` with reasons when not ready |

`RU-EVO-02` item cardinality does not multiply the Target Work Unit inventory. The complete-inventory rule requires the single `RU-EVO-02` Unit responsibility to remain visible with its resolved/open/omitted disposition; its Impact collection contains only actual material bounded subjects. Ordinary Impact fields/items are not Slots unless a future revision identifies a genuine independently formalized terminal contract role.

## Explicit Unit Checkpoint Placement

Each material Unit inherits the Core [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope), including Methodology binding before substantive work.

#### `RU-EVO-01` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-01`** — bind this Unit method; inspect upstream driver/current owner truth and relevant Steps Map relations.
2. **Unit Work — `RU-EVO-01`** — establish Step identity/boundary, `Driven By`, direct `Entering From`, kinds and post-Step owner-body composition; do not author a duplicate Expected Entry State.
3. **Closing Unit Checkpoint — `RU-EVO-01`** — verify semantic predecessors are direct/minimal, owner-local future meaning lives in Target Owner Bodies and the Step frame does not steal their bodies.

#### `RU-EVO-02` processing envelope — one Unit per Step

1. **Opening Unit Checkpoint — `RU-EVO-02`** — bind the Unit once; identify the actual material Impact subjects and supporting owner Target Modules/Lenses needed proportionally; distinguish current owner truth from Step-owned future meaning.
2. **Unit Work — `RU-EVO-02`** — resolve the coherent collection of bounded Impact items, one item per material smallest useful subject, using the same common Impact item contract defined by the Unit's Result Content Contract for each; do not create peer Units or Slots merely from item count.
3. **Closing Unit Checkpoint — `RU-EVO-02`** — every retained Impact item is useful/bounded and durable owner-local future meaning converges into one coherent Target Owner Body/Decision instead of remaining duplicated in Impact detail.

#### `RU-EVO-03` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-03`** — inspect affected owner-local concern/feasibility/Requirement surfaces before inventing Step-wide concern meaning.
2. **Unit Work — `RU-EVO-03`** — reference owner-local concerns and retain only cross-owner sequencing/integration/foundation/proof pressure whose smallest natural subject is the whole transition.
3. **Closing Unit Checkpoint — `RU-EVO-03`** — ensure exact mechanism stayed in Exact and owner-local concerns were not copied into the Step.

#### `RU-EVO-04` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-04`** — inspect represented candidate/selected/assumed route Target Owner Bodies and current owner existence.
2. **Unit Work — `RU-EVO-04`** — disposition each materially changed downstream owner as `CREATE / REPLACE / RETIRE`.
3. **Closing Unit Checkpoint — `RU-EVO-04`** — ensure physical file operations were not confused with semantic materialization and each changed owner has one coherent post-Step body.

#### `RU-EVO-05` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-05`** — identify only transition-wide one-time/proof obligations not already owned as steady-state Requirement/owner content.
2. **Unit Work — `RU-EVO-05`** — resolve migration/backfill/cutover/compatibility/bridge/proof obligations proportionally.
3. **Closing Unit Checkpoint — `RU-EVO-05`** — ensure steady-state Feature/Scenario/Domain/Slice/Shared meaning was not displaced into transition obligations.

#### `RU-EVO-06` processing envelope

1. **Opening Unit Checkpoint — `RU-EVO-06`** — inspect the actual Step result, all Unit dispositions, Target Body references, Q/R/P/Evidence, direct predecessor realization state and whether this is the intended next Step for realization.
2. **Unit Work — `RU-EVO-06`** — resolve **Planning Completeness** independently from **Realization Start Readiness**.
3. **Closing Unit Checkpoint — `RU-EVO-06`** — planning completeness is not blocked merely by unrealized predecessors; Start Readiness is not marked READY until every direct predecessor is realized/materialized and other start conditions are satisfied.

<a id="ru-evo-01--step-frame--semantic-relations"></a>
## `RU-EVO-01` — Step Frame / Semantic Relations

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)

Own only transition-wide framing/relations:

```text
Step ID / name
transition purpose / boundary / driver
Driven By upstream Application Definition / Decision refs when material
Step Kind(s)
Entering From: direct semantic predecessor Step(s) | None
composition/index of materially changed Target Owner Bodies
candidate/selected/conditional/deferred authority through ordinary Core Proposal/Decision/Branch semantics
```

`Entering From` points to Step authority, not a Feature generation label alone. If the same Feature changes through several Steps, predecessor Step identity preserves which generation is required.

Do not copy predecessor Target Owner Body state into a separately authored Entry-State inventory.

## Feature Target State Contract

Feature is the primary behavioral owner when Feature behavior is created/changed by the Step.

```text
NEW/CHANGED Feature in a fully planned Step
→ complete ordinary TM-FEATURE Target Feature Body

NEW/CHANGED Feature in a not-yet-complete LATER_HORIZON Step
→ bounded RU-EVO-02 Feature Impact until the complete Body is formed

Feature behavior intentionally unchanged
→ reference retained current/precedessor-realized Feature behavior
→ do not copy a full Target Feature Body merely for completeness
```

A Behavioral/Mixed Step normally has one or more material Feature target states. An implementation-focused transition may legitimately change Domain/Slice/Shared realization or transition architecture while behavior remains unchanged; it must not invent a changed Feature merely to satisfy structure.

Every REALIZATION_NEAR `NEW` or `CHANGED` Feature on the active candidate/selected Step route uses the ordinary complete `TM-FEATURE` **Feature Definition** contract. The body is readable as the Feature expected after the Step; candidate authority remains enclosing Proposal/Step state until normal selection, after which the same body may become semantic source for materialization. At LATER_HORIZON a bounded Feature Impact is permitted until a complete Body is needed; `RU-EVO-02` does not duplicate a complete Feature body or become an unconstrained Feature delta catalog.

<a id="sds-evolution-horizon-depth"></a>
## Evolution horizon / target depth

In a `REALIZATION_NEAR` Step, a CREATE/REPLACE owner subject needs a complete Target Owner Body at the selected route's useful depth; RETIRE needs explicit retirement/transition and consumer consequences; affected but unchanged owners can be references/Impacts. In a `LATER_HORIZON` Step, a bounded Evolution Impact may be sufficient to account for the Step while its planning remains `INCOMPLETE`. Do not force distant speculative implementation detail. Feature may be a material Impact subject when its changed state is not yet a complete target; the Step's Feature authority and RU-EVO-02 must not duplicate the same complete Feature body. Persistence may place dedicated Step artifacts under `planning/evolution/steps/unrealized/` or `realized/` when useful, without requiring one file per Step. Horizon is planning depth, not permission to omit material near-term owner consequences.

Here **next Step for realization** means the particular intended Step whose implementation will start next on the chosen route, not every Step marked `REALIZATION_NEAR` or every direct successor in a branch. This role is relative to the current realization decision; horizon alone cannot establish readiness. Before realizing it, account for every other concrete unrealized Step known to affect the owners in scope: that other Step must identify each materially affected subject in its bounded `RU-EVO-02` Impact **or** complete Target Owner Body / `RU-EVO-04` retirement transition as appropriate, with a truthful consequence/revalidation basis; each affected **current realized** owner's local Evolution Impact projection must expose a reference back to that Step under the shared projection contract. A complete Feature/Domain/Slice/other Body must not be duplicated just to create an Impact item. This applies to candidate, conditional, deferred and later-horizon Steps as well as selected ones. Reconcile missing/mismatched Step-side and owner-side links before the next Step is marked start-ready. An affected future Target Owner Body is still Step-owned; its later consequences must remain traceable through the later Step and must be reprojected into the resulting current owner upon materialization. A vague idea without concrete Step identity does not qualify as an accounted Step.

<a id="ru-evo-02--evolution-impacts"></a>
## `RU-EVO-02` — Evolution Impacts

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
- **TRIGGERED:**
  - [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`](../../../idtspe-core/lenses/reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md)

**Responsibility.** Resolve the material bounded downstream/supporting-owner consequences of this Evolution Step for Feature/Scenario/Screen/Domain/Slice/Shared/OPEN-responsibility subjects without turning those subjects into peer Step Units or using this Unit as the Feature target-state owner.

**Purpose.** Keep Step-local impact planning coherent and proportional while routing durable owner-local future meaning toward the natural Target Owner Body/Decision instead of duplicating owner authority inside the Step.

**Result Content Contract.** One coherent Step-impact result with one declared Collection:

```text
Collection: Evolution Impacts
Item Contract: one bounded Evolution Impact for one smallest useful material subject
Item Key / Subject: natural Impact subject/reference when item-local formal reference is needed
Cardinality: 0..N
PER_ITEM Slots: none currently defined
```

Every retained item uses the same existing Impact item meaning under this Unit contract. Item cardinality does not create peer Units or Slot Definitions; ordinary item fields remain direct result content unless a future contract revision identifies a genuine terminal role that requires independent Slot tracking. This is a narrow compatibility update of the already-declared `RU-EVO-02` collection, not a broader SDS lower-contract migration.

Normal item subjects are:

```text
Feature at LATER_HORIZON when a bounded Impact suffices and no complete Feature Body duplicates it
existing/new Scenario
existing/new Screen
existing/new Domain owner
existing/new Slice owner
existing/new Shared capability
bounded ownership/responsibility pressure whose final owner is OPEN
```

For a REALIZATION_NEAR changed Feature, use one complete Target Feature Body. A LATER_HORIZON Feature may instead be a bounded Impact subject until a complete Body is needed. Never keep two competing copies of the same Feature future meaning.

Each Impact item's proportional content may contain:

```text
Subject / current state / OPEN ownership when accurate
selected/candidate future consequence or change-isolation meaning
selected Discovery Result Content with continuing Step value
uncertainty / Evidence basis / recheck condition when material
reference to a separate complete Target Scenario/Screen/Domain/Slice/Shared Body if one is already resolved and a distinct bounded Impact still matters
materialization consequence reference when resolved
```

An Impact item may remain intentionally shallow when that is enough to guide current planning. For new/redistributed responsibility, keep owner outcome `OPEN` until supporting discovery/decision resolves natural owners.

Selected implementation-shaped planning detail is not automatically `BR-*`, `SR-*`, `IR-*`, `PFR-*`, a Decision or an exact implementation commitment. Durable owner-local future must-holds converge into the corresponding Target Owner Body. Literal source/test code is SDS `TM-CODE-REALIZATION` territory; broad non-code literal files/config/schema/workflow artifacts remain Core `TM-EXACT-REALIZATION` territory unless inseparable codebase implementation consequences belong with the code Target.

## Target Owner Bodies

Target Owner Bodies use each affected owner's ordinary Target Module/contract shape and remain Step-owned future meaning until materialization.

Examples:

```text
Target Feature Body
Target Scenario Body
Target Screen Body
Target Domain Body
Target Slice Body
Target Shared Body
```

These are descriptive roles inside the Step, not new Core State/Target types.

One natural owner on one Step route has **one coherent canonical post-Step Target Owner Body**. Several Impact aspects/resolution threads must converge into that body rather than create competing future versions.

For the **next Step for realization**, form the complete ordinary post-Step Target Body for **every** downstream natural owner whose semantic authority will be `CREATE`d or `REPLACE`d by that Step: Feature, Scenario, Screen, Domain, Slice and Shared as applicable. In particular, Domain and Slice require their full target identity/responsibility, relationships, constraints and material owner-local `IR-*`/`PFR-*` under `TM-DOMAIN-OWNER` / `TM-SLICE-OWNER`, rather than a bounded `RU-EVO-02` Impact standing in for their post-Step state. Evaluate every affected owner: for `RETIRE`, record retirement, consumers and transition consequences without fabricating a post-Step Body; for an owner confirmed unchanged, reference its retained current/predecessor-realized meaning and the revalidation outcome without copying a Body. A material consequence whose ownership is still `OPEN` blocks completion of the next Step when it prevents a trustworthy target state.

The Step owns the **composition/index** of those complete bodies, not a requirement to embed their full prose in one file. A linked body in a separate file is equally part of the same Step Target Result when the Step names its Step-relative path, natural owner identity, intended `CREATE`/`REPLACE` disposition, route/authority and applicable body version; the link must resolve to that single complete body. For example, `planning/evolution/steps/unrealized/<Step-ID>/STEP.md` can link to `TARGET-FEATURE.md`, `TARGET-DOMAIN.md` and `TARGET-SLICE.md` beside it. A smaller Step may link to dedicated files elsewhere or embed its bodies. The directory and filenames are illustrative physical representation, not additional Target Instances, semantic owners or mandatory storage topology. On materialization, use the realized bodies to create/replace current natural owners; Step-owned files do not become current authority merely through selection, relocation or a path match.

Supporting Target Modules may be used inside the Evolution Step without automatically forming a second Target Instance. For the selected route, selected output is Step-owned future target-state meaning. For unresolved alternatives, output remains Proposal/Planning-Branch scoped.

Owner-local `BR-*`, `SR-*`, `IR-*`, `PFR-*` and other must-holds stay inside the corresponding Target Owner Body. Candidate alternative Requirements remain Proposal/Branch scoped until selection. Current owner Requirements remain unchanged until materialization.

Unaffected owners are referenced rather than copied.

## Discovery Result Hosting

`TM-DOMAIN-DISCOVERY` and `TM-IMPLEMENTATION-SLICE` remain working/discovery Targets, not durable semantic owners. Their exploratory Unit Resolution and rejected alternatives are transient by default.

Selected Current Result Content may have continuing pre-realization value. In that case integrate/project only that useful selected meaning into the applicable `RU-EVO-02` and/or Target Owner Body; do not retain the whole discovery Target as competing authority.

<a id="ru-evo-03--step-wide-implementation-concerns"></a>
## `RU-EVO-03` — Step-wide Implementation Concerns

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
- **TRIGGERED:**
  - [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
  - [`LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`](../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md)
  - [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md)
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
  - [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md)

This Unit replaces the former `Realization Prerequisite` concept. It does **not** own a list of technical foundations that must already exist before implementation. It owns only material realization/proof/integration pressure whose natural subject is the **whole transition**.

Before writing Step-wide concern meaning, inspect affected reusable owner surfaces where defined:

```text
Target Feature Body / RU-FEAT-04 Implementation Concerns
Target Scenario Body / RU-SCEN-03 Journey Realization Concerns
Application Definition / RU-APP-07 Realization Feasibility
  when upstream feasibility still materially constrains this Step
Target Domain / Slice / Shared owner-local IR/PFR and relevant owner constraints
Screen/spatial constraints when they materially affect cross-owner realization
```

Then apply Natural Subject:

```text
concern belongs to one Feature/Scenario/Domain/Slice/Shared owner
→ keep/reference it there

several owner-local concerns create one cross-owner ordering/integration/foundation/proof pressure
whose subject is the whole transition
→ RU-EVO-03 owns that Step-wide concern
→ reference contributing owner-local concerns

literal GitHub Action / file / class / config / schema / call sequence
→ SDS Code Realization for code / Core Exact Realization for broad non-code literal work / transient exact planning
```

Examples of possible Step-wide concerns include cross-owner deployment/order pressure, compatibility-foundation uncertainty, whole-transition observability/proof coordination pressure or integration sequencing that cannot be understood as one owner's steady-state concern.

`RU-EVO-03` owns the **concern / analysis pressure**, not the final one-time transition must-hold merely because the concern was discovered here. Resolve each material concern proportionally:

```text
no material obligation remains
→ close the concern

one owner naturally owns the durable meaning
→ route/reference that owner-local Unit/Requirement

literal realization mechanism
→ Exact / transient exact planning

unresolved blocker / uncertainty
→ Q/R/P / OPEN as appropriate

one-time transition/proof must-hold whose natural subject is the Step
→ RU-EVO-05 Transition / Proof Obligation
```

Do not duplicate owner-local concern prose or duplicate an established `RU-EVO-05` obligation back into the concern as a second authority. References/navigation do not transfer ownership.

<a id="ru-evo-04--target-owner-materialization-set"></a>
## `RU-EVO-04` — Target Owner Materialization Set

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
- **TRIGGERED:**
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)

For each materially affected downstream owner whose represented post-Step authority would change under this Step result, state the semantic transition required after successful realization:

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

This set is semantic authority planning. It is distinct from physical file operations such as create/update/move/split/merge or embedded→dedicated representation changes, which remain Documentation / Representation concerns.

The enclosing Proposal/Step planning boundary owns candidate/selected status. `CREATE / REPLACE / RETIRE` describes the represented post-realization authority transition and does not itself select the Step.

<a id="ru-evo-05--transition--proof-obligations"></a>
## `RU-EVO-05` — Transition / Proof Obligations

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
- **TRIGGERED:**
  - [`LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`](../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md)
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
  - [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md)

Own established one-time must-holds of the represented transition. `RU-EVO-03` may discover/analyze pressure that resolves into this Unit, but once an obligation is established its canonical Step-wide must-hold meaning lives here rather than in both Units.

Keep transition-only meaning separate from steady-state owner meaning. Examples:

```text
migration / backfill
cutover
compatibility window
old-representation retirement
one-time bridge/reconciliation
transition-wide proof/materialization observation needed to establish what was realized
```

Do not move steady-state Feature behavior, Scenario must-holds or durable Domain/Slice/Shared Requirements here merely because they become relevant during the transition. Owner-local proof-realization requirements remain owner-local `PFR-*`; literal source/test code realization belongs to SDS `TM-CODE-REALIZATION`.

<a id="ru-evo-06--planning-completeness--realization-start-readiness"></a>
## `RU-EVO-06` — Planning Completeness / Realization Start Readiness

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
  - [`LENS-TARGET-RESOLUTION-COVERAGE`](../../../idtspe-core/lenses/frequent/LENS-TARGET-RESOLUTION-COVERAGE.md)
- **TRIGGERED:**
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)

Maintain two different conclusions.

### Planning Completeness

```text
Planning Completeness: COMPLETE | INCOMPLETE
```

Every conclusion MUST carry a short **Planning Completeness explanation** rather than only an enum. For `INCOMPLETE`, state the units/bodies/decisions already resolved and the specific missing or open work, including how far a distant Step's Impacts and current-owner links account for it. For `COMPLETE`, identify the complete Step Unit inventory/dispositions, the full Target Bodies and `RU-EVO-04` owner transitions, and the disposition of material Q/R/P. References to the actual Step Units and body files suffice; do not copy the bodies into this explanation.

`COMPLETE` means the Step's full pre-realization target state is coherently planned, regardless of its horizon or the depth requested for an interim planning pass:

- Step boundary/driver/relations are resolved enough;
- direct `Entering From` predecessor identity is correct;
- `RU-EVO-01` through `RU-EVO-06` have each reached their applicable resolved or justified `OMITTED` disposition, with `RU-EVO-06` itself recording this complete result and an independent start-readiness conclusion; no required Unit remains open;
- every `NEW`/`CHANGED` Feature has one complete ordinary `TM-FEATURE` Target Feature Body representing its entire post-Step behavior; a bounded Feature Impact alone cannot establish `COMPLETE`;
- every other materially `CREATE`d/`REPLACE`d natural owner has a complete ordinary Target Scenario/Screen/Domain/Slice/Shared Body, linked by the Step even when it lives in a separate file; `RU-EVO-04` identifies each transition, while `RETIRE` and unchanged-owner consequences are explicitly disposed without inventing bodies;
- Step-wide implementation concerns and transition/proof obligations are resolved, or explicitly retained as tolerable for realization with their disposition and follow-up;
- materialization intent is truthful;
- every material planning Q/R/P is resolved or deliberately retained with explicit disposition; no question or blocker that prevents trustworthy realization is left unresolved under `COMPLETE`.

A predecessor may still be selected/planned but unrealized. That does **not** by itself make planning incomplete.

An implementation-only Step that preserves Feature behavior has no `NEW`/`CHANGED` Feature Body to complete; it still needs complete applicable Domain/Slice/Shared/other owner target state and transition meaning. Never invent a Feature merely to satisfy this rule. A concrete `LATER_HORIZON` Step may remain `INCOMPLETE` while accounted for by bounded Step-side Impacts or already completed Target Bodies, plus reciprocal current-owner references where applicable. `INCOMPLETE` is the truthful planning status even if its impacts are sufficiently planned for the horizon. Before such a Step becomes the **next Step for realization**, complete every required Unit and Target Body, record the completion explanation, then recompute `RU-EVO-06`.

### Realization Start Readiness

```text
Realization Start Readiness: READY | BLOCKED
```

`READY` means the represented Step route has no remaining semantic/realization blocker to starting the requested implementation scope **once the enclosing route has actual realization authority**:

```text
every direct Entering From predecessor realized/materialized
+ Planning Completeness: COMPLETE, with a documented complete Unit inventory and full Target Bodies for every CREATE/REPLACE owner
+ Step-wide Implementation Concerns resolved/tolerated/routed deeply enough
+ transition/proof obligations sufficiently resolved
+ no blocking Q/R/P for implementation start
+ other concrete unrealized Steps affecting owners in scope accounted for in their Step-side Impacts or full Bodies/retirement transitions and applicable current-owner reverse projections
```

Selection/authorization is intentionally not stored as an internal readiness blocker inside a Proposal Target Result; candidate/selected authority belongs to the enclosing Proposal/Step boundary. Actual realization execution still requires the applicable external selection/authorization in addition to `READY`.

`READY ≠ REALIZED`. A Step may be `Planning Completeness: COMPLETE` and `Realization Start Readiness: BLOCKED` solely because a predecessor has not yet been realized. An explicitly retained open Q/R/P can coexist with `COMPLETE`/`READY` only when its accepted disposition makes it nonblocking for the planned target and realization start; an undispositioned or blocking open question cannot.

The Steps Map may project both compact statuses; detailed reasons stay in the Step.

## Production Method

```text
material unrealized transition
→ inspect current natural owners + actual implementation / Evidence
→ define coherent Step boundary / driver
→ resolve direct Entering From predecessor Step(s), or None
→ establish Feature target state(s) when behavior changes
   → REALIZATION_NEAR NEW/CHANGED Feature: complete Target Feature Body; later horizon may retain bounded Impact
   → unchanged behavior: current/predecessor-realized Feature reference
→ resolve the single RU-EVO-02 Unit; use bounded Impact items for material subjects whose meaning has not converged into a full Target Body or another natural Step Unit; otherwise use the justified Unit disposition
→ use supporting owner/discovery methods proportionally
→ for the next Step for realization, form/link complete Target Feature/Scenario/Screen/Domain/Slice/Shared Bodies for every CREATE/REPLACE owner, including full Domain and Slice contracts
→ inspect owner-local concern/feasibility surfaces
→ resolve RU-EVO-03 Step-wide Implementation Concerns without copying owner-local meaning
→ resolve RU-EVO-04 Materialization Set
→ resolve RU-EVO-05 transition/proof obligations
→ resolve RU-EVO-06 Planning Completeness with an explicit completed/missing inventory explanation, separately from Realization Start Readiness
→ enter SDS Code Realization for code, or broad Core Exact Realization for non-code literal work, only when selected/accepted upstream meaning is sufficient and realization-start conditions are satisfied
```

One Step may contain several Target Owner Bodies when only their composition creates a usable transition. Several commits/packages may realize one Step; implementation packaging does not define application Evolution Step boundaries.

## Current-Owner Evolution Impact Projection

Reusable reverse-projection semantics for current realized Feature/Scenario/Screen/Domain/Slice/Shared owners are owned by the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). This Step remains authority for the future Target/Impact meaning that those current owners reference; it does not redefine the reverse-projection contract.

## Representation

Early shallow representation is valid for a later Step and its `INCOMPLETE` planning explanation. A substantial Step may have a dedicated owner artifact; a shallow Step may be embedded in the Steps Map when that preserves Step identity, relations, candidate/selection state, Target Body/Impact references, concerns and readiness truthfully. The next Step for realization must give each complete Target Body an unambiguous, resolvable reference before its `COMPLETE` conclusion; use a Step directory with a Step owner file and separate full bodies when several bodies would make one file hard to review.

Full Target Owner Bodies strongly favor dedicated Step addressability but do not require one file per body or Unit. Unit identity does not imply file identity.

## Realization / Materialization Gate

Before implementation, use `RU-EVO-06 Realization Start Readiness`; do not substitute plan existence or selection for READY.

After implementation:

```text
Exact/integration Evidence
+ required proof/revalidation
↓
confirm what was actually realized
↓
materialize only Target Owner Bodies established by the realized result
↓
current natural owners now own accepted materialized semantic contracts
↓
actual code/runtime remains realization Evidence/truth,
not an automatic semantic-owner rewrite
```

If actual realization differs materially from selected Step meaning, do not materialize the planned body blindly. Surface a Finding/revalidation and reconcile Step/realization first.

## Validators / Handoff

```text
Step is concrete enough to deserve future-transition ownership
no separately maintained Expected Entry State shadows predecessor authority
Entering From uses smallest sufficient direct semantic predecessor Step set
Planning Completeness is independent of predecessor realization
COMPLETE includes a reasoned all-Unit disposition inventory and complete Target Bodies for every CREATE/REPLACE Feature/Scenario/Screen/Domain/Slice/Shared owner, regardless of horizon; accounted LATER_HORIZON Impacts alone remain INCOMPLETE
Realization Start Readiness requires all direct predecessors realized/materialized
READY for the next Step for realization requires COMPLETE and reciprocal links for other concrete Steps affecting current owners in scope
REALIZATION_NEAR NEW/CHANGED Feature uses one complete TM-FEATURE Target Feature Body
unchanged Feature is referenced rather than copied
current owners remain current semantic authority until realization/materialization
candidate Proposal/branch meaning is not mislabeled canonical selected Step Result
selected meaning is not mislabeled realized
RU-EVO-02 collection items are bounded to Feature/Scenario/Screen/Domain/Slice/Shared/OPEN subjects; a later-horizon Feature Impact never duplicates a complete Feature target body
resolved durable owner-local future meaning converges into one natural Target Owner Body
RU-EVO-03 references owner-local concerns and owns only Step-wide composition pressure
no Realization Prerequisite list survives as a duplicate technical-foundation owner
exact mechanism/detail remains Exact/discovery territory
transition-only obligations remain separate from steady-state target meaning
materialization set identifies CREATE / REPLACE / RETIRE semantics where needed
physical representation operations are not confused with semantic materialization
```

Handoff to SDS Code Realization or broad Core Exact Realization uses the selected/accepted Step future-state plan as upstream planning authority only when `RU-EVO-06` says realization may start for the requested scope. After proof/materialization, retain the Step as transition/decision lineage; it does not remain a competing current-state semantic owner. Surface changed Step identity/`Entering From`/planning-completeness/start-readiness/addressability consequences back to `TM-EVOLUTION-STEPS-MAP` without copying full Step meaning there.

## Evolution Impact Evaluation

Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` to evaluate change isolation/Natural Subject against current owners and candidate/selected Step routes. There is no generic durable `TM-EVOLUTION-IMPACT`; Step-side future Impact remains `RU-EVO-02`, while current-owner reverse projection follows the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).

## Guards

```text
Step ≠ detached change list
Step ≠ second current-state owner
Entering From ≠ technical foundation relation
Expected Entry State projection ≠ independent authority
Step-wide Implementation Concern ≠ copied Feature/Scenario/IR concern
Planning Complete ≠ Start Ready
Start Ready ≠ Realized
Target Owner Body ≠ new FutureOwner ontology
Impact ≠ Feature delta
materialization ≠ physical file mutation
```

## Copied project example

[Study Tab Launcher — Полные будущие Target Bodies вне bounded Impacts, отдельная readiness](../examples/study-tab-launcher/project/planning/documentation/evolution/unrealized/close-superseded-project-windows.md). Read the [case guide and capture limits](../examples/study-tab-launcher/README.md) with the current module contract; the copied project is a dated example, not live application authority.

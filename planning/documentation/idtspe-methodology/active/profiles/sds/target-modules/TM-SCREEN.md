<a id="tm-screen"></a>
# TM-SCREEN — Screen / Spatial Owner

Module ID: `TM-SCREEN`

Entry Point: `tm.screen`
Role: conditional spatial/navigation Target Module

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Own application spatial and navigation composition when it is independently useful:

- Screen/surface inventory and purpose;
- Feature presence / availability / visibility by Screen or zone;
- Screen zones / hierarchy / stable spatial composition;
- meaningful routes/transitions/re-entry/back/cancel/recovery;
- Scenario × Screen participation, including every Scenario Step that actually occurs on this Screen;
- Screen-owned step-local `SCR-*` Requirements when a specific Scenario Step needs an independently addressable spatial/navigation must-hold;
- Screen-owned Screen-wide `SCR-G-*` Requirements whose natural subject is this Screen/spatial-navigation composition and which are not merely Scenario-derived obligations;
- screen-specific contextual constraints, including accessibility/platform constraints when spatially owned.

Screen does not own Feature behavior, Domain meaning or implementation topology.

## Temporal Authority / Evolution-Step Hosting

A canonical Screen owner describes realized/current spatial/navigation truth. Planned but unrealized Screen changes are expressed as a **Target Screen Body** inside `TM-EVOLUTION-STEP` using this same module contract. For the particular next Step for realization, a `CREATE`/`REPLACE` Screen requires a complete ordinary post-Step Target Screen Body with all applicable Screen Units resolved or justifiably omitted; the Step may link it from a separate file.

Selection of a future Screen body does not rewrite the current Screen Map/Drafts. Materialization follows actual realization + required proof/revalidation.

## Source Contract

Typical sources:

- selected Scenarios, especially the `SPS-*` steps that actually occur on this Screen and any relevant `SR-*` pressure needed to derive Screen-local spatial obligations without copying Scenario authority;
- resolved Features that realize participating Scenario steps/Requirements or otherwise participate on this Screen;
- spatial/accessibility/platform constraints;
- current UI and Evidence;
- Prototype/UI/usability Evidence;
- relevant Evolution Step(s).

## Production Method

```text
selected Scenario paths + relevant Scenario requirements / realization pressure
→ identify stable application-owned Screens/surfaces
→ for each participating Scenario, collect every SPS step that actually occurs on this Screen
→ derive only material step-local Screen `SCR-*` Requirements needed for the spatial presentation of specific SPS steps
→ place Feature participation/results into Screens/zones where resolved
→ establish the selected `Screen participation / spatial presentation` for each SPS from the SPS meaning + its step-local SCRs + applicable Screen-wide SCRs
→ establish meaningful routes/transitions
→ form only genuinely Screen-owned Screen-wide `SCR-G-*` Requirements whose natural subject is the Screen as a whole and which are not merely Scenario-derived
→ capture screen-specific contextual constraints
↺ reconcile with Feature / Scenario peers
```

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Screen / Spatial Model`

| Result Unit | Meaning |
|---|---|
| `RU-SCREEN-01` | Screen Map — Screen inventory, Scenario/Feature participation, routes/transitions and global spatial constraints |
| `RU-SCREEN-02` | Screen Draft Set — per-Screen composition, per-Scenario SPS participation tables, step-local Screen `SCR-*` Requirements and Screen-wide `SCR-G-*` Requirements |
| `RU-SCREEN-03` | Evolution Impact — current-owner reverse references to concrete unrealized Evolution Steps that materially affect this realized Screen/spatial owner |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-SCREEN-01` | when cross-screen inventory/routes/Feature participation or global spatial constraints matter | `OMITTED` when no cross-Screen map/routes/global spatial result is independently material beyond local Screen composition |
| `RU-SCREEN-02` | when one or more Screen/zone compositions need independent spatial detail | `OMITTED` when no Screen/zone composition currently needs independent spatial detail |
| `RU-SCREEN-03` | for current realized Screen meaning, when concrete unrealized Steps materially affect spatial/navigation composition and reverse navigation/revalidation is useful | use `OMITTED` with a concise reason when no relevant Step exists; in a future Target Screen Body keep the Unit present but `OMITTED` because current-owner reverse projection is not applicable inside the Step-owned future body |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SCREEN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SCREEN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SCREEN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SCREEN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SCREEN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SCREEN-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SCREEN-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SCREEN-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SCREEN-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SCREEN-03`** — determine whether this Screen's spatial/navigation composition is materially affected, then apply the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).
2. **Unit Work — `RU-SCREEN-03`** — produce the Screen-local reverse navigation/revalidation projection under that shared contract.
3. **Closing Unit Checkpoint — `RU-SCREEN-03`** — validate Screen-local revalidation/handoff needs and the shared projection-contract guards.

<a id="ru-screen-01--screen-map"></a>
### RU-SCREEN-01 — Screen Map

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md)
- **TRIGGERED:**
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)

Prefer relations such as:

```text
Screen / surface
  purpose
  participating Scenarios
  participating Features
  routes / transitions
  global spatial constraints
```

<a id="ru-screen-02--screen-draft-set"></a>
### RU-SCREEN-02 — Screen Draft Set

#### Responsibility

Own independently useful spatial/navigation composition for each material application Screen, including per-Scenario step participation, step-local Screen must-holds and Screen-wide Screen must-holds.

#### Purpose

Make each Screen's spatial responsibility reviewable without copying Scenario or Feature authority: every SPS that occurs on the Screen remains visible, step-local Screen requirements express only Screen-natural obligations for particular SPS steps, and Screen-wide requirements express only Screen-natural obligations of the Screen as a whole.

#### Result Content Contract / Collections

For each Screen Draft, use these repeated result-contract families when material:

```text
COL-SCREEN-SCENARIO-PARTICIPATION
  Item Key / Subject: Scenario ref (SCN-*)
  Item Contract: one per-Scenario participation table for this Screen
  Cardinality: 0..N

COL-SCREEN-STEP-REQUIREMENTS
  Item Key / Subject: SCR-*
  Item Contract: Screen Requirement | Type | Scenario Step(s) | Plain required Screen meaning | QRPE / Examples
  Cardinality: 0..N

COL-SCREEN-WIDE-REQUIREMENTS
  Item Key / Subject: SCR-G-*
  Item Contract: Screen-wide Requirement | Type | Plain required Screen meaning | QRPE / Examples
  Cardinality: 0..N
```

These are collections inside `RU-SCREEN-02`, not peer Units or another Scenario authority. `SCR-*` and `SCR-G-*` are Screen-local stable addressability for Screen-owned must-holds; they do **not** create universal Requirement families outside `TM-SCREEN`. Step-local Screen requirements may be derived from one or more Scenario steps and relevant Scenario requirements, but their canonical meaning must remain Screen-natural rather than copied `SR-*` authority. Screen-wide requirements are independently Screen-natural and are **not derived from Scenario obligations**. `SCR-G-*` is only a Screen-local naming convention for Screen-wide scope inside the same Screen requirement set; it is not a second Requirement family.

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md)
- **TRIGGERED:**
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)
  - [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)

For each Screen needing depth, keep the Screen identity/purpose and spatial composition, then represent **one participation table per Scenario that uses this Screen**. The Scenario remains authority for `SPS-*` / `SR-*`. The Screen table lists the Scenario steps that actually occur here and references only Screen-owned step-local requirements, not Scenario requirements.

```text
Screen ID / name
purpose
zones / hierarchy
Feature presence / actions / results visible here
context visible/input/editable here
entry / exit / route relations
```

### Per-Scenario participation table

For each participating Scenario:

```text
Scenario: <SCN-*>

Scenario Step
| Step-local Screen Requirements
| Feature / Application participation
| Screen participation / spatial presentation
| QRPE / Examples
```

Rules:

- list every `SPS-*` step that actually occurs on/in this Screen, even when that step has **zero** step-local Screen Requirements;
- `Step-local Screen Requirements` contains only Screen-owned `SCR-*` ID + short-name references for requirements attached to that SPS; use `—` when none are material;
- do **not** list Scenario `SR-*` requirements in this table. Relevant Scenario requirements may be Source pressure for deriving a Screen-local `SCR-*`, but Scenario authority stays outside the Screen table;
- `Screen participation / spatial presentation` is the **selected Screen result for that SPS**, not another Requirement. It is established from the SPS meaning plus its step-local `SCR-*` requirements and all applicable Screen-wide `SCR-G-*` requirements;
- a visual `SR-*` may be behaviorally realized by a Feature, spatially participated in by Screen, or both. Visuality alone does not transfer Scenario authority to Screen and does not automatically require a new `SCR-*`;
- if one Scenario uses this Screen in several non-contiguous steps, keep all applicable steps in that Scenario table;
- if several Scenarios use this Screen, render one table per Scenario rather than flattening their steps into one ambiguous list.

### Step-local Screen Requirements

Keep a separate Screen-owned requirement list for spatial/navigation must-holds that are specifically attached to one or several Scenario steps on this Screen. A step-local Screen requirement exists only when independently addressable Screen meaning is useful; an SPS may legitimately have zero such requirements.

```text
Screen Requirement
| Type
| Scenario Step(s)
| Plain required Screen meaning
| QRPE / Examples
```

Use stable `SCR-*` identity for step-local Screen requirements. One `SCR-*` may constrain one or several SPS steps on this Screen. These are **not** copied Scenario requirements: relevant `SR-*` may explain why the Screen obligation exists, but the Screen requirement must state only the spatial/navigation meaning owned by this Screen.

### Screen-wide Requirements

After the per-Scenario tables and step-local requirement list, keep only Requirements whose natural subject is the Screen as a whole and that are **not derived from Scenario obligations**. Use stable `SCR-G-*` identity when independent addressability is useful.

```text
Screen-wide Requirement
| Type
| Plain required Screen meaning
| QRPE / Examples
```

Screen-wide `SCR-G-*` requirements constrain the Screen composition globally. The `Screen participation / spatial presentation` value for each SPS must satisfy all Screen-wide requirements relevant to that presentation without repeating those requirements in every Scenario row.

Typical Screen-owned Screen-wide meaning includes persistent spatial hierarchy, navigation/re-entry behavior, accessibility/platform constraints or visibility/placement constraints whose smallest natural subject is this Screen.

Do not create a step-local `SCR-*` or Screen-wide `SCR-G-*` merely because an `SR-*` is visual. A visual Scenario Requirement remains Scenario authority and may be realized by Feature behavior, Screen spatial meaning, or both. Do not copy canonical Feature behavior text into Screen drafts; reference Feature/BR identity when addressability helps.

<a id="ru-screen-03--evolution-impact"></a>
### RU-SCREEN-03 — Evolution Impact

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md)
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)

This Screen-local Unit specializes the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). Its local affected surface is **spatial/navigation composition**. The shared contract owns inclusion threshold across candidate/selected/conditional/deferred Steps, truthful planning-position projection, depth/no-copy rules and post-realization removal from active future impact. This Target Module owns only the Unit identity, Screen-specific materiality test and local revalidation/handoff use.

## Example

```text
Screen: Synchronization Status

Scenario: SCN-MW-SYNCHRONIZE-DEPENDENCY-MAP
  SPS-07 — Publish synchronized local projections
    Step-local Screen Requirements:
      SCR-01 — Published synchronization outcome is spatially distinguishable

  SPS-08 — Continue local methodology work
    Step-local Screen Requirements: —

Screen-wide Requirements:
  SCR-G-01 — Status remains spatially persistent
```

`SPS-08` remains in the Screen participation table even though it has no step-local Screen Requirement. `Screen participation / spatial presentation` for each row is the selected Screen result after applying the SPS meaning, its step-local `SCR-*` requirements, and relevant Screen-wide `SCR-G-*` requirements. Scenario `SR-*` authority remains in Scenario and is not copied into this projection.

## Source Discovery Rule

Use only the source subset needed by the current spatial question.

Selected Scenario step meaning is the primary participation input. Relevant Scenario requirements may provide Source pressure for deriving Screen-local requirements but are not copied into the per-Scenario table. Resolved Feature meaning is an optional realization/participation input; current UI/code/screenshots are Evidence/current-state Source. If current UI contradicts selected semantics, surface a Finding rather than silently making implementation the desired Screen authority.

## Knowledge Basis / Question Guidance

Primary reusable evaluation is `LENS-UI-SPATIAL-FRONTEND-REALIZATION`.

Ask proportionally:
- Which stable surfaces/Screens exist and why?
- Which Scenarios use this Screen, and which exact SPS steps occur here?
- Which step-local Screen requirements, if any, are needed for those SPS steps?
- Which relevant Scenario requirements create spatial pressure without becoming Screen-owned copies?
- Which Features are present/available/visible on each surface, and which SPS/SR Scenario meaning do they realize when Feature ownership is resolved?
- Which Scenario path causes entry/exit/re-entry?
- What zones/hierarchy are semantically meaningful?
- Which routes/back/cancel/recovery relations matter?
- Which context is displayed/entered/edited without stealing Feature/Domain ownership?
- Which accessibility/platform constraints are specifically Screen-owned?
- Which visual requirements remain Scenario/Feature-owned, which require step-local Screen `SCR-*`, and which are genuinely Screen-wide `SCR-G-*`?

## Proposal / Alternative Handling

Material Screen/interaction alternatives use Core Proposal/Branch/Decision semantics. Screen Result Units contain selected/OPEN Screen meaning, not a separate Screen-specific Proposal state.

## Representation / Artifact Contract

A compact project may use one Screen Map with embedded Screen Drafts. Each material Screen Draft may contain one per-Scenario participation table for every Scenario that uses it, followed by the Screen-owned step-local `SCR-*` and Screen-wide `SCR-G-*` Requirement sets. Promote a Draft to independent addressability only when review/reuse/lifecycle pressure warrants it.

Do not create one file per Screen by default.

## Validators

```text
Screen inventory/purpose is coherent
Feature presence/availability/visibility is explicit where material
Scenario×Screen participation supports actual journey paths
for every participating Scenario, the Screen table includes every SPS step that actually occurs here even when no step-local Screen Requirement exists
per-Scenario rows reference only step-local Screen `SCR-*`, not Scenario `SR-*` requirements
Screen participation / spatial presentation is a resolved Screen result constrained by the SPS meaning + step-local SCR-* + applicable Screen-wide SCR-G-*
step-local SCR-* Requirements are Screen-natural and attached to one or several SPS steps
Screen-wide SCR-G-* Requirements are Screen-natural, are not merely aggregate Scenario obligations, and are not treated as a universal Requirement family
routes/back/cancel/recovery/re-entry are represented where meaningful
Screen constraints do not duplicate Feature behavior or Domain rules
no frontend component/class tree is treated as Screen semantic truth
one Screen ↔ many Features/Slices and one Feature/Slice ↔ many Screens remain valid
current UI Evidence does not silently override selected Screen meaning
```

## Guards

```text
Screen ≠ Scenario
Screen ≠ Feature
Screen ≠ frontend component tree
Screen ≠ container for one Slice
one Screen may serve many Features/Slices
one Feature/Slice may involve many Screens
```

## Handoff

Screen meaning is a source to Feature/Slice realization where UI obligations are material. Step-local and Screen-wide Screen requirements remain Screen authority; Scenario `SR-*` remains Scenario authority. Practical UI behavior may be explored through `TM-PROTOTYPE` before committed realization or `TM-PRACTICAL-TEST` against the real implementation/environment.

## Natural Visual Requirement Owner

Visuality alone does not create Screen ownership:

```text
journey visibility/interaction must-hold → SR-* when Scenario-natural; may be realized by Feature behavior, Screen spatial meaning, or both
Feature behavior/result must-hold → BR-* when Feature-natural, including visual behavior/result
step-specific spatial/navigation must-hold → Screen-local SCR-* when Screen-natural
whole-Screen spatial/navigation must-hold → Screen-local SCR-G-* when Screen-natural
frontend mechanism → IR-* at natural realization owner when durable
```

A visual `SR-*` does not become a Screen Requirement merely because it is visible. Feature may realize behavioral parts of that `SR-*`; Screen may spatially participate in the same Scenario obligation. A separate step-local `SCR-*` or Screen-wide `SCR-G-*` exists only when there is independently useful Screen-natural spatial/navigation meaning.

## Copied project example

[Study Tab Launcher — UI actions → Features / Scenarios](../examples/study-tab-launcher/project/planning/documentation/screens/chatgpt-launcher-widget.md). Read the [case guide and capture limits](../examples/study-tab-launcher/README.md) with the current module contract; the copied project is a dated example, not live application authority.

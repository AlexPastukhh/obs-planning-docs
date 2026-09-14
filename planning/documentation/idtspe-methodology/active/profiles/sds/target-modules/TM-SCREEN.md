# TM-SCREEN — Screen / Spatial Owner

Entry Point: `tm.screen`  
Role: conditional spatial/navigation Target Module

## Purpose

Own application spatial and navigation composition when it is independently useful:

- Screen/surface inventory and purpose;
- Feature presence / availability / visibility by Screen or zone;
- Screen zones / hierarchy / stable spatial composition;
- meaningful routes/transitions/re-entry/back/cancel/recovery;
- Scenario × Screen participation;
- screen-specific contextual constraints, including accessibility/platform constraints when spatially owned.

Screen does not own Feature behavior, Domain meaning or implementation topology.

## Temporal Authority / Evolution-Step Hosting

A canonical Screen owner describes realized/current spatial/navigation truth. Planned but unrealized Screen changes are expressed as a **Target Screen Body** inside `TM-EVOLUTION-STEP` using this same module contract.

Selection of a future Screen body does not rewrite the current Screen Map/Drafts. Materialization follows actual realization + required proof/revalidation.

## Source Contract

Typical sources:

- selected Features;
- selected Scenarios;
- spatial/accessibility/platform constraints;
- current UI and Evidence;
- Prototype/UI/usability Evidence;
- relevant Evolution Step(s).

## Lens Profile

Primary reusable lens: `LENS-UI-SPATIAL-FRONTEND-REALIZATION`.

Conditional Core lenses include Verifiability/Observability/Operability, Quality/Risk/Materiality, Evolution and Representation when material.

## Production Method

```text
selected Features + Scenario journey needs
→ identify stable Screens/surfaces
→ place Feature participation into Screens/zones
→ establish meaningful routes/transitions
→ capture screen-specific contextual constraints
↺ reconcile with Feature / Scenario peers
```

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

**Target Step Result:** `Screen / Spatial Model`

| Result Unit | Meaning |
|---|---|
| `RU-SCREEN-01` | Screen Map — Screen inventory, Feature/Scenario participation, routes/transitions and global spatial constraints |
| `RU-SCREEN-02` | Screen Draft Set — independently useful Screen/zone composition details |
| `RU-SCREEN-03` | Evolution Impact — current-owner reverse references to concrete unrealized Evolution Steps that materially affect this realized Screen/spatial owner |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-SCREEN-01` | when cross-screen inventory/routes/Feature participation or global spatial constraints matter | omit global map detail when a single local Screen composition is sufficient |
| `RU-SCREEN-02` | when one or more Screen/zone compositions need independent spatial detail | omit Screen drafts whose layout/zone meaning adds no planning value yet |
| `RU-SCREEN-03` | for current realized Screen meaning, when concrete unrealized Steps materially affect spatial/navigation composition and reverse navigation/revalidation is useful | omit when no relevant Step exists; omit from the Target Screen Body of the Step that owns the future change |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SCREEN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SCREEN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SCREEN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SCREEN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SCREEN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SCREEN-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SCREEN-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SCREEN-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SCREEN-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SCREEN-03`** — inspect concrete relevant Steps and confirm material spatial/navigation impact.
2. **Unit Work — `RU-SCREEN-03`** — retain compact Step references/revalidation pressure only; future Screen meaning remains in Step-side `RU-EVO-02` / Target Screen Body.
3. **Closing Unit Checkpoint — `RU-SCREEN-03`** — ensure no future Target Screen Body or roadmap is copied into current Screen authority.

### RU-SCREEN-01 — Screen Map

Prefer relations such as:

```text
Screen / surface
  purpose
  participating Features
  Scenario roles
  routes / transitions
  global spatial constraints
```

### RU-SCREEN-02 — Screen Draft Set

For a Screen needing depth:

```text
Screen ID / name
purpose / Scenario role(s)
zones / hierarchy
Feature presence / actions / results visible here
context visible/input/editable here
entry / exit / route relations
screen-specific contextual constraints
```

Do not copy canonical Feature behavior text into Screen drafts. Reference Feature/BR identity when addressability helps.

### RU-SCREEN-03 — Evolution Impact

For current realized Screen meaning, expose only compact references to concrete unrealized Steps that materially affect spatial/navigation composition. Canonical future impact and any changed Target Screen Body remain Step-owned. The reverse projection may be explicit, generated or derived.

## Example

```text
Review Inbox
  Features:
    Review Captured Item
    Select Item
  Zones:
    item list
    filters
    selection/action area
  Route:
    Review Inbox → Item Detail → Review Inbox
```

Changing which Screen exposes a Feature normally changes Screen composition, not Feature behavior identity.

## Source Discovery Rule

Use only the source subset needed by the current spatial question.

Selected Feature/Scenario meaning is semantic input; current UI/code/screenshots are Evidence/current-state Source. If current UI contradicts selected semantics, surface a Finding rather than silently making implementation the desired Screen authority.

## Knowledge Basis / Question Guidance

Primary reusable evaluation is `LENS-UI-SPATIAL-FRONTEND-REALIZATION`.

Ask proportionally:
- Which stable surfaces/Screens exist and why?
- Which Features are present/available/visible on each surface?
- Which Scenario path causes entry/exit/re-entry?
- What zones/hierarchy are semantically meaningful?
- Which routes/back/cancel/recovery relations matter?
- Which context is displayed/entered/edited without stealing Feature/Domain ownership?
- Which accessibility/platform constraints are specifically Screen-owned?

## Proposal / Alternative Handling

Material Screen/interaction alternatives use Core Proposal/Branch/Decision semantics. Screen Result Units contain selected/OPEN Screen meaning, not a separate Screen-specific Proposal state.

## Representation / Artifact Contract

A compact project may use one Screen Map with embedded Screen Drafts. Promote a Draft to independent addressability only when review/reuse/lifecycle pressure warrants it.

Do not create one file per Screen by default.

## Validators

```text
Screen inventory/purpose is coherent
Feature presence/availability/visibility is explicit where material
Scenario×Screen participation supports actual journey paths
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

Screen meaning is a source to Feature/Slice realization where UI obligations are material. Practical UI behavior may be explored through `TM-PROTOTYPE` before committed realization or `TM-PRACTICAL-TEST` against the real implementation/environment.

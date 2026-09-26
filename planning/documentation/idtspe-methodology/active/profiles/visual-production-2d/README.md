<a id="visual2d-profile-bootstrap"></a>
# 2D Visual Production Profile — IDTSPE

Responsibility ID: `VISUAL2D.PROFILE-BOOTSTRAP`

Status: active profile

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Installed Profile Discovery](../PROFILE-REGISTRY.md#idtspe-profile-discovery) — `IDTSPE.PROFILE-DISCOVERY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Visual Production Invariants](profile-contracts/VISUAL-PRODUCTION-INVARIANTS.md#visual2d-production-invariants) — `VISUAL2D.PRODUCTION-INVARIANTS`
> - `CONTEXTUALIZES` [2D Target Module Discovery](registries/TARGET-MODULE-REGISTRY.md#registry-2d-target-modules) — `VISUAL2D.TARGET-MODULE-DISCOVERY`
> - `CONTEXTUALIZES` [2D Lens Discovery](registries/LENS-REGISTRY.md#registry-2d-lenses) — `VISUAL2D.LENS-DISCOVERY`
> - `CONTEXTUALIZES` [Visual Material / Source Usage](source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#visual-material-and-source-usage) — `VISUAL2D.MATERIAL-SOURCE-USAGE`
> - `CONTEXTUALIZES` [Construction Route Selection](target-module-support/construction/CONSTRUCTION-ROUTE-SELECTION.target-module-guidance.md#shared-construction-route-selection) — `VISUAL2D.CONSTRUCTION-ROUTE-SELECTION`
> - `CONTEXTUALIZES` [2D Artifact Placement](representation/ARTIFACT-PLACEMENT-MAP.md#artifact-placement-map) — `VISUAL2D.ARTIFACT-PLACEMENT`

## Purpose

This profile specializes IDTSPE for planning and producing 2D visual results through explicit visual intent, qualified visual material, coherent whole-image design, editable/deterministic construction and reviewable iteration.

The profile is representation-aware but tool-agnostic. Ordinary image generators may supply supporting material; they are not the default final rendering authority.

## Profile Bootstrap

This `README.md` is the canonical profile entry. It assumes the primary Documentation / IDTSPE bootstrap is already current.

### Required orientation spine

For the 2D visual-production portion, read in order when the profile context is cold or unreliable:

1. this `README.md`;
2. [Responsibility Map](RESPONSIBILITY-MAP.md);
3. [Visual Production Invariants](profile-contracts/VISUAL-PRODUCTION-INVARIANTS.md#visual2d-production-invariants);
4. [2D Visual Production Target Module Registry](registries/TARGET-MODULE-REGISTRY.md#registry-2d-target-modules);
5. [2D Visual Lens Registry](registries/LENS-REGISTRY.md#registry-2d-lenses).

### Conditional deep reads

- Unit disposition, materiality or Lens checkpoints → [Unit Disposition / Materiality Review And Lens Checkpoints](runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints);
- choosing a concrete construction route → [Construction Route Selection](target-module-support/construction/CONSTRUCTION-ROUTE-SELECTION.target-module-guidance.md#shared-construction-route-selection);
- reviewing/re-entering construction → [Construction Review Loop Checkpoint](target-module-support/construction/CONSTRUCTION-REVIEW-LOOP.target-module-checkpoint.md#shared-construction-review-loop);
- representing or placing an artifact → [Artifact Placement Map](representation/ARTIFACT-PLACEMENT-MAP.md#artifact-placement-map);
- selected Target Modules, Lenses, templates or examples → only the applicable registry-routed owner.

Reuse current reliable profile orientation. Reading this profile does not create or select a Target, execute a Target Module or Lens, or mutate the repository.

## Profile Scope

The profile owns reusable methodology for:

- visual outcome and requirement resolution;
- visual-material need/coverage analysis at the current Unit plus reusable bounded preparation operations;
- coherent whole-visual design;
- native pixel, vector, editable raster, painterly raster and procedural construction;
- material multi-route construction integration;
- visual delivery adaptation;
- visual-specific Unit/source-coverage evaluation;
- construction review and re-entry;
- visual-material registry/representation guidance.

Canonical 3D asset/scene construction belongs to a sibling 3D profile. A temporary 3D helper used only to resolve a 2D visual-information gap is supporting material: route the gap through the Unit Need / Visual Source Coverage Lens and use the [Visual Material Preparation Operation](operations/VISUAL-MATERIAL-PREPARATION.operation.md#visual-material-preparation-operation) when a bounded helper transformation is sufficient.

## Target Topology

Normal direction:

```text
Visual Requirements
        ↓
Unit Need / Visual Source Coverage  [evaluate missing/partial/conflicting information]
        ↓ when bounded preparation is useful
Visual Material Preparation Operation
        ↓ continue affected Unit
Whole Visual Design
        ↓
one concrete Construction Route
        ↓
Delivery Adaptation                [only when adaptation itself requires visual decisions]
```

A concrete construction route is normally the PRIMARY construction Target:

- [Pixel Art Construction](target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#tm-2d-31-pixel-art-construction)
- [Vector Construction](target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#tm-2d-31-vector-construction)
- [Editable Raster Construction](target-modules/TM-2D-31-EDITABLE-RASTER-CONSTRUCTION.md#tm-2d-31-editable-raster-construction)
- [Painterly Raster Construction](target-modules/TM-2D-31-PAINTERLY-RASTER-CONSTRUCTION.md#tm-2d-31-painterly-raster-construction)
- [Procedural Construction](target-modules/TM-2D-31-PROCEDURAL-CONSTRUCTION.md#tm-2d-31-procedural-construction)

Use [Multi-route Visual Construction](target-modules/TM-2D-30-VISUAL-CONSTRUCTION.md#tm-2d-30-visual-construction) only when combining route results introduces material integration/composition meaning. Mechanical aggregation does not require that Target.

This topology is directional guidance, not a mandatory phase state machine. Ordinary acquisition/crop/annotation/measurement/normalization does not form a Target Module. Form [TM-2D-15 Prepared Visual Material Set](target-modules/TM-2D-15-PREPARED-VISUAL-MATERIAL-SET.md#tm-2d-15-prepared-visual-material-set) only when the retained Prepared Visual Material Set is itself an independently useful Target Result. Findings otherwise re-enter the smallest correct Unit/owner.

## Module-defined Unit Disposition / Materiality Review

A formed Target instantiates the complete Module-defined Unit inventory. [Unit Need / Visual Source Coverage](lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) evaluates the substantive resolution depth/disposition of those Units:

- how much substantive work this already-instantiated Unit responsibility needs in this Target;
- how accepted visual Sources cover that responsibility;
- how much further analysis/preparation/resolution is likely to be needed.

The AI evaluates Unit materiality/depth against the current situation and responsibility-specific Source/reference coverage. Obvious dispositions may be derived from accepted context; a materially contested disposition follows normal Proposal/Decision authority.

If substantive work is omitted, the Unit remains instantiated/addressable in the Target result with its name/ID, concise omission reason and enough situation/Source context when useful. Omission never turns the Unit into `N/A` or removes it from the Target inventory.

The profile checkpoint route is [Unit Disposition / Materiality Review And Lens Checkpoints](runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints).

## Visual Materials And Sources

Use [Visual Material And Source Usage](source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#shared-visual-material-and-source-usage) for the profile bridge between retained visual materials and Core Source bindings.

Use [Visual Material Storage And Registry](representation/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry) when retained material volume/reuse justifies a project-level registry/store. Current Target/Unit interpretation remains local to that semantic owner; use [Visual Target-local Material Analysis Representation Guidance](representation/VISUAL-TARGET-LOCAL-MATERIAL-ANALYSIS.representation-guidance.md#visual-target-local-material-analysis-representation-guidance) to choose embedded, aggregate, per-reference or mixed representation.

## Construction

Construction Targets produce implementation-native editable sources. [Exact Realization Integration](target-module-support/construction/EXACT-REALIZATION-INTEGRATION.target-module-guidance.md#shared-exact-realization-integration) permits literal source construction/modification during Unit Resolution rather than deferring all realization to the end.

At meaningful whole-candidate milestones, use [Construction Review Loop Checkpoint](target-module-support/construction/CONSTRUCTION-REVIEW-LOOP.target-module-checkpoint.md#shared-construction-review-loop-checkpoint).

## Registries

- [Target Module Registry](registries/TARGET-MODULE-REGISTRY.md#registry-2d-target-modules)
- [Lens Registry](registries/LENS-REGISTRY.md#registry-2d-lenses)
- [Artifact Placement Map](representation/ARTIFACT-PLACEMENT-MAP.md#artifact-placement-map)

## Templates And Examples

- [Target Instance Template](representation/templates/TARGET-INSTANCE.template.md#template-target-instance)
- [Visual Material Registry Template](representation/templates/VISUAL-MATERIAL-REGISTRY.template.md#template-visual-material-registry)
- [Representative Workflow Examples](examples/README.md#representative-workflow-examples)

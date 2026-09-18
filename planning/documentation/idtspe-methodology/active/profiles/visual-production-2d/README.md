<a id="profile-2d-visual-production"></a>
# 2D Visual Production Profile — IDTSPE

Status: active profile

## Purpose

This profile specializes IDTSPE for planning and producing 2D visual results through explicit visual intent, qualified visual material, coherent whole-image design, editable/deterministic construction and reviewable iteration.

The profile is representation-aware but tool-agnostic. Ordinary image generators may supply supporting material; they are not the default final rendering authority.

## Profile Bootstrap

This `README.md` is the canonical profile entry. It assumes the primary Documentation / IDTSPE bootstrap is already current.

For the 2D visual-production portion, read in order:

1. this `README.md`;
2. [Visual Production Invariants](shared/VISUAL-PRODUCTION-INVARIANTS.md#shared-visual-production-invariants);
3. [2D Visual Production Target Module Registry](TARGET-MODULE-REGISTRY.md#registry-2d-target-modules);
4. [2D Visual Lens Registry](LENS-REGISTRY.md#registry-2d-lenses);
5. [Unit Selection And Lens Checkpoints](shared/UNIT-SELECTION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints);
6. [Construction Route Selection](shared/CONSTRUCTION-ROUTE-SELECTION.md#shared-construction-route-selection);
7. [Construction Review Loop Checkpoint](shared/CONSTRUCTION-REVIEW-LOOP-CHECKPOINT.md#shared-construction-review-loop-checkpoint);
8. [Artifact Placement Map](ARTIFACT-PLACEMENT-MAP.md#artifact-placement-map).

Concrete Target Modules, Lenses, templates and examples remain lazy reads after registry selection and local applicability.

## Profile Scope

The profile owns reusable methodology for:

- visual outcome and requirement resolution;
- visual-material acquisition, qualification and preparation;
- coherent whole-visual design;
- native pixel, vector, editable raster, painterly raster and procedural construction;
- material multi-route construction integration;
- visual delivery adaptation;
- visual-specific Unit/source-coverage evaluation;
- construction review and re-entry;
- visual-material registry/representation guidance.

Canonical 3D asset/scene construction belongs to a sibling 3D profile. A temporary 3D helper used only to resolve a 2D visual-information gap may participate through [Visual Material Preparation](target-modules/TM-2D-15-VISUAL-MATERIAL-PREPARATION.md#tm-2d-15-visual-material-preparation).

## Target Topology

Normal direction:

```text
Visual Requirements
        ↓
Visual Material Preparation        [re-enter when new information is needed]
        ↓
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

This topology is directional guidance, not a mandatory phase state machine. Findings may re-enter the smallest correct upstream owner.

## Candidate Unit Selection

Target Modules expose candidate Unit responsibilities. Before runtime Unit projection, [Unit Need / Visual Source Coverage](lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) evaluates:

- whether a candidate Unit has useful independent responsibility in this Target;
- how accepted visual Sources cover that responsibility;
- how much further analysis/preparation/resolution is likely to be needed.

The AI evaluates **every candidate Unit** against the current situation and responsibility-specific Source/reference coverage, then presents a recommendation and rationale. Material include/omit changes are user-selected unless the same selection is already current.

If the AI recommends omission, the Candidate Unit Selection must keep that Unit's name/ID and explicitly record the current situation, relevant Source/reference coverage, and why no independently useful unresolved responsibility remains. The omitted candidate stays visible in the selection trace and does not become an `N/A` Work Unit.

The profile checkpoint route is [Unit Selection And Lens Checkpoints](shared/UNIT-SELECTION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints).

## Visual Materials And Sources

Use [Visual Material And Source Usage](shared/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#shared-visual-material-and-source-usage) for the profile bridge between retained visual materials and Core Source bindings.

Use [Visual Material Storage And Registry](shared/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry) when retained material volume/reuse justifies a project-level registry/store.

## Construction

Construction Targets produce implementation-native editable sources. [Exact Realization Integration](shared/EXACT-REALIZATION-INTEGRATION.md#shared-exact-realization-integration) permits literal source construction/modification during Unit Resolution rather than deferring all realization to the end.

At meaningful whole-candidate milestones, use [Construction Review Loop Checkpoint](shared/CONSTRUCTION-REVIEW-LOOP-CHECKPOINT.md#shared-construction-review-loop-checkpoint).

## Registries

- [Target Module Registry](TARGET-MODULE-REGISTRY.md#registry-2d-target-modules)
- [Lens Registry](LENS-REGISTRY.md#registry-2d-lenses)
- [Artifact Placement Map](ARTIFACT-PLACEMENT-MAP.md#artifact-placement-map)

## Templates And Examples

- [Target Instance Template](templates/TARGET-INSTANCE.template.md#template-target-instance)
- [Visual Material Registry Template](templates/VISUAL-MATERIAL-REGISTRY.template.md#template-visual-material-registry)
- [Representative Workflow Examples](examples/README.md#representative-workflow-examples)

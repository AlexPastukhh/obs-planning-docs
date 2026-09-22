<a id="registry-2d-target-modules"></a>
# Target Module Registry — 2D Visual Production

Responsibility ID: `VISUAL2D.TARGET-MODULE-DISCOVERY`

| Depth | Target Module | Stable ID | Roles | Use |
|---:|---|---|---|---|
| 10 | [Visual Requirements](../target-modules/TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements) | `TM-2D-10-VISUAL-REQUIREMENTS` | PRIMARY / SUPPORTING | what the visual must accomplish |
| 15 | [Prepared Visual Material Set](../target-modules/TM-2D-15-PREPARED-VISUAL-MATERIAL-SET.md#tm-2d-15-prepared-visual-material-set) | `TM-2D-15-PREPARED-VISUAL-MATERIAL-SET` | PRIMARY / SUPPORTING conditional | independently useful retained prepared/qualified visual-material set |
| 20 | [Whole Visual Design](../target-modules/TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design) | `TM-2D-20-WHOLE-VISUAL-DESIGN` | PRIMARY | coherent complete visual solution/direction |
| 30 | [Multi-route Visual Construction](../target-modules/TM-2D-30-VISUAL-CONSTRUCTION.md#tm-2d-30-visual-construction) | `TM-2D-30-VISUAL-CONSTRUCTION` | PRIMARY / COMPOSITION when material | material multi-route composition/integration only |
| 31 | [Pixel Art Construction](../target-modules/TM-2D-31-PIXEL-ART-CONSTRUCTION.md#tm-2d-31-pixel-art-construction) | `TM-2D-31-PIXEL-ART-CONSTRUCTION` | PRIMARY / SUPPORTING | native pixel-grid construction |
| 31 | [Vector Construction](../target-modules/TM-2D-31-VECTOR-CONSTRUCTION.md#tm-2d-31-vector-construction) | `TM-2D-31-VECTOR-CONSTRUCTION` | PRIMARY / SUPPORTING | semantic vector/path construction |
| 31 | [Editable Raster Construction](../target-modules/TM-2D-31-EDITABLE-RASTER-CONSTRUCTION.md#tm-2d-31-editable-raster-construction) | `TM-2D-31-EDITABLE-RASTER-CONSTRUCTION` | PRIMARY / SUPPORTING | structured layered raster construction |
| 31 | [Painterly Raster Construction](../target-modules/TM-2D-31-PAINTERLY-RASTER-CONSTRUCTION.md#tm-2d-31-painterly-raster-construction) | `TM-2D-31-PAINTERLY-RASTER-CONSTRUCTION` | PRIMARY / SUPPORTING | painterly raster construction |
| 31 | [Procedural Construction](../target-modules/TM-2D-31-PROCEDURAL-CONSTRUCTION.md#tm-2d-31-procedural-construction) | `TM-2D-31-PROCEDURAL-CONSTRUCTION` | PRIMARY / SUPPORTING | deterministic parameter/field-based construction |
| 50 | [Delivery Adaptation](../target-modules/TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation) | `TM-2D-50-DELIVERY-ADAPTATION` | PRIMARY / SUPPORTING conditional | visually material output/crop/localization adaptation |

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`

## Profile-wide Unit-selection route

[Unit Disposition / Materiality Review And Lens Checkpoints](../runtime/UNIT-DISPOSITION-AND-LENS-CHECKPOINTS.md#shared-unit-selection-and-lens-checkpoints) keeps every Module-defined Unit instantiated/addressable and evaluates only substantive resolution depth/disposition. [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) performs that evaluation. Omitted substantive work retains the Unit name/ID plus concise reason; material disposition choices use normal Proposal/Decision authority.


## Construction route selection

```text
single coherent route
→ concrete TM-2D-31-* directly as PRIMARY

several route outputs combined mechanically
→ accepted Sources/handoff; no composition Target

material route-composition/integration meaning
→ TM-2D-30-VISUAL-CONSTRUCTION
```

For the semantic route-selection guidance, use [Construction Route Selection Guidance](../target-module-support/construction/CONSTRUCTION-ROUTE-SELECTION.target-module-guidance.md#shared-construction-route-selection).

## Material Preparation Boundary

Ordinary material acquisition/transformation is the reusable [Visual Material Preparation Operation](../operations/VISUAL-MATERIAL-PREPARATION.operation.md#visual-material-preparation-operation), driven by Unit-relative need/coverage analysis from the [Unit Need / Visual Source Coverage Lens](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage). Do not instantiate TM-2D-15 merely because a current Unit needs a crop, measurement, annotation, helper render or additional reference.

<a id="tm-2d-31-editable-raster-construction"></a>
# TM-2D-31-EDITABLE-RASTER-CONSTRUCTION — Structured Layered Raster Construction

Entry Point: `tm.2d.construction.editable-raster`  
Supported Roles: PRIMARY, SUPPORTING  
Status: active profile module

## Purpose

Construct the actual editable 2D result using this route while preserving accepted upstream visual meaning and exposing meaningful whole candidates for review.

## Target Step Result

`Editable Layered Raster Construction Result`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-RAS-01` | [Editable Layer And Mask Structure](#ru-ras-01) | actual layer/mask/ownership structure needed for controlled local editing |
| `RU-RAS-02` | [Whole-image Mass Blockout](#ru-ras-02) | large value/shape/color masses and whole-image placement realized in the raster source |
| `RU-RAS-03` | [Form And Volume Realization](#ru-ras-03) | actual form/volume/perspective articulation needed by the accepted design |
| `RU-RAS-04` | [Color Light And Material Realization](#ru-ras-04) | actual color/light/material relationships in the raster source |
| `RU-RAS-05` | [Surface Edge And Selective Finish](#ru-ras-05) | material edge/surface treatment and selective finish that remains a coherent result responsibility |


## Source Contract

Typical Sources: accepted [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), accepted [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design) when applicable, qualified visual material/Source bindings, current editable source on refinement/revalidation, and route-specific constraints.

## Unit Checkpoint Map

- [Editable Layer And Mask Structure](#ru-ras-01): **Opening Unit Checkpoint — `RU-RAS-01`** → **Unit Work — `RU-RAS-01`** → **Closing Unit Checkpoint — `RU-RAS-01`**
- [Whole-image Mass Blockout](#ru-ras-02): **Opening Unit Checkpoint — `RU-RAS-02`** → **Unit Work — `RU-RAS-02`** → **Closing Unit Checkpoint — `RU-RAS-02`**
- [Form And Volume Realization](#ru-ras-03): **Opening Unit Checkpoint — `RU-RAS-03`** → **Unit Work — `RU-RAS-03`** → **Closing Unit Checkpoint — `RU-RAS-03`**
- [Color Light And Material Realization](#ru-ras-04): **Opening Unit Checkpoint — `RU-RAS-04`** → **Unit Work — `RU-RAS-04`** → **Closing Unit Checkpoint — `RU-RAS-04`**
- [Surface Edge And Selective Finish](#ru-ras-05): **Opening Unit Checkpoint — `RU-RAS-05`** → **Unit Work — `RU-RAS-05`** → **Closing Unit Checkpoint — `RU-RAS-05`**


## Preferred Workflow / Dependency Direction

```text
RU-RAS-01 → RU-RAS-02 → RU-RAS-03 ↔ RU-RAS-04 → RU-RAS-05
→ meaningful whole candidate → Construction Review Loop
```


## Unit-specific Guidance

<a id="ru-ras-01"></a>
### Editable Layer And Mask Structure

`RU-RAS-01`

Use layers/masks for meaningful ownership and local revision, not maximal fragmentation.
<a id="ru-ras-02"></a>
### Whole-image Mass Blockout

`RU-RAS-02`

Establish the whole image at large scale before local detail. Keep accepted composition/design authority upstream.
<a id="ru-ras-03"></a>
### Form And Volume Realization

`RU-RAS-03`

Resolve form/volume where the chosen raster method needs explicit articulation; missing authoritative form information can re-enter Material Preparation.
<a id="ru-ras-04"></a>
### Color Light And Material Realization

`RU-RAS-04`

Realize accepted visual-language direction as actual color/light/material relationships rather than re-designing them.
<a id="ru-ras-05"></a>
### Surface Edge And Selective Finish

`RU-RAS-05`

Use only when edge/surface/finish meaning is independently material; whole-image coherence is evaluated through the review Lens rather than becoming a catch-all finish Unit.

## Lens Profile

[Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency) is frequent; [Representation / Editability Economy](../lenses/reusable/LENS-REPRESENTATION-EDITABILITY-ECONOMY.md#lens-representation-editability-economy) applies when layer/mask structure or revision locality is material.

## Construction Review Loop

At meaningful whole-candidate milestones use [Construction Review Loop Checkpoint](../shared/CONSTRUCTION-REVIEW-LOOP-CHECKPOINT.md#shared-construction-review-loop-checkpoint).

## Exact Realization

Route Unit Resolution may invoke Core Exact Realization through [Exact Realization Integration](../shared/EXACT-REALIZATION-INTEGRATION.md#shared-exact-realization-integration) when literal construction/modification is needed.

## Validators

editable ownership is useful rather than ornamental; large-scale read remains coherent; form and appearance realize accepted design; local polish does not hide unresolved upstream structure.

## Handoff

Accepted route result may become a Source for [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation), multi-route integration or other downstream work. Route findings return to the smallest correct upstream owner.

## Revalidation

Reopen when authoritative design/Source meaning changes, target representation constraints change, or Construction Review exposes a route-local defect or route mismatch.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-RAS-01
CONTENT_KIND: canonical editable raster source
WHEN: accepted route result must survive as editable authority
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: IMPLEMENTATION_NATIVE
FILE_OR_ARTIFACT: <canonical-layered-raster-source>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md)

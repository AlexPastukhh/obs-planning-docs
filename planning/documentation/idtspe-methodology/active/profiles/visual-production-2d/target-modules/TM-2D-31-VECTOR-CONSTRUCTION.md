<a id="tm-2d-31-vector-construction"></a>
# TM-2D-31-VECTOR-CONSTRUCTION — Semantic Vector / Shape Construction

Entry Point: `tm.2d.construction.vector`
Supported Roles: PRIMARY, SUPPORTING
Status: active profile module

## Purpose

Construct the actual editable 2D result using this route while preserving accepted upstream visual meaning and exposing meaningful whole candidates for review.

## Target Step Result

`Editable Semantic Vector Construction Result`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-VEC-01` | [Semantic Part Structure](#ru-vec-01) | actual editable semantic decomposition into addressable vector parts/groups/components |
| `RU-VEC-02` | [Major Geometry And Silhouettes](#ru-vec-02) | primary path/primitives geometry, silhouettes and large proportions |
| `RU-VEC-03` | [Internal Geometry And Overlaps](#ru-vec-03) | internal paths, overlap/layer relationships and secondary geometric structure |
| `RU-VEC-04` | [Fill Stroke And Appearance](#ru-vec-04) | vector-native fill/stroke/gradient/appearance realization |
| `RU-VEC-05` | [Effects Clipping And Secondary Structure](#ru-vec-05) | material masks/clipping/effects/secondary structure that has independent editable value |


## Source Contract

Typical Sources: accepted [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), accepted [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design) when applicable, qualified visual material/Source bindings, current editable source on refinement/revalidation, and route-specific constraints.

## Unit Checkpoint Map

- [Semantic Part Structure](#ru-vec-01): **Opening Unit Checkpoint — `RU-VEC-01`** → **Unit Work — `RU-VEC-01`** → **Closing Unit Checkpoint — `RU-VEC-01`**
- [Major Geometry And Silhouettes](#ru-vec-02): **Opening Unit Checkpoint — `RU-VEC-02`** → **Unit Work — `RU-VEC-02`** → **Closing Unit Checkpoint — `RU-VEC-02`**
- [Internal Geometry And Overlaps](#ru-vec-03): **Opening Unit Checkpoint — `RU-VEC-03`** → **Unit Work — `RU-VEC-03`** → **Closing Unit Checkpoint — `RU-VEC-03`**
- [Fill Stroke And Appearance](#ru-vec-04): **Opening Unit Checkpoint — `RU-VEC-04`** → **Unit Work — `RU-VEC-04`** → **Closing Unit Checkpoint — `RU-VEC-04`**
- [Effects Clipping And Secondary Structure](#ru-vec-05): **Opening Unit Checkpoint — `RU-VEC-05`** → **Unit Work — `RU-VEC-05`** → **Closing Unit Checkpoint — `RU-VEC-05`**


## Preferred Workflow / Dependency Direction

```text
RU-VEC-01 → RU-VEC-02 → RU-VEC-03 → RU-VEC-04
                         ↘ RU-VEC-05 when material
→ meaningful whole candidate → Construction Review Loop
```


## Unit-specific Guidance

<a id="ru-vec-01"></a>
### Semantic Part Structure

`RU-VEC-01`

Decompose by meaningful edit/reuse boundaries rather than by arbitrary path count.
<a id="ru-vec-02"></a>
### Major Geometry And Silhouettes

`RU-VEC-02`

Prefer simple geometry that faithfully owns the accepted silhouette/form. Avoid topology complexity with no editability or fidelity value.
<a id="ru-vec-03"></a>
### Internal Geometry And Overlaps

`RU-VEC-03`

Own only internal/overlap geometry that materially affects the editable result.
<a id="ru-vec-04"></a>
### Fill Stroke And Appearance

`RU-VEC-04`

Implement accepted appearance direction with vector-native properties where economical.
<a id="ru-vec-05"></a>
### Effects Clipping And Secondary Structure

`RU-VEC-05`

Use only when masks/clips/effects or secondary structures have independent construction value; final geometry cleanup alone is not a separate responsibility.

## Lens Profile

[Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency) and [Representation / Editability Economy](../lenses/reusable/LENS-REPRESENTATION-EDITABILITY-ECONOMY.md#lens-representation-editability-economy) are frequent route Lenses. Unit/source need analysis stays with the shared Unit Need / Source Coverage Lens.

## Construction Review Loop

At meaningful whole-candidate milestones use [Construction Review Loop Checkpoint](../target-module-support/construction/CONSTRUCTION-REVIEW-LOOP.target-module-checkpoint.md#shared-construction-review-loop-checkpoint).

## Exact Realization

Route Unit Resolution may invoke Core Exact Realization through [Exact Realization Integration](../target-module-support/construction/EXACT-REALIZATION-INTEGRATION.target-module-guidance.md#shared-exact-realization-integration) when literal construction/modification is needed.

## Validators

semantic parts remain editable at useful boundaries; path geometry preserves accepted design; effects/masks do not obscure simpler ownership; target-size rasterization remains acceptable when raster output matters.

## Handoff

Accepted route result may become a Source for [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation), multi-route integration or other downstream work. Route findings return to the smallest correct upstream owner.

## Revalidation

Reopen when authoritative design/Source meaning changes, target representation constraints change, or Construction Review exposes a route-local defect or route mismatch.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-VEC-01
CONTENT_KIND: canonical vector construction source
WHEN: accepted route result must survive as editable authority
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: IMPLEMENTATION_NATIVE
FILE_OR_ARTIFACT: <canonical-vector-source>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)

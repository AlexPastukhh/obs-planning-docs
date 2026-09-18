<a id="tm-2d-31-painterly-raster-construction"></a>
# TM-2D-31-PAINTERLY-RASTER-CONSTRUCTION — Painterly Raster Construction

Entry Point: `tm.2d.construction.painterly-raster`  
Supported Roles: PRIMARY, SUPPORTING  
Status: active profile module

## Purpose

Construct the actual editable 2D result using this route while preserving accepted upstream visual meaning and exposing meaningful whole candidates for review.

## Target Step Result

`Painterly Raster Construction Result` = coherent projection/composition of accepted Current Result Content from the material Units.

## Candidate Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-PAINT-01` | [Whole-image Painterly Foundation](#ru-paint-01) | large-scale drawing/mass/value foundation that establishes the painterly whole |
| `RU-PAINT-02` | [Form And Focal Development](#ru-paint-02) | developed forms and focal areas at the fidelity required by the visual design |
| `RU-PAINT-03` | [Painterly Appearance And Edge System](#ru-paint-03) | actual color/light/material/brush/edge relationships that define the painterly appearance |
| `RU-PAINT-04` | [Selective Detail And Unification](#ru-paint-04) | selective detail and unification work that materially improves the accepted whole without becoming generic polish |


## Source Contract

Typical Sources: accepted [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), accepted [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design) when applicable, qualified visual material/Source bindings, current editable source on refinement/revalidation, and route-specific constraints.

## Unit Checkpoint Map

- [Whole-image Painterly Foundation](#ru-paint-01): **Opening Unit Checkpoint — `RU-PAINT-01`** → **Unit Work — `RU-PAINT-01`** → **Closing Unit Checkpoint — `RU-PAINT-01`**
- [Form And Focal Development](#ru-paint-02): **Opening Unit Checkpoint — `RU-PAINT-02`** → **Unit Work — `RU-PAINT-02`** → **Closing Unit Checkpoint — `RU-PAINT-02`**
- [Painterly Appearance And Edge System](#ru-paint-03): **Opening Unit Checkpoint — `RU-PAINT-03`** → **Unit Work — `RU-PAINT-03`** → **Closing Unit Checkpoint — `RU-PAINT-03`**
- [Selective Detail And Unification](#ru-paint-04): **Opening Unit Checkpoint — `RU-PAINT-04`** → **Unit Work — `RU-PAINT-04`** → **Closing Unit Checkpoint — `RU-PAINT-04`**


## Preferred Workflow / Dependency Direction

```text
RU-PAINT-01 → RU-PAINT-02 ↔ RU-PAINT-03 → RU-PAINT-04
→ meaningful whole candidate → Construction Review Loop
```


## Unit-specific Guidance

<a id="ru-paint-01"></a>
### Whole-image Painterly Foundation

`RU-PAINT-01`

Own the large-scale painterly foundation, not an obligatory layer scaffold.
<a id="ru-paint-02"></a>
### Form And Focal Development

`RU-PAINT-02`

Develop form and focal areas proportionally; non-focal regions may remain simplified when that supports the whole.
<a id="ru-paint-03"></a>
### Painterly Appearance And Edge System

`RU-PAINT-03`

Treat brush/edge/material/light/color as one painterly appearance system when they are inseparable in the chosen method.
<a id="ru-paint-04"></a>
### Selective Detail And Unification

`RU-PAINT-04`

Use only when selective detail/unification has a bounded result responsibility; do not create a catch-all `finish because last step` Unit.

## Lens Profile

[Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency) and [Whole Visual Coherence](../lenses/frequent/LENS-WHOLE-VISUAL-COHERENCE.md#lens-whole-visual-coherence) are frequent at painterly milestones.

## Construction Review Loop

At meaningful whole-candidate milestones use [Construction Review Loop Checkpoint](../shared/CONSTRUCTION-REVIEW-LOOP-CHECKPOINT.md#shared-construction-review-loop-checkpoint).

## Exact Realization

Route Unit Resolution may invoke Core Exact Realization through [Exact Realization Integration](../shared/EXACT-REALIZATION-INTEGRATION.md#shared-exact-realization-integration) when literal construction/modification is needed.

## Validators

large-scale image remains coherent under refinement; focal hierarchy is preserved; painterly edge/material/light treatment remains consistent with accepted direction; detail remains selective.

## Handoff

Accepted route result may become a Source for [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation), multi-route integration or other downstream work. Route findings return to the smallest correct upstream owner.

## Revalidation

Reopen when authoritative design/Source meaning changes, target representation constraints change, or Construction Review exposes a route-local defect or route mismatch.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-PAINT-01
CONTENT_KIND: canonical painterly raster source
WHEN: accepted painterly route result must survive as the editable/current construction authority
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: IMPLEMENTATION_NATIVE
FILE_OR_ARTIFACT: <canonical-painterly-source>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md)

<a id="tm-2d-31-pixel-art-construction"></a>
# TM-2D-31-PIXEL-ART-CONSTRUCTION — Native Pixel-grid Construction

Entry Point: `tm.2d.construction.pixel-art`  
Supported Roles: PRIMARY, SUPPORTING  
Status: active profile module

## Purpose

Construct the actual editable 2D result using this route while preserving accepted upstream visual meaning and exposing meaningful whole candidates for review.

## Target Step Result

`Editable Native Pixel Construction Result` = coherent projection/composition of accepted Current Result Content from the material Units.

## Candidate Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-PX-01` | [Pixel Abstraction](#ru-px-01) | target-grid abstraction: which identity/form/design cues survive and which detail is intentionally discarded |
| `RU-PX-02` | [Silhouette And Major Clusters](#ru-px-02) | actual target-grid silhouette, major masses, principal negative spaces and coarse proportions |
| `RU-PX-03` | [Color And Value Cluster System](#ru-px-03) | actual palette use, large value groups, contrast hierarchy and major color clusters |
| `RU-PX-04` | [Internal Form Clusters](#ru-px-04) | internal target-grid forms needed for readable identity/pose/articulation/object structure |
| `RU-PX-05` | [Edge Detail And Pixel Finish](#ru-px-05) | edge/outline behavior, selective small detail and pixel-level cleanup needed for the accepted result |


## Source Contract

Typical Sources: accepted [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), accepted [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design) when applicable, qualified visual material/Source bindings, current editable source on refinement/revalidation, and route-specific constraints.

## Unit Checkpoint Map

- [Pixel Abstraction](#ru-px-01): **Opening Unit Checkpoint — `RU-PX-01`** → **Unit Work — `RU-PX-01`** → **Closing Unit Checkpoint — `RU-PX-01`**
- [Silhouette And Major Clusters](#ru-px-02): **Opening Unit Checkpoint — `RU-PX-02`** → **Unit Work — `RU-PX-02`** → **Closing Unit Checkpoint — `RU-PX-02`**
- [Color And Value Cluster System](#ru-px-03): **Opening Unit Checkpoint — `RU-PX-03`** → **Unit Work — `RU-PX-03`** → **Closing Unit Checkpoint — `RU-PX-03`**
- [Internal Form Clusters](#ru-px-04): **Opening Unit Checkpoint — `RU-PX-04`** → **Unit Work — `RU-PX-04`** → **Closing Unit Checkpoint — `RU-PX-04`**
- [Edge Detail And Pixel Finish](#ru-px-05): **Opening Unit Checkpoint — `RU-PX-05`** → **Unit Work — `RU-PX-05`** → **Closing Unit Checkpoint — `RU-PX-05`**


## Preferred Workflow / Dependency Direction

```text
RU-PX-01 → RU-PX-02 → RU-PX-03 ↔ RU-PX-04 → RU-PX-05
→ meaningful whole candidate → Construction Review Loop
```


## Unit-specific Guidance

<a id="ru-px-01"></a>
### Pixel Abstraction

`RU-PX-01`

Use target grid, intended viewing scale and must-survive recognition cues. Existing accepted native-pixel Sources can make the responsibility nearly direct/source-derived.
<a id="ru-px-02"></a>
### Silhouette And Major Clusters

`RU-PX-02`

Work in major clusters before internal detail and inspect at target size. Route pose/composition failures upstream when they are not pixel-realization defects.
<a id="ru-px-03"></a>
### Color And Value Cluster System

`RU-PX-03`

Treat palette/contrast as cluster structure rather than high-resolution painting logic.
<a id="ru-px-04"></a>
### Internal Form Clusters

`RU-PX-04`

Add internal clusters by recognition/form importance. Missing form information should trigger Source preparation rather than unsupported invention when authority matters.
<a id="ru-px-05"></a>
### Edge Detail And Pixel Finish

`RU-PX-05`

Finish selectively: clean noise/tangents/edge artifacts while preserving deliberate pixel language.

## Lens Profile

[Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency) is a frequent route Lens. [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) handles Unit need, reference coverage and analysis-depth pressure.

## Construction Review Loop

At meaningful whole-candidate milestones use [Construction Review Loop Checkpoint](../shared/CONSTRUCTION-REVIEW-LOOP-CHECKPOINT.md#shared-construction-review-loop-checkpoint).

## Exact Realization

Route Unit Resolution may invoke Core Exact Realization through [Exact Realization Integration](../shared/EXACT-REALIZATION-INTEGRATION.md#shared-exact-realization-integration) when literal construction/modification is needed.

## Validators

target-grid readability and identity are preserved; palette/cluster structure is coherent; no high-resolution assumptions silently replace native-pixel construction; finish does not rewrite upstream design.

## Handoff

Accepted route result may become a Source for [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation), multi-route integration or other downstream work. Route findings return to the smallest correct upstream owner.

## Revalidation

Reopen when authoritative design/Source meaning changes, target representation constraints change, or Construction Review exposes a route-local defect or route mismatch.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-PX-01
CONTENT_KIND: canonical pixel construction source
WHEN: accepted route result must survive as editable authority
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: IMPLEMENTATION_NATIVE
FILE_OR_ARTIFACT: <canonical-pixel-source>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md)

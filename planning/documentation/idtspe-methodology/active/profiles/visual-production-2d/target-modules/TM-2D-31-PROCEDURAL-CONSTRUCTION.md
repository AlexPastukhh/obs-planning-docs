<a id="tm-2d-31-procedural-construction"></a>
# TM-2D-31-PROCEDURAL-CONSTRUCTION — Deterministic Procedural 2D Construction

Entry Point: `tm.2d.construction.procedural`  
Supported Roles: PRIMARY, SUPPORTING  
Status: active profile module

## Purpose

Construct the actual editable 2D result using this route while preserving accepted upstream visual meaning and exposing meaningful whole candidates for review.

## Target Step Result

`Deterministic Procedural Visual Construction Result` = coherent projection/composition of accepted Current Result Content from the material Units.

## Candidate Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-PROC-01` | [Parameter And Invariant Model](#ru-proc-01) | parameter surface and must-hold invariants controlling the generated visual family |
| `RU-PROC-02` | [Field And Pattern Structure](#ru-proc-02) | deterministic spatial/noise/pattern field structure that creates the primary visual organization |
| `RU-PROC-03` | [Region Mask And Composition Logic](#ru-proc-03) | region/mask/composition logic when explicit spatial ownership between procedural parts is useful |
| `RU-PROC-04` | [Appearance Mapping](#ru-proc-04) | mapping from procedural structure into color/value/material/edge appearance |
| `RU-PROC-05` | [Tileability And Variant Behavior](#ru-proc-05) | seam/periodicity/seed/variant behavior when a repeatable or variable family is required |


## Source Contract

Typical Sources: accepted [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), accepted [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design) when applicable, qualified visual material/Source bindings, current editable source on refinement/revalidation, and route-specific constraints.

## Unit Checkpoint Map

- [Parameter And Invariant Model](#ru-proc-01): **Opening Unit Checkpoint — `RU-PROC-01`** → **Unit Work — `RU-PROC-01`** → **Closing Unit Checkpoint — `RU-PROC-01`**
- [Field And Pattern Structure](#ru-proc-02): **Opening Unit Checkpoint — `RU-PROC-02`** → **Unit Work — `RU-PROC-02`** → **Closing Unit Checkpoint — `RU-PROC-02`**
- [Region Mask And Composition Logic](#ru-proc-03): **Opening Unit Checkpoint — `RU-PROC-03`** → **Unit Work — `RU-PROC-03`** → **Closing Unit Checkpoint — `RU-PROC-03`**
- [Appearance Mapping](#ru-proc-04): **Opening Unit Checkpoint — `RU-PROC-04`** → **Unit Work — `RU-PROC-04`** → **Closing Unit Checkpoint — `RU-PROC-04`**
- [Tileability And Variant Behavior](#ru-proc-05): **Opening Unit Checkpoint — `RU-PROC-05`** → **Unit Work — `RU-PROC-05`** → **Closing Unit Checkpoint — `RU-PROC-05`**


## Preferred Workflow / Dependency Direction

```text
RU-PROC-01 → RU-PROC-02 → RU-PROC-03? → RU-PROC-04
                              ↘ RU-PROC-05 when material
→ representative outputs → Construction Review Loop
```


## Unit-specific Guidance

<a id="ru-proc-01"></a>
### Parameter And Invariant Model

`RU-PROC-01`

Keep parameters meaningful and bounded; encode invariants explicitly when they must survive variants.
<a id="ru-proc-02"></a>
### Field And Pattern Structure

`RU-PROC-02`

Own the generative field/pattern relationships, not incidental code organization.
<a id="ru-proc-03"></a>
### Region Mask And Composition Logic

`RU-PROC-03`

Use only when explicit regions/masks/composition logic have independent semantic value; direct field-to-appearance mapping may make it unnecessary.
<a id="ru-proc-04"></a>
### Appearance Mapping

`RU-PROC-04`

Own the deterministic appearance mapping from procedural structure.
<a id="ru-proc-05"></a>
### Tileability And Variant Behavior

`RU-PROC-05`

Use for actual seam/periodicity/seed/variant behavior, not merely for a one-off preview.

## Lens Profile

[Representation / Editability Economy](../lenses/reusable/LENS-REPRESENTATION-EDITABILITY-ECONOMY.md#lens-representation-editability-economy) and [Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency) are frequent. Representative-output coherence may also trigger [Whole Visual Coherence](../lenses/frequent/LENS-WHOLE-VISUAL-COHERENCE.md#lens-whole-visual-coherence).

## Construction Review Loop

At meaningful whole-candidate milestones use [Construction Review Loop Checkpoint](../shared/CONSTRUCTION-REVIEW-LOOP-CHECKPOINT.md#shared-construction-review-loop-checkpoint).

## Exact Realization

Route Unit Resolution may invoke Core Exact Realization through [Exact Realization Integration](../shared/EXACT-REALIZATION-INTEGRATION.md#shared-exact-realization-integration) when literal construction/modification is needed.

## Validators

generator is deterministic under declared parameters/seeds; invariants survive required variants; appearance maps coherently from procedural structure; tileability/variant claims are actually evidenced when selected.

## Handoff

Accepted route result may become a Source for [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation), multi-route integration or other downstream work. Route findings return to the smallest correct upstream owner.

## Revalidation

Reopen when authoritative design/Source meaning changes, target representation constraints change, or Construction Review exposes a route-local defect or route mismatch.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-PROC-01
CONTENT_KIND: canonical procedural source / generator
WHEN: accepted route result must survive as editable/parameterized authority
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: IMPLEMENTATION_NATIVE
FILE_OR_ARTIFACT: <canonical-procedural-source>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md)

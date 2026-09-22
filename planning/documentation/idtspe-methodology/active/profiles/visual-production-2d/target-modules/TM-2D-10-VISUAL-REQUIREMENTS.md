<a id="tm-2d-10-visual-requirements"></a>
# TM-2D-10-VISUAL-REQUIREMENTS — Visual Outcome / Requirement Owner

Entry Point: `tm.2d.visual-requirements`
Supported Roles: PRIMARY, SUPPORTING
Status: active profile module

## Purpose

Own the bounded meaning of what a 2D visual result must accomplish before design/construction decides how to realize it.

## Target Step Result

`Visual Requirements`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-REQ-01` | [Outcome And Use](#ru-req-01) | intended practical use/context and principal visual outcome |
| `RU-REQ-02` | [Requirements And Success](#ru-req-02) | must-holds, communication/viewer-effect requirements, constraints and success meaning |
| `RU-REQ-03` | [Preserve / Change Goals](#ru-req-03) | what prior/current visual meaning must be preserved, changed or newly created when existing visual state matters |


## Source Contract

Typical accepted inputs: user/project intent, delivery context, current visual state, product/game constraints and authoritative upstream requirement Sources. Detailed visual-design choices and construction mechanics are downstream.

## Unit Checkpoint Map

- [Outcome And Use](#ru-req-01): **Opening Unit Checkpoint — `RU-REQ-01`** → **Unit Work — `RU-REQ-01`** → **Closing Unit Checkpoint — `RU-REQ-01`**
- [Requirements And Success](#ru-req-02): **Opening Unit Checkpoint — `RU-REQ-02`** → **Unit Work — `RU-REQ-02`** → **Closing Unit Checkpoint — `RU-REQ-02`**
- [Preserve / Change Goals](#ru-req-03): **Opening Unit Checkpoint — `RU-REQ-03`** → **Unit Work — `RU-REQ-03`** → **Closing Unit Checkpoint — `RU-REQ-03`**


## Preferred Workflow / Dependency Direction

```text
RU-REQ-01 ↔ RU-REQ-02
       ↘ RU-REQ-03 when prior/current visual state matters
```


## Unit-specific Guidance

<a id="ru-req-01"></a>
### Outcome And Use

`RU-REQ-01`

Keep exact design/construction choices downstream. Useful local prompts concern intended use, principal result and where/how the visual will be consumed.
<a id="ru-req-02"></a>
### Requirements And Success

`RU-REQ-02`

May cover communication, intended impression, technical constraints, must-presence/must-avoid and success checks. Keep the result normative rather than turning it into a design.
<a id="ru-req-03"></a>
### Preserve / Change Goals

`RU-REQ-03`

A compact `preserve / change / create` view is often sufficient. Do not duplicate detailed Source qualification here.

## Lens Profile

Use Core required Lenses. The profile Unit Need / Source Coverage Lens is reached through the shared checkpoints. No additional profile Lens is mandatory by this module.

## Validators

Requirements stay outcome-level; no construction method is frozen; preserve/change meaning does not duplicate Source qualification; must-holds are traceable to accepted Sources or user selection where material.

## Handoff

Accepted Visual Requirements may become Sources for Material Preparation, [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design), construction and [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation).

## Revalidation

Reopen when intended use, success meaning, requested change, constraints or authoritative upstream requirement Sources materially change.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-REQ-01
CONTENT_KIND: accepted visual requirements
WHEN: accepted requirement meaning must survive for downstream visual work
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: EMBED_CURRENT_OWNER or EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <visual-requirements-owner>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)

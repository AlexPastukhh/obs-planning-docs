<a id="tm-2d-30-visual-construction"></a>
# TM-2D-30-VISUAL-CONSTRUCTION — Material Multi-route Construction Composition

Module ID: `TM-2D-30-VISUAL-CONSTRUCTION`

Entry Point: `tm.2d.visual-construction`
Supported Roles: PRIMARY, COMPOSITION
Status: active profile module

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Own construction composition/integration only when combining multiple accepted construction routes requires independently useful semantic decisions rather than mechanical aggregation.

## Target Step Result

`Integrated Visual Construction`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-VC-01` | [Route Composition](#ru-vc-01) | selected relationship/order/ownership of multiple construction routes when the composition itself is a material decision |
| `RU-VC-02` | [Cross-route Integration](#ru-vc-02) | actual visual integration meaning that belongs to no single route, such as cross-route occlusion/color/edge/layout relationships |


## Source Contract

Typical Sources: accepted outputs from selected concrete construction route Targets, [Whole Visual Design](TM-2D-20-WHOLE-VISUAL-DESIGN.md#tm-2d-20-whole-visual-design), [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements) and integration-specific visual Sources.

## Unit Checkpoint Map

- [Route Composition](#ru-vc-01): **Opening Unit Checkpoint — `RU-VC-01`** → **Unit Work — `RU-VC-01`** → **Closing Unit Checkpoint — `RU-VC-01`**
- [Cross-route Integration](#ru-vc-02): **Opening Unit Checkpoint — `RU-VC-02`** → **Unit Work — `RU-VC-02`** → **Closing Unit Checkpoint — `RU-VC-02`**


## Formation / Scope Guard

Do not form this Target for ordinary single-route work. Select a concrete route from [2D Visual Production Target Modules](README.md#profile-target-modules) directly as PRIMARY. If several accepted route outputs combine mechanically with no material new decision, pass them downstream as Sources instead of creating this Target.

## Preferred Workflow / Dependency Direction

```text
accepted route results
→ RU-VC-01 when composition meaning is material
→ RU-VC-02 when integrated visual ownership is material
→ Construction Review Loop
```


## Unit-specific Guidance

<a id="ru-vc-01"></a>
### Route Composition

`RU-VC-01`

Use only when the combination has a real decision/result beyond `use A then B`. Mechanical aggregation belongs in handoff/source packaging, not a composition Target.
<a id="ru-vc-02"></a>
### Cross-route Integration

`RU-VC-02`

Own only relationships that cannot naturally remain with one route owner. Do not copy route-local geometry/appearance authority into the integration Unit.

## Lens Profile

Primary profile Lens for route architecture: [Representation / Editability Economy](../lenses/reusable/LENS-REPRESENTATION-EDITABILITY-ECONOMY.md#lens-representation-editability-economy). Conditional whole-candidate Lenses: [Construction Fidelity / Consistency](../lenses/frequent/LENS-CONSTRUCTION-FIDELITY-CONSISTENCY.md#lens-construction-fidelity-consistency), [Whole Visual Coherence](../lenses/frequent/LENS-WHOLE-VISUAL-COHERENCE.md#lens-whole-visual-coherence).

## Construction Review Loop

At meaningful integrated-candidate milestones use [Construction Review Loop Checkpoint](../target-module-support/construction/CONSTRUCTION-REVIEW-LOOP.target-module-checkpoint.md#shared-construction-review-loop-checkpoint).

## Validators

A composition Target exists only for material composition meaning; route outputs retain their own authority; cross-route integration does not duplicate route-local ownership.

## Handoff

Accepted integrated result may feed [Delivery Adaptation](TM-2D-50-DELIVERY-ADAPTATION.md#tm-2d-50-delivery-adaptation) or downstream consumers. Route-local corrections return to the owning route Target.

## Revalidation

Reopen when route outputs change materially, integration Evidence exposes a route-local vs integration ownership error, or the chosen route composition becomes unnecessarily complex.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-VC-01
CONTENT_KIND: accepted integrated multi-route visual source
WHEN: material cross-route construction composition/integration must survive as an editable result
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: IMPLEMENTATION_NATIVE
FILE_OR_ARTIFACT: <integrated-editable-source>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)

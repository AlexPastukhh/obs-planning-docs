<a id="tm-2d-20-whole-visual-design"></a>
# TM-2D-20-WHOLE-VISUAL-DESIGN — Coherent Whole Visual Solution

Module ID: `TM-2D-20-WHOLE-VISUAL-DESIGN`

Entry Point: `tm.2d.whole-visual-design`
Supported Roles: PRIMARY
Status: active profile module

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Own the coherent whole-image visual solution/direction that satisfies accepted requirements before exact construction owns paths, pixels, layers or procedural implementation.

## Target Step Result

`Whole Visual Design`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-WVD-01` | [Content And Subject Configuration](#ru-wvd-01) | what is depicted and the meaningful subject/object/environment relationships or states |
| `RU-WVD-02` | [Composition And Attention Structure](#ru-wvd-02) | global framing, placement, hierarchy, depth/attention/focal relationships and meaningful negative-space/text-region intent |
| `RU-WVD-03` | [Global Visual Language](#ru-wvd-03) | whole-result shape/style/value/color/light/edge/material/atmosphere direction at design level |


## Source Contract

Typical Sources: accepted [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements), qualified visual materials, existing/current design Sources, product/game art direction and user-selected design Decisions. Exact construction source is downstream.

## Unit Checkpoint Map

- [Content And Subject Configuration](#ru-wvd-01): **Opening Unit Checkpoint — `RU-WVD-01`** → **Unit Work — `RU-WVD-01`** → **Closing Unit Checkpoint — `RU-WVD-01`**
- [Composition And Attention Structure](#ru-wvd-02): **Opening Unit Checkpoint — `RU-WVD-02`** → **Unit Work — `RU-WVD-02`** → **Closing Unit Checkpoint — `RU-WVD-02`**
- [Global Visual Language](#ru-wvd-03): **Opening Unit Checkpoint — `RU-WVD-03`** → **Unit Work — `RU-WVD-03`** → **Closing Unit Checkpoint — `RU-WVD-03`**


## Preferred Workflow / Dependency Direction

```text
RU-WVD-01 ↔ RU-WVD-02 ↔ RU-WVD-03
→ coherent whole-design candidate
→ whole-result Lens evaluation
```


## Unit-specific Guidance

<a id="ru-wvd-01"></a>
### Content And Subject Configuration

`RU-WVD-01`

Own the selected visual configuration, not requirement wording and not exact path/pixel geometry.
<a id="ru-wvd-02"></a>
### Composition And Attention Structure

`RU-WVD-02`

Own global visual relationships such as framing/hierarchy/attention/depth. If an accepted reference already fixes them, this responsibility may resolve very lightly when still worth explicit ownership.
<a id="ru-wvd-03"></a>
### Global Visual Language

`RU-WVD-03`

Own overall visual direction, not exact RGB values, local brushwork or final texture implementation.

## Lens Profile

Primary conditional profile Lens: [Whole Visual Coherence](../lenses/frequent/LENS-WHOLE-VISUAL-COHERENCE.md#lens-whole-visual-coherence) across the composed candidate. [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) evaluates Unit materiality/depth and Source sufficiency.

## Validators

The combined design satisfies accepted requirements; no Unit steals exact construction ownership; content/composition/visual-language results are mutually coherent; inherited Source-covered meaning is not needlessly reinvented.

## Handoff

Accepted Whole Visual Design becomes an upstream Source for selected construction route Targets and may be re-entered by construction review when the problem is genuinely design-level.

## Revalidation

Reopen when [Visual Requirements](TM-2D-10-VISUAL-REQUIREMENTS.md#tm-2d-10-visual-requirements) change, authoritative visual Sources change, or construction Evidence shows the accepted whole-design meaning itself is deficient.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-WVD-01
CONTENT_KIND: accepted whole visual design
WHEN: whole-design meaning must survive for construction/review
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: EMBED_CURRENT_OWNER or EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <whole-visual-design-owner>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)

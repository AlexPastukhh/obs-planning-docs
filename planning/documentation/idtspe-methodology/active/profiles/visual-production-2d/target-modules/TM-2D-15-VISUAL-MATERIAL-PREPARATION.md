<a id="tm-2d-15-visual-material-preparation"></a>
# TM-2D-15-VISUAL-MATERIAL-PREPARATION — Qualified Visual Material Preparation

Entry Point: `tm.2d.visual-material-preparation`  
Supported Roles: PRIMARY, SUPPORTING  
Status: active profile module

## Purpose

Prepare, qualify and where useful transform visual material so downstream visual responsibilities can consume trustworthy Source Subjects without duplicating consumer-side authority.

## Target Step Result

`Prepared Visual Material Set`. Generic Unit existence/disposition semantics follow the Core [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md); this module owns only the visual Unit responsibilities/materiality below.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-MAT-01` | [Coverage And Information Gaps](#ru-mat-01) | responsibility-relative map of what visual information is already covered, partial, conflicting or missing |
| `RU-MAT-02` | [Qualified Visual Material Set](#ru-mat-02) | selected material identities with intrinsic provenance, derivation, observability and limitations |
| `RU-MAT-03` | [Prepared Visual Material](#ru-mat-03) | material transformations/helpers that make needed information practically usable |


## Source Contract

Typical inputs: external/project visual material, upstream-produced artifacts, current visual-information needs, existing material registry, accepted user/project Sources. Consumer-specific Source role/authority/requiredness remains on downstream Source State Units.

## Unit Checkpoint Map

- [Coverage And Information Gaps](#ru-mat-01): **Opening Unit Checkpoint — `RU-MAT-01`** → **Unit Work — `RU-MAT-01`** → **Closing Unit Checkpoint — `RU-MAT-01`**
- [Qualified Visual Material Set](#ru-mat-02): **Opening Unit Checkpoint — `RU-MAT-02`** → **Unit Work — `RU-MAT-02`** → **Closing Unit Checkpoint — `RU-MAT-02`**
- [Prepared Visual Material](#ru-mat-03): **Opening Unit Checkpoint — `RU-MAT-03`** → **Unit Work — `RU-MAT-03`** → **Closing Unit Checkpoint — `RU-MAT-03`**


## Preferred Workflow / Dependency Direction

```text
RU-MAT-01 ↔ RU-MAT-02
       ↓ when transformation/helper work is useful
RU-MAT-03
↺ new gaps may re-enter RU-MAT-01
```


## Unit-specific Guidance

<a id="ru-mat-01"></a>
### Coverage And Information Gaps

`RU-MAT-01`

Describe coverage relative to concrete visual responsibilities such as identity, form, pose, composition, camera, style, value/color, lighting, material, typography or construction detail. Avoid a global `reference is complete` label.
<a id="ru-mat-02"></a>
### Qualified Visual Material Set

`RU-MAT-02`

Own intrinsic facts: origin/provenance, observed vs derived/synthetic status, what the material actually shows, derivation lineage and known limitations. Do not assign universal consumer authority.
<a id="ru-mat-03"></a>
### Prepared Visual Material

`RU-MAT-03`

May include crop/normalize/annotate/measure/extract/transform/helper render/proxy/synthetic helper work. Keep the original Source Subject and the prepared derivative distinguishable.

## Lens Profile

Primary profile Lens: [Unit Need / Visual Source Coverage](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage). Compose with Core Authority/SOT and Uncertainty Lenses when provenance or inference pressure is material.

## Storage / Registry

Use [Visual Material Storage And Registry](../shared/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry). Physical folders are representation guidance resolved by P-14; semantic material ownership does not follow folder placement.

## Validators

Qualified material does not duplicate consumer Source State authority; derived/synthetic helpers remain distinguishable; material gaps are responsibility-relative; prepared artifacts retain traceable lineage where material.

## Handoff

Accepted material/registry entries may be bound by downstream Targets/Units through their own Source State Units. Produced artifacts owned by other Targets are referenced rather than copied merely because they are useful visually.

## Revalidation

Reopen when required visual information changes, stronger/conflicting material appears, derivation becomes stale, or downstream review exposes an uncovered responsibility.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-MAT-01
CONTENT_KIND: retained visual material registry / prepared material set
WHEN: provenance, reuse or revalidation value makes the prepared material set worth retaining
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target using this module
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <visual-material-registry-or-owner>
CONTENT: accepted Target Step Result / implementation-native result owned by this Target, with references to authoritative upstream owners/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## References

- [Core Target Module Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/target-module-model.md)
- [Core Unit And Target Step Result Model](https://github.com/AlexPastukhh/obs-planning-docs/blob/main/planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md)

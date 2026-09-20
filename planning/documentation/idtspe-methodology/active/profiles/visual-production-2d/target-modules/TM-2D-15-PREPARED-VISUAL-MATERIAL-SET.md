<a id="tm-2d-15-prepared-visual-material-set"></a>
# TM-2D-15-PREPARED-VISUAL-MATERIAL-SET — Prepared Visual Material Set

Entry Point: `tm.2d.prepared-visual-material-set`
Supported Roles: PRIMARY, SUPPORTING
Status: active profile module, conditional formation

## Formation Gate

Form this Target Module only when a **Prepared Visual Material Set is itself an independently useful Target Result** with reuse, handoff, retention or revalidation value beyond one current Unit's immediate analysis.

Ordinary reference acquisition, crop, annotation, measurement, normalization, extraction, conversion, helper render/proxy work or similar bounded transformation does **not** instantiate this Target Module. Use the [Visual Material Preparation Operation](../operations/VISUAL-MATERIAL-PREPARATION.operation.md#visual-material-preparation-operation) from the current Unit instead.

Unit-relative need/coverage/gaps/conflicts and contextual interpretation are evaluated by [LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE](../lenses/frequent/LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE.md#lens-visual-unit-need-and-source-coverage) and remain semantically owned by the current Target/Unit.

## Purpose

Establish a reusable, qualified and prepared visual-material set whose membership, preparation lineage and retained limitations are useful as a bounded Target Result for one or more consumers.

## Target Step Result

`Prepared Visual Material Set`.

## Module-defined Unit Inventory

| Unit | Name | Bounded result responsibility |
|---|---|---|
| `RU-MAT-01` | [Set Purpose And Reuse Boundary](#ru-mat-01) | independently useful purpose, intended reuse/handoff and bounded membership criteria for this prepared set |
| `RU-MAT-02` | [Qualified Material Membership](#ru-mat-02) | retained material identities with intrinsic provenance, derivation, observability and limitations |
| `RU-MAT-03` | [Prepared Material Variants](#ru-mat-03) | retained prepared derivatives/helpers with traceable lineage and practical usability for the set's declared purpose |

## Source Contract

Typical inputs are external/project visual material, upstream-produced artifacts, an already-established reusable material-set need, existing material registry records and accepted project Sources. Per-consumer Source role/authority/requiredness/freshness remains on each consuming Source binding.

## Unit-specific Guidance

<a id="ru-mat-01"></a>
### Set Purpose And Reuse Boundary

`RU-MAT-01`

State why a separate Prepared Visual Material Set has independent value, who/what may consume it, what belongs in the set, and what remains current-Target/Unit-local analysis. Do not use this Unit as a generic coverage/gap analysis surface.

<a id="ru-mat-02"></a>
### Qualified Material Membership

`RU-MAT-02`

Own intrinsic retained facts: material identity/locator, origin/provenance, observed vs derived/synthetic status, derivation lineage, what the material directly shows and known intrinsic limitations/conflicts. Do not assign universal consumer authority.

<a id="ru-mat-03"></a>
### Prepared Material Variants

`RU-MAT-03`

Retain only prepared derivatives/helpers that belong to this independently useful set. Bounded transformation mechanics are supplied by the [Visual Material Preparation Operation](../operations/VISUAL-MATERIAL-PREPARATION.operation.md#visual-material-preparation-operation); this Unit owns the accepted retained set result, not the mechanics themselves.

## Workflow / Dependency Direction

```text
independent Prepared Visual Material Set need
→ define purpose / reuse boundary
→ qualify retained membership
→ invoke preparation Operation where needed
→ retain accepted prepared variants with lineage
→ hand off by reference to consumers
```

Consumer-specific coverage/analysis happens at the consuming Unit and may re-enter preparation without reopening this Target unless the reusable set itself must change.

## Storage / Registry

Use [Visual Material Storage And Registry](../representation/VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry). Physical placement does not transfer semantic authority from producer Targets or consuming Units.

## Validators

- independent Target value exists beyond one Unit's transient preparation need;
- retained membership has traceable provenance/lineage where material;
- synthetic/derived helpers remain distinguishable;
- consumer-specific Source authority/role/requiredness is not stored as global material truth;
- target-local reference interpretation is not moved into this reusable set merely for convenience.

## Handoff

Consumers bind retained material or producer-owned artifacts through their own Source State. The set may improve discovery/reuse without becoming authority for every consumer responsibility.

## Revalidation

Reopen when the set's declared reusable purpose, membership, provenance/lineage, retained preparation or known limitations materially change.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-2D-MAT-01
CONTENT_KIND: reusable Prepared Visual Material Set / retained visual-material registry
WHEN: the set has independent reuse, handoff, provenance or revalidation value
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current TM-2D-15 Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <visual-material-registry-or-owner>
CONTENT: accepted Prepared Visual Material Set, with references to producer-owned artifacts/Sources rather than copied authority
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## References

- [Core Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md)
- [Core Unit And Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md)
- [Visual Material And Source Usage](../source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#shared-visual-material-and-source-usage)
- [Target-local Material Analysis Representation Guidance](../representation/VISUAL-TARGET-LOCAL-MATERIAL-ANALYSIS.representation-guidance.md#visual-target-local-material-analysis-representation-guidance)

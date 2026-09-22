<a id="visual-target-local-material-analysis-representation-guidance"></a>
# Visual Target-local Material Analysis — Representation Guidance

Responsibility ID: `VISUAL2D.TARGET-LOCAL-MATERIAL-ANALYSIS`

Status: active representation guidance
Primary consumer: the current Target/Unit that already owns contextual material/reference analysis

> Semantic Owner Dependencies
> - `EXTENDS` [Core Artifact Placement](../../../idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) — `REPRESENTATION.ARTIFACT-PLACEMENT`

## Boundary

This file owns **representation choice only**. It does not create a new analysis lifecycle, state kind or semantic owner. Unit-relative interpretation of references/materials remains owned by the current Target/Unit; the Source-Coverage Lens supplies reusable evaluation method.

## Proportional Representation

```text
small analysis
→ embed in the current Unit

coherent multi-source analysis
→ one aggregate companion analysis artifact

large / independently addressable per-reference analysis
→ one companion per material/reference

mixed case
→ per-reference records + comparative aggregate
```

Choose the smallest representation that preserves reviewability, addressability and revalidation value.

## Content Boundary

Target-local analysis may record, as useful:

- what a material/reference contributes to the current Unit responsibility;
- responsibility-relative strong/partial/conflicting/missing coverage;
- contextual inference/limitations;
- comparisons among materials for this Target/Unit;
- recheck triggers tied to this owner.

Do not move per-consumer role/authority/requiredness/freshness into the global material registry. Do not duplicate intrinsic provenance/qualification already owned by [Visual Material And Source Usage](../source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#shared-visual-material-and-source-usage) / [Visual Material Storage And Registry](VISUAL-MATERIAL-STORAGE-AND-REGISTRY.md#shared-visual-material-storage-and-registry).

## Placement

Physical placement follows the current Target's representation/materialization decision. A companion artifact may sit near its owner for discoverability, but proximity does not transfer semantic authority.

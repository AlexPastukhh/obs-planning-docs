<a id="reference-knowledge-lens-registry"></a>
# Reference Knowledge Lens Registry

Responsibility ID: `RK.LENS-DISCOVERY`

Registry rows are routing metadata only. Selection does not execute a Lens or force a Finding.

| Lens | Stable ID | Activation | Applicability summary |
|---|---|---|---|
| [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication) | `LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION` | FREQUENT_CONDITIONAL | new/ambiguous/duplicate/over-broad/obsolete Entry record |
| [Tag Quality / Taxonomy](../lenses/LENS-RK-TAG-QUALITY-AND-TAXONOMY.md#lens-rk-tag-quality-and-taxonomy) | `LENS-RK-TAG-QUALITY-AND-TAXONOMY` | FREQUENT_CONDITIONAL | canonical Tag creation/refactor/parenting |
| [Landscape Evidence Adequacy](../lenses/LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY.md#lens-rk-landscape-evidence-adequacy) | `LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY` | FREQUENT_CONDITIONAL | Landscape/evolution/distribution/lineage/causal interpretation claims |

Unit applicability/materiality is owned by IDTSPE Core and does not need a Reference-Knowledge-specific Lens.

A future Domain Pack may reference an existing registered Lens or motivate derivation of a new reusable Lens. Domain Pack existence does not itself create a Lens.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Lens Meta-Model](../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`


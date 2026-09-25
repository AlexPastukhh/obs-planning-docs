<a id="reference-knowledge-lens-registry"></a>
# Reference Knowledge Lens Registry

Responsibility ID: `RK.LENS-DISCOVERY`

Registry rows are routing metadata only. Selection does not execute a Lens, force a Finding or create Unit attachment.

The Core Lens Registry is the normal universal entry point. When Reference Knowledge is active, this registry adds profile-owned candidates. Inherited/generic Core Lens remain available and are not replaced.

| Lens | Stable ID | Discovery / applicability summary |
|---|---|---|
| [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication) | `LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION` | new/ambiguous/duplicate/over-broad/obsolete Entry record |
| [Tag Quality / Taxonomy](../lenses/LENS-RK-TAG-QUALITY-AND-TAXONOMY.md#lens-rk-tag-quality-and-taxonomy) | `LENS-RK-TAG-QUALITY-AND-TAXONOMY` | canonical Tag creation/refactor/parenting |
| [Landscape Evidence Adequacy](../lenses/LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY.md#lens-rk-landscape-evidence-adequacy) | `LENS-RK-LANDSCAPE-EVIDENCE-ADEQUACY` | Landscape/evolution/distribution/lineage/causal interpretation claims |

Unit applicability/materiality is owned by IDTSPE Core and does not need a Reference-Knowledge-specific Lens.

A future Domain Pack may reference an existing registered Lens or motivate derivation of a new reusable Lens. Domain Pack existence does not itself create a Lens.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Lens Meta-Model](../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`


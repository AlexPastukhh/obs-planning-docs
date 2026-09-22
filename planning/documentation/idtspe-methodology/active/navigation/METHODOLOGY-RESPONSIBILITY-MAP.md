# IDTSPE Methodology Responsibility Map

Status: active cross-cutting responsibility routing map

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../principles-and-terminology.md#doc-responsibility-map)

This file maps important IDTSPE/Core/profile responsibilities to their **current canonical semantic owner**. It owns routing/navigation only. Open the destination owner for the complete contract; do not treat this map as a duplicate semantic Source of Truth.

Generic Documentation semantics for a `Responsibility Map` are owned by [`../../principles-and-terminology.md`](../../../principles-and-terminology.md).

| Responsibility | Current canonical owner | Important projection / supporting owner |
|---|---|---|
| Documentation semantic roles (`README`, Use Case, Responsibility Map, etc.) | [`../../principles-and-terminology.md`](../../../principles-and-terminology.md) | Concrete responsibility maps own routing rows only; destination owners own semantic bodies |
| Target Work / Target Formation / Target Instance / Source-Relation / Target Work subject-reference ownership | [`idtspe-core/runtime/target-work/RESPONSIBILITY-MAP.md`](../idtspe-core/runtime/target-work/RESPONSIBILITY-MAP.md) | child map routes to the Unit, Formation, Reference and Target/Source owners without copying them |
| Target Module Meta-Model / discovery / compatibility projection / concrete Module owner routing | [`idtspe-core/target-modules/RESPONSIBILITY-MAP.md`](../idtspe-core/target-modules/RESPONSIBILITY-MAP.md) | child map separates Meta-Model, Registry and concrete `TM-*` responsibilities |
| Need / Finding / Q/R/P / Proposal / Decision / Branch / Decision-revalidation / Carry-Forward resolution ownership | [`idtspe-core/resolution/RESPONSIBILITY-MAP.md`](../idtspe-core/resolution/RESPONSIBILITY-MAP.md) | child map routes lifecycle/projection responsibilities; destination owners keep semantic bodies |
| Runtime / Work Context / Core State / proportional-application / trace / USER-intake routing | [`idtspe-core/runtime/RESPONSIBILITY-MAP.md`](../idtspe-core/runtime/RESPONSIBILITY-MAP.md) | child map separates technical composition, Core State, Methodology Usage State, trace, contextual application and intake responsibilities |
| Core Lens Meta-Model / discovery / concrete Lens owner routing | [`idtspe-core/lenses/RESPONSIBILITY-MAP.md`](../idtspe-core/lenses/RESPONSIBILITY-MAP.md) | child map separates Meta-Model, Registry and concrete Lens operational contracts |
| Knowledge Basis / reusable theory / Source-Evidence boundary routing | [`idtspe-core/knowledge-bases/RESPONSIBILITY-MAP.md`](../idtspe-core/knowledge-bases/RESPONSIBILITY-MAP.md) | Source binding stays Target/Source-owned; generic Evidence state stays in Core State boundary |
| Representation / persistence / artifact placement / checkpoint projection / file-realization routing | [`idtspe-core/representation/RESPONSIBILITY-MAP.md`](../idtspe-core/representation/RESPONSIBILITY-MAP.md) | profile placement maps extend Core and do not become semantic owners |
| IDTSPE Use-Case discovery and runtime/maintenance orchestration | [`idtspe-core/use-cases/RESPONSIBILITY-MAP.md`](../idtspe-core/use-cases/RESPONSIBILITY-MAP.md) | child map separates Use-Case routing from component semantic ownership |
| SDS Evolution Step future-state owner / Evolution Impact / materialization | [`profiles/sds/target-modules/TM-EVOLUTION-STEP.md`](../profiles/sds/target-modules/TM-EVOLUTION-STEP.md) | [`profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md`](../profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md) owns registry/readiness coordination only |
| SDS Target Module discovery | [`profiles/sds/registries/TARGET-MODULE-REGISTRY.md`](../profiles/sds/registries/TARGET-MODULE-REGISTRY.md) | concrete Target Module file owns specialized Target production contract |
| 2D Visual Production Target/Lens discovery | [`profiles/visual-production-2d/README.md`](../profiles/visual-production-2d/README.md) | [`profiles/visual-production-2d/registries/TARGET-MODULE-REGISTRY.md`](../profiles/visual-production-2d/registries/TARGET-MODULE-REGISTRY.md), [`profiles/visual-production-2d/registries/LENS-REGISTRY.md`](../profiles/visual-production-2d/registries/LENS-REGISTRY.md) |
| Reference Knowledge Bank/Entry/Vocabulary/Landscape methodology discovery | [`profiles/reference-knowledge/README.md`](../profiles/reference-knowledge/README.md) | [`profiles/reference-knowledge/registries/TARGET-MODULE-REGISTRY.md`](../profiles/reference-knowledge/registries/TARGET-MODULE-REGISTRY.md), [`profiles/reference-knowledge/registries/LENS-REGISTRY.md`](../profiles/reference-knowledge/registries/LENS-REGISTRY.md), [`profiles/reference-knowledge/registries/DOMAIN-PACK-REGISTRY.md`](../profiles/reference-knowledge/registries/DOMAIN-PACK-REGISTRY.md) |

## Guards

```text
Responsibility Map row ≠ copied semantic contract
projection/supporting owner ≠ canonical owner
README structural navigation ≠ cross-cutting responsibility ownership
Use-Case Registry routing ≠ Responsibility Map routing
repository path/name ≠ semantic authority by itself
```

When a responsibility moves, update the canonical owner first, then this routing projection and its semantic-parity checks.

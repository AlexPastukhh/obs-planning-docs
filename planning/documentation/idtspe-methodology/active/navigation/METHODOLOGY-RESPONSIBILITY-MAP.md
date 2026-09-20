# IDTSPE Methodology Responsibility Map

Status: active cross-cutting responsibility routing map

This file maps important IDTSPE/Core/profile responsibilities to their **current canonical semantic owner**. It owns routing/navigation only. Open the destination owner for the complete contract; do not treat this map as a duplicate semantic Source of Truth.

Generic Documentation semantics for a `Responsibility Map` are owned by [`../../principles-and-terminology.md`](../../../principles-and-terminology.md).

| Responsibility | Current canonical owner | Important projection / supporting owner |
|---|---|---|
| Documentation semantic roles (`README`, Use Case, Responsibility Map, etc.) | [`../../principles-and-terminology.md`](../../../principles-and-terminology.md) | Concrete responsibility maps own routing rows only; destination owners own semantic bodies |
| Target Work Unit mechanics; Core State Unit relation; Target Step Result vs IDTSPE Step Output | [`idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md) | [`idtspe-core/navigation/IDTSPE-CORE-MAP.md`](../idtspe-core/navigation/IDTSPE-CORE-MAP.md), [`idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](../idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md) |
| Target Instance composition; Source Subject / Source State Unit; Source vs Target Relation | [`idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md`](../idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md) | [`idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](../idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md) |
| Target Formation resolution slots including actual `TF-04 SOURCE_SET` | [`idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](../idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md) | [`idtspe-core/runtime/target-work/projections/DYNAMIC-TARGET-FORMATION.explanatory-projection.md`](../idtspe-core/runtime/target-work/projections/DYNAMIC-TARGET-FORMATION.explanatory-projection.md) |
| Reusable Target Module / Unit Contract / Source Contract archetype | [`idtspe-core/target-modules/TARGET-MODULE-MODEL.md`](../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) | Core/profile Target Module registries |
| Proposal / Decision lifecycle | [`idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`](../idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md) | Target Modules/Lenses consume; they do not redefine it |
| USER-input classification into Source / Answer / Proposal / Decision | [`idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md`](../idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md) | Proposal/Decision Lens consumes classification; it does not redefine intake |
| material Proposal/Decision context operational evaluation + optional QRPE view | [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](../idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) | lifecycle/QRP/Evidence owners remain semantic authorities |
| accepted-Decision revalidation helper/projection | [`idtspe-core/resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md`](../idtspe-core/resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md) | helper projection only; accepted Decision semantics stay lifecycle-owned |
| open/deferred/residual continuation routing projection | [`idtspe-core/resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md`](../idtspe-core/resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md) | compact refs/status only; canonical bodies remain at natural owners |
| Q/R/P lifecycle / review | [`idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md`](../idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md) | Target Modules/Lenses consume |
| Need Candidate disposition | [`idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md`](../idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md) | [`idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](../idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md) |
| Finding Candidate disposition / Resolution Escalation | [`idtspe-core/resolution/findings/FINDING-DISPOSITION.md`](../idtspe-core/resolution/findings/FINDING-DISPOSITION.md) | Lens findings and review surfaces |
| Artifact placement / representation / P-14 / response projection | [`idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md) | SDS [`profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md`](../profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md) is profile projection |
| Lens model / applicability / Analysis Surface | [`idtspe-core/lenses/LENS-MODEL.md`](../idtspe-core/lenses/LENS-MODEL.md) | Core/profile Lens registries |
| Current IDTSPE work composition | [`idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](../idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md) | [`idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](../idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md) is technical runtime/composition contract |
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

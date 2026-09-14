# IDTSPE Methodology Responsibility Map

Status: active cross-cutting responsibility routing map

This file maps important IDTSPE/Core/profile responsibilities to their **current canonical semantic owner**. It owns routing/navigation only. Open the destination owner for the complete contract; do not treat this map as a duplicate semantic Source of Truth.

Generic Documentation semantics for a `Responsibility Map` are owned by [`../../principles-and-terminology.md`](../../principles-and-terminology.md).

| Responsibility | Current canonical owner | Important projection / supporting owner |
|---|---|---|
| Documentation semantic roles (`README`, Use Case, Responsibility Map, etc.) | [`../../principles-and-terminology.md`](../../principles-and-terminology.md) | Concrete responsibility maps own routing rows only; destination owners own semantic bodies |
| Target Work Unit mechanics; Core State Unit relation; Target Step Result vs IDTSPE Step Output | [`idtspe-core/shared/idtspe-unit-and-target-step-result-model.md`](idtspe-core/shared/idtspe-unit-and-target-step-result-model.md) | [`idtspe-core/IDTSPE-CORE-MAP.md`](idtspe-core/IDTSPE-CORE-MAP.md), [`idtspe-core/IDTSPE-SHELL.md`](idtspe-core/IDTSPE-SHELL.md) |
| Target Instance composition; Source Subject / Source State Unit; Source vs Target Relation | [`idtspe-core/shared/target-type-instance-source-and-relation-model.md`](idtspe-core/shared/target-type-instance-source-and-relation-model.md) | [`idtspe-core/IDTSPE-SHELL.md`](idtspe-core/IDTSPE-SHELL.md) |
| Target Formation resolution slots including actual `TF-04 SOURCE_SET` | [`idtspe-core/shared/resolution-slot-and-target-formation-resolution-set.md`](idtspe-core/shared/resolution-slot-and-target-formation-resolution-set.md) | [`idtspe-core/shared/dynamic-target-formation-and-discovery-checks.md`](idtspe-core/shared/dynamic-target-formation-and-discovery-checks.md) |
| Reusable Target Module / Unit Contract / Source Contract archetype | [`idtspe-core/shared/target-module-model.md`](idtspe-core/shared/target-module-model.md) | Core/profile Target Module registries |
| Proposal / Decision lifecycle | [`idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`](idtspe-core/shared/proposal-and-decision-lifecycle-contract.md) | Target Modules/Lenses consume; they do not redefine it |
| Q/R/P lifecycle / review | [`idtspe-core/shared/qrp-lifecycle-and-review-contract.md`](idtspe-core/shared/qrp-lifecycle-and-review-contract.md) | Target Modules/Lenses consume |
| Need Candidate disposition | [`idtspe-core/shared/need-candidate-disposition-contract.md`](idtspe-core/shared/need-candidate-disposition-contract.md) | [`idtspe-core/shared/compose-current-work-use-case.md`](idtspe-core/shared/compose-current-work-use-case.md) |
| Finding Candidate disposition / Resolution Escalation | [`idtspe-core/shared/finding-disposition-contract.md`](idtspe-core/shared/finding-disposition-contract.md) | Lens findings and review surfaces |
| Artifact placement / representation / P-14 / response projection | [`idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md`](idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md) | SDS [`profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](profiles/sds/ARTIFACT-PLACEMENT-MAP.md) is profile projection |
| Lens model / applicability / Analysis Surface | [`idtspe-core/lenses/LENS-MODEL.md`](idtspe-core/lenses/LENS-MODEL.md) | Core/profile Lens registries |
| Current IDTSPE work composition | [`idtspe-core/shared/compose-current-work-use-case.md`](idtspe-core/shared/compose-current-work-use-case.md) | [`idtspe-core/IDTSPE-SHELL.md`](idtspe-core/IDTSPE-SHELL.md) is technical runtime/composition contract |
| SDS Evolution Step future-state owner / Evolution Impact / materialization | [`profiles/sds/target-modules/TM-EVOLUTION-STEP.md`](profiles/sds/target-modules/TM-EVOLUTION-STEP.md) | [`profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md`](profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md) owns registry/readiness coordination only |
| SDS Target Module discovery | [`profiles/sds/target-modules/README.md`](profiles/sds/target-modules/README.md) | concrete Target Module file owns specialized Target production contract |

## Guards

```text
Responsibility Map row ≠ copied semantic contract
projection/supporting owner ≠ canonical owner
README structural navigation ≠ cross-cutting responsibility ownership
Use-Case Registry routing ≠ Responsibility Map routing
repository path/name ≠ semantic authority by itself
```

When a responsibility moves, update the canonical owner first, then this routing projection and its semantic-parity checks.

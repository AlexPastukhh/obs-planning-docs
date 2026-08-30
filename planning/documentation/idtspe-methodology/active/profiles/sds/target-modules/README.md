# SDS Target Module Catalog

Status: active SDS Target Module registry

SDS Target Modules are reusable contracts for recurring Target/result families.
Generic Questions / Ideas / Q-R-P / Decisions / Evidence / Revalidation remain
IDTSPE Core State and are not duplicated as SDS Result Units.

## Active SDS Target Modules — 12

| Module ID | `idtspe` alias | Role / Result |
|---|---|---|
| [`TM-APPLICATION-DEFINITION`](TM-APPLICATION-DEFINITION.md) | `application` | selected own-Application contribution/concept/boundary/feasibility |
| [`TM-PROTOTYPE`](TM-PROTOTYPE.md) | `prototype` | bounded practical Prototype Evidence |
| [`TM-SCENARIO-PLANNING`](TM-SCENARIO-PLANNING.md) | `scenario` | one independently meaningful Application Scenario |
| [`TM-REQUIREMENT`](TM-REQUIREMENT.md) | `requirement` | exceptional canonical shared must-hold condition |
| [`TM-SCREEN`](TM-SCREEN.md) | `screen` | conditional Screen/window spatial model |
| [`TM-DOMAIN-DISCOVERY`](TM-DOMAIN-DISCOVERY.md) | `domain` | Domain / Aggregate Modeling; supporting/shallow or bounded/deep |
| [`TM-SLICE-STRATEGY`](TM-SLICE-STRATEGY.md) | `slice-strategy` | vertical Slice portfolio + Slice→Domain map + owner bridge |
| [`TM-IMPLEMENTATION-SLICE`](TM-IMPLEMENTATION-SLICE.md) | `slice` | one vertical Slice plan incl. owner-local Evolution Steps |
| [`TM-CROSS-CUTTING-CONCERN`](TM-CROSS-CUTTING-CONCERN.md) | `crosscut` | one genuine shared non-vertical implementation responsibility |
| [`TM-TEST-STRATEGY`](TM-TEST-STRATEGY.md) | `test-strategy` | shared proof strategy only under real cross-owner coordination pressure |
| [`TM-TEST-DESIGN`](TM-TEST-DESIGN.md) | `test-design` | independently non-trivial proof design |
| [`TM-PRACTICAL-TEST`](TM-PRACTICAL-TEST.md) | `practical-test` | practical Evidence over an implemented subject |

These aliases are navigation conveniences for the generic `idtspe` dispatcher.
Canonical semantic identity remains the `TM-*` ID. Repository command IDs and
historical `tmcmd.*`/`tm.*` names are implementation/compatibility details and
must not become a second user-facing ontology.

Examples:

```text
idtspe TM-SCREEN checkout
idtspe screen checkout
idtspe tm domain Payment
idtspe slice SL-PAYMENT
```

## Retired / Consolidated SDS Modules

- `TM-DOMAIN-DRAFT` → consolidated into `TM-DOMAIN-DISCOVERY`, semantic family Domain / Aggregate Modeling.
- `TM-WEUC` → retired. Future/change meaning lives with Scenario/Slice/Cross-Cutting owners and is evaluated through L5 Evolution / Change Isolation.
- `TM-FRONTEND-SLICE` → retired. Frontend/backend are not separate SDS Slice families by default.

Compatibility commands may route old phrases to current owners; they do not keep retired Target families active.

## Inherited Generic Core Modules

SDS reuses [`TM-PRE-UPDATE-PLAN`](../../../idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md) and [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md).

Literal code/config/test realization belongs to Exact Realization. SDS semantic Target Modules must not maintain hand-written mirrors of exact code call topology.

## Domain Modeling

`TM-DOMAIN-DISCOVERY` keeps its compatibility ID/path but owns one recurring Domain/Aggregate Modeling family. It may be SUPPORTING/shallow inside Slice Strategy without a child Target or PRIMARY/bounded for one independently material modeling problem. State matrices, impossible states, invariants and Aggregate boundary discovery are Resolution techniques, not mandatory separate Result Units.

## Slice

One normal Slice has exactly one Primary Scenario, delivers one independently useful/checkable vertical result, may cross whatever technical responsibilities are required, and is not split into frontend/backend/database Slices merely because those layers exist.

## Proof

```text
obvious proof → Exact Realization
non-trivial proof design → optional TM-TEST-DESIGN
shared cross-owner proof policy → conditional TM-TEST-STRATEGY
real implemented Evidence → TM-PRACTICAL-TEST
```

Cross-module direction belongs to [`../shared/directed-methodology-workflow-and-next-step-resolution.md`](../shared/directed-methodology-workflow-and-next-step-resolution.md). Representation examples belong to [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md).

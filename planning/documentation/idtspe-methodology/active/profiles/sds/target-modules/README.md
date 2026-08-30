# SDS Target Module Catalog

Status: active SDS Target Module registry

SDS Target Modules are reusable contracts for recurring Target/result families.
Generic Questions / Ideas / Q-R-P / Decisions / Evidence / Revalidation remain
IDTSPE Core State and are not duplicated as SDS Result Units.

## Active SDS Target Modules — 12

| Module ID | Entry | Role / Result |
|---|---|---|
| [`TM-APPLICATION-DEFINITION`](TM-APPLICATION-DEFINITION.md) | `tm.application.definition` | selected own-Application contribution/concept/boundary/feasibility |
| [`TM-PROTOTYPE`](TM-PROTOTYPE.md) | `tm.prototype` | bounded practical Prototype Evidence |
| [`TM-SCENARIO-PLANNING`](TM-SCENARIO-PLANNING.md) | `tm.scenario.plan` | one independently meaningful Application Scenario |
| [`TM-REQUIREMENT`](TM-REQUIREMENT.md) | `tm.requirement` | exceptional canonical shared must-hold condition |
| [`TM-SCREEN`](TM-SCREEN.md) | `tm.screen` | conditional Screen/window spatial model |
| [`TM-DOMAIN-DISCOVERY`](TM-DOMAIN-DISCOVERY.md) | `tm.domain.discovery` | Domain / Aggregate Modeling; supporting/shallow or bounded/deep |
| [`TM-SLICE-STRATEGY`](TM-SLICE-STRATEGY.md) | `tm.slice.strategy` | vertical Slice portfolio + Slice→Domain map + owner bridge |
| [`TM-IMPLEMENTATION-SLICE`](TM-IMPLEMENTATION-SLICE.md) | `tm.slice.plan` | one vertical Slice plan incl. owner-local Evolution Steps |
| [`TM-CROSS-CUTTING-CONCERN`](TM-CROSS-CUTTING-CONCERN.md) | `tm.implementation.crosscut` | one genuine shared non-vertical implementation responsibility |
| [`TM-TEST-STRATEGY`](TM-TEST-STRATEGY.md) | `tm.test.strategy` | shared proof strategy only under real cross-owner coordination pressure |
| [`TM-TEST-DESIGN`](TM-TEST-DESIGN.md) | `tm.test.design` | independently non-trivial proof design |
| [`TM-PRACTICAL-TEST`](TM-PRACTICAL-TEST.md) | `tm.test.practical` | practical Evidence over an implemented subject |

## Retired / Consolidated SDS Modules

- `TM-DOMAIN-DRAFT` → consolidated into `TM-DOMAIN-DISCOVERY`, whose semantic family is now Domain / Aggregate Modeling.
- `TM-WEUC` → retired. Future/change meaning lives with Scenario/Slice/Cross-Cutting owners and is evaluated through L5 Evolution / Change Isolation.
- `TM-FRONTEND-SLICE` → retired. Frontend/backend are not separate SDS Slice families by default.

Compatibility command aliases may route old user phrases to current owners during
migration; they do not keep retired Target families semantically active.

## Inherited Generic Core Modules

SDS reuses:

- [`TM-PRE-UPDATE-PLAN`](../../../idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md)
- [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md)

Literal code/config/test realization belongs to Exact Realization. SDS semantic
Target Modules must not maintain hand-written mirrors of exact code call topology.

## Internal Objects, Not Target Modules

`Scenario DATA` and `Behavior Item` are addressable internal objects of Scenario
Planning, not separate Target families.

## Domain Modeling

`TM-DOMAIN-DISCOVERY` keeps its compatibility ID/path but owns one recurring
Domain/Aggregate Modeling family.

It can be used:

```text
SUPPORTING / shallow inside Slice Strategy
→ no child Target required

PRIMARY / bounded deep modeling
→ one independently material Domain/Aggregate problem
```

State matrices, impossible states, invariants and Aggregate boundary discovery are
Resolution techniques, not mandatory separate Result Units.

## Slice

One normal Slice:

- has exactly one Primary Scenario;
- delivers one independently useful/checkable vertical result;
- may cross whatever technical responsibilities are required;
- is not split into frontend/backend/database Slices merely because those layers exist.

## Proof

```text
obvious proof → Exact Realization
non-trivial proof design → optional TM-TEST-DESIGN
shared cross-owner proof policy → conditional TM-TEST-STRATEGY
real implemented Evidence → TM-PRACTICAL-TEST
```

## Directed Workflow

Cross-module direction belongs to:
[`../shared/directed-methodology-workflow-and-next-step-resolution.md`](../shared/directed-methodology-workflow-and-next-step-resolution.md).

## Representation

Logical owner identity does not imply one Markdown file. See
[`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) and the Core
Documentation / Representation Lens.

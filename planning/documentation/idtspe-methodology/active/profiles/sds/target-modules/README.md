# Target Module Catalog

Status: active methodology registry  
Purpose: SDS-profile reusable Target planning contracts. SDS-specific Lenses are indexed in `../lenses/README.md`; generic Core Lenses are owned by `../../../idtspe-core/lenses/README.md`.

## Current Active Target Modules — 17

| Module ID | Entry Point | Role | Main output / purpose |
|---|---|---|---|
| `TM-APPLICATION-DEFINITION` | `tm.application.definition` | primary | selected own-application definition |
| `TM-PROTOTYPE` | `tm.prototype` | evidence | minimum experiment + Evidence/promotion handoff |
| `TM-SCENARIO-DISCOVERY` | `tm.scenario.discovery` | primary | Scenario inventory/boundaries |
| `TM-SCENARIO-DRAFT` | `tm.scenario.draft` | primary/composite | canonical Scenario; internal DATA/Behavior contracts |
| `TM-REQUIREMENT` | `tm.requirement` | supporting/exceptional | must-hold condition/constraint owner |
| `TM-SCREEN` | `tm.screen` | supporting/conditional | canonical spatial meaning |
| `TM-DOMAIN-DISCOVERY` | `tm.domain.discovery` | primary/optional | Domain evidence/candidates |
| `TM-DOMAIN-DRAFT` | `tm.domain.draft` | primary/optional | selected Domain/no-Domain result |
| `TM-WEUC` | `tm.weuc` | primary/optional cross-cutting planning | canonical Workspace Evolution Map + current global architecture position |
| `TM-SLICE-STRATEGY` | `tm.slice.strategy` | primary/optional | selected useful vertical decomposition/order |
| `TM-IMPLEMENTATION-SLICE` | `tm.slice.plan` | primary | one vertical implementation Slice plan |
| `TM-FRONTEND-SLICE` | `tm.slice.frontend` | specialized/conditional | frontend realization for a vertical Slice |
| `TM-CROSS-CUTTING-CONCERN` | `tm.implementation.crosscut` | shared non-vertical/conditional | one canonical shared implementation responsibility |
| `TM-TEST-STRATEGY` | `tm.test.strategy` | proof-strategy/conditional | shared proof responsibility/boundaries + optional test-realization registry/map |
| `TM-TEST-DESIGN` | `tm.test.design` | primary/supporting proof | Behavior-to-Test proof design |
| `TM-PRACTICAL-TEST` | `tm.test.practical` | evidence-plan/operated evidence | implemented practical acceptance/Evidence plan |
| `TM-TEST-COVERAGE` | `tm.test.coverage` | review | actual current Evidence coverage findings |

## Not Target Modules

```text
Scenario DATA
Behavior Item
```
are internal addressable object contracts of `TM-SCENARIO-DRAFT`.

`TM-WEUC` owns creation/refresh of the canonical `SDS-WORKSPACE-EVOLUTION.md`, including the current project-global architecture position. The reusable WEUC Lens consumes that map inside other Targets and may also evaluate the whole Workspace architecture through a `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` scope. Local Architecture Decisions remain ordinary Answer Decisions; project-global conclusions are promoted through `TM-WEUC`; independently material bounded architecture can still escalate through generic Target Formation.

Consistency review remains `UC-IDTSPE-REVIEW-CONSISTENCY`, not a Target Module.

## Lens Relation

Every Target Module contains a concise `## Lens Profile`. Reusable Lens prompts/knowledge are owned by the canonical SDS/Core Lens packages and should not be duplicated here.

## Example Reading Standard

See [`HIGH-LEVEL-EXAMPLE-GUIDE.md`](../../../idtspe-core/HIGH-LEVEL-EXAMPLE-GUIDE.md) for the rule that examples must be self-contained and explanatory, not merely contextually correct.

## Artifact / File Contract Rule

Every active `TM-*.md` contains exactly one `## Artifact / File Contract`. It states which target-specific content is required/preferred/optional to persist, what stays embedded, what may deserve a companion/register/supporting artifact, and what routes to another canonical owner.

The current IDTSPE instance renders those rules through `P-14 / TF-10` as an `Artifact Placement View`.


## Directed Workflow / Next-Step Rule

Target Modules define reusable Target-family contracts; they do not define the whole chronology.

Canonical cross-module direction, testing interleave, repeated invocation modes and next-step resolution are owned by:

```text
../shared/directed-methodology-workflow-and-next-step-resolution.md
```

Every material IDTSPE response should expose the recommended next methodology Target/action after applying the current module's Exit Gate/Handoff.

## Theoretical Testing Reference

The processed Test Target Modules/Lenses remain operational authority. Raw detailed repository testing theory is preserved separately at [`../../../theoretical-modules/testing/README.md`](../../../theoretical-modules/testing/README.md). Consult it conditionally when detailed testing mechanics are materially unresolved; do not treat it as an automatic workflow stage or another Test Target.

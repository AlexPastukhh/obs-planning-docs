# Target Module Catalog

Status: active methodology registry  
Purpose: SDS-profile reusable Target planning contracts. SDS-specific Lenses are indexed in `../lenses/README.md`; generic Core Lenses are owned by `../../../idtspe-core/lenses/README.md`.

## Current Active Target Modules — 16

| Module ID | Entry Point | Role | Main output / purpose |
|---|---|---|---|
| `TM-APPLICATION-DEFINITION` | `tm.application.definition` | primary | selected own-application definition |
| `TM-PROTOTYPE` | `tm.prototype` | practical evidence | prototype inquiry + experiment/collection plan + pre-implementation Evidence interpretation |
| `TM-SCENARIO-PLANNING` | `tm.scenario.plan` | primary | one Scenario: Behavior/Requirements + DATA/Behavior decomposition + Development/Change Outlook |
| `TM-REQUIREMENT` | `tm.requirement` | supporting/exceptional | must-hold condition/constraint owner |
| `TM-SCREEN` | `tm.screen` | supporting/conditional | canonical spatial meaning |
| `TM-DOMAIN-DISCOVERY` | `tm.domain.discovery` | primary/optional | Domain evidence/candidates |
| `TM-DOMAIN-DRAFT` | `tm.domain.draft` | primary/optional | selected Domain/no-Domain result |
| `TM-WEUC` | `tm.weuc` | primary/optional cross-cutting planning | canonical Workspace Evolution Map + current global architecture position |
| `TM-SLICE-STRATEGY` | `tm.slice.strategy` | primary/optional | Slice Implementation Strategy: Slice portfolio/realization + Domain/Aggregate realization map + selected Slice semantic-owner register |
| `TM-IMPLEMENTATION-SLICE` | `tm.slice.plan` | primary | one vertical implementation Slice plan |
| `TM-FRONTEND-SLICE` | `tm.slice.frontend` | specialized/conditional | frontend realization for a vertical Slice |
| `TM-CROSS-CUTTING-CONCERN` | `tm.implementation.crosscut` | shared non-vertical/conditional | one canonical shared implementation responsibility |
| `TM-TEST-STRATEGY` | `tm.test.strategy` | proof-strategy/conditional | shared proof responsibility/boundaries + optional test-realization registry/map |
| `TM-TEST-DESIGN` | `tm.test.design` | primary/supporting proof | Behavior-to-Test proof design |
| `TM-PRACTICAL-TEST` | `tm.test.practical` | implemented practical evidence | real-implementation acceptance/learning + observation/data-collection plan + Evidence interpretation |
| `TM-TEST-COVERAGE` | `tm.test.coverage` | review | actual current Evidence coverage findings |

### Inherited Generic Core Realization

SDS also reuses Core [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md) after sufficiently determined Domain/Slice/Test/other meaning when an exact directly integrable result is independently useful. It is **not** a 17th SDS-specific module: the SDS catalog remains 16, while the installed Core+SDS system has one generic Core realization module plus these 16 profile modules.

For code, Exact Realization owns literal method bodies/files/patches plus optional explicitly authorized integration/build/test/minor-repair work. `TM-IMPLEMENTATION-SLICE` remains the call-level pre-code Slice design owner.

## Not Target Modules

```text
Scenario DATA
Behavior Item
```
are internal addressable object contracts of `TM-SCENARIO-PLANNING`.

`TM-WEUC` owns creation/refresh of the canonical `SDS-WORKSPACE-EVOLUTION.md`, including the current project-global architecture position. The reusable WEUC Lens consumes that map inside other Targets and may also evaluate the whole Workspace architecture through a `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` scope. Local Architecture Decisions remain ordinary Answer Decisions; project-global implications surface Finding Candidates with `TM-WEUC` as a likely-owner hint and cross Core Finding Disposition before any accepted global update; independently material bounded architecture can still escalate through generic Target Formation.

`RU-SSTRAT-03` gives selected Slices stable semantic identity/addressability only. It does not create bounded `TM-IMPLEMENTATION-SLICE` Targets; normal Target Formation remains authoritative when independently bounded Slice planning is material.

Consistency review remains `UC-IDTSPE-REVIEW-CONSISTENCY`, not a Target Module.

## Knowledge Basis

Existing SDS Target Modules may retain `## Knowledge Basis` sections when useful. Generic Core treats Knowledge Basis as flexible theory-to-application guidance rather than requiring one literal section/mode/schema; `TM-SCENARIO-PLANNING` currently needs no separate Knowledge Basis.

```text
Upstream Source Contract
→ current Target-instance Source archetype

Knowledge Basis
→ reusable target-family principles/rules/theory/pattern knowledge
```

Existing SDS Knowledge Basis sections may still use `INLINE | REFERENCED | HYBRID` and load-policy prose, but those are current representation choices rather than Generic conformance requirements. Theory may be referenced at any useful granularity and interpreted for the Target Module when useful. Target Modules do not absorb reusable Lens evaluation knowledge.

## Target Step-Result Conformance

All 16 active SDS Target Modules declare one explicit:

```text
## Resolution / Production Method
## Target Step-Result Contract
```

Each Step-Result Contract names its target-specific Result Units. Generic Questions / Ideas / Q/R/P / Decisions / Evidence / Revalidation remain Core State Units and are not duplicated as result fields merely for template completeness.

```text
Target Module
→ possible Result Unit surface

Concrete Target step
→ sparse/material projection
```

Lens findings are handled through the generic Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); Target Modules remain the owners of accepted target-specific Result Units.

## Lens Relation

Every Target Module contains a concise `## Lens Profile`. Reusable Lens prompts/knowledge are owned by the canonical SDS/Core Lens packages and should not be duplicated here.

## Example Reading Standard

See [`HIGH-LEVEL-EXAMPLE-GUIDE.md`](../../../idtspe-core/HIGH-LEVEL-EXAMPLE-GUIDE.md) for the rule that examples must be self-contained and explanatory, not merely contextually correct.

## Artifact / File Contract Rule

Every active `TM-*.md` contains exactly one `## Artifact / File Contract`. It states which target-specific content is required/preferred/optional to persist, what stays embedded, what may deserve a companion/register/supporting artifact, and what routes to another canonical owner.

At an Integration Checkpoint or other persistence-sensitive structured pass, current Target artifact rules are rendered through `P-14 / TF-10` when physical placement is material; ordinary Broad Discussion may inherit established placement without a full view.


## Directed Workflow / Next-Step Rule

Target Modules define reusable Target-family contracts; they do not define the whole chronology.

Canonical cross-module direction, testing interleave, repeated invocation modes and next-step resolution are owned by:

```text
../shared/directed-methodology-workflow-and-next-step-resolution.md
```

At an Integration Checkpoint or explicit/material handoff, expose the recommended next methodology Target/action after applying the current module's Exit Gate/Handoff. During ordinary Broad Discussion, surface direction when it changes, blocks progress or the user asks rather than repeating it mechanically each turn.

## Theoretical Testing Knowledge

The processed Test Target Modules/Lenses remain operational authority. Deeper raw Testing theory at [`../../../theoretical-modules/testing/README.md`](../../../theoretical-modules/testing/README.md) may be consulted when a materially difficult proof question needs it; Target Modules do not require a fixed Knowledge Basis mode/load-policy shape. `TM-PROTOTYPE` and `TM-PRACTICAL-TEST` currently rely on their operational practical-evidence method/Lens rather than separate Target Module Knowledge Bases.

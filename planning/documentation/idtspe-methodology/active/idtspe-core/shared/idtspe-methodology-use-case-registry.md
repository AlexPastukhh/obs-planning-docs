# IDTSPE Methodology Use-Case Registry

Status: active IDTSPE functional registry

This registry is reached from the generic [`Methodology Use-Case Registry Map`](../../../../use-case-registry-map.md). It governs **how IDTSPE methodology is composed/used**, not the specialized planning semantics owned by Target Modules/Lenses/profiles.

## Runtime / Work Composition

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-IDTSPE-COMPOSE-CURRENT-WORK` | Compose Current IDTSPE Work | always during active IDTSPE work; especially before a material methodology action or after context change | smallest useful IDTSPE composition: possibly Broad Discussion only, or selected State/Target/TM/Lens/profile/guidance/checkpoint/revalidation components | [`compose-current-work-use-case.md`](compose-current-work-use-case.md) |
| `UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE` | Maintain Current IDTSPE Work State | working meaning needs explicit retention/addressability for lifecycle, continuation, review, handoff or revalidation | sparse coherent current Core State + applicable Target Result/methodology-use state | [`maintain-current-work-state-use-case.md`](maintain-current-work-state-use-case.md) |
| `UC-IDTSPE-INTEGRATE-CURRENT-WORK` | Integrate Current IDTSPE Work | distributed current meaning makes a coherent whole-state view useful, or explicit checkpoint/review/handoff needs one | situational IDTSPE Integration Checkpoint with current meaning/revalidation/continuation integrated | [`integrate-current-work-use-case.md`](integrate-current-work-use-case.md) |
| `UC-IDTSPE-REVALIDATE-CURRENT-WORK` | Revalidate Current IDTSPE Work | Finding/Evidence/Decision/source/USER/methodology change may make existing meaning stale | narrow affected meaning/components rechecked; unaffected meaning preserved; precise re-entry route | [`revalidate-current-work-use-case.md`](revalidate-current-work-use-case.md) |

`UC-IDTSPE-COMPOSE-CURRENT-WORK` is the default continuously relevant runtime Use Case. Its normal outcome may be **no additional methodology structure** beyond Broad Discussion.

## Methodology Component Maintenance

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-IDTSPE-MAINTAIN-TARGET-MODULE` | Create / Review / Integrate Target Module | recurring Target class lacks/requires change to a reusable Target Module | accepted Target Module contract + catalog/profile/integration consequences | [`target-module-creation-and-integration-use-case.md`](target-module-creation-and-integration-use-case.md) |
| `UC-IDTSPE-MAINTAIN-LENS` | Create / Review / Integrate Reusable Lens | repeated evaluation perspective is missing/duplicated/misbounded or existing Lens needs change | accepted Lens contract + registry/profile/integration consequences | [`lens-creation-and-integration-use-case.md`](lens-creation-and-integration-use-case.md) |

## Supporting Processes, Not Separate Runtime Use Cases

The following Core mechanics may be invoked by the Use Cases above but do not require a separate functional Use Case identity merely because an operation exists:

- Target Formation;
- Lens Applicability Scan / Lens operations;
- Finding Disposition;
- Proposal/Decision lifecycle ([`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md)) and optional Q/R/P grouping/priority;
- consistency review;
- registry traversal;
- Broad Discussion / Key Points;
- Exact internal production steps.

A new Use Case is added only for a distinct independently useful **methodology-use Result**, not for every Core mechanism or Target/Lens operation.

## SDS Profile Boundary

The current SDS profile contributes Target Modules, Lenses, registries, knowledge and semantic rules. It defines no separate runtime methodology-use Use Cases because these IDTSPE Use Cases can discover/compose the SDS components through the active-profile directory.

`Feature`, `Scenario`, `Screen`, `Domain`, `Slice`, `Shared`, `Evolution`, `Prototype` and `Practical Test` are therefore **not** Use Cases at this documentation-methodology layer.

## Capability / Component Boundary

```text
Use Case
= Situation + independently useful methodology-use Result + Process
  that determines which methodology/documentation components/actions are needed

Target Module
= reusable specialized production contract for one recurring Target/result family

Lens
= reusable specialized evaluation perspective

Registry / Knowledge Basis / Process
= supporting methodology components reached from a Use Case
```

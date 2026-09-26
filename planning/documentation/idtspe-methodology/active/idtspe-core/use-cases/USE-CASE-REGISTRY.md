# IDTSPE Methodology Use-Case Registry

Status: active IDTSPE functional registry

This registry is reached by the fundamental [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](../../../../use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md) through the generic [`Methodology Use-Case Registry Map`](../../../../use-case-registry-map.md). It governs **how IDTSPE methodology is composed/used**, not the specialized planning semantics owned by Target Modules/Lenses/profiles.

> Semantic Owner Dependency
> Type: REPRESENTS
> Responsibility: `DOC.USE-CASE-APPLICABILITY-RESOLUTION`
> Owner: [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](../../../../use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md)

<a id="idtspe-use-case-discovery"></a>
Responsibility ID: `IDTSPE.USE-CASE-DISCOVERY`

This scoped registry owns compact IDTSPE Use-Case discovery/routing rows only; it does not own the cross-scope applicability-resolution Process or the semantic mechanisms invoked by each Use Case. Responsibility routing for the Use Cases themselves is in [`RESPONSIBILITY-MAP.md`](RESPONSIBILITY-MAP.md).

## Runtime / Work Composition

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-IDTSPE-AI-WORKING-BOUNDARY` | Apply AI Working Authority Boundary | every current Planning/repository work entry; mandatory companion of the fundamental cross-scope applicability resolver | current AI authority/interaction boundary is reaffirmed without forcing Proposal/GIP/Decision ceremony | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md`](ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md#uc-idtspe-ai-working-boundary) |
| `UC-IDTSPE-COMPOSE-CURRENT-WORK` | Compose Current IDTSPE Work | always during active IDTSPE work; especially before a material methodology action or after context change | smallest useful IDTSPE composition plus a refreshed/reaffirmed Port Requirement Set for the next normal Shell pass | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md#uc-idtspe-compose-current-work) |
| `UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE` | Maintain Current IDTSPE Work State | working meaning needs explicit retention/addressability for lifecycle, continuation, review, handoff or revalidation | proportional current Core State + complete Module-defined Target Result dispositions / methodology-use state | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md`](maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md#uc-idtspe-maintain-current-work-state) |
| `UC-IDTSPE-INTEGRATE-CURRENT-WORK` | Integrate Current IDTSPE Work | distributed current meaning makes a coherent whole-state view useful, or explicit checkpoint/review/handoff needs one | situational IDTSPE Integration Checkpoint with current meaning/revalidation/continuation integrated | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md`](integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md#uc-idtspe-integrate-current-work) |
| `UC-IDTSPE-REVALIDATE-CURRENT-WORK` | Revalidate Current IDTSPE Work | Finding/Evidence/Decision/source/USER/methodology change may make existing meaning stale | narrow affected meaning/components rechecked; unaffected meaning preserved; precise re-entry route | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md`](revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md#uc-idtspe-revalidate-current-work) |

`UC-IDTSPE-AI-WORKING-BOUNDARY` is fundamental and always logically active; the cross-scope applicability resolver reaffirms it before narrower functional work. `UC-IDTSPE-COMPOSE-CURRENT-WORK` remains the default continuously relevant **work-composition** Use Case. Its normal outcome may be **no additional methodology structure** beyond Broad Discussion.

## Methodology Component Maintenance

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-IDTSPE-MAINTAIN-TARGET-MODULE` | Create / Review / Integrate Target Module | recurring Target class lacks/requires change to a reusable Target Module | accepted Target Module contract + catalog/profile/integration consequences | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md`](maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md#uc-idtspe-maintain-target-module) |
| `UC-IDTSPE-MAINTAIN-LENS` | Create / Review / Integrate Reusable Lens | repeated evaluation perspective is missing/duplicated/misbounded or existing Lens needs change | accepted Lens contract + registry/profile/integration consequences | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md`](maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md#uc-idtspe-maintain-lens) |
| `UC-IDTSPE-MAINTAIN-METHODOLOGY-INTEGRITY-TESTS` | Create / Review / Maintain Methodology Integrity Tests | methodology declarations/projections need a hard guard, or an existing guard is stale/fragile/overreaching | maintained authority-derived integrity guard contract + exact realization/verification consequences | [`planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-methodology-integrity-tests/UC-IDTSPE-MAINTAIN-METHODOLOGY-INTEGRITY-TESTS.md`](maintain-methodology-integrity-tests/UC-IDTSPE-MAINTAIN-METHODOLOGY-INTEGRITY-TESTS.md#uc-idtspe-maintain-methodology-integrity-tests) |

## Supporting Processes, Not Separate Runtime Use Cases

The following Core mechanics may be invoked by the Use Cases above but do not require a separate functional Use Case identity merely because an operation exists:

- Target Formation;
- Lens Applicability Scan / Lens operations;
- Finding Disposition;
- Proposal/Decision lifecycle ([`planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md)), Proposal/Decision Resolution Context Lens and optional Q/R/P grouping/priority;
- Planning Resolution State result ([`planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md`](../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state)) for material continuation/handoff routing;
- consistency review;
- registry traversal;
- Broad Discussion / Key Points;
- Exact internal production steps.

A new Use Case is added only for a distinct independently useful **methodology-use Result**, not for every Core mechanism or Target/Lens operation.

## Installed Profile Boundary

The current SDS, 2D Visual Production and Reference Knowledge profiles contribute specialized Target Modules, Lenses, registries, knowledge/representation and profile semantic rules. They define no separate runtime methodology-use Use Cases because these IDTSPE Use Cases discover/compose profile components through [`../../profiles/RESPONSIBILITY-MAP.md`](../../profiles/RESPONSIBILITY-MAP.md) and the selected profile routing.

Profile Target families such as SDS `Feature`/`Scenario`/`Evolution`, 2D visual design/construction families, and Reference Knowledge Bank/Entry/Landscape families are therefore **not** Use Cases at this documentation-methodology layer.

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

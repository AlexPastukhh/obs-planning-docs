# IDTSPE Use-Case Orchestration Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map routes IDTSPE methodology-use/orchestration responsibilities. Use Cases own their Situation → Result → Process contract only; Target Work, Resolution, Lens, Knowledge, Representation and runtime contracts remain semantic owners for the mechanisms they invoke.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| IDTSPE Use-Case discovery/routing metadata | [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md#idtspe-use-case-discovery) — `IDTSPE.USE-CASE-DISCOVERY` | Registry rows are compact routing metadata; cross-scope applicability resolution remains `DOC.USE-CASE-APPLICABILITY-RESOLUTION` |
| Current-work methodology composition/orchestration | [`compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md#uc-idtspe-compose-current-work) — `IDTSPE.UC.COMPOSE-CURRENT-WORK` | Selects the smallest useful methodology composition; does not own invoked component contracts |
| Proportional current Core/Target state retention/orchestration | [`maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md`](maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md#uc-idtspe-maintain-current-work-state) — `IDTSPE.UC.MAINTAIN-CURRENT-WORK-STATE` | Orchestrates retention; `CORE.STATE-UNIT`, Target Work and lifecycle owners define the retained semantics |
| Whole-current-work integration/checkpoint orchestration | [`integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md`](integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md#uc-idtspe-integrate-current-work) — `IDTSPE.UC.INTEGRATE-CURRENT-WORK` | Integration Checkpoint is a situational orchestration/result; representation projection is separately owned |
| Targeted affected-meaning revalidation orchestration | [`revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md`](revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md#uc-idtspe-revalidate-current-work) — `IDTSPE.UC.REVALIDATE-CURRENT-WORK` | Re-enters real owners narrowly; does not become a peer semantic lifecycle |
| Reusable Target Module maintenance/orchestration | [`maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md`](maintain-target-module/UC-IDTSPE-MAINTAIN-TARGET-MODULE.md#uc-idtspe-maintain-target-module) — `IDTSPE.UC.MAINTAIN-TARGET-MODULE` | Target Module Meta-Model and Target Work contracts remain authoritative |
| Reusable Lens maintenance/orchestration | [`maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md`](maintain-lens/UC-IDTSPE-MAINTAIN-LENS.md#uc-idtspe-maintain-lens) — `IDTSPE.UC.MAINTAIN-LENS` | Lens Meta-Model/concrete Lens owners remain authoritative |

Guards:

```text
Use Case = functional Situation + independently useful Result + orchestration Process
Use Case ≠ semantic owner of every mechanism it invokes
Use-Case Registry ≠ applicability resolver
Integration/Revalidation ≠ global restart or mandatory ceremony
maintenance Use Case ≠ second Meta-Model
```

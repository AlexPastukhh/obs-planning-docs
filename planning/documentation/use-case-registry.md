# Documentation Use-Case Registry

Status: active scoped functional registry

This registry is one scope reached through the [`Methodology Use-Case Registry Map`](use-case-registry-map.md). Rows intentionally include compact `Situation` and `Result` summaries so applicability can be scanned without loading every Use-Case body. The owner remains authoritative for the full Process.

### Fundamental Methodology Routing

| ID | Use Case | Situation summary | Result summary | Owner | Related command |
|---|---|---|---|---|---|
| `UC-DOC-RESOLVE-CURRENT-USE-CASES` | Resolve Current Methodology Use Cases | any methodology-guided work starts/continues; before a material methodology action or after applicability-changing context | current applicable Use-Case composition is reaffirmed/refreshed using reusable registry metadata where trustworthy | [`use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md) | пройди регистры методологии |

### Methodology / Guidance Use

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-DOC-USE-REPOSITORY-GUIDANCE` | Use Repository Methodology / Guidance | methodology/documentation may help, or current orientation may be stale/unclear | current applicable Use Cases are interpreted/applied proportionally; relevant semantic owners/actions are selected without loading unnecessary detail | [`use-cases/UC-DOC-USE-REPOSITORY-GUIDANCE.md`](use-cases/UC-DOC-USE-REPOSITORY-GUIDANCE.md) |

### Documentation Change / Review

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-DOC-PLAN-DOCUMENTATION-CHANGE` | Plan Repository Documentation Change | documentation capability/owner/navigation/methodology needs material semantic change | exact realization-ready documentation meaning and affected owners | [`use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md`](use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) |
| `UC-DOC-REVIEW-DOCUMENTATION` | Review Repository Documentation | documentation may be stale, duplicated, orphaned or inconsistent | material findings tied to real owners and narrow repair routes | [`use-cases/UC-DOC-REVIEW-DOCUMENTATION.md`](use-cases/UC-DOC-REVIEW-DOCUMENTATION.md) |

### Documentation Type Maintenance

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-DOC-MAINTAIN-USE-CASE` | Establish / Change Repository Use Case | a capability is missing/duplicated/misbounded or no longer independently useful | smallest correct current Use-Case set | [`use-cases/UC-DOC-MAINTAIN-USE-CASE.md`](use-cases/UC-DOC-MAINTAIN-USE-CASE.md) |
| `UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY` | Maintain Principles & Terminology | stable shared vocabulary/rules are missing/stale/duplicated/misplaced | coherent term-centered owner | [`use-cases/UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY.md`](use-cases/UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY.md) |
| `UC-DOC-MAINTAIN-PROCESS` | Maintain Reusable Process | repeated Process needs extraction/change/reuse | smallest useful reusable Process reachable from UCs | [`use-cases/UC-DOC-MAINTAIN-PROCESS.md`](use-cases/UC-DOC-MAINTAIN-PROCESS.md) |
| `UC-DOC-MAINTAIN-TEMPLATE` | Maintain Documentation Template | repeated shape is useful or current template is stale/overloaded | shape-only reachable template | [`use-cases/UC-DOC-MAINTAIN-TEMPLATE.md`](use-cases/UC-DOC-MAINTAIN-TEMPLATE.md) |
| `UC-DOC-MAINTAIN-EXAMPLE` | Maintain Documentation Example | reusable meaning needs a concrete demonstration | current non-authoritative reachable example | [`use-cases/UC-DOC-MAINTAIN-EXAMPLE.md`](use-cases/UC-DOC-MAINTAIN-EXAMPLE.md) |
| `UC-DOC-MAINTAIN-README` | Maintain README Navigation | structure/responsibilities changed or navigation is misleading | accurate structural map without semantic duplication | [`use-cases/UC-DOC-MAINTAIN-README.md`](use-cases/UC-DOC-MAINTAIN-README.md) |
| `UC-DOC-MAINTAIN-RESPONSIBILITY-MAP` | Maintain Responsibility Map | cross-file/cross-area ownership routing is missing, stale, ambiguous or unnecessarily duplicated | smallest useful responsibility→canonical-owner map with clear boundaries and no copied contract bodies | [`use-cases/UC-DOC-MAINTAIN-RESPONSIBILITY-MAP.md`](use-cases/UC-DOC-MAINTAIN-RESPONSIBILITY-MAP.md) |
| `UC-DOC-MAINTAIN-USE-CASE-REGISTRY` | Maintain Use-Case Registry | Use-Case identity/location/coverage changed | complete current scoped registry with routing summaries | [`use-cases/UC-DOC-MAINTAIN-USE-CASE-REGISTRY.md`](use-cases/UC-DOC-MAINTAIN-USE-CASE-REGISTRY.md) |

## Routing Consumption Rule

> Semantic Owner Dependency
> Type: REPRESENTS
> Responsibility: `DOC.USE-CASE-APPLICABILITY-RESOLUTION`
> Owner: [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md)

This registry owns the compact `Situation` / `Result` routing rows above, not the applicability Process. The fundamental resolver may scan those summaries before opening a Use-Case body; several rows may remain applicable and no additional row may be needed when the current Use-Case composition is already sufficient.

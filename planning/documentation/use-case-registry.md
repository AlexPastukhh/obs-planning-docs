# Documentation Use-Case Registry

Status: active scoped functional registry

This registry is one scope reached through the [`Methodology Use-Case Registry Map`](use-case-registry-map.md). Rows intentionally include compact `Situation` and `Result` summaries so applicability can be scanned without loading every Use-Case body. The owner remains authoritative for the full Process.

### Methodology / Guidance Use

| ID | Use Case | Situation summary | Result summary | Owner |
|---|---|---|---|---|
| `UC-DOC-USE-REPOSITORY-GUIDANCE` | Use Repository Methodology / Guidance | methodology/documentation may help, or current orientation may be stale/unclear | relevant Use Cases/owners and documentation actions are selected proportionally | [`use-cases/UC-DOC-USE-REPOSITORY-GUIDANCE.md`](use-cases/UC-DOC-USE-REPOSITORY-GUIDANCE.md) |

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
| `UC-DOC-MAINTAIN-USE-CASE-REGISTRY` | Maintain Use-Case Registry | Use-Case identity/location/coverage changed | complete current scoped registry with routing summaries | [`use-cases/UC-DOC-MAINTAIN-USE-CASE-REGISTRY.md`](use-cases/UC-DOC-MAINTAIN-USE-CASE-REGISTRY.md) |

## Scan Rule

At a methodology-use decision point, scan `Situation summary` first. Open a Use-Case body only when its situation is plausibly applicable or when ambiguity cannot be resolved from the row. More than one Use Case may be active. `NO_ADDITIONAL_UC` is a normal result when the currently active UC set remains sufficient.

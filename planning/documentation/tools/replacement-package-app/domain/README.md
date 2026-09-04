# Replacement Package App — Domain Owners

Status: active Domain ownership map

Behavior Items remain authoritative in Scenario owners. Domain owners implement coherent groups of BI through stable semantic/consistency boundaries; there is deliberately not one Aggregate per BI.

| Owner | Kind | Current role / planned routing |
|---|---|---|
| [`Repository Target`](repository-target.md) | Domain Object / identity owner | CURRENT |
| [`Work Intent`](work-intent.md) | Aggregate | CURRENT |
| [`Repository Work / ChangeSet`](change-set.md) | central Aggregate | CURRENT; future reviewed-result/PR/integration/final-record ownership TBD through Requirements Discovery |
| [`External Interaction`](external-interaction.md) | Aggregate | CURRENT |
| [`Repository Snapshot`](repository-snapshot.md) | immutable Domain Object | CURRENT |

Legacy Path Ownership and legacy persisted Current Change remain current implementation concepts while legacy behavior exists. They do not need standalone permanent target owners merely for symmetry.

Planned Scenario dependencies do not preassign reviewed-result, PR, integration or final-record requirements to an existing Domain owner. Such ownership is selected through downstream Requirements Discovery.

Each owner separates:
- current semantic responsibility/invariants;
- authoritative BI identities it implements;
- optional durable `DI-*` requirements;
- local proof responsibility/Test Items only when useful;
- `Evolution Impact` for canonical Scenario-owned Evolution Steps.

Planned semantics never silently replace current semantics before implementation/proof migration.

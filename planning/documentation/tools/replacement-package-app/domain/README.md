# Replacement Package Workflow — Domain Owners

Status: active Domain ownership map
Scope: common Domain catalog for Replacement Package Builder + Replacement Package App planning.

Behavior Items remain authoritative in Scenario owners. Domain owners implement coherent groups of BI through stable semantic/consistency boundaries; there is deliberately not one Aggregate per BI and no requirement for symmetric Builder/App Aggregate sets.

## Current selected Domain owners

The currently selected code-backed Domain owners belong to Replacement Package App/current consumer realization:

| Owner | Kind | Current / planned role |
|---|---|---|
| [`Repository Target`](repository-target.md) | Domain Object / identity owner | CURRENT |
| [`Work Intent`](work-intent.md) | Aggregate | CURRENT; affected by planned ownership migration |
| [`Repository Work / ChangeSet`](change-set.md) | central Aggregate | CURRENT; affected by planned reviewed-result workflow |
| [`External Interaction`](external-interaction.md) | Aggregate | CURRENT |
| [`Repository Snapshot`](repository-snapshot.md) | immutable Domain Object | CURRENT |

Legacy Path Ownership and legacy persisted Current Change remain current implementation concepts while legacy behavior exists. They do not need standalone permanent target owners merely for symmetry.

## Builder Domain boundary

The planned Builder Scenario does **not** yet select a full Builder Aggregate model.

Repository Work/Issue/package/review identities appearing in the Builder Scenario are behavioral concepts and integration identities; they do not automatically imply a new Builder Aggregate.

When implementation discovery selects durable Builder Domain semantics, the new owner belongs in this same `domain/` catalog. Do not create a second Builder Domain root.

Each selected Domain owner separates:
- current semantic responsibility/invariants;
- authoritative BI identities it implements;
- optional durable `DI-*` requirements;
- local proof responsibility/Test Items only when useful;
- `Evolution Impact` for canonical Scenario-owned Evolution Steps.

Planned semantics never silently replace current semantics before implementation/proof migration.

`Evolution Impact` on a current Domain owner means that the owner is affected by the Scenario change. It does **not** by itself select that Aggregate as the future consistency owner for reviewed-result identity, route state, PR currentness, final logging or Builder-side repository-work state.

Target Domain decomposition remains deliberately **TBD** until the dedicated Domain realization review selects coherent consistency boundaries.

## Cross-module migration note

Colocation does not transfer current App Aggregates into Builder automatically.

The selected target changes **behavior ownership** for repository-work creation: Builder Start Work creates the Issue and logical work branch; the App target consumes/verifies that existing work. Lower implementation ownership must be selected during migration rather than inferred from today's App classes.

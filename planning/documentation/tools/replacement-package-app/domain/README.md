# Replacement Package App — Domain Owners

Status: active Domain ownership map during Work-centered migration

Behavior Items remain authoritative in Scenario owners. Domain owners implement the narrowest natural semantic/consistency boundary.

| Owner | Kind | Current / target role |
|---|---|---|
| [`Repository Target`](repository-target.md) | shared Value Object | CURRENT |
| [`WorkId`](work-id.md) | shared identity Value Object | TARGET / introduced |
| [`Work Intent`](work-intent.md) | Aggregate | CURRENT, correlated by WorkId |
| [`Git Workspace`](git-workspace.md) | Aggregate | TARGET, runtime cutover pending |
| [`Replacement Package State`](replacement-package-state.md) | Aggregate per exact package realization | TARGET / active modular state |
| [`External Interaction`](external-interaction.md) | legacy Aggregate | CURRENT only where legacy owners still consume it |
| [`Repository Snapshot`](repository-snapshot.md) | immutable Domain Object | CURRENT |
| [`ChangeSet`](change-set.md) | retired target Aggregate / transitional runtime record | CURRENT TRANSITION ONLY |

Target architecture deliberately has no central Aggregate that owns Issue + workspace + package + review + publication + finalization together. `WorkId` correlates natural owners without becoming a state bucket itself.

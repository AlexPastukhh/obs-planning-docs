# Replacement Package App — Domain Owners

Status: active Work-centered Domain ownership map

Behavior Items remain authoritative in Scenario/Feature owners. Domain owners implement the narrowest natural semantic/consistency boundary.

| Owner | Kind | Current role |
|---|---|---|
| [`Repository Target`](repository-target.md) | shared Value Object | CURRENT |
| [`WorkId`](work-id.md) | shared identity Value Object | CURRENT |
| [`Work Intent`](work-intent.md) | durable semantic-work owner | CURRENT |
| [`Git Workspace`](git-workspace.md) | Aggregate | CURRENT runtime authority |
| [`Replacement Package State`](replacement-package-state.md) | Aggregate per exact package realization | CURRENT runtime authority |
| [`Repository Snapshot`](repository-snapshot.md) | immutable Domain Object | CURRENT separate capability |
| [`ChangeSet`](change-set.md) | retired Aggregate | LEGACY SOURCE ONLY; not used by target executable paths |
| [`External Interaction`](external-interaction.md) | retired/legacy Aggregate | not part of target Main Work runtime |

Current target architecture deliberately has no central Aggregate that owns Issue + workspace + package + review + publication + finalization together. `WorkId` correlates natural owners without becoming a mutable state bucket.

# Git Workspace

Status: active current Aggregate/runtime owner

## Responsibility

Own the durable Git execution facts for one Work: exact Repository Target, integration target branch, persisted worktree location and immutable initial `baseCommit`.

## Domain Concepts / Invariants

`GitWorkspace = (WorkId, RepositoryTarget, targetBranch, worktree, baseCommit)`.

- worktree is persisted and revalidated before sensitive operations;
- work branch is deterministic from WorkId and therefore derived rather than separately persisted Domain state;
- Repository Target is exact `(RepositoryIdentity, RegisteredRepositoryPath)`;
- package commit/publication, Issue details, review and Finalize state do not belong to this Aggregate;
- one Work has at most one persisted GitWorkspace;
- an existing workspace may be reused only when Repository Target and target branch match exactly.

## Runtime durability

Workspace creation journals exact intent before branch/worktree mutation. If Git effects exist but final `GitWorkspace` persistence failed, repeating Start workspace reconciles only the journal-owned deterministic branch/worktree and then persists the same workspace.

## Tests

`WorkAggregateTests` proves the exact record shape and deterministic branch derivation. Feature/Scenario integration proves Start workspace persists `GitWorkspace`, does not create `Core.ChangeSet`, is idempotent, and recovers after workspace-state persistence failure.

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
- an existing workspace may be reused only when Repository Target and target branch match exactly;
- initial `baseCommit` comes from a fresh fetch through one verified isolated Git transport endpoint for `origin/<targetBranch>`, never merely from mutable local `refs/heads/<targetBranch>`, later `origin` resolution, or later URL-rewrite configuration.

## Runtime durability

Workspace creation first captures one verified origin fetch transport endpoint and a safe transport/authentication config snapshot, fetches the target branch in isolated temporary Git state, imports the fetched objects locally through bundle/unbundle, then journals exact intent before branch/worktree mutation. RepositoryIdentity parsing/normalization belongs to that shared Git transport capability. If Git effects exist but final `GitWorkspace` persistence failed, repeating Start workspace reconciles only the journal-owned deterministic branch/worktree and then persists the same workspace. A leftover journal beside an already-persisted workspace must match that workspace exactly before cleanup.

## Tests

`WorkAggregateTests` proves the exact record shape, deterministic branch derivation and shared RepositoryIdentity normalization. Feature/Scenario integration proves fresh authoritative origin pinning even with stale local branch state, ignores `insteadOf` introduced after endpoint capture, persists `GitWorkspace`, does not create `Core.ChangeSet`, is idempotent, recovers after workspace-state persistence failure and rejects conflicting leftover journals.

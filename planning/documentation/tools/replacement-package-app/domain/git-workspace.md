# Git Workspace

Status: selected target Aggregate owner; runtime cutover pending

## Responsibility

Own the durable Git execution facts for one Work: exact Repository Target, integration target branch, persisted worktree location and immutable initial `baseCommit`.

## Domain Concepts / Invariants

`GitWorkspace = (WorkId, RepositoryTarget, targetBranch, worktree, baseCommit)`.

- worktree remains persisted and is revalidated before sensitive operations;
- work branch is deterministic from WorkId and is therefore derived rather than separately persisted Domain state;
- Repository Target remains the exact `(RepositoryIdentity, RegisteredRepositoryPath)` Value Object;
- package commit/publication, Issue details, review and Finalize state do not belong to this Aggregate;
- workspace recovery may journal intended Git side effects, but the journal does not broaden Aggregate responsibility.

## Domain Implementation Items

### DI-RPKG-WORKSPACE-EXACT-EXECUTION-IDENTITY
Requirement:
Workspace-sensitive operations must revalidate the persisted worktree against the exact Repository Target, derived work branch and expected Git common repository before mutation.

Reason:
A remembered path is evidence of intended workspace location, not permission to operate on whatever repository currently occupies that path.

## Tests

`WorkAggregateTests` proves the exact record shape and deterministic branch derivation. Existing Git integration tests remain mechanics proof until the runtime is cut over from legacy Core workspace state.

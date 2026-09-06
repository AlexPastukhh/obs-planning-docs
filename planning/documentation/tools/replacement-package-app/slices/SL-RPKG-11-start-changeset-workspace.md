# SL-RPKG-11 — Start Work Workspace

Status: active current Slice owner

## Result / Responsibility

Ensure one isolated exact Git-backed `GitWorkspace` for WorkId, pinned to exact target branch source and recoverable/idempotent through a durable workspace journal.

## Domain used

Repository Target; WorkId; GitWorkspace; Work Intent correlation.

## Slice Implementation Items

### SI-RPKG-WORKSPACE-PINNED-SOURCE
Resolve and persist exact initial `baseCommit` from explicit target branch, persist worktree, and create/verify the deterministic Work branch/worktree in the same Git common repository.

### SI-RPKG-WORKSPACE-JOURNAL-BEFORE-GIT-MUTATION
Persist exact workspace intent before branch/worktree mutation. Retry adopts only journal-owned deterministic partial effects and fails closed on unjournaled collisions.

### SI-RPKG-WORKSPACE-OWNER-CUTOVER
Persist `GitWorkspace` as runtime authority. Start workspace does not create or update `Core.ChangeSet`.

## Tests

Feature/Scenario integration proves exact target-branch pinning, deterministic branch/worktree identity, durable `GitWorkspace`, no `Core.ChangeSet`, idempotence and recovery after Git effects but before final workspace-state persistence.

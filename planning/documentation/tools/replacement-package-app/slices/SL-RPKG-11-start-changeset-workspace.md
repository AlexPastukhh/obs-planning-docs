# SL-RPKG-11 — Start Work Workspace

Status: active current Slice owner

## Result / Responsibility

Ensure one isolated exact Git-backed `GitWorkspace` for WorkId, pinned to exact target branch source and recoverable/idempotent through a durable workspace journal.

## Domain used

Repository Target; WorkId; GitWorkspace; Work Intent correlation.

## Slice Implementation Items

### SI-RPKG-WORKSPACE-PINNED-SOURCE
Capture exactly one effective origin fetch URL, verify its RepositoryIdentity, fetch exact `targetBranch` through that captured URL, persist the fetched commit as immutable initial `baseCommit`, then create/verify the deterministic Work branch/worktree in the same Git common repository. Local target-branch position and later re-resolution of mutable `origin` are not source authority.

### SI-RPKG-WORKSPACE-JOURNAL-BEFORE-GIT-MUTATION
Persist exact workspace intent before branch/worktree mutation. Retry adopts only journal-owned deterministic partial effects and fails closed on unjournaled collisions. If `GitWorkspace` already exists, any leftover journal must match it exactly before deletion.

### SI-RPKG-WORKSPACE-OWNER-CUTOVER
Persist `GitWorkspace` as runtime authority. Start workspace does not create or update `Core.ChangeSet`.

## Tests

Feature/Scenario integration proves stale-local/fresh-origin target-branch pinning, deterministic branch/worktree identity, durable `GitWorkspace`, no `Core.ChangeSet`, idempotence, recovery after Git effects but before final workspace-state persistence, and conflicting-journal rejection.

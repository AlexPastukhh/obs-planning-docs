# SL-RPKG-11 — Start ChangeSet Workspace

Status: active current Slice owner with planned target ownership migration

## Current Result / Responsibility

Ensure one isolated exact Git-backed workspace for a new current target-mode ChangeSet, pinned to exact target branch source and recoverable/idempotent through a durable workspace journal.

## Current Scenario Behavior Realized

Supports current `FI-RPKG-REALIZE-CURRENT-PACKAGE` and current exact-source/retry behavior.

## Domain Used

Repository Target; Repository Work / ChangeSet; Work Intent reference.

## Slice Implementation Items — Current

### SI-RPKG-WORKSPACE-PINNED-SOURCE

Current workspace creation persists exact `baseCommit/publishedTip` from explicit target branch and creates/verifies deterministic ChangeSet branch/worktree.

### SI-RPKG-WORKSPACE-JOURNAL-BEFORE-GIT-MUTATION

Persist exact workspace intent before branch/worktree mutation so retry adopts only owned partial effects.

## Tests

Current `CoreTests` cover target pinning, deterministic branch/worktree/common-repository verification, idempotency and recovery.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Planned Builder Start Work already creates the logical work branch from the exact source before development.

The target App must therefore consume that exact `workBranch`/source identity and may ensure/recover an execution workspace for it, but must not silently create a different logical work branch as a new consumer work identity.

Whether the implementation reuses the current worktree mechanism, adopts an existing Builder workspace, or materializes another safe execution representation is implementation design.

Current SL-RPKG-11 remains current implementation authority until migration.

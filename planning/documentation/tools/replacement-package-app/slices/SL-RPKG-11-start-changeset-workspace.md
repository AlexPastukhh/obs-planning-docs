# SL-RPKG-11 — Start ChangeSet Workspace

Status: active current Slice owner

## Result / Responsibility

Ensure one isolated exact Git-backed workspace for a new target-mode ChangeSet, pinned to an exact target branch source and recoverable/idempotent through a durable workspace journal.

## Scenario behavior realized

Supports:
- `FI-RPKG-REALIZE-CURRENT-PACKAGE`
- planned `FI-RPKG-REALIZE-REVIEWED-PACKAGE`

Behavior Items:
- supports `BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`
- supports `BI-RPKG-CURRENT-GIT-RETRY-RESUMES`
- supports target exact-source/package realization BIs

## Domain used

Repository Target; Repository Work / ChangeSet; Work Intent reference.

## Slice Implementation Items

### SI-RPKG-WORKSPACE-PINNED-SOURCE
Requirement:
Workspace creation must resolve and persist exact `baseCommit/publishedTip` from the explicit target branch, then create/verify the deterministic ChangeSet branch/worktree in the same Git common repository.

### SI-RPKG-WORKSPACE-JOURNAL-BEFORE-GIT-MUTATION
Requirement:
Persist exact workspace intent before branch/worktree mutation so retry adopts only journal-owned partial effects and fails closed on unjournaled deterministic collisions.

## Tests

`CoreTests` for exact target-branch pinning, deterministic branch/worktree/common-repository verification, idempotency, journal recovery/collision behavior and migration guards. Swing source contracts cover the current diagnostic Start workspace control.

## Evolution Impact

Reviewed-result identity extends the ChangeSet after package publication; it does not require a second workspace owner if current pinned workspace semantics remain sufficient.

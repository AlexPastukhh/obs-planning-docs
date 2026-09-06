# SL-RPKG-11 — Start Work Workspace

Status: active current Slice owner

## Result / Responsibility

Ensure one isolated exact Git-backed workspace for a new target-mode Work, pinned to an exact target branch source and recoverable/idempotent through a durable workspace journal.

## Scenario behavior realized

Supports:
- `FI-RPKG-REALIZE-CURRENT-PACKAGE`
- planned `FI-RPKG-REALIZE-REVIEWED-PACKAGE`

Behavior Items:
- supports `BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`
- supports `BI-RPKG-CURRENT-GIT-RETRY-RESUMES`
- supports target exact-source/package realization BIs

## Domain used

Repository Target; WorkId; selected target `GitWorkspace`; Work Intent.

## Slice Implementation Items

### SI-RPKG-WORKSPACE-PINNED-SOURCE
Requirement:
Workspace creation must resolve and persist exact `baseCommit` from the explicit target branch, persist the worktree, then create/verify the deterministic Work branch/worktree in the same Git common repository.

### SI-RPKG-WORKSPACE-JOURNAL-BEFORE-GIT-MUTATION
Requirement:
Persist exact workspace intent before branch/worktree mutation so retry adopts only journal-owned partial effects and fails closed on unjournaled deterministic collisions.

## Tests

`CoreTests` for exact target-branch pinning, deterministic branch/worktree/common-repository verification, idempotency, journal recovery/collision behavior and migration guards. Swing source contracts cover the current diagnostic Start workspace control.

## Evolution Impact

`EVO-RPKG-RETIRE-CHANGESET-AGGREGATE`: GitWorkspace becomes the narrow owner of repository/worktree/base facts. Package publication/review/finalization state must not be added to it.

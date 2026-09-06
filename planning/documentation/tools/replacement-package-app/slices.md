# Replacement Package App — Slice Portfolio

Status: active target Slice navigation

Feature Interaction and Slice decompositions are intentionally not 1:1.

## Current target slices

| Slice | Current responsibility |
|---|---|
| [`SL-RPKG-01`](slices/SL-RPKG-01-apply-replacement-work.md) | Work-centered replacement-package realization: Apply, Commit applied, Publish/Retry Publish plus automatic composition. |
| [`SL-RPKG-04`](slices/SL-RPKG-04-export-repository-snapshot.md) | Produce exact Local/Committed Repository Snapshot as a separate capability. |
| [`SL-RPKG-09`](slices/SL-RPKG-09-notify-operation-outcomes.md) | Operation/outcome presentation where still consumed; no mutation authority. |
| [`SL-RPKG-10`](slices/SL-RPKG-10-manage-work-intent.md) | Ensure durable exact GitHub Issue Work Intent. |
| [`SL-RPKG-11`](slices/SL-RPKG-11-start-changeset-workspace.md) | Ensure exact persisted Work GitWorkspace. |

## Retired from target executable

Legacy Current Change/Review delivery, ChangeSet navigation, External Interaction management and legacy Finalize/Reopen slices remain historical/source references only. Their deployed behavior belongs to the previous executable and is not a compatibility constraint on this build.

## Source boundary

`Result<T,E>` / `OperationResult<E>` describe operation outcomes. `GitWorkspace`, `ReplacementPackageState` and `PublicationObservation` describe durable facts. There is no target `ApplyExtent`, generic Resume operation or ChangeSet execution-state machine.

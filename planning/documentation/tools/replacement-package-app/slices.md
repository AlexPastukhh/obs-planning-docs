# Replacement Package App — Slice Portfolio

Status: active current Slice navigation

Feature Interaction and Slice decompositions are intentionally not 1:1.

## Current Slice owners

| Slice | Current responsibility |
|---|---|
| [`SL-RPKG-01`](slices/SL-RPKG-01-apply-replacement-work.md) | Replacement-package realization module: explicit Apply, Commit applied, Publish/Retry Publish operations sharing durable `ReplacementPackageState`; automatic OBS-action composition remains an entry adapter. |
| [`SL-RPKG-02`](slices/SL-RPKG-02-inspect-current-change.md) | Derive/persist current legacy ReviewDiff; planned Git-derived diagnostic projection. |
| [`SL-RPKG-03`](slices/SL-RPKG-03-finalize-and-publish-work.md) | Finalize/publication recovery/Reopen compatibility and target Finalize evolution; Finalize remains separate from package Apply/Commit/Publish. |
| [`SL-RPKG-04`](slices/SL-RPKG-04-export-repository-snapshot.md) | Produce exact Local/Committed Repository Snapshot. |
| [`SL-RPKG-05`](slices/SL-RPKG-05-attach-repository-snapshot.md) | Snapshot handoff compatibility while its separate owner remains active. |
| [`SL-RPKG-06`](slices/SL-RPKG-06-deliver-current-change.md) | Legacy Current Change delivery compatibility; no longer exposed as a generic Main Work Window interaction surface. |
| [`SL-RPKG-07`](slices/SL-RPKG-07-select-existing-work-context.md) | Repository/ChangeSet navigation and truthful current/history projection. |
| [`SL-RPKG-08`](slices/SL-RPKG-08-manage-external-interactions.md) | Backend compatibility owner only while remaining handoff consumers exist; generic interaction controls are retired from the selected Main Work Window. |
| [`SL-RPKG-09`](slices/SL-RPKG-09-notify-operation-outcomes.md) | Report meaningful operation outcomes without granting mutation authority. |
| [`SL-RPKG-10`](slices/SL-RPKG-10-manage-work-intent.md) | Ensure durable exact GitHub Issue Work Intent. |
| [`SL-RPKG-11`](slices/SL-RPKG-11-start-changeset-workspace.md) | Ensure isolated exact Git-backed ChangeSet workspace. |

## Source boundary

`Result<T,E>` / `OperationResult<E>` describe operation outcomes. `ReplacementPackageState` and `PublicationObservation` describe durable package/publication facts. The target module does not expose `ApplyExtent` or a generic Resume operation.

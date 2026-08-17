# Replacement Package App Use-Case Registry

Status: active application semantic registry
Scope: independently useful user outcomes of the local Replacement Package App. Buttons, state records and implementation helpers do not receive UC IDs merely because they exist.

Semantic/traceability map: [`USE-CASE-MAP.md`](USE-CASE-MAP.md)
Shared protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)

## 1. Registry Rules

```text
- One current application outcome has one canonical UC-RPKG-* ID.
- One UC may span Java Core, Swing/CLI hosts and persistent local state.
- ZIP discovery, repository registry, ChangeSet browsing, history, settings and ledger mechanics support UCs; they are not standalone semantic outcomes merely because they exist.
- Command meaning remains owned by planning/commands; this registry owns application outcomes only.
```

## 2. Current Use Cases

| ID | Name | Status | Successful result |
|---|---|---|---|
| `UC-RPKG-APPLY` | Apply Verified Replacement Package | active V0.1 | A validated package is overlaid only onto an allowed repository in exact expected/owned local state; an ApplicationAttempt and new cumulative ReviewDiff identity are recorded. |
| `UC-RPKG-REVIEW` | Inspect Current ChangeSet Review State | active V0.1 | The user selects a readable persisted ChangeSet and obtains its current path-scoped cumulative `HEAD → working tree` diff without mutating the real Git index; exact fingerprinting remains internal. |
| `UC-RPKG-FINALIZE` | Finalize Current ChangeSet | active V0.1 | The persisted current cumulative ReviewDiff baseline is revalidated automatically, only owned paths are committed, push is attempted, and push-failure recovery preserves the already-created commit. |
| `UC-RPKG-EXPORT-REPOSITORY` | Export Repository Snapshot ZIP | active V1 | The selected allowed repository is exported read-only as either a Local working-tree snapshot with root diff/base marker or an exact selected committed snapshot with root commit marker; the final ZIP path is copied to clipboard when available. |
| `UC-RPKG-DELIVER-REVIEW` | Deliver Current ReviewDiff to ChatGPT | active V1 | A ChangeSet-bound ordinary ChatGPT conversation receives the exact current ReviewDiff once: native paste remains text or ChatGPT itself converts a large paste to an attachment; Send occurs only after the composer is ready. |
| `UC-RPKG-ATTACH-SNAPSHOT` | Attach Repository Snapshot to ChatGPT | active V1 | A user-selected ordinary ChatGPT conversation receives the app-created Repository Snapshot ZIP as a ready attachment; the extension never presses Send for this use case. |

## 3. Supporting Capabilities

```text
allowed repository registry + persisted selection
OBS-ACTION/archive resolution
package validation
ChangeSet ledger/path ownership + readable browser/history
ApplicationAttempt history
persisted current ReviewDiff restore/refresh
optional Copy/Open ReviewDiff
review-diff handoff setting
repo diff-file service artifact
read-only Local/Committed repository snapshot ZIP export
verified clipboard path handoff
open ordinary ChatGPT conversation inventory + duplicate-tab grouping
ChangeSet → ChatGPT conversation binding
loopback pairing/task queue + one-tab claim
CommittedPendingPush recovery
```

These support the UCs above and do not expand the ChatGPT command protocol.

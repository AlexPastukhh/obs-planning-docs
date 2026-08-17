# Replacement Package App Use-Case Registry

Status: active V0.1 application semantic registry
Scope: independently useful user outcomes of the local Replacement Package App. Buttons, state records and implementation helpers do not receive UC IDs merely because they exist.

Semantic/traceability map: [`USE-CASE-MAP.md`](USE-CASE-MAP.md)
Shared protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)

## 1. Registry Rules

```text
- One current application outcome has one canonical UC-RPKG-* ID.
- One UC may span Java Core, Swing/CLI hosts and persistent local state.
- ZIP discovery, repository registry, ChangeSet browsing, history, settings and ledger mechanics support UCs; they are not standalone semantic outcomes in V0.1.
- Command meaning remains owned by planning/commands; this registry owns application outcomes only.
```

## 2. Current Use Cases

| ID | Name | Status | Successful result |
|---|---|---|---|
| `UC-RPKG-APPLY` | Apply Verified Replacement Package | active V0.1 | A validated package is overlaid only onto an allowed repository in exact expected/owned local state; an ApplicationAttempt and new cumulative ReviewDiff identity are recorded. |
| `UC-RPKG-REVIEW` | Inspect Current ChangeSet Review State | active V0.1 | The user selects a readable persisted ChangeSet and obtains its current path-scoped cumulative `HEAD → working tree` diff without mutating the real Git index; exact fingerprinting remains internal. |
| `UC-RPKG-FINALIZE` | Finalize Current ChangeSet | active V0.1 | The persisted current cumulative ReviewDiff baseline is revalidated automatically, only owned paths are committed, push is attempted, and push-failure recovery preserves the already-created commit. |

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
CommittedPendingPush recovery
```

These support the UCs above and do not expand the ChatGPT command protocol.

# ChangeSet — retired Aggregate

Status: **legacy source only; not a current target Domain/runtime owner**

`ChangeSet` previously combined Work identity, repository/workspace facts, package progress, publication, review, operation diagnostics and Finalize lifecycle into one central Aggregate. That responsibility is retired by `EVO-RPKG-RETIRE-CHANGESET-AGGREGATE`.

Current target ownership is:
- [`WorkId`](work-id.md) — stable logical correlation identity;
- [`Work Intent`](work-intent.md) — semantic intent / managed Issue;
- [`Git Workspace`](git-workspace.md) — exact repository Git execution context;
- [`Replacement Package State`](replacement-package-state.md) — one exact package realization.

The target executable entry paths — Start workspace, Apply Package, Commit applied, Publish/Retry Publish and automatic `OBS-ACTION apply-package` — do not create, read or update `Core.ChangeSet` to decide package/workspace behavior.

`Core.ChangeSet` may remain temporarily in source for unreachable retired code while mechanical deletion is completed. Its presence in source is not current behavior authority and no new requirement may be added to it.

No persisted legacy ChangeSet migration is required. Old persisted works and legacy review/finalize behavior remain owned by the already-deployed old executable.

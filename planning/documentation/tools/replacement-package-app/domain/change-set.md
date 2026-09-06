# ChangeSet — retired target Aggregate

Status: transitional current-runtime reference; **retired as a target Domain owner**

`ChangeSet` previously combined Work identity, repository/workspace facts, package progress, publication, review, operation diagnostics and Finalize lifecycle into one central Aggregate. That responsibility is retired by `EVO-RPKG-RETIRE-CHANGESET-AGGREGATE`.

Target ownership is now:
- [`WorkId`](work-id.md) — stable correlation identity;
- [`Work Intent`](work-intent.md) — semantic intent / managed Issue;
- [`Git Workspace`](git-workspace.md) — exact repository Git execution context;
- [`Replacement Package State`](replacement-package-state.md) — one exact package realization;
- Finalize/review owners remain separate and evolve only when their Features require it.

Current source still contains `Core.ChangeSet` as a **transitional runtime authority** inside current workspace/package mechanics, including the automatic path and parts of modular Commit/Publish. No new target requirement may be added to that record. Runtime cutover must move those decisions to `GitWorkspace` / `ReplacementPackageState` before this reference can become legacy-only.

No persisted legacy ChangeSet migration is required for the new EXE: old works remain owned by the already-deployed old build.

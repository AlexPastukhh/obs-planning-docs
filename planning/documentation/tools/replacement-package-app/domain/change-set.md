# ChangeSet — retired target Aggregate

Status: legacy compatibility reference only; **not a target Domain owner**

`ChangeSet` previously combined Work identity, repository/workspace facts, package progress, publication, review, operation diagnostics and Finalize lifecycle into one central Aggregate. That responsibility is retired by `EVO-RPKG-RETIRE-CHANGESET-AGGREGATE`.

Target ownership is now:
- [`WorkId`](work-id.md) — stable correlation identity;
- [`Work Intent`](work-intent.md) — semantic intent / managed Issue;
- [`Git Workspace`](git-workspace.md) — exact repository Git execution context;
- [`Replacement Package State`](replacement-package-state.md) — one exact package realization;
- Finalize/review owners remain separate and evolve only when their Features require it.

Current source still contains `Core.ChangeSet` for legacy runtime mechanics and old EXE behavior. No new target requirement may be added to that record. Existing legacy Scenario/Slice links may reference this tombstone until runtime cutover removes those references.

No persisted legacy ChangeSet migration is required for the new EXE: old works remain owned by the already-deployed old build.

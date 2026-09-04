# Replacement Package App — Slice Portfolio

Status: active current Slice navigation
Purpose: map current implementation responsibilities to focused Slice owners without duplicating Scenario BI text, Domain semantics or class/method traces.

Feature Interaction and Slice decompositions are intentionally not 1:1. A Slice may realize several FIs/BIs and one FI may require several Slices.

## Current Slice owners

| Slice | Current responsibility |
|---|---|
| [`SL-RPKG-01`](slices/SL-RPKG-01-apply-replacement-work.md) | Validate/realize replacement work; target-mode Apply→Commit→Publish composition plus legacy Apply. |
| [`SL-RPKG-02`](slices/SL-RPKG-02-inspect-current-change.md) | Derive/persist current legacy ReviewDiff; planned Git-derived diagnostic projection. |
| [`SL-RPKG-03`](slices/SL-RPKG-03-finalize-and-publish-work.md) | Legacy Finalize/publication recovery/Reopen. Planned target integration ownership remains TBD through Requirements Discovery. |
| [`SL-RPKG-04`](slices/SL-RPKG-04-export-repository-snapshot.md) | Produce exact Local/Committed Repository Snapshot. |
| [`SL-RPKG-05`](slices/SL-RPKG-05-attach-repository-snapshot.md) | Deliver exact Snapshot through shared ChatGPT handoff capability. |
| [`SL-RPKG-06`](slices/SL-RPKG-06-deliver-current-change.md) | Deliver exact legacy Current Change through shared ChatGPT handoff capability. |
| [`SL-RPKG-07`](slices/SL-RPKG-07-select-existing-work-context.md) | Repository/ChangeSet navigation and truthful current/history projection. |
| [`SL-RPKG-08`](slices/SL-RPKG-08-manage-external-interactions.md) | Persist/project current actionable/attention handoff truth. |
| [`SL-RPKG-09`](slices/SL-RPKG-09-notify-operation-outcomes.md) | Report meaningful operation outcomes without granting mutation authority. |
| [`SL-RPKG-10`](slices/SL-RPKG-10-manage-work-intent.md) | Ensure durable exact GitHub Issue Work Intent. |
| [`SL-RPKG-11`](slices/SL-RPKG-11-start-changeset-workspace.md) | Ensure isolated exact Git-backed ChangeSet workspace. |

## Shared implementation

[`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) owns the reusable exact attachment / guarded Send responsibility consumed by `SL-RPKG-05` and `SL-RPKG-06`.

## Source boundary

These Slice owners define current durable implementation responsibility, selected BI/Domain relations, non-trivial `SI-*` constraints, proof responsibility and affected Evolution Impact. Planned Scenario dependencies do not assign future reviewed-result/PR/integration/final-record behavior to a Slice merely because it is adjacent to current behavior; downstream Requirements Discovery selects that ownership. Exact classes, methods, journal record layouts, Git commands and Swing wiring remain source/test authority unless they become durable semantic/contract constraints.

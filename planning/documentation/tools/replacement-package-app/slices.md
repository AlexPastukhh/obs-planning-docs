# Replacement Package Workflow — Slice Portfolio

Status: active current/planned Slice navigation
Purpose: one Slice catalog for the connected Replacement Package Builder + Replacement Package App workflow without duplicating Scenario BI text, Domain semantics or class/method traces.

Feature Interaction and Slice decompositions are intentionally not 1:1. A Slice may realize several FIs/BIs and one FI may require several Slices.

## Current App Slice owners

| Slice | Current responsibility |
|---|---|
| [`SL-RPKG-01`](slices/SL-RPKG-01-apply-replacement-work.md) | Current Apply→Commit→Publish + legacy Apply. |
| [`SL-RPKG-02`](slices/SL-RPKG-02-inspect-current-change.md) | Derive/persist current legacy ReviewDiff. |
| [`SL-RPKG-03`](slices/SL-RPKG-03-finalize-and-publish-work.md) | Legacy Finalize/publication recovery/Reopen. |
| [`SL-RPKG-04`](slices/SL-RPKG-04-export-repository-snapshot.md) | Produce exact Local/Committed Repository Snapshot. |
| [`SL-RPKG-05`](slices/SL-RPKG-05-attach-repository-snapshot.md) | Deliver exact Snapshot through shared ChatGPT handoff capability. |
| [`SL-RPKG-06`](slices/SL-RPKG-06-deliver-current-change.md) | Deliver exact legacy Current Change through shared ChatGPT handoff capability. |
| [`SL-RPKG-07`](slices/SL-RPKG-07-select-existing-work-context.md) | Repository/ChangeSet navigation and truthful current/history projection. |
| [`SL-RPKG-08`](slices/SL-RPKG-08-manage-external-interactions.md) | Persist/project current actionable/attention handoff truth. |
| [`SL-RPKG-09`](slices/SL-RPKG-09-notify-operation-outcomes.md) | Report meaningful operation outcomes without granting mutation authority. |
| [`SL-RPKG-10`](slices/SL-RPKG-10-manage-work-intent.md) | Current App Issue creation/recovery. |
| [`SL-RPKG-11`](slices/SL-RPKG-11-start-changeset-workspace.md) | Current App logical branch/worktree creation. |

## Target Slice allocation

The planned Builder/App Scenarios identify future behavior, but the target Slice decomposition is **not selected yet**.

Existing Slices may be affected, reused, narrowed, split or retired. An `Evolution Impact` section on a current Slice records migration pressure and reusable current mechanics; it does not by itself make that Slice the future owner of the target FI/BI family.

In particular, this catalog does not yet select:
- a dedicated reviewed-result confirmation Slice;
- a dedicated Ensure-PR Slice;
- `SL-RPKG-03` as the final owner of all target Finalize/logging behavior;
- `SL-RPKG-01` as the final owner of all route composition behavior.

Those allocations are decided in the next Slice realization review after Domain boundaries are selected.

## Builder Slice boundary

No Builder Slice portfolio is selected merely by moving the Builder Scenario into this planning root.

When implementation planning identifies focused Builder implementation responsibilities for Start Work, exact package build, replay/review, controlled Issue updates or related behavior, their Slice owners are added under this same `slices/` directory/catalog with authoritative BI references.

Do not create a parallel Builder Slice documentation tree.

## Shared implementation

[`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) owns the current reusable exact attachment / guarded Send responsibility consumed by `SL-RPKG-05` and `SL-RPKG-06`.

Future Builder/App shared implementation owners belong under `shared-implementation/` only after genuine reusable HOW responsibility is selected. Cross-module use alone does not justify a shared owner.

## Source boundary

Slice owners define durable implementation responsibility, selected BI/Domain relations, non-trivial `SI-*` constraints, proof responsibility and affected Evolution Impact. Exact classes, methods, journal record layouts, Git commands and UI wiring remain source/test authority unless they become durable semantic/contract constraints.

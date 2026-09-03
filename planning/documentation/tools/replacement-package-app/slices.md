# Replacement Package Workflow — Slice Portfolio

Status: active current/planned Slice navigation
Purpose: one Slice catalog for the connected Replacement Package Builder + Replacement Package App workflow without duplicating Scenario BI text, Domain semantics or class/method traces.

Feature Interaction and Slice decompositions are intentionally not 1:1. A Slice may realize several FIs/BIs and one FI may require several Slices.

## Current App Slice owners

| Slice | Current responsibility |
|---|---|
| [`SL-RPKG-01`](slices/SL-RPKG-01-apply-replacement-work.md) | Current Apply→Commit→Publish + legacy Apply; planned reuse for handoff-selected Apply Only / Apply And Publish / Apply And Finalize routes. |
| [`SL-RPKG-02`](slices/SL-RPKG-02-inspect-current-change.md) | Derive/persist current legacy ReviewDiff; planned Git-derived diagnostic projection. |
| [`SL-RPKG-03`](slices/SL-RPKG-03-finalize-and-publish-work.md) | Legacy Finalize/publication recovery/Reopen; planned target PR + reviewed-result Finalize + Final Work Record + Issue close. |
| [`SL-RPKG-04`](slices/SL-RPKG-04-export-repository-snapshot.md) | Produce exact Local/Committed Repository Snapshot. |
| [`SL-RPKG-05`](slices/SL-RPKG-05-attach-repository-snapshot.md) | Deliver exact Snapshot through shared ChatGPT handoff capability. |
| [`SL-RPKG-06`](slices/SL-RPKG-06-deliver-current-change.md) | Deliver exact legacy Current Change through shared ChatGPT handoff capability. |
| [`SL-RPKG-07`](slices/SL-RPKG-07-select-existing-work-context.md) | Repository/ChangeSet navigation and truthful current/history projection. |
| [`SL-RPKG-08`](slices/SL-RPKG-08-manage-external-interactions.md) | Persist/project current actionable/attention handoff truth. |
| [`SL-RPKG-09`](slices/SL-RPKG-09-notify-operation-outcomes.md) | Report meaningful operation outcomes without granting mutation authority. |
| [`SL-RPKG-10`](slices/SL-RPKG-10-manage-work-intent.md) | Current App Issue creation/recovery; planned target migrates creation to Builder and leaves consumer verification/adoption. |
| [`SL-RPKG-11`](slices/SL-RPKG-11-start-changeset-workspace.md) | Current App logical branch/worktree creation; planned target consumes Builder-established work branch and ensures only its execution representation. |

## Builder Slice boundary

No Builder Slice portfolio is selected merely by moving the Builder Scenario into this planning root.

When implementation planning identifies focused Builder implementation responsibilities for Start Work, exact package build, replay/review, controlled Issue updates or related behavior, their Slice owners are added under this same `slices/` directory/catalog with authoritative BI references.

Do not create a parallel Builder Slice documentation tree.

## Shared implementation

[`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) owns the current reusable exact attachment / guarded Send responsibility consumed by `SL-RPKG-05` and `SL-RPKG-06`.

Future Builder/App shared implementation owners belong under `shared-implementation/` only after genuine reusable HOW responsibility is selected. Cross-module use alone does not justify a shared owner.

## Source boundary

Slice owners define durable implementation responsibility, selected BI/Domain relations, non-trivial `SI-*` constraints, proof responsibility and affected Evolution Impact. Exact classes, methods, journal record layouts, Git commands and UI wiring remain source/test authority unless they become durable semantic/contract constraints.

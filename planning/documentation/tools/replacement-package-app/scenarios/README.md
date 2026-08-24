# Replacement Package App Scenario Catalog

Status: selected target application Scenario navigation; practical feedback corrected Scenario boundary
Profile: Modular / Medium SDS
Application plan: [`../application-plan.md`](../application-plan.md)

## Target Scenario Inventory

| Scenario | Status | Real-life Need / independently meaningful result |
|---|---|---|
| [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — Complete Prepared Repository Work | selected target; partly implemented | Safely bring prepared repository work into the correct local repository, understand its current state and finish/publish that logical work without capturing unrelated work. |
| [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) — Provide Repository Context For Further Work | selected target; core export/attach implemented | Produce an exact portable repository context and, when useful, make that context ready in the intended ChatGPT conversation without changing repository work. |
| [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) — Provide Current Change For Review / Continuation | selected target; core delivery implemented | Give the intended ChatGPT conversation the exact current change for one logical work item without manual large-diff handling, or preserve a truthful failed/uncertain/cancelled outcome. |

Scenario boundaries are user-world Situation/Need/Desired Result boundaries. `Apply`, `Refresh Review`, `Finalize`, `Retry Push`, explicit `Reopen ChangeSet`, `Change Repository Location`, `Cancel`, notifications, selectors, `Export`, `Bind`, `Send` and `Attach` remain actions/branches/Behavior/Slices unless they independently establish a separate real-life Need/result.

Slice boundaries are reviewed independently. One Scenario may require several Slices, and one Slice may support several Scenarios.

## Current / Target Realization Relationship

```text
Current source realization after this package:
SL-RPKG-01..SL-RPKG-09

Practical correction in this package:
SL-RPKG-06 direct composer preparation/state boundary
SL-RPKG-07 unified ChangeSet selector + unavailable-target query behavior
SL-RPKG-08 current/actionable interaction projection
SL-RPKG-01 ownership/adoptability diagnostic detail
```

Implementation existence and operational acceptance remain separate: source/tests may realize a Scenario/Slice while its Windows/Swing/Edge practical card is still pending.

## Supporting Meaning

- shared Scenario DATA + cross-cutting Behavior + Requirements: [`../application-plan.md`](../application-plan.md)
- spatial/visual meaning: [`../screens.md`](../screens.md)
- Domain target working model: [`../domain-draft.md`](../domain-draft.md)
- current/target implementation Slice decomposition: [`../slices.md`](../slices.md)
- cross-Slice proof strategy: [`../testing-plan.md`](../testing-plan.md)

## Legacy Compatibility

Historical operation-shaped files remain compatibility stubs because existing notes/links may reference them:

- `SCN-RPKG-APPLY.md` → `SL-RPKG-01`
- `SCN-RPKG-REVIEW.md` → `SL-RPKG-02`
- `SCN-RPKG-FINALIZE.md` → `SL-RPKG-03`
- `SCN-RPKG-EXPORT-REPOSITORY.md` → `SL-RPKG-04`
- `SCN-RPKG-ATTACH-SNAPSHOT.md` → `SL-RPKG-05`
- `SCN-RPKG-DELIVER-REVIEW.md` → `SL-RPKG-06`

`SCN-RPKG-FIND-EXISTING-WORK.md` is retained only as a retired planning note. Practical feedback showed that choosing existing work is ordinary shared ChangeSet navigation inside other user goals, not an independently meaningful Scenario.

Those legacy/retired files are not current Scenario semantic owners.

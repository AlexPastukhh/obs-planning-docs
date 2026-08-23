# Replacement Package App Scenario Catalog

Status: selected target application Scenario navigation
Profile: Modular / Medium SDS
Application plan: [`../application-plan.md`](../application-plan.md)

## Target Scenario Inventory

| Scenario | Status | Real-life Need / independently meaningful result |
|---|---|---|
| [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — Complete Prepared Repository Work | selected target; partly implemented | Safely bring prepared repository work into the correct local repository, understand its current state and finish/publish that logical work without capturing unrelated work. |
| [`SCN-RPKG-FIND-EXISTING-WORK`](SCN-RPKG-FIND-EXISTING-WORK.md) — Find And Open Existing Repository Work | selected target; not implemented as global work navigation | Understand what persisted work exists across registered repositories and open the exact work the user wants to continue. |
| [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) — Provide Repository Context For Further Work | selected target; core export/attach implemented | Produce an exact portable repository context and, when useful, make that context ready in the intended ChatGPT conversation without changing repository work. |
| [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) — Provide Current Change For Review / Continuation | selected target; core delivery implemented | Give the intended ChatGPT conversation the exact current change for one logical work item without manual large-diff handling, or preserve a truthful failed/uncertain/cancelled outcome. |

Scenario boundaries are user-world Situation/Need/Desired Result boundaries. `Apply`, `Refresh Review`, `Finalize`, `Retry Push`, explicit `Reopen ChangeSet`, `Change Repository Location`, `Cancel`, notifications, selectors, `Export`, `Bind`, `Send` and `Attach` remain actions/branches/Behavior/Slices unless they independently establish a separate real-life Need/result.

Slice boundaries are reviewed independently. One Scenario may require several Slices, and one Slice may support several Scenarios.

## Current / Target Realization Relationship

```text
Current implementation:
SL-RPKG-01..SL-RPKG-06

Selected target additions/changes:
SL-RPKG-01 expanded
SL-RPKG-04 readiness update
SL-RPKG-07 Discover And Open Existing Work
SL-RPKG-08 Manage External Interactions
SL-RPKG-09 Notify Operation Outcomes
```

A target Scenario/Slice entry in this catalog does not claim the corresponding Java/extension behavior is already implemented or operationally accepted.

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

`SCN-RPKG-FIND-EXISTING-WORK` has no historical operation-shaped UC/Scenario identity; it is selected directly from the newly confirmed user-world Need.

Those legacy files are not current Scenario semantic owners.

# Replacement Package App Scenario Catalog

Status: active application Scenario navigation
Profile: Modular / Medium SDS
Application plan: [`../application-plan.md`](../application-plan.md)

## Current Scenario Inventory

| Scenario | Status | Real-life Need / independently meaningful result |
|---|---|---|
| [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) — Complete Prepared Repository Work | preliminary current | Safely bring prepared repository work into a local repository, understand its current state, and finish/publicly publish that logical work without capturing unrelated work. |
| [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) — Provide Repository Context For Further Work | preliminary current | Produce an exact portable repository context and, when useful, make that context available in the intended ChatGPT conversation without changing repository work. |
| [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) — Provide Current Change For Review / Continuation | preliminary current | Give the intended ChatGPT conversation the exact current change for one logical work item so review/continuation can proceed without manual large-diff handling. |

These boundaries are intentionally user-world/Need/result shaped. `Apply`, `Refresh Review`, `Finalize`, `Retry Push`, `Export ZIP`, `Bind`, `Send` and `Attach` are actions/branches or implementation Slices, not separate Scenarios by default.

## Supporting Meaning

- shared/current Scenario DATA + cross-cutting Behavior + Requirements: [`../application-plan.md`](../application-plan.md)
- spatial/visual meaning: [`../screens.md`](../screens.md)
- Domain discovery/current working model: [`../domain-draft.md`](../domain-draft.md)
- implementation Slice decomposition/current realization: [`../slices.md`](../slices.md)
- cross-Slice proof strategy: [`../testing-plan.md`](../testing-plan.md)

## Legacy Compatibility

The historical operation-shaped files remain as compatibility stubs because existing notes/links may reference them:

- `SCN-RPKG-APPLY.md` → `SL-RPKG-01`
- `SCN-RPKG-REVIEW.md` → `SL-RPKG-02`
- `SCN-RPKG-FINALIZE.md` → `SL-RPKG-03`
- `SCN-RPKG-EXPORT-REPOSITORY.md` → `SL-RPKG-04`
- `SCN-RPKG-ATTACH-SNAPSHOT.md` → `SL-RPKG-05`
- `SCN-RPKG-DELIVER-REVIEW.md` → `SL-RPKG-06`

Those files are not current Scenario semantic owners.

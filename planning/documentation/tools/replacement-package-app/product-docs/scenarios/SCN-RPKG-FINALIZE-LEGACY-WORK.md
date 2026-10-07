# Finalize Legacy Work

State: retained legacy behavior in the previous deployed executable.

## Actor and need

A person working with an existing legacy ChangeSet has reviewed its cumulative change and wants to finish and publish that work. Later, they may explicitly decide to reopen it.

## Situation

The exact Repository Target and legacy ChangeSet are selected. A fresh, exact Current Change is available through [Inspect Current Change](../features/F-RPKG-INSPECT-CURRENT-CHANGE.md). These controls and stored records belong to the previous executable.

## Interactions

1. The person inspects the exact current legacy change and requests [Finalize Legacy Work](../features/F-RPKG-FINALIZE-LEGACY-WORK.md).
2. The application requires fresh review context and limits staging to the current ChangeSet's owned paths.
3. The application finalizes and publishes the legacy work, exposing the resulting state.
4. If local finalization succeeds but remote publication fails, the person sees Publication Pending and retains the completed local work.
5. Reopening finalized work requires an explicit, guarded person action.

## Desired outcome and alternatives

Only the selected legacy work is finalized. Stale review context or unrelated paths prevent unsafe completion. Publication failure preserves local success. Navigating to a different work does not silently change an already-started effect.

## Planned replacement

[Introduce Work Finalization](../../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) establishes [a separate reviewed-result Finalize](../features/F-RPKG-FINALIZE-REPOSITORY-WORK.md). Its authority is the exact reviewed published repository result; the legacy route is not used as its default implementation contract.

## Sources

[Legacy Finalize and Publish responsibility](../../slices/SL-RPKG-03-finalize-and-publish-work.md), [current target Screen boundary](../../screens.md).

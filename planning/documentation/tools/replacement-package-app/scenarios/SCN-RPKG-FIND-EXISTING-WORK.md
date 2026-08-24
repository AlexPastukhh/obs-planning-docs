# Retired Scenario Note — `SCN-RPKG-FIND-EXISTING-WORK`

Status: retired as a current Scenario by practical-realization feedback
Superseded by: shared `BI-RPKG-SELECT-EXISTING-WORK-CONTEXT` + `SL-RPKG-07 Select Existing Work Context`
Application plan: [`../application-plan.md`](../application-plan.md)

The earlier draft treated “find/open existing work” as an independently meaningful user-world Scenario. Practical use of the first implemented UI showed that this boundary was artificial: the user is not trying to complete a separate discovery outcome; they are choosing the ChangeSet context needed for Complete Repository Work, Provide Current Change, or another operation.

Current meaning:

```text
Repository + ChangeSet are linked current-context selectors.

ChangeSet default scope
→ unfinished ChangeSets for current Repository Target

All repositories
→ the same ChangeSet selector expands to unfinished ChangeSets across registered targets

Show history
→ adds Finalized within the selected scope

select ChangeSet from another registered target
→ select that exact Repository Target + ChangeSet
→ navigation only; no Apply/Reopen/Finalize/Send side effect
```

An unavailable stored Repository Target remains truthful query state and must not be silently substituted by another clone. It must not crash or invalidate the rest of the ChangeSet selector projection.

This file remains only so historical links/logs have a stable explanation for the retired Scenario ID. It is not a current Scenario semantic owner.

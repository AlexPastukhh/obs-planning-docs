# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: preliminary current Scenario owner
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User has prepared repository work (normally a replacement package) and a local registered Git repository. |
| Starting situation | The intended change is not yet safely completed in the local/published repository state. |
| Need / motivation | Bring the prepared work into the correct repository, understand its current state, and finish it without losing or capturing unrelated work. |
| Goal / intent | Complete one logical repository-work item safely and truthfully. |
| Observable result | Intended work is applied and either finalized/published or remains in a clear recoverable publication-pending state; unrelated work is preserved. |

## Entry Points

- package ZIP and/or OBS-ACTION available;
- existing Active ChangeSet continuation;
- existing Publication Pending work requiring completion/recovery.

## Main Flow

1. User selects/uses the intended repository and prepared work input.
2. Application revalidates the repository target and determines whether the whole package/work transition is applicable.
3. If applicable, application applies the complete transition and establishes/continues one logical ChangeSet.
4. Application makes the current cumulative change available; user may inspect/refresh/copy/open it when useful.
5. User may apply later continuation/correction packages to the same logical ChangeSet.
6. User chooses to finish the work.
7. Application verifies that completion still corresponds to the current change, isolates only this logical work, commits/publishes it, and releases ownership only when truly finalized.
8. If local commit succeeds but publication cannot complete, the application preserves the work as Publication Pending and provides a safe recovery route.

## Branches / Extensions

### Package not applicable
Repository mismatch, ownership conflict, dirty-unowned state, base mismatch or other precondition stops before target mutation.

### Current change became stale
Finalize stops; user re-establishes the current change before retrying.

### Publication remote advanced
Safe reconciliation/retry may continue when preservation is provable. Unsafe/ambiguous overlap leaves work pending rather than overwriting remote/local work.

### No net change
Logical work may finish without creating/pushing an unnecessary commit.

## Scenario DATA

- `DATA-RPKG-REPOSITORY-TARGET`
- `DATA-RPKG-REPLACEMENT-PACKAGE`
- `DATA-RPKG-CHANGESET`
- `DATA-RPKG-APPLICABILITY`
- `DATA-RPKG-CURRENT-CHANGE`
- `DATA-RPKG-OPERATION-RESULT`

## Behavior Items

- revalidate concrete repository at operation time;
- check complete applicability before mutation;
- preserve repository-scoped exclusive path ownership;
- preserve independent/dirty-unowned work;
- expose current cumulative work without making inspection an approval gate;
- finalize only current selected work;
- preserve successful local work through publication failure;
- no force publication/overwrite when safe preservation cannot be proven;
- release ownership only after true finalization;
- preserve actionable technical diagnostics for failure/recovery.

## Requirements

Related shared requirements: `REQ-RPKG-01..06` in [`../application-plan.md`](../application-plan.md).

## Visual / Screen References

Primary: [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface).

The user should not need internal SHA/commit graph knowledge to understand whether work is Active, Publication Pending or Finalized.

## Acceptance

- wrong/unregistered/drifted target cannot be mutated;
- one work item cannot steal another same-repository owned path;
- same relative path in another concrete repository does not itself block work;
- current change can be inspected/restored without changing real index;
- Finalize captures only selected work;
- publication failure preserves logical work and does not create a second logical work item on retry;
- Finalized releases ownership.

## Attached Q/R/P

See `P-RPKG-OWNERSHIP-SCOPE`, `P-RPKG-BASE-EQUIVALENCE`, `Q-RPKG-UNBORN-REPOSITORY` in [`../application-plan.md`](../application-plan.md).

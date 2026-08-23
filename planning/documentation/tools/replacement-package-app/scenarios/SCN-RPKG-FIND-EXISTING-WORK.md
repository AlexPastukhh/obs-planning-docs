# SCN-RPKG-FIND-EXISTING-WORK — Find And Open Existing Repository Work

Status: selected target Scenario owner / implementation pending
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User has persisted Replacement Package App work spread across one or more registered local repositories and may not remember which repository contains the work they need. |
| Starting situation | No particular ChangeSet is yet selected/current for the next task. |
| Need / motivation | Understand what existing work exists and open the desired logical work without manually browsing repositories first. |
| Goal / intent | Establish the exact existing work context to continue. |
| Observable result | The chosen ChangeSet is current, its exact concrete Repository Target is selected, and its authoritative lifecycle/latest-result context is visible; if that target is unavailable, the work remains visible with a truthful unavailable result. |

## Main Flow

1. User opens the repository-independent Existing Work view.
2. Application reads the persisted global work projection across registered Repository Targets without mutating Git/repository state.
3. By default the view includes unfinished work only: Active + Publication Pending. `Show History` adds all Finalized work.
4. Within unfinished work, error-marked rows are ordered first; remaining unfinished work is ordered by most recent activity. Finalized history is not pulled into the default list by operation failure.
5. User selects one ChangeSet.
6. Application selects that ChangeSet's exact stored Repository Target and the ChangeSet itself as current navigation context.
7. The user can continue through current-change inspection, completion/recovery or current-change delivery as appropriate. When selected work is Finalized and history is shown, the UI may expose explicit `Reopen ChangeSet` as an entry into the Complete Repository Work recovery branch; selection itself remains read-only.

## Branches / Extensions

### Repository Target unavailable
The ChangeSet remains visible. Selection does not silently substitute another registered clone sharing the same Repository Identity. The UI reports that the exact target is unavailable and offers ordinary repository-management recovery such as explicit `Change Repository Location` when appropriate.

### Finalized history
Finalized work is hidden from the normal list. `Show History` exposes all Finalized records. Selecting a Finalized row does not change lifecycle. The target UI exposes `Reopen ChangeSet` only for an explicitly selected Finalized record while history is shown; the Reopen transition itself belongs to Complete Repository Work / SL-03 lifecycle behavior. If Reopen fails, the row remains ordinary Finalized history: failure is communicated by notification/result/diagnostics, not a persistent ChangeSet marker.

### Latest operation failure
One compact persisted latest ChangeSet-linked outcome drives the error marker/reason for Active/Publication Pending work. A later relevant successful operation clears the marker. This marker does not apply to Finalized history.

### Navigation only
Selecting work may change current repository/ChangeSet UI context, but it does not Apply, retry, finalize, deliver or otherwise authorize repository/external side effects.

## Scenario DATA

- `DATA-RPKG-REPOSITORY-TARGET`
- `DATA-RPKG-REPOSITORY-IDENTITY`
- `DATA-RPKG-REPOSITORY-LOCATION`
- `DATA-RPKG-CHANGESET`
- `DATA-RPKG-OPERATION-RESULT`

The global work row itself is a query/read projection, not a Domain Entity.

## Behavior Items

- aggregate persisted ChangeSet navigation across registered Repository Targets without creating a cross-repository mutation boundary;
- selecting a ChangeSet deterministically establishes that exact target + work context;
- same-origin clones remain distinct concrete targets;
- unavailable targets stay visible rather than being silently replaced or dropped;
- latest failed relevant operation on unfinished work exposes one error marker + concise reason; Finalized history has no persistent marker;
- navigation does not become operation authority;
- history selection may expose the explicit Reopen action but never performs Reopen automatically.

## Requirements

Related shared requirements: `REQ-RPKG-02`, `REQ-RPKG-13`, `REQ-RPKG-16`, `REQ-RPKG-18` in [`../application-plan.md`](../application-plan.md).

## Visual / Screen References

- [`SCR-RPKG-GLOBAL-WORK`](../screens.md#scr-rpkg-global-work--existing-work)
- [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface)

## Acceptance

- several repositories appear in one work projection without requiring repository-first browsing;
- two clones sharing one Repository Identity remain distinguishable by concrete target;
- selecting one ChangeSet selects its exact target + work context;
- same relative paths in different repositories do not affect navigation/ownership truth;
- unavailable target remains visible and is not silently substituted;
- default/history/error ordering follows the selected policy;
- selection causes no Git/filesystem mutation;
- when `Show History` is enabled and a Finalized ChangeSet is selected, Reopen is visibly available but remains a separate explicit guarded action.

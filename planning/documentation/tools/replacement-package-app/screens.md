# Replacement Package App — Screens

Status: active selected current Screen owner
Scope: durable spatial/window meaning for the current Swing application. Scenario behavior remains authoritative in Scenario/FI owners.

## Screen Map

```text
Main Work Window
├─ Repository / ChangeSet navigation
├─ package / workspace / Apply-Commit-Publish / Current Change / Finalize-recovery controls
├─ current operation / External Interaction / outcome surfaces
├─ opens Snapshot Dialog
└─ may open Review Destination Decision before an Apply mutation

Snapshot Dialog
→ freezes repository + mode + export/handoff intent
→ returns to Main Work Window

Review Destination Decision
→ keep existing binding | apply and rebind | cancel
→ returns to prepared Apply flow
```

This owner intentionally does not freeze incidental pixel/layout details. Source owns exact Swing component arrangement.

## Scenario × Screen

| Scenario | Main Work Window | Snapshot Dialog | Review Destination Decision |
|---|---:|---:|---:|
| Complete Prepared Repository Work | primary | — | conditional legacy/title route |
| Provide Repository Context | entry/result | primary input surface | — |
| Provide Current Change (legacy) | primary | — | binding may be established elsewhere; decision is Apply-time only |
| Complete Reviewed Repository Work (planned) | expected primary evolution | — | legacy title-rebind semantics may retire/change |

## Feature Interaction × Screen

- repository-work resolution, Work Intent status, package realization, legacy Current Change and legacy Finalize/recovery are coordinated from the Main Work Window;
- Snapshot materialization intent is collected by the Snapshot Dialog, while downstream delivery state returns to shared Main/interaction surfaces;
- Review Destination Decision exists only when prepared legacy title-assisted rebind conflicts with an existing binding before repository mutation;
- background execution remains bound to its captured operation context even if the visible user selection changes.

## Main Work Window

Purpose:
Expose one navigable current repository/work context, actions that are valid for that context, truthful execution/recovery state and current external interaction/outcome information.

Scenario roles:
- Complete Prepared Repository Work — primary execution/navigation surface;
- Provide Repository Context — Snapshot entry/result access;
- Provide Current Change — legacy Refresh/Copy/Open/Send/navigation;
- planned Complete Reviewed Repository Work — future confirmation/PR/finalize state will evolve here unless a later Screen design selects another spatial model.

Meaningful visible/input/action states:
- exact Repository Target and ChangeSet selection/scope/history;
- unavailable stored target truth;
- package/action input and target-mode vs legacy outcomes;
- Work Intent / workspace / Apply / Commit / Publish current/recovery states;
- legacy Current Change and Finalize/Publication Pending/Reopen controls;
- External Interaction working/attention state;
- meaningful operation outcomes.

Screen Behavior Items:

### SBI-RPKG-WORK-CONTEXT-VISIBLE — Visible work context matches navigation state
Requirement:
The user must be able to identify which Repository Target and logical ChangeSet the current work/navigation surface represents before invoking context-sensitive repository operations.

Reason:
Repository mutations are exact-context operations even though execution authority is revalidated independently of UI selection.

### SBI-RPKG-NAVIGATION-DOES-NOT-RETARGET-IN-FLIGHT-OPERATION — Navigation cannot rewrite captured execution
Requirement:
Changing visible repository/ChangeSet navigation while an operation is running must not retarget that operation.

Reason:
Screen navigation is not mutation authority after the operation context has been captured.

### SBI-RPKG-RECOVERY-STATE-IS-VISIBLE — Recoverable execution truth is exposed
Requirement:
States requiring retry/reconciliation/attention must be distinguishable from clean success and clean failure.

Reason:
The user needs to know whether work is already partially established or publication/delivery may have occurred.

### SBI-RPKG-HISTORY-SELECTION-IS-READ-ONLY — History navigation does not implicitly reopen work
Requirement:
Selecting finalized history must remain read-only until an explicit guarded Reopen action is invoked.

Reason:
Navigation must not silently change repository-work lifecycle or reacquire ownership.

Routes / transitions:
Repository/ChangeSet selectors change current navigation only. Snapshot opens the Snapshot Dialog. Context-sensitive operations return outcomes to the same work surface.

## Snapshot Dialog

Purpose:
Collect one coherent Snapshot operation intent before export begins.

Meaningful visible/input/action states:
- Repository Target inherited/selected from current context;
- Local / Committed source mode;
- export directory;
- Export only / Export+Attach / Export+Attach+Send;
- exact intended conversation when automatic handoff is requested.

Screen Behavior Items:

### SBI-RPKG-SNAPSHOT-INTENT-FROZEN-TOGETHER — Snapshot source and handoff intent are captured together
Requirement:
When Snapshot export begins, source selection, handoff mode and selected destination used by that operation must be frozen together rather than reread from later screen state.

Reason:
The artifact and its downstream intent form one operation context even though export success remains independent from handoff success.

## Review Destination Decision

Purpose:
Resolve a prepared legacy title-assisted destination conflict before repository mutation.

Screen Behavior Items:

### SBI-RPKG-REBIND-DECISION-PRECEDES-MUTATION — Conflicting prepared rebind requires pre-mutation choice
Requirement:
When the prepared exact destination differs from an existing Review binding and current safety rules require confirmation, the user must choose keep / apply-and-rebind / cancel before repository mutation.

Reason:
A post-mutation prompt would make repository success depend on an unresolved destination policy and could surprise the user by silently replacing a binding.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Refactoring:
Legacy approval-oriented Current Change controls may be reduced/relabelled as optional diagnostic/support controls for target work while remaining available for legacy compatibility until retirement.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
Expansion:
Future screen design must make the selected route/result distinctions understandable: Apply Only → applied/uncommitted, Apply And Publish → reviewed published result / pre-integration, Apply And Finalize → integration/final-record/Issue-close outcome, plus truthful recovery/stale-approval states. Exact future layout is deliberately not selected here; the Scenario drives a later Screen design pass.

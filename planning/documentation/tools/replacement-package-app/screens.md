# Replacement Package App — Screens

Status: active selected current Screen owner with planned reviewed-work evolution
Scope: durable spatial/window meaning for the Swing application. Scenario behavior remains authoritative in Scenario/FI owners.

## Current Screen Map

```text
Main Work Window
├─ Repository / ChangeSet navigation
├─ package / workspace / Apply-Commit-Publish / Current Change / Finalize-recovery controls
├─ current operation / External Interaction / outcome surfaces
├─ opens Snapshot Dialog
└─ may open Review Destination Decision before an Apply mutation
```

Current Snapshot and legacy Review Destination behavior remains as implemented; exact component arrangement remains source authority.

## Current Screen Behavior Items

### SBI-RPKG-WORK-CONTEXT-VISIBLE

The user can identify the current Repository Target/logical work context before context-sensitive repository operations.

### SBI-RPKG-NAVIGATION-DOES-NOT-RETARGET-IN-FLIGHT-OPERATION

Changing visible navigation cannot retarget an already captured running operation.

### SBI-RPKG-RECOVERY-STATE-IS-VISIBLE

Recoverable/uncertain execution state is distinguishable from clean success/failure.

### SBI-RPKG-HISTORY-SELECTION-IS-READ-ONLY

History navigation does not implicitly reopen finalized work.

### SBI-RPKG-SNAPSHOT-INTENT-FROZEN-TOGETHER

Snapshot source/handoff intent is frozen together when export starts.

### SBI-RPKG-REBIND-DECISION-PRECEDES-MUTATION

A prepared legacy destination conflict requiring confirmation is decided before repository mutation.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC

Legacy approval-oriented Current Change controls may reduce/relabel to diagnostic/support controls for target work while legacy compatibility remains.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

The planned Main Work Window must support modular continuation of reviewed work and make the relevant exact state visible.

Selected target semantic input surfaces:

```text
manual Commit
→ Commit message input
→ Commit

manual Finalize
→ Pull Request title input
→ Pull Request body/summary input
→ Final Issue comment input
→ Finalize
```

When the same stages are invoked automatically from a reviewed handoff, the App uses the authorized semantic inputs already carried/persisted by that handoff and does not require duplicate manual entry.

The target screen must also expose enough state to distinguish at least:

```text
AppliedUncommitted
CommittedUnpublished
PublicationUncertain
Published / awaiting reviewed-result confirmation
ReviewedPublished / ready for Finalize
Finalization/logging/Issue-close recovery state when incomplete
Finalized
```

Exact future dialog vs inline layout is deliberately not selected here.

### SBI-RPKG-MANUAL-SEMANTIC-INPUT-PARITY — Manual stage input matches automatic stage meaning

Status: planned target.

Requirement:
Manual Commit/Finalize controls must provide the semantic inputs required by the same underlying stage that automatic handoff composition invokes.

Reason:
Modular continuation must not require a different semantic implementation merely because the automatic handoff stopped earlier.

### SBI-RPKG-FINALIZATION-RECOVERY-VISIBLE — Final logging/closure recovery remains visible

Status: planned target.

Requirement:
If integration is established but Final Work Record persistence or Issue closure remains uncertain/incomplete, the screen must expose that truthful recoverable state rather than presenting clean Finalized success.

Reason:
The user must be able to continue the logging/closure tail without blindly repeating integration.

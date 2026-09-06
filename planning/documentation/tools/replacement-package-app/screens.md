# Replacement Package App — Screens

Status: active selected current Screen owner

Scope: durable spatial/window meaning for the Swing application. Feature/Scenario owners remain behavioral authority.

## Screen Map

```text
Main Work Window
├─ Repository / ChangeSet navigation
├─ Archive / OBS-ACTION input
├─ workspace + replacement-package operations
│    ├─ Start workspace
│    ├─ Apply Package
│    ├─ Commit applied
│    ├─ Publish
│    └─ Retry Publish
├─ Current Change diagnostic controls where still required
├─ Finalize / Reopen
├─ operation / outcome / diagnostics
└─ opens Snapshot Dialog
```

The selected Main Work Window no longer exposes Review-chat delivery or generic External Interaction management.

## Main Work Window

Purpose:
Expose one exact current repository/work context and explicit operations valid for that context.

### Replacement Package operation group

`Apply Package`, `Commit applied`, `Publish`, and `Retry Publish` are visually adjacent because they operate on one durable `ReplacementPackageState`, while remaining distinct operations.

`Retry Publish` belongs beside `Publish`. It may reconcile a prior unconfirmed publication without performing another push when confirmation already proves the intended commit.

There is no `Resume package to extent` control.

### Finalize

Finalize remains a separate ChangeSet operation and remains visible. Its message field is `Finalize message`, not a signal that Finalize itself is legacy/removed.

Legacy publication-pending recovery may temporarily be adapted through the visible `Retry Publish` location while legacy lifecycle compatibility remains.

### Retired interaction surface

The Main Work Window does not expose:
- Review chat selection/binding controls;
- Chat delivery / Send current ReviewDiff;
- generic External interactions controls;
- interaction retry/title/bridge controls.

Backend compatibility can remain while independently-owned Snapshot/legacy behavior still requires it. Hidden compatibility does not restore these controls as part of the selected work Screen.

## Screen Behavior Items

### SBI-RPKG-WORK-CONTEXT-VISIBLE
The user can identify the exact Repository Target and logical ChangeSet before context-sensitive repository operations.

### SBI-RPKG-NAVIGATION-DOES-NOT-RETARGET-IN-FLIGHT-OPERATION
Changing visible navigation after operation context capture cannot retarget an in-flight repository operation.

### SBI-RPKG-PACKAGE-OPERATIONS-EXPLICIT
Apply, Commit and Publish are explicit independent operations. Screen presentation must not imply a generic Resume/advance-to-extent command.

### SBI-RPKG-PUBLISH-RETRY-LOCAL
Publication retry/reconciliation is presented with Publish, not with Finalize.

### SBI-RPKG-RECOVERY-STATE-IS-VISIBLE
A missing publication confirmation remains distinguishable from confirmed published/not-published facts.

### SBI-RPKG-HISTORY-SELECTION-IS-READ-ONLY
Selecting finalized history does not implicitly Reopen work.

## Snapshot Dialog

Snapshot remains separately owned. Its current export/handoff behavior is not redefined merely because generic interaction controls are removed from the Main Work Window.

## Evolution Impact

### EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION
Refactoring / Forced Migration:
Expose explicit Apply / Commit / Publish / Retry Publish operations and remove any screen implication of `ApplyExtent`/Resume.

### EVO-RPKG-RETIRE-LEGACY-INTERACTION-SURFACE
Retirement / Forced Migration:
Remove Review-chat delivery and generic interaction management from the selected Main Work Window; preserve Finalize; move publication retry beside Publish.

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Current Change controls may reduce further as the legacy approval authority retires.

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
Reviewed-result/PR/target Finalize surfaces evolve separately and must consume the modular package state rather than reintroduce the old orchestration model.

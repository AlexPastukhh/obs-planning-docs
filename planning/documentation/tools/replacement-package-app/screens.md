# Replacement Package App — Screens

Status: active current target Screen owner

## Main Work Window

```text
Main Work Window
├─ Repository Target
├─ Work ID
├─ Target branch
├─ Archive ZIP
├─ Package ID
├─ OBS-ACTION/1 input
├─ Run OBS Action
├─ Start workspace
├─ Apply Package
├─ Commit applied
├─ Publish
├─ Retry Publish
└─ Operation / Output
```

The target screen is Work-centered. It has no ChangeSet selector, Review chat/delivery controls, generic External Interaction controls, legacy Current Change controls, legacy Finalize/Reopen controls, or `Resume package to extent` action.

### Screen Behavior Items

**SBI-RPKG-WORK-CONTEXT-VISIBLE** — Repository Target, WorkId and target branch are visible before context-sensitive operations.

**SBI-RPKG-NAVIGATION-DOES-NOT-RETARGET-IN-FLIGHT-OPERATION** — an operation captures its inputs before background execution; later UI changes do not retarget it.

**SBI-RPKG-PACKAGE-OPERATIONS-EXPLICIT** — Apply, Commit, Publish and Retry Publish remain distinct actions.

**SBI-RPKG-PUBLISH-RETRY-LOCAL** — Retry Publish belongs beside Publish and may resolve by confirmation without another push.

**SBI-RPKG-AUTOMATIC-COMPOSITION-VISIBLE** — Run OBS Action is an entry composition, not a generic Resume/state-machine command.

Repository Snapshot remains a separately-owned CLI/capability and is not part of this Main Work Window.

Legacy Review/Finalize UI remains available only through the already-deployed old executable; it is not a compatibility requirement for the new target build.

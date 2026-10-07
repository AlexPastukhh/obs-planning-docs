# Provide Repository Snapshot To AI

Identity: `SCN-RPKG-PROVIDE-REPOSITORY-SNAPSHOT-TO-AI`. State: Selected / Planned. Existing Snapshot code is implementation evidence, not accepted current capability.

## Actor and need

A person preparing an AI conversation needs the exact contents of an active repository branch. They want to start the attachment handoff immediately while the application builds the archive in the background.

## Situation

The person can browse one registered repository or all registered repositories. An active branch has at least one commit ahead of its repository's exact `main`: `ahead(main, branch) > 0`. Being behind `main` does not make an ahead branch inactive.

## Interactions

1. The person chooses the repository scope and sees active branches with repository identity, branch name and ahead/behind counts. A `+3/-4` branch is visible; a `+0/-7` branch is not active.
2. The person chooses one exact repository/branch and requests [Create Repository Snapshot](../features/F-RPKG-CREATE-REPOSITORY-SNAPSHOT.md).
3. The application freezes that branch's exact commit, reserves a unique archive path and immediately copies that path to the clipboard.
4. The person can paste the known future path in ChatGPT's file-attachment flow while archive generation continues. The path reservation is not a ready-file result.
5. The application publishes the archive at that same reserved path and reports ready, or reports failure without leaving a misleading final archive.
6. When [Operation Notifications](../features/F-RPKG-OPERATION-NOTIFICATIONS.md) is available, a relevant completion/failure can attract the person's attention while they are elsewhere.

## Desired outcome and alternatives

The person obtains an archive of the selected frozen commit at the already-exposed path. Later branch movement does not change its contents. Collisions are handled before the path is exposed; the application does not silently replace the handed-off path afterward.

If exact `main` cannot be resolved, that repository's active-branch view is unavailable with a reason. The application does not substitute `master` or another baseline. Export failure remains visible, and attachment preparation does not falsely mean that the archive is ready.

Automatic browser/Tampermonkey attachment is an idea without a concrete Step target. It is not required by this scenario. The person's external attachment and Send actions remain their own interactions.

## Sources

[Introduce Repository Snapshot Workflow](../../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md), [Add Operation Notifications](../../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md).

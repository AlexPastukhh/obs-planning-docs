# Inspect Repository In VS Code

State: Selected / Planned. Opening a repository folder and opening a branch Snapshot are distinct planned routes.

## Actor and need

A person reviewing repository context wants to inspect the selected repository folder in VS Code. Alternatively, they want to inspect an exact frozen branch state without accidentally opening the live repository instead.

## Interactions: selected repository folder

1. The person selects a repository context whose exact local folder is known.
2. They request [Open Folder In VS Code](../features/F-RPKG-OPEN-FOLDER-IN-VSCODE.md).
3. The application captures that folder, requests its opening and reports a truthful handoff result.

Later UI selection changes do not redirect the request. The action itself does not edit files, change branches, commit or publish. Accepted handoff is not proof that the person subsequently inspected the folder.

## Interactions: frozen branch Snapshot

1. From the active-branch view described in [Provide Repository Snapshot To AI](SCN-RPKG-PROVIDE-REPOSITORY-SNAPSHOT-TO-AI.md), the person selects an exact repository/branch and requests Snapshot opening.
2. The application uses [Create Repository Snapshot](../features/F-RPKG-CREATE-REPOSITORY-SNAPSHOT.md) to freeze the commit and create its exact Snapshot.
3. The application establishes a local folder representing that same frozen Snapshot source.
4. It uses [Open Folder In VS Code](../features/F-RPKG-OPEN-FOLDER-IN-VSCODE.md) for that exact materialized folder.
5. The person receives the opening outcome while any already-proven Snapshot result remains visible.

## Desired outcome and alternatives

VS Code receives exactly the chosen live folder or the exact materialized frozen Snapshot folder for the chosen route. If Snapshot materialization fails, the application reports that failure and does not fall back to a mutable live repository. An opening failure does not erase a successfully produced Snapshot.

## Open product choice

The Snapshot folder's representation, retention and cleanup policy remain unresolved. The combined route depends on both predecessor capabilities and does not add a second Snapshot or folder-opening contract.

## Sources

[Open Repository Folder In VS Code](../../evolution-steps/EVO-RPKG-OPEN-REPOSITORY-FOLDER-IN-VSCODE.md), [Open Branch Snapshot In VS Code](../../evolution-steps/EVO-RPKG-OPEN-BRANCH-SNAPSHOT-IN-VSCODE.md).

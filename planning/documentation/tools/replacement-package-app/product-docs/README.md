# Replacement Package Application — Product Documentation

This folder describes the application's desired behavior, covering behavior documented as implemented and changes planned through existing Evolution Steps. It contains scenarios, features and the Evolution Steps Map. The previous documentation remains intact.

Scenarios describe an actor's real situation, need, interactions with application features and resulting outcome. Features describe what the application must do, including rules, alternative outcomes and recovery. Implementation design, planning methodology, discovery exercises and test plans are outside this layer.

## Read the product

The application helps AI and people turn explicitly intended repository changes into exact packages, realize those packages and obtain truthful results. The planned workflow gives semantic edits, work history and review decisions to the AI/human actor; the application supplies mechanical capabilities.

### Scenarios

| Actor's need | Scenario | State |
|---|---|---|
| Establish documented work or prepare an isolated workspace | [Establish Current Work Context](scenarios/SCN-RPKG-ESTABLISH-CURRENT-WORK-CONTEXT.md) | Current target executable |
| Realize a supplied package and learn what happened | [Complete Current Repository Work](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | Current target executable, with planned extensions |
| Give ChatGPT the cumulative change for an existing legacy work | [Provide Current Change](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) | Previous deployed executable only |
| Finish or explicitly reopen existing legacy work | [Finalize Legacy Work](scenarios/SCN-RPKG-FINALIZE-LEGACY-WORK.md) | Previous deployed executable only |
| Develop and review changes with mechanical package support | [Develop And Review Repository Work](scenarios/SCN-RPKG-DEVELOP-AND-REVIEW-REPOSITORY-WORK.md) | Selected / Planned |
| Hand off reviewed changes and finalize the exact reviewed result | [Realize Reviewed Repository Work](scenarios/SCN-RPKG-REALIZE-REVIEWED-REPOSITORY-WORK.md) | Selected / Planned |
| Provide AI with an exact active-branch snapshot | [Provide Repository Snapshot To AI](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-SNAPSHOT-TO-AI.md) | Selected / Planned |
| Inspect a selected repository or frozen branch snapshot in VS Code | [Inspect Repository In VS Code](scenarios/SCN-RPKG-INSPECT-REPOSITORY-IN-VSCODE.md) | Selected / Planned; Snapshot-folder details remain open |

### Features

| Application capability | Feature | State |
|---|---|---|
| Establish the exact Work Issue and isolated workspace | [Prepare Current Work Context](features/F-RPKG-PREPARE-CURRENT-WORK-CONTEXT.md) | Current; ownership changes are planned |
| Apply, commit and publish one exact package | [Apply Replacement Package](features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md) | Current; extent, wait and automatic Finalize are planned; URI entry is probable |
| Mechanically construct a package, later with local verification | [Build Replacement Package](features/F-RPKG-BUILD-REPLACEMENT-PACKAGE.md) | Selected / Planned; existing Builder code is evidence |
| Integrate one exact reviewed published result | [Finalize Repository Work](features/F-RPKG-FINALIZE-REPOSITORY-WORK.md) | Selected / Planned |
| Produce the cumulative legacy change without modifying the repository | [Inspect Current Change](features/F-RPKG-INSPECT-CURRENT-CHANGE.md) | Legacy current; target Git-backed diagnostic remains unresolved |
| Deliver that exact diff to one intended conversation | [Deliver Current Change](features/F-RPKG-DELIVER-CURRENT-CHANGE.md) | Legacy current |
| Finish, publish or explicitly reopen legacy work | [Finalize Legacy Work](features/F-RPKG-FINALIZE-LEGACY-WORK.md) | Legacy current |
| Freeze branch contents and produce a Snapshot archive | [Create Repository Snapshot](features/F-RPKG-CREATE-REPOSITORY-SNAPSHOT.md) | Selected / Planned |
| Hand an exact selected folder to VS Code | [Open Folder In VS Code](features/F-RPKG-OPEN-FOLDER-IN-VSCODE.md) | Selected / Planned |
| Attract attention to a background operation's outcome | [Operation Notifications](features/F-RPKG-OPERATION-NOTIFICATIONS.md) | Selected / Planned; details remain open |

## Evolution

[Evolution Steps Map](EVOLUTION-STEPS-MAP.md) preserves the existing map's structure, positions, target resolution, dependencies, completeness and readiness. Its links lead to the unchanged existing Step files. The map's current-state links lead to the behavior descriptions in this folder; historical drivers and the existing prototype inquiry remain source links.

Planned additions are labelled and linked to their Step inside scenarios and features. Probable URI entry remains a candidate. Automatic Snapshot attachment has no concrete Step target and is not included as a promised capability. Typed Operation Results is retained in the map as an implementation foundation with no intended product behavior change.

## Reading state and identity

“Current” means described as current by the existing source documents. This documentation extraction does not certify implementation conformance or constitute a new test run. Legacy behavior belongs to the previous deployed executable; the current target executable does not import old persisted work or expose its review/chat/finalize controls.

“Selected / Planned” describes intended future behavior, with unresolved product choices kept explicit. “Probable” describes an unselected candidate. A copied description does not change a Step's state or readiness. Independent Steps may be realized in different orders; their combined behavior must be checked against the actual available capabilities.

WorkId identifies work. A package is identified by packageId and exact archive SHA-256. Repository, branch, source commit and reviewed result remain exact context throughout each interaction. Schema-1 `changeSetId` is the transport name for WorkId. Human-readable labels and later UI selection do not replace the captured identities.

Source links at the end of each document explain where retained behavior came from. Newly separated descriptions such as preparation, legacy delivery and notifications organize existing behavior; they do not imply that an old Feature registry accepted a new owner or that a capability has become implemented.

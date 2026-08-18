# SCN-RPKG-ATTACH-SNAPSHOT — Attach Repository Snapshot to ChatGPT

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-RPKG-ATTACH-SNAPSHOT`.

Related Application Use Case: [`UC-RPKG-ATTACH-SNAPSHOT`](../USE-CASE-REGISTRY.md)

**Trigger/input:** a Repository Snapshot ZIP has already been created successfully and the user explicitly chooses `Attach to ChatGPT` plus one currently open ordinary ChatGPT conversation.

**Successful result:** the Java side validates that the selected artifact has the Repository Snapshot root contract, queues an attach-only task and gives the claimed ChatGPT tab a short-lived artifact ticket. The extension attaches the exact ZIP and waits until ChatGPT shows the attachment as ready. It records `Attached` and stops.

**Hard boundary:** snapshot tasks have `autoSend=false`; the extension must never click Send. V1 accepts only app-style Repository Snapshot ZIPs, not arbitrary local files or replacement-package ZIPs. Snapshot attachment does not create/change a ChangeSet and cannot change snapshot-export success.

**Primary traceability:**

- bridge contract: [`CHATGPT-BRIDGE.md`](../CHATGPT-BRIDGE.md);
- snapshot contract: [`REPOSITORY-SNAPSHOT.md`](../REPOSITORY-SNAPSHOT.md);
- Java service/UI: [`src/main/java/obs/rpkg/ChatBridgeService.java`](../src/main/java/obs/rpkg/ChatBridgeService.java), [`src/main/java/obs/rpkg/MainWindow.java`](../src/main/java/obs/rpkg/MainWindow.java);
- extension: [`chatgpt-bridge-extension/`](../chatgpt-bridge-extension/);
- automated/manual: [`src/test/java/obs/rpkg/ChatBridgeTests.java`](../src/test/java/obs/rpkg/ChatBridgeTests.java), [`MANUAL-ACCEPTANCE.md`](../MANUAL-ACCEPTANCE.md#chatgpt-bridge--snapshot-attach-only).

## 7. Command ↔ App Compatibility Matrix

| Producer contract | Consumer requirement |
|---|---|
| ZIP root `PACKAGE.json`, `base-files/`, `replacement-files/` | Java Core validates ZIP entries before target mutation. |
| `schemaVersion: 1` | Core accepts only package schema 1. |
| new UUID `packageId` per ZIP | attempt/package identity; action must match manifest exactly. |
| stable UUID `changeSetId` across corrections | ledger continuation identity; Swing may present short UUID only as a display suffix. |
| stable `changeSetLabel` | existing ChangeSet requires same label and Swing uses it as primary readable identity. |
| `repositoryIdentity = github:<owner>/<repo>` | package identity must match the currently selected **registered** local repository's revalidated origin identity. |
| add/replace/delete payload/base rules | exact preflight/result verification. |
| `OBS-ACTION action: apply-package` | only supported V0.1 action. |
| `archive` is hint | selected/resolved candidate is verified by manifest `packageId`. |
| operations absent from action | Core reads operations only from `PACKAGE.json`. |
| repository allowlist absent from action | repository registration/selection is consumer-only local configuration. |
| diff destination absent from action | local setting owns Clipboard / RepoDiffFile / Both. |
| producer stops after ZIP + action | local Java app owns repository registry/apply/history/review/finalize. |
| no Finalize action | selected ChangeSet + its persisted current ReviewDiff baseline + commit message drive Finalize; SHA-256 stays internal and Open/Copy ReviewDiff is not a prerequisite. |

Compatibility review fails if command materialized protocol, canonical protocol, Java parser/validation or tests disagree.

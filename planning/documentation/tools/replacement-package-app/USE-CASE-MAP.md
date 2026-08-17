# Replacement Package App Use-Case Map

Status: active application behavior and traceability map
Scope: trigger → result → boundary for the Replacement Package App and exact links to primary docs/source/tests.

Canonical identities: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md)
Shared protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)

## 1. `UC-RPKG-APPLY` — Apply Verified Replacement Package

**Trigger/input:** user supplies an `OBS-ACTION/1` and/or explicitly selected ZIP plus a selected repository from the local allowed-repository registry.

**Successful result:** the selected local repository is revalidated against its registered path/origin identity; package/repository/path/base validation completes before mutation; add/replace/delete result bytes are verified; one successful ApplicationAttempt is persisted; ChangeSet ownership is updated; a new cumulative ReviewDiff becomes current and the readable ChangeSet entry becomes selectable without manual UUID entry.

**Failure result:** unregistered repository paths, origin drift and other preflight failures do not mutate targets. Mutation failures use bounded verified rollback; inability to verify rollback becomes `STATE_DIVERGED`. Clipboard/repo-file handoff happens after required state persistence and cannot turn a committed Apply transaction into false `FAILED`.

**Primary traceability:**

- protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md);
- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`registerRepository`, `applyPackage`, `applyAction`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#apply-and-rollback).

## 2. `UC-RPKG-REVIEW` — Inspect Current ChangeSet Review State

**Trigger/input:** successful Apply, selecting a persisted ChangeSet, or explicit Refresh Review.

**Successful result:** the user navigates ChangeSets by `changeSetLabel · status · short UUID` within the selected repository. A valid persisted `currentReview` can be reopened after application restart only after its canonical diff file and internal fingerprint are reverified. Refresh Review generates/persists a new cumulative `HEAD → working tree` diff scoped to ChangeSet-owned paths, including untracked adds, without changing `.git/index`. `Copy ReviewDiff` and `Open ReviewDiff` operate on that same integrity-verified canonical file.

**Finalize baseline boundary:** Copy/Open are optional inspection conveniences and never authorize or gate Finalize. The selected ChangeSet's persisted `currentReview` is the implicit Finalize baseline. Its SHA-256 is internal only and is not displayed/entered in the normal Swing/CLI flow. A later Apply or Refresh Review replaces the baseline.

**Boundary:** repo-stored review diff files are service artifacts, never ChangeSet-owned content and never Finalize staging targets.

**Primary traceability:**

- architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md#5-canonical-reviewdiff);
- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md#6-reviewdiff-identity-and-implicit-finalize-baseline);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`getChangeSets`, `currentReview`, `refreshReview`, `verifiedReviewDiffPath`, `copyReviewDiffToClipboard`, `publishReviewDiff`);
- Git boundary: [`src/main/java/obs/rpkg/GitClient.java`](src/main/java/obs/rpkg/GitClient.java);
- UI: [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java).

## 3. `UC-RPKG-FINALIZE` — Finalize Reviewed ChangeSet

**Trigger/input:** selected Active ChangeSet and commit message; or Retry Push for `CommittedPendingPush`.

**Successful result:** Core requires the ChangeSet repository to remain registered, revalidates current origin, loads the persisted current ReviewDiff baseline, regenerates the canonical cumulative diff and requires exact internal fingerprint equality; requires clean real index; stages only ChangeSet-owned paths; verifies the staged diff against the same baseline; commits and pushes. Ownership is released only after successful push. No Open/Copy ReviewDiff action or user-supplied SHA is required.

**Push-failure result:** successful commit is preserved as `CommittedPendingPush` with commit SHA/branch; Retry Push pushes that existing commit and never creates a second commit.

**Primary traceability:**

- state: [`DATA-AND-STATE.md`](DATA-AND-STATE.md#7-lifecycle);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md#7-finalize);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`finalizeChangeSet`, `retryPush`);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#finalize--implicit-review-baseline--push-recovery).

## 4. `UC-RPKG-EXPORT-REPOSITORY` — Export Repository Snapshot ZIP

**Trigger/input:** selected allowed repository, export mode `Local working tree + diff` or `Committed snapshot`, output directory, and optional commit/ref for Committed mode.

**Successful result:** Core revalidates the registered repository path/origin and creates one read-only ZIP whose repository files are under `snapshot/`. Local mode places `SNAPSHOT.json`, `BASE-COMMIT.txt` and `WORKING-TREE.diff` beside the folder and exports tracked + untracked non-ignored current files without touching the real Git index. Committed mode places `SNAPSHOT.json` and `COMMIT.txt` beside the folder and reads exact regular-file blobs from the resolved commit object database, independent of dirty working-tree content.

**Consistency/safety boundary:** Local mode captures file inventory/bytes around two temporary-index diff generations and publishes only when both file fingerprints and diff bytes remain stable. `.git/**` and ignored untracked files are excluded. Output must resolve outside the repository. V1 committed export rejects symbolic links/submodules instead of flattening them into misleading regular files.

**Clipboard boundary:** after successful ZIP publication the host automatically copies the absolute ZIP path to clipboard and verifies read-back. Clipboard failure is warning-only; it never deletes or reclassifies the already-created ZIP.

**Primary traceability:**

- snapshot contract: [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md);
- mechanics: [`ARCHITECTURE.md`](ARCHITECTURE.md#8-repository-snapshot-export);
- Core: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java) (`exportRepositorySnapshot`, `copyPathToClipboard`);
- exporter: [`src/main/java/obs/rpkg/RepositorySnapshotExporter.java`](src/main/java/obs/rpkg/RepositorySnapshotExporter.java);
- Git boundary: [`src/main/java/obs/rpkg/GitClient.java`](src/main/java/obs/rpkg/GitClient.java);
- hosts: [`src/main/java/obs/rpkg/Main.java`](src/main/java/obs/rpkg/Main.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- automated: [`src/test/java/obs/rpkg/CoreTests.java`](src/test/java/obs/rpkg/CoreTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#repository-snapshot-export).

## 5. `UC-RPKG-DELIVER-REVIEW` — Deliver Current ReviewDiff to ChatGPT

**Trigger/input:** a selected ChangeSet has a persisted ordinary ChatGPT conversation binding and a new current ReviewDiff is created by successful Apply/Refresh Review; or the user explicitly chooses `Send current ReviewDiff`.

**Successful result:** the Java bridge queues the exact canonical ReviewDiff by `changeSetId + reviewAttemptId` together with its byte length/SHA-256; Java verifies the queued artifact again before payload delivery and the extension verifies the received bytes before paste. One open browser tab for the bound conversation claims the task. The extension requires an empty composer and pastes the exact ReviewDiff text. If ChatGPT keeps the paste as text, it sends that text. If ChatGPT's own native large-paste behavior converts it into an attachment, the extension waits until conversion/upload is complete before clicking Send. `Sent` requires both cleared composer/attachment state and observation of a new user-message turn. An empty ReviewDiff is `NoChanges` and sends nothing.

**Idempotency / duplicate-tab boundary:** automatic task creation is unique for one current review identity. Several tabs of the same conversation are grouped by conversation key, only a tab currently belonging to that exact conversation may claim a task, and claims are serialized so a second queued task cannot run concurrently in another duplicate tab. Before the first composer mutation the task atomically enters `Preparing`. Loss while merely `Claimed` may return to `Pending`; uncertainty after `Preparing` becomes terminal `PreparedUnsent`, and after `SendClicked` becomes terminal `UnknownAfterSend`. Newer automatic reviews supersede older `Pending`/`Claimed` tasks, while a `Preparing` task is allowed to complete and the newer review waits. Rebind/unbind cancels only safely cancellable tasks and is blocked during `Preparing`/`SendClicked`; expired in-flight leases are normalized before that decision. Terminal states are immutable.

**Lifecycle boundary:** browser delivery is downstream convenience only. Extension/bridge failure cannot roll back Apply, replace the canonical ReviewDiff, authorize Finalize, mutate Git/index state or change ChangeSet lifecycle. Binding an existing ChangeSet does not implicitly send its already-current ReviewDiff.

**Primary traceability:**

- bridge contract: [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md);
- architecture/state: [`ARCHITECTURE.md`](ARCHITECTURE.md), [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- Core/service/server: [`src/main/java/obs/rpkg/Core.java`](src/main/java/obs/rpkg/Core.java), [`src/main/java/obs/rpkg/ChatBridgeService.java`](src/main/java/obs/rpkg/ChatBridgeService.java), [`src/main/java/obs/rpkg/ChatBridgeServer.java`](src/main/java/obs/rpkg/ChatBridgeServer.java);
- UI: [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- extension: [`chatgpt-bridge-extension/`](chatgpt-bridge-extension/);
- automated: [`src/test/java/obs/rpkg/ChatBridgeTests.java`](src/test/java/obs/rpkg/ChatBridgeTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#chatgpt-bridge--reviewdiff-delivery).

## 6. `UC-RPKG-ATTACH-SNAPSHOT` — Attach Repository Snapshot to ChatGPT

**Trigger/input:** a Repository Snapshot ZIP has already been created successfully and the user explicitly chooses `Attach to ChatGPT` plus one currently open ordinary ChatGPT conversation.

**Successful result:** the Java side validates that the selected artifact has the Repository Snapshot root contract, queues an attach-only task and gives the claimed ChatGPT tab a short-lived artifact ticket. The extension attaches the exact ZIP and waits until ChatGPT shows the attachment as ready. It records `Attached` and stops.

**Hard boundary:** snapshot tasks have `autoSend=false`; the extension must never click Send. V1 accepts only app-style Repository Snapshot ZIPs, not arbitrary local files or replacement-package ZIPs. Snapshot attachment does not create/change a ChangeSet and cannot change snapshot-export success.

**Primary traceability:**

- bridge contract: [`CHATGPT-BRIDGE.md`](CHATGPT-BRIDGE.md);
- snapshot contract: [`REPOSITORY-SNAPSHOT.md`](REPOSITORY-SNAPSHOT.md);
- Java service/UI: [`src/main/java/obs/rpkg/ChatBridgeService.java`](src/main/java/obs/rpkg/ChatBridgeService.java), [`src/main/java/obs/rpkg/MainWindow.java`](src/main/java/obs/rpkg/MainWindow.java);
- extension: [`chatgpt-bridge-extension/`](chatgpt-bridge-extension/);
- automated/manual: [`src/test/java/obs/rpkg/ChatBridgeTests.java`](src/test/java/obs/rpkg/ChatBridgeTests.java), [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md#chatgpt-bridge--snapshot-attach-only).

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

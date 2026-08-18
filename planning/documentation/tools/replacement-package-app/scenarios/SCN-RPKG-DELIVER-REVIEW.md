# SCN-RPKG-DELIVER-REVIEW — Deliver Current ReviewDiff to ChatGPT

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-RPKG-DELIVER-REVIEW`.

Related Application Use Case: [`UC-RPKG-DELIVER-REVIEW`](../USE-CASE-REGISTRY.md)

**Trigger/input:** a selected ChangeSet has a persisted ordinary ChatGPT conversation binding and a new current ReviewDiff is created by successful Apply/Refresh Review; or the user explicitly chooses `Send current ReviewDiff`.

**Successful result:** the Java bridge queues the exact canonical ReviewDiff by `changeSetId + reviewAttemptId` together with its byte length/SHA-256; Java verifies the queued artifact again before payload delivery and the extension verifies the received bytes before paste. One open browser tab for the bound conversation claims the task. The extension requires an empty composer and pastes the exact ReviewDiff text. If ChatGPT keeps the paste as text, it sends that text. If ChatGPT's own native large-paste behavior converts it into an attachment, the extension waits until conversion/upload is complete before clicking Send. `Sent` requires both cleared composer/attachment state and observation of a new user-message turn. An empty ReviewDiff is `NoChanges` and sends nothing.

**Idempotency / duplicate-tab boundary:** automatic task creation is unique for one current review identity. Several tabs of the same conversation are grouped by conversation key, only a tab currently belonging to that exact conversation may claim a task, and claims are serialized so a second queued task cannot run concurrently in another duplicate tab. Before the first composer mutation the task atomically enters `Preparing`. Loss while merely `Claimed` may return to `Pending`; uncertainty after `Preparing` becomes terminal `PreparedUnsent`, and after `SendClicked` becomes terminal `UnknownAfterSend`. Newer automatic reviews supersede older `Pending`/`Claimed` tasks, while a `Preparing` task is allowed to complete and the newer review waits. Rebind/unbind cancels only safely cancellable tasks and is blocked during `Preparing`/`SendClicked`; expired in-flight leases are normalized before that decision. Terminal states are immutable.

**Lifecycle boundary:** browser delivery is downstream convenience only. Extension/bridge failure cannot roll back Apply, replace the canonical ReviewDiff, authorize Finalize, mutate Git/index state or change ChangeSet lifecycle. Binding an existing ChangeSet does not implicitly send its already-current ReviewDiff. Successful delivery establishes exact review input only; the receiving chat should use `UC-DOC-REVIEW-DIFF` / `planning/documentation/review-diff-review-workflow.md` for semantic correctness review.

**Primary traceability:**

- bridge contract: [`CHATGPT-BRIDGE.md`](../CHATGPT-BRIDGE.md);
- architecture/state: [`ARCHITECTURE.md`](../ARCHITECTURE.md), [`DATA-AND-STATE.md`](../DATA-AND-STATE.md);
- Core/service/server: [`src/main/java/obs/rpkg/Core.java`](../src/main/java/obs/rpkg/Core.java), [`src/main/java/obs/rpkg/ChatBridgeService.java`](../src/main/java/obs/rpkg/ChatBridgeService.java), [`src/main/java/obs/rpkg/ChatBridgeServer.java`](../src/main/java/obs/rpkg/ChatBridgeServer.java);
- UI: [`src/main/java/obs/rpkg/MainWindow.java`](../src/main/java/obs/rpkg/MainWindow.java);
- extension: [`chatgpt-bridge-extension/`](../chatgpt-bridge-extension/);
- automated: [`src/test/java/obs/rpkg/ChatBridgeTests.java`](../src/test/java/obs/rpkg/ChatBridgeTests.java);
- manual: [`MANUAL-ACCEPTANCE.md`](../MANUAL-ACCEPTANCE.md#chatgpt-bridge--reviewdiff-delivery).

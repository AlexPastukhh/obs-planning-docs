# ChatGPT Bridge Integration

Status: active V1 current integration contract + selected target External Interaction delta
Scope: local Java ↔ Chromium extension handoff for ordinary ChatGPT conversations. It does not change the replacement-package producer protocol, ReviewDiff authority, snapshot format or Finalize authority.

## 1. Historical Capability Mapping

Current implementation traces two historical capability IDs here:

```text
UC-RPKG-DELIVER-REVIEW
UC-RPKG-ATTACH-SNAPSHOT
```

Supporting mechanics such as tab inventory, one-tab claims, pairing and ChangeSet → conversation binding do not receive separate UC IDs.

## 2. Browser Scope

V1 primary acceptance target is Microsoft Edge using the Chromium Manifest V3 extension platform. Google Chrome is expected to be structurally compatible but is not declared accepted until separately tested.

Only ordinary conversations whose current URL has the shape:

```text
https://chatgpt.com/c/<conversation-key>
```

are eligible. Projects, custom GPT surfaces, new-chat pages without a stable `/c/<conversation-key>` and other ChatGPT surfaces are outside V1.

The extension reports open tabs grouped by `conversationKey`. Several browser tabs for the same conversation appear as one application choice with a tab count. Titles are presentation only; title equality never merges different conversation keys. Delivery is serialized per conversation: while any task for that conversation is `Claimed`, `Preparing` or `SendClicked`, another tab cannot claim a second queued task.

## 3. ChangeSet Review Binding

One ChangeSet may persist one review-chat binding:

```text
changeSetId
→ conversationKey
→ last known title + URL
```

This is intentionally ChangeSet-scoped because continuation/correction packages keep the same `changeSetId`. The user chooses the conversation once and later ReviewDiff generations for that ChangeSet reuse it.

Binding an already-existing ChangeSet does **not** send its current ReviewDiff implicitly. `Send current ReviewDiff` is the explicit action for that case. After binding, each successful later Apply/Refresh Review queues the newly current ReviewDiff automatically.

A chat binding is delivery state only. It does not change owned paths, ApplicationAttempt success, current ReviewDiff identity, Finalize baseline or lifecycle status.

## 4. ReviewDiff Delivery

The Java app remains the authority for exact canonical ReviewDiff bytes. A queued review task is keyed to one `changeSetId` + `reviewAttemptId`. Automatic queue creation is idempotent for that identity. At enqueue time the task records the artifact byte length and SHA-256; payload delivery rechecks both, and the extension independently verifies the received bytes before paste. An empty canonical ReviewDiff becomes terminal `NoChanges` and does not create a ChatGPT message.

Delivery flow:

```text
current ReviewDiff persisted
→ bound conversation exists?
→ queue Pending task
→ any open tab of that conversation may claim it
→ exactly one tab gets the claim
→ require empty ChatGPT composer
→ paste exact ReviewDiff text through browser clipboard/paste mechanics
→ let ChatGPT decide its native paste representation
```

Then:

```text
small/native text paste
→ wait for enabled Send
→ mark SendClicked
→ click Send
→ require composer cleared and a new user-message turn observed
→ Sent

large paste converted by ChatGPT itself
→ observe attachment transition
→ wait until attachment/upload is no longer busy
→ wait for enabled Send
→ mark SendClicked
→ click Send
→ require composer/attachment cleared and a new user-message turn observed
→ Sent
```

The extension does not choose a byte threshold and does not construct a `.diff` File for the large-review path. ChatGPT's own paste behavior decides whether the paste remains text or becomes an attachment.

This is the **current V1 mechanism, not the selected target preparation mechanism**. Live Microsoft Edge evidence showed that `navigator.clipboard.writeText(...)` can fail with `Document is not focused` when the intended ChatGPT document is not foreground-focused. That practical failure does not change the Scenario result; it requires the selected SL-06 realization correction below.

If the composer already contains user text or an attachment, automatic ReviewDiff delivery fails before Send rather than mixing with an existing draft.

A claimed tab renews its lease while delivery is active. Immediately before the extension first mutates the ChatGPT composer it atomically stages the task as `Preparing`. Claim/tab loss while still only `Claimed` returns the task to `Pending`; once `Preparing` has begun, any pre-Send interruption becomes terminal `PreparedUnsent` so an uncertain draft is never retried automatically. After `SendClicked`, uncertainty becomes terminal `UnknownAfterSend`. `Sent`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `NoChanges` and `Cancelled` are immutable terminal results. A newer automatic ReviewDiff supersedes older `Pending`/`Claimed` automatic tasks, but an already `Preparing` delivery is allowed to complete and the newer review waits behind it. Rebind/unbind cancels only safely cancellable `Pending`/`Claimed` review tasks and is blocked during `Preparing` or `SendClicked`. Expired leases are normalized before binding changes and delivery-status reads so stale `SendClicked` state cannot block the user forever.

## 5. Snapshot Attach-Only

Snapshot attachment is separate from ChangeSet binding. After the app creates a Repository Snapshot ZIP, the user explicitly chooses one currently open ordinary ChatGPT conversation and requests `Attach to ChatGPT`.

Flow:

```text
validated app Repository Snapshot ZIP
→ user chooses open conversation
→ queue snapshot task with autoSend=false
→ one tab claims it
→ fetch ZIP through a short-lived artifact ticket
→ verify exact queued size/SHA-256 in Java and again in the extension
→ construct browser File + drive ChatGPT file input
→ wait until attachment is ready
→ Attached
→ STOP
```

Hard invariant:

```text
snapshot task → extension MUST NOT click Send
```

V1 does not expose a generic arbitrary-file attachment operation. The Java side accepts only ZIPs with the Repository Snapshot root contract and rejects `PACKAGE.json` replacement packages as snapshot attachments.

## 6. Loopback Protocol / Security

The Java UI starts an HTTP bridge on:

```text
127.0.0.1:17831
```

Control endpoints require a random 256-bit pairing token stored in local app state. The user copies the token once into the unpacked extension Options page. The extension service worker owns authenticated inventory/task-control requests.

A ChatGPT content script never receives the pairing token. The extension stores it with `chrome.storage.local` restricted to trusted extension contexts. After a task claim the content script receives only a short-lived random artifact URL plus the expected artifact size/SHA-256 scoped to that exact task. The payload endpoint cannot select an arbitrary filesystem path, and task identifiers must be UUIDs.

Core endpoints:

```text
GET  /v1/health
POST /v1/inventory
POST /v1/tasks/claim
GET  /v1/tasks/<taskId>/payload?ticket=<short-lived-ticket>
POST /v1/tasks/<taskId>/heartbeat
POST /v1/tasks/<taskId>/release
POST /v1/tasks/<taskId>/stage
POST /v1/tasks/<taskId>/result
POST /v1/tabs/release
```

The payload GET permits the ChatGPT origin through narrow CORS headers and never exposes another task or arbitrary local file.

## 7. Task States

```text
ReviewDiff:
Pending → Claimed → Preparing → SendClicked → Sent | UnknownAfterSend
Pending → Cancelled
Claimed → FailedBeforeSend | Cancelled
Preparing → PreparedUnsent
empty diff → NoChanges
claim loss while Claimed → Pending
claim loss while Preparing → PreparedUnsent
claim loss after SendClicked → UnknownAfterSend

Snapshot:
Pending → Claimed → Preparing → Attached
Claimed → FailedBeforeSend
Preparing → PreparedUnsent
```

`Sent`, `Attached`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `NoChanges` and `Cancelled` are terminal. Terminal results cannot be overwritten. Manual `Send current ReviewDiff` may create a new explicit task, but automatic task creation is deduplicated for one review identity.

Legacy nonterminal handoff records created before artifact fingerprinting are not silently delivered: pre-Send records are cancelled, while a legacy `SendClicked` record becomes `UnknownAfterSend` to preserve the no-duplicate rule.

## 8. Failure Boundary

Browser/bridge delivery is post-persistence convenience:

```text
bridge unavailable
extension absent
conversation closed
DOM changed
current V1 paste/upload failed or target direct composer preparation failed
```

must never roll back a successful package Apply, invalidate a canonical ReviewDiff, alter Git/index state, authorize Finalize or change a successful repository snapshot export into failure.

## 9. DOM Adapter Boundary

ChatGPT DOM is not a public stable application API. Browser selectors, composer discovery, current native-paste observation, selected direct composer/editor insertion, upload readiness and Send-button mechanics are centralized in:

```text
chatgpt-bridge-extension/src/chatgpt-adapter.js
```

Manual Microsoft Edge acceptance is required after meaningful ChatGPT UI changes even when Java automated tests still pass.

## 10. Selected Target Current-Change Preparation Correction

The selected SL-06 target removes browser Clipboard API/native paste as a required preparation mechanism.

```text
exact verified ReviewDiff bytes
→ decode exact UTF-8 text
→ verify exact intended conversation + empty composer
→ direct composer/editor insertion through ChatGPT DOM adapter
→ verify expected ReviewDiff is actually present/prepared
→ only then mark semantic Preparing
→ wait for Send readiness
→ mark SendClicked immediately before possible Send
→ confirm outgoing user turn
```

Direct insertion must work when the ChatGPT tab/document is not foreground-focused. The selected initial path is the same direct text preparation for ReviewDiff content regardless of size; no size threshold or automatic `.diff` attachment fallback is selected until live evidence establishes a real ChatGPT composer limit.

State/result boundary:

```text
no confirmed composer mutation
+ failure
→ FailedBeforeSend

expected ReviewDiff confirmed prepared
+ failure before possible Send
→ PreparedUnsent

SendClicked
+ delivery cannot be confirmed
→ UnknownAfterSend
```

Thus `Preparing` is evidence that external content is actually prepared, not merely that preparation was attempted. A clipboard/focus/DOM failure before composer mutation cannot truthfully become `PreparedUnsent`.

## 11. Selected Target External Interaction Layer — Not Yet Implemented

Sections 1–9 describe current V1 bridge mechanics. Section 10 records the selected SL-06 preparation correction. This section adds a user-semantic `External Interaction` layer and does not promote claim/lease/tab states into product identity.

### Interaction Scope

One External Interaction is one user-significant transfer attempt:

```text
Interaction ID
+ Kind (Deliver Current Change | Attach Repository Snapshot)
+ exact source payload/artifact
+ exact destination conversation
+ semantic state/outcome
```

Pairing, inventory polling, heartbeat, claim leases, tab ID, ticket and content-script reconnect are implementation mechanics and do not appear as independent user interactions.

### Common Interaction List / History

Application exposes one list for both handoff kinds as a current/actionable projection, not terminal attempt history. Show interactions that can still progress/cancel plus `UnknownAfterSend` (or equivalent uncertainty requiring attention). Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` results leave the list after Output/notification reports the outcome. Across restart, retain technical records/states only where truthful recovery, uncertainty, idempotency or duplicate prevention requires them. A new user retry creates a new interaction/task identity; a cancelled interaction is never restored for reuse.

### Target Cancel Semantics

Automatic cleanup of ChatGPT composer/attachment content is explicitly **not selected**.

```text
interaction not externally prepared
+ Cancel
→ Cancelled
→ stop future automation

interaction already prepared unsent text/attachment
+ Cancel
→ Cancelled — prepared content retained
→ do not delete text/attachment
→ do not Send / continue automation

Send may already have happened
→ cancellation cannot rewrite delivery truth
→ preserve Sent / UnknownAfterSend / equivalent truthful result
```

Thus `Cancelled` means this interaction's future automation stopped; it does not mean the external effect was reversed.

Current bridge restrictions that protect exact destination/payload and duplicate-send uncertainty remain required. Target implementation may map existing technical records to semantic state, but terminal semantic truth must not be overwritten by later lease/tab normalization.

### Slice Boundary

SL-05 and SL-06 retain artifact/delivery results. SL-08 owns common interaction inventory/select/cancel/history. Browser interaction failure remains downstream from Repository Work, and SL-09 may notify terminal results without becoming delivery authority.

# ChatGPT Bridge Integration

Status: active V1 integration contract; SL-06 attachment/send-retry + runtime-contract preflight correction implemented in current source, live Edge/Swing acceptance pending
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

The Java app remains the authority for exact canonical ReviewDiff bytes. A queued review task is keyed to one `changeSetId` + `reviewAttemptId`. Automatic queue creation is idempotent for that identity. At enqueue time the task records artifact byte length and SHA-256; payload delivery rechecks both, and the extension independently verifies the received bytes before preparation. An empty canonical ReviewDiff becomes terminal `NoChanges` and does not create a ChatGPT message.

Current delivery flow:

```text
current ReviewDiff persisted
→ bound conversation exists?
→ queue Pending task with exact artifact fingerprint + captured send-retry interval
→ any open tab of that exact conversation may claim it
→ exactly one tab gets the claim
→ require bridge protocol v2 + complete task contract
→ require empty intended ChatGPT composer
→ construct a browser File from the exact ReviewDiff bytes
→ drive the shared ChatGPT attachment primitive
→ wait until the exact .diff attachment is visible and upload-ready
→ stage semantic Preparing
→ wait for an enabled Send control
→ stage technical SendClicked / semantic Sending
→ at the task's configured interval:
     revalidate exact conversation
     require the same prepared .diff attachment still in the composer
     reacquire the current Send control in ChatGPT MAIN world
     click when enabled
     observe whether the attachment leaves the composer and a new user turn appears
→ Sent
```

Live evidence superseded the prior direct-text target. A small ReviewDiff could be inserted as text, but automatic Send remained unreliable; a large ReviewDiff could block the whole ChatGPT tab while the rich-text editor processed the inserted content. The already-working file-input attachment mechanism does not put the ReviewDiff bytes through the rich-text editor, so **all non-empty ReviewDiffs now use a `.diff` attachment**, not a size threshold or text/attachment split.

The send-control retry interval is an application setting, default `6` seconds with allowed range `1..60`. A ReviewDiff task captures the current value when it is created and the extension receives that frozen value with the claimed task; the extension does not keep an independent retry setting. `SendClicked` remains the technical persisted state name for compatibility, but while the exact prepared attachment is still present the user-semantic projection is `Sending` and repeated guarded click attempts belong to the **same External Interaction**, not new retries/interactions.

Live attachment testing exposed a runtime-contract defect after this design landed: the `.diff` attached successfully, then the extension reported `UnknownAfterSend · Invalid ReviewDiff send retry interval.` This is deterministic local incompatibility, not external send uncertainty. Protocol version `2` therefore makes the Java/extension boundary explicit. `/v1/health` and claimed tasks advertise the version, while inventory/claim requests advertise the extension version; the extension rejects mismatched/malformed claim contracts before payload/composer mutation, records a safely claimed task as `FailedBeforeSend`, and tells the user to restart/update the application and reload the extension. The retry interval is validated in that preflight and again by the content script **before** external preparation; no interval validation remains after `SendClicked`.

Repeated UI click attempts are permitted only while the exact prepared `.diff` attachment remains in the exact intended composer. A successful ChatGPT Send removes that prepared attachment, so later polling has nothing eligible to click. If the attachment disappears but a new outgoing user turn cannot be confirmed, delivery becomes `UnknownAfterSend` and automatic click retry stops. This is distinct from retrying a terminal/uncertain External Interaction.

If the composer already contains user text or an attachment, automatic ReviewDiff delivery fails before mutation rather than mixing with an existing draft. Failure before confirmed attachment preparation is `FailedBeforeSend`; only after the expected `.diff` is confirmed upload-ready may a later pre-Send interruption become terminal `PreparedUnsent`. `Sent`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `NoChanges` and `Cancelled` are immutable terminal results. A newer automatic ReviewDiff supersedes older `Pending`/`Claimed` automatic tasks, but an already `Preparing`/`Sending` delivery is allowed to complete and the newer review waits behind it. Rebind/unbind cancels only safely cancellable `Pending`/`Claimed` review tasks and is blocked during `Preparing` or technical `SendClicked`. Expired in-flight state is normalized before binding changes and delivery-status reads so stale send attempts cannot block the user forever.

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

V1 does not expose a generic arbitrary-file attachment operation. The Java side accepts only ZIPs with the Repository Snapshot root contract and rejects `PACKAGE.json` replacement packages as snapshot attachments. ReviewDiff and snapshot handoffs now reuse the same **technical browser attachment primitive** (`File` + ChatGPT file input + readiness observation), but their product semantics stay separate: ReviewDiff may auto-send, Snapshot remains attach-only. Snapshot handoff semantics are intentionally not redesigned by the SL-06 correction and remain a later review topic.

## 6. Loopback Protocol / Security

`/v1/health` returns the fixed local `bridgeProtocolVersion`; the current required value is `2`. Inventory/claim requests must advertise the same extension version, and each claim response repeats the server version so a newly loaded extension cannot partially execute a task from an older Java process. Protocol/version mismatch is a deterministic pre-send compatibility failure, not an `UnknownAfterSend` result.

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
                                     ↳ repeated guarded Send-control attempts while same .diff attachment remains prepared
Pending → Cancelled
Claimed → FailedBeforeSend | PreparedUnsent | Cancelled
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

Legacy nonterminal handoff records created before artifact fingerprinting are not silently delivered: pre-Send records are cancelled, while a legacy `SendClicked` record becomes `UnknownAfterSend`. Older fingerprinted ReviewDiff tasks that lack the new retry-interval field receive the default interval during read migration.

## 8. Failure Boundary

Browser/bridge delivery is post-persistence convenience:

```text
bridge unavailable
extension absent
conversation closed
DOM changed
attachment preparation/upload failed
MAIN-world Send control cannot be driven
```

must never roll back a successful package Apply, invalidate a canonical ReviewDiff, alter Git/index state, authorize Finalize or change a successful repository snapshot export into failure.

## 9. DOM Adapter Boundary

ChatGPT DOM is not a public stable application API. Browser selectors, composer discovery, shared attachment preparation/upload readiness and content-side delivery observation are centralized in:

```text
chatgpt-bridge-extension/src/chatgpt-adapter.js
```

Manual Microsoft Edge acceptance is required after meaningful ChatGPT UI changes even when Java automated tests still pass. The service worker performs guarded ReviewDiff Send attempts in the page `MAIN` world because live DevTools evidence showed page-world `.click()` could send a prepared message while extension-side automation remained unreliable.

## 10. Current-Change Preparation / Send Correction — Implemented / Live Acceptance Pending

Current SL-06 source uses attachment preparation for every non-empty ReviewDiff:

```text
exact verified ReviewDiff bytes
→ validate bridge protocol v2 + complete claimed task contract
→ preserve bytes as text/x-diff Blob/File
→ verify exact intended conversation + empty composer
→ reuse shared browser attachment primitive
→ verify the task-specific .diff attachment is present and upload-ready
→ only then mark semantic Preparing
→ wait for Send readiness
→ stage technical SendClicked / semantic Sending
→ MAIN-world guarded Send attempts at task.sendRetryIntervalMs
→ keep trying only while the same attachment remains prepared
→ confirm outgoing user turn
```

The application owns the mutable retry setting (`reviewDiffSendRetrySeconds`, default `6`, range `1..60`). A new ReviewDiff task snapshots that setting so changing Settings later does not alter an in-flight interaction.

State/result boundary:

```text
no confirmed attachment preparation
+ failure
→ FailedBeforeSend

expected .diff confirmed upload-ready
+ failure before possible Send
→ PreparedUnsent

Send attempt phase active
+ same .diff still present
→ remain Sending and retry at configured interval

prepared attachment disappears
+ outgoing user turn confirmed
→ Sent

prepared attachment disappears
+ delivery cannot be confirmed
→ UnknownAfterSend
→ no further automatic Send attempt
```

Thus internal Send-control polling is not a blind terminal retry. It is one continuing delivery interaction guarded by the continued presence of the same prepared attachment. Terminal/uncertain interaction retry still requires a new External Interaction identity.

## 11. External Interaction Layer — Implemented / Practical Acceptance Pending

Sections 1–9 describe current V1 bridge mechanics. Section 10 records the implemented SL-06 preparation correction. This section records the implemented user-semantic `External Interaction` projection and does not promote claim/lease/tab states into product identity.

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

Application exposes one list for both handoff kinds as a current/actionable projection, not terminal attempt history. Show interactions that can still progress/cancel, active `Sending`, plus `UnknownAfterSend` (or equivalent uncertainty requiring attention). Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` results leave the list after Output/notification reports the outcome. Across restart, retain technical records/states only where truthful recovery, uncertainty, idempotency or duplicate prevention requires them. A new user retry creates a new interaction/task identity; a cancelled interaction is never restored for reuse.

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

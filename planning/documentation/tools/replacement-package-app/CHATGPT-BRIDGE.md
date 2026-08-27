# ChatGPT Bridge Integration

Status: active V1 integration contract; SL-06 exact attachment/send integrity + runtime-contract preflight and SL-04/05 destination-first Snapshot timeout corrections implemented in current source, live Edge/Swing acceptance pending
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

Tab-agent lifecycle has one owner: the extension service worker. `manifest.json` does not auto-inject the bridge content script. Background inventory/reconciliation injects `chatgpt-adapter.js` + `content.js` into an ordinary ChatGPT tab only when no current generation-matching agent answers. The extension keeps one runtime generation in `chrome.storage.session`, so normal Manifest V3 service-worker suspension/restart retains the generation while extension reload/update creates a new generation. Each injected tab agent has its own instance id; background rejects stale generation/instance traffic, and a fresh same-generation injection disposes the previous agent/timer. An invalidated current-version extension context stops its heartbeat instead of continuing to emit repeated runtime errors. One upgrade caveat is intentional: a tab that still runs the pre-`0.2.11` content script cannot be taught this shutdown behavior after that old extension context is invalidated, so refresh such a tab once after upgrading; subsequent extension reloads are handled by the replaceable-agent lifecycle without a page refresh.

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

The Java app remains the authority for exact canonical ReviewDiff bytes. A queued review task is keyed to one `changeSetId` + `reviewAttemptId`. Automatic queue creation is idempotent for that identity. At enqueue time the task records artifact byte length and SHA-256; payload delivery rechecks both, and the extension independently verifies the received bytes before preparation. An empty canonical ReviewDiff becomes terminal `NoChanges` and does not create a ChatGPT message. While a non-empty task is still `Pending`, Swing presents it as **Waiting for ChatGPT tab** rather than reporting queue creation as delivery success; `Claimed` is projected as **Delivering**. Queue persistence and external delivery are therefore visibly distinct.


Current delivery flow:

```text
current ReviewDiff persisted
→ bound conversation exists?
→ queue Pending task with exact artifact fingerprint + captured send-retry interval
→ assign one browser-visible .diff filename containing this delivery task identity
→ any open tab of that exact conversation may claim it
→ exactly one tab gets the claim
→ require bridge protocol v2 + complete task contract
→ require empty intended ChatGPT composer
→ construct a browser File from the exact ReviewDiff bytes
→ drive the shared ChatGPT attachment primitive
→ wait until the task-specific .diff attachment is visible and upload-ready
→ stage semantic Preparing
→ wait for an enabled Send control
→ at the task's configured interval:
     revalidate exact conversation
     require the composer to still contain no unrelated text
     require the same task-specific .diff attachment still in the composer
     reacquire the current Send control in ChatGPT MAIN world
     recheck composer text + attachment immediately before click
     click when enabled
     after the first actual possible-Send click, persist technical SendClicked / semantic Sending
     confirm only a new outgoing user turn after this task's baseline whose complete turn container exposes a file/attachment DOM surface with `.diff` after the prepared attachment leaves the composer
→ Sent
```

Live evidence superseded the prior direct-text target. A small ReviewDiff could be inserted as text, but automatic Send remained unreliable; a large ReviewDiff could block the whole ChatGPT tab while the rich-text editor processed the inserted content. The already-working file-input attachment mechanism does not put the ReviewDiff bytes through the rich-text editor, so **all non-empty ReviewDiffs now use a `.diff` attachment**, not a size threshold or text/attachment split.

The send-control retry interval is an application setting, default `6` seconds with allowed range `1..60`. A ReviewDiff task captures the current value when it is created and the extension receives that frozen value with the claimed task; the extension does not keep an independent retry setting. `SendClicked` remains the technical persisted state name for compatibility, but while the exact prepared attachment is still present the user-semantic projection is `Sending` and repeated guarded click attempts belong to the **same External Interaction**, not new retries/interactions.

Live attachment testing exposed a runtime-contract defect after this design landed: the `.diff` attached successfully, then the extension reported `UnknownAfterSend · Invalid ReviewDiff send retry interval.` This is deterministic local incompatibility, not external send uncertainty. Protocol version `2` therefore makes the Java/extension boundary explicit. `/v1/health` and claimed tasks advertise the version, while inventory/claim requests advertise the extension version; the extension rejects mismatched/malformed claim contracts before payload/composer mutation, records a safely claimed task as `FailedBeforeSend`, and tells the user to restart/update the application and reload the extension. The retry interval is validated in that preflight and again by the content script **before** external preparation; no interval validation remains after `SendClicked`.

Repeated UI click attempts are permitted only while the exact task-specific prepared `.diff` attachment remains in the exact intended composer and no unrelated composer text has appeared. `Sent` is never inferred from message text alone. After the prepared attachment leaves the composer, the minimum confirmation invariant is a new user turn after the delivery baseline; this matches the external transition the bridge controls even when ChatGPT no longer exposes stable attachment metadata in the rendered turn. The adapter still searches the complete turn container—not only the `[data-message-author-role="user"]` message node—for a file/attachment-like DOM surface that exposes `.diff`; that turn-local surface is stronger optional evidence, and its ancestor expansion remains bounded to exactly the current authored turn so a neighboring turn cannot strengthen the wrong interaction. Live acceptance with task `44181531` already proved that a real Send can evade a narrower attachment-card lookup, and later practical use still produced false `UnknownAfterSend` despite successful visible delivery, so `.diff` surface visibility is no longer a mandatory success gate. If the prepared attachment disappears **before** any automatic possible-Send click, the result is `PreparedUnsent`; if it disappears **after** a possible-Send click and no post-baseline user turn can be confirmed, delivery becomes `UnknownAfterSend` and automatic click retry stops. This is distinct from retrying or acknowledging a terminal/uncertain External Interaction.

Known accepted send-confirmation risk: the weak post-baseline fallback currently uses the attachment-preparation user-turn baseline rather than a baseline captured immediately before each actual Send click. Therefore, in a rare same-conversation concurrency window, an unrelated user turn created after preparation but before this task's click could already satisfy the fallback count increase; if the prepared attachment later disappears after an ineffective/ambiguous click, that prior unrelated turn could falsely confirm `Sent`. This is accepted for the current revision. Future hardening should capture a click-specific user-turn baseline immediately before MAIN-world `button.click()` and compare only later turns against that attempt baseline; turn-local `.diff` evidence remains stronger optional proof.

If the composer already contains user text or an attachment, automatic ReviewDiff delivery fails before mutation rather than mixing with an existing draft. The same no-unrelated-text invariant is checked again after upload readiness and inside the MAIN-world click guard immediately before each click, so text typed after preparation stops automation without sending the mixed composer. Failure before confirmed attachment preparation is `FailedBeforeSend`; only after the expected `.diff` is confirmed upload-ready may a later pre-Send interruption become terminal `PreparedUnsent`. `Sent`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `NoChanges` and `Cancelled` are immutable terminal results. A newer automatic ReviewDiff supersedes older `Pending`/`Claimed` automatic tasks, but an already `Preparing`/`Sending` delivery is allowed to complete and the newer review waits behind it. Rebind/unbind cancels only safely cancellable `Pending`/`Claimed` review tasks and is blocked during `Preparing` or technical `SendClicked`. Expired in-flight state is normalized before binding changes and delivery-status reads so stale send attempts cannot block the user forever.

## 5. Snapshot Attach-Only

Snapshot attachment is separate from ChangeSet binding. The Swing Repository Snapshot dialog exposes `Export only` and destination-first `Export + Attach`. For the combined action the user selects one currently open ordinary ChatGPT conversation **before** export; the host freezes that exact `conversationKey` as operation input and never derives Snapshot destination from the later Review-chat selection or another current tab.

Flow:

```text
user selects exact conversationKey
→ freeze Snapshot inputs + destination
→ create and validate Repository Snapshot ZIP
→ queue snapshot task for that frozen key only, autoSend=false
→ one tab may claim it
→ fetch ZIP through a short-lived artifact ticket
→ verify exact queued size/SHA-256 in Java and again in the extension
→ construct browser File + drive ChatGPT file input
→ wait for attachment confirmation
→ Attached
→ STOP
```

There is no special fresh-inventory handshake whose purpose is to prove that a tab stayed open throughout export. Existing inventory validation still rejects a destination already known unavailable at enqueue. If stale inventory permits a task and browser attachment never confirms, the task is bounded by one absolute 10-minute confirmation deadline from task creation; claim/heartbeat renewal does not extend it. Expiry while `Pending` or `Claimed` is terminal `Cancelled`. Expiry after the task reached `Preparing` is terminal `PreparedUnsent`, because a prepared attachment may remain in the composer. These timeout results stop future automation without changing the already-successful Snapshot export.

Hard invariant:

```text
snapshot task → extension MUST NOT click Send
```

V1 does not expose a generic arbitrary-file attachment operation. The Java side accepts only ZIPs with the Repository Snapshot root contract and rejects `PACKAGE.json` replacement packages as snapshot attachments. ReviewDiff and snapshot handoffs reuse the same **technical browser attachment primitive** (`File` + ChatGPT file input + readiness observation), but their product semantics stay separate: ReviewDiff may auto-send, Snapshot remains attach-only.

## 6. Loopback Protocol / Security

`/v1/health` returns the fixed local `bridgeProtocolVersion`; the current required value is `2`. Inventory/claim requests must advertise the same extension version, and each claim response repeats the server version so a newly loaded extension cannot partially execute a task from an older Java process. Protocol/version mismatch is a deterministic pre-send compatibility failure, not an `UnknownAfterSend` result.

Runtime-generation correction: protocol `2` remains the Java/extension task contract, while tab-agent generation is an extension-internal lifecycle fence. Background is the sole injector, session generation survives ordinary service-worker restarts, extension reload/update rotates generation, and stale agent traffic is rejected before it can control a current task. Once a tab has loaded the current replaceable agent, Pending delivery can therefore be picked up by a freshly injected agent after later extension reloads without relying on a manually refreshed ChatGPT page. The one-time pre-`0.2.11` upgrade refresh caveat above still applies. This does **not** make an already externally prepared interaction transparently resumable across runtime/tab loss: interruption after preparation still follows the existing truthful `PreparedUnsent` boundary, and ambiguity after a possible Send remains `UnknownAfterSend`.

Known accepted/deferred composer-integrity risk: after the intended ReviewDiff attachment is upload-ready, the current guard rechecks unrelated **text** plus presence of the intended attachment, but it does not yet reject a second unrelated attachment added before the automatic click. This is explicitly accepted for the current campaign and is not a blocker; do not present it as solved.

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
Pending → Claimed → Preparing
Preparing → PreparedUnsent
Preparing → actual possible-Send click → SendClicked → Sent | UnknownAfterSend
                                              ↳ repeated guarded Send-control attempts while same task-specific .diff remains prepared
Preparing → UnknownAfterSend  (narrow truth-preserving fallback if a real click occurred before SendClicked persistence completed)
Pending → Cancelled
Claimed → FailedBeforeSend | PreparedUnsent | Cancelled
empty diff → NoChanges
claim loss while Claimed → Pending
claim loss while Preparing → PreparedUnsent
claim loss after SendClicked → UnknownAfterSend

Snapshot:
Pending → Claimed → Preparing → Attached
Claimed → FailedBeforeSend
Pending | Claimed + 10-minute absolute confirmation timeout → Cancelled
Preparing + 10-minute absolute confirmation timeout → PreparedUnsent
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
→ preserve bytes as text/x-diff Blob/File under a task-specific delivery filename
→ verify exact intended conversation + empty composer
→ reuse shared browser attachment primitive
→ verify the task-specific .diff attachment is present and upload-ready
→ only then mark semantic Preparing
→ wait for Send readiness while composer remains free of unrelated text
→ MAIN-world guard rechecks composer text + task-specific attachment immediately before click
→ actual click establishes the possible-Send boundary
→ persist technical SendClicked / semantic Sending after that click
→ keep trying only while the same attachment remains prepared
→ confirm only a post-baseline outgoing user turn whose complete turn container exposes a file/attachment DOM surface with `.diff` after the prepared attachment leaves the composer
```

The application owns the mutable retry setting (`reviewDiffSendRetrySeconds`, default `6`, range `1..60`). A new ReviewDiff task snapshots that setting so changing Settings later does not alter an in-flight interaction.

State/result boundary:

```text
no confirmed attachment preparation
+ failure
→ FailedBeforeSend

expected .diff confirmed upload-ready
+ composer contamination / attachment loss / other failure before actual possible-Send click
→ PreparedUnsent

actual possible-Send click occurred
→ SendClicked / Sending

Send attempt phase active
+ same task-specific .diff still present
+ composer has no unrelated text
→ remain Sending and retry at configured interval

prepared attachment leaves the composer
+ a new post-baseline user turn appears
→ Sent
→ a turn-local `.diff` file/attachment surface, when exposed, is stronger optional proof

prepared attachment disappears after a possible-Send click
+ no post-baseline user turn can be confirmed
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

Application exposes one list for both handoff kinds as a current/actionable/attention projection, not terminal attempt history. Show interactions that can still progress/cancel, active `Sending`, plus unacknowledged `UnknownAfterSend` (or equivalent uncertainty requiring attention). Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` results leave the list after Output/notification reports the outcome. `Cancel` never rewrites possible-Send truth; `Dismiss interaction` is a separate acknowledgement for terminal `UnknownAfterSend` that persists `dismissedAt`, removes the row from the working list and leaves the task/result unchanged. Across restart, retain technical records/states only where truthful recovery, uncertainty, idempotency or duplicate prevention requires them. A new user retry creates a new interaction/task identity; a cancelled or dismissed terminal interaction is never restored for reuse.

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

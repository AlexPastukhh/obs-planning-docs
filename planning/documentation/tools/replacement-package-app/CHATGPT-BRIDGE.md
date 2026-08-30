# ChatGPT Bridge Integration

Status: active V1 integration contract; generic exact-attachment/optional-Send engine implemented for ReviewDiff and Repository Snapshot, with destination-first Snapshot timeout corrections; live Edge/Swing acceptance pending
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

The extension reports open tabs grouped by `conversationKey`. Several browser tabs for the same conversation appear as one application choice with a tab count. Titles are presentation only; title equality never merges different conversation keys. Delivery is serialized per conversation: while any task for that conversation is `Claimed`, `Preparing`, `SendArmed` or `SendClicked`, another tab cannot claim a second queued task.

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
→ require bridge protocol v5 + complete task contract
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
     before the first application-controlled possible-Send attempt, obtain Java `SendArmed` authorization; after the first actual possible-Send click, persist technical SendClicked / semantic Sending and keep later guarded retries inside that same possible-Send lifecycle
     after the prepared attachment leaves the composer, confirm a new outgoing user turn after this task's preparation baseline
     when the same authored turn exposes a file/attachment surface with the exact queued filename, use that as stronger optional proof
→ Sent
```

Live evidence superseded the prior direct-text target. A small ReviewDiff could be inserted as text, but automatic Send remained unreliable; a large ReviewDiff could block the whole ChatGPT tab while the rich-text editor processed the inserted content. The already-working file-input attachment mechanism does not put the ReviewDiff bytes through the rich-text editor, so **all non-empty ReviewDiffs now use a `.diff` attachment**, not a size threshold or text/attachment split.

The send-control retry interval is an application setting, default `6` seconds with allowed range `1..60`. Every auto-send task snapshots the current value when it is created: ReviewDiff always uses auto-send, while Snapshot uses it only for `Export + Attach + Send`. The extension does not keep an independent retry setting. `SendArmed` is the persisted pre-click authorization state and `SendClicked` remains the actual-click state; repeated guarded attempts belong to the same External Interaction.

Live attachment testing originally exposed a deterministic Java/extension contract defect after attachment preparation. Protocol version `5` now identifies the generic attachment/optional-Send task contract: `/v1/health` and claimed tasks advertise it, inventory/claim requests advertise the extension version, and both background/content preflight validate artifact kind, destination, fingerprint, `autoSend`, payload URL and a retry interval whenever `autoSend=true` before payload/composer mutation. Version/contract failure is `FailedBeforeSend`, never `UnknownAfterSend`.

Repeated UI click attempts are permitted only while the exact task-specific prepared attachment remains in the exact intended composer and no unrelated composer text has appeared. `Sent` is never inferred from message text alone. After that attachment leaves the composer, the minimum confirmation invariant is a new user turn after the attachment-preparation baseline. The adapter additionally searches only the same authored turn for a file/attachment-like DOM surface containing the exact queued `fileName`; that is stronger optional evidence for either `.diff` or `.zip`, not a mandatory gate. Attachment loss before any automatic possible-Send click is `PreparedUnsent`; loss after a possible-Send click with no post-baseline user turn becomes `UnknownAfterSend` and automatic click retry stops.

Known accepted send-confirmation risk: the weak post-baseline fallback still uses the attachment-preparation user-turn baseline rather than a baseline captured immediately before each actual Send click. In a rare same-conversation concurrency window, an unrelated turn created after preparation but before this task's click could satisfy that fallback if the prepared attachment later disappears after an ineffective/ambiguous click. Future hardening should use a click-specific baseline; exact-filename turn-local attachment evidence remains stronger optional proof.

If the composer already contains user text or an attachment, any automatic attachment+Send delivery fails before mutation rather than mixing with an existing draft. The same no-unrelated-text invariant is checked again after upload readiness and inside the MAIN-world click guard before each click. ReviewDiff still reaches `Preparing` only after its exact `.diff` is upload-ready; Snapshot reaches `Preparing` before browser attachment mutation so its fixed confirmation deadline cannot falsely report clean cancellation after preparation has begun. `Sent`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `Attached`, `NoChanges` and `Cancelled` remain immutable terminal results.

## 5. Snapshot Attachment / Optional Send

Snapshot handoff remains separate from ChangeSet Review-chat binding. The Swing Repository Snapshot dialog exposes three outcomes: `Export only`, destination-first `Export + Attach`, and destination-first `Export + Attach + Send`. Either handoff option requires one currently open ordinary ChatGPT conversation before export; the host freezes that exact `conversationKey` and the `autoSend` intent and never derives Snapshot destination from a later Review-chat/current-tab selection.

Flow:

```text
freeze Snapshot inputs + exact conversationKey + autoSend
→ create and validate Repository Snapshot ZIP
→ queue exact snapshot task only after ZIP success
→ one tab claims it
→ verify exact queued size/SHA-256 in Java and extension
→ generic prepareAttachment(application/zip)
→ if autoSend=false: Attached → STOP
→ if autoSend=true:
     wait send-ready
     generic guarded MAIN-world attachment Send attempts
     Java authorizes attempt → SendArmed
     actual possible click → SendClicked
     Sent | UnknownAfterSend | PreparedUnsent
```

ReviewDiff and Snapshot therefore share one browser attachment preparation module and one optional-Send module. The Java bridge still accepts only app Repository Snapshot ZIPs for snapshot tasks; it does not expose arbitrary filesystem attachment or command execution. ReviewDiff remains `autoSend=true`; Snapshot may be `false` or `true` according to the initial dialog.

There is no fresh-inventory handshake whose purpose is to prove that a tab stayed open throughout export. Known-missing destination at enqueue rejects immediately. A queued Snapshot has the existing absolute 10-minute confirmation deadline from task creation while it is `Pending`, `Claimed` or `Preparing`: expiry is `Cancelled` before preparation and `PreparedUnsent` after preparation begins. Before the first application-controlled auto-send Snapshot click, Java atomically verifies the Snapshot deadline is still live and enters `SendArmed`, cancelling that deadline before the browser is allowed to click. After an actual possible click establishes `SendClicked`, later guarded retries stay in that possible-Send lifecycle and no longer consult the Snapshot confirmation deadline; the ordinary possible-Send lease preserves `Sent`/`UnknownAfterSend` truth.

For `Export only`, the host keeps the post-export result dialog with path/copy/open-folder controls. For either automatic ChatGPT handoff, that second modal is suppressed; the export result and handoff state are surfaced through Operation/External Interactions/notifications.

## 6. Loopback Protocol / Security

`/v1/health` returns the fixed local `bridgeProtocolVersion`; the current required value is `5`. Inventory/claim requests must advertise the same extension version, and each claim response repeats the server version so a newly loaded extension cannot partially execute the older attach-only Snapshot contract. Protocol/version mismatch is deterministic pre-send compatibility failure, not `UnknownAfterSend`.

Runtime-generation correction: protocol `5` is the Java/extension task contract, while tab-agent generation remains an extension-internal lifecycle fence. Background is the sole injector, session generation survives ordinary service-worker restarts, extension reload/update rotates generation, and stale agent traffic is rejected before it can control a current task. This does not make an already externally prepared interaction transparently resumable across runtime/tab loss: interruption after preparation remains `PreparedUnsent`, and ambiguity after a possible Send remains `UnknownAfterSend`.

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
POST /v1/chat-context/wait
POST /v1/chat-context/result
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
Preparing → SendArmed → actual possible-Send click → SendClicked → Sent | UnknownAfterSend
                                              ↳ repeated guarded Send-control attempts while same task-specific .diff remains prepared
SendArmed → UnknownAfterSend  (authorization succeeded but click outcome/persistence became uncertain)
Pending → Cancelled
Claimed → FailedBeforeSend | PreparedUnsent | Cancelled
empty diff → NoChanges
claim loss while Claimed → Pending
claim loss while Preparing → PreparedUnsent
claim loss after SendArmed | SendClicked → UnknownAfterSend

Snapshot attach-only:
Pending → Claimed → Preparing → Attached
Claimed → FailedBeforeSend
Pending | Claimed + 10-minute absolute confirmation timeout → Cancelled
Preparing + 10-minute absolute confirmation timeout → PreparedUnsent
Preparing → PreparedUnsent

Snapshot auto-send:
Pending → Claimed → Preparing → SendArmed → actual possible-Send click → SendClicked → Sent | UnknownAfterSend
Claimed → FailedBeforeSend
Pending | Claimed + 10-minute absolute confirmation timeout → Cancelled
Preparing + 10-minute absolute confirmation timeout → PreparedUnsent
Preparing → PreparedUnsent
SendArmed → Snapshot confirmation deadline no longer races the browser click; ordinary send-uncertainty lease applies until definitive no-click, SendClicked, or uncertainty
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
→ validate bridge protocol v5 + complete claimed task contract
→ preserve bytes as text/x-diff Blob/File under a task-specific delivery filename
→ verify exact intended conversation + empty composer
→ reuse shared browser attachment primitive
→ verify the task-specific .diff attachment is present and upload-ready
→ only then mark semantic Preparing
→ wait for Send readiness while composer remains free of unrelated text
→ MAIN-world guard rechecks composer text + task-specific attachment immediately before click
→ Java atomically authorizes the guarded attempt as SendArmed before MAIN-world click
→ actual click establishes SendClicked / semantic Sending after that click
→ keep trying only while the same attachment remains prepared
→ after the prepared attachment leaves the composer, confirm a post-baseline outgoing user turn; exact queued-filename attachment evidence in that same authored turn is stronger optional proof
```

The application owns the mutable retry setting (`reviewDiffSendRetrySeconds`, default `6`, range `1..60`). Every new auto-send task snapshots that existing setting, including ReviewDiff and Snapshot `Export + Attach + Send`, so changing Settings later does not alter an in-flight interaction.

State/result boundary:

```text
no confirmed attachment preparation
+ failure
→ FailedBeforeSend

expected .diff confirmed upload-ready
+ composer contamination / attachment loss / other failure before Send authorization or after a definitive no-click
→ PreparedUnsent

Java SendArmed authorization granted
→ browser click outcome is potentially external
→ actual possible-Send click → SendClicked / Sending

Send attempt phase active
+ same task-specific .diff still present
+ composer has no unrelated text
→ remain Sending and retry at configured interval

prepared attachment leaves the composer
+ a new post-baseline user turn appears
→ Sent
→ a turn-local file/attachment surface exposing the exact queued filename, when exposed, is stronger optional proof

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

## Invocation-Scoped Chat Context Lookup

An explicit Planning Helper bind invocation stores `{chatContextToken, conversationKey, observedTitle, capturedAt}` in that ChatGPT tab's `sessionStorage` under `obsPlanningHelper:chatContextCaptures:v1`. Ordinary command invocation does not create a capture. Records are not consumed/deleted after first lookup in this revision; each explicit bind invocation gets a fresh UUID and the tab session lifetime provides the storage boundary.

When Java executes an `OBS-ACTION` carrying `chatContextToken`, it persists a pending lookup and increments the chat-context request revision. Extension background keeps one authenticated bounded long-poll on `/v1/chat-context/wait`; a new/reopened lookup wakes that request immediately, so initial token resolution no longer waits for the next inventory cycle. Background then asks all live `chatgpt.com` agents with `OBS_CHAT_CONTEXT_LOOKUP`; agents answer only from their own session store, so navigation after the capture cannot reinterpret an old token as the new current conversation. Background aggregates answers and POSTs `/v1/chat-context/result`. Duplicate answers for one conversation are equivalent; different conversation keys for one token are a conflict. Empty results remain pending in the extension's remembered request set. A bounded-wait timeout with an unchanged revision only renews the long-poll and does not re-query agents; unresolved tokens retry when Java changes the authoritative pending revision or on relevant tab lifecycle events. Inventory remains only conversation/task reconciliation and no longer carries lookup work.

This lookup is internal destination resolution, not an External Interaction. Apply and lookup run asynchronously. At the successful Apply ReviewDiff cutoff Java either binds/queues from a resolved token, or records that this ReviewDiff was skipped because binding was not ready/safe. Late resolution may persist the binding for future deliveries but never queues the already-skipped ReviewDiff. If repository Apply fails before that cutoff, Java transitions the lookup to `ApplyFailed`, removes it from the request channel, and ignores any late in-flight agent result. Retrying the exact same package/ChangeSet/token reopens the lookup (`Resolved` immediately when an already captured conversation is retained, otherwise `Pending` and request-driven again); a different package/ChangeSet still cannot reuse that token.

# OBS ChatGPT Bridge Extension

Status: V1 unpacked Chromium/Manifest V3 companion for Replacement Package App.
Primary acceptance browser: Microsoft Edge. Google Chrome is expected to be compatible but is not an acceptance target until separately checked.

## Install in Edge

1. Open `edge://extensions`.
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select this `chatgpt-bridge-extension/` directory.
4. Start Replacement Package App.
5. In the app click **Copy pairing token**.
6. Open the extension's **Options**, paste the token, and choose **Save and test**.
7. Keep the ordinary ChatGPT conversation(s) you want to use open at `https://chatgpt.com/c/<conversation-id>`.

## V1 behavior

- The extension reports all open ordinary ChatGPT conversations to the Java loopback bridge and groups multiple tabs with the same conversation key into one app choice.
- The extension service worker is the single owner of ChatGPT tab-agent injection. The manifest no longer auto-injects a second content-script lifecycle. On service-worker bootstrap, extension reload and tab navigation the background checks each ordinary ChatGPT tab, injects `chatgpt-adapter.js` + `content.js` only when a current agent is absent/stale, and fences agent traffic with a `chrome.storage.session` runtime generation plus one agent instance id per tab. A fresh same-generation injection disposes the prior agent/timer. A current-version old agent whose extension context is invalidated stops its heartbeat instead of repeatedly throwing `Extension context invalidated`. Upgrade boundary: a tab still running pre-`0.2.11` content code must be refreshed once after the extension update because that already-invalidated legacy code cannot retroactively gain the new disposal logic; later reloads use the replaceable-agent path without another page refresh.
- A ChangeSet may be bound to one conversation. The binding is stored by the Java app and is reused by continuation/correction packages with the same `changeSetId`.
- A new non-empty ReviewDiff for a bound ChangeSet is queued automatically. Extension `0.4.2` requires bridge protocol `5`. ReviewDiff and Repository Snapshot use one generic exact-attachment preparation module; any `autoSend=true` task then uses one generic Java-authorized guarded MAIN-world Send/retry/confirmation module. The first application-controlled possible-Send attempt enters `SendArmed` before the browser is allowed to click; a definitive no-click disarms back to `Preparing`, while an actual click advances to `SendClicked`. Later guarded retries for that same prepared attachment stay inside the already-established `SendClicked` possible-Send lifecycle and do not try to re-enter `SendArmed`. ReviewDiff always auto-sends. Snapshot is attach-only or attach+Send according to the app's frozen initial choice. Exact queued filename is the stronger optional turn-local Send proof, with the existing post-baseline user-turn fallback when stable attachment metadata is absent.
- The extension refuses any automatic attachment+Send delivery when the composer already contains a draft or attachment, and it stops before clicking Send if unrelated composer text appears after preparation.
- A snapshot task accepts only a Repository Snapshot ZIP selected by the Java app. `autoSend=false` attaches and stops at `Attached`; `autoSend=true` reuses the same generic guarded Send engine as ReviewDiff. No arbitrary local-file handoff is exposed.
- Projects, custom GPT surfaces, new-chat pages without a `/c/<id>` conversation key and other ChatGPT surfaces are outside V1.

## Security boundary

The Java bridge listens only on `127.0.0.1:17831`. Inventory/task control requires the random pairing token. The token is kept in extension storage restricted to trusted extension contexts; a ChatGPT content script never receives it. The content script receives only a short-lived artifact ticket plus the expected byte length/SHA-256 for one queued ReviewDiff or snapshot ZIP. Claims are bound to one tab and one conversation, and no arbitrary local-file or arbitrary-command endpoint exists.

The ChatGPT DOM is not a public API. All selectors and composer behavior are centralized in `src/chatgpt-adapter.js`; Edge/ChatGPT manual acceptance is required after meaningful ChatGPT UI changes.

Runtime lifecycle boundary: runtime generation is extension-session state, so ordinary Manifest V3 service-worker suspension/restart keeps the same generation while extension reload/update creates a fresh generation and stale tab agents are rejected/replaced. This correction hardens tab-agent ownership and Pending-task pickup; it does **not** claim transparent continuation of an already `Preparing`/`SendArmed`/`SendClicked` external interaction across reload/tab close. Existing lease/result truth still applies there (`PreparedUnsent` / `UnknownAfterSend` as appropriate).

Known accepted/deferred risk: after ReviewDiff upload-ready, adding a second unrelated attachment before the automatic click is not yet rejected. The current guard still blocks unrelated text and requires the intended prepared attachment; second-attachment hardening is not part of this correction.


### chatContextToken lookup

Protocol 5 also carries pending invocation-scoped chat-context lookups. Background keeps a bounded authenticated `/v1/chat-context/wait` request open; Java completes it when the pending lookup revision changes, so a newly received token wakes fan-out without waiting for inventory polling. A bounded-wait timeout that returns the same revision only renews the wait and does **not** fan out agents again; unresolved tokens are retried when the authoritative revision changes or on relevant tab lifecycle events. The returned pending snapshot is remembered by the extension. Each agent reads only `obsPlanningHelper:chatContextCaptures:v1` from its own tab `sessionStorage` and returns the stored click-time conversation context when present. The extension does not infer a token from current titles/URLs and does not delete captures after lookup. Results are returned to `/v1/chat-context/result`; repository Apply failure does not remove a pending lookup because token resolution owns binding/rebinding independently. This lookup is not an External Interaction or a delivery task.

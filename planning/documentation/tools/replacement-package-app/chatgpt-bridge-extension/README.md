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
- A new non-empty ReviewDiff for a bound ChangeSet is queued automatically. The Java bridge and extension both verify the queued artifact fingerprint. Extension `0.2.11` requires bridge protocol `2`; every claimed task is contract-validated before payload/composer mutation, so an older running Java bridge or invalid retry field fails as actionable `FailedBeforeSend` rather than false `UnknownAfterSend`. Every ReviewDiff is prepared as one exact `.diff` attachment through the shared attachment primitive under a browser-visible filename containing the delivery task identity; no direct editor insertion or small/large threshold is used. After the attachment is visible/upload-ready, the service worker performs guarded Send-control attempts in the ChatGPT page's MAIN world at the interval captured in the task from application Settings. Composer text and exact attachment presence are rechecked immediately before a click. The first actual click establishes the possible-Send boundary. After the prepared attachment leaves the composer, `Sent` requires a new post-baseline user turn whose complete conversation-turn container contains a file/attachment-like DOM surface exposing `.diff`; ordinary message text is not delivery proof. This turn-container scope corrects the live `44181531` case where the attachment was sent but the narrower message-author-node lookup returned `UnknownAfterSend`. Every preferred container candidate, including generic `article`, is accepted only when it contains exactly the current authored message node; the same ownership guard bounds fallback expansion, so neither path can cross into a neighboring authored turn. Full task-specific filename proof after Send is deferred until live DOM inspection shows which untruncated file metadata is stable. Attachment loss before any click is `PreparedUnsent`; loss after a possible click without `.diff` attachment-surface confirmation is `UnknownAfterSend`. Empty ReviewDiffs are suppressed as `NoChanges`.
- The extension refuses automatic ReviewDiff delivery when the composer already contains a draft or attachment, and it also stops before clicking Send if unrelated composer text appears after ReviewDiff preparation.
- A snapshot task accepts only a Repository Snapshot ZIP selected by the Java app. It reuses the same low-level attachment primitive but keeps separate product semantics: the extension attaches it to the chosen conversation and **never clicks Send** for snapshot tasks. Snapshot handoff semantics are intentionally not redesigned by the ReviewDiff correction.
- Projects, custom GPT surfaces, new-chat pages without a `/c/<id>` conversation key and other ChatGPT surfaces are outside V1.

## Security boundary

The Java bridge listens only on `127.0.0.1:17831`. Inventory/task control requires the random pairing token. The token is kept in extension storage restricted to trusted extension contexts; a ChatGPT content script never receives it. The content script receives only a short-lived artifact ticket plus the expected byte length/SHA-256 for one queued ReviewDiff or snapshot ZIP. Claims are bound to one tab and one conversation, and no arbitrary local-file or arbitrary-command endpoint exists.

The ChatGPT DOM is not a public API. All selectors and composer behavior are centralized in `src/chatgpt-adapter.js`; Edge/ChatGPT manual acceptance is required after meaningful ChatGPT UI changes.

Runtime lifecycle boundary: runtime generation is extension-session state, so ordinary Manifest V3 service-worker suspension/restart keeps the same generation while extension reload/update creates a fresh generation and stale tab agents are rejected/replaced. This correction hardens tab-agent ownership and Pending-task pickup; it does **not** claim transparent continuation of an already `Preparing`/`SendClicked` external interaction across reload/tab close. Existing lease/result truth still applies there (`PreparedUnsent` / `UnknownAfterSend` as appropriate).

Known accepted/deferred risk: after ReviewDiff upload-ready, adding a second unrelated attachment before the automatic click is not yet rejected. The current guard still blocks unrelated text and requires the intended prepared attachment; second-attachment hardening is not part of this correction.

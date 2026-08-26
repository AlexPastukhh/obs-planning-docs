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
- A ChangeSet may be bound to one conversation. The binding is stored by the Java app and is reused by continuation/correction packages with the same `changeSetId`.
- A new non-empty ReviewDiff for a bound ChangeSet is queued automatically. The Java bridge and extension both verify the queued artifact fingerprint. Extension `0.2.5` requires bridge protocol `2`; every claimed task is contract-validated before payload/composer mutation, so an older running Java bridge or invalid retry field fails as actionable `FailedBeforeSend` rather than false `UnknownAfterSend`. Every ReviewDiff is prepared as one exact `.diff` attachment through the shared attachment primitive; no direct editor insertion or small/large threshold is used. After the exact attachment is visible/upload-ready, the service worker performs guarded Send-control attempts in the ChatGPT page's MAIN world at the interval captured in the task from application Settings. Attempts may repeat only while that same attachment remains prepared; confirmed outgoing user turn ends as `Sent`, while attachment disappearance without confirmation becomes `UnknownAfterSend` and stops automation. Empty ReviewDiffs are suppressed as `NoChanges`.
- The extension refuses automatic ReviewDiff delivery when the composer already contains a draft or attachment.
- A snapshot task accepts only a Repository Snapshot ZIP selected by the Java app. It reuses the same low-level attachment primitive but keeps separate product semantics: the extension attaches it to the chosen conversation and **never clicks Send** for snapshot tasks. Snapshot handoff semantics are intentionally not redesigned by the ReviewDiff correction.
- Projects, custom GPT surfaces, new-chat pages without a `/c/<id>` conversation key and other ChatGPT surfaces are outside V1.

## Security boundary

The Java bridge listens only on `127.0.0.1:17831`. Inventory/task control requires the random pairing token. The token is kept in extension storage restricted to trusted extension contexts; a ChatGPT content script never receives it. The content script receives only a short-lived artifact ticket plus the expected byte length/SHA-256 for one queued ReviewDiff or snapshot ZIP. Claims are bound to one tab and one conversation, and no arbitrary local-file or arbitrary-command endpoint exists.

The ChatGPT DOM is not a public API. All selectors and composer behavior are centralized in `src/chatgpt-adapter.js`; Edge/ChatGPT manual acceptance is required after meaningful ChatGPT UI changes.

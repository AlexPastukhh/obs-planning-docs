# ChatGPT Bridge Integration

Status: active current integration contract
Scope: local Java ↔ Chromium extension handoff for ordinary `https://chatgpt.com/c/<conversation-key>` conversations. Browser delivery never becomes repository Apply/Finalize authority.

## Architecture and protocol

```text
Swing/Core
→ ChatBridgeService (persistent binding/task truth)
→ ChatBridgeServer on 127.0.0.1:17831
→ Manifest V3 service worker
→ one generation-fenced tab agent
→ ordinary ChatGPT conversation/composer
```

Current bridge protocol is `5`. Control requests use a random local pairing token. The extension service worker is the single ChatGPT tab-agent injector; manifest auto-injection is not used. Session runtime generation plus per-tab agent instance fencing prevents stale/replaced agents from controlling current work, and invalidated old agents stop heartbeat activity.

Open conversations are keyed by stable `conversationKey`, not title. Duplicate physical tabs for one conversation remain one application destination; claim serialization prevents duplicate concurrent delivery.

## Review-chat binding

One ChangeSet may persist one Review-chat binding.

- Manual selection binds through the normal service.
- Without a token, legacy `chatTabTitle` may resolve during Apply Prepare using the local ignored-character policy. Zero/multiple matches do not guess; a unique different destination requires interactive keep/rebind/cancel authorization before mutation, and title-assisted rebind persists only after successful Apply.
- `chatContextToken` comes only from an explicit one-invocation Bind side effect. Token presence suppresses title matching. `/v1/chat-context/wait` is request-driven: Java revision changes wake extension lookup; unchanged bounded wait timeout is only keepalive and does not periodically re-fan agents. A tab agent answers only from its own session capture for that exact token.
- Unique token resolution immediately binds/confirms/rebinds the captured conversation for the ChangeSet independent of repository Apply success/failure. Different-conversation results for one token are conflict and never guess. Token reuse for a different package/ChangeSet is rejected.
- Repository Apply never waits for token lookup. Resolution by the successful Apply ReviewDiff cutoff permits that current ReviewDiff queue; pending/conflict skips only that automatic delivery. Late unique resolution binds/rebinds for future work and never retro-sends the skipped ReviewDiff.

When a token rebind changes the persisted destination, safely cancellable older Pending/Claimed Review tasks may be cancelled; an interaction already Preparing/SendArmed/SendClicked keeps its frozen original destination.

## Generic exact-attachment delivery

ReviewDiff and Repository Snapshot use one generic browser attachment preparation path. ReviewDiff is always auto-send; Snapshot freezes attach-only or attach+Send intent.

Before composer mutation, Java/extension validate protocol, kind, exact destination, artifact metadata/payload URL, fingerprint and required retry interval. Deterministic incompatibility is `FailedBeforeSend`, never post-Send uncertainty.

For auto-send:

```text
exact artifact + destination
→ clean-composer guard
→ exact file-input attachment
→ verify exact filename/size/upload-ready
→ Preparing
→ Java SendArmed before first application-controlled browser click
→ guarded MAIN-world click
→ actual possible click → SendClicked
→ later guarded attempts remain in SendClicked while same attachment stays prepared
→ prepared attachment leaves composer + new post-baseline user turn → Sent
→ possible Send without confirmable post-baseline turn → UnknownAfterSend
```

A turn-local attachment/file surface exposing the exact queued filename is stronger optional evidence when ChatGPT exposes it, but current success does not depend on unstable file-card DOM metadata alone.

Attach-only Snapshot stops at `Attached` and never presses Send.

## External Interaction truth

Bridge task mechanics such as claim/lease/tab identity are not semantic External Interaction identity. One interaction keeps exact source, destination and user intent. Equivalent still-actionable requests reuse the same interaction; materially different source/destination/mode is separate; retry after terminal outcome creates a new identity.

Cancel before possible Send stops future automation. If content is already prepared, cancellation does not claim cleanup. Once Send may have happened, truth is Sent/UnknownAfterSend rather than false cancellation. Terminal `UnknownAfterSend` may be dismissed from the working/attention projection without changing persisted terminal truth.

Browser failure never rolls back or authorizes repository work.

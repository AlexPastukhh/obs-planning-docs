# Chat Response Reader Workflow

Status: working project-local End-To-End Workflow / prototype acceptance pending
Doc version: v0.1.1-source-accuracy-invariant
Scope: local read-only viewing of one ChatGPT assistant response through OBS Linked Notes with safe rich Markdown, native collapsible `details/summary`, exact paste fallback and no repository persistence.

## 1. Purpose

Provide one convenient way to read a long assistant response in a larger Linked Notes surface when the ChatGPT conversation view does not present every Markdown/HTML construct usefully.

The Reader is a temporary local projection. It is not a Linked Note, not a repository file and not chat-history persistence.

## 2. Trigger And Result

**Trigger:** the user opens `Reader`, pastes Markdown and renders it, or presses `Open in Reader` on one visible assistant response.

**Successful result:** the selected response is shown in a large read-only Reader using the existing safe rich-Markdown projection, including supported native collapsible `<details>/<summary>` blocks.

**Other explicit results:** exact pasted Markdown waiting to be rendered, DOM-derived Markdown with extraction diagnostics, extraction failure that falls back to paste mode, clipboard failure, or safely escaped unsupported/malformed HTML.

## 3. Source Accuracy Contract

The Reader has two source modes.

### Exact pasted Markdown

```text
sourceKind: paste
sourceAccuracy: exact
```

The textarea value is the Reader source exactly as pasted. Rendering may normalize line endings internally as a derived projection, but `Copy Markdown` copies the stored source text, not generated HTML.

### ChatGPT rendered-DOM derivation

```text
sourceKind: chat-dom
sourceAccuracy: derived
```

`Open in Reader` may reconstruct Markdown only from the currently rendered assistant-message DOM. That reconstruction is useful but is not presented as the original model source.

The DOM path should preserve visible headings, paragraphs, emphasis, lists, blockquotes, code, links, tables and native details where they can be derived safely. Unsupported elements produce diagnostics instead of a false claim of exact recovery.

If useful Markdown cannot be derived, the Reader opens its paste fallback rather than inventing missing content.

`sourceKind` and `sourceAccuracy` are an invariant pair: `chat-dom` is always `derived`, while content that the user actually renders from the Paste textarea is `paste` + `exact`. Starting a fresh Paste flow clears any prior DOM-derived Markdown, message/conversation keys, capture time and extraction diagnostics before the textarea is treated as exact input. A previously derived response must never become `exact` merely because the user opened Paste mode.

## 4. Details / Summary Contract

Supported first-slice form:

```html
<details>
<summary>More</summary>

Markdown body

</details>
```

The boolean `open` attribute is also supported:

```html
<details open>
...
</details>
```

Rules:

- `details` and `summary` are a narrow allowlist addition to the safe Markdown renderer;
- `summary` content may use the existing safe inline Markdown;
- the body uses the existing safe block Markdown renderer;
- arbitrary `details`/`summary` attributes are not enabled;
- scripts, iframes, event handlers and arbitrary active HTML remain escaped/blocked;
- `details` examples inside fenced code stay literal code;
- nested `details` are intentionally unsupported in this slice;
- malformed, nested or unclosed details syntax remains inert literal HTML instead of becoming partially active markup.

## 5. Reader Runtime State

The serializable semantic state is:

```text
schemaVersion
open
mode: paste | rendered
sourceKind: paste | chat-dom
sourceAccuracy: exact | derived
conversationKey
messageKey
markdown
capturedAt
status
renderDiagnostics
```

This state is runtime-only. No Reader history database or GM key is introduced.

DOM nodes, the Reader modal, MutationObserver handles and event callbacks are implementation handles rather than semantic state.

## 6. End-To-End Flow

```text
Open Reader
  → paste exact Markdown
  → Render pasted Markdown
  → safe rich Markdown projection
  → read / expand-collapse details
  → optional Copy Markdown
  → close Reader

or

visible assistant response
  → Open in Reader
  → derive Markdown from that one assistant-message DOM
  → mark source as derived
  → safe rich Markdown projection
  → if extraction is insufficient, use exact Paste Markdown fallback
  → optional Copy Markdown
  → close Reader.
```

## 7. ChatGPT DOM Integration Boundary

Assistant-message discovery uses semantic role markers when available, such as:

```text
data-message-author-role="assistant"
```

The enhancement must:

- add at most one `Open in Reader` action to one visible assistant response;
- not add that action to user messages;
- remain idempotent across normal ChatGPT rerenders;
- use a bounded local MutationObserver only for DOM enhancement;
- clean up the previous observer/actions when the runtime is replaced;
- avoid internal/private ChatGPT APIs;
- avoid class-name-only discovery as the sole contract;
- extract only the selected response, not unrelated conversation messages.

ChatGPT DOM remains external and changeable. Paste Markdown is the stable fallback when DOM integration no longer matches the page.

## 8. Reader UI

The Reader is larger than the ordinary Linked Notes work panel and remains viewport-bounded.

Prototype target:

```text
width  = min(1200px, viewport - 64px)
height = min(900px, viewport - 64px)
```

Controls:

```text
Paste Markdown
Render pasted Markdown
Copy Markdown
Close
```

`Escape` closes the Reader first and must not accidentally trigger the normal Linked Notes panel-close flow in the same key event.

Rendered links are inert in this slice. Images are not automatically loaded merely because a chat response was opened.

## 9. Safety Rules

- Opening, rendering, copying or closing Reader content performs no GitHub GET.
- Opening, rendering, copying or closing Reader content performs no GitHub PUT.
- Reader operations perform no `GM_setValue`.
- Reader operations perform no IndexedDB write.
- Reader operations do not call Note/file draft persistence.
- Reader content is not automatically converted into a Note or repository file.
- `Copy Markdown` is the only clipboard write in this workflow and happens only after explicit user action.
- Existing rich-Markdown URL/image sanitizer boundaries remain active.
- The Reader does not load external images automatically.
- Repository-relative image resources have no repository source context in a chat response and remain unloaded.
- No GitHub credential is needed to use Reader or paste fallback.

## 10. Full App State Handoff

The current Reader semantic state is application runtime state and therefore belongs in Full App State export when present.

A snapshot should contain the Reader fields above, including current Markdown, source kind/accuracy and extraction diagnostics.

Implementation handles such as DOM elements, observers and event listeners stay omitted/non-serializable.

## 11. Required Acceptance

Automated coverage should prove:

```text
exact pasted source stays exact in Reader state;
DOM-derived source is always labelled derived even if a caller requests `exact`;
fresh Paste after a derived response clears the old source/keys/diagnostics before any exact render;
common assistant DOM becomes readable Markdown;
Reader-injected buttons do not enter derived Markdown;
unsafe links do not become active destinations;
normal details/summary render natively;
details open is supported;
Markdown inside details renders safely;
hostile attributes/scripts remain inert;
fenced-code details remain literal;
nested/malformed details remain inert;
Reader copy returns the stored Markdown source;
Reader runtime state is captured by Full App State;
Reader core/runtime actions do not call repository or local-storage writes.
```

Browser acceptance should additionally prove (record the focused run in `planning/documentation/tools/tampermonkey/linked-notes/CHAT-RESPONSE-READER-CHECKLIST.md`):

```text
Reader is reachable from the Linked Notes workspace bar;
one Open in Reader action appears on each assistant response and not user responses;
normal ChatGPT rerenders do not duplicate Reader actions;
Open in Reader shows the selected response in the large modal;
source is visibly marked DOM-derived;
Paste Markdown remains usable if extraction fails;
details expand/collapse;
Escape closes Reader before the main Linked Notes panel;
opening/rendering/copying produces no GitHub network activity;
no Note/file is created automatically.
```

## 12. Boundaries

This workflow does not:

- store Reader history across reloads;
- claim DOM-derived Markdown is exact source Markdown;
- use private ChatGPT APIs;
- allow arbitrary raw HTML;
- support nested details in the first slice;
- navigate rendered links;
- load remote/external images automatically;
- create Notes/files from a response;
- import/restore application state;
- authorize repository, commit or push operations.

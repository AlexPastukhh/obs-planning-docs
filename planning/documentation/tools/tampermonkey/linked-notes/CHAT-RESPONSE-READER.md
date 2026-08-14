# Chat Response Reader Prototype Mapping

Status: implementation mapping / browser acceptance pending
Version: `0.7.2-prototype`
Owner: `planning/areas/documentation-workbench/chat-response-reader-workflow.md`

## User flow

Linked Notes exposes `Reader` in the workspace bar.

The modal provides:

```text
Paste Markdown
Render pasted Markdown
Copy Markdown
Close
```

Assistant messages on supported ChatGPT pages also receive a local `Open in Reader` action.

`Paste Markdown` is the exact-source fallback. `Open in Reader` derives Markdown from the selected rendered assistant-message DOM and labels the result `derived`; it never claims to have recovered the original model Markdown exactly.

The runtime enforces the source-accuracy pair rather than trusting caller labels: `chat-dom` always normalizes to `derived`. Entering a fresh Paste flow clears any prior derived Markdown, message/conversation identity, capture time and extraction diagnostics; only the text subsequently rendered from the Paste textarea is labelled `paste` + `exact`.

## Safe details support

`src/rich-markdown-renderer.js` now recognizes only the narrow block form:

```html
<details>
<summary>Summary</summary>

Markdown body

</details>
```

and the boolean `open` attribute.

The renderer keeps arbitrary active HTML blocked. Hostile attributes are not admitted, scripts/iframes remain escaped, code-fenced examples remain literal and nested/malformed details blocks become inert literal HTML.

## Reader modules

`src/chat-response-reader.js` owns:

```text
versioned Reader semantic state;
exact/derived source labels;
safe DOM-to-Markdown derivation;
extraction diagnostics.
```

`src/chat-response-reader-runtime.js` owns:

```text
large Reader modal;
Paste / Render / Copy / Close actions;
Reader-first Escape handling;
assistant-message action injection;
idempotent local MutationObserver enhancement;
runtime cleanup;
App/UI patch integration.
```

The runtime stores semantic state in `app.chatResponseReader`. DOM nodes, modal elements, observers and callbacks remain internal implementation handles.

## ChatGPT integration

Assistant discovery prefers:

```text
[data-message-author-role="assistant"]
```

The injected action is excluded from DOM-derived Markdown.

No private ChatGPT API is used. If the external DOM changes enough that useful Markdown cannot be derived, the Reader opens paste mode with an explicit extraction status.

## Local-only boundary

Reader operations perform no:

```text
GitHub GET;
GitHub PUT;
GM_setValue;
IndexedDB write;
Note/file auto-create;
draft persistence prerequisite.
```

Rendered links are inert. Chat-response image resources are not automatically loaded.

## Full App State integration

Because `chatResponseReader` is enumerable semantic App state, `src/full-app-state-runtime.js` captures it through the existing App runtime snapshot. The Full App State regression suite verifies that current Reader Markdown and source-accuracy fields remain visible.

## Build integration

The ordered userscript build loads:

```text
src/rich-markdown-renderer.js
src/chat-response-reader.js
...
src/repository-reference-objects-runtime.js
src/chat-response-reader-runtime.js
src/full-app-state-runtime.js
```

so the Reader core is available before App/UI use, the Reader runtime installs after the main Linked Notes/Files/Reference runtimes, and Full App State observes its semantic state.

This slice uses package version `0.7.2` / userscript `0.7.2-prototype`. The main prototype README and browser check record are updated in the same replacement package; focused Reader acceptance remains in `CHAT-RESPONSE-READER-CHECKLIST.md`.

Focused browser acceptance is recorded in `CHAT-RESPONSE-READER-CHECKLIST.md`; the large general `PROTOTYPE-CHECKLIST.md` remains the cross-feature record.

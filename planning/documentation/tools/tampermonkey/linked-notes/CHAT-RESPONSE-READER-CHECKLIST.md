# Chat Response Reader Browser Check Record

Status: unexecuted focused checklist
Prototype version: `0.7.2-prototype`
Owner: [`scenarios/README.md`](scenarios/README.md) / `UC-LN-READER`

Use this focused record for one concrete Chat Response Reader browser run. It supplements the general `PROTOTYPE-CHECKLIST.md`; no repository credentials or private chat content should be copied into evidence.

## Environment

| Field | Value |
|---|---|
| Date/time | |
| Tester | |
| Browser/version | |
| Tampermonkey/version | |
| ChatGPT origin | `chatgpt.com` / `chat.openai.com` |
| Viewport width x height / zoom | |
| Userscript SHA-256 | |
| Commit/ref containing tested source | |

## Automated preflight

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| A1 | Run `node verify-linked-notes.mjs`. | Complete configured test suite, syntax checks and generated freshness pass. | |
| A2 | Install/reload the generated userscript. | One Linked Notes `Docs` launcher loads without bootstrap errors. | |

## Reader / details acceptance

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| R1 | Open Linked Notes in dark ChatGPT and press `Reader` without configuring GitHub. | Large viewport-bounded Reader opens in fresh Paste mode; card, controls, textarea, source/status text and rendered surface use readable Linked Notes dark-theme foreground/background/borders rather than a white browser fallback. | |
| R2 | Paste Markdown containing headings, lists, code and a normal `<details><summary>...</summary>...</details>` block, then render. | Markdown renders safely and the details block expands/collapses natively. | |
| R3 | Render `<details open>`. | The block starts expanded. | |
| R4 | Render details containing `<script>`, `<iframe>`, event/style attributes and unsafe URL schemes. | Active HTML does not execute; unsupported/hostile input remains inert or escaped. | |
| R5 | Render a fenced code example containing details tags. | Tags remain literal code, not an active details element. | |
| R6 | Render nested or malformed/unclosed details syntax. | It remains inert literal HTML and does not create a partially active block. | |
| R7 | Press `Copy Markdown` after exact Paste rendering. | Clipboard receives the original pasted source text, not generated HTML. | |
| R8 | Confirm `Open in Reader` appears once on each assistant response and not on user responses. | Assistant-only actions are idempotent across normal rerenders. | |
| R9 | Open one assistant response through `Open in Reader`. | The selected response appears in Reader and is visibly labelled `ChatGPT rendered DOM · derived Markdown`. | |
| R10 | Close that derived response, then press top-bar `Reader`. | Fresh Paste mode is empty; prior derived Markdown, message/conversation keys and diagnostics are not relabelled as exact. | |
| R11 | From a derived response press `Paste Markdown`. | Paste textarea starts as a fresh exact-input flow; prior derived source is cleared before new text is rendered. | |
| R12 | Force/observe an assistant DOM shape that cannot produce useful Markdown. | Reader falls back to Paste mode with an explicit extraction status instead of claiming exact recovery. | |
| R13 | Press `Escape` while Reader is open. | Reader closes first; the main Linked Notes panel is not closed by the same key event. | |
| R14 | Record network/storage writes while opening, rendering, copying and closing Reader content. | No GitHub GET/PUT, `GM_setValue`, IndexedDB write, Note save or repository-file create occurs because of Reader. | |
| R15 | Open App state while Reader has content. | `chatResponseReader` contains current source kind/accuracy, Markdown, keys when known and diagnostics; DOM/observer handles are not semantic state. | |

## Result

| Field | Value |
|---|---|
| Overall | PASS / FAIL / BLOCKED |
| Blocking observations | |
| Follow-up issue / diff | |

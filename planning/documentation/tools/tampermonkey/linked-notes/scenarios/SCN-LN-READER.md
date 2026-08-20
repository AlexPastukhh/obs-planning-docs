# SCN-LN-READER — Read A ChatGPT Response In A Local Reader

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the user presses `Reader` and pastes Markdown, or presses `Open in Reader` on one visible assistant response.

**Successful result:** one response is shown in a large safe Markdown Reader with explicit source accuracy, or extraction failure falls back to Paste mode without falsely claiming exact source recovery.

**Current source modes:**

```text
Paste Markdown
  → sourceKind=paste
  → sourceAccuracy=exact;

Open in Reader
  → rendered assistant DOM derivation
  → sourceKind=chat-dom
  → sourceAccuracy=derived.
```

The Reader supports the documented narrow safe `<details>/<summary>` form, uses the Linked Notes dark theme and performs no GitHub/local-persistence write merely by opening/rendering/copying/closing.

**Boundary:** manual Paste is the current reliable exact transfer. DOM derivation is prototype evidence, not the selected long-term automatic transport architecture.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#9-chat-response-reader`](../APP-OVERVIEW.md#9-chat-response-reader), [`CHAT-RESPONSE-READER.md`](../CHAT-RESPONSE-READER.md), [`ARCHITECTURE.md#rich-markdown-and-reader`](../ARCHITECTURE.md#rich-markdown-and-reader).
- **Focused / repository contract:** Reader-target response conventions are in [`.linked-notes/CHAT-RESPONSE-FORMAT.md`](../../../../../../.linked-notes/CHAT-RESPONSE-FORMAT.md); current DOM-handoff limitation is tracked in [`KNOWN-ISSUES.md`](../KNOWN-ISSUES.md).
- **Primary implementation:** [`src/chat-response-reader.js`](../src/chat-response-reader.js), [`src/chat-response-reader-runtime.js`](../src/chat-response-reader-runtime.js), shared safe projection in [`src/rich-markdown-renderer.js`](../src/rich-markdown-renderer.js).
- **Automated evidence:** [`tests/chat-response-reader.test.mjs`](../tests/chat-response-reader.test.mjs), [`tests/chat-response-reader-runtime.test.mjs`](../tests/chat-response-reader-runtime.test.mjs), [`tests/rich-markdown-renderer.test.mjs`](../tests/rich-markdown-renderer.test.mjs).
- **Manual acceptance:** [`CHAT-RESPONSE-READER-CHECKLIST.md#reader--details-acceptance`](../CHAT-RESPONSE-READER-CHECKLIST.md#reader--details-acceptance).

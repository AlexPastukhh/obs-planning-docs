# SCN-LN-NOTE-TRANSFER — Copy A Linked Note And Repository Images

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the user starts transfer from a verified repository-backed Note, chooses a same-owner/repository/branch Markdown target and create/append mode, and reviews image classifications/destinations.

**Successful result:** visible Note Markdown is copied/appended to the target; supported repository images are copied or safely reused under target-owned assets; rewritten relative destinations and successful remote writes are verified, or an explicit partial/conflict result is shown.

**Boundaries:**

- copy, not move;
- source Note/assets remain intact;
- same owner/repository/branch only in the current slice;
- external images are not auto-downloaded;
- no promise of multi-file atomicity or automatic orphan cleanup.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#4-notes`](../APP-OVERVIEW.md#4-notes), [`ARCHITECTURE.md#images-and-transfer`](../ARCHITECTURE.md#images-and-transfer).
- **Focused / repository contract:** transfer remains a compound same-repository Note/image operation; repository image/link semantics are represented by the source modules below rather than a separate current `.linked-notes/**` transfer contract.
- **Primary implementation:** [`src/image-aware-markdown-transfer.js`](../src/image-aware-markdown-transfer.js), [`src/markdown-image-references.js`](../src/markdown-image-references.js), [`src/repository-media-loader.js`](../src/repository-media-loader.js), [`src/repository-asset-write.js`](../src/repository-asset-write.js), [`src/repository-text-file-write.js`](../src/repository-text-file-write.js), [`src/note-image-assets.js`](../src/note-image-assets.js).
- **Automated evidence:** [`tests/image-aware-markdown-transfer.test.mjs`](../tests/image-aware-markdown-transfer.test.mjs), [`tests/markdown-image-references.test.mjs`](../tests/markdown-image-references.test.mjs), [`tests/repository-media-loader.test.mjs`](../tests/repository-media-loader.test.mjs), [`tests/repository-asset-write.test.mjs`](../tests/repository-asset-write.test.mjs), [`tests/repository-text-file-write.test.mjs`](../tests/repository-text-file-write.test.mjs), [`tests/note-image-assets.test.mjs`](../tests/note-image-assets.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4h-image-aware-note-to-markdown-transfer`](../PROTOTYPE-CHECKLIST.md#4h-image-aware-note-to-markdown-transfer).

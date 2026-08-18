# SCN-LN-NOTES — Create, Link, Reconcile And Save Repository Notes

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-LN-NOTES`.

Related Application Use Case: [`UC-LN-NOTES`](../USE-CASE-REGISTRY.md)

**Trigger/input:** the user opens Notes to create or inspect a Note, edits title/body, manages links/categories/images, explicitly refreshes repository Notes, saves, recovers or navigates a Note relation.

**Successful result:** a durable repository-owned Markdown Note with stable identity/links can be found, reconciled with recoverable local working state and opened again; alternatively the UI exposes an explicit local-only/conflict/deleted/failed state without silently discarding local work.

**Current behavior includes:**

- local title/body drafts and IndexedDB recovery;
- links to repository files/anchors and other Notes;
- outgoing relation/backlink projections;
- pending clipboard/file images and verified repository image assets;
- explicit refresh/reconciliation of remote Notes;
- explicit verified Note save/recovery;
- Edit / Preview / Split rich Markdown presentation;
- handoff to `UC-LN-NOTE-TRANSFER` for copying one verified Note plus repository images.

**Boundary:** Note `Save GitHub` remains the established compound Note workflow and is not replaced by the generic pending-file publisher.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#4-notes`](../APP-OVERVIEW.md#4-notes), [`DATA-AND-STATE.md#4-indexeddb`](../DATA-AND-STATE.md#4-indexeddb), [`ARCHITECTURE.md#notes-and-relations`](../ARCHITECTURE.md#notes-and-relations), [`ARCHITECTURE.md#images-and-transfer`](../ARCHITECTURE.md#images-and-transfer).
- **Focused / repository contract:** repository-facing Linked Notes route starts at [`.linked-notes/README.md`](../../../../../../.linked-notes/README.md); Note transfer has its own canonical UC below.
- **Primary implementation:** [`src/linked-notes-core.js`](../src/linked-notes-core.js), [`src/note-markdown-codec.js`](../src/note-markdown-codec.js), [`src/indexeddb-note-store.js`](../src/indexeddb-note-store.js), [`src/remote-note-reconcile.js`](../src/remote-note-reconcile.js), [`src/note-relation-index.js`](../src/note-relation-index.js), [`src/note-image-assets.js`](../src/note-image-assets.js), [`src/pending-note-asset-store.js`](../src/pending-note-asset-store.js), with save/recovery orchestration in [`src/linked-notes-app.js`](../src/linked-notes-app.js).
- **Automated evidence:** [`tests/linked-notes-core.test.mjs`](../tests/linked-notes-core.test.mjs), [`tests/note-markdown-codec.test.mjs`](../tests/note-markdown-codec.test.mjs), [`tests/remote-note-reconcile.test.mjs`](../tests/remote-note-reconcile.test.mjs), [`tests/note-relation-index.test.mjs`](../tests/note-relation-index.test.mjs), [`tests/note-image-assets.test.mjs`](../tests/note-image-assets.test.mjs), [`tests/pending-note-asset-store.test.mjs`](../tests/pending-note-asset-store.test.mjs), Note integration cases in [`tests/linked-notes-app-policy.test.mjs`](../tests/linked-notes-app-policy.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4-github-folder-refresh-and-remote-change-reconciliation`](../PROTOTYPE-CHECKLIST.md#4-github-folder-refresh-and-remote-change-reconciliation), [`PROTOTYPE-CHECKLIST.md#9-local-note-and-link-checks`](../PROTOTYPE-CHECKLIST.md#9-local-note-and-link-checks), [`PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety`](../PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety), [`PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery`](../PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery).

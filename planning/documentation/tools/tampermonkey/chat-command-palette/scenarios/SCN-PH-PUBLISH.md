# SCN-PH-PUBLISH — Publish Helper Local Changes To Repository

Status: active current behavior owner
Scope: canonical detailed application behavior owner for explicit Helper→GitHub persistence.

**Trigger/input:** per-row `Save GitHub` for one real Planning Command/Prompt/legacy helper record, global `Save order GitHub` for current catalog order/presentation groups, or global `Publish local changes` for one reviewed batch of supported local file changes.

**Successful result:** per-row saves keep their deterministic current-SHA + exact read-back behavior; `Save order GitHub` creates/updates only `catalog-order.json`; `Publish local changes` previews dirty local direct Commands, helper-library records/Prompts and `catalog-order.json`, then publishes all changed supported files in **one GitHub commit**. The bulk path creates blobs + one tree + one commit and advances the configured branch ref non-force only when the previewed branch HEAD is still current. Exact post-publish file read-back refreshes local repository evidence.

**Conflict / atomicity boundary:** bulk preview freezes the current branch HEAD and local snapshot signature. Any local state change or remote branch advance before Execute fails closed and requires a fresh preview. Blob/tree/commit objects may be prepared before the ref update, but no repository-visible branch change occurs unless the single non-force ref update succeeds. Unknown ref-update network outcome is accepted only when rereading the branch proves the prepared commit is now HEAD. Per-row optimistic conflict behavior remains unchanged.

**Publish scope boundary:** bulk publish writes only direct `planning/commands/*.command.md`, helper-library Command/Prompt files and `catalog-order.json`. Local repository delete/suppression stays local-only. Use-Case / Target-Module / Lens / Scenario projection overrides are never bulk-published as generated semantic authority.

**Semantic boundary:** order/group persistence changes presentation only; it does not change Command/Scenario/UC/TM/Lens meaning. Commands order uses stable semantic IDs for UC/TM/Lens cards.

**Traceability:**

- **Product / behavior:** [`README.md#save-github--save-order-github--publish-local-changes`](../README.md#save-github--save-order-github--publish-local-changes).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-publish`](../MANUAL-ACCEPTANCE.md#scn-ph-publish).

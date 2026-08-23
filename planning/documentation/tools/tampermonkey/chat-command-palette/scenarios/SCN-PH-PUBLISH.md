# SCN-PH-PUBLISH — Publish One Helper Record Or Durable Catalog Order To Repository

Status: active current behavior owner
Scope: canonical detailed application behavior owner for explicit Helper→GitHub persistence.

**Trigger/input:** per-row `Save GitHub` for a real Planning Command/Prompt/legacy helper record, or global `Save order GitHub` for current catalog order.

**Successful result:** a deterministic Command/Prompt target is created, exact-no-op confirmed, or updated using current remote SHA and exact read-back verification; `Save order GitHub` creates/updates only `catalog-order.json` with current ordered stable IDs.

**Conflict boundary:** optimistic conflicts are reread once. If remote bytes already equal intended bytes, the write is recovered as verified success without a second PUT. If bytes differ, nothing is overwritten automatically. A verified remote result remains remote success even if later local metadata persistence fails.

**Semantic boundary:** order persistence changes presentation/order only; it does not change Direction/Command/Use-Case meaning.

**Traceability:**

- **Product / behavior:** [`README.md#save-github--save-order-github`](../README.md#save-github--save-order-github).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-publish`](../MANUAL-ACCEPTANCE.md#scn-ph-publish).

# SCN-PH-SYNC — Bring Missing Repository Content Into Local State

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** explicit `Sync missing`.

**Successful result:** supported repository records missing by deterministic path are fetched, parsed/validated and added to local snapshot/RAM; existing same-path local records are preserved.

**Boundary:** Sync is repository → local only for missing paths. It is not freshness reconciliation, conflict resolution or overwrite/synchronize-all.

**Traceability:**

- **Product / behavior:** [`README.md#sync-missing`](../README.md#sync-missing).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-sync`](../MANUAL-ACCEPTANCE.md#scn-ph-sync); real-GitHub acceptance remains explicit.

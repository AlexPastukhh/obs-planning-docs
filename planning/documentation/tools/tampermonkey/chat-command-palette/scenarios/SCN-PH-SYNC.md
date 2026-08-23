# SCN-PH-SYNC — Bring Missing / Selected Repository Content Into Local State

Status: active current behavior owner
Scope: canonical detailed application behavior owner for non-authoritative incremental repository→local acquisition and one-command replacement.

**Trigger/input:** explicit `Sync missing`, or `Reload` on one tracked Planning Command.

**Successful result:** `Sync missing` adds repository Directions, Commands, Use Cases and Prompt/helper records absent locally without overwriting same-ID/path local records; `Reload` replaces one selected Planning Command with verified remote content.

**Boundary:** `Sync missing` is additive and not a complete freshness reset. Complete repository→local recovery/reconciliation of Direction/Command/Use-Case catalogs and durable order belongs to `SCN-PH-RECOVER` through `Hard Reload GitHub`. Neither branch publishes local content.

**Traceability:**

- **Product / behavior:** [`README.md#sync-missing`](../README.md#sync-missing), [`README.md#reload-one-command`](../README.md#reload-one-command).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-sync`](../MANUAL-ACCEPTANCE.md#scn-ph-sync).

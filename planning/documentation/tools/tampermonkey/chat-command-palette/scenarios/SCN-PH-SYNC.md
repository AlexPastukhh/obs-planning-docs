# SCN-PH-SYNC — Bring Repository Content Into Local State

Status: active current behavior owner
Scope: canonical detailed application behavior owner for explicit repository→local acquisition/replacement.

**Trigger/input:** explicit `Sync missing`, or `Reload GitHub` on one tracked Planning Command.

**Successful result:**

- `Sync missing` fetches supported repository records absent by deterministic path, parses/validates them and adds them to local snapshot/RAM without overwriting existing same-path records;
- `Reload GitHub` fetches one selected tracked Planning Command and explicitly replaces that local command draft/record with the current verified remote command.

**Boundary:** `Sync missing` is missing-only and not freshness reconciliation. Same-path overwrite occurs only for the user-selected `Reload GitHub` command action. Neither branch publishes local content to GitHub.

**Traceability:**

- **Product / behavior:** [`README.md#sync-missing`](../README.md#sync-missing), [`README.md#reload-github`](../README.md#reload-github).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-sync`](../MANUAL-ACCEPTANCE.md#scn-ph-sync); real-GitHub acceptance remains explicit.

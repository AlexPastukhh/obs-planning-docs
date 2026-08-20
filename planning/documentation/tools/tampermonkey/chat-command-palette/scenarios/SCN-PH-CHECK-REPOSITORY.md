# SCN-PH-CHECK-REPOSITORY — Inspect Local And Repository Inventory

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** explicit `Check GitHub` on a repository-backed surface.

**Successful result:** the user sees local/GitHub counts, same-path entries, local-only/GitHub-only paths and known direct-SHA changes without local mutation.

**Boundary:** same-path means only that the deterministic path exists on both sides. It does **not** imply equal file content unless direct SHA/content evidence establishes that separately. The check intentionally does not GET every body for inventory comparison.

**Traceability:**

- **Product / behavior:** [`README.md#check-github`](../README.md#check-github).
- **Focused / durable contract:** supported repository path families come from [`planning/commands/README.md`](../../../../../commands/README.md) and [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-check-repository`](../MANUAL-ACCEPTANCE.md#scn-ph-check-repository); real-GitHub acceptance is not implied by unit tests.

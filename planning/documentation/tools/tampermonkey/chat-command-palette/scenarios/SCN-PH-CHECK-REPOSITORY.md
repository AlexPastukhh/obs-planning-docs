# SCN-PH-CHECK-REPOSITORY — Inspect Local And Repository Inventory

Status: active current behavior owner
Scope: canonical detailed application behavior owner for explicit non-mutating local↔GitHub inventory review.

**Trigger/input:** explicit `Check GitHub`.

**Successful result:** the user sees local/GitHub counts and missing/changed evidence for Planning Commands, Directions, Use Cases, Prompts/helper records and durable catalog order, without local mutation.

**Boundary:** same path/ID means inventory overlap only. It does not prove equal content unless SHA/content evidence establishes that separately. The action remains explicit and does not publish or reconcile local state.

**Traceability:**

- **Product / behavior:** [`README.md#check-github`](../README.md#check-github).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/semantic-navigation.test.mjs`](../tests/semantic-navigation.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-check-repository`](../MANUAL-ACCEPTANCE.md#scn-ph-check-repository).

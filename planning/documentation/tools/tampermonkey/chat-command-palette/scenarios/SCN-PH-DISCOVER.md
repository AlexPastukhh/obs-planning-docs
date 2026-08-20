# SCN-PH-DISCOVER — Find And Inspect Planning Helper Content

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the helper starts/opens, the user selects a surface or searches/browses current content.

**Successful result:** a current local command/helper/prompt or read-only semantic projection can be found and inspected from materialized RAM state without implicit GitHub access.

**Boundary:** startup/migration/materialization are supporting mechanisms, not separate outcomes. Semantic projections remain read-only projections of their own repository owners.

**Traceability:**

- **Product / behavior:** [`README.md#runtime-model`](../README.md#runtime-model), [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot).
- **Focused / durable contract:** planning-command authority starts at [`planning/commands/README.md`](../../../../../commands/README.md); helper files use [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/semantic-projections.js`](../src/semantic-projections.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-discover`](../MANUAL-ACCEPTANCE.md#scn-ph-discover).

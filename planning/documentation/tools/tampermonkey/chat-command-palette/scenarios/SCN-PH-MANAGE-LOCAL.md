# SCN-PH-MANAGE-LOCAL — Manage Local Helper Content

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** New local/New prompt/Edit/Save local/Delete on helper command or prompt content.

**Successful result:** a normalized helper record is created, changed or deleted in the unified local snapshot and current RAM view without an implicit repository mutation.

**Current invariants:**

- unchanged Edit → Save local is a no-op for the helper item and preserves repository evidence metadata;
- a real local content change updates `updatedAt` and invalidates exact-content repository evidence for that record;
- local Delete does not delete repository content.

**Boundary:** Repository persistence is a separate `SCN-PH-PUBLISH` intent.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#repository-backed-entities`](../README.md#repository-backed-entities).
- **Focused / durable contract:** [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/helper-library-codec.js`](../src/helper-library-codec.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/helper-library-codec.test.mjs`](../tests/helper-library-codec.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-manage-local`](../MANUAL-ACCEPTANCE.md#scn-ph-manage-local).

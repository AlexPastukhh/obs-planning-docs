# SCN-PH-IMPORT — Import Helper Content From ChatGPT

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** Import from ChatGPT with supported planning-command/helper-library marker blocks and/or one `PLANNING_HELPER_PATCH` block.

**Successful result:** the complete candidate change is validated atomically and then merged into local snapshot/RAM state. Patch upserts cover direct Commands, helper items, Use Cases, semantic components, Scenarios and optional catalog order; patch deletes remove/suppress the selected natural keys so ordinary `Sync missing` does not immediately restore them. Changed imported content loses exact repository evidence until separately verified/published.

**Boundary:** Import performs zero GitHub requests and does not imply repository persistence or semantic ownership. Direct Command/Prompt persistence keeps its explicit Save GitHub path; semantic projections remain local until their canonical repository owners/build route changes. Hard Reload GitHub clears import suppression.

**Traceability:**

- **Product / behavior:** [`README.md#chatgpt-import-and-recovery`](../README.md#chatgpt-import-and-recovery).
- **Focused / durable contract:** command marker contract is owned by [`planning/commands/README.md`](../../../../../commands/README.md); helper marker contract by [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/chat-recovery.js`](../src/chat-recovery.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/chat-recovery.test.mjs`](../tests/chat-recovery.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-import`](../MANUAL-ACCEPTANCE.md#scn-ph-import).

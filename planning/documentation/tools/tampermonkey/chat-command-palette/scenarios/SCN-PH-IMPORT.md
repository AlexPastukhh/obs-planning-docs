# SCN-PH-IMPORT — Import Helper Content From ChatGPT

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** Import from ChatGPT with supported planning-command/helper-library marker blocks and/or one `PLANNING_HELPER_PATCH` block.

**Successful result:** the complete candidate change is validated atomically and then merged into local snapshot/RAM state. Natural-key duplicates and upsert/delete conflicts fail closed. `useCases` owns UC import state and automatically keeps its coupled `USE_CASE` semantic projection synchronized; `semanticComponents` accepts only Target Modules/Lenses. Direct-command delete mirrors command-file removal and may leave the semantic capability as a generic card, while Use-Case/TM/Lens capability delete suppresses that semantic projection and keeps any direct backing hidden rather than exposing it as General. Patch deletes remain suppressed from ordinary `Sync missing`. Changed imported content loses exact repository evidence until separately verified/published.

**Boundary:** Import performs zero GitHub requests and does not imply repository persistence or semantic ownership. Direct Command/Prompt persistence keeps its explicit Save GitHub path; semantic projections remain local until their canonical repository owners/build route changes. Hard Reload clears Import suppression only for the catalogs it reloads; helper-library suppression remains with the preserved Prompt/helper-library local state.

**Traceability:**

- **Product / behavior:** [`README.md#chatgpt-import-and-recovery`](../README.md#chatgpt-import-and-recovery).
- **Focused / durable contract:** command marker contract is owned by [`planning/commands/README.md`](../../../../../commands/README.md); helper marker contract by [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/chat-recovery.js`](../src/chat-recovery.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/chat-recovery.test.mjs`](../tests/chat-recovery.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-import`](../MANUAL-ACCEPTANCE.md#scn-ph-import).

# SCN-PH-USE — Use Helper Content In ChatGPT

Status: active current behavior owner
Scope: detailed application behavior and traceability for `UC-PH-USE`.

Related Application Use Case: [`UC-PH-USE`](../USE-CASE-REGISTRY.md)

**Trigger/input:** the user chooses a command/helper/prompt row, Full/refinement or Copy/Insert action.

**Successful result:** the exact selected RAM text is available on the clipboard and/or inserted into the current ChatGPT composer; repository availability does not affect the normal insertion path.

**Boundary:** Copy/Insert are delivery mechanisms of one user outcome, not separate Use Cases. Planning-command insertion does not grant permissions beyond the command definition.

**Traceability:**

- **Product / behavior:** [`README.md#clipboard--insert-contract`](../README.md#clipboard--insert-contract), [`planning/documentation/tampermonkey-command-projection-workflow.md`](../../../../tampermonkey-command-projection-workflow.md).
- **Focused / durable contract:** planning-command inserted bodies derive from [`planning/commands/*.command.md`](../../../../../commands/README.md); helper text format is [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/composer-insertion.js`](../src/composer-insertion.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/command-body.js`](../src/command-body.js).
- **Automated evidence:** [`tests/composer-insertion.test.mjs`](../tests/composer-insertion.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/command-body.test.mjs`](../tests/command-body.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#uc-ph-use`](../MANUAL-ACCEPTANCE.md#uc-ph-use).

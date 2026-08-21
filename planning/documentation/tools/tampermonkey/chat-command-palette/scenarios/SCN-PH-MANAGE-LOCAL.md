# SCN-PH-MANAGE-LOCAL — Manage Planning Commands And Prompts

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns local draft/edit behavior for real Planning Commands and reusable prompts.

**Trigger/input:** `New command`, command `Edit`, `New prompt`, prompt `Edit`, local draft save/delete, or edit of a legacy helper-command compatibility insertion.

**Successful result:** a validated Planning Command draft or prompt/helper compatibility record is created/changed/deleted in the unified local snapshot and RAM without an implicit repository mutation.

**Current invariants:**

- the Commands surface represents real `planning/commands/*.command.md` definitions; a local edit is a draft, not a second command authority;
- editing an existing command cannot change its stable `id` or `file`; create a new command draft for a new identity/path;
- the complete local command catalog is validated before a command draft is accepted;
- unchanged local save preserves repository evidence; a real edit clears exact-content evidence while retaining tracked-command provenance;
- unregistered command drafts may be deleted locally; registered command retirement/deletion is not a local Delete action;
- prompt edits remain exact insertion-text edits; legacy helper-command records remain compatibility-only and the current UI does not create new ones.

**Boundary:** repository persistence is separate `SCN-PH-PUBLISH`; explicit repository→local replacement of a command is `Reload GitHub`, not an implicit freshness sync.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#repository-backed-entities`](../README.md#repository-backed-entities).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/command-definition-codec.js`](../src/command-definition-codec.js), [`src/command-catalog.js`](../src/command-catalog.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/command-definition-codec.test.mjs`](../tests/command-definition-codec.test.mjs), [`tests/command-catalog.test.mjs`](../tests/command-catalog.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-manage-local`](../MANUAL-ACCEPTANCE.md#scn-ph-manage-local).

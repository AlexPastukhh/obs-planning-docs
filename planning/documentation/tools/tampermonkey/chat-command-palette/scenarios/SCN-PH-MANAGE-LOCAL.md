# SCN-PH-MANAGE-LOCAL — Manage Helper-Local Commands, Use Cases And Prompts

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns Helper-local create/edit/delete behavior for Planning Commands, Use-Case projections and reusable prompts.

**Trigger/input:** `New command`, command `Edit`, `New prompt`, prompt `Edit`, or local `Delete` on a Command, Use Case, Prompt or legacy helper-command compatibility insertion.

**Successful result:** the selected Helper-local Command/Use-Case/Prompt state is created/changed/deleted in the unified local snapshot/RAM without an implicit repository mutation; deleting a registered Command or Use-Case projection never deletes its canonical repository authority.

**Current invariants:**

- the Commands surface represents real `planning/commands/*.command.md` definitions; a local edit is a draft, not a second command authority;
- editing an existing command cannot change its stable `id` or `file`; create a new command draft for a new identity/path;
- the complete local command catalog is validated before a command draft is accepted;
- unchanged local save preserves repository evidence; a real edit clears exact-content evidence while retaining tracked-command provenance;
- any visible Planning Command may be removed from this Helper locally; registered command retirement/deletion remains a separate repository action and the canonical `planning/commands/*.command.md` file is untouched;
- any visible Use Case may be removed from this Helper locally; canonical Use-Case registry/owner meaning is untouched;
- prompt edits remain exact insertion-text edits; Prompt Delete remains local-only; legacy helper-command records remain compatibility-only and the current UI does not create new ones;
- generated `seed/commands.json` and `seed/use-cases.json` ship the complete current default catalogs in the update; local tombstones prevent intentionally deleted items from being silently re-added on ordinary startup.

**Boundary:** repository persistence is separate `SCN-PH-PUBLISH`; explicit repository→local replacement of a command is `Reload GitHub`, not an implicit freshness sync.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#repository-backed-entities`](../README.md#repository-backed-entities).
- **Focused / durable contract:** [`planning/commands/README.md`](../../../../../commands/README.md), [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/command-definition-codec.js`](../src/command-definition-codec.js), [`src/command-catalog.js`](../src/command-catalog.js), [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/command-definition-codec.test.mjs`](../tests/command-definition-codec.test.mjs), [`tests/command-catalog.test.mjs`](../tests/command-catalog.test.mjs), [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-manage-local`](../MANUAL-ACCEPTANCE.md#scn-ph-manage-local).
- generated UC invocation commands may be hidden locally without hiding the corresponding Use Case; their tombstone uses `hiddenCommandIds` and never changes canonical registries.


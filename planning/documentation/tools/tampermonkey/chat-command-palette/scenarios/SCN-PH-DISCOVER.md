# SCN-PH-DISCOVER — Find And Inspect Planning Helper Content

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** the helper starts/opens, the user selects a surface or searches/browses current content.

**Successful result:** Commands and all current canonical Use Cases can be found from separate surfaces through a top-level local Favorites projection plus collapsible current Direction groups, while prompts/legacy compatibility remain available as their own supported content; browsing/searching uses materialized RAM state without implicit GitHub access.

**Boundary:** Favorites and Direction groups are navigation only and never become semantic authority. Favoriting duplicates the same Command/UC row above Directions while leaving the original row in its Direction. Commands remain command definitions; Use Cases remain semantic projections even when a UC also has a command shortcut. Startup/migration/materialization are supporting mechanisms, not separate outcomes.

**Traceability:**

- **Product / behavior:** [`README.md#runtime-model`](../README.md#runtime-model), [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot).
- **Focused / durable contract:** planning-command authority starts at [`planning/commands/README.md`](../../../../../commands/README.md); helper files use [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/semantic-projections.js`](../src/semantic-projections.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-discover`](../MANUAL-ACCEPTANCE.md#scn-ph-discover).
**Registry parity invariant:** every current canonical Use Case found in current `planning/**/use-case-registry.md` files must appear exactly once in the Use Cases surface; the build fails on projection/seed parity drift.


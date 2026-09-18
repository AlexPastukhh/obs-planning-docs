# SCN-PH-MANAGE-LOCAL — Manage Helper-Local Catalogs, Prompts And Layout

Status: active current behavior owner
Scope: local draft/Favorite/order/layout work without implicit repository mutation.

**Trigger/input:** local direct Command/Prompt create/edit/delete, Favorite toggle, item `↑`/`↓`, command **Group** change, panel drag or resize.

**Successful result:** selected Helper-local content/preferences/order/layout change in RAM/local persistence only; canonical GitHub content remains untouched until an explicit repository action.

**Current invariants:**

- only real direct Planning Commands are editable command drafts;
- generic/generated semantic UC/TM/Lens cards are projection-only;
- semantic Command Favorites use stable `uc:/tm:/lens:` IDs; legacy direct favorite/order IDs are recognized during migration;
- `↑` / `↓` changes local order; **Group** changes only presentation membership in `catalogOrder.commandGroups`; neither operation changes semantic identity;
- `Save order GitHub` is required for durable repository order/group layout;
- Prompt edits remain local-first and are not overwritten by semantic-catalog Hard Reload;
- panel position/size are local UI state only;
- local content/order changes make zero GitHub requests.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#catalog-order`](../README.md#catalog-order), [`README.md#ui-layout--safety-boundary`](../README.md#ui-layout--safety-boundary).
- **Primary implementation:** [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-manage-local`](../MANUAL-ACCEPTANCE.md#scn-ph-manage-local).

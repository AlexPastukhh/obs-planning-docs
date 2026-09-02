# SCN-PH-MANAGE-LOCAL — Manage Helper-Local Catalogs, Prompts And Layout

Status: active current behavior owner
Scope: canonical detailed application behavior owner for local draft/hide/Favorite/order/layout work without implicit repository mutation.

**Trigger/input:** local Command/Prompt create/edit/delete, Command/Use-Case hide, Favorite toggle, item `↑`/`↓`, panel drag or resize.

**Successful result:** selected Helper-local content/preference/order/layout changes in RAM/local persistence only; canonical GitHub content remains untouched until an explicit repository action.

**Current invariants:**

- real Planning Commands are local drafts of GitHub-backed `planning/commands/*.command.md` records;
- current Use Cases are local materializations of the GitHub-backed generated catalog whose semantic authority remains canonical registries;
- a visible Command/Use Case may be hidden locally without deleting repository authority;
- Favorite state stores only stable IDs and duplicates the same row in `★ Favorites`;
- `↑` / `↓` changes only local `catalogOrder`; unknown/new IDs append rather than disappear;
- `Save order GitHub` is required when local order should become durable repository order;
- Prompt edits remain local-first and are not overwritten by Command/Use-Case Hard Reload;
- panel position and size are local UI state only;
- local content/order changes make zero GitHub requests.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#catalog-order`](../README.md#catalog-order), [`README.md#ui-layout`](../README.md#ui-layout).
- **Primary implementation:** [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/semantic-projections.js`](../src/semantic-projections.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-manage-local`](../MANUAL-ACCEPTANCE.md#scn-ph-manage-local).

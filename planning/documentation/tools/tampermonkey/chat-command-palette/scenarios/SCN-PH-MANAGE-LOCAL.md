# SCN-PH-MANAGE-LOCAL — Manage Helper-Local Catalogs, Prompts And Layout

Status: active current behavior owner
Scope: local draft/Favorite/order/layout work without implicit repository mutation.

**Trigger/input:** local direct Command/Prompt create/edit/delete, Favorite toggle, command presentation-group change, **Manage groups** create/rename/reorder/delete, group filter selection, group collapse/expand, Prompt `↑` / `↓` reorder or direct `№` position entry, panel drag or resize.

**Successful result:** selected Helper-local content/preferences/order/layout change in RAM/local persistence only; canonical GitHub content remains untouched until an explicit repository action.

**Current invariants:**

- only real direct Planning Commands are editable command drafts;
- generic/generated semantic UC/TM/Lens cards are projection-only;
- semantic Command Favorites use stable `uc:/tm:/lens:` IDs; legacy direct favorite/order IDs are recognized during migration;
- the detail-pane Group selector changes only presentation membership in `catalogOrder.commandGroups`; it never changes semantic identity;
- presentation groups form one ordered list per Commands classification and can be created, renamed, reordered and deleted locally; deleting a group moves its cards to `Other / Ungrouped`; there is no Primary/Advanced/Semantic tier;
- each Commands classification remembers its selected-group filter locally; first selection from All isolates one group and further selections build a multi-group filter;
- each ordinary group remembers collapsed/expanded state per classification locally; the top Favorites group has one shared collapsed/expanded state across classifications, and sidebar Categories/Groups remember their own state; these personal UI states are not part of `catalog-order.json`;
- choosing a category/group, searching or toggling a Favorite preserves the sidebar scroll position across list refreshes, clamped only if the refreshed sidebar is shorter; collapsing a list group updates it in place;
- Prompt ordering uses the same local `catalogOrder.prompts` state for both fine-grained `↑` / `↓` moves and direct 1-based `№` target-position moves; entering an empty position performs no move, and entered values are constrained to the current `1..N` range;
- Prompt reorder preserves the currently selected Prompt and the list viewport. Arrow moves restore the prior `scrollTop` instead of jumping to the beginning; after a large numeric move the selected card is brought into view only with nearest scrolling rather than resetting the list to the top;
- `Save order GitHub` is required for durable repository order/group layout; local reorder itself performs no implicit repository write;
- Prompt edits remain local-first and are not overwritten by semantic-catalog Hard Reload;
- panel position/size are local UI state only;
- local Delete physically removes the selected local direct Command or Use Case and records same-entity suppression so ordinary `Sync missing` does not immediately restore it; there is no hidden-row tombstone layer;
- local content/order changes make zero GitHub requests.

**Traceability:**

- **Product / behavior:** [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#catalog-order`](../README.md#catalog-order), [`README.md#ui-layout--safety-boundary`](../README.md#ui-layout--safety-boundary).
- **Primary implementation:** [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-manage-local`](../MANUAL-ACCEPTANCE.md#scn-ph-manage-local).

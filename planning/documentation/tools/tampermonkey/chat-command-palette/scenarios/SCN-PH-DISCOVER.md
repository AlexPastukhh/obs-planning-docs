# SCN-PH-DISCOVER — Find And Inspect Planning Helper Content

Status: active current behavior owner
Scope: canonical detailed application behavior owner for discovering current Helper projections.

**Trigger/input:** the helper starts/opens, the user selects `Commands`, `Scenarios` or `Prompts`, selects a Commands classification, or searches/browses current content.

**Successful result:** current semantic Commands, canonical working Scenarios and Prompts can be found from the three top-level surfaces using materialized RAM state without implicit GitHub access. Within Commands, `General`, `Use Cases`, `Target Modules`, `Lenses` and `Tools / Repository` are ordinary classifications; each command has exactly one primary classification/group membership. Entering a classification immediately exposes all of its groups, while `All commands` is only a cross-tab overview. Group filtering improves browsing without becoming semantic authority. Favorites is always the first, independently collapsible group in the Commands list, including when empty. It shows favorites across classifications and selected-group filters; search still applies. Its cards also remain in their ordinary groups and share selection, actions and favorite state through the same stable Command ID. Favorites do not change catalog membership or duplicate authority. Categories and Groups in the sidebar can be collapsed independently. Context, Result and Essence in the command detail start collapsed; opening one preserves that command’s section state during the current UI session.

**Boundary:** Favorites/order/presentation groups/navigation never become semantic authority. One current UC/TM/Lens capability has one primary semantic card. A direct command definition may supply that card's invocation body without replacing its semantic owner. Startup/migration/materialization are supporting mechanisms, not separate outcomes.

**Registry parity invariant:** every current projected methodology UC/TM/Lens appears exactly once as a primary semantic Command card; retired compatibility entries do not become current semantic cards. The build fails on projection/seed parity drift.

**Traceability:**

- **Product / behavior:** [`README.md#projection-model`](../README.md#projection-model), [`README.md#unified-local-snapshot`](../README.md#unified-local-snapshot), [`README.md#commands-navigation`](../README.md#commands-navigation).
- **Focused / durable contract:** planning-command authority starts at [`planning/commands/README.md`](../../../../../commands/README.md); semantic authority remains in current methodology registries/owners; helper files use [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/planning-helper-state.js`](../src/planning-helper-state.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/semantic-projections.js`](../src/semantic-projections.js), [`src/methodology-navigation.js`](../src/methodology-navigation.js).
- **Automated evidence:** [`tests/planning-helper-state.test.mjs`](../tests/planning-helper-state.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/methodology-navigation.test.mjs`](../tests/methodology-navigation.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-discover`](../MANUAL-ACCEPTANCE.md#scn-ph-discover).

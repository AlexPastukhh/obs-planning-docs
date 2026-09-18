# SCN-PH-USE — Use Helper Content In ChatGPT

Status: active current behavior owner
Scope: canonical detailed application behavior owner for grouped command navigation, selected-command meaning/detail, Run/Body/Scenario navigation and explicit invocation side effects.

**Trigger/input:** the user enters a Commands classification, selects one or several groups, collapses/expands a group, selects a semantic/general/tool Command or Prompt, opens `Body`, opens `Scenarios N`, runs a command, or uses an explicit one-shot Bind variant when offered.

**Successful result:** entering a normal Commands classification immediately exposes all groups for that classification in a group navigator. The user can show all groups, isolate one group, or select several groups; ordered group containers remain browsable below and preserve collapsed/expanded state. Selecting a Command opens a detail pane with canonical **Контекст / Результат / Суть**, `Run`, `Body`, `Scenarios N`, Favorite and presentation-group controls. `All commands` remains a cross-tab overview rather than an orphan-command destination. Direct-command Body also carries canonical `context / result / essence`. Scenario steps render canonical prose plus derived command equivalents. Normal use is local and network-independent.

**Boundary:** the detail-pane `Контекст / Результат / Суть` projection is not a second prose authority: direct cards derive it from direct-command fields and semantic cards from their canonical UC/TM/Lens owners. Canonical working Scenarios never own command IDs/triggers/body text; command equivalents are runtime projections from semantic refs. There is no required cross-view highlight/selection state. Generated/generic semantic cards do not pretend to be editable direct command files. Invocation side effects are Helper runtime behavior, not command semantic authority. Ordinary `Run` is non-binding; explicit `Bind + Run` is one-invocation authority only.

**Manual invocation invariant:** each current UC/TM/Lens has one primary semantic Command card. Direct/focused aliases do not create duplicate primary cards. Specific Lenses appear as cards; generic Lens apply and Lens operation variants remain infrastructure/internal selection.

**Traceability:**

- **Product / behavior:** [`README.md#command-card-contract`](../README.md#command-card-contract), [`README.md#canonical-scenario-contract`](../README.md#canonical-scenario-contract), [`README.md#command-invocation-side-effects`](../README.md#command-invocation-side-effects).
- **Focused / durable contract:** direct bodies derive from [`planning/commands/*.command.md`](../../../../../commands/README.md); semantic bodies derive from current UC/TM/Lens owners; Scenario prose derives from canonical Scenario owners.
- **Primary implementation:** [`src/composer-insertion.js`](../src/composer-insertion.js), [`src/command-side-effects.js`](../src/command-side-effects.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/semantic-projections.js`](../src/semantic-projections.js).
- **Automated evidence:** [`tests/composer-insertion.test.mjs`](../tests/composer-insertion.test.mjs), [`tests/command-side-effects.test.mjs`](../tests/command-side-effects.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs), [`tests/methodology-navigation.test.mjs`](../tests/methodology-navigation.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-use`](../MANUAL-ACCEPTANCE.md#scn-ph-use).

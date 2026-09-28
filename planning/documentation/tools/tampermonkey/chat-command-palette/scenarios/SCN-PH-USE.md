# SCN-PH-USE — Use Helper Content In ChatGPT

Status: active current behavior owner
Scope: canonical detailed application behavior owner for grouped command navigation, selected-command meaning/detail, Run/Body/Scenario navigation and explicit invocation side effects.

**Trigger/input:** the user enters a Commands classification, selects one or several groups, collapses/expands a group, selects a semantic/general/tool Command or Prompt, opens `Body`, opens `Scenarios N`, runs a command, or uses an explicit one-shot Bind variant when offered.

**Successful result:** entering a normal Commands classification exposes that classification's presentation groups in a compact left sidebar while the command list and selected-command detail retain most of the available vertical workspace. The user can show all groups, isolate one group, or select several groups; ordered group containers remain browsable and preserve collapsed/expanded state. Selecting a direct Planning Command opens a detail pane with canonical **Контекст / Результат / Суть**, `Run`, `Body`, `Scenarios N`, Favorite and presentation-group controls plus a **Command Contract** projection: direct `includes[]` are shown as canonical `planning/commands/*.command.md` command-DAG edges, structured `ownerRefs` are shown with `responsibilityId / role / readMode / path#anchor / why`, and the direct command source path is visible. Generic semantic projections show only their available canonical semantic source paths and never fabricate direct-command `includes`, `ownerRefs` or `why` metadata. `All commands` remains a cross-tab overview rather than an orphan-command destination. Direct-command Body also carries canonical `context / result / essence`. Scenario steps render canonical prose plus derived command equivalents. Normal use is local and network-independent.

**Boundary:** the detail pane is a presentation/projection surface, not a semantic authority. Direct-card **Контекст / Результат / Суть**, `includes[]`, `ownerRefs` and source path are projected from the canonical direct Planning Command definition; semantic cards derive prose/source data from their canonical UC/TM/Lens owners. `includes[]` means command-to-command traversal composition and is kept distinct from `ownerRefs`, which route to semantic owners/contracts and retain each ref's `why`, `role` and `readMode`. The Helper must not move reusable methodology/domain rules into presentation code merely because it displays those routes. Canonical working Scenarios never own command IDs/triggers/body text; command equivalents are runtime projections from semantic refs. There is no required cross-view highlight/selection state. Generated/generic semantic cards do not pretend to be editable direct command files. Invocation side effects are Helper runtime behavior, not command semantic authority. Ordinary `Run` is non-binding; explicit `Bind + Run` is one-invocation authority only.

**Manual invocation invariant:** each current UC/TM/Lens has one primary semantic Command card. Direct/focused aliases do not create duplicate primary cards. Specific Lenses appear as cards; generic Lens apply and Lens operation variants remain infrastructure/internal selection.

## RU-SCEN-01 — Scenario Path

The path below is the normative current journey. The detailed trigger, result and boundary above elaborate these steps. Feature resolution remains open where the Helper has no independently accepted Feature owner; implementation files in Traceability are evidence, not Feature identities.

| Scenario Path Step | Actor / application interaction | Participant / Feature resolution | Data / result | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="sps-ph-use-01"></a>`SPS-PH-USE-01 — Navigate to content` | User selects a classification/group and one Command or Prompt. | User and Helper; Feature resolution `OPEN` | selected card and source identity | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-use-02"></a>`SPS-PH-USE-02 — Inspect and invoke` | Helper shows projected detail/body and user invokes a supported action or copies text. | User and Helper; Feature resolution `OPEN` | selected command or prompt action | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-use-03"></a>`SPS-PH-USE-03 — Continue in target context` | User sees insertion/result in chat or local UI and retains source context. | User and Helper; Feature resolution `OPEN` | visible result without semantic-authority transfer | — | See the boundaries and traceability below; this step alone does not prove external effects. |

## RU-SCEN-04 — Scenario Requirements

Disposition: `OMITTED`; the selected SPS path and existing detailed boundaries suffice here. No independent Scenario-natural `SR-*` identity has been accepted for this current owner.

**Traceability:**

- **Product / behavior:** [`README.md#command-card-contract`](../README.md#command-card-contract), [`README.md#canonical-scenario-contract`](../README.md#canonical-scenario-contract), [`README.md#command-invocation-side-effects`](../README.md#command-invocation-side-effects).
- **Focused / durable contract:** direct bodies derive from [`planning/commands/*.command.md`](../../../../../commands/README.md); semantic bodies derive from current UC/TM/Lens owners; Scenario prose derives from canonical Scenario owners.
- **Primary implementation:** [`src/composer-insertion.js`](../src/composer-insertion.js), [`src/command-side-effects.js`](../src/command-side-effects.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js), [`src/semantic-projections.js`](../src/semantic-projections.js).
- **Automated evidence:** [`tests/composer-insertion.test.mjs`](../tests/composer-insertion.test.mjs), [`tests/command-side-effects.test.mjs`](../tests/command-side-effects.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-ui.test.mjs`](../tests/planning-helper-ui.test.mjs), [`tests/helper-navigation.test.mjs`](../tests/helper-navigation.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-use`](../MANUAL-ACCEPTANCE.md#scn-ph-use).

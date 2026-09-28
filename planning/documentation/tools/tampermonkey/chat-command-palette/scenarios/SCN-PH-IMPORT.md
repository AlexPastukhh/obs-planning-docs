# SCN-PH-IMPORT — Import Helper Content From ChatGPT

Status: active current behavior owner
Scope: canonical detailed application behavior owner; this Scenario owns its trigger/context/behavior/result/boundaries and traceability.

**Trigger/input:** Import from ChatGPT with supported planning-command/helper-library marker blocks and/or one `PLANNING_HELPER_PATCH` block.

**Successful result:** the complete candidate change is validated atomically and then merged into local snapshot/RAM state. Natural-key duplicates and same-collection upsert/delete conflicts fail closed. Import delete/upsert is literal CRUD by collection: direct Commands, helper items, Use Cases, Target Modules/Lenses and Scenarios change only when that same entity is explicitly listed. `delete.useCases` does not hide/delete a backing direct command; `delete.semanticComponents` does not hide/delete a backing direct command; if both must disappear, both are explicitly listed in `delete`. `useCases` remains the UC import owner and may retain non-rendered coupled UC projection metadata needed to restore presentation/direct binding on a later UC upsert. Patch deletes remain suppressed from ordinary `Sync missing` only for the same deleted natural key. Changed imported content loses exact repository evidence until separately verified/published.

**Boundary:** Import performs zero GitHub requests and does not imply repository persistence or semantic ownership. Direct Command/Prompt persistence keeps its explicit Save GitHub path; semantic projections remain local until their canonical repository owners/build route changes. Hard Reload clears Import suppression only for the catalogs it reloads; helper-library suppression remains with the preserved Prompt/helper-library local state.

## RU-SCEN-01 — Scenario Path

The path below is the normative current journey. The detailed trigger, result and boundary above elaborate these steps. Feature resolution remains open where the Helper has no independently accepted Feature owner; implementation files in Traceability are evidence, not Feature identities.

| Scenario Path Step | Actor / application interaction | Participant / Feature resolution | Data / result | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="sps-ph-import-01"></a>`SPS-PH-IMPORT-01 — Supply candidate marker blocks` | User invokes Import from ChatGPT with supported blocks. | User and Helper; Feature resolution `OPEN` | candidate direct records or patch | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-import-02"></a>`SPS-PH-IMPORT-02 — Validate complete candidate` | Helper validates all blocks, collisions and operation conflicts atomically. | User and Helper; Feature resolution `OPEN` | accepted set or rejection | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-import-03"></a>`SPS-PH-IMPORT-03 — Merge local state` | On acceptance Helper updates local snapshot and RAM state. | User and Helper; Feature resolution `OPEN` | local changed result without GitHub write | — | See the boundaries and traceability below; this step alone does not prove external effects. |

## RU-SCEN-04 — Scenario Requirements

Disposition: `OMITTED`; the selected SPS path and existing detailed boundaries suffice here. No independent Scenario-natural `SR-*` identity has been accepted for this current owner.

**Traceability:**

- **Product / behavior:** [`README.md#chatgpt-import-and-recovery`](../README.md#chatgpt-import-and-recovery).
- **Focused / durable contract:** command marker contract is owned by [`planning/commands/README.md`](../../../../../commands/README.md); helper marker contract by [`planning/helper-library/README.md`](../../../../../helper-library/README.md).
- **Primary implementation:** [`src/chat-recovery.js`](../src/chat-recovery.js), [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/chat-recovery.test.mjs`](../tests/chat-recovery.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/planning-helper-policy.test.mjs`](../tests/planning-helper-policy.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-import`](../MANUAL-ACCEPTANCE.md#scn-ph-import).

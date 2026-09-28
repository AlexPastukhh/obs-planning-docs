# SCN-PH-CHECK-REPOSITORY — Inspect Local And Repository Inventory

Status: active current behavior owner
Scope: explicit non-mutating local↔GitHub inventory review.

**Trigger/input:** explicit `Check GitHub`.

**Successful result:** the user sees local/GitHub counts and missing/changed evidence for direct Planning Commands, Use-Case source projection, semantic components, canonical working Scenarios, Prompts/helper records and durable catalog order, without local mutation.

**Boundary:** same path/ID means inventory overlap only. It does not prove equal content without SHA/content evidence. The action never publishes or reconciles local state.

## RU-SCEN-01 — Scenario Path

The path below is the normative current journey. The detailed trigger, result and boundary above elaborate these steps. Feature resolution remains open where the Helper has no independently accepted Feature owner; implementation files in Traceability are evidence, not Feature identities.

| Scenario Path Step | Actor / application interaction | Participant / Feature resolution | Data / result | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="sps-ph-check-repository-01"></a>`SPS-PH-CHECK-REPOSITORY-01 — Request repository comparison` | User explicitly selects Check GitHub. | User and Helper; Feature resolution `OPEN` | current local catalog and selected repository context | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-check-repository-02"></a>`SPS-PH-CHECK-REPOSITORY-02 — Compare visible inventory` | Helper reads repository catalogs and contrasts IDs/paths and available SHA/content evidence. | User and Helper; Feature resolution `OPEN` | counts, missing and changed evidence | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-check-repository-03"></a>`SPS-PH-CHECK-REPOSITORY-03 — Inspect result` | User sees distinctions and chooses any later action separately. | User and Helper; Feature resolution `OPEN` | comparison only; no reconciliation | — | See the boundaries and traceability below; this step alone does not prove external effects. |

## RU-SCEN-04 — Scenario Requirements

Disposition: `OMITTED`; the selected SPS path and existing detailed boundaries suffice here. No independent Scenario-natural `SR-*` identity has been accepted for this current owner.

**Traceability:**

- **Product / behavior:** [`README.md#check-github`](../README.md#check-github).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/helper-navigation.test.mjs`](../tests/helper-navigation.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-check-repository`](../MANUAL-ACCEPTANCE.md#scn-ph-check-repository).

# SCN-PH-SYNC — Bring Missing / Selected Repository Content Into Local State

Status: active current behavior owner
Scope: non-authoritative incremental repository→local acquisition and one-direct-command replacement.

**Trigger/input:** explicit `Sync missing`, or `Reload` on one direct-backed Command.

**Successful result:** `Sync missing` adds absent repository direct Commands, semantic components, canonical working Scenarios and Prompt/helper records without overwriting same-ID/path local records and without restoring keys explicitly suppressed by Import delete. Suppression is per natural key only: a deleted direct Command, Use Case, Target Module/Lens component, Scenario or helper item blocks ordinary `Sync missing` only for that same object. No hidden-row or cross-entity suppression exists. `Reload` replaces one selected direct command definition with verified remote content while keeping its semantic card identity stable.

**Boundary:** `Sync missing` is additive, suppression-aware, and not a complete freshness reset. Complete repository→local recovery of GitHub-backed projections/order belongs to `SCN-PH-RECOVER`. Neither branch publishes local content.

## RU-SCEN-01 — Scenario Path

The path below is the normative current journey. The detailed trigger, result and boundary above elaborate these steps. Feature resolution remains open where the Helper has no independently accepted Feature owner; implementation files in Traceability are evidence, not Feature identities.

| Scenario Path Step | Actor / application interaction | Participant / Feature resolution | Data / result | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="sps-ph-sync-01"></a>`SPS-PH-SYNC-01 — Choose additive sync` | User selects Sync missing or Reload on a direct-backed Command. | User and Helper; Feature resolution `OPEN` | selected sync scope | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-sync-02"></a>`SPS-PH-SYNC-02 — Read repository state` | Helper obtains current supported records for that scope. | User and Helper; Feature resolution `OPEN` | remote candidates | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-sync-03"></a>`SPS-PH-SYNC-03 — Reconcile eligible local entries` | Sync missing adds absent, suppression-aware entries; Reload refreshes the selected direct record. | User and Helper; Feature resolution `OPEN` | local result without repository write | — | See the boundaries and traceability below; this step alone does not prove external effects. |

## RU-SCEN-04 — Scenario Requirements

Disposition: `OMITTED`; the selected SPS path and existing detailed boundaries suffice here. No independent Scenario-natural `SR-*` identity has been accepted for this current owner.

**Traceability:**

- **Product / behavior:** [`README.md#sync-missing`](../README.md#sync-missing), [`README.md#reload-one-direct-command`](../README.md#reload-one-direct-command).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js).
- **Automated evidence:** [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs), [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-sync`](../MANUAL-ACCEPTANCE.md#scn-ph-sync).

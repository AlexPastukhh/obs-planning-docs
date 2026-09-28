# SCN-PH-PUBLISH — Publish One Helper Record Or Durable Catalog Order To Repository

Status: active current behavior owner
Scope: canonical detailed application behavior owner for explicit Helper→GitHub persistence.

**Trigger/input:** per-row `Save GitHub` for a real Planning Command/Prompt/legacy helper record, or global `Save order GitHub` for current catalog order/presentation groups.

**Successful result:** a deterministic Command/Prompt target is created, exact-no-op confirmed, or updated using current remote SHA and exact read-back verification; `Save order GitHub` creates/updates only `catalog-order.json` with current ordered stable IDs and presentation-only `commandGroups[]`.

**Conflict boundary:** optimistic conflicts are reread once. If remote bytes already equal intended bytes, the write is recovered as verified success without a second PUT. If bytes differ, nothing is overwritten automatically. A verified remote result remains remote success even if later local metadata persistence fails.

**Semantic boundary:** order/group persistence changes presentation only; it does not change Command/Scenario/UC/TM/Lens meaning. Commands order uses stable semantic IDs for UC/TM/Lens cards.

## RU-SCEN-01 — Scenario Path

The path below is the normative current journey. The detailed trigger, result and boundary above elaborate these steps. Feature resolution remains open where the Helper has no independently accepted Feature owner; implementation files in Traceability are evidence, not Feature identities.

| Scenario Path Step | Actor / application interaction | Participant / Feature resolution | Data / result | Attached SR | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="sps-ph-publish-01"></a>`SPS-PH-PUBLISH-01 — Request explicit repository save` | User chooses Save GitHub for a direct record or Save order GitHub. | User and Helper; Feature resolution `OPEN` | exact record or catalog-order target | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-publish-02"></a>`SPS-PH-PUBLISH-02 — Verify target and publish` | Helper checks remote SHA, writes only intended bytes when needed, and verifies read-back. | User and Helper; Feature resolution `OPEN` | created, updated, exact-no-op or conflict | — | See the boundaries and traceability below; this step alone does not prove external effects. |
| <a id="sps-ph-publish-03"></a>`SPS-PH-PUBLISH-03 — Observe terminal result` | User sees verified success or conflict/uncertainty. | User and Helper; Feature resolution `OPEN` | repository result distinct from local metadata | — | See the boundaries and traceability below; this step alone does not prove external effects. |

## RU-SCEN-04 — Scenario Requirements

Disposition: `OMITTED`; the selected SPS path and existing detailed boundaries suffice here. No independent Scenario-natural `SR-*` identity has been accepted for this current owner.

**Traceability:**

- **Product / behavior:** [`README.md#save-github--save-order-github`](../README.md#save-github--save-order-github).
- **Primary implementation:** [`src/planning-helper-runtime.js`](../src/planning-helper-runtime.js), [`src/repository-command-service.js`](../src/repository-command-service.js), [`src/repository-helper-library-service.js`](../src/repository-helper-library-service.js), [`src/repository-catalog-service.js`](../src/repository-catalog-service.js), [`src/github-contents-client.js`](../src/github-contents-client.js), [`src/planning-helper-ui.js`](../src/planning-helper-ui.js).
- **Automated evidence:** [`tests/repository-command-service.test.mjs`](../tests/repository-command-service.test.mjs), [`tests/repository-helper-library-service.test.mjs`](../tests/repository-helper-library-service.test.mjs), [`tests/github-contents-client.test.mjs`](../tests/github-contents-client.test.mjs), [`tests/planning-helper-runtime.test.mjs`](../tests/planning-helper-runtime.test.mjs).
- **Manual acceptance:** [`MANUAL-ACCEPTANCE.md#scn-ph-publish`](../MANUAL-ACCEPTANCE.md#scn-ph-publish).

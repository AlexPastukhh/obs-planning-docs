# Study Tab Launcher — Planning Resolution State / Resolution Carry-Forward

Status: current application-scope coordination result. PRS and RCF name this same result. Proposal/Decision/Q/R/P meaning and evidence stay at the linked natural owners.

**Methodology:** [PRS/RCF result contract](../../../../../../../idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state), [linked context and order](../../../../../../../idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md#prs-rcf-presentation), [SDS traversal](../../../../../profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-traversal-order).

## Membership contract

Carry open/deferred Proposals with their Q/R/P and material Evidence, unresolved subjects awaiting a Proposal, and accepted Decisions only with qualifying related Q/R/P. Reconcile statuses with natural owners. Closing the last qualifying Q/R/P removes the active Decision entry while its accepted content and historical trace remain at the owner. [Evolution Steps Map](evolution-steps.md) owns planning position.

## RU-PRS-01 — Active Planning

**Methodology:** [RU-PRS-01 Unit Definition](../../../../../../../idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md#ru-prs-01--active-planning).

Collection ID: `PRS-ACTIVE-ITEMS`. Entries follow their natural SDS subject order. No open/deferred candidate Proposal is recorded in this documented current application basis; the applied proposals in the historical conformance review remain historical. Open work below is not an invented candidate or selection.

### Current focus / priority projection

- `P1` — `PRS-ACTIVE-STL-HANDOFF`: current Problem priority is recorded at [P-STL-HANDOFF-01](shared/prepared-project-handoff.md#p-stl-handoff-01). Installed-handoff evidence is also current proof work (`PRS-ACTIVE-STL-INSTALLED-PROOF`).
- `P2` — `PRS-ACTIVE-STL-SUCCESSION-PROOF`: selected next Step evidence, executable after implementation; [Step proof obligations](evolution/unrealized/close-superseded-project-windows.md#ru-evo-05--transition--proof-obligations) determine the gate.

### Shared — prepared-project handoff

| Item key / subject | Driver / QRP | Proposals | Evidence / continuation relation |
|---|---|---|---|
| `PRS-ACTIVE-STL-HANDOFF` — [IR-SHARED-STL-HANDOFF-04](shared/prepared-project-handoff.md#ir-shared-stl-handoff-04) | [P-STL-HANDOFF-01](shared/prepared-project-handoff.md#p-stl-handoff-01), Problem / `OPEN` / `P1` | No open candidate recorded; required treatment is at the Problem owner. | Owner records nondeterministic acknowledgement/redemption proof. Blocks current deterministic proof and selected Step proof/materialization; does not block realization start. Related accepted selection is in RU-PRS-02 below. |
| `PRS-ACTIVE-STL-INSTALLED-PROOF` — [Installed-handoff Practical Test](practical-tests/installed-browser-vscode-handoff.md) | Current installed browser/Windows/VS Code proof remains `OPEN`; foreground, modal, dirty-editor and trust observations are pending. | No open candidate recorded. | Practical Test owns the plan/result. This is a separate evidence obligation; performing it does not by itself close the concurrency Problem. |

### Evolution — selected succession Step

| Item key / subject | Driver / QRP | Proposals | Evidence / continuation relation |
|---|---|---|---|
| `PRS-ACTIVE-STL-SUCCESSION-PROOF` — [Selected Step](evolution/unrealized/close-superseded-project-windows.md) | [Multi-window Practical Test](practical-tests/project-succession-multi-window.md): `OPEN — implementation absent`; Step also depends on [P-STL-HANDOFF-01](shared/prepared-project-handoff.md#p-stl-handoff-01). | No open candidate recorded; the Step contains selected future meaning. | Test runs after implementation and before Step proof/materialization. Follow the Shared Problem's own closure condition. |

## RU-PRS-02 — Tracked Decisions

**Methodology:** [RU-PRS-02 Unit Definition](../../../../../../../idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md#ru-prs-02--tracked-decisions).

Collection ID: `PRS-TRACKED-DECISIONS`. Only the following accepted selection has an explicitly demonstrated material related Q/R/P in this coordination scope.

### Shared — prepared-project handoff

| Item key / accepted selection | Subject / integrated into | Qualifying QRP and relation | Retention / evidence |
|---|---|---|---|
| `PRS-DECISION-STL-HANDOFF` — [DEC-STL-PREPARED-HANDOFF-01](shared/prepared-project-handoff.md#dec-stl-prepared-handoff-01) / `ACCEPTED` | [IR-SHARED-STL-HANDOFF-03](shared/prepared-project-handoff.md#ir-shared-stl-handoff-03), [IR-SHARED-STL-HANDOFF-04](shared/prepared-project-handoff.md#ir-shared-stl-handoff-04) | [P-STL-HANDOFF-01](shared/prepared-project-handoff.md#p-stl-handoff-01) / `OPEN`: the selected owner-acknowledged, at-most-once handoff remains accepted; its concurrent acknowledgement/redemption proof is nondeterministic. | Carry while this Problem qualifies. Evidence and closure are owned by the Problem. After closure remove this active entry and preserve the Decision at its Shared owner. |

Other accepted boundary decisions remain at their Feature/Domain/Slice/Step owners. Their previous presence in this file does not justify active membership without related qualifying Q/R/P. No Q/R/P is invented to keep those entries.

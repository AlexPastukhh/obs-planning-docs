# SCN-MW-INSPECT-METHODOLOGY

Feature Resolution: `OPEN` — Scenario-local discovery / behavior planning; no Feature Target Body yet.
Optional Application source: `APP-METHODOLOGY-WORKSPACE / KBF-MW-02`.

## RU-SCEN-01 — Scenario Path

| Scenario Path Step | Required action / interaction | Participant | Screen / Surface | Application Contribution / Feature | Data / result / continuity | Attached Scenario Requirements | Related Application expected errors | QRPE / Examples |
|---|---|---|---|---|---|---|---|---|
| `SPS-MW-I01 — Form inspection question` | Select a structural methodology question/subject. | Actor / AI | GitHub/editor | — | inspection intent/query | `SR-MW-I01` | — | Example: which Target Modules use this Lens? |
| `SPS-MW-I02 — Request structured inspection` | Invoke the Application inspection entry for that question. | Actor / AI | command/inspection entry | Preceding / Trigger Context | question passed to Application | `SR-MW-I01` | — | None material |
| `SPS-MW-I03 — Answer from validated basis` | Resolve trustworthy structural facts and return them with authority/provenance. | Application | inspection surface OPEN | `AC-MW-02-INSPECT` / Feature `OPEN` | structural facts + provenance | `SR-MW-I03` | `InspectionUnavailable`; `UnresolvedSubject`; `StaleBasis` | Problem Example: fabricated relation with no owner provenance. |
| `SPS-MW-I04 — Continue in canonical Markdown` | Use provenance to open relevant canonical owners and continue semantic reasoning. | Actor / AI + GitHub | GitHub Markdown | — | result provenance → owner navigation | `SR-MW-I02`; `SR-MW-I03` | — | None material |

## RU-SCEN-04 — Scenario Requirements

| Scenario Requirement | Type | Plain required Scenario meaning | Attached Scenario Steps | QRPE / Examples |
|---|---|---|---|---|
| `SR-MW-I01 — Preserve inspection intent` | Identity | The returned structural result answers the selected semantic question/subject rather than a file-layout approximation. | `SPS-MW-I01..03` | None material |
| `SR-MW-I02 — Markdown remains a valid surrounding workflow` | Scope / Continuity | Structured inspection supplements rather than replaces ordinary Markdown reading. | `SPS-MW-I04` | Target Good Example: AI begins and finishes in GitHub Markdown. |
| `SR-MW-I03 — Provenance survives return to external reading` | Truthfulness / Continuity | Established structural facts expose enough provenance to navigate into canonical owners. | `SPS-MW-I03`, `SPS-MW-I04` | None material |

## Feature Discovery / realization handoff

A future inspection Feature may realize `SPS-MW-I03` and applicable SRs; `SPS-MW-I01/02` remain actor/entry context unless a selected Feature boundary genuinely owns part of that entry behavior.

## RU-SCEN-02 — Evolution Impact

`OMITTED` — future Target Scenario Body.

## RU-SCEN-03 — Journey Realization Concerns

No separate concern beyond freshness/provenance already represented above.

# SCN-MW-COMPOSE-COMMANDS-FOR-AI

Feature Resolution: `OPEN` — Scenario-local discovery / behavior planning; no Feature Target Body yet.
Optional Application source: `APP-METHODOLOGY-WORKSPACE / KBF-MW-03`.

## RU-SCEN-01 — Scenario Path

| Scenario Path Step | Required action / interaction | Participant | Screen / Surface | Application Contribution / Feature | Data / result / continuity | Attached Scenario Requirements | Related Application expected errors | QRPE / Examples |
|---|---|---|---|---|---|---|---|---|
| `SPS-MW-C01 — Select command roots` | Select planning command(s) for the intended AI task. | Actor | command palette / command surface | Preceding / Trigger Context | selected root command identities | `SR-MW-C01` | — | None material |
| `SPS-MW-C02 — Compose effective command` | Expand validated dependencies, reject invalid composition, deduplicate/order contributions and emit one effective AI command or truthful failure. | Application | background / composition status | `AC-MW-03-COMPOSE` / Feature `OPEN` | roots → effective command or failure + provenance | `SR-MW-C01`; `SR-MW-C02` | `MissingCommand`; `CompositionCycle`; `InvalidContribution`; `Conflict` | Target Good Example: shared include is deduplicated and dependency ordering preserved. |
| `SPS-MW-C03 — Repair failed composition` | If composition fails, change selection/definitions through the appropriate workflow and re-enter composition. | Actor | command/editor surface | — | failed composition remains non-executable | `SR-MW-C02` | — | None material |
| `SPS-MW-C04 — Send effective command to AI` | Give the mechanically valid effective command to external AI semantic execution. | Actor / external AI | ChatGPT/AI surface | — | effective command + provenance handed off | `SR-MW-C03` | — | Boundary Example: AI semantic reasoning remains outside deterministic composition. |

## RU-SCEN-04 — Scenario Requirements

| Scenario Requirement | Type | Plain required Scenario meaning | Attached Scenario Steps | QRPE / Examples |
|---|---|---|---|---|
| `SR-MW-C01 — Preserve selected command intent/identity` | Identity / Continuity | Composition remains grounded in the selected command roots and their validated dependencies. | `SPS-MW-C01`, `SPS-MW-C02` | None material |
| `SR-MW-C02 — Composition failure is not executable success` | Truthfulness / Recovery | Invalid/cyclic/conflicting composition is returned as failure and is not handed to AI as a valid effective command. | `SPS-MW-C02`, `SPS-MW-C03` | Problem Example: cycle is ignored and partially composed prompt is sent. |
| `SR-MW-C03 — Preserve AI handoff boundary` | Scope | Deterministic composition does not claim ownership of downstream AI semantic reasoning. | `SPS-MW-C04` | None material |

## Feature Discovery / realization handoff

One future Feature may realize `SPS-MW-C02` plus applicable SRs; Feature ownership remains `OPEN`.

## RU-SCEN-02 — Evolution Impact

`OMITTED` — future Target Scenario Body.

## RU-SCEN-03 — Journey Realization Concerns

Deferred exact command-schema/merge implementation remains Step/Feature realization work.

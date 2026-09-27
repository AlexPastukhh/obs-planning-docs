# SCN-MW-COMPOSE-COMMANDS-FOR-AI

Feature Resolution: `OPEN` — Scenario-local discovery / behavior planning; no Feature Target Body yet.

## RU-SCEN-01 — Real-Life Usage Journey

**Actor / real-world situation:**  
A user wants one AI planning pass requiring several commands, but does not want the external AI to reconstruct the command include graph, ordering, permissions, or deferred-call mechanics itself.

**Benefit refs:** `AB-03`

### Scenario Path

| Step | Boundary / participant | Real-world action / interaction | Application Contribution | Feature ref / result | Continuity / data | Benefit | Attached SR |
|---|---|---|---|---|---|---|---|
| `SPS-MW-C01` | `ACTOR — User` | Selects the planning commands needed for the intended AI task. | — | — | selected root command identities | `AB-03` begins to manifest | `SR-MW-C01` |
| `SPS-MW-C02` | `APPLICATION` | **`AC-MW-03-COMPOSE` — turn selected roots into one mechanically valid effective AI command or truthful composition failure.** | required | `OPEN — Feature boundary unresolved` | command selection → effective command / failure + provenance | `AB-03` closes on successful composition | `SR-MW-C01`, `SR-MW-C02` |
| `SPS-MW-C02F` | `ACTOR — User` | If composition fails, adjusts the selection/definitions through the appropriate workflow and re-enters composition; the failure is not sent as a valid command. | — | consumes failure result only | failed composition remains distinguishable from executable output | `AB-03` remains open | `SR-MW-C02` |
| `SPS-MW-C03` | `EXTERNAL — AI execution environment` | Receives the already-composed effective command and performs semantic reasoning/execution against the methodology context. | — | — | effective command + provenance crosses Application boundary | demonstrates responsibility split | `SR-MW-C03` |
| `SPS-MW-C04` | `ACTOR — User` | Reviews the AI result; semantic correctness remains an AI/methodology concern, not part of deterministic command composition. | — | — | AI result returned outside composer | — | `SR-MW-C03` |

## Scenario-local Feature Discovery / Application Behavior Planning

Feature ownership is currently unresolved. This Scenario is in the `DISCOVERY / BEHAVIOR-PLANNING` maturity position.

### `AC-MW-03-COMPOSE`

**Required Application outcome:** produce one mechanically valid effective AI command or truthful composition failure before external AI semantic execution.

**Feature Resolution:** `OPEN`

**Current behavior-planning pressure:**
1. bind selected root command identities to validated definitions;
2. expand the complete transitive `includes` graph;
3. reject invalid cycles;
4. deduplicate shared dependencies while preserving ordering/provenance;
5. reconcile typed contributions without broadening permission/result constraints;
6. preserve deferred `processCalls` at their owner points rather than flattening them;
7. emit one effective AI command or explicit composition failure.

**Boundary hypothesis, not yet Feature authority:** this appears to be one coherent deterministic command-composition capability. It remains a discovery result inside this Scenario until the later Evolution Step resolves a normal Feature Target Body.

### Maturity transition rule for this Scenario

After Feature resolution, canonical command-composition behavior moves to the Step-owned Feature Target Body; this Scenario keeps the actor/Application/external journey and resolved Feature/result relation.

### Scenario Requirements

| Scenario Requirement | Type | Plain required real-life journey meaning | QRPE / Example |
|---|---|---|---|
| `SR-MW-C01 — Preserve selected command intent` | Identity / Continuity | The effective command corresponds to the roots the user selected and retains source provenance. | Selected Define Application + another compatible route remain identifiable. |
| `SR-MW-C02 — Composition failure cannot masquerade as executable success` | Truthfulness / Recovery | Cycles/unresolved dependencies/conflicts stop successful handoff to the external AI until repaired/reselected. | cyclic include graph never yields a partial command. |
| `SR-MW-C03 — Keep mechanical composition and semantic AI execution distinct` | Boundary / Scope | The Application hands off a mechanically resolved command; external AI owns semantic reasoning/execution and is not asked to redo the composition algorithm. | AI receives one effective package. |

## RU-SCEN-02 — Evolution Impact

`OMITTED` — this is a future Target Scenario Body owned by `EVO-MW-02-COMMAND-COMPOSITION`. Current-owner reverse impact projection is not applicable here. Feature Resolution remains `OPEN`; no current Scenario or Feature owner is implied.

## RU-SCEN-03 — Journey Realization Concerns

- the Application/external-AI handoff needs enough provenance/revision identity for reproducible command execution where material;
- exact transport/UI is not Scenario authority.

# SCN-MW-INSPECT-METHODOLOGY

Feature Resolution: `OPEN` — Scenario-local discovery / behavior planning; no Feature Target Body yet.

## RU-SCEN-01 — Real-Life Usage Journey

**Actor / real-world situation:**  
A human or AI audits methodology structure across many owners without first making a change, while retaining ordinary GitHub Markdown for semantic interpretation.

**Benefit refs:** `AB-02` with supporting `AB-01` structural basis.

### Scenario Path

| Step | Boundary / participant | Real-world action / interaction | Application Contribution | Feature ref / result | Continuity / data | Benefit | Attached SR |
|---|---|---|---|---|---|---|---|
| `SPS-MW-I01` | `ACTOR — Human/AI` | Starts from a methodology question such as “which Target Modules use this Lens?” | — | — | inspection intent/query | — | `SR-MW-I01` |
| `SPS-MW-I02` | `EXTERNAL — GitHub` | Reads ordinary Markdown owners/navigation and identifies where a cross-cutting structural answer would save reconstruction work. | — | — | GitHub/repository context | `AB-02` pressure becomes concrete | `SR-MW-I02` |
| `SPS-MW-I03` | `APPLICATION` | **`AC-MW-02-INSPECT` — answer the structural question from the validated basis with authority/provenance.** | required | `OPEN — Feature boundary unresolved` | query → structural facts + provenance | `AB-02` manifests | `SR-MW-I01`, `SR-MW-I03` |
| `SPS-MW-I04` | `ACTOR + EXTERNAL — Human/AI / GitHub` | Uses the result to choose relevant canonical Markdown owners and continues semantic reasoning there. | — | — | result provenance → owner navigation | `AB-02` closes | `SR-MW-I02`, `SR-MW-I03` |

## Scenario-local Feature Discovery / Application Behavior Planning

Feature ownership is currently unresolved. This Scenario is in the `DISCOVERY / BEHAVIOR-PLANNING` maturity position.

### `AC-MW-02-INSPECT`

**Required Application outcome:** answer an independent cross-cutting methodology-structure question from the validated basis with provenance.

**Feature Resolution:** `OPEN`

**Current behavior-planning pressure:**
1. bind an inspection request without requiring physical-file knowledge;
2. resolve trustworthy structural facts from the validated basis;
3. return facts with enough provenance/authority information to find canonical owners;
4. preserve ordinary GitHub Markdown as the surrounding read/reasoning workflow;
5. return explicit unavailable/open result rather than fabricate missing structure.

**Cross-Scenario reuse pressure:** the same capability pressure appears in `SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE / AC-MW-01-INSPECT`. This supports a shared Feature boundary later, but Feature ownership remains `OPEN`.

### Maturity transition rule for this Scenario

After Feature resolution, this Scenario keeps the inspection contribution + Feature/result relation and removes duplicated detailed Feature behavior.

### Scenario Requirements

| Scenario Requirement | Type | Plain required real-life journey meaning | QRPE / Example |
|---|---|---|---|
| `SR-MW-I01 — Preserve inspection intent` | Identity | The structural result must answer the actor's selected semantic question/subject, not a file-layout approximation. | Lens usage query is bound by semantic identity. |
| `SR-MW-I02 — GitHub Markdown remains a valid surrounding workflow` | Scope / Continuity | Structured inspection supplements rather than replaces ordinary Markdown reading. | AI can begin and finish in GitHub. |
| `SR-MW-I03 — Provenance survives return to external reading` | Truthfulness / Continuity | Established structural facts expose enough provenance to navigate into canonical owners. | Map/query result links to owner. |

## RU-SCEN-02 — Evolution Impact

`OMITTED` — this is a future Target Scenario Body owned by `EVO-MW-01-STRUCTURED-KNOWLEDGE`. Current-owner reverse impact projection is not applicable here. Feature Resolution remains `OPEN`; no current Scenario or Feature owner is implied.

## RU-SCEN-03 — Journey Realization Concerns

No separate journey-wide realization concern beyond freshness/provenance already carried by the inspection Feature and repository basis.

---

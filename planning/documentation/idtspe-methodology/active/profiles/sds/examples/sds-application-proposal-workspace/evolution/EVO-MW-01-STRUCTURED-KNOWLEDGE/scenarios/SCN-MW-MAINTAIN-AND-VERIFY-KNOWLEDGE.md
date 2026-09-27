# SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE

Feature Resolution: `OPEN` — Scenario-local discovery / behavior planning; no Feature Target Body yet.

## RU-SCEN-01 — Real-Life Usage Journey

**Actor / real-world situation:**  
A methodology maintainer changes one methodology relationship in an ordinary repository workflow, needs invalid structure prevented from becoming accepted repository truth, reviews the resulting Git/GitHub state, and then verifies the structural consequence without losing ordinary Markdown navigation.

**Benefit refs:** `AB-01`, `AB-02`

### Scenario Path

| Step | Boundary / participant | Real-world action / interaction | Application Contribution | Feature ref / result | Continuity / data | Benefit | Attached SR |
|---|---|---|---|---|---|---|---|
| `SPS-MW-01` | `ACTOR — Maintainer` | Decides to change one canonical methodology relationship, e.g. a Target Module Lens Attachment. | — | — | changed subject identity begins | — | `SR-MW-01` |
| `SPS-MW-02` | `EXTERNAL — Editor` | Opens and edits the repository source that carries the canonical authored meaning. | — | — | edited source + intended subject | — | `SR-MW-01` |
| `SPS-MW-03` | `APPLICATION` | **`AC-MW-01-MAINTAIN` — establish a valid synchronized methodology state for the requested change.** | required | `OPEN — Feature boundary unresolved` | same changed subject + publication basis | `AB-01` manifests; closes on success | `SR-MW-01`, `SR-MW-02` |
| `SPS-MW-03F` | `ACTOR + EXTERNAL — Maintainer / Editor` | If the Application returns failure, the maintainer reads diagnostics, repairs the canonical source in the editor, and re-enters `SPS-MW-03`. | — | consumes Application failure result only; Feature ownership remains unresolved | failed subject identity preserved across retry | `AB-01` remains open | `SR-MW-02` |
| `SPS-MW-04` | `EXTERNAL — Git` | Shows the accepted source/generated diff for human review. | — | — | reviewable repository delta corresponds to publication basis | `AB-01` visible in ordinary repo workflow | `SR-MW-03` |
| `SPS-MW-05` | `EXTERNAL — GitHub` | Stores/serves the repository and ordinary Markdown representation. | — | — | repository basis remains addressable | `AB-01` continuation | `SR-MW-03`, `SR-MW-05` |
| `SPS-MW-06` | `ACTOR — Human/AI` | Requests a structural verification of the changed relationship / cross-cutting consequence. | — | — | inspection question refers to the changed/published subject | `AB-02` begins to manifest | `SR-MW-03` |
| `SPS-MW-07` | `APPLICATION` | **`AC-MW-01-INSPECT` — provide trustworthy structural verification with provenance for the published basis.** | required | `OPEN — Feature boundary unresolved` | same semantic subject / repository basis + provenance | `AB-02` manifests | `SR-MW-03`, `SR-MW-04` |
| `SPS-MW-08` | `ACTOR + EXTERNAL — Human/AI / GitHub` | Follows provenance to the ordinary Markdown owner and continues semantic review/reasoning there. | — | — | inspection result → canonical owner | `AB-02` closes while Markdown path remains first-class | `SR-MW-04`, `SR-MW-05` |

## Scenario-local Feature Discovery / Application Behavior Planning

Feature ownership is currently unresolved. This Scenario is therefore in the `DISCOVERY / BEHAVIOR-PLANNING` maturity position.

### `AC-MW-01-MAINTAIN`

**Required Application outcome:** turn the requested canonical methodology edit into either a valid synchronized repository state or a truthful failure that does not publish invalid truth.

**Feature Resolution:** `OPEN`

**Current behavior-planning pressure:**
1. bind the requested edit to the intended canonical semantic/prose source;
2. resolve structured identities/references and validate the source meaning;
3. on invalid input, return repairable diagnostics and stop publication;
4. on valid input, render ordinary Markdown owner documents / configured derived projections;
5. establish a synchronized publication outcome attributable to the validated basis.

**Boundary hypothesis, not yet Feature authority:** these actions appear cohesive around one principal result — maintained methodology knowledge becomes a truthful readable repository state. A later Feature Target Body may adopt this boundary if revalidation keeps it coherent.

### `AC-MW-01-INSPECT`

**Required Application outcome:** verify the structural consequence of the accepted publication basis and return provenance to canonical owners.

**Feature Resolution:** `OPEN`

**Current behavior-planning pressure:**
1. bind the structural inspection question;
2. resolve applicable validated structural facts / derived projection;
3. return the result with authority/provenance;
4. allow continuation into ordinary Markdown owners for semantic reasoning.

**Cross-Scenario reuse pressure:** `SCN-MW-INSPECT-METHODOLOGY` requires materially similar inspection behavior. This is evidence for one reusable capability boundary, but no Feature ID/owner is selected yet.

### Maturity transition rule for this Scenario

When Feature ownership is resolved:
- replace each `Feature Ref: OPEN` with the selected Feature/result reference;
- move canonical detailed Feature behavior into the Step-owned Feature Target Body;
- retain only Scenario-owned journey, contribution, boundary, continuity, Benefit manifestation and Feature/result navigation here.

### Scenario Requirements

| Scenario Requirement | Type | Plain required real-life journey meaning | QRPE / Example |
|---|---|---|---|
| `SR-MW-01 — Preserve changed-subject identity` | Identity / Continuity | The real-life path must retain which canonical methodology subject is being changed from actor intent through the Application publication result. | `TM-FEATURE.lens_attachments` remains the subject. |
| `SR-MW-02 — Failure cannot cross the boundary as success` | Recovery / Truthfulness | A failed Application contribution returns to actor repair/re-entry or stops; external Git/GitHub review must not proceed as though invalid content were accepted. | Broken Lens ref forces repair. |
| `SR-MW-03 — Preserve repository-basis continuity` | Continuity / Proof | Git review, GitHub state, and later structural verification must correspond closely enough to the same accepted publication basis to avoid validating stale output. | revision/hash mechanism remains implementation-owned. |
| `SR-MW-04 — Preserve provenance across Application/external boundaries` | Continuity / Truthfulness | Structural verification must allow the actor to navigate to the canonical methodology owner whose meaning supports the returned fact. | Lens map row → Target Module owner. |
| `SR-MW-05 — Preserve ordinary Markdown continuation` | Scope / Continuity | After structured Application participation, the journey can continue through ordinary GitHub Markdown without requiring CUE-specific reading. | AI opens owner Markdown directly. |

**E2E Proof Intent:** exercise one valid relationship change plus one invalid-reference repair path across Editor → Application → Git/GitHub → Application inspection → GitHub Markdown continuation. The proof should observe boundary results rather than copy Feature internals into the Scenario.

## RU-SCEN-02 — Evolution Impact

`OMITTED` — this is a future Target Scenario Body owned by `EVO-MW-01-STRUCTURED-KNOWLEDGE`. Current-owner reverse impact projection is not applicable here. Feature Resolution remains `OPEN`; no current Scenario or Feature owner is implied.

## RU-SCEN-03 — Journey Realization Concerns

- publication and later inspection need a sufficiently common repository/source basis to avoid stale verification;
- exact revision/hash/provenance mechanism remains implementation-owned.

---

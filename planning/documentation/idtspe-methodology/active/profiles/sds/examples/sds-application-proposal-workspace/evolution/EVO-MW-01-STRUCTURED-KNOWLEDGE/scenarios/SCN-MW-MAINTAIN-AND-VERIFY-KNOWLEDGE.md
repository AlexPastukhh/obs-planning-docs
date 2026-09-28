# SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE

Feature Resolution: `OPEN` — Scenario-local discovery / behavior planning; no Feature Target Body yet.
Optional Application source: `APP-METHODOLOGY-WORKSPACE / KBF-MW-01`, `KBF-MW-02`.

## RU-SCEN-01 — Scenario Path

**Actor / situation:** a methodology maintainer changes canonical methodology meaning, needs invalid structure prevented from becoming accepted truth, reviews the repository delta, then verifies a structural consequence with provenance.

| Scenario Path Step | Required action / interaction | Participant | Screen / Surface | Application Contribution / Feature | Data / result / continuity | Attached Scenario Requirements | Related Application expected errors | QRPE / Examples |
|---|---|---|---|---|---|---|---|---|
| `SPS-MW-01 — Select canonical change` | Decide which canonical methodology subject/relationship must change. | Actor | Editor / repository navigation | — | changed-subject identity begins | `SR-MW-01` | — | Target Good Example: select `TM-FEATURE.lens_attachments` as the changed subject. |
| `SPS-MW-02 — Edit canonical source` | Open and edit the repository source that owns the selected meaning. | Actor / external editor | IDE/editor | Preceding / Trigger Context | intended changed source exists | `SR-MW-01` | — | Boundary Example: editor UI remains outside Application ownership. |
| `SPS-MW-03 — Maintain valid synchronized state` | Validate the requested change and establish either valid synchronized repository output or truthful failure. | Application | background / status surface OPEN | `AC-MW-01-MAINTAIN` / Feature `OPEN` | changed subject + publication basis | `SR-MW-01`; `SR-MW-02` | `InvalidReference`; `ValidationFailure`; `PublicationFailure` | Problem Example: invalid ref is published as success. |
| `SPS-MW-04 — Repair rejected change` | On failure, inspect diagnostics, repair canonical source and re-enter validation. | Actor / external editor | IDE/editor | — | failed subject identity preserved | `SR-MW-02` | — | None material |
| `SPS-MW-05 — Review repository delta` | Review the accepted source/generated delta. | Actor / external Git | Git diff | — | reviewable delta corresponds to publication basis | `SR-MW-03` | — | None material |
| `SPS-MW-06 — Request structural verification` | Ask a cross-cutting question about the changed/published subject. | Actor / AI | GitHub/command surface | Preceding / Trigger Context | inspection intent bound to published subject | `SR-MW-03` | — | None material |
| `SPS-MW-07 — Verify with provenance` | Return structural verification grounded in the accepted basis with provenance to canonical owners. | Application | inspection surface OPEN | `AC-MW-01-INSPECT` / Feature `OPEN` | structural result + provenance | `SR-MW-04` | `InspectionUnavailable`; `StaleBasis`; `UnresolvedReference` | Target Good Example: result points back to canonical owner. |
| `SPS-MW-08 — Continue Markdown reasoning` | Follow provenance and continue semantic review in ordinary Markdown. | Actor / AI + GitHub | GitHub Markdown | — | inspection result → canonical owner | `SR-MW-04`; `SR-MW-05` | — | None material |

## RU-SCEN-04 — Scenario Requirements

### Step-attached Requirements

| Scenario Requirement | Type | Plain required Scenario meaning | Attached Scenario Steps | QRPE / Examples |
|---|---|---|---|---|
| `SR-MW-01 — Preserve changed-subject identity` | Identity / Continuity | The selected canonical subject remains the same through edit and Application validation/publication. | `SPS-MW-01..03` | Target Good Example: the requested Lens-attachment subject stays bound. |
| `SR-MW-02 — Failure cannot cross as success` | Recovery / Truthfulness | Failed validation/publication returns to repair or stops; invalid output is not represented as accepted. | `SPS-MW-03`, `SPS-MW-04` | Problem Example: broken ref reaches review as accepted output. |
| `SR-MW-04 — Preserve provenance across Application/external boundary` | Truthfulness / Continuity | Structural verification exposes enough provenance to navigate to the canonical owner. | `SPS-MW-07`, `SPS-MW-08` | Target Good Example: structural result identifies owner path/identity. |
| `SR-MW-05 — Preserve ordinary Markdown continuation` | Scope / Continuity | Structured Application participation does not make CUE/tool-specific reading mandatory for semantic continuation. | `SPS-MW-08` | Boundary Example: GitHub Markdown remains sufficient for reading owner meaning. |

### Scenario-wide Requirements

| Scenario-wide Requirement | Type | Plain required Scenario meaning | QRPE / Examples |
|---|---|---|---|
| `SR-MW-03 — Preserve repository-basis continuity` | Continuity / Proof | Review and later structural verification correspond closely enough to the same accepted publication basis to avoid validating stale output. | Problem Example: verification silently uses a pre-change basis. |

## Feature Discovery / realization handoff

`SPS-MW-02` and `SPS-MW-06` are normally preceding/trigger context. A future Feature may realize one or several Application SPS (`SPS-MW-03`, `SPS-MW-07`) plus applicable SRs; one SPS may also require several Features. Feature boundary remains `OPEN`.

## RU-SCEN-02 — Evolution Impact

`OMITTED` — future Target Scenario Body; current-owner reverse impact is not applicable.

## RU-SCEN-03 — Journey Realization Concerns

Publication and later inspection need a sufficiently common repository/source basis; exact revision/provenance mechanism remains downstream realization-owned.

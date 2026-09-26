<a id="sds-lens-attachment-map"></a>
# SDS Lens Attachment Map

Responsibility: **projection only**. Normative predictable attachment remains beside each concrete `RU-*` in its Target Module owner. Concrete Lens files own applicability and temporal triggers.

Every material Unit inherits the same Core Lens Pack. Unlisted Lens remain discoverable through the Core + active-profile registry scan.

## Reading Key

Attachment strength in this projection:

- **R** = `REQUIRED [CLOSING]` — unconditional Closing application floor; Lens-owned Opening/During/Closing triggers can cause earlier/repeated application.
- **T** = `TRIGGERED` — the Unit contains no condition logic; the concrete Lens owns checkpoint triggers.
- blank / `—` = no additional predictable attachment; registry discovery still applies.

### Inherited Core Lens Pack — every material Unit

| Key | Canonical Lens |
|---|---|
| `NEED` | `LENS-NEED-VALUE-SCOPE` |
| `AUTH` | `LENS-AUTHORITY-SOT-REUSE` |
| `UNC` | `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY` |
| `REP` | `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` |
| `RESCTX` | `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` |

### Additional Lens keys used by this projection

| Key | Canonical Lens | What it is about |
|---|---|---|
| `APP` | `LENS-APPLICATION-BOUNDARY-FEASIBILITY` | Application boundary / feasibility |
| `DDD` | `LENS-DOMAIN-MODELING-DDD` | Domain ownership / state / invariants / consistency |
| `VERT` | `LENS-SLICE-VERTICALITY-INTEGRATION` | Feature/Slice verticality and end-to-end integration |
| `UI` | `LENS-UI-SPATIAL-FRONTEND-REALIZATION` | UI / spatial / frontend realization |
| `IRD` | `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY` | durable owner-local implementation/proof Requirement discovery |
| `TERMS` | `LENS-TERMS-UBIQUITOUS-LANGUAGE` | durable terminology / ubiquitous language |
| `EVO` | `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` | known evolution / change-isolation / transition pressure |
| `SIMP` | `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY` | simplicity / implementation economy |
| `DEP` | `LENS-DEPENDENCY-CHANGE-IMPACT` | dependency / consumer / change impact |
| `QUAL` | `LENS-QUALITY-RISK-MATERIALITY` | material quality / risk dimensions |
| `TRC` | `LENS-TARGET-RESOLUTION-COVERAGE` | Target resolution / coverage sufficiency |
| `VOO` | `LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY` | verifiability / observability / operability |
| `PE` | `LENS-PRACTICAL-EVIDENCE` | practical / empirical Evidence |
| `SHARED` | `LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY` | shared / cross-cutting responsibility |
| `TEST` | `LENS-TEST-PROOF-EVIDENCE` | test / proof / Evidence strategy |

## Unit Attachment Projection

### `TM-APPLICATION-DEFINITION`

| Result Unit | R | T |
|---|---|---|
| `RU-APP-02` | `APP` | `DEP` |
| `RU-APP-03` | `APP` | `TERMS`, `QUAL` |
| `RU-APP-04` | `APP` | — |
| `RU-APP-05` | `APP` | — |
| `RU-APP-07` | `APP` | `EVO`, `DEP`, `QUAL`, `VOO`, `PE` |
### `TM-PRACTICAL-TEST`

| Result Unit | R | T |
|---|---|---|
| `RU-PTEST-01` | `PE` | `QUAL`, `VOO`, `TEST` |
| `RU-PTEST-02` | `PE` | `QUAL`, `VOO`, `TEST` |
| `RU-PTEST-03` | `PE` | `QUAL`, `VOO`, `TEST` |
### `TM-SCENARIO-PLANNING`

| Result Unit | R | T |
|---|---|---|
| `RU-SCEN-01` | — | `VERT`, `UI`, `TERMS`, `TEST` |
| `RU-SCEN-02` | `EVO` | — |
| `RU-SCEN-03` | — | `VERT`, `UI`, `IRD`, `DEP`, `QUAL`, `VOO`, `TEST` |
### `TM-DOMAIN-DISCOVERY`

| Result Unit | R | T |
|---|---|---|
| `RU-DOM-01` | `DDD` | `TERMS` |
| `RU-DOM-02` | `DDD` | `IRD`, `TERMS` |
| `RU-DOM-03` | `DDD` | `IRD`, `EVO`, `SIMP`, `DEP`, `QUAL`, `VOO`, `TEST` |
| `RU-DOM-04` | `DDD`, `EVO` | `IRD` |
### `TM-EVOLUTION-STEP`

| Result Unit | R | T |
|---|---|---|
| `RU-EVO-01` | `EVO` | — |
| `RU-EVO-02` | `EVO` | `DDD`, `VERT`, `DEP`, `SHARED` |
| `RU-EVO-03` | `EVO` | `DDD`, `VERT`, `IRD`, `SIMP`, `DEP`, `QUAL`, `VOO`, `TEST` |
| `RU-EVO-04` | `EVO` | `DEP` |
| `RU-EVO-05` | `EVO` | `IRD`, `DEP`, `QUAL`, `VOO`, `TEST` |
| `RU-EVO-06` | `EVO`, `TRC` | `QUAL` |
### `TM-FEATURE`

| Result Unit | R | T |
|---|---|---|
| `RU-FEAT-01` | `VERT` | `TERMS` |
| `RU-FEAT-02` | — | `DDD`, `TERMS` |
| `RU-FEAT-03` | — | `VERT`, `TERMS`, `QUAL` |
| `RU-FEAT-04` | `IRD` | `DDD`, `VERT`, `UI`, `EVO`, `DEP`, `QUAL`, `VOO`, `TEST` |
| `RU-FEAT-05` | `VERT` | `DDD`, `EVO` |
| `RU-FEAT-06` | `EVO` | `VERT` |
### `TM-DOMAIN-OWNER`

| Result Unit | R | T |
|---|---|---|
| `RU-DOWN-01` | `DDD` | `TERMS` |
| `RU-DOWN-02` | `IRD` | `DDD`, `TERMS`, `QUAL`, `VOO`, `TEST` |
| `RU-DOWN-03` | `DDD`, `EVO` | `DEP` |
### `TM-IMPLEMENTATION-SLICE`

| Result Unit | R | T |
|---|---|---|
| `RU-SLICE-01` | `VERT` | `DDD`, `UI`, `EVO`, `SIMP`, `DEP`, `SHARED` |
| `RU-SLICE-02` | `VERT` | `DDD`, `UI`, `TERMS` |
| `RU-SLICE-03` | `VERT` | `DDD`, `UI`, `IRD`, `EVO`, `SIMP`, `DEP`, `QUAL`, `VOO`, `SHARED` |
| `RU-SLICE-04` | `VERT`, `VOO`, `TEST` | `UI`, `IRD`, `SIMP`, `QUAL` |
| `RU-SLICE-05` | `VERT`, `EVO` | `DDD`, `UI`, `IRD` |
### `TM-SCREEN`

| Result Unit | R | T |
|---|---|---|
| `RU-SCREEN-01` | `UI` | `TERMS`, `QUAL` |
| `RU-SCREEN-02` | `UI` | `TERMS`, `SIMP`, `QUAL`, `VOO` |
| `RU-SCREEN-03` | `UI`, `EVO` | — |
### `TM-SHARED-IMPLEMENTATION-CAPABILITY`

| Result Unit | R | T |
|---|---|---|
| `RU-SHARED-01` | `VERT`, `DEP` | `DDD`, `TERMS`, `EVO`, `SIMP`, `QUAL`, `VOO`, `SHARED` |
| `RU-SHARED-02` | `DEP` | `VERT`, `SHARED` |
| `RU-SHARED-03` | `IRD` | `DDD`, `TERMS`, `EVO`, `QUAL`, `VOO`, `SHARED`, `TEST` |
| `RU-SHARED-04` | `EVO` | `VERT`, `DEP`, `SHARED` |
### `TM-PROTOTYPE`

| Result Unit | R | T |
|---|---|---|
| `RU-PROTO-01` | `PE` | `QUAL` |
| `RU-PROTO-02` | `PE` | `QUAL`, `VOO` |
| `RU-PROTO-03` | `PE` | `QUAL`, `VOO` |
### `TM-EVOLUTION-STEPS-MAP`

| Result Unit | R | T |
|---|---|---|
| `RU-EVOMAP-01` | — | `EVO` |
| `RU-EVOMAP-02` | — | `EVO`, `DEP`, `TRC` |
### `TM-SLICE-OWNER`

| Result Unit | R | T |
|---|---|---|
| `RU-SOWN-01` | `VERT` | `DDD`, `UI`, `TERMS`, `DEP`, `VOO`, `SHARED` |
| `RU-SOWN-02` | `IRD` | `DDD`, `VERT`, `UI`, `TERMS`, `QUAL`, `VOO`, `TEST` |
| `RU-SOWN-03` | `EVO` | `DDD`, `VERT`, `DEP` |
### `TM-CODE-REALIZATION`

| Result Unit | R | T |
|---|---|---|
| `RU-CODE-01` | — | `DDD`, `VERT`, `IRD`, `EVO`, `SIMP`, `DEP`, `QUAL`, `VOO`, `TEST` |

### `TM-PLANNING-RESOLUTION-STATE`

| Result Unit | R | T |
|---|---|---|
| `RU-PRS-01` | — | — |
| `RU-PRS-02` | — | — |
### `TM-PROPOSAL-WORKUP`

| Result Unit | R | T |
|---|---|---|
| `RU-PWORK-01` | — | — |
| `RU-PWORK-02` | — | — |
### `TM-PRE-UPDATE-PLAN`

| Result Unit | R | T |
|---|---|---|
| `RU-PUPDATE-01` | — | `DEP`, `QUAL`, `VOO`, `TEST` |
### `TM-EXACT-REALIZATION`

| Result Unit | R | T |
|---|---|---|
| `RU-REAL-01` | — | `DEP`, `QUAL`, `VOO`, `TEST` |
### `TM-REVIEW-FINDINGS`

| Result Unit | R | T |
|---|---|---|
| `RU-RFIND-01` | — | `DEP`, `QUAL`, `VOO` |

## Profile-context boundary for inherited Core Units

Generic Core Target Modules keep only generic Core Lens attachments. SDS-specific predictable code-realization attachments are owned by profile-local `TM-CODE-REALIZATION / RU-CODE-01`, so no Core → SDS attachment dependency or profile-overlay mechanism is required.

Core `TM-EXACT-REALIZATION / RU-REAL-01` remains broad/profile-neutral and keeps only generic Core attachments.

## Projection Integrity

Canonical parity/audit method: [`LENS-ATTACHMENT-MAP-INTEGRITY.md`](LENS-ATTACHMENT-MAP-INTEGRITY.md#sds-lens-attachment-projection-integrity) — `SDS.LENS-ATTACHMENT-PROJECTION-INTEGRITY`.

When this map disagrees with a concrete Unit owner, the Unit owner wins and this projection is repaired. The map never defines attachment strength, Core-pack membership or Lens trigger logic.

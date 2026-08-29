# TM-PRACTICAL-TEST — Implemented Practical Evidence / Acceptance

Entry Point: `tm.test.practical`  
Role: evidence-plan / operated-evidence Target Module  
Repository provenance: `UC-PLAN-TEST-PLAN`, Practical Testing workflow, Testing Plan template.

## Purpose

Plan and, when executed, record practical Evidence against the real implemented Slice/Application/environment.

It is the post-implementation counterpart of Prototype practical evidence:

```text
Prototype
  partial/simulated subject
  reduces uncertainty before implementation

Practical Test
  implemented subject
  confirms/challenges acceptance and residual doubts after implementation
```

Both reuse `../../../idtspe-core/shared/practical-evidence-method.md`.



## High-Level Example — Self-Contained Walkthrough

### Situation

Before implementation, a clickable Prototype suggested users could capture a research fragment and return to reading without losing orientation.

The real system is now implemented, including real navigation, latency, persistence and failure behavior.

### Why This Module

Some properties are best checked by an actual person/operator using the implemented system in a representative environment.

`TM-PRACTICAL-TEST` reuses Practical Evidence discipline after implementation.

### Walkthrough

Task:

```text
start while reading a real article
→ select a useful fragment
→ capture it
→ interpret success/failure feedback
→ return to reading
```

Observe:

```text
completion
time
hesitation
backtracking
window/screen orientation
feedback comprehension
actual latency/failure
recovery
```

Suppose users completed the fake prototype smoothly but the real app's modal blocks returning to the article.

That is actual Evidence capable of challenging Screen/frontend decisions; Core Finding Disposition may select revalidation/reopen when warranted.

### Result

The output records:

```text
setup/environment
actor/task
observation protocol
actual Evidence
limitations/confounders
PASS/FAIL/PARTIAL or supported/challenged/inconclusive
follow-up / revalidation position
```

### Boundary / Lesson

Prototype Evidence and Practical Test Evidence may use the same task, but they do not have the same strength.

The post-implementation test observes the real implemented subject.

## Upstream Source Contract

### Direct Semantic Sources
```text
selected Test Design / proof property when one exists
Useful Vertical Result Definition / implemented boundary
Scenario result / Acceptance
Behavior Items
Scenario DATA required for setup/observation
Requirements / invariants / negative guarantees
Screen expectations when interaction/spatial behavior matters
Domain Verification Meaning when relevant
```

### Deferred Evidence Sources
```text
Prototype uncertainties marked IMPLEMENT_AND_TEST_LATER or BOTH
residual Q/R/P whose credible answer requires the real implementation/environment
```

### Inherited Lineage
```text
Need / selected real-life solution through the tested Scenario/result
```

### Evidence / Current-State Sources
```text
actual implemented application/Slice
representative data/environment/operator state
prior Prototype Evidence when comparison is useful
```

### Constraint / Planning-State Sources
```text
Testing Strategy when applicable
operator/participant/environment/data/reset constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- Practical Test distinguishes planned protocol, actual executed Evidence, interpretation and disposition.
- Implemented practical Evidence is stronger/different from Prototype Evidence and must preserve provenance/limitations.
- Test/evidence results challenge or support semantic Decisions; they do not become product semantic authority.

**Referenced Knowledge Owners:**

- [`testing/README.md`](../../../theoretical-modules/testing/README.md)

**Reference Load Policy:**

Read raw Testing theory only when processed Test Module/Lens guidance is insufficient for a materially detailed testing question. Do not read it mechanically.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

```text
Which implemented property/result or residual uncertainty requires practical Evidence?
What real Scenario/task should be performed?
Which environment/data/actor context must be representative?
Can we reuse the same walkthrough/observations used in Prototype for pre/post comparison?
What must be observed rather than inferred from automated tests?
What counts as pass/fail vs exploratory evidence?
Which timing/navigation/orientation/friction/comprehension observations matter?
Which technical/performance/integration observations require the real implementation?
What limitations/confounders affect confidence?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) — required
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — when this is acceptance/proof rather than exploration

Frequent conditional Lens(es):
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — implemented result must be observable/diagnosable/operable
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — actual operation reveals repeatable Workspace/change pressure
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — quality properties under representative operation

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
identify exact implemented subject/property/uncertainty → design practical evidence protocol → execute/collect Evidence as Core State → interpret limits/confidence/disposition → surface follow-up/revalidation Finding Candidates → Core Finding Disposition
```

Run Records and raw observations are Evidence/supporting State, not automatically target-specific Result Units.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Practical Evidence Result`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-PTEST-01` | Evidence Subject / Acceptance Boundary | Evidence Subject + acceptance/residual-uncertainty boundary; concrete Questions remain Core State |
| `RU-PTEST-02` | Practical Evidence Protocol | Practical Evidence Protocol |
| `RU-PTEST-03` | Evidence Interpretation / Disposition | Evidence Interpretation; references actual Run/Evidence State |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Evidence Subject

**Implemented Target / Version / Environment** — exact implementation being observed.

**Target Property / Residual Uncertainty** — what must be accepted or learned.

### Practical Evidence Protocol

```text
Actor / Participant / Operator
Setup / starting state
Scenario / Task
Action / walkthrough
Observation Plan
Expected signals / pass-fail rule when applicable
Reset / repeat conditions
Representative variants/environments when material
```

Guidance:

- **Actor / Participant / Operator** — who actually performs/observes the run.
- **Setup / starting state** — exact environment/data/state needed before the run.
- **Scenario / Task** — meaningful user/operator task being exercised.
- **Action / walkthrough** — what is performed, without scripting irrelevant micro-actions.
- **Observation Plan** — what will be watched/measured.
- **Expected signals / pass-fail rule** — acceptance criteria when this is acceptance rather than exploration.
- **Reset / repeat conditions** — how repeatability/isolation is preserved.
- **Representative variants/environments** — only variants able to change confidence.


### Evidence State / Run Records — linked supporting state

Actual run facts are Core `Evidence` State Units/supporting Evidence records rather than a new target-specific Result Unit. For each execution preserve:

```text
Run ID / time/version
actual setup
actual actions
observations
measurements when useful
unexpected events
artifacts/screens/log refs
```

### RU-PTEST-03 Evidence Interpretation / Disposition

```text
Observed Evidence
Limitations / confounders
Confidence
PASS / FAIL / PARTIAL when acceptance applies
SUPPORTED / CHALLENGED / INCONCLUSIVE when exploratory
suggested follow-up / revalidation implication — hint only; Core Finding Disposition decides actual lifecycle consequence
```

Keep **Observed Evidence** factual and separate from **Interpretation**. Confidence is qualitative unless real quantitative evidence supports a measure; do not invent probabilities.


## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-PTEST-01
CONTENT_KIND: PRACTICAL_TEST_RESULT
WHEN: implemented/practical observation supports acceptance or Decision revalidation
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Practical Test Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <practical-test-owner>
CONTENT: subject/environment/task/protocol; actual Evidence; limitations; interpretation; disposition
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PTEST-02
CONTENT_KIND: PRACTICAL_RAW_EVIDENCE
WHEN: logs/media/measurements/run records are bulky or independently reviewed
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Practical Test Target as interpreter; raw Evidence stays Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <practical-evidence-artifact>
CONTENT: raw/representative observations referenced from Practical Test result
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED** — actual practical Evidence used for acceptance/revalidation must persist with enough setup/task/observation/limitations context to be auditable later.

Representation may be embedded in the Practical Test Target owner or a supporting Evidence artifact when runs/logs/media/measurements are independently large/reused.

**Do not overwrite** Prototype Evidence with implemented Evidence; preserve provenance and evidentiary boundary.

`P-14` must separate planned protocol, actual Evidence, interpretation/disposition and bulky supporting evidence placement.


## Guard

```text
planned protocol ≠ executed Evidence
Prototype Evidence ≠ implemented acceptance
one participant/run ≠ universal usability truth
measurement ≠ interpretation
```

## Handoff

```text
TM-TEST-COVERAGE
Finding Candidate → Core Finding Disposition → Decision revalidation / narrow reopen when warranted
UC-IDTSPE-REVIEW-CONSISTENCY when findings imply cross-owner drift
`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when practical operation reveals repeatable Workspace/change pressure
```

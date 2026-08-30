# TM-PRACTICAL-TEST — Implemented Practical Evidence / Acceptance

Entry Point: `tm.test.practical`  
Role: implemented practical-evidence Target Module  
Compatibility name: `TM-PRACTICAL-TEST` is retained so current command/routing identity does not require a topology migration.

## Purpose

Plan practical Evidence for a **real implemented subject** and, once that subject exists, collect and interpret that Evidence for acceptance, learning and narrow revalidation.

The Target may be formed before realization to prepare `RU-PTEST-01 Evidence Intent / Subject` and `RU-PTEST-02 Observation / Data Collection Plan`. Actual implemented Evidence and `RU-PTEST-03 Evidence Results / Interpretation` require the real implemented subject/environment.

The Target is broader than a pass/fail test. It can answer both:

```text
Acceptance
  does the real implementation satisfy the behavior/property we intended?

Learning
  what do real use, real data, real environment and real operation teach us
  that was not known confidently before implementation?
```

Operational telemetry/logging infrastructure is not owned here. This Target may use those mechanisms as Sources or reveal that additional observability is needed; the implementation owner/Cross-Cutting concern/code owns durable runtime instrumentation.

```text
Evidence Intent / Subject
↓
Observation / Data Collection Plan
  may be prepared before realization
↓
real implemented subject/environment exists
↓
collect actual implemented Evidence
↓
Evidence Results / Interpretation
↓
revalidate real semantic owners when warranted
```

## Upstream Source Contract

### Direct Semantic Sources

```text
intended or actual implemented Application / Scenario / Slice / Screen / Cross-Cutting subject
Scenario Behavior / Behavior Items / DATA when relevant
Requirement / invariant / quality property when relevant
selected Test Design/proof property when acceptance is the purpose
residual Q/R/P or Prototype question requiring the real implementation
Scenario Development / Change Outlook when real-use learning can validate future pressure
```

### Evidence / Current-State Sources

```text
actual implemented version/build — required for Evidence collection, not necessarily initial Target planning
representative users/operators/data/environments
production or staging telemetry/analytics/logs when relevant and permitted
support/error/incident records when relevant
prior Prototype Evidence for pre/post comparison
```

### Constraint / Planning-State Sources

```text
privacy/safety/data-retention constraints
participant/operator/environment/reset constraints
observation window / release/version boundaries
```

### Source Discovery Rule

Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md).

Primary reusable Lens:
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) — credible real-world observation/data collection and Evidence interpretation.

Conditional Lenses:
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) — when the Target is primarily acceptance/proof rather than exploratory learning.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when the implemented result is difficult to observe/diagnose/operate credibly.
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when representative quality/risk behavior is the subject.

No separate Target Module Knowledge Basis is currently required. Deeper Testing theory may be consulted conditionally for a materially difficult proof question, but this Target's ordinary learning/collection flow is operational rather than a theory package.

## Resolution / Production Method

### 1. Establish what we want to learn from the real implementation

Ask:

```text
What implemented subject/boundary will be observed? If it is not realized yet, what future real subject is intended?
What do we need to accept, verify or learn?
Which real semantic owner/Decision could change because of the result?
Why is the real implementation/environment necessary for credible Evidence?
```

Do not create a practical Evidence Target merely because a feature shipped.

### 2. Choose the evidence mode proportionally

The same Target may use one or several relevant sources:

```text
representative manual/user/operator walkthrough
observed user sessions
production/staging telemetry
analytics
logs / traces / error records
performance measurements
support/incident evidence
interviews or structured feedback
controlled A/B or rollout experiment
representative environment runs
```

These are examples, not a required taxonomy.

### 3. Plan collection before interpreting results

Decide only what is needed to answer the question:

```text
subject/version/environment
actor/participant/operator or population
starting state / observation window
task/action or passive observation source
data/observations/measurements to collect
expected signals / acceptance rule when appropriate
variants/repeats/sample/window when useful
privacy/safety/data handling constraints
known confounders/limits
```

For acceptance, explicit pass/fail criteria may be useful. For exploratory learning, do not invent thresholds merely to make the work look like a test.

### 4. Use existing observability rather than owning it

If required data already exists in telemetry/logs/analytics, consume it as Evidence Source.

If the needed observation is unavailable:

```text
Finding Candidate:
  required evidence cannot currently be observed

→ Core Finding Disposition
→ implementation Slice / Cross-Cutting Concern / code may need instrumentation work
```

The Practical Evidence Target does not itself become the owner of permanent logging/analytics architecture.

### 5. Collect actual Evidence

Execution gate: a real implemented subject/environment must exist. Planning this Target before realization does not count as implemented Evidence.

Actual run facts, measurements, logs, usage counts, observations and participant/operator statements remain Core `Evidence` State or supporting Evidence artifacts.

Preserve version/environment/time/window provenance where it materially affects interpretation.

### 6. Separate observation from interpretation

```text
Observed:
  11% of failed attempts are retried within 10 seconds

Interpretation:
  failure/completion semantics may be ambiguous

Decision:
  handled later by the real semantic owner through normal disposition/revalidation
```

### 7. Record limitations / confidence honestly

Keep relevant sample, environment, telemetry completeness, release-window, provider/device and other limitations. Confidence is qualitative unless real quantitative evidence supports a measure; do not invent probability.

### 8. Feed only material learning back

Evidence may support acceptance, challenge current Scenario/Screen/Slice/other meaning, validate a Development/Change Outlook pressure, or reveal a new question. Core Finding Disposition/G2 selects any revalidation/reopen action.

A Lens may surface Finding Candidates while this method runs; the Lens does not mutate accepted Result Units directly.

## Target Step-Result Contract

**Target Step Result:** `Implemented Practical Evidence Result`

| Result Unit | Meaning |
|---|---|
| `RU-PTEST-01` | Evidence Intent / Subject |
| `RU-PTEST-02` | Observation / Data Collection Plan |
| `RU-PTEST-03` | Evidence Results / Interpretation |

Only applicable/material detail is projected. Result Unit identity does not imply a separate Target or file.

### RU-PTEST-01 — Evidence Intent / Subject

Defines what real implemented thing is or will be observed and what this Target exists to learn/accept.

Typical meaning:

```text
intended implemented subject/boundary; pin the actual version/build before Evidence collection
questions or referenced Q/R/P/proof property
acceptance vs exploratory-learning purpose when useful
affected semantic owners/Decisions
why real implemented Evidence is needed
```

Concrete questions remain Generic State; this Unit organizes the implemented Evidence inquiry.

### RU-PTEST-02 — Observation / Data Collection Plan

Defines the proportional collection method:

```text
representative context/environment/population or operator
walkthrough/task/action and/or passive data source
observation window / setup / reset when relevant
Evidence/data/measurements to collect
acceptance/discriminating signals when useful
variants/repeats/sample/window when useful
privacy/safety/data handling constraints
known limitations/confounders
```

The plan may be prepared before realization and may combine manual observation and existing system telemetry when both answer the same inquiry. If planned early, it can expose observability/instrumentation needs for the real implementation without pretending that Evidence already exists.

### RU-PTEST-03 — Evidence Results / Interpretation

Organizes actual Evidence and what it means relative to RU-PTEST-01. This Result Unit is absent until real implemented Evidence has actually been collected.

Typical meaning:

```text
actual Evidence/run/data refs
observed patterns/measurements
limitations/confounders
acceptance result when applicable
interpretation / learning
follow-up or revalidation hint
```

`PASS / FAIL / PARTIAL` may be useful for acceptance. `supported / challenged / inconclusive` may be useful for exploration. Neither set is a required enum.

Actual Evidence is not product semantic authority. Any changed Scenario/Screen/Slice/etc meaning is selected through normal Decision/Revalidation and reflected in the natural owner.

## Relationship To Exact Realization Verification

Generic Core [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md) may, with explicit authority, integrate a candidate into a selected environment and run build/compile/static/automated/runtime checks. Those run facts are Core Evidence used to validate/refine the exact candidate; they do **not** automatically create `TM-PRACTICAL-TEST`.

`TM-PRACTICAL-TEST` remains the owner for acceptance/learning from a **real implemented subject/environment** when representative users/operators/data/telemetry/operation or another implemented-practical Evidence inquiry is material. A successful candidate build/test loop can be a prerequisite or Source, but it is not by itself this Target's real-use Evidence result.

## Relationship To Prototype

Prototype and implemented practical Evidence may intentionally reuse the same question/task/observation shape for comparison, but their evidence strength differs:

```text
TM-PROTOTYPE
  partial/simulated/throwaway subject allowed
  useful before implementation

TM-PRACTICAL-TEST
  Target/collection plan may be prepared before realization
  Evidence subject is the real implemented subject/environment
  actual results are useful for acceptance and post-implementation learning
```

Do not overwrite Prototype Evidence with implemented Evidence; preserve provenance.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-PTEST-01
CONTENT_KIND: IMPLEMENTED_PRACTICAL_EVIDENCE_RESULT
WHEN: real implemented observation/data is material to acceptance, learning or Decision revalidation
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current TM-PRACTICAL-TEST Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <implemented-practical-evidence-owner>
CONTENT: intent/subject; collection plan; Evidence refs; limitations; interpretation/acceptance/follow-up
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PTEST-02
CONTENT_KIND: PRACTICAL_RAW_EVIDENCE
WHEN: logs/media/measurements/run records/exports are bulky or independently reviewed
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: TM-PRACTICAL-TEST Target as interpreter; raw observations remain Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <practical-evidence-artifact>
CONTENT: raw/representative Evidence with version/environment/time/window provenance and limitations
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Small plan/result and small Evidence may live together. Split raw data only when size/reuse/review needs justify it. Never persist sensitive data merely because the methodology has a place for Evidence.

## Guards

```text
planning TM-PRACTICAL-TEST before realization ≠ collecting implemented Evidence before realization
planned collection ≠ executed Evidence
Prototype Evidence ≠ implemented Evidence
implemented Evidence ≠ product semantic authority
measurement ≠ interpretation
one participant/run/window ≠ universal behavior truth
TM-PRACTICAL-TEST ≠ owner of permanent telemetry/logging architecture
more available data ≠ better Evidence
```

## Handoff

```text
Evidence Results / Interpretation
→ Core Finding Disposition / G2 Decision Revalidation
→ Scenario / Screen / Slice / Application / Cross-Cutting / other natural owner when warranted

acceptance/proof result
→ TM-TEST-COVERAGE when coverage review is useful

missing durable observability
→ implementation / Cross-Cutting owner candidate through normal disposition
```

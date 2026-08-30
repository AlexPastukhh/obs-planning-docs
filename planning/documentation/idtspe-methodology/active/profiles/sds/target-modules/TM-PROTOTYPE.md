# TM-PROTOTYPE — Prototype / Experiment

Entry Point: `tm.prototype`  
Role: practical-evidence Target Module

## Purpose

Plan and run one bounded prototype/experiment when material uncertainty is best reduced through practical observation before the real implementation is complete.

Prototype is a separate Target because it owns its own inquiry, experiment design, data/observation collection and interpretation. It is not merely an Evidence Lens and it does not become product/application truth because a prototype happened to use one particular UI, architecture or implementation shape.

```text
material uncertainty
↓
Prototype Intent / Questions
↓
Prototype Plan
↓
run + collect observations/data
↓
Prototype Results / Evidence
↓
revalidate the real semantic owner when warranted
```

Typical subjects include concept/value, Scenario behavior, interaction/UI, DATA comprehension, technical feasibility, integration, performance and operational/environment behavior.

## Upstream Source Contract

### Direct Semantic Sources

```text
material Q/R/P / assumption / unresolved Decision
affected Application / Scenario / Screen / Slice / other Target
accepted requirements/constraints relevant to the question
```

### Evidence / Current-State Sources

```text
existing research/reference Evidence
current implementation when extending an existing solution
available platform/integration/environment facts
```

### Constraint / Planning-State Sources

```text
time/cost/tool/environment limits
available participants/operators/data
privacy/safety constraints on data collection
```

### Source Discovery Rule

Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md).

Primary reusable Lens:
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) — credibility of experiment/observation and Evidence limits.

Frequent conditional Lenses:
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when the result is difficult to observe credibly.
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when performance/reliability/accessibility/security/etc are the subject.

UI/DDD/Slice/Evolution/Test Lenses are selected only when their perspective is materially useful to the prototype question; a visual prototype does not automatically activate the UI Lens.

No separate Target Module Knowledge Basis is currently needed. The reusable practical-evidence method/Lens supplies the relevant observation discipline; the module owns the operational prototype workflow below.

## Resolution / Production Method

### 1. Establish why a Prototype is useful

Ask:

```text
What do we materially not know?
What Decision/Target meaning could change depending on the answer?
Why is practical observation more useful than reasoning/research alone?
Can this question be answered credibly before full implementation?
```

If the experiment cannot produce discriminating Evidence, do not create prototype work merely for ceremony.

### 2. Select the minimum credible prototype

Choose the cheapest subject capable of answering the question credibly. Examples include a paper/clickable flow, fake workflow, manual simulation, technical spike, throwaway mini-app, mocked integration, benchmark or real partial implementation.

Method names are examples, not required enums.

### 3. Define the real / simulated boundary

Make explicit what is real, stubbed, mocked, manual or omitted.

```text
real interaction + mocked backend
→ useful Evidence about interaction
→ weak/no Evidence about backend/integration reliability
```

Do not let prototype fidelity imply stronger Evidence than the experiment actually provides.

### 4. Plan data/observation collection before running

For each material question decide proportionally:

```text
who/what will run the prototype?
what context/setup is representative enough?
what actions/tasks are performed?
what will be observed or measured?
which signals would support/challenge the current hypothesis?
how many runs/variants are useful?
what this prototype cannot establish?
```

Collect only data that helps answer the question. Do not add telemetry/measurements merely because they are available.

### 5. Run and collect actual Evidence

Actual observations, measurements, run facts, logs/media and participant/operator statements are Core `Evidence` State or supporting Evidence artifacts. Small Evidence may be embedded with the Prototype owner; bulky/reused Evidence may be linked separately.

### 6. Separate observation from interpretation

```text
Observation:
  4/5 participants returned before finding the action

Interpretation:
  current interaction may be insufficiently discoverable

Idea:
  use tabs
```

Do not collapse those three meanings into one statement.

### 7. Record limitations

Preserve relevant limitations/confounders such as mocked boundaries, sample/context limits, device/environment restrictions and missing failure conditions.

### 8. Return Evidence to the real owner

Prototype findings become inputs to normal Core Finding Disposition / Decision Revalidation. The Prototype Target does not directly rewrite Application, Scenario, Screen, Slice, Domain or architecture truth.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md).

## Target Step-Result Contract

**Target Step Result:** `Prototype Evidence Result`

| Result Unit | Meaning |
|---|---|
| `RU-PROTO-01` | Prototype Intent / Questions |
| `RU-PROTO-02` | Prototype Plan |
| `RU-PROTO-03` | Prototype Results / Evidence |

Only applicable/material detail is projected. Result Unit identity does not imply a separate Target or file.

### RU-PROTO-01 — Prototype Intent / Questions

Defines what this Prototype exists to learn and why the answer matters.

Typical meaning:

```text
Prototype identity / subject
questions or referenced Q/R/P
current hypothesis/assumption when useful
affected Target/Decision/owner
why practical Evidence is useful now
```

Concrete unresolved questions remain Generic State; this Unit organizes the inquiry of this Prototype rather than duplicating Q/R/P ownership.

### RU-PROTO-02 — Prototype Plan

Defines the experiment and collection plan proportionally:

```text
subject/prototype to build or operate
included / excluded scope
real vs simulated boundary
actor/participant/operator or technical runner
setup/context/task/action
data/observations/measurements to collect
discriminating signals when useful
repeat/variant plan when useful
known evidence limits
```

The plan may be tiny for a tiny technical spike. Do not force all fields when they add no value.

### RU-PROTO-03 — Prototype Results / Evidence

Organizes what actually happened and what it means relative to RU-PROTO-01.

Typical meaning:

```text
actual runs / Evidence refs
observed patterns or measurements
limitations/confounders
interpretation relative to the original questions
supported / challenged / inconclusive / still needs real implementation — plain language is sufficient
likely revalidation/follow-up hint
```

Actual observations remain Evidence, not selected product truth. Decisions remain Generic Decision State and are reflected in their natural semantic owner after disposition.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-01
CONTENT_KIND: PROTOTYPE_INQUIRY_PLAN_AND_RESULT
WHEN: Prototype practical Evidence is material to planning
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Prototype Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <prototype-owner>
CONTENT: intent/questions; prototype/collection plan; real-vs-simulated boundary; Evidence refs; limitations; interpretation/follow-up
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-02
CONTENT_KIND: PRACTICAL_EVIDENCE_RUN_DATA
WHEN: raw run data/media/logs/measurements are bulky or independently reused
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Prototype Target as interpreter; raw observations remain Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <prototype-evidence-artifact>
CONTENT: actual observations/run records with provenance and limitations; referenced from Prototype owner
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-03
CONTENT_KIND: PREMATURE_IDEA
WHEN: experiment produces an unselected product/UI/technical idea
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: UNRESOLVED until selected by a real owner
REPRESENTATION: REGISTER_ENTRY
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/ideas/INBOX.md or appropriate layer IDEAS.md
CONTENT: unselected idea with prototype provenance; not Prototype truth
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Small Prototype plan/result and small Evidence can live together. Split run material only when volume/reuse/review needs justify it. Prototype identity does not imply one file.

## Guards

```text
prototype ≠ final implementation
prototype shape ≠ canonical Screen/Scenario/Architecture
prototype success ≠ proof the real implementation works
planned observation ≠ executed Evidence
measurement ≠ interpretation
prototype cannot answer a question that fundamentally requires the real integrated environment
```

## Handoff

```text
Prototype Results / Evidence
→ Core Finding Disposition / G2 Decision Revalidation
→ affected Application / Scenario / Screen / Slice / other semantic owner when warranted

question that still requires the real implementation
→ preserve the question + useful collection context
→ TM-PRACTICAL-TEST / implemented practical Evidence later
```

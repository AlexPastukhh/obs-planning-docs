# Practical Evidence Method — Prototype And Implemented Practical Evidence

Status: active reusable evidence method  
Used by: `TM-PROTOTYPE`, `TM-PRACTICAL-TEST`

## 1. Purpose

Use one observation discipline before and after implementation without pretending those Evidence sources have the same strength.

```text
question / uncertainty / property
↓
plan how to observe it credibly
↓
collect actual Evidence
↓
separate observation from interpretation
↓
record limits
↓
Decision support / acceptance / learning / revalidation
```

The two Target Modules remain separate because the subject is materially different:

```text
TM-PROTOTYPE
  partial/simulated/throwaway subject allowed
  practical learning before full implementation

TM-PRACTICAL-TEST
  Target and collection plan may be prepared before realization
  actual Evidence comes from the real implemented subject/environment
  practical acceptance and post-implementation learning
```

Target-formation time is not the evidentiary boundary: `TM-PRACTICAL-TEST` may be planned early so implementation can make later observation possible, but its actual Evidence/results phase starts only when the real implemented subject exists.

## 2. Shared Inquiry Shape

A practical evidence inquiry may need:

```text
Question / uncertainty / property
Affected Target / Decision / owner
Why practical observation is useful
Subject Under Observation
Real vs simulated boundary when relevant
Actor / participant / operator / population
Context / environment / version
Task/action and/or passive data source
Observation / data collection plan
Discriminating or acceptance signals when useful
Actual Evidence
Limitations / confounders
Interpretation
Follow-up / disposition hint
```

This is guidance, not a mandatory record schema.

## 3. Evidence Sources / Methods

Choose only sources that help answer the question. Examples:

```text
paper/clickable prototype
manual/concierge simulation
throwaway mini-app / technical spike
mocked integration
benchmark / controlled experiment
implemented Scenario walkthrough
observed user/operator session
production/staging telemetry
analytics
logs / traces / error records
performance measurements
support/incident evidence
interviews / structured feedback
A/B or staged rollout experiment
```

Method names are not conformance enums.

## 4. Plan Collection Before Interpreting

Before running/observing, ask proportionally:

```text
What exactly are we trying to learn or accept?
What data/observation could answer it?
What should be real vs simulated?
What context/environment must be representative?
What signals would support/challenge the current hypothesis?
What would count as acceptance when this is a proof question?
Which repeats/variants/window/sample are actually useful?
What privacy/safety/data constraints apply?
What can this evidence source not establish?
```

Do not gather every available metric. Evidence collection follows the question.

## 5. Observation Examples

Depending on the inquiry:

```text
task/scenario completion
time / latency
hesitation / backtracking / repeated action
navigation/orientation mistakes
DATA/feedback comprehension
errors / failed attempts / recovery
manual intervention
integration behavior
performance / throughput / resource use
feature/capability usage
outcome distribution
retry / abandonment patterns
support/incident patterns
```

## 6. Real / Simulated Boundary

Prototype evidence must state material fake/stub/mock/manual boundaries. Implemented evidence should state material version/environment/window boundaries.

```text
clickable UI + mocked backend
→ can support interaction learning
→ cannot prove real integration reliability

production telemetry for one provider / two weeks
→ can support learning about that observed population/window
→ cannot automatically establish universal future behavior
```

## 7. Observation ≠ Interpretation ≠ Decision

```text
Observation:
  4/5 participants retried immediately after timeout

Interpretation:
  timeout semantics may be ambiguous

Decision:
  selected later through normal owner/revalidation process
```

Actual Evidence remains separate from the interpretation and from the Decision it informs.

## 8. Acceptance vs Learning

When the purpose is acceptance, explicit expected signals / PASS-FAIL style interpretation may be useful.

When the purpose is learning, use the Evidence to support/challenge a hypothesis or reveal a new question without inventing artificial thresholds.

Both are practical Evidence; neither gives the Evidence Target semantic authority over the product/application owner.

## 9. Prototype → Implemented Evidence Continuity

When a question cannot be settled credibly until the real implementation exists, preserve enough continuity to avoid rediscovery:

```text
question
relevant Scenario/task/context
important observations/measurements
known prototype limitations
```

Later `TM-PRACTICAL-TEST` may reuse or adapt that shape against the real implementation.

## 10. Operational Observability Boundary

An implemented practical Evidence Target may consume telemetry/logs/analytics. It does not own permanent observability architecture.

If required Evidence cannot be observed, surface a Finding Candidate. Normal disposition may select an implementation Slice/Cross-Cutting/code owner to add appropriate instrumentation.

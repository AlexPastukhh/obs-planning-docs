# Practical Evidence Method — Prototype And Implemented Practical Evidence

Status: active reusable Practical Evidence Knowledge Basis / method  
Used by: `LENS-PRACTICAL-EVIDENCE`, `TM-PROTOTYPE`, `TM-PRACTICAL-TEST`

## 1. Purpose / Ownership Split

Use one observation discipline before and after implementation without pretending those subjects have the same evidentiary strength.

```text
this shared method / Knowledge Basis
→ reusable inquiry + observation + collection + interpretation mechanics

LENS-PRACTICAL-EVIDENCE
→ evaluates whether a concrete practical-evidence approach is credible/economical

TM-PROTOTYPE
→ owns one practical inquiry whose subject may be partial/simulated/throwaway

TM-PRACTICAL-TEST
→ owns one practical inquiry whose Evidence subject is the real implemented system/environment
```

Target Modules should reference this method instead of duplicating its full mechanics.

## 2. Shared Inquiry Shape

A practical Evidence inquiry may proportionally need:

```text
Question / uncertainty / property
Affected owner / Decision
Why practical observation is useful
Subject Under Observation
Real vs simulated boundary OR real version/environment/window
Actor / participant / operator / population
Context / task / action and/or passive data source
Observation / data collection plan
Discriminating or acceptance signals when useful
Actual Evidence
Limitations / confounders
Interpretation
Follow-up / disposition hint
```

This is guidance, not a mandatory record schema.

## 3. Prototype vs Implemented Evidence — Paired Example

Question:

```text
Can a user discover and complete Archive without confusion?
```

Prototype inquiry:

```text
clickable UI
+ mocked backend
+ representative task
→ 4/5 participants find Archive
```

This can support interaction/discoverability learning. It cannot prove that the real archive operation persists correctly or behaves well under real latency/failure.

Later implemented inquiry:

```text
real implemented Archive flow on representative environment
+ actual server/persistence behavior
+ reload / real latency / failure signals
→ only 2/5 users complete the flow because an 8-second real response looks stalled
```

The **question may continue**, but the subject and Evidence strength changed materially. That is why Prototype and Implemented Practical Evidence remain separate Target families while sharing this method/Lens.

## 4. Choose Only Discriminating Evidence

Before collecting, ask proportionally:

```text
What exactly are we trying to learn or accept?
What observation/data could answer it?
What must be real, and what may be simulated?
What context/environment must be representative?
What signals would support/challenge the current hypothesis?
What would count as acceptance when this is a proof question?
Which repeats/variants/window/sample are actually useful?
What privacy/safety/data constraints apply?
What can this Evidence source not establish?
```

Do not gather every available metric merely because it exists.

## 5. Evidence Sources / Methods

Examples only:

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

## 6. Real / Simulated / Version Boundary

Prototype Evidence must expose material fake/stub/mock/manual boundaries.

Implemented Evidence must expose material real version/environment/window boundaries.

```text
clickable UI + mocked backend
→ useful for interaction learning
→ weak/no Evidence for real integration reliability

production telemetry for one provider / two weeks
→ Evidence for that observed population/window
→ not universal future behavior truth
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

Keep these meanings separate.

## 8. Acceptance vs Learning

Acceptance may use explicit expected signals/pass-fail interpretation when the property supports it.

Exploratory learning may use supported/challenged/inconclusive language and reveal new questions without artificial thresholds.

Both are practical Evidence. Neither gives the Evidence Target product-semantic authority.

## 9. Data / Limits / Confidence

Preserve only limitations/confounders that materially affect interpretation, such as:

```text
sample/population
mocked boundary
device/provider/environment
observation window/version
telemetry completeness
missing failure conditions
```

Do not invent quantitative confidence without quantitative support.

## 10. Prototype → Implemented Continuity

When useful, preserve enough continuity to avoid rediscovery:

```text
question/property
relevant Scenario/task/context
important prior observations
known prototype limitations
```

The implemented inquiry may reuse/adapt these against the real subject.

## 11. Operational Observability Boundary

Practical Evidence may consume telemetry/logs/analytics but does not own permanent observability architecture.

If required Evidence cannot be observed:

```text
Finding Candidate
→ Core Finding Disposition
→ implementation / Cross-Cutting / Exact Realization work when warranted
```

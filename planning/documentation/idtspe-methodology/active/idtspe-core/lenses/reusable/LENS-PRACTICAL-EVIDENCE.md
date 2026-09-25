<a id="lens-practical-evidence"></a>
# LENS-PRACTICAL-EVIDENCE — Prototype / Implemented Practical Evidence

Lens ID: `LENS-PRACTICAL-EVIDENCE`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Knowledge Basis Contract`](../../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS`
> - `CONTEXTUALIZES` [`Practical Evidence Knowledge Basis`](../../knowledge-bases/PRACTICAL-EVIDENCE.knowledge-basis.md#knowledge-practical-evidence) — `KNOWLEDGE.PRACTICAL-EVIDENCE`

## Purpose

Evaluate whether practical Evidence before or after implementation is capable of answering the material question credibly, economically and with honest limits.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> A material question/acceptance claim requires observing a real or intentionally simulated subject/environment because Sources/reasoning/automated proof alone cannot credibly resolve it.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

A material question/acceptance claim requires observing a real or intentionally simulated subject/environment because Sources/reasoning/automated proof alone cannot credibly resolve it.

### Opening Triggers

Prototype/Practical Test work starts, or the question depends on real environment/platform/integration behavior, human usability, empirical performance/resource behavior, alternative discrimination, or post-implementation observation.

### During-work Recheck / Invalidation Triggers

Question/property, subject, real-vs-simulated boundary, version/environment/data/sample/window, collection method, acceptance criterion, or observed Evidence changes; new Evidence contradicts assumptions.

### Closing Triggers / Revalidation Conditions

The result proposes/uses practical Evidence or claims learning/acceptance from observation; validate subject strength, collection relevance, provenance, limits and interpretation.

### Confident-False / Stop Conditions

Question is credibly resolved from existing authoritative Sources, reasoning, or cheaper automated proof.

### False-negative Risks

“More confidence” is not enough; practical observation must answer a specific discriminating/acceptance question.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
Material question/property, affected owner/Decision, subject under observation, Scenario/context, actor/environment/data constraints, existing Evidence and intended collection method.

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Evaluation

Ask proportionally:

```text
What exactly must be learned/accepted?
Why is practical observation useful?
Is the chosen subject strong enough to answer that question?
What is real vs simulated, or which real version/environment/window is observed?
What data/observations are actually discriminating?
Are we collecting unnecessary data?
What limitations/confounders materially weaken interpretation?
Are observation, interpretation and Decision kept separate?
For post-implementation Evidence, is existing telemetry/logging merely a Source rather than being reassigned to the Evidence Target?
If an implemented-Evidence Target is planned before realization, are collection/instrumentation needs prepared now while actual Evidence is correctly deferred until the real subject exists?
```

## Acceptance vs Exploration

Acceptance may use explicit proof signals / PASS-FAIL interpretation. Exploratory learning may use supported/challenged/inconclusive language. Neither vocabulary is a required enum.

## Prototype → Implemented Continuity

When useful, preserve the question, Scenario/task/context, key observations and known limitations so the same concern can later be checked against the real implementation.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

Typical Finding Candidates include:

```text
prototype cannot credibly answer a question requiring real integration
collection plan does not observe the claimed property
data is available but irrelevant to the question
critical real/simulated or version/environment boundary is hidden
sample/window/environment makes the conclusion too broad
interpretation is presented as observation
required post-implementation evidence cannot currently be observed
```

Core Finding Disposition selects any owner/revalidation consequence.

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

Prototype, implemented practical Evidence, and Application/Feature/Scenario/Screen/Domain/Slice/Shared proof planning when practical observation matters.

## Artifact / File Implications

```text
ARTIFACT_GUIDANCE
ID: AG-PE-01
CONTENT_KIND: DECISION_RELEVANT_PRACTICAL_EVIDENCE
WHEN: practical Evidence materially supports/challenges acceptance, learning or Decision revalidation
GUIDANCE: ADVISORY_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: resolved Evidence/host Target owner; Prototype or TM-PRACTICAL-TEST is a likely owner hint when that Target is selected
REPRESENTATION: EMBED_OR_SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <prototype-or-implemented-evidence-owner> and optional <evidence-artifact>
CONTENT: inquiry/collection context; actual observation; limitations; interpretation/follow-up
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-PE-02
CONTENT_KIND: BULKY_RAW_EVIDENCE
WHEN: run data/logs/media/measurements/exports need independent storage
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: resolved Evidence State/owner; supporting storage is not separate semantic authority
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <practical-evidence-artifact>
CONTENT: raw Evidence referenced from semantic/planning owner with relevant provenance/limits
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

Persist only evidence necessary for traceability/review and permitted by privacy/safety constraints. More retained data is not automatically better evidence.

## Guards / Boundaries
```text
prototype success ≠ proof final implementation works
planned collection ≠ actual Evidence
measurement ≠ interpretation
Evidence ≠ semantic authority
TM-PRACTICAL-TEST ≠ permanent telemetry/logging owner
```

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

Unexpected Evidence or missing observability surfaces a Finding Candidate. Core Finding Disposition may select Decision/Scope/owner revalidation or implementation work; this Lens does not perform those transitions itself.

## Knowledge Basis

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- practical Evidence quality depends on whether the chosen observation/data source can answer the actual question;
- observation, interpretation and Decision remain separate;
- Prototype and implemented Evidence may reuse an inquiry shape without having equal evidentiary strength.

**Referenced Knowledge Owners:**

- [`planning/documentation/idtspe-methodology/active/idtspe-core/knowledge-bases/PRACTICAL-EVIDENCE.knowledge-basis.md`](../../knowledge-bases/PRACTICAL-EVIDENCE.knowledge-basis.md)

**Reference Load Policy:**

Read the shared practical-evidence method when experiment/collection design is non-trivial. The mode/load-policy labels are retained representation, not Generic conformance requirements.

**Operationalization Notes:**

This Lens owns the evaluation perspective; the shared method owns reusable observation/data-collection mechanics.

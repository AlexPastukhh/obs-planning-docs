<a id="lens-verifiability-observability-operability"></a>
# LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY — Proof / Observation / Diagnosis / Operation

> Semantic Owner Dependency
> - `EXTENDS` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.

Lens ID: `LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`
Legacy alias: `L6`

## Purpose

Ask whether correctness/failure/state can be credibly proved, observed, diagnosed and operated at acceptable cost before accepting a realization/architecture/result.

Broader than test/proof design: it also covers observability, diagnosis, operation and recovery.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> Runtime correctness/failure/state/effects must be demonstrated, observed, diagnosed, recovered, retried, operated, or their operational cost can change acceptance/architecture.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

Runtime correctness/failure/state/effects must be demonstrated, observed, diagnosed, recovered, retried, operated, or their operational cost can change acceptance/architecture.

### Opening Triggers

The Unit starts with runtime/integration/shared behavior, external/irreversible effect, failure/recovery/retry path, operator/user diagnostic need, or proof requiring observation of actual state/effect.

### During-work Recheck / Invalidation Triggers

Runtime path/effect, failure mode, state visibility, telemetry/diagnostic context, retry/recovery/rollback, operator constraints, external outcome uncertainty, or proof boundary changes.

### Closing Triggers / Revalidation Conditions

The result establishes runtime/integration/automation/shared behavior or a proof/operation claim whose success/failure/state must be credibly observable, diagnosable and operable.

### Confident-False / Stop Conditions

Surface is purely static semantic classification and no runtime proof/observation/diagnosis/operation/recovery property is at issue.

### False-negative Risks

Happy-path tests can hide inability to detect uncertain external outcomes or recover safely.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
```text
selected behavior/result/invariants
runtime path
candidate architecture/seams
failure/recovery expectations
environment/operator constraints
existing tests/telemetry/operational evidence
```

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Verifiability

```text
What proves success?
What proves failure?
Can negative/no-mutation guarantees be proved?
Are important invariants observable?
Can the boundary be verified independently?
```

## Observability

Can we tell what state/result occurred? Can important failures be detected? Is Evidence available at the right boundary?

## Diagnosability

If something fails, can we determine why? What context/logs/state/traces are needed?

## Operability / Recovery

Can a human/tool operate and recover safely? What rollback/manual burden exists?

## Proof Cost

Does this choice make proof disproportionately expensive? Would another boundary make verification/diagnosis simpler?

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

```text
Q/R/P
proof/Evidence requirements
observability/diagnosis requirements
operation/recovery requirements
Test/Practical Evidence handoff
Decision rationale
```

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

Feature/Slice/Domain/Shared/Scenario/Screen work, Architecture/WEUC decisions, Exact Realization, Practical Test and critical tooling decisions.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L6-01
CONTENT_KIND: PROOF_OBSERVABILITY_OPERABILITY_FINDING
WHEN: proof/diagnosis/operation consequence materially affects choice
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target when Core Finding Disposition resolves the accepted proof/operation finding there; otherwise resolved owner
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: proof/observation/diagnosis/operation requirement/finding
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-L6-02
CONTENT_KIND: INDEPENDENT_SHARED_OPERABILITY_CONCERN
WHEN: observability/operation mechanism becomes independently shared/material
GUIDANCE: ROUTE
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: owner selected by Target Formation when needed (often Cross-Cutting/shared or a bounded local Target)
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: UNRESOLVED
CONTENT: form real owner first; then place its canonical artifact
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```


Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

Normally **NO_DISTINCT_SUPPORTING_ARTIFACT**: L6 surfaces Finding Candidates; when Core Finding Disposition resolves accepted requirement/Decision/Test-handoff meaning to the current Target, that Target's ordinary representation carries it.

**PREFERRED supporting operational/proof artifact** when runbooks, telemetry contracts, recovery procedures or proof plans are independently reused/reviewed across Targets.

If L6 exposes a genuinely shared implementation responsibility, surface a Finding Candidate with the Cross-Cutting/shared family as a likely owner hint. Core Finding Disposition and, when needed, Target Formation resolve the real owner before placement; do not create an unnamed “L6 file”.

## Guards / Boundaries
Proof/telemetry mechanism does not become semantic authority.

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

A materially independent observability/operation subsystem may surface a Target Formation candidate through Core Finding Disposition; Target Formation decides whether a Cross-Cutting/shared or bounded local Target is warranted.

## High-Level Example — Self-Contained Walkthrough

### Situation

A background import job processes hundreds of items asynchronously.

Two architecture candidates both appear functionally correct.

### Why This Lens

L6 asks whether important success/failure/state can be proved, observed, diagnosed and operated in practice.

### Walkthrough

For candidate A:

```text
job returns immediately
no durable per-item status
errors only appear in generic logs
```

For candidate B:

```text
import has durable run status
failed items are identified
operator can inspect/retry failures
```

Questions:

```text
How do we know completion happened?
How is partial failure detected?
Can an operator diagnose why one item failed?
Can recovery happen without rerunning everything?
```

### Result

L6 may surface a Finding Candidate that candidate B has substantially better verification/diagnosis/operation characteristics. Core Finding Disposition may resolve that accepted meaning as input to the current Decision when the current Target/Decision is the actual owner.

### Boundary / Lesson

L6 does not prescribe a monitoring stack.

It exposes proof/observation/operation consequences that may matter to the decision.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- A selected result should be provable/observable/diagnosable/operable at the boundary where correctness and failure matter.
- Testability is broader than test/proof design and may require seams, telemetry, diagnostic context or operational mechanisms.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Concrete test/telemetry/runtime facts are Target Inputs/Evidence; this Lens owns the cross-cutting proof/operation perspective.

## Provenance

Restores Complete Picture v6 L6 / later Proof-Verification-Operability Lens.

<a id="lens-quality-risk-materiality"></a>
# LENS-QUALITY-RISK-MATERIALITY — Cross-Cutting Quality / Risk Materiality

> Semantic Owner Dependency
> - `EXTENDS` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.

Lens ID: `LENS-QUALITY-RISK-MATERIALITY`

## Purpose

Activate only quality/risk dimensions capable of changing the answer; avoid both omission and universal NFR ceremony.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> Observable security/privacy/performance-capacity/reliability-availability/safety/compliance-auditability/accessibility/UX/economic-cost signals could change selection, acceptance, ownership, realization or proof burden.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

Observable security/privacy/performance-capacity/reliability-availability/safety/compliance-auditability/accessibility/UX/economic-cost signals could change selection, acceptance, ownership, realization or proof burden.

### Opening Triggers

Any explicit quality constraint/risk source or hard signal exists: trust/authority boundary, sensitive data, scale/budget, failure tolerance/durability, harm path, external obligation, accessibility interaction constraint, or material recurring/operating cost.

### During-work Recheck / Invalidation Triggers

Design/behavior/environment changes trust boundary, privilege, sensitive-data handling, load/latency/resource exposure, durability/recovery, harm path, compliance obligation, accessibility/interaction, or material cost.

### Closing Triggers / Revalidation Conditions

The final result introduces/changes a quality/risk exposure or acceptance claim; dimensions capable of changing the answer must be resolved or explicitly bounded.

### Confident-False / Stop Conditions

No observable dimension signal is present, or the present dimension cannot change selection/acceptance/ownership/proof/realization.

### False-negative Risks

Security/privacy/safety/compliance signals can be hidden inside “implementation details”; uncertainty should APPLY rather than skip.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
Need/Scenario/Requirement, external constraints, incidents/performance data, target environment/scale, user/accessibility and economic evidence.

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Prompts

```text
Can this dimension change the answer?
What makes it material?
What unacceptable outcome must be prevented?
Is it current/credible or speculative?
Who owns the must-hold condition?
What evidence shows adequacy?
```

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

```text
material quality condition/ref
risk/failure mode
comparison dimension
Evidence need
likely-owner / lifecycle hint
Q/R/P
revalidation signal
```

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

Application, Scenario, Screen, Domain, Slice, Frontend, Cross-Cutting, Testing and L5 architecture evaluation.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-QR-01
CONTENT_KIND: MATERIAL_QUALITY_RISK
WHEN: quality/risk dimension can change current answer
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: owner resolved by Core Finding Disposition; current Target / implementation owner may be a likely hint when the finding only refines current meaning
REPRESENTATION: EMBED_NATURAL_OWNER_OR_CURRENT_TARGET
FILE_OR_ARTIFACT: <natural-owner> or <current-idtspe-owner>
CONTENT: material requirement/risk/Evidence need; do not create generic NFR file by default
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-QR-02
CONTENT_KIND: SHARED_QUALITY_MUST_HOLD
WHEN: quality rule is genuinely shared/external and needs one canonical owner
GUIDANCE: ROUTE
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: UNRESOLVED_OWNER until Core Finding Disposition / Target Formation selects Requirement, Cross-Cutting or another shared owner
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: UNRESOLVED
CONTENT: resolve semantic owner before creating shared artifact
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```


Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

After Core Finding Disposition resolves a material quality/risk finding, persist accepted State with the **resolved semantic owner**; an exceptional shared Requirement/Cross-Cutting owner is used only when disposition/Target Formation selects it.

**PREFERRED supporting evidence/risk artifact** only when evidence/history/review lifecycle is independent and useful.

Do not create one file per quality dimension or generic NFR checklist by default.

## Guards / Boundaries
Do not turn every quality word into a framework, Target or mandatory checklist.

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

An independently material quality concern with no natural existing owner may surface a Target Formation candidate through Core Finding Disposition. Target Formation decides whether a separate Target is needed.

## High-Level Example — Self-Contained Walkthrough

### Situation

The same methodology is used for two products:

```text
A:
  personal local research prototype

B:
  production payment workflow
```

### Why This Lens

A universal NFR checklist would waste effort on A and still risk shallow thinking on B.

This Lens activates only quality/risk dimensions capable of changing the answer.

### Walkthrough

For A:

```text
multi-region availability
formal auditability
high-scale throughput
```

may have no material effect.

For B:

```text
security
privacy
reliability
auditability
latency
```

can change Scope, Architecture, Test and operational decisions.

Each activated dimension should have a real Source/risk basis.

### Result

The Lens produces only material quality/risk findings, Evidence-need meaning, likely-owner/lifecycle hints and Q/R/P-relevant observations; Core Finding Disposition resolves actual State/owner consequences.

### Boundary / Lesson

“Security is important” is not enough to create a framework or Target.

The dimension must be material to the current decision.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Quality/risk dimensions activate only when capable of changing the current answer, owner, evidence need or proof burden.
- A generic NFR checklist is not a substitute for materiality/evidence.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Domain/regulatory/security standards may be Target Inputs or separately referenced by future specialized Lenses; this Lens owns the reusable generic materiality-evaluation perspective, while Core Finding Disposition decides whether a surfaced finding is materially accepted and what State/owner/lifecycle consequence follows.

## Provenance

Normalized from branch-comparison, cross-cutting and target-specific quality/risk prompts.

# LENS-QUALITY-RISK-MATERIALITY — Cross-Cutting Quality / Risk Materiality

Lens ID: `LENS-QUALITY-RISK-MATERIALITY`  
Activation: `FREQUENT_CONDITIONAL`

## Purpose

Activate only quality/risk dimensions capable of changing the answer; avoid both omission and universal NFR ceremony.

## Applicability Gate

Check candidates for material differences in:

```text
security
privacy
performance / capacity
reliability / availability
safety
compliance / auditability
UX / accessibility
business/economic cost
```

Operability/observability as a realization property is primarily L6.

## Target Inputs / Evidence

Need/Scenario/Requirement, external constraints, incidents/performance data, target environment/scale, user/accessibility and economic evidence.

## Prompts

```text
Can this dimension change the answer?
What makes it material?
What unacceptable outcome must be prevented?
Is it current/credible or speculative?
Who owns the must-hold condition?
What evidence shows adequacy?
```

## Findings / Outputs

```text
material quality condition/ref
risk/failure mode
comparison dimension
Evidence need
likely-owner / lifecycle hint
Q/R/P
revalidation signal
```

## Typical Consumers

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
RESOLVER: P-14 / TF-10
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
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

After Core Finding Disposition resolves a material quality/risk finding, persist accepted State with the **resolved semantic owner**; an exceptional shared Requirement/Cross-Cutting owner is used only when disposition/Target Formation selects it.

**PREFERRED supporting evidence/risk artifact** only when evidence/history/review lifecycle is independent and useful.

Do not create one file per quality dimension or generic NFR checklist by default.

## Guards

Do not turn every quality word into a framework, Target or mandatory checklist.

## Composition

Often combines with L3, L5, L6 and target-profile packs.

## Escalation / Revalidation

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

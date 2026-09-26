<a id="lens-authority-sot-reuse"></a>
# LENS-AUTHORITY-SOT-REUSE — Authority / Source-of-Truth / Reuse

> Semantic Owner Dependency
> - `EXTENDS` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.

Lens ID: `LENS-AUTHORITY-SOT-REUSE`
Legacy alias: `L2`

## Purpose

Use canonical truth, preserve one-directional planning, avoid duplicate semantic authority and reuse valid accepted work instead of re-planning it.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> A material choice can create/change semantic authority, Source of Truth, reuse, or duplicate truth.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

A material choice can create/change semantic authority, Source of Truth, reuse, or duplicate truth.

### Opening Triggers

The Unit may create/change durable meaning, select an owner/destination, reuse existing authority, or introduce another representation of existing truth.

### During-work Recheck / Invalidation Triggers

Owner, destination, reuse strategy, source/reference relation, persistence location, generated projection, or duplicate-truth risk changes.

### Closing Triggers / Revalidation Conditions

The final Unit result establishes or changes durable meaning, owner/SoT, reuse relation, or a representation that might be mistaken for authority.

### Confident-False / Stop Conditions

No semantic ownership/SoT/reuse/duplicate-truth consequence is possible on the current bounded surface.

### False-negative Risks

Supporting artifacts, generated projections, or copied requirements can become accidental second authorities.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
```text
Source Contract
canonical owners
accepted Decisions
Current Target
repository/workspace owners
history/projections/generated artifacts
Evidence
```

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## At Need / Target / Source Resolution

```text
Which owner owns this meaning?
Which Source is canonical vs Evidence/history/projection/constraint?
Is a more authoritative Source available?
Can accepted work be reused?
Are conflicting Sources present?
```

## At RQ Discovery

```text
Has this question already been answered?
Would asking it again duplicate upstream planning?
Which owner should answer it if unresolved?
```

## At Proposal Evaluation

```text
Does this Proposal steal another owner's responsibility?
Does it duplicate truth?
Is implementation being mistaken for semantic authority?
```

## At Integration / Projection

```text
Is downstream planning redefining upstream semantics?
Are projections clearly projections?
Are owner references preserved?
```

## Natural Subject Check

Evaluate the material under the canonical Core [Natural Subject / Ownership Boundary](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-natural-subject-ownership); this Lens does not redefine that ownership routing.

Operationally ask:

- what semantic subject does this meaning actually describe?
- would keeping it here duplicate another Target/Unit/owner's authority?
- if several owners are involved, is the **relation/composition itself** genuinely the current Target's subject, or is this merely a convenient collection point?
- is exact realization detail being mistaken for durable semantic authority?
- is ownership unclear/conflicting enough to surface a Finding Candidate?

Physical file location, a planning table/Step or a Markdown link is evidence about representation/navigation only, not ownership.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

```text
canonical owner
Source role classification
reuse decision
authority conflict
duplicate-truth finding
owner/revalidation finding
projection/history-only classification
```

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

All material Targets, Target Formation, Artifact/File planning, branch comparison and reconciliation.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L2-01
CONTENT_KIND: AUTHORITY_SOURCE_MAPPING
WHEN: L2 surfaces a material canonical-owner / Source / reuse Finding Candidate
GUIDANCE: ADVISORY
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target planning state for the mapping record when resolved there; referenced semantic meaning stays with the canonical owner resolved by Core Finding Disposition
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: canonical owner/Source-role/reuse/conflict finding
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-L2-02
CONTENT_KIND: MISSING_SEMANTIC_OWNER
WHEN: L2 surfaces that no valid semantic owner is evident
GUIDANCE: ROUTE_NOT_PLACE
PERSISTENCE_GUIDANCE: UNRESOLVED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: UNRESOLVED_OWNER
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: UNRESOLVED
CONTENT: semantic owner unresolved; surface a Finding Candidate. Core Finding Disposition may surface a Target Formation candidate; do not create a file as a hidden semantic owner
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```


Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

L2 often changes **placement/reference**, not semantic content.

**REQUIRED** — when an L2 Finding Candidate is dispositioned and the canonical semantic owner is resolved, `P-14` must place persisted content in that already-resolved owner and mark duplicate/generated/history artifacts as reference/projection rather than equal authority.

**PREFERRED full Artifact Pack** when reuse/merge/retire/split of existing files is material.

Do not create a separate L2 artifact by default.

## Guards / Boundaries
Name/path similarity is not proof of semantic equivalence.

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

A materially contradicted trusted Source produces a Finding Candidate rather than being silently overridden. Core Finding Disposition resolves whether Source/owner revalidation or reopen is required.

## High-Level Example — Self-Contained Walkthrough

### Situation

A Scenario defines semantic information:

```text
Source Context
= where captured material came from
```

Later the implementation contains:

```text
CaptureRequest.sourceUrl
database.source_url
UI field source
```

### Why This Lens

L2 determines which owner is canonical and whether later artifacts are semantic Sources, implementation representations or projections.

### Walkthrough

Classification:

```text
Scenario Source Context
  semantic authority

CaptureRequest.sourceUrl
  transport representation

database.source_url
  storage representation

UI source field
  presentation/input realization
```

If the database field differs from Scenario meaning, the implementation must be reconciled; the database does not silently redefine the semantic concept.

### Result

L2 produces:

```text
canonical owner
Source roles
reuse/reference route
duplicate-truth/conflict finding if present
```

### Boundary / Lesson

Same names across files do not imply equal authority.

Current implementation can be valuable Evidence without becoming semantic truth.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- One material meaning should have one canonical semantic owner.
- Reuse/reference existing authority before creating duplicate truth; topology/linkage does not transfer semantic authority.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Repository/domain sources may establish current authority facts, but the ownership/reuse evaluation rules are owned here.

## Provenance

Normalized from Source-of-Truth/Prior-Work Reuse + Consistency/Semantic Authority Lens families.

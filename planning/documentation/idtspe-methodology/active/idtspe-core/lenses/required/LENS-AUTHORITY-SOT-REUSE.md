# LENS-AUTHORITY-SOT-REUSE — Authority / Source-of-Truth / Reuse

Lens ID: `LENS-AUTHORITY-SOT-REUSE`  
Legacy alias: `L2`  
Activation: `REQUIRED_CORE`

## Purpose

Use canonical truth, preserve one-directional planning, avoid duplicate semantic authority and reuse valid accepted work instead of re-planning it.

## Applicability Gate

Always check for a material IDTSPE choice.

## Target Inputs / Evidence

```text
Source Contract
canonical owners
accepted Decisions
Current Target
repository/workspace owners
history/projections/generated artifacts
Evidence
```

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

## At Idea Evaluation

```text
Does this Idea steal another owner's responsibility?
Does it duplicate truth?
Is implementation being mistaken for semantic authority?
```

## At Integration / Projection

```text
Is downstream planning redefining upstream semantics?
Are projections clearly projections?
Are owner references preserved?
```

## Findings / Outputs

```text
canonical owner
Source role classification
reuse decision
authority conflict
duplicate-truth finding
owner/revalidation finding
projection/history-only classification
```

## Typical Consumers

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
RESOLVER: P-14 / TF-10
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
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

L2 often changes **placement/reference**, not semantic content.

**REQUIRED** — when an L2 Finding Candidate is dispositioned and the canonical semantic owner is resolved, `P-14` must place persisted content in that already-resolved owner and mark duplicate/generated/history artifacts as reference/projection rather than equal authority.

**PREFERRED full Artifact Pack** when reuse/merge/retire/split of existing files is material.

Do not create a separate L2 artifact by default.

## Guards

Name/path similarity is not proof of semantic equivalence.

## Composition

L4 evaluates structural dependency/change impact. L2 evaluates semantic-authority/SOT/reuse questions. Neither Lens owns the referenced project semantics; Core Finding Disposition resolves accepted owner/State/lifecycle consequences.

## Escalation / Revalidation

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

# LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY — Uncertainty / Assumption / Reversibility

Lens ID: `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`  
Legacy alias: `L3`  
Activation: `REQUIRED_CORE`

## Purpose

Before choosing, distinguish established basis from assumption/unknown, decide whether Evidence is worth acquiring and avoid expensive irreversible commitment before it is justified.

This is prospective planning, not revalidation.

## Applicability Gate

Check every material choice. If no material unknown can change the answer, resolve `no material uncertainty` and do no extra work.

## Target Inputs / Evidence

```text
candidate Target / RQ / Idea / Branch
available Evidence
assumptions
constraints
timing/horizon
possible research/prototype routes
reversal/migration context
```

## Prompts

```text
Which claim is established vs assumption/hypothesis/unknown?
Could it materially change ranking/selection?
When can better Evidence become available?
What is the cheapest credible discriminator?
Can the choice remain reversible?
What is the cost of being wrong?
What is the cost of delay?
What is migration/reversal cost?
What revalidation signal should be preserved?
```

## Findings / Outputs

```text
assumption/unknown classification
Evidence need
research/prototype candidate
reversible/deferred choice
confidence basis
Q/R/P
revalidation signal
```

## Typical Consumers

All material IDTSPE Targets; especially Prototype, Application Definition, Scenario, Domain, Slice and branch comparison.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L3-01
CONTENT_KIND: MATERIAL_UNCERTAINTY
WHEN: uncertainty/assumption can change current answer
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target when Core Finding Disposition resolves the accepted uncertainty/revalidation state there; otherwise resolved owner
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: assumption/unknown; Evidence need; reversible/defer choice; revalidation signal
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-L3-02
CONTENT_KIND: EVIDENCE_ACQUISITION
WHEN: practical experiment is selected
GUIDANCE: ROUTE
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: existing Prototype/Practical Test Target when already resolved; otherwise UNRESOLVED_OWNER
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: <prototype-or-practical-test-owner>
CONTENT: Evidence question/protocol + likely Evidence Target hint; Core Finding Disposition / Target Formation resolves actual owner before placement
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

Normally **NO_DISTINCT_SUPPORTING_ARTIFACT**: the Lens surfaces a Finding Candidate; when Core Finding Disposition resolves accepted uncertainty/Q/R/P/Decision-basis/revalidation state to the current Target, that Target carries it in its ordinary planning representation.

**PREFERRED supporting Evidence/Prototype artifact** when an uncertainty requires later research/experiment/revalidation and would otherwise be lost.

**UNRESOLVED persistence** is valid for weak assumptions until it is known whether they can change a material Decision.

Do not create one file per assumption.

## Guards

Do not invent numeric probabilities. Do not research harmless unknowns.

## Composition

Practical Evidence may execute Evidence acquisition. L5 evaluates future Workspace pressure. Revalidation later consumes preserved signals but is not this Lens.

## Escalation / Revalidation

An independently substantial uncertainty may surface a Target Formation candidate. Target Formation decides whether to reuse an existing Target, hand off/reference an owner, or form a new bounded Target.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team likes the idea:

```text
use a floating capture overlay
```

but has never tested whether users actually find it faster or clearer.

### Why This Lens

L3 separates what is known from what is assumed and asks whether the choice should remain reversible or receive Evidence before commitment.

### Walkthrough

Classify:

```text
Known:
  low interruption is important

Assumption:
  floating overlay reduces interruption

Unknown:
  users understand the overlay and return to reading easily
```

Compare:

```text
implement full window architecture now
vs
build a cheap clickable fake
```

The cheap experiment may answer the uncertainty while keeping architectural commitment low.

### Result

L3 may produce:

```text
material assumption
prototype Evidence need
reversible/defer recommendation
revalidation signal
```

### Boundary / Lesson

Required L3 does not mean every Target needs research.

If no uncertainty can materially change the choice, the Lens can close with “no material uncertainty”.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Material uncertainty should be made explicit rather than smuggled into accepted Decisions.
- Evidence effort and reversibility should be proportional to cost-of-being-wrong and decision lock-in.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Specific research/testing evidence is Target input; the uncertainty/reversibility reasoning rules are owned by this Lens.

## Provenance

Restores IDTSPE Complete Picture v6 Core Pack L3.

# LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT — Proposal / Decision Resolution Context

> Semantic Owner Dependency
> - `EXTENDS` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [Resolution Carry-Forward contract](../../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`.

Lens ID: `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`

<a id="lens-proposal-decision-resolution-context"></a>

## Purpose

Operationally evaluate one material Proposal/Decision resolution context through the existing Core lifecycle owners without creating a second Proposal, Decision, Q/R/P or Evidence lifecycle.

## Analysis Surface

```text
Proposal identity / subject / driver
candidate Result Meaning
candidate Resolution / Realization Route when material
actual/claimed Decision selection
related Q/R/P + Evidence
natural owner / affected owners
accepted Result / current temporal-host meaning
residual/revalidation context
```

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

A material Proposal or Decision surface exists.

### Opening Triggers

Competing alternatives, an active Proposal, or an unresolved/retained Decision is already part of the Unit context.

### During-work Recheck / Invalidation Triggers

Proposal set, comparison basis, Evidence, selection, Decision status, rationale, or supersession relation changes.

### Closing Triggers / Revalidation Conditions

The Unit creates/retains/resolves a Proposal or Decision, or its final meaning depends on one whose resolution context must remain truthful.

### Confident-False / Stop Conditions

No material Proposal/Decision surface exists.

### False-negative Risks

Informal “we chose X” language can be a Decision surface even if no explicit Decision record existed at opening.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence

Current Proposal/Decision surface; candidate alternatives; decisive Evidence; related Q/R/P/E state; authority/owner context; integration/reconsideration context when material.

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Authority Boundary

Canonical semantic/lifecycle owners remain:

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Q/R/P Lifecycle`](../../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`
> - `CONTEXTUALIZES` [`Decision Revalidation Projection`](../../resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) — `RESOLUTION.DECISION-REVALIDATION-PROJECTION`
> - `CONTEXTUALIZES` [Resolution Carry-Forward contract](../../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`

- [`USER Input Decision / Answer Intake`](../../runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md) owns USER-input classification;
- Evidence remains ordinary Core Evidence State.

This Lens owns only the reusable **operational evaluation** of a concrete Proposal/Decision context. It does not duplicate the linked lifecycle/projection contracts.

## QRPE View

`QRPE` is a compact view, **not** a new Core State kind:

```text
Proposal / Decision
└─ related QRPE — all optional
   Q — related Question
   R — related Risk
   P — related Problem
   E — related Evidence
```

The obligation is to check applicability. `none material` is a valid result; do not force an empty four-field form.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

### Proposal Operation

Check proportionally:

```text
Proposal identity / subject / driver
candidate Result Meaning
candidate route when material
related QRPE applicability
material unknowns / assumptions / evidence basis
material risk / problem consequence
affected owners / integration surface
selection readiness / unresolved USER authority
```

Then return to the lifecycle owner for canonical Proposal Semantic Change Impact Review and selection handling. A newly discovered contradiction/unsupported assumption/owner conflict becomes a Finding Candidate rather than Lens-owned State.

Check that the lifecycle owner's [evidence-backed resolution conclusions](../../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-claim-grounding) are satisfied: what inspected reference/USER statement supports each material upstream/downstream or no-new-selection conclusion, and why does that support apply to this candidate? An unknown consequence stays explicit. The Lens evaluates this obligation without owning a second grounding or Finding-classification contract.

### Decision Qualification / Integration Operation

Operationalize existing lifecycle rules:

```text
actual material selection exists?
→ if no: not a Decision

selection made under applicable authority?
→ if no: not accepted Decision meaning

exact selected meaning identifiable?
→ required

where is selected meaning integrated?
→ natural Unit / Target / temporal owner

does a separate record satisfy the linked Core retention contract and Carry-Forward admission, with independent continuation/revalidation value?
→ if yes: represent the admitted record in PRS when a bounded PRS is formed; if no: preserve ordinary Unit content without a separate carried record
```

Also check that this Lens/consumer has not become a competing retention authority: Decision semantics remain Core-owned, [`RESOLUTION.CARRY-FORWARD`](../../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward-decision-retention) owns carried-Decision admission/exit and continuation eligibility, PRS owns only its concrete result representation, and accepted meaning remains with the integrated Units. Check exit against Carry-Forward rather than inventing a Lens-specific closure rule.

### Proposal → Decision QRPE Disposition

Selection does not copy Proposal QRPE mechanically. For each material related item:

```text
Question → answered/closed or residual Question?
Risk → eliminated / mitigated / accepted residual / still open?
Problem → resolved / deferred / accepted limitation / still open?
Evidence → still material to accepted basis/revalidation?
Decision → exposes any new Q/R/P?
```

Surviving open/deferred/residual items remain with their canonical lifecycle/natural owners and may be kept with their related resolution context when [`RESOLUTION.CARRY-FORWARD`](../../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) qualifies continuation; a formed PRS may represent that bounded state.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

```text
reviewed Proposal/Decision context
related QRPE applicability/disposition
Decision qualification finding
owner/integration finding
residual/revalidation finding
Finding Candidate when a new contradiction/authority problem is discovered
```

## Artifact / File Implications

This Lens creates no dedicated artifact by default. Material accepted semantic consequences remain with canonical lifecycle/natural owners. When review state or surviving residual context needs persistence, use ordinary Documentation / Representation + P-14 and, when applicable, the Resolution Carry-Forward projection rather than a Lens-owned semantic body.

## Guards / Boundaries
```text
QRPE ≠ new Core State kind
Lens ≠ Proposal/Decision lifecycle owner
Lens ≠ Q/R/P/Evidence lifecycle owner
AI recommendation ≠ selection
reviewed candidate Target Instance ≠ canonical integration / realization authority
```

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

Re-run only when the material Proposal/Decision surface, decisive Evidence, related QRPE, authority, integration owner or reconsider context changes materially.

## Knowledge Basis

Mode: `REFERENCED`

This Lens intentionally references rather than copies the Proposal/Decision lifecycle, Q/R/P lifecycle, USER-input intake and Decision Revalidation Helper. Those owners remain the reusable semantic/evaluation knowledge authorities for their respective responsibilities.

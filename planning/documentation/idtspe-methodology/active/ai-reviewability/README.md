# AI Reviewability — Peer Cross-Cutting Concern

Status: active independent cross-cutting concern
Scope: make material AI outputs easy to review without becoming semantic planning authority.

## Position In The Methodology

AI Reviewability is a **peer concern beside IDTSPE**, not a Target Module, Lens, profile, semantic owner or lifecycle engine.

```text
AI Reviewability
→ how material AI output is exposed/rechecked for human review

IDTSPE
→ planning State/Targets/Proposal/Decision/Q/R/P lifecycle and revalidation

SDS
→ software-specific planning components/owners
```

AI Reviewability may require presentation/recheck behavior, but it does not select semantic owners or mutate accepted meaning.

## Key Points Contract

A material answer/output exposes its major material content as `Key Points` proportionally.

A reader who scans only Key Points should understand the major conclusions/alternatives/unresolved tensions, while evidence/reasoning/examples remain in the body.

Stable `KP-*` IDs are optional and mainly useful for long-lived review/discussion.

Key Points are a review/navigation projection, not State and not a second semantic owner.

## Review Priority

`Review Priority` expresses the cost/blast radius of being wrong. It is not confidence, prose complexity, lifecycle status or execution order.

```text
Critical
→ error may change broad/global direction, invalidate several downstream owners
  or cause expensive widespread rework / severe correctness harm

High
→ error may materially change one major owner/Target or several connected parts

Normal
→ material but mainly local

Low
→ local, cheaply reversible, low blast radius
```

Q/R/P may reuse the compact aliases `P0 / Critical`, `P1 / High`, `P2 / Normal`, `P3 / Low`; the Q/R/P owner controls Q/R/P lifecycle/category/group semantics.

Do not raise priority merely because a topic is complex or speculative.

## Broad Discussion Specialization

In IDTSPE Broad Discussion, Key Points are the normal way to structure **material logical parts** of conversational prose.

```text
logical discussion part
  explanation / evidence / alternatives
  Key Points
    concise key content
```

An Integration Checkpoint may additionally include an optional Broad Discussion Summary. Neither projection becomes planning authority or persistence by default.

Canonical conversation/checkpoint owner:
[`../idtspe-core/shared/broad-discussion-and-integration-checkpoint-model.md`](../idtspe-core/shared/broad-discussion-and-integration-checkpoint-model.md).

## Q/R/P Review Projection

When material Q/R/P is surfaced to the USER, useful AI review normally distinguishes proportionally:

```text
Known / implied
→ what checked current owners/Evidence already establish

Interpretation / options
→ realistic meanings/routes visible from current context

Technical/logical recommendation
→ only when current evidence/principles justify one

USER-owned unknown
→ preference, feeling, product priority, risk tolerance or other authority the AI cannot invent

Minimum useful USER question
→ ask only when its answer can materially change the Decision
```

`Recommendation` is not `Decision`. Missing USER preference is not permission to manufacture one.

Canonical Q/R/P semantic owner:
[`../idtspe-core/shared/qrp-lifecycle-and-review-contract.md`](../idtspe-core/shared/qrp-lifecycle-and-review-contract.md).

## Review Order

When several material review items compete for attention, a `Review Order` may be derived from:

```text
Review/QRP Priority
+ semantic dependency / blocking
+ affected-owner / blast radius
+ timing / currentness
```

Review Order is navigation only. It does not become a work queue, second priority field or semantic authority.

## Built-In Pre-Return Recheck

Before returning a material planning/development result, perform a proportional self-recheck:

```text
Current-scope recheck
→ reconstruct what the selected scope/owner must answer
→ check omissions, contradictions, unsupported assumptions,
  silently selected alternatives and missing completion meaning

Integration recheck
→ check Critical/High material against affected current owners,
  accepted upstream meaning, Requirements/constraints and material Evidence
```

Quality target: repeating the ordinary recheck with no new evidence should normally not discover a material omission that should have been caught before the first answer.

This is a review-quality obligation, **not** authority to run a second semantic lifecycle. When the recheck surfaces a material semantic issue, use normal Finding Disposition / Revalidation / Integration owners.

Canonical semantic repair owners:

- [`../idtspe-core/shared/finding-disposition-contract.md`](../idtspe-core/shared/finding-disposition-contract.md)
- [`../idtspe-core/shared/revalidate-current-work-use-case.md`](../idtspe-core/shared/revalidate-current-work-use-case.md)
- [`../idtspe-core/shared/consistency-review-use-case.md`](../idtspe-core/shared/consistency-review-use-case.md)

## Semantic Dependency / Backflow Boundary

AI Reviewability does not own a universal planning chronology.

Generic rule:

```text
accepted upstream/current-owner meaning
→ dependent realization

new downstream Evidence / contradiction / infeasibility
→ Finding Candidate
→ earliest affected owner
→ targeted Revalidation
→ only affected dependent work becomes stale/rebuilt
```

The semantic lifecycle is owned by Core Revalidation/Consistency and the applicable profile/owner contracts. Reviewability only requires that contradictions/backflow are visible rather than silently compensated downstream.

## Critical Review / Review Audit Boundary

Ordinary material answers use this built-in reviewability proportionally.

Explicit commands may request independently useful review work:

```text
critical review
→ adversarial/truth-seeking review of the selected target as hypothesis

review audit
→ report what was actually checked, partial/unchecked material,
  quality/sufficiency and delta versus prior review
```

Those command/workflow owners do not create another Key Points/Review Priority ontology.

## Boundary

```text
Key Points / Review Priority / Review Order / pre-return recheck
= review projections/obligations
≠ semantic State owner
≠ Proposal/Decision selection authority
≠ Q/R/P lifecycle
≠ Target lifecycle
≠ persistence requirement
```

Do not manufacture Key Points for trivial replies, Critical/High labels for complexity alone, or repeated rechecks as a substitute for reading current owners/Evidence.

## Source Provenance

This owner consolidates the useful reviewability semantics formerly spread across:

```text
planning/documentation/ai-reviewability-and-directed-planning-principles.md
planning/documentation/planning-concerns-and-decisions-model.md
```

Those compatibility files no longer own current reviewability/Q/R/P semantics.

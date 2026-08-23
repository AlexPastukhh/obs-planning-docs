# Planning Concerns And Decisions Model

Status: active reusable cross-cutting semantic owner
Scope: canonical semantics, lifecycle, retention and routing/storage contract for material Planning Questions/Risks/Problems, related Concern Groups and generic Decision trace across repository, Application, Workspace, Architecture, Testing, File Update and ReviewDiff planning.

This model is a secondary planning lens. It does **not** replace the real semantic owners, make Q/R/P the planning root or require one universal concerns file.

## 1. Authority And Boundary

```text
Real-Life Need / useful result / Scenario / UC / Domain / Slice / other semantic owner
→ Current Plan / selected meaning
→ material Question / Risk / Problem only when a real unresolved/adverse concern exists
→ Planning Concern / Concern Group lens
```

The real Scenario/UC/Domain/Slice/Architecture/Testing/etc owner remains authority for selected meaning. This file owns only the cross-cutting concern/decision semantics and storage/retention contract.

A concern register/index is navigation/state control, not a second source of truth.

## 2. Planning Concern

A `Planning Concern` is one material Question, Risk or Problem attached to concrete current planned meaning.

Recommended fields when material:

```text
ID
Type: Question | Risk | Problem
Title / Finding
Owner / affected semantic meaning
Current Plan / Current→Target relation
Origin / Provenance
Introduced / Exposed By — when useful
Priority
Concern Category
Status
Concern Group — when related
Stored At — when cross-file addressability matters
AI Comment
Answer / Evidence — when applicable
Recommendation — when justified
Decision reference(s) — when selected/material
Residual state / treatment — when applicable
Reconsider When — when useful
```

Stable IDs are useful when a concern is referenced from another file, register, Idea, Decision or Concern Group. A tiny local concern that never leaves one section does not need ceremony merely to obtain an ID.

### Question

A material answer/evidence/choice gap that can change current planning meaning.

### Risk

A material adverse possibility that remains relevant under the current plan, including accepted/mitigated residual risk.

### Problem

A material current defect, contradiction, missing guarantee, ownership conflict or other adverse state that still affects the current plan.

Do not register every uncertainty, imaginable future or implementation inconvenience. The owner-attachment/admission gate remains mandatory.

## 3. Owner-Attachment / Admission Gate

```text
candidate concern
→ concrete semantic owner / affected meaning?
→ concrete Current Plan / Current→Target relation?
→ material Question/Risk/Problem after cheap check against current principles/evidence?
```

If not, integrate the obvious consequence or keep it as Idea/observation/evidence/context instead of active Q/R/P.

## 4. Concern Priority

Concern Priority reuses the existing Review Priority semantics; do not create a second incompatible impact scale.

```text
P0 / Critical
→ wrong handling can change global/current direction, invalidate several downstream owners or cause expensive broad rework / severe correctness harm

P1 / High
→ can materially change one major owner/stage or several connected parts

P2 / Normal
→ material but mainly local; correction should not substantially redirect the wider plan

P3 / Low
→ local, cheaply reversible detail with little downstream effect
```

Priority is not confidence, Category, status or Review Order.

Priority may consider, only when evidence makes it material:

```text
blocking/dependency effect
correctness or user impact
risk severity/likelihood
near decision horizon
affected-owner/blast radius
cost of deferral
reversibility
```

A Concern Group may have its own group priority while every member keeps its individual priority.

## 5. Concern Category

`Concern Category` is a review/filter lens, not an owner-routing rule and not the same as another domain-specific field named `Category`.

Recommended extensible vocabulary:

```text
semantic
UX/product
domain/data
architecture
engineering/implementation
testing/verification
integration
operations
documentation/maintainability
```

Default to one `Primary Category`. Add Related Categories only when they improve review. Context may introduce a more precise category without changing the generic model.

Example:

```text
Owner: Scenario SCN-X
Type: Risk
Priority: P1 / High
Concern Category: architecture
```

This is valid: Category does not move semantic ownership.

## 6. Concern Group

A `Planning Concern Group` groups concerns that materially share one **resolution surface**.

```text
Question Q-4 — semantic
Risk R-8 — UX/product
Problem P-3 — engineering/implementation

→ one answer / evidence set / selected decision materially addresses all three
→ Concern Group CG-12
```

Group when several Q/R/P are causally coupled or would mainly be resolved by the same answer/evidence/decision. Similar topic alone is insufficient when the resolutions are independent.

A Concern Group is not a semantic owner. Every member retains its own:

```text
Type
Priority
Concern Category
Status
Owner / affected meaning
Answer/evidence/decision/residual state
```

Recommended group fields when material:

```text
Group ID / title
Affected owner(s)
Group Priority
Primary / related Concern Categories
Status
Members
Shared resolution surface / why grouped
AI Comment
Candidate resolution(s) when useful
Recommendation when justified
Selected Decision reference(s)
Residual members/state
Stored At
Reconsider When
```

Consistency invariant:

> When several findings are substantially one resolution problem, do not present them as unrelated concerns merely because one is a Question, another a Risk and another a Problem.

## 7. Status / Lifecycle

Use status proportionally; these values are recommended semantics, not a reason to populate every field.

```text
Question:
  open | needs evidence | answered | superseded

Risk:
  open | mitigated | accepted residual | eliminated | superseded

Problem:
  open | deferred | accepted limitation | resolved | superseded

Concern Group:
  open | partially resolved | resolved | accepted residual | deferred | superseded
```

`silence` is never closure.

## 8. AI Comment Boundary

For a material active Concern/Group, AI output should normally provide a useful **AI Comment** rather than merely restating the Q/R/P list.

The comment is analysis, **not autonomous authority to close user-owned choices**.

It may state proportionally:

```text
Known / implied
→ what Current Plan / checked evidence already establishes

Interpretation / options
→ realistic meanings/routes visible from current context

Technical/logical preference
→ what looks preferable only when current principles/evidence are sufficient

User-owned unknown
→ what cannot be inferred because it depends on unrecorded Need, preference, feeling, desired UX, business priority, risk tolerance or another user-owned concern

Minimum useful user question
→ ask only when the answer can materially change the decision
```

Hard boundary:

```text
missing user/product preference
≠ permission for AI to invent the preference
≠ permission to mark a Decision selected
```

`Recommendation` is separate and optional. Provide it when sufficient grounds exist. It may explicitly be `no recommendation until <evidence/user input>`.

`Decision` exists only after the choice is actually selected by the applicable authority/context.

## 9. Answer, Recommendation And Decision Are Different

```text
Answer / Evidence
= factual or interpretive resolution of a Question/evidence gap

Recommendation
= proposed route supported strongly enough to recommend, but not necessarily selected

Decision
= actually selected current choice
```

A Question can be answered while a separate Decision is still needed. A Recommendation can exist without user authorization to select it.

## 10. Generic Decision Trace

Material selected meaning lives in its real semantic owner. The shared concern model defines optional trace fields so decisions and concerns remain understandable across owners.

Recommended generic Decision trace when material:

```text
Decision
Status / selected state
Rationale
Integrated Into
Affected Owners
Addresses Concerns — one or many, when useful
Introduced / Exposed Concerns — one or many, when useful
Related Evidence / Idea / Variant — when useful
Reconsider When — when useful
```

Relations are many-to-many:

```text
one Decision → may address several Q/R/P
one Concern/Group → may require several Decisions
one Decision → may introduce/expose new Risks/Problems/Questions
```

Do not force trace fields for trivial decisions. Use them when they prevent rationale/impact from being lost, when explicitly requested, or when several owners/concerns are involved.

## 11. Active Projection Vs Retained Trace

Active Q/R/P shows **currently material** concern state, not the entire reasoning history.

```text
answered Question
→ leaves active Q/R/P

resolved Problem
→ leaves active Q/R/P

eliminated Risk
→ leaves active Q/R/P

accepted / mitigated residual Risk
→ remains active while material

accepted limitation / deferred unresolved Problem
→ remains active while material
```

But material history may remain in retained Concern/Decision trace:

```text
Question answered
→ selected Decision
→ Problem resolved
→ Risk accepted residual
```

The active projection can then show only the residual Risk while the retained trace explains how the current plan was reached.

## 12. Retention Rule

Do **not** keep every answered question or obsolete finding forever.

Always retain while materially active:

```text
open / needs-evidence Question
open / mitigated / accepted-residual Risk
open / deferred / accepted-limitation Problem
material group relation needed to understand one resolution surface
```

Usually retain resolved trace when one or more apply:

```text
selected decision/rationale is non-obvious or atypical
behavior/Domain/architecture changes materially
several owners are affected
residual Risk/Problem remains
revisit is plausible
future reviewer would otherwise lose why current meaning exists
user explicitly asks to preserve alternatives/decisions/trace
```

Usually collapse/remove trivial answered investigative questions, fully obsolete duplicates and resolved local implementation details whose rationale has no useful future meaning.

## 13. Origin / Provenance Vs Introduced / Exposed By

Keep these meanings separate when useful:

```text
Origin / Provenance
= where the concern was discovered: user statement, Idea, ReviewDiff, implementation evidence, Scenario review, research, etc.

Introduced / Exposed By
= a Decision/change/assumption whose selected meaning created or revealed the concern
```

Example:

```text
Risk R-18 — cache may return stale data
Origin: Architecture review
Introduced / Exposed By: D-7 introduce read cache
```

## 14. Area Concern Register

When a planning area has material concerns that need durable/cross-file addressability, maintain one logical **Area Concern Register**.

The register may be:

```text
Mini SDS
→ section inside application-plan.md

Domain-only planning
→ section inside domain.md

larger Application / Modular / Full SDS
→ area-root concerns.md / register.md when useful

Workspace/other area
→ section or separate file chosen by the current workflow/profile
```

There is no mandatory `concerns.md` filename and no one-file-per-concern rule. Physical placement is chosen by the current profile/workflow/command and can evolve as the plan grows.

Register fields when material:

```text
Concern / Group ID
Title
Owner / affected meaning
Stored At
Priority
Concern Category
Status
Decision refs when material
Residual state
```

The register normally stores routing/state, not the complete concern body.

## 15. One Detailed Storage Location

One logical Concern/Group has one primary detailed storage location. Other Ideas/owners/registers link/reference it instead of maintaining a second full body.

```text
Concern physically lives where current context says it belongs.

Related Idea / affected owner
→ reference Concern/Group ID + location

If that Idea/owner is the selected storage owner
→ full concern may live there.

Otherwise
→ no duplicate full body.
```

This replaces old full-mirror rules that required duplicate Q/R/P bodies merely for discoverability.

## 16. Idea Relation

An Idea may:

```text
create/expose a Concern
address a Concern
be one candidate answer to a Concern
share provenance with a Concern
```

`Related Idea` is optional relation/provenance. Idea methodology does not own generic Q/R/P lifecycle anymore.

## 17. Review Order

`Review Order` is derived, not stored as semantic priority and never becomes the planning root.

Derive proportionally from:

```text
Concern Priority
+ semantic dependency / blocking
+ affected-owner / blast radius
+ timing / Review Currency
```

A P0 concern may still wait for an upstream fact if it cannot be usefully resolved yet. Review Order does not select an unrelated concern over the current semantic planning unit.

## 18. Consistency Checks

Before treating a concern surface as current:

```text
- every active Concern has a real owner/affected Current Plan meaning;
- related Q/R/P sharing one resolution surface are grouped/referenced rather than presented as independent concerns;
- Priority and Concern Category are distinct fields;
- AI Comment does not invent user-owned Need/preferences/risk tolerance;
- Recommendation is not mislabeled as Decision;
- selected Decisions are integrated into the real semantic owner;
- residual Risks/Problems remain visible after Questions are answered;
- resolved trivial items leave the active projection;
- material rationale/Decision/residual trace is retained when needed;
- one logical Concern/Group has one detailed storage owner;
- Area Concern Register, when needed, points to current storage/status without copying full bodies;
- Ideas, templates and indexes reference the shared owner instead of creating another Q/R/P ontology.
```

## 19. Do Not

- Do not turn Q/R/P into a global work queue.
- Do not force a Concern/Decision record for every local thought.
- Do not create a second semantic owner for Scenario/UC/Domain/Slice/Architecture/Testing meaning.
- Do not invent user/product preferences to close a concern.
- Do not treat AI Recommendation as selected Decision.
- Do not drop residual Risk/Problem merely because a related Question was answered.
- Do not preserve every closed question as permanent history.
- Do not duplicate full concern bodies across Idea/aggregate/owner files for discoverability.
- Do not require one fixed physical Q/R/P topology across Mini/Modular/Full or focused planning commands.

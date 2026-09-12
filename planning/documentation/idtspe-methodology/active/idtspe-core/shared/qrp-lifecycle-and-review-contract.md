# Q/R/P Lifecycle And Review Contract

Status: active generic IDTSPE Core owner  
Purpose: define the canonical cross-cutting semantics, lifecycle, grouping, review metadata and retention rules for material Questions, Risks and Problems without creating a parallel Concern runtime or work queue.

## 1. Ownership Boundary

```text
Question / Risk / Problem State meaning
+ Q/R/P lifecycle / grouping / retention
= this contract

Proposal / Decision candidate-selection semantics
= proposal-and-decision-lifecycle-contract.md

Q/R/P presentation / Key Points / Review Priority projection
= AI Reviewability peer concern

physical persistence / register / placement
= Documentation / Representation + P-14

selected product/application/workspace meaning
= natural semantic owner, not Q/R/P
```

Legacy `Planning Concern` means one material Q/R/P item. Legacy `Concern Group` means a related-Q/R/P grouping. Those are compatibility names, not additional current State kinds.

Q/R/P is secondary material attached to actual current meaning. It is never the planning root.

## 2. Core Meanings

```text
Question
= material answer/evidence/choice gap that can change current planning meaning

Risk
= material adverse possibility that remains relevant under the current plan,
  including accepted/mitigated residual risk

Problem
= material current defect, contradiction, missing guarantee,
  ownership conflict or other adverse state affecting current meaning
```

Do not create Q/R/P for every uncertainty, imaginable future, implementation inconvenience or review comment.

## 3. Owner-Attachment / Admission Gate

A material Q/R/P item must be attached to concrete current meaning.

```text
candidate observation
→ concrete semantic owner / affected meaning?
→ concrete current / target / Proposal / Result / Decision relation?
→ materially unresolved/adverse after a cheap check against current evidence/owners?
```

If not, integrate the obvious consequence or keep the material as discussion, Source, Evidence, Proposal or observation as appropriate.

Stable Q/R/P IDs are useful only when independent addressability, cross-reference, lifecycle, review or revalidation value exists.

## 4. Proportional Item Shape

Useful fields when material:

```text
ID
Type: Question | Risk | Problem
Title / Meaning
Owner / affected semantic meaning
Affected current/target/Proposal/Result relation
Origin / Provenance
Introduced / Exposed By — when useful
Priority
Review Category
Status
Related Q/R/P Group — when useful
Answer / Evidence — when applicable
Proposal / Recommendation / Decision refs — when applicable
Residual state / treatment
Reconsider When
Representation / Stored At — only when physical addressability matters
```

No field is mandatory merely because it exists in this contract.

## 5. Impact Priority

Q/R/P may carry the same impact scale used by AI Reviewability:

```text
P0 / Critical
→ wrong handling can change broad/global direction, invalidate several downstream owners,
  cause expensive widespread rework or severe correctness harm

P1 / High
→ can materially change one major owner/Target or several connected parts

P2 / Normal
→ material but mainly local

P3 / Low
→ local, cheaply reversible, low blast radius
```

Priority is impact, not confidence, category, status or current review order.

Consider only materially evidenced dimensions such as blocking/dependency effect, correctness/user impact, risk severity/likelihood, near decision horizon, affected-owner/blast radius, cost of deferral and reversibility.

## 6. Review Category

A category is an optional review/filter projection, not owner routing.

Useful extensible examples:

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

Default to one primary category when categorization helps. Related categories are optional. Category never moves semantic ownership.

## 7. Related Q/R/P Groups

Group Q/R/P only when several items materially share one **resolution surface**.

```text
Question Q-4
Risk R-8
Problem P-3

→ one answer / Evidence set / Proposal/Decision surface materially resolves or changes all three
→ QRP-G-12
```

Similar topic alone is insufficient when the resolutions are independent.

A Q/R/P Group is a navigation/review projection, not a Target, semantic owner or mandatory State Unit. Every member retains its own Type, Priority, Category, Status, owner/affected meaning and residual state.

Useful group metadata when material:

```text
Group ID / title
Affected owner(s)
Group Priority
Primary / related categories
Status
Members
Shared resolution surface / why grouped
Proposal/Recommendation/Decision refs
Residual members/state
Reconsider When
```

## 8. Status / Lifecycle

Use status proportionally:

```text
Question:
  open | needs evidence | answered | superseded

Risk:
  open | mitigated | accepted residual | eliminated | superseded

Problem:
  open | deferred | accepted limitation | resolved | superseded

Q/R/P Group:
  open | partially resolved | resolved | accepted residual | deferred | superseded
```

`silence` is never closure.

A Q/R/P item closes only through explicit authority, unambiguous integrated Evidence/current-owner meaning, removal of its premise by an accepted change, or checked evidence that it is obsolete/invalid.

## 9. Answer / Evidence / Proposal / Recommendation / Decision Boundary

Q/R/P does not define a second candidate/Decision lifecycle.

```text
Question answered by Source/Evidence
→ may close without a Decision when no material choice remains

candidate resolution route
→ Proposal

AI/other preference for a Proposal
→ Recommendation, not selection

selected material route
→ Decision / Target Result / natural-owner meaning
```

Canonical Proposal/Decision semantics: [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md).

One Decision may address several Q/R/P. One Q/R/P group may need several Decisions. A Decision may introduce/expose new Q/R/P.

## 10. Active Projection Vs Retained Trace

Active Q/R/P shows current material unresolved/residual state, not the entire reasoning history.

```text
answered Question
→ leaves active Q/R/P

resolved Problem / eliminated Risk
→ leaves active Q/R/P

accepted / mitigated residual Risk
→ remains active while material

accepted limitation / deferred unresolved Problem
→ remains active while material
```

Retain resolved trace only when it has independent future value: non-obvious rationale, material behavior/Domain/architecture consequence, several affected owners, residual Risk/Problem, plausible revisit/revalidation, or explicit USER retention request.

Collapse trivial answered investigative Questions, obsolete duplicates and local implementation findings whose rationale has no useful future meaning.

## 11. Provenance Vs Introduced / Exposed By

Keep these relations distinct when useful:

```text
Origin / Provenance
= where the Q/R/P was discovered
  (USER statement, Proposal review, ReviewDiff, Evidence, implementation, research, etc.)

Introduced / Exposed By
= accepted Decision/change/assumption whose meaning created or revealed it
```

Example:

```text
Risk R-18 — cache may return stale data
Origin: architecture review
Introduced / Exposed By: Decision D-7 introduce read cache
```

## 12. Review Projection Boundary

For material AI-produced Q/R/P surfaces, the AI should provide useful analysis rather than merely repeat labels. The presentation/review contract is owned by AI Reviewability; this Q/R/P contract supplies the semantic inputs.

A useful review may distinguish:

```text
what current owner/Evidence already establishes
realistic interpretations/options
technical/logical recommendation when justified
USER-owned unknown that cannot be inferred
minimum useful USER question only when it can change the Decision
```

Missing USER preference/risk tolerance is never permission to invent it or mark a Decision selected.

Review order, when useful, is a derived presentation/navigation projection from impact Priority + dependency/blocking + blast radius + timing/currentness. It is not another semantic priority and never becomes the planning queue.

Canonical presentation owner: [`../../ai-reviewability/README.md`](../../ai-reviewability/README.md).

## 13. Representation / Register Boundary

Semantic Q/R/P identity does not imply one file or a global register.

```text
one logical Q/R/P item/group
→ one primary detailed representation when durable physical addressability is useful
→ other owners/views reference it rather than copy a competing full body
```

When distributed durable Q/R/P is materially expensive to navigate, an area-level register/index may be useful. That register stores routing/status/reference information by default, not a duplicate semantic body, and remains a projection over natural owners.

Physical choices such as inline section vs area-root register vs no separate materialization are resolved by Documentation / Representation and P-14. Canonical placement owner: [`artifact-placement-and-idtspe-response-contract.md`](artifact-placement-and-idtspe-response-contract.md).

## 14. Revalidation

Revalidate affected Q/R/P when:

- owner/Target boundaries change;
- new Evidence changes materiality or status;
- an accepted Decision is changed/reopened;
- an assumption/reconsider trigger fires;
- a related Proposal/Result changes the resolution surface.

Preserve unaffected Q/R/P and accepted meaning. Do not restart a global concern sweep.

## 15. Key Invariants

```text
Q/R/P ≠ planning root
legacy Planning Concern = Q/R/P compatibility vocabulary, not another State kind
legacy Concern Group = Q/R/P group compatibility vocabulary
Priority ≠ confidence ≠ Category ≠ Review Order
Recommendation ≠ Decision
answered Question ≠ automatically a Decision
residual Risk/Problem may remain after related Question closes
one logical Q/R/P body ≠ copied full body in every related owner
Q/R/P storage topology ≠ semantic ownership
```

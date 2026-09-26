# Q/R/P Lifecycle And Review Contract

Status: active generic IDTSPE Core owner
Purpose: define the canonical cross-cutting semantics, lifecycle, grouping, review metadata and retention rules for material Questions, Risks and Problems without creating a parallel Concern runtime or work queue.

<a id="resolution-qrp-lifecycle"></a>
## 1. Ownership Boundary

Responsibility ID: `RESOLUTION.QRP-LIFECYCLE`

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

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> Owner: [Proposal / Decision Lifecycle](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle)

Q/R/P may drive, constrain or survive Proposal/Decision work, but this contract does not own candidate selection or Decision semantics.

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

A material Q/R/P item must be attached/related to concrete semantic meaning at the smallest useful subject.

```text
candidate observation
→ concrete affected meaning?
→ one Unit Resolution Slot / Unit / result meaning / Proposal / Decision / Target / cross-Unit subject?
→ materially unresolved/adverse after a cheap check?
```

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

When a material Q/R/P concerns a Target Work Collection/item/Slot, first choose the smallest natural subject under this lifecycle and then use the canonical Target Work Subject Reference. Other Unit-local Q/R/P belongs in the parent Unit Resolution. Cross-Unit, Target-level or cross-owner Q/R/P remains valid when that is its natural resolution surface. Do not broaden one item-local subject or force every Q/R/P into exactly one Slot/Unit merely to satisfy structure.

If the observation has no material unresolved/adverse state, integrate the obvious consequence or keep it as discussion/Source/Evidence/Proposal as appropriate.

Stable Q/R/P identity/ID is proportional: create or retain it only when independent addressability, cross-reference, lifecycle, review or revalidation value exists. Unit-local attachment does not by itself require a stable Q/R/P ID.

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
→ Decision semantics
→ affected Current Result Content / Target Result / natural-owner meaning
```

Canonical Proposal/Decision semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md).

One Decision may address several Q/R/P. One Q/R/P group may need several Decisions. A Decision may introduce/expose new Q/R/P.

### Proposal / Decision QRPE Navigation

When Q/R/P is materially related to a Proposal or Decision, [`LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT`](../../lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md) may select it into a compact `QRPE` review view together with relevant Evidence. This does not create a new Q/R/P lifecycle or `QRPE` State kind; this contract remains Q/R/P authority.

After selection, each related Q/R/P is dispositioned individually rather than copied mechanically from Proposal to Decision context.

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

Canonical presentation owner: [`../../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md`](../../../ai-reviewability/AI-OUTPUT-REVIEWABILITY.md).

## 13. Representation / Register Boundary

Semantic Q/R/P identity does not imply one file or a global register.

```text
one logical Q/R/P item/group
→ one primary detailed representation when durable physical addressability is useful
→ other owners/views reference it rather than copy a competing full body
```

When distributed durable Q/R/P is materially expensive to navigate, an area-level register/index may be useful. That register stores routing/status/reference information by default, not a duplicate semantic body, and remains a projection over natural owners.

Physical choices such as inline section vs area-root register vs no separate materialization are resolved by Documentation / Representation and P-14. Canonical placement owner: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

### Resolution Carry-Forward / Planning Resolution State

Material open/deferred/residual Q/R/P that must survive continuation/handoff are governed by the [`Resolution Carry-Forward` contract](../RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward). When one bounded coordination Target result is useful, [`TM-PLANNING-RESOLUTION-STATE`](../../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state) represents those qualifying items with their related Proposals or accepted Decisions, status and material Evidence. Detailed Q/R/P bodies and lifecycle remain here and at their natural subjects; the Target Module owns only its concrete result schema/presentation.

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

## Recursive candidate linkage

Each material Q/R/P may have `0..N` addressing Proposals; each Proposal may carry `0..N` Q/R/P that can themselves elicit Proposals. This recursive relation retains subject/driver refs and does not require a new tree ontology. The [Proposal/Decision Lifecycle](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-recursive-proposal-qrp) owns selection of compatible proposals; this contract continues to own Question/Risk/Problem meaning and review.

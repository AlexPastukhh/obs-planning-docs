# SDS Profile — Software / Application Planning on IDTSPE

Status: active synchronized profile

## Purpose

SDS is the IDTSPE profile for software/Application planning from real-world need/context through behavioral/implementation semantics, future-state planning, exact realization and Evidence.

SDS extends always-active IDTSPE with profile-specific **Target Modules, Lenses, reusable knowledge, terminology, representation guidance and semantic-owner relationships**. It does not replace generic Documentation Use Cases or create a second runtime workflow shell.

## Profile Bootstrap

This `README.md` is the canonical SDS profile bootstrap entry. SDS bootstrap is **incremental**: it assumes the primary bootstrap from [`planning/README.md`](../../../../../README.md) already established Session, Documentation and IDTSPE Core. If that prerequisite is not reliable, perform the primary bootstrap first, then return here.

For the SDS portion, read in order:

1. this `README.md`;
2. [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md);
3. [`target-modules/README.md`](target-modules/README.md);
4. [`lenses/README.md`](lenses/README.md);
5. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md);
6. [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md);
7. [`shared/reusable-guidance-model.md`](shared/reusable-guidance-model.md);
8. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md).

Specific Target Modules, Lenses, Programming Principle details, examples and supporting knowledge remain lazy/conditional reads after registry selection and local applicability. Profile bootstrap does not create an SDS-specific runtime Use Case or select a Target merely by being read.

## Authority Boundary

```text
Documentation methodology
→ Use Case / Process / Registry / shared documentation semantics

IDTSPE Core
→ always-active proportional Work Context
→ Core State/Target/Proposal/Q-R-P/Decision/Evidence/Finding/Integration/Representation mechanics

SDS
→ specialized software/Application Target Modules, Lenses, knowledge,
  semantic-owner topology, future-state hosting and profile-specific readiness/representation guidance
```

The current SDS baseline defines **no separate runtime methodology-use Use Cases**. Generic Documentation + IDTSPE Use Cases discover and compose SDS components through the profile registry directory.

## Temporal Authority Boundary

SDS separates **realized current truth** from **unrealized future planning**.

```text
canonical natural owners
= realized / implemented current system truth

Evolution Step
= canonical semantic owner of materially planned but unrealized SDS target state

Exact Realization + required proof/revalidation
→ Target Owner Materialization
→ current natural owners are created/replaced/retired to match what is now realized
```

Selection does not collapse this boundary:

```text
selected Proposal / Decision
≠ implementation
≠ current-owner truth
```

When planning an unrealized change, the ordinary Application/Feature/Scenario/Screen/Domain/Slice/Shared Target Modules may be used in a **supporting role inside `TM-EVOLUTION-STEP`** to shape complete post-Step Target Owner Bodies. Those bodies remain Step-owned planning meaning until materialization.

For greenfield work, `absence` is a valid current state. The first planned owner is therefore also expressed as a Target Body in an Evolution Step and becomes a current owner only after realization/proof.

Current-owner review/revalidation remains valid: the same Target Module contracts can evaluate already-realized owner truth directly.

## Profile Registry Entry

Start SDS-specific dependency discovery at [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md). That directory routes an already-selected IDTSPE Use-Case Process to the relevant Target Module, Lens, programming-principle, requirement, semantic-composition or representation owner.

Do not browse all profile components ceremonially.

## Compact Owner Topology

```text
current realized application/workspace state
→ canonical current natural owners + implementation + Evidence

material desired state differs / new owner is planned
→ Evolution Step
   ├─ Proposal / Planning Branch / Decision / Q-R-P / Evidence as needed
   ├─ Target Application / Feature / Scenario / Screen bodies as applicable
   ├─ Target Domain / Slice / Shared bodies as applicable
   ├─ future owner-local BR/IR/PFR inside the corresponding Target Body
   └─ transition / proof obligations + Target Owner Materialization Set

selected Step meaning sufficiently resolved
→ Core Exact Realization
→ implementation-native proof / Evidence
→ targeted revalidation
→ Target Owner Materialization
→ updated canonical current owners

optional Practical Test
→ real-subject/environment Evidence after the relevant implementation exists
```

This is orientation only. It is not a mandatory phase sequence. Cross-owner readiness/direction is canonically owned by [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md); each concrete Target Module/Lens owns its own production/evaluation semantics.

## Key Profile Invariants

- Canonical natural owners describe realized/current system truth; selected-but-unrealized future meaning stays in an Evolution Step.
- Evolution Step Target Owner Bodies reuse natural owner contracts without creating `FutureFeature`, `FutureDomain`, `FutureSlice` or another parallel owner ontology.
- Target Owner Materialization is a semantic authority transition after realization/proof; it is distinct from physical representation promotion/demotion or file placement under P-14/TF-10.
- Feature, Scenario and Screen are peer semantic owner families; none silently edits another.
- Domain and Slice discovery Targets/artifacts are transient by default; selected Discovery Working Plan Result Content may be retained in a Step `Evolution Impact` when continuation/realization/review/revalidation still needs it, without becoming durable Domain/Slice authority.
- Durable Requirements stay with exactly one natural owner **in the state being represented**: future Requirements live in the corresponding Step Target Body until materialization.
- Shared capability formation is governed by its Target Module; future consumers do not count as already-realized current consumers.
- There is no baseline Test Strategy/Test Design Target family; proof follows natural owners/Step obligations and Core proof/evidence evaluation.
- Programming Principles are reusable knowledge, not a mega-Lens and not live-inherited owner Requirements.
- Planning depth is guidance, not a one-active-level state machine or approval ladder.
- Exploratory discovery resolution/rejected alternatives are non-persistent by default. Selected planning Result Content persists only in its natural destination when it has continuing value; physical artifact persistence remains a separate proportional representation decision.
- Proposal selection, uncertainty/confidence and realization/materialization are separate axes.
- Every Evolution Step is behaviorally grounded by one or more Feature target states: selected NEW/CHANGED Features use complete `TM-FEATURE` Target Feature Bodies; unchanged Feature behavior is referenced rather than copied.
- Scenario/Screen/Domain/Slice/Shared future consequences use Step-owned `Evolution Impact` Units; current realized owners may expose only reverse Step navigation/revalidation through their own optional Evolution Impact Unit.

## Canonical SDS Owners

- [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md) — cross-owner semantic composition, temporal hosting/readiness, upstream/downstream direction and planning-depth guidance.
- [`target-modules/TM-EVOLUTION-STEP.md`](target-modules/TM-EVOLUTION-STEP.md) — canonical SDS owner for materially planned unrealized target state and Target Owner Materialization semantics.
- [`target-modules/TM-EVOLUTION-STEPS-MAP.md`](target-modules/TM-EVOLUTION-STEPS-MAP.md) — navigation/coordination across concrete Step candidates/selections/relations/readiness.
- [`target-modules/README.md`](target-modules/README.md) — active SDS Target Module registry; concrete modules own their own production/formation rules.
- [`lenses/README.md`](lenses/README.md) — SDS Lens registry; concrete Lenses own specialized evaluation methods.
- [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md) — natural Requirement ownership, BR/IR/PFR families and current-vs-future hosting.
- [`shared/reusable-guidance-model.md`](shared/reusable-guidance-model.md) — `RG/RR/RRC` reusable-guidance semantics and no-live-inheritance rule.
- [`shared/programming-principles/README.md`](shared/programming-principles/README.md) — compact trigger registry for the reusable programming-principle corpus.
- [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) — SDS-specific semantic-owner → representation projection used with Core representation policy.

## Compatibility / Retired Families

Retired baseline Target families such as Requirement, Slice Strategy, Cross-Cutting Concern, Test Design and Test Strategy remain retired. Compatibility surfaces must route to current owners/contracts and must not revive their former semantic authority.

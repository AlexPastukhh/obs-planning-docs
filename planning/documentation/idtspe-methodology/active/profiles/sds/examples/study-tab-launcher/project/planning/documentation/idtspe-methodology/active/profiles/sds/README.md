<a id="sds-profile-bootstrap"></a>
# SDS Profile — Software / Application Planning on IDTSPE

Responsibility ID: `SDS.PROFILE-BOOTSTRAP`

Status: active synchronized profile

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Installed Profile Discovery](../PROFILE-REGISTRY.md#idtspe-profile-discovery) — `IDTSPE.PROFILE-DISCOVERY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [SDS Semantic Composition / Readiness](profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness) — `SDS.SEMANTIC-COMPOSITION-READINESS`
> - `CONTEXTUALIZES` [Requirement Ownership / Natural Owner](profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md#sds-requirement-ownership) — `SDS.REQUIREMENT-OWNERSHIP`
> - `CONTEXTUALIZES` [SDS Target Module Discovery](registries/TARGET-MODULE-REGISTRY.md#sds-target-module-discovery) — `SDS.TARGET-MODULE-DISCOVERY`
> - `CONTEXTUALIZES` [SDS Lens Discovery](registries/LENS-REGISTRY.md#sds-lens-discovery) — `SDS.LENS-DISCOVERY`
> - `CONTEXTUALIZES` [SDS Artifact Placement](representation/ARTIFACT-PLACEMENT-MAP.md#sds-artifact-placement) — `SDS.ARTIFACT-PLACEMENT`

## Purpose

SDS is the IDTSPE profile for software/Application planning from real-world need/context through behavioral/implementation semantics, future-state planning, exact realization and Evidence.

SDS extends always-active IDTSPE with profile-specific **Target Modules, Lenses, reusable knowledge, terminology, representation guidance and semantic-owner relationships**. It does not replace generic Documentation Use Cases or create a second runtime workflow shell.

## Profile Bootstrap

This `README.md` is the canonical SDS profile bootstrap entry. SDS bootstrap is **incremental**: it assumes the primary bootstrap from [`planning/README.md`](../../../../../../../source-context/planning/README.md) already established Session, Documentation and IDTSPE Core. If that prerequisite is not reliable, perform the primary bootstrap first, then return here.

For the SDS portion, read in order:

1. this `README.md`;
2. [`RESPONSIBILITY-MAP.md`](RESPONSIBILITY-MAP.md) — profile-local responsibility routing;
3. [`registries/METHODOLOGY-REGISTRY-DIRECTORY.md`](registries/METHODOLOGY-REGISTRY-DIRECTORY.md);
4. [`registries/TARGET-MODULE-REGISTRY.md`](registries/TARGET-MODULE-REGISTRY.md);
5. [`registries/LENS-REGISTRY.md`](registries/LENS-REGISTRY.md);
6. [`profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md`](profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md);
7. [`profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md`](profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md);
8. [`profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md`](profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md);
9. [`representation/ARTIFACT-PLACEMENT-MAP.md`](representation/ARTIFACT-PLACEMENT-MAP.md).

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

SDS separates **realized downstream owner truth** from **unrealized downstream target planning** while keeping Application Definition upstream of that boundary.

```text
Application Definition
= selected / possible need, value, contribution and boundary intent
= may legitimately lead current realization
= refined directly when that intent changes

Feature / Scenario / Screen / Domain / Slice / Shared
= realized / implemented current owner truth when materialized

Evolution Step
= canonical semantic owner of materially planned but unrealized downstream target state

Exact Realization + required proof/revalidation
→ Target Owner Materialization
→ downstream current natural owners are created/replaced/retired to match what is now realized
```

Selection does not collapse this boundary:

```text
selected Proposal / Decision
≠ implementation
≠ current-owner truth
```

When planning an unrealized downstream change, Feature/Scenario/Screen/Domain/Slice/Shared Target Modules may be used in a **supporting role inside `TM-EVOLUTION-STEP`** to shape complete post-Step Target Owner Bodies. `TM-APPLICATION-DEFINITION` is the exception: it is refined directly and may be referenced by the Step through `Driven By`, but it never becomes a Step-owned Target Application Body.

For greenfield downstream owners, `absence` is a valid current state. The first planned Feature/Scenario/Screen/Domain/Slice/Shared owner is therefore expressed as a Target Body in an Evolution Step and becomes current only after realization/proof. Application Definition may already exist upstream before any such owner is realized.

Current-owner review/revalidation remains valid: the same Target Module contracts can evaluate already-realized owner truth directly.

## Profile Registry Entry

Start SDS-specific dependency discovery at [`registries/METHODOLOGY-REGISTRY-DIRECTORY.md`](registries/METHODOLOGY-REGISTRY-DIRECTORY.md). That directory routes an already-selected IDTSPE Use-Case Process to the relevant Target Module, Lens, programming-principle, requirement, semantic-composition or representation owner.

Do not browse all profile components ceremonially.

## Compact Owner Topology

This README owns the SDS bootstrap/read-set boundary, not the profile responsibility map or a second semantic contract. Use [`RESPONSIBILITY-MAP.md`](RESPONSIBILITY-MAP.md) for responsibility routing. For cross-owner temporal/readiness composition use the [SDS Semantic Composition / Readiness Guide](profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md); for complete Step semantics use [`TM-EVOLUTION-STEP`](target-modules/TM-EVOLUTION-STEP.md); for current-owner reverse Evolution Impact use the shared [Current-Owner Evolution Impact Projection Contract](profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).

```text
Application Definition
→ upstream intent/value/contribution/boundary owner

realized downstream Feature/Scenario/Screen/Domain/Slice/Shared
→ current natural owners

materially planned unrealized downstream change
→ Evolution Step
→ natural-owner Target Bodies as needed
→ Exact + Evidence + materialization before current-owner authority changes
```

This is routing orientation only, not a mandatory phase sequence or a duplicate definition of Step Units/readiness.

## Key Profile Invariants

- Application Definition is upstream intent/value authority and may lead realization; Feature/Scenario/Screen/Domain/Slice/Shared current owners describe realized/current downstream truth, while selected-but-unrealized downstream meaning stays in an Evolution Step.
- Evolution Step Target Owner Bodies reuse natural owner contracts without creating `FutureFeature`, `FutureDomain`, `FutureSlice` or another parallel owner ontology.
- Target Owner Materialization is a semantic authority transition after realization/proof; it is distinct from physical representation promotion/demotion or file placement under P-14/PERSISTENCE_ADDRESSABILITY.
- Feature, Scenario and Screen are peer semantic owner families; none silently edits another.
- Domain and Slice discovery Targets/artifacts are transient by default; selected Discovery Working Plan Result Content may be retained in a Step `Evolution Impact` when continuation/realization/review/revalidation still needs it, without becoming durable Domain/Slice authority.
- Durable Requirements stay with exactly one natural owner **in the state being represented**: future `BR/SR/IR/PFR` live in the corresponding Step Target Body until materialization; reusable Type/QRPE representation does not change ownership.
- Shared capability formation is governed by its Target Module; future consumers do not count as already-realized current consumers.
- There is no baseline Test Strategy/Test Design Target family; proof follows natural owners/Step obligations and Core proof/evidence evaluation.
- Programming Principles are reusable knowledge, not a mega-Lens and not live-inherited owner Requirements.
- Planning depth is guidance, not a one-active-level state machine or approval ladder.
- Exploratory discovery resolution/rejected alternatives are non-persistent by default. Selected planning Result Content persists only in its natural destination when it has continuing value; physical artifact persistence remains a separate proportional representation decision.
- Proposal selection, uncertainty/confidence and realization/materialization are separate axes.
- Behavioral/Mixed Evolution Steps are grounded by affected Feature/Scenario behavior as material. Implementation-focused Steps may exist without inventing new Feature behavior when concrete transition-wide implementation pressure exists and `Behavior Change: None intended`; exact mechanism still belongs to Exact.
- Step-side future Impact/Target Body semantics stay with `TM-EVOLUTION-STEP`; current-owner reverse Evolution Impact follows the shared `current-owner-evolution-impact-projection-contract.md` rather than a README-local rule.

## Canonical SDS Owners

- [`profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md`](profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md) — cross-owner semantic composition, temporal hosting/readiness, upstream/downstream direction and planning-depth guidance.
- [`target-modules/TM-EVOLUTION-STEP.md`](target-modules/TM-EVOLUTION-STEP.md) — canonical SDS owner for materially planned unrealized target state and Target Owner Materialization semantics.
- [`target-modules/TM-EVOLUTION-STEPS-MAP.md`](target-modules/TM-EVOLUTION-STEPS-MAP.md) — navigation/coordination across concrete Step candidates/selections/relations/readiness.
- [`registries/TARGET-MODULE-REGISTRY.md`](registries/TARGET-MODULE-REGISTRY.md) — active SDS Target Module registry; concrete modules own their own production/formation rules.
- [`registries/LENS-REGISTRY.md`](registries/LENS-REGISTRY.md) — SDS Lens registry; concrete Lenses own specialized evaluation methods.
- [`profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md`](profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md) — reusable SDS family/natural-owner authority vs local semantic meaning/provenance.
- [`profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md`](profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md) — natural Requirement ownership, `BR/SR/IR/PFR` families and current-vs-future hosting.
- [`profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md`](profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md) — reusable extensible Requirement Type classification guidance plus QRPE/common table semantics.
- [`profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md`](profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md) — `RG/RR/RRC` reusable-guidance semantics and no-live-inheritance rule.
- [`knowledge-bases/programming-principles/README.md`](knowledge-bases/programming-principles/README.md) — compact trigger registry for the reusable programming-principle corpus.
- [`representation/ARTIFACT-PLACEMENT-MAP.md`](representation/ARTIFACT-PLACEMENT-MAP.md) — SDS-specific semantic-owner → representation projection used with Core representation policy.

## Compatibility / Retired Families

Retired baseline Target families such as Requirement, Slice Strategy, Cross-Cutting Concern, Test Design and Test Strategy remain retired. Compatibility surfaces must route to current owners/contracts and must not revive their former semantic authority.

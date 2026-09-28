<a id="sds-semantic-composition-readiness"></a>
# SDS Semantic Composition / Readiness Guide

Responsibility ID: `SDS.SEMANTIC-COMPOSITION-READINESS`

Status: active profile semantic-composition guide
Compatibility path: `directed-methodology-workflow-and-next-step-resolution.md`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Contextual Methodology Application](../../../idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md#idtspe-contextual-application) — `IDTSPE.CONTEXTUAL-APPLICATION`
> - `CONTEXTUALIZES` [Step planning completeness / start readiness](../target-modules/TM-EVOLUTION-STEP.md#ru-evo-06--planning-completeness--realization-start-readiness) — `TM-EVOLUTION-STEP / RU-EVO-06`; the readiness statements below explain cross-owner consequences of this Step-owned contract.
> - `CONTEXTUALIZES` [Target Owner Materialization](../target-modules/TM-EVOLUTION-STEP.md#ru-evo-04--target-owner-materialization-set) — `TM-EVOLUTION-STEP / RU-EVO-04`; downstream current/future routing does not define another materialization gate.

## Purpose

Preserve SDS cross-component semantic/readiness relationships **without owning runtime Use-Case selection, work-step orchestration or a mandatory planning-level sequence**.

Use this file only after an applicable IDTSPE Use-Case Process (normally `UC-IDTSPE-COMPOSE-CURRENT-WORK`, `INTEGRATE` or `REVALIDATE`) determines that cross-owner SDS semantic direction/readiness is material.

```text
Use Case owns: why/when methodology is consulted and composed
SDS registries own: which concrete profile component is plausibly relevant
Target Module / Lens owns: specialized production/evaluation
TM-EVOLUTION-STEP owns: unrealized SDS target-state planning when state is expected to change
this guide owns: cross-component temporal/semantic relationships and readiness guidance
```

<a id="sds-semantic-traversal-order"></a>
## SDS semantic traversal / presentation order

Responsibility ID: `SDS.SEMANTIC-TRAVERSAL-ORDER`

When orienting a bounded SDS state or displaying either Planning Resolution State Collection, group applicable subjects in this order: Application Definition → Evolution Map / Step → Scenario / Feature / Screen → Domain → Slice → Shared → Exact. This is semantic traversal/presentation orientation, not a phase workflow, approval ladder, creation order or requirement to populate every family. The PRS `CURRENT-FOCUS / PRIORITY PROJECTION` separately calls attention to P1/P2/P3 items without changing this Collection grouping.

## 1. Temporal Authority First

Before deciding which SDS component should produce meaning, first ask whether the subject is upstream Application intent or a downstream owner state. Then classify downstream owner meaning as current-realized vs future-unrealized target state.

```text
accepted current owner contract for a materialized state
→ work directly with the current natural owner when review/revalidation is needed
→ actual implementation/Evidence may confirm or contradict that contract without silently rewriting it

Application Concept / own-Application justification / Key Behavior Focus / application-level feasibility or early implementation planning changes
→ refine TM-APPLICATION-DEFINITION directly
→ selected Application meaning may drive downstream Scenario/Evolution planning

material downstream desired state is not yet realized
→ host that future downstream state in TM-EVOLUTION-STEP
→ apply downstream natural-owner Target Modules as supporting production methods inside the Step
```

A selected Proposal/Decision about future state does not by itself update the canonical current owner.

For concrete Step predecessor/readiness semantics, including greenfield `Entering From`, use `TM-EVOLUTION-STEP`; this guide only routes cross-owner work into that Step owner. Application Definition may already state the selected need before downstream owners exist.

## 2. Preferred Semantic Direction

For unrealized software change, the normal orientation is:

```text
Application Definition
→ selected upstream Application proposition / Key Behavior Focus / early realization pressure when material

Need / real-life evidence
→ may also form Scenario first when that is the clearer natural subject
→ Scenario result/path/SR Evidence may revalidate Application Definition

current realized downstream owners / implementation / Evidence
→ Evolution Step
→ direct `Entering From` semantic predecessor relation(s), or None
→ proportionate downstream future-state production:
     Step-owned Scenario Target Bodies with Application Contributions and Feature Resolution OPEN when behavior boundaries are still being discovered
     Feature Target Bodies once coherent Feature ownership is resolved; complete for NEW/CHANGED Features before Step planning can be COMPLETE
       unchanged → current Feature reference
     Scenario / Screen / Domain / Slice / Shared bounded Evolution Impacts for distant unresolved owner meaning as material
     Domain / Slice discovery when useful
     selected Discovery Result Content retained in Impact when still useful
     complete Target Scenario / Screen / Domain / Slice / Shared Bodies for every CREATE/REPLACE owner in the next-for-realization Step; distant bodies when resolved
     future owner-local Requirements inside corresponding Target Bodies
     Step-wide Implementation Concerns referencing owner-local concern/feasibility/IR surfaces
     Target Owner Materialization Set + transition/proof obligations
     Planning Completeness + its completed/missing inventory explanation + Realization Start Readiness according to `TM-EVOLUTION-STEP / RU-EVO-06` (all Step Units and affected-owner Target Bodies for COMPLETE; reciprocal later-Step meaning checked for READY)
→ SDS Code Realization for code / broad Core Exact Realization for non-code literal work when selected meaning is sufficient and realization-start conditions are met
→ implementation / build / test / Evidence as authorized
→ targeted revalidation
→ Target Owner Materialization
→ updated current natural owners
```

Prototype may precede commitment when empirical inquiry is useful. Architecture Planning may contribute Decisions/Evidence/alternatives. Practical Test may follow executable realization when real-subject/environment observation is necessary.

This direction is orientation, not a phase sequence. Several planning depths/modules may participate together; work may reopen upstream meaning when Evidence requires it.

## Contextual Evolution-Step planning and readiness

The accepted Evolution Steps Map routes concrete Steps and material Application-driver coverage without copying Step bodies. A concrete next Step may be named and selected while its target plan is `INCOMPLETE` and its realization start is `BLOCKED`. For that Step, review materially relevant current state, reuse known Questions, derive missing material Questions from current maturity, resolve or route USER-owned choices through existing gates, integrate consequences into Step/Targets/PRS/Map, then rederive after any material change. Repeat until a stable planning conclusion or existing review/blocker. Planning Completeness and Start Readiness are separate Step-owned conclusions; neither follows merely from an empty PRS Question list.

## 3. Application Definition

Application Definition is the conditional upstream semantic form when the own-Application proposition/focus/feasibility can materially change downstream meaning.

```text
review/refine Application Concept
+ Existing-Solution / Reference Position
+ Own-Application Justification / Key Behavior Focus
+ Realization Feasibility / Early Implementation Planning
→ work directly with TM-APPLICATION-DEFINITION

selected Application meaning requires unrealized downstream change
→ Scenario may develop the real-life SPS/SR obligations
→ Evolution Step references the material Application/Scenario drivers through `Driven By`
→ Step owns only downstream Target Owner Bodies

Scenario formed first from Need / real-life evidence
→ may provide Evidence back to refine Application Definition
```

There is no mandatory Application-Definition-before-Scenario creation order. The exact activation/skip gate remains owned by [`../target-modules/TM-APPLICATION-DEFINITION.md`](../target-modules/TM-APPLICATION-DEFINITION.md).

## 4. Feature ↔ Scenario ↔ Screen Peer Formation

These are peer semantic owner families:

```text
Scenario = normative real-life SPS path + Application Contributions + Scenario-owned SR-*; Feature may remain OPEN
Feature  = canonical coherent application behavior + semantic Feature Data + BR-*; records which Scenario SPS/SR meaning it realizes
Screen   = application-owned spatial/navigation composition; gathers per-Scenario SPS participation + Screen-local SCR-* / SCR-G-* without copying SR authority
```

A Scenario may be formed with zero resolved Features and may itself supply downstream realization obligations through `SPS-*`, step-attached `SR-*` and Scenario-wide `SR-*`. One Feature may realize several SPS steps; one SPS may be jointly realized by several Features. Actor/external-only SPS normally remain preceding/trigger context rather than Feature-realized behavior. When Feature identity becomes sufficiently resolved, move canonical detailed behavior into a complete Target Feature Body and retain Scenario path/contribution/Feature-result relations without copying FBS/BR detail. When a Behavioral/Mixed Step represents changed resolved Feature behavior, every NEW/CHANGED Feature in a fully planned Step uses one complete Target Feature Body. The **particular next Step for realization** cannot start until all `RU-EVO-01..06` obligations are resolved/disposed and every owner whose post-Step authority is created/replaced has a complete Target Body, especially Domain and Slice as well as Feature, Scenario, Screen and Shared. Their ordinary owner-specific Target Modules shape those complete bodies; the Step indexes them and may link separate files rather than embed them. A distant Step may retain bounded Impacts while truthfully reporting `INCOMPLETE` with its resolved/missing planning explained and each material current-owner impact reverse-linked. Scenario/Screen/Domain/Slice/Shared consequences can first be represented through bounded Step `Evolution Impact` items; they must converge into complete corresponding post-Step Target Bodies when those owners are created/replaced by the next Step. Current owners unchanged by the Step are referenced, and retirements specify transition/consumer consequences. Candidate bodies remain under their enclosing Proposal/branch authority until selected; canonical integration/materialization still requires normal selection. Implementation-only foundation Steps need not invent a Feature target. A finding in one proposes/revalidates another owner; it never silently edits another.

Application Definition provides upstream application intent and Planning Resolution State coordinates planning; neither is materialized as a downstream natural owner by an Evolution Step. For the downstream materializable Feature/Scenario/Screen/Domain/Slice/Shared owner families, the selected Step's complete post-Step bodies guide SDS Code Realization or broad Core Exact Realization, according to the artifact being realized. Only after implementation, required proof and revalidation does `RU-EVO-04` materialize their realized `CREATE`/`REPLACE`/`RETIRE` state into current natural owners. Discovery Targets remain working inputs rather than additional post-Step owner bodies.

When reviewing implemented current truth, the existing current owners remain the direct authorities.

## 5. Feature / Slice Boundary

When Feature/Slice boundary quality is material, route through the SDS Lens Registry to `LENS-SLICE-VERTICALITY-INTEGRATION`.

For future planning, candidate/selected boundary meaning may be written into the relevant Step Target Feature/Slice Body at the requested Target Result depth; candidate authority stays enclosing until selection, and the meaning does not become a current Slice owner before implementation/materialization. For current-state revalidation, boundary findings route to the current natural owner.

## 6. Domain Discovery / Domain Target Body

When semantic state/identity/lifecycle/invariant/consistency ownership is materially unclear:

```text
future Feature/Slice pressure inside Step
→ Domain Evolution Impact / OPEN ownership pressure
→ relevant DDD evaluation
→ optional TM-DOMAIN-DISCOVERY
→ selected useful Discovery Result Content retained in the Impact when useful
→ zero / one / several Target Domain Bodies when durable post-Step Domain meaning is sufficiently resolved
```

For an already-realized Domain, direct `TM-DOMAIN-OWNER` review/revalidation remains valid.

Discovery Target/artifact is non-persistent by default and may reason concretely about classes/methods/persistence seams/unit-proof candidates. Selected Result Content may be retained in the Domain Evolution Impact without becoming Domain authority. `no Domain owner/body` is a valid result.

## 7. Slice Discovery / Slice Target Body

When a future Feature benefits from concrete whole-path implementation reasoning:

```text
Feature target state + relevant Scenario/Screen target/current sources
→ Slice Evolution Impact
→ TM-IMPLEMENTATION-SLICE when concrete whole-path reasoning is useful
→ whole-slice responsibility / entry-result / Domain+Shared dependencies / effects / failure-recovery / proof
→ selected useful Discovery Result Content retained in the Impact when useful
→ optional Target Slice Body when durable post-Step responsibility is sufficiently resolved
```

Do not split Slices by frontend/backend/database technical layer alone. `TM-IMPLEMENTATION-SLICE` is working discovery, not a durable Strategy owner; Step retention of selected Result Content does not change that ownership boundary.

A current `TM-SLICE-OWNER` is created/replaced/retired only when the corresponding responsibility is actually realized and materialized.

## 8. Cross-Slice Coordination

Behavior coverage, Slice↔Domain use, grouping/order and owner-addressability views are derived/working coordination, not another semantic owner. Use Vertical Slice/dependency/evolution/representation evaluation as applicable. No `TM-SLICE-STRATEGY` exists.

## 9. Shared Implementation Capability

Shared is the natural owner family for coherent reusable **non-end-to-end** implementation responsibility consumed by Slices.

Temporal boundary:

```text
current Shared owner
→ only current realized capability/consumer truth

future capability / future consumer binding
→ Target Shared Body in the relevant Evolution Step
```

A future consumer may justify a prepare-now Decision or a future Target Shared Body, but it does not count as an already-realized current consumer merely because the Step is selected.

Formation/retention criteria remain owned by [`../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md`](../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md).

## 10. Implementation Requirements

When implementation/proof reasoning may need durable owner-local must-hold meaning, route through `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY` and the natural Requirement owner family.

Temporal placement follows the represented state:

```text
current realized owner Requirement
→ canonical current owner

future owner-local Requirement selected for an unrealized post-Step state
→ corresponding Target Owner Body inside the Evolution Step
→ current owner only after materialization
```

Exact Requirement families, discovery outcomes, exception rules and zero-output semantics are owned by [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md`](requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md). Reusable Requirement Type and QRPE/table semantics are owned by [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md`](requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md). Family/owner authority vs provenance is owned by [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md`](semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md). There is no baseline `TM-REQUIREMENT`.

## 11. Programming Principles

Generic engineering-principle reasoning is reusable knowledge, **not a Lens family**. When plausible, scan [`planning/documentation/idtspe-methodology/active/profiles/sds/knowledge-bases/programming-principles/README.md`](../knowledge-bases/programming-principles/README.md), select only material `RG-PRG-*` entries, then apply them through natural SDS/Core evaluators or Target Production. Do not execute all groups as a mandatory checklist.

Reusable guidance never becomes current or future Requirement authority by live inheritance; selected local meaning must be represented in the appropriate current owner or Step Target Body.

## 12. Step-wide Implementation Concerns

This guide owns only the **cross-component routing** boundary:

```text
owner-local implementation / feasibility / IR/PFR meaning
→ corresponding natural owner / Target Owner Body

independent whole-transition cross-owner concern
→ TM-EVOLUTION-STEP / RU-EVO-03

literal mechanism
→ Exact / discovery
```

The internal `RU-EVO-03` concern-analysis and `RU-EVO-05` transition-obligation contract is owned by [`TM-EVOLUTION-STEP`](../target-modules/TM-EVOLUTION-STEP.md); do not copy that algorithm into this guide.

## 13. Proof / Evidence

Testing is not a later semantic phase. Future planning records proof obligations in the relevant Step Target Bodies / transition obligations; literal test code is realized through `TM-CODE-REALIZATION` under SDS.

After implementation, executed checks provide Evidence for what was actually realized. That Evidence is part of the gate before Target Owner Materialization when it can materially distinguish success from an incorrect/partial realization.

There is no baseline Test Design/Test Strategy Target.

## 14. Evolution / Alternatives / Uncertainty

Lazily scan `TM-EVOLUTION-STEPS-MAP`, then open only relevant concrete Steps.

A Step may be candidate, selected, conditional or represented by alternative Proposal/Planning Branch routes. Vague future ideas need not become Steps.

Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when change isolation, prepare-now-vs-defer or avoidable Forced Migration is material. Use Core uncertainty/evidence semantics for confidence basis rather than inventing numeric certainty or a Step-specific confidence lifecycle.

No generic `TM-EVOLUTION-IMPACT` Target is created. `TM-EVOLUTION-STEP` owns Step-side `RU-EVO-02` future Impact semantics; current realized Feature/Scenario/Screen/Domain/Slice/Shared reverse navigation/revalidation is governed by the shared [Current-Owner Evolution Impact Projection Contract](evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). This guide only routes between those owners.

## 15. Code / Exact Realization / Recommended Planning Depth

Enter SDS `TM-CODE-REALIZATION` when selected upstream Step/current meaning is sufficient for literal codebase work. Use Core `TM-EXACT-REALIZATION` for broad/profile-neutral non-code directly-integrable realization. `TM-PRE-UPDATE-PLAN` is optional when a separate reviewable intended-change result is useful; it is not a mandatory level.

The SDS depth ladder is profile guidance for reasoning/readiness. It is not a one-active-level state machine, phase sequence or approval ladder; several levels may participate together.

| Level | Recommended meaning | Typical SDS participation |
|---|---|---|
| `PL-L0-BEHAVIOR-AND-OWNER` | application/behavioral meaning and semantic ownership | Application/Feature/Scenario/Screen/Domain semantic questions; future meaning hosted in Step bodies |
| `PL-L1-IMPLEMENTATION-REQUIREMENTS` | durable implementation/proof constraints | future owner-local `IR-*`/rare `PFR-*` inside target bodies or current-owner revalidation |
| `PL-L2-IMPLEMENTATION-ARCHITECTURE` | implementation responsibility/boundary/relations | Domain/Slice/Shared target bodies, dependencies/change locality, proof boundary |
| `PL-L3-EXACT-IMPLEMENTATION-PLAN` | transient exact working plan | SDS `TM-CODE-REALIZATION` internal production reasoning for code; Core `TM-EXACT-REALIZATION` for broad non-code realization |
| `PL-L4-LITERAL-CODE-AND-PACKAGE` | literal directly-integrable result | SDS `RU-CODE-01` for code; Core `RU-REAL-01` for broad non-code literal results; package/app materialization where applicable |

Ordinary depth movement is not a USER gate and is not automatically orchestrated by this guide. The USER/current methodology composition chooses the useful depth/work concern.

## 16. Semantic Readiness Questions

When this guide is consulted, ask only questions material to the current owner/Step relationship:

1. Is the subject current realized truth or unrealized target state?
2. If unrealized, which Evolution Step owns the transition and which direct `Entering From` predecessors define its semantic prerequisite lineage?
3. Which Feature target states and Scenario/Screen/Domain/Slice/Shared Evolution Impacts/Target Bodies are material?
4. Are owner-local implementation/feasibility concerns correctly retained in their Target Bodies, and which cross-owner concerns genuinely belong to Step-wide `RU-EVO-03`?
5. What does `TM-EVOLUTION-STEP / RU-EVO-06` report for Planning Completeness, and is that projection consistent with the represented cross-owner plan?
6. If realization is requested, what does `RU-EVO-06` report for Realization Start Readiness, and is the handoff respecting that Step-owned conclusion?
7. Is an unresolved upstream semantic choice blocking trustworthy downstream planning/Exact work?
8. Are Feature/Scenario/Screen peer bodies inconsistent, or merely expressing different responsibilities?
9. Would Domain/Slice discovery add bounded value, and if so which selected Result Content must remain in the owning Evolution Impact until realization?
10. Does a candidate Domain/Slice/Shared body represent independently useful post-Step responsibility?
11. Are remaining unknowns local enough that Code/Exact Realization can resolve them safely, or do they require Proposal/Question/Evidence first?
12. Is the Step selected but still unrealized, and has any text accidentally treated selection as current-owner authority?
13. After implementation, does Evidence establish the planned body strongly enough for materialization, or is revalidation required?

These questions guide selected components; they do not replace Use-Case Registry selection or local component applicability gates and are not automatically USER-facing interview questions.

## 17. Revalidation

```text
Evidence / Finding / USER amendment / implementation mismatch
→ identify most-upstream affected current or future meaning
→ if current implemented truth is challenged: revalidate current owner
→ if selected future meaning is challenged: revalidate the Evolution Step / affected Target Body / Decision
→ preserve unaffected accepted meaning
→ rebuild dependent exact work only where affected
```

Do not compensate for an upstream inconsistency by adding lower-level implementation complexity.

If a semantic correction is selected for an already-implemented system but is itself not yet implemented, that **new desired state** belongs in an Evolution Step until realized; selection alone does not rewrite current owner truth.

## 18. Retired Routes

These are not current SDS Target families:

```text
TM-REQUIREMENT
TM-SLICE-STRATEGY
TM-CROSS-CUTTING-CONCERN
TM-TEST-DESIGN
TM-TEST-STRATEGY
```

Compatibility surfaces must route to current contracts and must not revive retired semantic authority.

<a id="sds-core-prs-contextual-material"></a>
## Core PRS candidate-target/contextual-material projection

SDS inherits Core PRS unchanged: file/result-changing Proposals expose current-basis + complete candidate target-state relations, while current SDS owner state remains authoritative until normal selection/integration. SDS planning may use Core `RU-PRS-03 / PRS-CONTEXTUAL-MATERIAL` for legacy notes, external constraints, exploratory analyses, examples, screenshots/data samples or other material that must influence work but is not a natural SDS owner artifact. PRS records scope/role/retention/maintenance; contextual files never become Feature/Scenario/Domain/Slice/Shared/Evolution/etc authority merely by persistence. When contextual meaning becomes canonical, integrate it through the natural SDS owner and update/exit the context entry.

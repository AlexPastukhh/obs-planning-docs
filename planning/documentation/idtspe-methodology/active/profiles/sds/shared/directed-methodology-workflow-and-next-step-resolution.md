# SDS Semantic Composition / Readiness Guide

Status: active profile semantic-composition guide  
Compatibility path: `directed-methodology-workflow-and-next-step-resolution.md`

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

## 1. Temporal Authority First

Before deciding which SDS component should produce meaning, classify whether the subject is current-realized truth or future-unrealized target state.

```text
accepted current owner contract for a materialized state
→ work directly with the current natural owner when review/revalidation is needed
→ actual implementation/Evidence may confirm or contradict that contract without silently rewriting it

material desired state is not yet realized
→ host that future state in TM-EVOLUTION-STEP
→ apply natural-owner Target Modules as supporting production methods inside the Step
```

A selected Proposal/Decision about future state does not by itself update the canonical current owner.

For greenfield work, absence is a valid current Entry State. Planning the first Feature/Domain/Slice/etc therefore still uses an Evolution Step when the planned meaning is not yet implemented.

## 2. Preferred Semantic Direction

For unrealized software change, the normal orientation is:

```text
current realized owners / implementation / Evidence
→ Evolution Step
→ proportionate future-state production:
     one or more Feature target states
       NEW/CHANGED → complete Target Feature Body
       unchanged → current Feature reference
     Scenario / Screen / Domain / Slice / Shared Evolution Impacts as material
     Domain / Slice discovery when useful
     selected Discovery Result Content retained in Impact when still useful
     Target Scenario / Screen / Domain / Slice / Shared Bodies when sufficiently resolved
     future owner-local Requirements inside corresponding Target Bodies
→ Exact Realization when selected meaning is sufficient
→ implementation / build / test / Evidence as authorized
→ targeted revalidation
→ Target Owner Materialization
→ updated current natural owners
```

Prototype may precede commitment when empirical inquiry is useful. Architecture Planning may contribute Decisions/Evidence/alternatives. Practical Test may follow executable realization when real-subject/environment observation is necessary.

This direction is orientation, not a phase sequence. Several planning depths/modules may participate together; work may reopen upstream meaning when Evidence requires it.

## 3. Application Definition

Application Definition is the conditional upstream semantic form when own-Application contribution/boundary/feasibility can materially change downstream meaning.

```text
review already-realized application contribution
→ direct current-owner revalidation is valid

plan a new/changed unrealized application contribution
→ Target Application Body inside the active Evolution Step
```

The exact activation/skip gate remains owned by [`../target-modules/TM-APPLICATION-DEFINITION.md`](../target-modules/TM-APPLICATION-DEFINITION.md).

## 4. Feature ↔ Scenario ↔ Screen Peer Formation

These are peer semantic owner families:

```text
Feature  = primary behavior + semantic Feature Data + BR-*
Scenario = journey composition / linking / continuity / terminal Benefit
Screen   = spatial/navigation composition / Feature presence / routes
```

When planning future state, Feature is the behavioral anchor: every selected NEW/CHANGED Feature uses one complete Target Feature Body, while unchanged Feature behavior is referenced. Scenario and Screen consequences are first represented through bounded Step `Evolution Impact` Units; when selected journey/spatial meaning changes deeply enough for materialization, the complete post-Step Target Scenario/Screen Body is formed. A finding in one proposes/revalidates another owner; it never silently edits another.

When reviewing implemented current truth, the existing current owners remain the direct authorities.

## 5. Feature / Slice Boundary

When Feature/Slice boundary quality is material, route through the SDS Lens Registry to `LENS-SLICE-VERTICALITY-INTEGRATION`.

For future planning, selected boundary meaning is written into the relevant Step Target Feature/Slice Body; it does not become a current Slice owner before implementation. For current-state revalidation, boundary findings route to the current natural owner.

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

future BR/IR/PFR selected for an unrealized post-Step state
→ corresponding Target Owner Body inside the Evolution Step
→ current owner only after materialization
```

Exact Requirement families, discovery outcomes, exception rules and zero-output semantics are owned by [`requirement-ownership-and-exception-rule.md`](requirement-ownership-and-exception-rule.md). There is no baseline `TM-REQUIREMENT`.

## 11. Programming Principles

Generic engineering-principle reasoning is reusable knowledge, **not a Lens family**. When plausible, scan [`programming-principles/README.md`](programming-principles/README.md), select only material `RG-PRG-*` entries, then apply them through natural SDS/Core evaluators or Target Production. Do not execute all groups as a mandatory checklist.

Reusable guidance never becomes current or future Requirement authority by live inheritance; selected local meaning must be represented in the appropriate current owner or Step Target Body.

## 12. Proof / Evidence

Testing is not a later semantic phase. Future planning records proof obligations in the relevant Step Target Bodies / transition obligations; literal tests remain Exact/code.

After implementation, executed checks provide Evidence for what was actually realized. That Evidence is part of the gate before Target Owner Materialization when it can materially distinguish success from an incorrect/partial realization.

There is no baseline Test Design/Test Strategy Target.

## 13. Evolution / Alternatives / Uncertainty

Lazily scan `TM-EVOLUTION-STEPS-MAP`, then open only relevant concrete Steps.

A Step may be candidate, selected, conditional or represented by alternative Proposal/Planning Branch routes. Vague future ideas need not become Steps.

Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when change isolation, prepare-now-vs-defer or avoidable Forced Migration is material. Use Core uncertainty/evidence semantics for confidence basis rather than inventing numeric certainty or a Step-specific confidence lifecycle.

No generic `TM-EVOLUTION-IMPACT` Target is created. `TM-EVOLUTION-STEP` owns repeatable `RU-EVO-02 Evolution Impact` Units for Scenario/Screen/Domain/Slice/Shared/OPEN responsibility subjects; current realized owners may expose only their optional reverse Step-reference/revalidation Impact Unit.

## 14. Exact Realization / Recommended Planning Depth

Enter Core `TM-EXACT-REALIZATION` when selected upstream Step/current meaning is sufficient for literal/directly-integrable work. `TM-PRE-UPDATE-PLAN` is optional when a separate reviewable intended-change result is useful; it is not a mandatory level.

The SDS depth ladder is profile guidance for reasoning/readiness. It is not a one-active-level state machine, phase sequence or approval ladder; several levels may participate together.

| Level | Recommended meaning | Typical SDS participation |
|---|---|---|
| `PL-L0-BEHAVIOR-AND-OWNER` | application/behavioral meaning and semantic ownership | Application/Feature/Scenario/Screen/Domain semantic questions; future meaning hosted in Step bodies |
| `PL-L1-IMPLEMENTATION-REQUIREMENTS` | durable implementation/proof constraints | future owner-local `IR-*`/rare `PFR-*` inside target bodies or current-owner revalidation |
| `PL-L2-IMPLEMENTATION-ARCHITECTURE` | implementation responsibility/boundary/relations | Domain/Slice/Shared target bodies, dependencies/change locality, proof boundary |
| `PL-L3-EXACT-IMPLEMENTATION-PLAN` | transient exact working plan | Core `TM-EXACT-REALIZATION` internal production reasoning |
| `PL-L4-LITERAL-CODE-AND-PACKAGE` | literal directly-integrable result | Core `RU-REAL-01`; package/app materialization where applicable |

Ordinary depth movement is not a USER gate and is not automatically orchestrated by this guide. The USER/current methodology composition chooses the useful depth/work concern.

## 15. Semantic Readiness Questions

When this guide is consulted, ask only questions material to the current owner/Step relationship:

1. Is the subject current realized truth or unrealized target state?
2. If unrealized, which Evolution Step owns the transition, what are its Feature target states, and which Scenario/Screen/Domain/Slice/Shared Evolution Impacts are material?
3. Is an unresolved upstream semantic choice blocking trustworthy downstream planning/Exact work?
4. Are Feature/Scenario/Screen peer bodies inconsistent, or merely expressing different responsibilities?
5. Would Domain/Slice discovery add bounded value, and if so which selected Result Content must remain in the owning Evolution Impact until realization?
6. Does a candidate Domain/Slice/Shared body represent independently useful post-Step responsibility?
7. Are remaining unknowns local enough that Exact Realization can resolve them safely, or do they require Proposal/Question/Evidence first?
8. Is the Step selected but still unrealized, and has any text accidentally treated selection as current-owner authority?
9. After implementation, does Evidence establish the planned body strongly enough for materialization, or is revalidation required?

These questions guide selected components; they do not replace Use-Case Registry selection or local component applicability gates and are not automatically USER-facing interview questions.

## 16. Revalidation

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

## 17. Retired Routes

These are not current SDS Target families:

```text
TM-REQUIREMENT
TM-SLICE-STRATEGY
TM-CROSS-CUTTING-CONCERN
TM-TEST-DESIGN
TM-TEST-STRATEGY
```

Compatibility surfaces must route to current contracts and must not revive retired semantic authority.

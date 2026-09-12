# SDS Semantic Composition / Readiness Guide

Status: active profile semantic-composition guide  
Compatibility path: `directed-methodology-workflow-and-next-step-resolution.md`

## Purpose

Preserve the useful SDS relationships formerly expressed as a directed workflow/next-step resolver **without owning runtime Use-Case selection or work-step orchestration**.

Use this file only after an applicable IDTSPE Use-Case Process (normally `UC-IDTSPE-COMPOSE-CURRENT-WORK`, `INTEGRATE` or `REVALIDATE`) determines that cross-owner SDS semantic direction/readiness is material.

```text
Use Case owns: why/when methodology is consulted and composed
SDS registries own: which concrete profile component is plausibly relevant
Target Module / Lens owns: specialized production/evaluation
this guide owns: cross-component semantic relationships and readiness guidance
```

## 1. Preferred Semantic Direction

```text
optional Need / real-life solution discovery
→ conditional Application Definition
→ Feature ↔ Scenario ↔ Screen
→ Domain / Slice / Shared implementation discovery + durable owner formation when useful
→ Exact Realization when accepted meaning is sufficient
→ Evidence / focused revalidation
```

Prototype may precede commitment when empirical inquiry is useful. Practical Test may follow executable realization when real-subject/environment observation is necessary. Evolution Steps may influence any applicable owner. Findings/revalidation move to the most-upstream affected owner rather than being compensated downstream.

This direction is orientation, not a phase sequence.

## 2. Application Definition Gate

Use `TM-APPLICATION-DEFINITION` when materially unsettled: custom contribution justification, own Application contribution, responsibility boundary, core real-life paths, or feasibility able to change the concept/boundary. Reuse/skip it when trusted current Application meaning is sufficient and unchanged.

## 3. Feature ↔ Scenario ↔ Screen Peer Formation

These are peer owners:

```text
Feature  = primary behavior + semantic Feature Data + BR-*
Scenario = journey composition / linking / continuity / terminal Benefit
Screen   = spatial/navigation composition / Feature presence / routes
```

Valid entry orders include Feature-first, Scenario-first, Screen-pressure-first and iterative co-formation. A peer finding proposes/revalidates another owner; it never silently edits it.

## 4. Feature / Slice Boundary

When Feature/Slice boundary quality is material, route through the SDS Lens Registry to `LENS-SLICE-VERTICALITY-INTEGRATION`. Use light evidence during Feature formation and stronger concrete evidence during Slice Discovery/owner review. The Lens evaluates four signal groups: Intent/Principal Result; Semantic Entry; Realization Cohesion/Shared Structure; Development/Proof/Evolution Fitness. Selected boundary meaning remains owner meaning.

## 5. Domain Discovery / Durable Domain

When semantic state/identity/lifecycle/invariant/consistency ownership is materially unclear:

```text
current Feature/Slice pressure
→ relevant DDD evaluation
→ optional TM-DOMAIN-DISCOVERY when bounded working discovery is independently useful
→ zero / one / several durable TM-DOMAIN-OWNER owners
```

Discovery is non-persistent by default and may still reason concretely about classes/methods/persistence seams/unit-proof candidates. `no durable Domain owner` is a valid result.

## 6. Slice Discovery / Durable Slice

When a selected Feature benefits from concrete whole-path implementation reasoning:

```text
Feature + BR-* + relevant Scenario/Screen
→ TM-IMPLEMENTATION-SLICE
→ whole-slice responsibility / entry-result / Domain+Shared dependencies / effects / failure-recovery / proof
→ optional selected TM-SLICE-OWNER when durable responsibility is useful
```

Do not split Slices by frontend/backend/database technical layer alone. `TM-IMPLEMENTATION-SLICE` is transient Slice Discovery, not a durable Strategy owner.

## 7. Cross-Slice Coordination

Behavior coverage, Slice↔Domain use, grouping/order and owner-addressability views are derived/working coordination, not another semantic owner. Use Vertical Slice/dependency/evolution/representation evaluation as applicable. No `TM-SLICE-STRATEGY` exists.

## 8. Shared Implementation Capability

Consider Shared extraction only for coherent reusable non-end-to-end responsibility. Default evidence is 2+ concrete selected Slice consumers. One-current-consumer is exceptional and requires a selected known Evolution Step that establishes another concrete consumer plus a seam justified now. Durable consumption traces from Slice IR to Shared consumer binding. If a candidate owns Aggregate state/invariants/lifecycle/Domain policy, route toward Domain instead.

## 9. Implementation Requirements

When durable implementation/proof constraint pressure is material, apply `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY` through normal Lens routing. Possible outcomes include owner-local IR/PFR, Decision/Risk/Question/Known Problem, code/working-plan choice, or no durable output. Zero Requirements is valid; existing IR/PFR may be refined, merged, weakened, strengthened, retired or reopened. There is no baseline `TM-REQUIREMENT`.

## 10. Programming Principles

Generic engineering-principle reasoning is reusable knowledge, **not a Lens family**. When plausible, scan [`programming-principles/README.md`](programming-principles/README.md), select only material `RG-PRG-*` entries, then apply them through natural SDS/Core evaluators or Target Production. Do not execute all 22 groups as a mandatory checklist.

## 11. Proof / Evidence

Testing is not a later phase. Domain semantics normally use focused Domain proof; Feature realized by Slice uses whole-Slice/Feature integration proof; Shared uses consumer integration plus focused local proof where useful; Scenario may own optional E2E proof intent; real implementation/environment observation may invoke `TM-PRACTICAL-TEST`. Core `LENS-TEST-PROOF-EVIDENCE` evaluates non-trivial proof choice/coverage. There is no baseline Test Design/Test Strategy Target.

## 12. Evolution

Lazily scan `TM-EVOLUTION-STEPS-MAP`, then open only relevant selected Steps. Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when change isolation, prepare-now-vs-defer or avoidable Forced Migration is material. No generic Evolution Impact Target/RU is created; impact remains with natural owners or transient evaluation.

## 13. Exact Realization / Depth

Enter Core `TM-EXACT-REALIZATION` when accepted upstream meaning is sufficient for literal/directly-integrable work. `TM-PRE-UPDATE-PLAN` is optional when a separate reviewable intended-change result is useful; it is not a mandatory level.

Recommended depth remains non-exclusive guidance:

```text
PL-L0  behavior and semantic ownership
PL-L1  owner-local implementation/proof constraints
PL-L2  implementation responsibility/boundary/relations
PL-L3  transient exact realization planning
PL-L4  literal directly-integrable result
```

The active IDTSPE Use Case decides whether any deeper component is useful now. Ordinary depth movement is not a USER gate.

## 14. Semantic Readiness Questions

When this guide is consulted, ask only questions material to the current owner relationship:

1. Is an unresolved upstream semantic choice blocking several downstream decisions?
2. Are Feature/Scenario/Screen peers inconsistent, or merely expressing different responsibilities?
3. Is implementation-boundary uncertainty better evaluated before creating another durable owner?
4. Would transient Domain/Slice discovery add bounded working value, or is current meaning already sufficient?
5. Does a candidate durable Domain/Slice/Shared owner have independently useful responsibility?
6. Is known Evolution concrete enough to affect current work, or merely speculative?
7. Are remaining unknowns local enough that Exact Realization can resolve them safely?
8. Did Evidence/Finding/change invalidate only a bounded downstream surface, or an upstream owner meaning?

These questions guide selected components; they do not replace Use-Case Registry selection or local component applicability gates.

## 15. Revalidation

```text
Evidence / Finding / accepted upstream change
→ identify most-upstream affected owner meaning
→ revalidate that owner
→ revalidate/invalidate dependent downstream meaning only where affected
→ preserve unaffected accepted meaning
→ return to current Use-Case composition at a useful depth
```

Do not compensate for an upstream inconsistency by adding lower-level implementation complexity.

## 16. Retired Routes

These are not current SDS Target families:

```text
TM-REQUIREMENT
TM-SLICE-STRATEGY
TM-CROSS-CUTTING-CONCERN
TM-TEST-DESIGN
TM-TEST-STRATEGY
```

Compatibility surfaces must route to current owners and must not revive retired semantic authority.

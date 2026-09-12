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

## 2. Application Definition Readiness

Application Definition is the conditional upstream owner when own-Application contribution/boundary/feasibility can materially change what downstream behavior should mean. The exact activation/skip gate is owned by [`../target-modules/TM-APPLICATION-DEFINITION.md`](../target-modules/TM-APPLICATION-DEFINITION.md); this guide only records its place in the cross-owner dependency direction.

## 3. Feature ↔ Scenario ↔ Screen Peer Formation

These are peer owners:

```text
Feature  = primary behavior + semantic Feature Data + BR-*
Scenario = journey composition / linking / continuity / terminal Benefit
Screen   = spatial/navigation composition / Feature presence / routes
```

Valid entry orders include Feature-first, Scenario-first, Screen-pressure-first and iterative co-formation. A peer finding proposes/revalidates another owner; it never silently edits it.

## 4. Feature / Slice Boundary

When Feature/Slice boundary quality is material, route through the SDS Lens Registry to `LENS-SLICE-VERTICALITY-INTEGRATION`. This guide owns only the **cross-owner readiness relation**: Feature formation may use lighter implementation-aware evidence, while Slice Discovery/owner review may use stronger concrete end-to-end evidence. The Lens body owns the actual boundary method, signal groups and evaluation semantics. Selected boundary meaning remains with the natural owner.

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

Shared is the durable owner for coherent reusable **non-end-to-end** implementation responsibility consumed by Slices. Formation/retention criteria, including concrete-consumer pressure and the known-Evolution exception, are owned by [`../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md`](../target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md).

This guide owns only the relationship rule: if the candidate is actually end-to-end Slice policy keep it Slice-local; if it owns Domain state/invariants/lifecycle/policy, route toward Domain; otherwise consult the Shared Target Module gate rather than duplicating that gate here.

## 9. Implementation Requirements

When implementation/proof reasoning may need durable owner-local must-hold meaning, route through `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY` and the natural Requirement owner. Exact Requirement families, discovery outcomes, exception rules and zero-output semantics are owned by [`requirement-ownership-and-exception-rule.md`](requirement-ownership-and-exception-rule.md) plus the concrete Lens; this guide only records where that concern participates in SDS readiness. There is no baseline `TM-REQUIREMENT`.

## 10. Programming Principles

Generic engineering-principle reasoning is reusable knowledge, **not a Lens family**. When plausible, scan [`programming-principles/README.md`](programming-principles/README.md), select only material `RG-PRG-*` entries, then apply them through natural SDS/Core evaluators or Target Production. Do not execute all 22 groups as a mandatory checklist.

## 11. Proof / Evidence

Testing is not a later phase. Domain semantics normally use focused Domain proof; Feature realized by Slice uses whole-Slice/Feature integration proof; Shared uses consumer integration plus focused local proof where useful; Scenario may own optional E2E proof intent; real implementation/environment observation may invoke `TM-PRACTICAL-TEST`. Core `LENS-TEST-PROOF-EVIDENCE` evaluates non-trivial proof choice/coverage. There is no baseline Test Design/Test Strategy Target.

## 12. Evolution

Lazily scan `TM-EVOLUTION-STEPS-MAP`, then open only relevant selected Steps. Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when change isolation, prepare-now-vs-defer or avoidable Forced Migration is material. No generic Evolution Impact Target/RU is created; impact remains with natural owners or transient evaluation.

## 13. Exact Realization / Recommended Planning Depth

Enter Core `TM-EXACT-REALIZATION` when accepted upstream meaning is sufficient for literal/directly-integrable work. `TM-PRE-UPDATE-PLAN` is optional when a separate reviewable intended-change result is useful; it is not a mandatory level.

The SDS depth ladder is profile guidance for reasoning/readiness. It is not a one-active-level state machine, phase sequence or approval ladder; several levels may participate together.

| Level | Recommended meaning | Typical SDS participation |
|---|---|---|
| `PL-L0-BEHAVIOR-AND-OWNER` | application/behavioral meaning and semantic ownership | Application Definition when needed; Feature ↔ Scenario ↔ Screen; Domain semantic-owner questions |
| `PL-L1-IMPLEMENTATION-REQUIREMENTS` | durable implementation/proof constraints | owner-local `IR-*`; rare owner-local `PFR-*`; Feature implementation concerns as inputs |
| `PL-L2-IMPLEMENTATION-ARCHITECTURE` | implementation responsibility/boundary/relations | Domain/Slice/Shared owners, dependencies/change locality, proof boundary |
| `PL-L3-EXACT-IMPLEMENTATION-PLAN` | transient exact working plan | Core `TM-EXACT-REALIZATION` internal production reasoning |
| `PL-L4-LITERAL-CODE-AND-PACKAGE` | literal directly-integrable result | Core `RU-REAL-01`; package/app materialization where applicable |

Ordinary depth movement is not a USER gate. Core Lens aliases such as historical `L1/L2/L3` are unrelated to this profile planning-depth vocabulary.

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


# Phase 09 — Consistency + Verification Coordination — Generic

Status: active navigation family; **not** the chronological start of testing

## Important Ordering Rule

Testing work is distributed through the directed methodology graph:

```text
Domain Draft
→ per-Domain TM-TEST-DESIGN when isolated proof is material

Domain proof plans + Slice portfolio
→ TM-TEST-STRATEGY when shared coordination is material

Implementation Slice
↔ per-Slice TM-TEST-DESIGN (standard or TDD)

implemented subject
→ TM-PRACTICAL-TEST execution / Evidence when useful
→ TM-TEST-COVERAGE
```

Canonical owner: `../shared/directed-methodology-workflow-and-next-step-resolution.md`.

## Candidate Target Modules / Helpers

```text
UC-IDTSPE-REVIEW-CONSISTENCY
TM-TEST-STRATEGY — conditional shared coordination
TM-TEST-DESIGN — Domain or Slice proof Targets at their readiness point
TM-PRACTICAL-TEST — when operated acceptance/evidence is useful
```

## Responsibility Boundary

Consistency review normally produces Finding Candidates / revalidation dispositions rather than new semantic truth. Core Finding Disposition selects any actual reopen consequence.

Testing modules consume selected semantic owners and plan Evidence:

```text
Scenario Acceptance
+ Behavior Items
+ Scenario DATA
+ local/shared Requirements
+ Domain Verification Meaning
+ Slice Useful Vertical Result Definition when Slice proof
→ proof design
```

Tests never redefine product/domain behavior.

## Default Layering

```text
isolated complex Domain/business rules
→ unit-test design

Slice orchestration / multi-owner vertical collaboration
→ integration-test design

critical whole-system/external paths
→ selective E2E

human/operated/environment properties
→ Practical Test
```

## IDTSPE Rule

A material Test Strategy/Test Design/Practical Plan can be its own repeatable Target because the proof choice is independently useful/revalidatable. Trivial proof may remain embedded according to Artifact Placement guidance. A material Test Strategy may additionally serve as a registry-like read path from Slice/Domain proof responsibilities to concrete test suites/classes/setups/fixtures/harnesses/helpers; split that registry from the Strategy only when Documentation / Representation finds independent addressability/review/reuse pressure.

## Practical Evidence Continuity

`TM-PROTOTYPE` and `TM-PRACTICAL-TEST` reuse `../../../idtspe-core/shared/practical-evidence-method.md`.

`TM-PRACTICAL-TEST` may be formed before realization to prepare Evidence Intent and collection needs; actual Evidence collection/results require the real implemented subject. `TM-PROTOTYPE` remains the route for practical Evidence whose subject is partial/simulated/throwaway before full implementation.

When a Prototype question still requires the real implementation, preserve the Evidence Question / Scenario task or context / critical observations / known prototype limits so `TM-PRACTICAL-TEST` can reuse or adapt them later.

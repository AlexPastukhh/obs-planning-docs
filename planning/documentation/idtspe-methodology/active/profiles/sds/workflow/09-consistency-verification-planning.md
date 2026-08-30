
# Phase 09 — Consistency + Verification Coordination — Generic

Status: active navigation family; **not** the chronological start of testing

## Important Ordering Rule

Testing work is distributed through the directed methodology graph:

```text
Domain Draft
→ optional per-Domain TM-TEST-DESIGN only when proof method itself is non-trivial

Domain proof plans + Slice portfolio
→ TM-TEST-STRATEGY when shared coordination is material

Implementation Slice
↔ optional per-Slice TM-TEST-DESIGN when proof method is non-trivial; otherwise direct exact test realization

implemented subject
→ TM-PRACTICAL-TEST execution / Evidence when useful
→ direct LENS-TEST-PROOF-EVIDENCE coverage review when useful
```

Canonical owner: `../shared/directed-methodology-workflow-and-next-step-resolution.md`.

## Candidate Target Modules / Helpers

```text
UC-IDTSPE-REVIEW-CONSISTENCY
TM-TEST-STRATEGY — conditional shared coordination
TM-TEST-DESIGN — optional Domain/Slice proof Target only when the proof method is independently non-trivial
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

A material Test Strategy/Test Design/Practical inquiry can be its own repeatable Target only when that result is independently useful/revalidatable. Straightforward proof may go directly to Exact Realization. Test Strategy keeps shared policy/infrastructure meaning, not a shadow registry of concrete test classes/helpers. Coverage review is a Lens operation.

## Practical Evidence Continuity

`TM-PROTOTYPE` and `TM-PRACTICAL-TEST` reuse `../../../idtspe-core/shared/practical-evidence-method.md`.

`TM-PRACTICAL-TEST` may be formed before realization to prepare Evidence Intent and collection needs; actual Evidence collection/results require the real implemented subject. `TM-PROTOTYPE` remains the route for practical Evidence whose subject is partial/simulated/throwaway before full implementation.

When a Prototype question still requires the real implementation, preserve the Evidence Question / Scenario task or context / critical observations / known prototype limits so `TM-PRACTICAL-TEST` can reuse or adapt them later.

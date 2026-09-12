# IDTSPE Core Map — Use-Case-Driven Proportional Runtime

Status: active generic methodology map  
Role: compact **conceptual/dependency projection** over canonical Core owners. This map helps orientation; it does not redefine the normative contracts linked below.

## 1. Functional Entry And Runtime Composition

```text
USER situation / current concern
↓
Methodology Use-Case Registry Map   [always logical]
↓
relevant Documentation + IDTSPE Use Cases
↓
UC-IDTSPE-COMPOSE-CURRENT-WORK      [default continuously relevant]
↓
smallest useful IDTSPE projection
├─ Broad Discussion only
├─ material Core State Units
├─ zero/one/several Targets
│  ├─ Target Module / Local Target Contract
│  └─ applicable Target Step Result Units
├─ selected/applicable Lenses
├─ selected registry/Knowledge entries
├─ active profile components
├─ situational Integration Checkpoint
└─ targeted Revalidation
```

Canonical routing ownership: Documentation [`principles-and-terminology.md`](../../../../documentation/principles-and-terminology.md), [`use-case-registry-map.md`](../../../../documentation/use-case-registry-map.md), and Core [`shared/compose-current-work-use-case.md`](shared/compose-current-work-use-case.md).

## 2. Ownership Layers

```text
Documentation methodology
→ functional/routing type semantics

IDTSPE Use Cases
→ compose methodology use for the current situation

IDTSPE Core components
→ own generic planning/resolution mechanics

active profile components
→ own profile-specific planning semantics

Target/result semantic owners
→ own selected concrete meaning
```

The map only shows these dependencies. Each linked owner remains authoritative for its own semantics.

## 3. Work Context / State

```text
IDTSPE Work Context
├─ current Work Concern
├─ Broad Discussion / Key Points
├─ material Core State Units
├─ zero/one/several Targets
│  └─ material Target Result Units
├─ Methodology Usage State when continuation/revalidation value exists
└─ physical representation only when useful
```

Canonical owner: [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md).  
Broad Discussion / checkpoint interaction owner: [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md).

## 4. Registry Navigation

```text
selected Use Case Process
→ IDTSPE Methodology Registry Directory when specialized discovery is needed
→ relevant registry family
→ concrete registry scan
→ matched component owner
→ component-local applicability/materiality
```

Canonical owner: [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md). Generic `scan ≠ select ≠ execute` semantics belong to Documentation Principles & Terminology.

## 5. Target Formation / Target Modules

```text
Broad Discussion
→ bounded result/owner not independently useful
→ no Target

OR

bounded responsibility/result becomes useful
→ Target Formation
→ existing Target / new Target
→ reusable Target Module when a recurring contract fits
   OR Local Target Contract
```

Canonical mechanics: [`shared/resolution-slot-and-target-formation-resolution-set.md`](shared/resolution-slot-and-target-formation-resolution-set.md).  
Target Module semantics: [`shared/target-module-model.md`](shared/target-module-model.md).

## 6. Lens System / Findings

```text
Use-Case/component routing
→ Lens registry scan when evaluation perspective may help
→ concrete Lens applicability gate
→ Lens operation over Analysis Surface
→ explanatory analysis or Finding Candidate
→ Core Finding Disposition when semantic consequence is material
```

Canonical Lens owner: [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md).  
Finding lifecycle owner: [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md).

## 7. Proposal / Q-R-P / Decision / Evidence

```text
material driver
→ candidate Proposal space
→ review / comparison
→ exact selection or unresolved/deferred state
→ Decision / natural-owner authority when accepted
```

Canonical candidate/selection semantics: [`shared/proposal-and-decision-lifecycle-contract.md`](shared/proposal-and-decision-lifecycle-contract.md).  
Optional Q/R/P priority/grouping: [`shared/qrp-priority-and-related-groups.md`](shared/qrp-priority-and-related-groups.md).  
State kind/addressability semantics remain in the Unit model.

## 8. Integration / Revalidation

```text
current meaning becomes distributed / review-handoff needs a coherent whole
→ UC-IDTSPE-INTEGRATE-CURRENT-WORK
→ Integration Checkpoint projection

Finding / Evidence / accepted upstream change / redirect
→ UC-IDTSPE-REVALIDATE-CURRENT-WORK
→ narrow affected-owner/component re-entry
```

Canonical Processes: [`shared/integrate-current-work-use-case.md`](shared/integrate-current-work-use-case.md) and [`shared/revalidate-current-work-use-case.md`](shared/revalidate-current-work-use-case.md).

## 9. Exact / Pre-Update

```text
separate reviewable mutation plan useful
→ optional TM-PRE-UPDATE-PLAN

literal/directly-integrable result useful and upstream meaning sufficient
→ TM-EXACT-REALIZATION
```

These are Target Module routes, not mandatory planning phases or USER gates.

## 10. Representation

```text
selected semantic meaning
→ representation/persistence question becomes material
→ Documentation / Representation evaluation
→ P-14 / TF-10 placement resolution
```

Canonical generic interface: [`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md). A semantic Unit/owner never implies one dedicated file by itself.

## 11. Profile Boundary

Core sees installed profiles through the profile registry and delegates specialized discovery to the selected profile directory. Profile components own profile semantics; Core continues to own generic planning/resolution mechanics.

Current SDS profile contributes specialized Target/Lens/knowledge registries but no separate runtime Use Cases.

## 12. Scenario Map Boundary

The Methodology Use-Case Scenario Map is design/evaluation/orientation material:

```text
scenario → decompose through current UCs → find gaps/duplication → improve methodology
```

It never owns runtime `when/why` routing when a current Use Case/component contract already owns that decision.

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
P-01 Invocation → P-02 Pass Trace / Visibility [included in every normal Shell pass]
↓
smallest useful IDTSPE projection / dynamic Shell route
├─ Broad Discussion only
├─ material Work-Context / cross-Target Core State Units
├─ zero/one/several Targets
│  ├─ Target Module Model → Target Module Instance OR Local Target Contract
│  ├─ actual Source Set / Source State Units
│  ├─ complete Module-defined Unit inventory when a Target Module Instance exists
│  └─ any Contextual Units actually formed (the target-local Unit path for a Local Target Contract)
├─ selected/applicable Lenses
├─ selected registry/Knowledge entries
├─ active profile components
├─ situational Integration Checkpoint
└─ targeted Revalidation
```

Canonical routing ownership: Documentation [`principles-and-terminology.md`](../../../../principles-and-terminology.md), [`use-case-registry-map.md`](../../../../use-case-registry-map.md), and Core [`use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](../use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md).

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
├─ material Work-Context / cross-Target Core State Units
├─ zero/one/several Targets
│  ├─ material Source State Units / Source bindings
│  ├─ complete Module-defined Unit inventory with dispositions/content when a Target Module Instance exists
│  ├─ any Contextual Units that actually formed
│  └─ Target-level Core State Units when material
├─ Methodology Usage State when continuation/revalidation value exists
└─ physical representation only when useful
```

Functional current-work composition owner: [`use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md`](../use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md).
Technical Work-Context/Shell composition owner: [`runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](../runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md).
Target Work / Target Formation / Target Instance subtree routing: [`runtime/target-work/RESPONSIBILITY-MAP.md`](../runtime/target-work/RESPONSIBILITY-MAP.md).
Broad Discussion / checkpoint interaction owner: [`representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md).

## 4. Registry Navigation

```text
selected Use Case Process
→ IDTSPE Methodology Registry Directory when specialized discovery is needed
→ relevant registry family
→ concrete registry scan
→ matched component owner
→ component-local applicability/materiality
```

Canonical owner: [`navigation/METHODOLOGY-REGISTRY-DIRECTORY.md`](METHODOLOGY-REGISTRY-DIRECTORY.md). Generic `scan ≠ select ≠ execute` semantics belong to Documentation Principles & Terminology.

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

Target Work / Target Formation ownership routing: [`runtime/target-work/RESPONSIBILITY-MAP.md`](../runtime/target-work/RESPONSIBILITY-MAP.md).
Target Module Meta-Model / discovery ownership routing: [`target-modules/RESPONSIBILITY-MAP.md`](../target-modules/RESPONSIBILITY-MAP.md).

Pass Trace / Visibility owner: [`runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](../runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md).

## 6. Lens System / Findings

```text
Use-Case/component routing
→ Lens registry scan when evaluation perspective may help
→ concrete Lens applicability gate
→ Lens operation over Analysis Surface
→ explanatory analysis or Finding Candidate
→ Core Finding Disposition when semantic consequence is material
```

Canonical Lens owner: [`lenses/LENS-MODEL.md`](../lenses/LENS-MODEL.md).
Finding lifecycle owner: [`resolution/findings/FINDING-DISPOSITION.md`](../resolution/findings/FINDING-DISPOSITION.md).

## 7. Need / Proposal / Q-R-P / Decision / Evidence

```text
USER wanted outcome with unresolved semantic home / solution
→ Need Candidate
→ Need Candidate Disposition
→ current owner / Finding / Proposal / Q-R-P / profile temporal owner as applicable

material driver + concrete candidate answer
→ candidate Proposal space
→ review / comparison
→ exact selection or unresolved/deferred state
→ Decision / natural-owner authority when accepted
```

Canonical Need Candidate grounding/routing: [`resolution/needs/NEED-CANDIDATE-DISPOSITION.md`](../resolution/needs/NEED-CANDIDATE-DISPOSITION.md).
Canonical candidate/selection semantics: [`resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md`](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md).
Canonical Q/R/P lifecycle/review contract: [`resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md`](../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md).
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

Canonical Processes: [`use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md`](../use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md) and [`use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md`](../use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md).

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
→ P-14 / PERSISTENCE_ADDRESSABILITY placement resolution
```

Canonical generic interface: [`representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md). A semantic Unit/owner never implies one dedicated file by itself.

## 11. Profile Boundary

Core sees installed profiles through the profile registry and delegates specialized discovery to the selected profile directory. Profile components own profile semantics; Core continues to own generic planning/resolution mechanics.

Current SDS profile contributes specialized Target/Lens/knowledge registries but no separate runtime Use Cases.

## 12. Scenario Map Boundary

The Methodology Use-Case Scenario Map is design/evaluation/orientation material:

```text
scenario → decompose through current UCs → find gaps/duplication → improve methodology
```

It never owns runtime `when/why` routing when a current Use Case/component contract already owns that decision.


### Target Resolution / Work Coverage

- [`runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md`](../runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md) — generic Resolution Slot boundary + canonical Target Resolution Requirements, reusable-model check and prepared/contextual coverage flow.
- [`runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md) — canonical Unit Definition/authoring model, Core-defined / Module-defined / Contextual Units, terminal Unit Resolution Slots for composite Units and Target Step Result composition.
- [`lenses/frequent/LENS-TARGET-RESOLUTION-COVERAGE.md`](../lenses/frequent/LENS-TARGET-RESOLUTION-COVERAGE.md) — frequent-conditional coverage evaluation Lens.

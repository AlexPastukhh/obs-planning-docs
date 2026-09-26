<a id="tm-feature"></a>
# TM-FEATURE — Feature Behavioral Owner

Module ID: `TM-FEATURE`

Entry Point: `tm.feature`
Role: primary application behavior Target Module

> Semantic Owner Dependencies
> - Type: `EXTENDS`; Responsibility: `TARGET-MODULE.META-MODEL`; Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)
> - Type: `CONTEXTUALIZES`; Responsibility: `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS`; Owner: [Application Benefit Boundary / Constraints](TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints)
> - Type: `CONTEXTUALIZES`; Responsibility: `SDS.SEMANTIC-COMPOSITION-READINESS`; Owner: [SDS Semantic Composition / Readiness](../profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness)

## Purpose

Own one coherent application/user capability boundary and the behavior that makes its principal result true.

A Feature is the primary behavioral authority. Scenario composes Features into a journey; Screen owns spatial/navigation composition; Slice owns durable implementation responsibility. None of those owners duplicates Feature behavior.

Feature formation is implementation-aware but not an exact implementation plan. The same Feature/Slice Boundary Method from `LENS-SLICE-VERTICALITY-INTEGRATION` is used here at lighter evidence depth and later during Slice Discovery with stronger evidence.

## Temporal Authority / Evolution-Step Hosting

This section applies the profile-level [SDS Semantic Composition / Readiness](../profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness) contract to Feature-local current/future consequences. The profile contract routes Step completeness/start-readiness/materialization semantics to their natural Evolution-Step owners, so Feature does not depend directly on Evolution Unit internals.

A canonical Feature owner describes realized/current behavior. When the behavior being planned is not yet implemented, apply this module in a supporting role inside `TM-EVOLUTION-STEP` and produce a **Target Feature Body** using the same `Feature Definition` contract.

```text
Target Feature Body selected
≠ current Feature owner updated

Step realized + required proof/revalidation
→ Target Owner Materialization
→ Feature owner now reflects the realized body
```

Future `BR-*` belongs to the Target Feature Body until materialization. Do not create a separate `FutureFeature` type.

For every represented `NEW` or `CHANGED` Feature in a **fully planned** Evolution Step, the Target Feature Body is the **complete** ordinary `Feature Definition` expected after the Step, not a delta. This is mandatory before marking that Step `Planning Completeness: COMPLETE` or starting its realization, including when a previously distant Step becomes next. A concrete `LATER_HORIZON` Step may remain `INCOMPLETE` with only a bounded Step-side Feature Evolution Impact, provided its material owner impacts and reverse current-owner Step references are accounted for under `TM-EVOLUTION-STEP / RU-EVO-06`. `[EXISTING]/[NEW]/[CHANGED]/[REMOVED]` annotations may aid review but never substitute for a required complete body. Candidate authority stays on the enclosing Proposal/Step boundary until normal selection. If a Step preserves Feature behavior unchanged (for example a pure Refactoring/Forced Migration), reference the current Feature as retained target behavior rather than copying it. Future Feature authority is represented directly by the Step Feature target state/Target Feature Body when formed. The **current realized Feature** additionally owns `RU-FEAT-06 — Evolution Impact`, specializing the shared Current-Owner Evolution Impact Projection Contract for Feature-local impact/revalidation; this reverse Unit never becomes a second future Feature body.

## Activation / Scope Gate

Use when application behavior needs an independently addressable owner or an existing Feature boundary must be reviewed.

Do not create a Feature merely because there is another button, endpoint, transport, technical layer, class or screen.

## Source Contract

Possible sources, selected proportionally by current work:

- Need / Benefit / selected application contribution; when only a bounded Benefit boundary/constraint clause is the real Feature driver, prefer the precise `AB-* / BC-*` reference if available rather than implying that the Feature realizes the whole Benefit;
- Scenario journey pressure;
- Screen interaction/spatial pressure;
- current implementation and Evidence;
- Prototype findings;
- known Evolution Step(s);
- accepted Proposal payload relevant to this Feature.

Source discovery remains evidence-driven. A source may trigger re-evaluation without becoming Feature authority.

## Production Method

The Result Units are co-formable; this is not a waterfall.

```text
Need / Benefit / current concern
↕
identity + intent + principal result + semantic entry
↕
semantic data
↕
behavior / BR-*
↕
implementation concerns
↕
Feature/Slice boundary reasoning
↕
current-owner Evolution Impact reverse projection when applicable
↺ peer reconciliation with Scenario and Screen
↺ Proposal / USER review / targeted lenses when meaning changes
```

### Boundary method

Use the shared Vertical Slice method across four signal groups:

1. Intent / Principal Result;
2. Semantic Entry;
3. Realization Cohesion / Shared Structure;
4. Development / Proof / Evolution Fitness.

Possible selected shapes include:

```text
same Feature / same Slice
same Feature + Slice Module
same Feature + Slice Branch
same Feature + Entry Adapter / Entry Variant
separate Feature / separate Slice
extract Shared Implementation Capability
OPEN — insufficient Evidence
```

Do not force exact class/method mapping during Feature formation.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Feature Definition`

| Result Unit | Meaning |
|---|---|
| `RU-FEAT-01` | Identity / Intent / Principal Result / Semantic Entry |
| `RU-FEAT-02` | Semantic Data |
| `RU-FEAT-03` | Feature Behavior — addressable `BR-*` behavior items |
| `RU-FEAT-04` | Implementation Concerns — material realization/proof/evolution concerns without exact implementation ownership |
| `RU-FEAT-05` | Feature / Slice Boundary — selected boundary meaning and material rationale |
| `RU-FEAT-06` | Evolution Impact — Feature-local current-owner reverse navigation/revalidation under the shared projection contract |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-FEAT-01` | when the Feature needs an explicit semantic identity/intent/result/entry anchor | `OMITTED` when no independent identity/intent/result/entry clarification is material beyond accepted owner context |
| `RU-FEAT-02` | when behavior-facing semantic data is needed to understand Feature meaning | `OMITTED` when no behavior-facing semantic data requires independent Feature-owned expression |
| `RU-FEAT-03` | when durable/addressable must-hold behavior is useful for downstream owners/proof/revalidation | `OMITTED` when no durable/addressable Feature must-hold behavior needs explicit `BR-*` identity |
| `RU-FEAT-04` | primarily in a future Target Feature Body when implementation/proof/evolution pressure must survive into realization planning; in a current owner only for a current realized limitation/risk with independent semantic value | `OMITTED` when no owner-local implementation/proof/evolution concern with independent semantic value exists; generic future roadmap/current mechanism pressure routes to Evolution Step/Q-R-P instead |
| `RU-FEAT-05` | when Feature/Slice boundary meaning or rationale is materially ambiguous/important | `OMITTED` with a concise reason when the boundary is already unambiguous and no competing shape/rationale matters |
| `RU-FEAT-06` | in a current realized Feature when any concrete unrealized Step contains material Feature impact/target meaning; depth follows what the Step has actually resolved | use `OMITTED` with a concise reason when no concrete unrealized Step materially affects this Feature; in a future Target Feature Body keep `RU-FEAT-06` present but `OMITTED` because current-owner reverse projection is not applicable inside Step-owned future meaning |



### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-FEAT-01` processing envelope

1. **Opening Unit Checkpoint — `RU-FEAT-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-FEAT-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-FEAT-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-FEAT-02` processing envelope

1. **Opening Unit Checkpoint — `RU-FEAT-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-FEAT-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-FEAT-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-FEAT-03` processing envelope

1. **Opening Unit Checkpoint — `RU-FEAT-03`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-FEAT-03`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-FEAT-03`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-FEAT-04` processing envelope

1. **Opening Unit Checkpoint — `RU-FEAT-04`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-FEAT-04`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-FEAT-04`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-FEAT-05` processing envelope

1. **Opening Unit Checkpoint — `RU-FEAT-05`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-FEAT-05`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-FEAT-05`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-FEAT-06` processing envelope

1. **Opening Unit Checkpoint — `RU-FEAT-06`** — determine whether this Feature's behavior/target meaning is materially affected, then apply the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md).
2. **Unit Work — `RU-FEAT-06`** — produce the Feature-local reverse navigation/revalidation projection under that shared contract.
3. **Closing Unit Checkpoint — `RU-FEAT-06`** — validate Feature-local revalidation/handoff needs and the shared projection-contract guards.

<a id="ru-feat-01--identity--intent--principal-result--semantic-entry"></a>
### RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
- **TRIGGERED:**
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)

Capture proportionally:

```text
Feature ID / name
intent
principal meaningful result / result family
semantic application invocation when useful
important preconditions/context
```

Transport variants do not automatically define separate semantic entries.

<a id="ru-feat-02--semantic-data"></a>
### RU-FEAT-02 — Semantic Data

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **TRIGGERED:**
  - [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)

Own addressable Feature Data Objects as `FDO-*` when behavior-facing data/result identity needs stable reference across FBS/Scenario/realization. Do not duplicate Domain state ownership or storage schema.

<a id="ru-feat-03--feature-behavior"></a>
### RU-FEAT-03 — Feature Behavior

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **TRIGGERED:**
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
  - [`LENS-TERMS-UBIQUITOUS-LANGUAGE`](../lenses/reusable/LENS-TERMS-UBIQUITOUS-LANGUAGE.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)

Feature owns stable Feature-local `FBS-*` identities for addressable semantic behavior actions/transitions when useful.

```text
FBS-* = normative Feature behavior step/action
BR-*  = independently useful Feature must-hold Requirement
```

An FBS may have zero, one or several attached BRs. The step does not need a BR merely to be normative behavior.

Use the shared [`Requirement Classification And Representation Contract`](../profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md) for `BR-*` Type and `QRPE / Examples` semantics.

When addressable Feature Requirements are material, use the exact reusable table schema:

```text
Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples
```

When addressable Feature behavior steps are material, use the exact reusable Main Path schema:

```text
Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples
```

Feature-wide `BR-*` may appear in the Requirement table; BRs especially relevant to one `FBS-*` are also referenced adjacent to that step. Both remain the same Feature-owned `BR-*` family. Use semantic FBS names plus short ordinary numeric suffixes.

Correctness-critical order is normative. If order is partial or OPEN, state that rather than fixing implementation-convenience order.

Branch/order/path are selected solution structure, not Requirements by existence. Keep actor/user/AI free-form reasoning in Scenario when the application merely consumes supplied input.

<a id="ru-feat-04--implementation-concerns"></a>
### RU-FEAT-04 — Implementation Concerns

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`](../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md)
- **TRIGGERED:**
  - [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
  - [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md)
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
  - [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md)

This RU is primarily a **future Target Feature Body / active planning** surface. Capture only material concerns needed to shape the not-yet-realized Feature result, for example:

- likely Domain ownership pressure;
- external effects / uncertainty / retry concerns;
- expected shared-capability pressure;
- proof boundary concerns;
- UI/spatial realization concerns;
- concrete Evolution pressure.

It is not an exact implementation plan and does not create durable Slice/Domain/Shared authority.

For a **current realized Feature owner**, do not retain a roadmap of unrealized implementation concerns. Keep only current realized semantics/limitations, durable current Risk/Problem/Decision meaning when independently useful, and optional navigation to the Evolution Step that owns any planned change.

After implementation + proof, reconcile each future concern rather than copying the planning residue into the current Feature owner:

```text
still OPEN because it concerns another unrealized change
→ ROUTE-TO-EVOLUTION-STEP / Proposal / Q-R-P as appropriate

produced/changed durable BR/IR/PFR/Decision/Risk/Known Problem
→ place it in the semantic state actually established by realization;
  future next-state meaning remains in a Step, current realized meaning may materialize to the natural owner

resolved completely by implementation/proof
→ REMOVE-AS-RESOLVED

only influenced exact code/test realization
→ REMOVE-AS-REALIZATION-ONLY

Evidence shows Feature/BR/boundary itself is wrong
→ REOPEN-UPSTREAM / new corrective future Step when a change must still be implemented
```

Removal/material reinterpretation of existing current Feature meaning is proposal-first when it changes accepted semantics; selection of the correction still does not make that correction current truth before realization.

<a id="ru-feat-05--feature--slice-boundary"></a>
### RU-FEAT-05 — Feature / Slice Boundary

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
- **TRIGGERED:**
  - [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)

Record the selected behavioral/locality boundary. The detailed implementation topology is discovered later and may challenge/reframe this boundary through Proposal/revalidation.

<a id="ru-feat-06--evolution-impact"></a>
### RU-FEAT-06 — Evolution Impact

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **REQUIRED [CLOSING]:**
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
- **TRIGGERED:**
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)

This Feature-local Unit specializes the shared [Current-Owner Evolution Impact Projection Contract](../profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md). Its local affected surface is **Feature behavior/target meaning**. The shared contract owns inclusion threshold across candidate/selected/conditional/deferred Steps, truthful planning-position projection, depth/no-copy rules and post-realization removal from active future impact. This Target Module owns only the Unit identity, Feature-specific materiality test and local revalidation/handoff use.

## Peer Reconciliation

```text
Feature ↔ Scenario
  Feature owns behavior/result semantics
  Scenario owns journey order/branch/convergence/context continuity

Feature ↔ Screen
  Feature owns behavior
  Screen owns where/how behavior participates spatially

Feature ↔ Slice
  Feature owns behavior
  Slice owns durable end-to-end implementation responsibility
```

A change in one peer may produce a Finding Candidate for another; no peer silently overwrites another owner.

## Guards

```text
Feature ≠ Scenario
Feature ≠ Screen
Feature ≠ implementation Slice
Feature ≠ endpoint/button/window
Feature behavior ≠ Domain invariant ownership
implementation concern ≠ selected implementation topology
one Requirement ≠ one test
```

## Unit Resolution Guidance / Knowledge Basis

Use the shared [`Knowledge Basis contract`](../../../idtspe-core/knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md). Knowledge and drivers attach to the Unit responsibility they actually support; this section is only a compact Unit-contract index, not one undifferentiated Feature question set.

```text
RU-FEAT-01 Identity / Intent / Principal Result / Semantic Entry
  Drivers:
    What one intent and principal meaningful Result/result family define this Feature?
    What is the semantic application entry, distinct from transport/button/URI mechanics?
  Knowledge Basis:
    normally thin; Feature identity/semantic-entry rules in this module are sufficient

RU-FEAT-02 Semantic Data
  Driver:
    What minimal semantic Data is required to understand behavior?
  Knowledge Basis:
    use DDD theory/Lens only when Domain ownership/invariant pressure is actually material

RU-FEAT-03 Feature Behavior
  Drivers:
    What must the application establish/forbid/return?
    Which behavior needs durable BR-* addressability?
  Knowledge Basis:
    behavior semantics here + applicable proof/Requirement guidance when material

RU-FEAT-04 Implementation Concerns
  Driver:
    Which realization/proof/evolution concerns can materially change feasibility or later ownership?
  Knowledge Basis:
    selected RG-PRG-* / Implementation Requirements / Evolution guidance only when triggered

RU-FEAT-05 Feature / Slice Boundary
  Driver:
    Does current/known Evolution support one Slice, a module/branch/adapter, a split, or Shared extraction?
  Knowledge Basis:
    reusable Vertical Slice guidance is the primary theory/reference source; use DDD/UI/Evolution support only when relevant

RU-FEAT-06 Evolution Impact
  Driver:
    Which concrete unrealized Steps currently contain material Feature impact/target meaning, and how deeply is that impact resolved?
  Knowledge Basis:
    relevant Step/Map authority + Evolution guidance; no copied future body
```

A Unit may reach the referenced Lens/Knowledge Basis without copying that theory here. Formal runtime Questions/Proposals/QRP/Decisions are created only when their Core lifecycle/addressability value is material.

## Representation / Artifact Contract

Feature identity/behavior used downstream needs durable discoverable ownership, but not one file per Feature.

Valid forms:
- existing application/product owner section;
- several small Features in one file with stable Feature/BR identities;
- dedicated Feature owner when independent review/reuse pressure exists.

Canonical BR prose stays in the Feature owner. Scenario/Screen/Slice/Domain reference BR identity rather than copy equal authority.

## Validators

```text
one coherent intent + principal result is explicit
semantic entry is not merely transport naming
Feature semantic Data does not steal Domain state authority
durable behavior is canonical here and addressable when useful
implementation concerns are clearly non-behavioral discovery inputs
Feature/Slice boundary has explicit selected/OPEN meaning
Scenario/Screen peer constraints were reconciled where material
known Evolution was considered proportionally
current Feature reverse impact includes every concrete materially relevant unrealized Step without promoting non-selected planning position
future Feature authority remains in the Step Target Feature Body rather than RU-FEAT-06
no exact class/call topology is frozen as Feature truth
```

## Handoff

```text
selected Feature
→ optional TM-PROTOTYPE when empirical pre-commit uncertainty remains
→ optional TM-IMPLEMENTATION-SLICE for transient whole-Slice discovery
↕ optional TM-DOMAIN-DISCOVERY when semantic ownership needs discovery
→ when work is unrealized, integrate selected durable Domain/Slice/Shared meaning into the active Evolution Step Target Bodies
→ when reviewing already-realized truth, revalidate current TM-SLICE-OWNER / TM-DOMAIN-OWNER / Shared owners directly as applicable
→ SDS Code Realization for code, or broad Core Exact Realization for non-code literal work, when the selected Step/current meaning is sufficient
```

## Copied project example

[Study Tab Launcher — Benefit slices и связь с Scenario/Slice](../examples/study-tab-launcher/project/planning/documentation/features/open-local-project.md). Read the [case guide and capture limits](../examples/study-tab-launcher/README.md) with the current module contract; the copied project is a dated example, not live application authority.

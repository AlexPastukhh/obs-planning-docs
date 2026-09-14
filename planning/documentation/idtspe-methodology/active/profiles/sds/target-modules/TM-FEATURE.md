# TM-FEATURE — Feature Behavioral Owner

Entry Point: `tm.feature`  
Role: primary application behavior Target Module

## Purpose

Own one coherent application/user capability boundary and the behavior that makes its principal result true.

A Feature is the primary behavioral authority. Scenario composes Features into a journey; Screen owns spatial/navigation composition; Slice owns durable implementation responsibility. None of those owners duplicates Feature behavior.

Feature formation is implementation-aware but not an exact implementation plan. The same Feature/Slice Boundary Method from `LENS-SLICE-VERTICALITY-INTEGRATION` is used here at lighter evidence depth and later during Slice Discovery with stronger evidence.

## Temporal Authority / Evolution-Step Hosting

A canonical Feature owner describes realized/current behavior. When the behavior being planned is not yet implemented, apply this module in a supporting role inside `TM-EVOLUTION-STEP` and produce a **Target Feature Body** using the same `Feature Definition` contract.

```text
Target Feature Body selected
≠ current Feature owner updated

Step realized + required proof/revalidation
→ Target Owner Materialization
→ Feature owner now reflects the realized body
```

Future `BR-*` belongs to the Target Feature Body until materialization. Do not create a separate `FutureFeature` type.

## Activation / Scope Gate

Use when application behavior needs an independently addressable owner or an existing Feature boundary must be reviewed.

Do not create a Feature merely because there is another button, endpoint, transport, technical layer, class or screen.

## Source Contract

Possible sources, selected proportionally by current work:

- Need / Benefit / selected application contribution;
- Scenario journey pressure;
- Screen interaction/spatial pressure;
- current implementation and Evidence;
- Prototype findings;
- known Evolution Step(s);
- accepted Proposal payload relevant to this Feature.

Source discovery remains evidence-driven. A source may trigger re-evaluation without becoming Feature authority.

## Lens Profile

Required Core lenses apply through the Core Lens Registry.

Primary SDS lens:
- `LENS-SLICE-VERTICALITY-INTEGRATION` — select/validate the Feature/Slice boundary and implementation-concern shape.

Conditional lenses:
- `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when known change matters;
- UI/spatial lens when Screen realization materially affects the boundary;
- DDD lens when semantic state/invariants may belong to Domain;
- quality/verifiability lenses when material.

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

## Unit Contract Conformance

Declared target-specific `RU-*` responsibilities in this module are interpreted as **Module-defined Unit Contracts**, not output buckets only. For each material Unit:

```text
Unit responsibility
→ relevant inputs / shared or Unit-specific reusable guidance
→ Unit Resolution with Core Question/QRP/Proposal/Evidence/Decision state only when useful
→ Current Result Content when sufficiently resolved
```

Module-wide Source/Knowledge/Production/Lens/validator guidance is a shared default only where it genuinely applies across Units. Unit-specific subsection text specializes that guidance. Do not duplicate Core lifecycle semantics inside Result Content, and do not require a formal Proposal/Decision when trusted Sources/Evidence determine the result without a material choice.

## Target Step-Result Contract

**Target Step Result:** `Feature Definition`

| Result Unit | Meaning |
|---|---|
| `RU-FEAT-01` | Identity / Intent / Principal Result / Semantic Entry |
| `RU-FEAT-02` | Semantic Data |
| `RU-FEAT-03` | Feature Behavior — addressable `BR-*` behavior items |
| `RU-FEAT-04` | Implementation Concerns — material realization/proof/evolution concerns without exact implementation ownership |
| `RU-FEAT-05` | Feature / Slice Boundary — selected boundary meaning and material rationale |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-FEAT-01` | when the Feature needs an explicit semantic identity/intent/result/entry anchor | omit fields that are already obvious; do not manufacture separate entries for transport variants |
| `RU-FEAT-02` | when behavior-facing semantic data is needed to understand Feature meaning | omit data detail owned by Domain/storage or irrelevant to behavior |
| `RU-FEAT-03` | when durable/addressable must-hold behavior is useful for downstream owners/proof/revalidation | omit BR atomization for obvious transient behavior that does not need durable addressability |
| `RU-FEAT-04` | primarily in a future Target Feature Body when implementation/proof/evolution pressure must survive into realization planning; in a current owner only for a current realized limitation/risk with independent semantic value | omit generic future roadmap/current mechanism ideas from current owners; route unrealized change pressure to Evolution Step/Q-R-P instead |
| `RU-FEAT-05` | when Feature/Slice boundary meaning or rationale is materially ambiguous/important | omit explicit rationale when the boundary is straightforward and no competing shape matters |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

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

### RU-FEAT-01 — Identity / Intent / Principal Result / Semantic Entry

Capture proportionally:

```text
Feature ID / name
intent
principal meaningful result / result family
semantic application invocation when useful
important preconditions/context
```

Transport variants do not automatically define separate semantic entries.

### RU-FEAT-02 — Semantic Data

Own behavior-facing semantic data meaning needed to understand the Feature. Do not duplicate Domain state ownership or storage schema.

### RU-FEAT-03 — Feature Behavior

Use stable `BR-*` identities for durable addressable must-hold behavior when useful.

Prefer a compact numbered **Main path** when it makes the behavior easiest to follow:

```text
one row = one semantic behavior step
one step may own one or several BR-*
canonical BR prose stays beside the owning behavior/branch where practical
```

Correctness-critical order is normative. If order is partial or still OPEN, say so rather than silently fixing an implementation-convenience order.

For a material branch inside a step:
- state one exact decision/question;
- show one path/variant column per real branch when useful;
- continue ordered actions inside each path;
- end with explicit convergence, re-entry/retry, Success or Stop.

These steps/branch columns are representation, not new persistent Behavior-Step/Branch ontology.

Keep actor/user/AI free-form reasoning in Scenario when the application merely consumes supplied input. Feature behavior starts at the semantic application boundary: what the application accepts, validates, establishes, changes and returns.

Behavior requirements state what the Feature must establish/forbid/return, not how classes or adapters implement it.

### RU-FEAT-04 — Implementation Concerns

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

### RU-FEAT-05 — Feature / Slice Boundary

Record the selected behavioral/locality boundary. The detailed implementation topology is discovered later and may challenge/reframe this boundary through Proposal/revalidation.

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

Use the shared [`Knowledge Basis contract`](../../../idtspe-core/shared/knowledge-basis-contract.md). Knowledge and drivers attach to the Unit responsibility they actually support; this section is only a compact Unit-contract index, not one undifferentiated Feature question set.

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
→ Exact Realization when the selected Step/current meaning is sufficient
```

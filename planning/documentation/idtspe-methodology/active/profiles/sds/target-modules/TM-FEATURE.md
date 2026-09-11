# TM-FEATURE — Feature Behavioral Owner

Entry Point: `tm.feature`  
Role: primary application behavior Target Module

## Purpose

Own one coherent application/user capability boundary and the behavior that makes its principal result true.

A Feature is the primary behavioral authority. Scenario composes Features into a journey; Screen owns spatial/navigation composition; Slice owns durable implementation responsibility. None of those owners duplicates Feature behavior.

Feature formation is implementation-aware but not an exact implementation plan. The same Feature/Slice Boundary Method from `LENS-SLICE-VERTICALITY-INTEGRATION` is used here at lighter evidence depth and later during Slice Discovery with stronger evidence.

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
| `RU-FEAT-04` | when implementation/proof/evolution pressure should survive into later discovery | omit current mechanism ideas or generic concerns with no downstream consequence |
| `RU-FEAT-05` | when Feature/Slice boundary meaning or rationale is materially ambiguous/important | omit explicit rationale when the boundary is straightforward and no competing shape matters |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

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

Capture material concerns that should influence later implementation discovery, for example:

- likely Domain ownership pressure;
- external effects / uncertainty / retry concerns;
- expected shared-capability pressure;
- proof boundary concerns;
- UI/spatial realization concerns;
- known Evolution pressure.

This RU is not an exact implementation plan and does not create durable Slice/Domain/Shared authority.

After implementation + proof, reconcile each material concern rather than keeping a historical concern log:

```text
still OPEN and capable of changing Feature/boundary/implementation
→ KEEP-AS-CURRENT-CONCERN

produced/changed durable BR/IR/PFR/Decision/Risk/Known Problem
→ PROMOTE/ROUTE-DURABLE-MEANING through Proposal/approval to natural owner

resolved completely by implementation/proof
→ REMOVE-AS-RESOLVED

only influenced exact code/test realization
→ REMOVE-AS-REALIZATION-ONLY

Evidence shows Feature/BR/boundary itself is wrong
→ REOPEN-UPSTREAM
```

Removal/material reinterpretation of an existing durable concern is proposal-first when it changes selected Feature meaning.

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

## Knowledge Basis / Question Guidance

Reusable Vertical Slice guidance is the primary boundary knowledge source. DDD, Implementation Requirements Discovery, Evolution and UI/spatial evaluators plus selected [`RG-PRG-*`](../shared/programming-principles/README.md) knowledge are consulted only when their concerns are material.

Useful questions include:
- What one intent and principal meaningful Result/result family define this Feature?
- What is the semantic application entry, distinct from transport/button/URI mechanics?
- What minimal semantic Data is required to understand behavior?
- What must the application establish/forbid/return?
- Which behavior needs durable `BR-*` addressability?
- Which implementation concerns can change feasibility/boundary/proof/evolution?
- Does current/known Evolution support one Slice, a module/branch/adapter, a split, or Shared extraction?

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
→ durable TM-SLICE-OWNER / TM-DOMAIN-OWNER as selected meaning warrants
→ TM-SHARED-IMPLEMENTATION-CAPABILITY only when genuine reusable responsibility emerges
→ Exact Realization when upstream meaning is sufficient
```

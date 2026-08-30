# TM-SLICE-STRATEGY — Slice Implementation Strategy

Entry Point: `tm.slice.strategy`  
Role: primary optional Target Module  
Compatibility ID: `TM-SLICE-STRATEGY` is retained while the module semantics are broadened to Slice Implementation Strategy.

## Purpose

Translate known Scenario behavior into a coherent vertical implementation portfolio, discover enough Domain/Aggregate position to shape implementation responsibly, and form stable selected Slice semantic identities/addresses for later detailed realization planning.

The Strategy may cover one Scenario or several sufficiently related Scenarios when a broader view is needed to see shared Domain/Aggregate boundaries. A normal vertical Slice still has exactly one Primary Scenario.

Keep this Target proportional. When one obvious small Slice exists and no material decomposition, Domain-boundary or ordering reasoning is needed, the same meaning may be handled minimally or the explicit Strategy Target may be skipped.

The key flow is:

```text
Scenario Behavior / Requirements
↓
Behavioral Decomposition
  Behavior Items + DATA
↓
TM-SLICE-STRATEGY
  Slice Portfolio / Realization Map
  Domain / Aggregate Realization Map
  Selected Slice Owner Register
↓
Target Formation — when independently bounded Slice planning is material
  reuse existing Target | hand off/reference existing owner | form new TM-IMPLEMENTATION-SLICE Target
↓ when TM-IMPLEMENTATION-SLICE is selected/reused
TM-IMPLEMENTATION-SLICE
```

## Core Boundary

A Slice is an independently useful/checkable vertical implementation increment inside one Primary Scenario.

Slice boundaries are not technical layers. Normal Slice decomposition must not produce `database first`, `backend second`, `frontend third` merely because the implementation has those layers.

`Behavior Item` and `Slice` are different levels:

```text
Behavior Item
= stable addressable required behavior

Slice
= independently useful/checkable implementation increment
  that may realize one or several Behavior Items
```

Do not create one Slice per Behavior Item mechanically.

Frontend realization belongs inside the normal vertical Slice when feature-local. Shared non-vertical implementation responsibility remains a Cross-Cutting ownership question rather than a fake multi-Scenario Slice.

## Upstream Source Contract

### Direct Semantic Sources

```text
Scenario Behavior / Requirements
Behavioral Decomposition
  Behavior Items
  Scenario DATA
Scenario Development / Change Outlook
local/shared must-hold conditions / negative guarantees
Screen meaning when spatial/UI topology is relevant
accepted Cross-Cutting contracts when already known
```

### Evidence / Current-State Sources

```text
current code / implementation
Prototype Evidence when relevant
implemented practical Evidence when relevant
existing Domain/Aggregate realization when already present
dependency/integration facts
```

Current code is authoritative current technical/domain realization truth. This Strategy may summarize planning-relevant boundaries and relations, but it must not maintain a stale parallel mirror of implementation details.

### Constraint / Planning-State Sources

```text
accepted Decisions
material Q/R/P
delivery/dependency constraints
quality/risk constraints when they affect Slice boundaries/order
```

### Source Discovery Rule

Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md).

Primary reusable Lenses:

- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) — useful/checkable vertical Slice boundaries, behavioral realization coverage and integration integrity.
- [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md) — broad/shallow identity, invariant and consistency-boundary discovery when Domain/Aggregate reasoning is material.

Frequent conditional Lenses:

- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when dependencies or change surface constrain decomposition/order.
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when material quality/risk changes Slice or Domain boundaries.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when independently checkable/observable boundaries matter.

Other Lenses are selected only when materially useful. No separate Target Module Knowledge Basis is currently required; reusable Slice/DDD knowledge is supplied through the relevant Lenses.

## High-Level Example — Self-Contained Walkthrough

### Situation

`SCN-PAYMENT` already describes the required payment behavior and exposes addressable Behavior Items such as choosing a method, providing payment information, attempting payment and presenting a truthful result. Its Change Outlook says additional methods are likely and asynchronous completion may become necessary later.

The team now needs an implementation strategy without inventing backend/frontend phases or a speculative full Domain model.

### Strategy result

`RU-SSTRAT-01` may select:

```text
SL-PAYMENT
Primary Scenario: SCN-PAYMENT
Useful result:
  user can pay a payable order with a supported method
  and receive a truthful result

Realizes:
  B-PAY-01..B-PAY-06

May Change / Extend:
  additional payment methods
  asynchronous completion may later be required
```

`RU-SSTRAT-02` may initially contain only broad/shallow position:

```text
Order
  identity/state + rule about when it may become paid

Payment
  payment-attempt lifecycle/result consistency candidate

SL-PAYMENT
  Uses → Order
  Uses → Payment
```

This does not claim that one Slice equals one Aggregate or that the complete internal Domain model is already known. Later detailed Slice planning may confirm, split, merge or reject a candidate boundary; a material challenge becomes a Finding Candidate and crosses Core Finding Disposition before any bounded revalidation is selected.

`RU-SSTRAT-03` may register:

```text
SL-PAYMENT
  semantic owner: SL-PAYMENT
  representation: inline in this Strategy for now
  readiness: ready for the next implementation-planning decision
```

`RU-SSTRAT-03` does **not** create a bounded `TM-IMPLEMENTATION-SLICE` Target. When independent bounded Slice planning is useful, normal Target Formation decides whether to reuse an existing Target, hand off/reference another suitable owner, or form a new bounded `TM-IMPLEMENTATION-SLICE` Target. If that module is selected/reused, it refines the same `SL-PAYMENT` semantic Slice identity rather than creating duplicate Slice meaning. If detailed planning or code reveals that the Domain/Aggregate position differs, surface a Finding Candidate; Core Finding Disposition decides whether bounded revalidation of `RU-SSTRAT-02` or another owner is warranted. Current code remains the authority for the realized technical/domain shape.

### Boundary / Lesson

The Strategy owns implementation decomposition, the planning-level Slice↔Domain realization map and owner addressability. It does not own Screen topology, a full Domain Draft, permanent code realization mirrors or detailed Slice implementation bodies.

## Evaluation / Production Method

### 1. Establish Strategy scope

Select only the implementation-planning area needed for a coherent decision:

- Scenario(s) currently moving toward implementation;
- current/core Behavior Items and DATA;
- relevant Scenario Development / Change Outlook;
- current code/domain realization when extending an existing application.

Do not scan the whole application without reason.

### 2. Discover vertical Slice candidates

Ask:

- what minimum behavior produces an independently useful/checkable result?
- which one Primary Scenario does this Slice advance?
- which Behavior Items does it realize?
- which DATA is materially used/produced/changed?
- what must remain true after delivery?
- is this actually vertical, or only a technical layer/prerequisite?

A technical prerequisite may be real work, but it is not relabeled as a normal vertical Slice merely for planning convenience.

`INITIAL_VERTICAL` / `EXTENDING_VERTICAL` may remain descriptive language where useful, but are not required conformance enums.

### 3. Check behavioral coverage in both directions

For current material Scenario behavior:

```text
every material Behavior Item
→ realized by a selected Slice
  OR explicitly deferred/outside
```

And:

```text
every selected Slice / claimed behavior
→ grounded in Scenario behavior
```

If Strategy invents new product behavior, route it through normal Idea/Scenario lifecycle instead of silently adding it to a Slice.

### 4. Perform broad/shallow Domain / Aggregate discovery

Across the selected behavior scope, inspect only enough Domain meaning to shape implementation:

- stable identity/lifecycle clues;
- rules/invariants that must remain correct together;
- consistency boundaries;
- existing code/domain owners that can be reused;
- cross-boundary coordination;
- meaning that is clearly application/orchestration/presentation rather than Domain.

Ask primarily:

> Which state/identity/invariants must stay correct together?

Do not attempt a full Domain Draft here. Do not enumerate every Entity/Value Object/field/method/repository or persistence shape.

One Slice may use several Aggregates/domain concepts. One Aggregate may be used by several Slices. Vertical Slice Architecture does not imply `one Slice = one Aggregate`.

Canonical relation direction is:

```text
Slice
→ Uses
→ Aggregate / Domain concept
```

Inverse `Aggregate → used by Slices` is a generated/read view when useful.

### 5. Stress decomposition against known change

Use Scenario Development / Change Outlook and other credible change pressure to ask:

- which Slice is likely to change/extend?
- which Aggregate/domain boundary would be affected?
- is the change surface reasonably localized?
- are we cementing an accidental limitation?
- are we creating abstraction now for only hypothetical future value?

Keep future pressure as `May Change / Extend` when it is not yet a concrete selected Slice.

### 6. Decide useful implementation sequence

Consider:

- product/value priority;
- real dependencies;
- risk/learning value;
- which Slice owners are ready;
- whether an Aggregate/domain boundary needs deeper reasoning before a Slice is planned.

Possible planning approaches include deeper upfront Domain work, Aggregate-by-Aggregate refinement, or Slice-by-Slice refinement. They are guidance/choices, not a mandatory strategy enum.

### 7. Form stable Slice semantic owner identities

Each selected Slice gets stable addressable semantic owner identity. Registering that identity is not itself formation of a bounded `TM-IMPLEMENTATION-SLICE` Target.

The owner slot may be:

- inline in the Strategy artifact;
- a section in another suitable owner;
- a separate Slice artifact.

Semantic ownership does not imply one file per Slice.

Detailed implementation meaning may later refine the same Slice semantic owner, but `RU-SSTRAT-03` only registers identity/addressability. When independently bounded implementation planning is material, Target Formation remains the authority that selects/reuses/forms that Target.

### 8. Revalidate as detailed Slice planning and implementation teach us

When Target Formation has selected/reused `TM-IMPLEMENTATION-SLICE`, detailed Slice planning or later implementation may reveal that a proposed Domain boundary, dependency or Slice decomposition is wrong or incomplete.

That is normal:

```text
Strategy
↓
Slice planning / implementation Evidence
↓
Finding Candidate
↓
Core Finding Disposition
↓
bounded revalidation when selected
↓
Strategy refinement when warranted
```

Broad Domain discovery should therefore refine toward the actual domain elements used by Slices rather than becoming a one-time frozen discovery document.

## Target Step-Result Contract

**Target Step Result:** `Slice Implementation Strategy`

| Result Unit | Meaning |
|---|---|
| `RU-SSTRAT-01` | Slice Portfolio / Realization Map |
| `RU-SSTRAT-02` | Domain / Aggregate Realization Map |
| `RU-SSTRAT-03` | Selected Slice Owner Register |

Result Unit identity does not imply one file or one section per item.

### RU-SSTRAT-01 — Slice Portfolio / Realization Map

Owns which vertical Slices exist in this Strategy scope and what accepted behavior each Slice is intended to realize.

For each material Slice, record proportionally:

```text
Slice ID / label
Primary Scenario
Useful Vertical Result
Realizes:
  Behavior Item refs
Relevant DATA:
  uses / produces / changes when material
must-hold / negative guarantees when material
Related Screen / Cross-Cutting relations when material
Dependencies / prerequisites
Implementation order / readiness when useful
May Change / Extend
```

`May Change / Extend` records known planning-relevant pressure, not automatically a future Slice.

The Useful Vertical Result is actor-visible/checkable meaning, not an implementation task.

### RU-SSTRAT-02 — Domain / Aggregate Realization Map

Owns the planning-level Domain/Aggregate position needed to shape current implementation.

It begins broad/shallow and becomes more precise as selected Slices are planned/implemented:

```text
Scenario behavior
↓
broad identity / invariant / consistency clues
↓
candidate Aggregate/domain boundaries
↓
Slice → Uses → Domain elements
↓
current code realization confirms/challenges the position
```

Record only useful meaning such as:

```text
Aggregate/domain concept
boundary rationale
important identity/lifecycle/invariant clues
cross-boundary coordination
Slice → Uses relations
existing code owner / realization reference when useful
known change pressure affecting the boundary
```

This Result Unit is not a full Domain model and is not authoritative over current implementation details after code exists. Code remains the current technical/domain realization truth.

Detailed Slice planning should refine its own `Domain Elements Used` against the broad Strategy position. If a candidate Aggregate proves unnecessary or the map is materially wrong, surface a Finding Candidate; Core Finding Disposition selects any resulting bounded Strategy/Domain revalidation before accepted map meaning changes.

### RU-SSTRAT-03 — Selected Slice Owner Register

Owns the stable set/addressability of selected Slice semantic owners formed from this Strategy.

For each owner, record only enough coordination meaning:

```text
Slice ID
Slice semantic owner identity
representation/address
inline vs linked/separate representation when known
planning readiness/status when useful
bounded Implementation Slice Target relation — only after Target Formation, when one exists
```

Example:

```text
SL-PAYMENT
Semantic Owner: SL-PAYMENT
Representation: inline owner slot below
State: ready for the next implementation-planning decision
Bounded Implementation Target: none yet
```

The register does **not** own the detailed implementation plan.

When Target Formation later selects/reuses a bounded `TM-IMPLEMENTATION-SLICE` Target, that Target refines the same Slice semantic owner whether its representation is inline or physically split. The register itself is not Target-creation authority.

## Representation / Artifact Contract

Keep representation economical.

```text
one Strategy artifact
├─ Slice Portfolio
├─ Domain / Aggregate Realization Map
└─ Selected Slice Owners
   ├─ SL-PAYMENT owner slot
   ├─ SL-CANCEL owner slot
   └─ SL-REFUND owner slot
```

is valid.

Later:

```text
Strategy artifact
├─ Slice Portfolio
├─ Domain / Aggregate Realization Map
└─ Selected Slice Owner Register
   └─ SL-PAYMENT → slices/SL-PAYMENT.md
```

is also valid.

The semantic model did not change; only G3 / Documentation Representation changed.

```text
ARTIFACT_PROPOSAL
ID: AP-SSTRAT-01
CONTENT_KIND: SLICE_IMPLEMENTATION_STRATEGY
WHEN: Slice portfolio/domain position/owner coordination is materially useful
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current TM-SLICE-STRATEGY Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>
CONTENT: Slice Portfolio / Realization Map; Domain / Aggregate Realization Map; Selected Slice Owner Register
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SSTRAT-02
CONTENT_KIND: SELECTED_SLICE_OWNER
WHEN: a selected Slice receives stable semantic identity/addressability
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: selected Slice semantic owner
REPRESENTATION: INLINE_OWNER_SLOT_OR_DEDICATED_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>#<slice> or <slice-owner>
CONTENT: stable Slice semantic identity/addressability; any independently bounded TM-IMPLEMENTATION-SLICE Target is selected/reused/formed only through Target Formation and then refines the same Slice meaning
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Do not create a file per Slice merely because a Slice has semantic identity.

Do not persist generated inverse relation mirrors or detailed code realization copies when they can be obtained reliably from current code.

## Guards

```text
Behavior Item ≠ Slice
Slice ≠ technical layer
Slice ≠ Aggregate
one Slice may use several Aggregates
one Aggregate may support several Slices
Strategy ≠ full Domain Draft
Strategy ≠ Screen topology owner
Strategy ≠ detailed Slice implementation owner
Strategy owner slot ≠ mandatory separate file
future pressure ≠ automatic future Slice
current code realization ≠ stale documentation mirror
```

## Exit Gate

At least one selected Slice semantic owner is ready for the next implementation-planning decision without downstream work having to invent product behavior or basic decomposition from scratch. When independently bounded detailed Slice planning is material, it is ready for normal Target Formation.

For a ready Slice, the Strategy should make clear:

- its useful result and Primary Scenario;
- material Behavior Items and DATA;
- relevant Domain/Aggregate position at sufficient depth;
- material dependencies;
- known `May Change / Extend` pressure;
- stable Slice owner identity/address.

Blocking uncertainty remains Generic Q/R/P rather than being hidden inside the Strategy.

## Handoff

```text
TM-SLICE-STRATEGY
  RU-SSTRAT-01 Slice Portfolio / Realization Map
  RU-SSTRAT-02 Domain / Aggregate Realization Map
  RU-SSTRAT-03 Selected Slice Owner Register
↓
Target Formation — only when independently bounded Slice planning is material
↓ when TM-IMPLEMENTATION-SLICE is selected/reused
TM-IMPLEMENTATION-SLICE
  refines the same selected Slice semantic identity
↓
implementation/code Evidence
↓
Finding Candidate
↓
Core Finding Disposition
↓
bounded revalidation of Strategy when selected
```

`TM-TEST-DESIGN`, Screen and Cross-Cutting planning may consume the Strategy/Slice owners when their own Target gates are met.

Existing `TM-DOMAIN-DISCOVERY` / `TM-DOMAIN-DRAFT` remain separate registered modules in this transition; this redesign intentionally does not delete or migrate their command topology yet. `TM-SLICE-STRATEGY` nevertheless owns its own broad/shallow Domain/Aggregate realization map so Slice planning is not forced to invent implementation boundaries blindly.

# TM-SLICE-STRATEGY — Slice Implementation Strategy

Entry Point: `tm.slice.strategy`  
Role: primary optional Target Module

## Purpose

Translate accepted Scenario behavior into a coherent portfolio of useful vertical
Slices, discover enough Domain/Aggregate position to shape those Slices, project
accepted future behavior onto current/planned Slices, and keep a stable bridge from
Strategy entries to the same realization owners.

A normal Slice has exactly one Primary Scenario.

The Strategy does not decompose work into frontend/backend/database phases.
Application-development layer theory may inform Resolution through Knowledge
Basis/Lenses, but is not Target result ontology.

When one obvious small Slice exists and decomposition/owner coordination adds no
value, an explicit Strategy Target/artifact may be skipped. The **minimum
boundary-discovery result itself may not be skipped**; establish it locally before
detailed Slice or Aggregate planning.

## Minimum Boundary-Discovery Gate

Slice Strategy is the normal owner for broad/shallow boundary discovery. Before
detailed `TM-IMPLEMENTATION-SLICE` planning or `TM-DOMAIN-DISCOVERY` in
`PRIMARY / BOUNDED DEEP` mode, establish proportionally for the current planning
horizon:

```text
current useful Slice boundaries/candidates
+ candidate/current Domain/Aggregate responsibilities relevant to them
+ Slice → Uses → Domain/Aggregate map at broad/shallow depth
+ genuine shared/Cross-Cutting owner candidates when material
+ material unresolved boundary questions that can change the selected owner
```

The horizon may contain one obvious Slice. `Broad` does not require scanning or
modeling the whole Application; it means broad enough to understand the nearby
responsibility landscape in which the next owner is selected. `Shallow` means
enough to establish boundaries and usage context without prematurely doing the
selected owner's detailed implementation/proof Requirements Discovery.

An explicit Strategy artifact is optional when it adds no value. The boundary
result is an operational entry gate regardless of representation.

## Core Boundary

```text
Behavior Item
= stable addressable required behavior

Slice
= one independently useful/checkable vertical implementation result
  that may realize one or several Behavior Items
```

Do not create one Slice per Behavior Item mechanically.

Frontend/backend/server/domain/persistence are possible technical responsibilities,
not normal separate SDS Slice identities.

## Upstream Source Contract

### Direct Semantic Sources

```text
Scenario RU-SCEN-01 Behavior / Requirements
Scenario RU-SCEN-02 Behavior Items + DATA
Scenario RU-SCEN-03 Development / Change Outlook
must-hold / negative guarantees
Screen meaning when spatial/UI relations matter
accepted Cross-Cutting owners when already known
```

### Evidence / Current-State Sources

```text
current code / implementation
Prototype/Practical Evidence when relevant
existing Domain/Aggregate realization when present
dependency/integration facts
```

Current code is authoritative for exact current technical realization. Strategy
must not maintain a stale call-level implementation mirror.

### Planning-State Sources

```text
accepted Decisions
material Q/R/P
delivery/dependency constraints
quality/risk constraints when they change boundaries/order
```

## High-Level Example

```text
SCN-PAYMENT
  current behavior: choose method → attempt payment → truthful result
  future/change: additional methods; async completion may be needed
```

Strategy may select:

```text
SL-PAYMENT
  Primary Scenario: SCN-PAYMENT
  Useful Vertical Result:
    user can pay a payable order with a supported method and see a truthful result
  Realizes: B-PAY-01..06
  May Change / Extend:
    additional payment methods
    async completion
```

Shallow Domain position:

```text
SL-PAYMENT
  Uses → Order
    needs: rule about payable/paid state
  Uses → Payment
    needs: payment-attempt lifecycle/result consistency
```

## Lens Profile

Required Core Pack applies.

Primary:
- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
- [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)

Conditional:
- L4 Dependency / Change Impact
- L5 Evolution / Change Isolation
- Simplicity / Implementation Economy
- L6 Verifiability / Observability / Operability
- Quality / Risk Materiality
- Shared / Cross-Cutting Responsibility

## Resolution / Production Method

### 1. Establish Strategy scope

Select only Scenario(s)/behavior currently needing coherent implementation
shaping. Do not scan the whole application without reason.

### 2. Discover useful vertical Slice candidates

Ask:

- what minimum behavior produces one independently useful/checkable result?
- which one Primary Scenario does it advance?
- which Behavior Items/DATA obligations does it realize?
- is it genuinely vertical or only a technical prerequisite/layer?

### 3. Check behavioral coverage in both directions

```text
every material current Behavior Item
→ selected Slice OR explicitly deferred/outside

every selected Slice claim
→ accepted Scenario behavior
```

New product behavior discovered here becomes an Idea/Finding for Scenario
resolution, not silent Strategy truth.

### 4. Project Scenario development/change meaning

Consume `RU-SCEN-03`.

For each accepted future/change item determine:

```text
extends/changes an existing Slice
→ Slice.May Change / Extend

already implies a distinct independently useful future vertical result
→ planned/future Slice entry

actually belongs to a new independently meaningful Scenario
→ surface Scenario candidate instead
```

Strategy remains a projection; Scenario is behavioral authority.

### 5. Perform broad/shallow Domain / Aggregate modeling

Use `TM-DOMAIN-DISCOVERY` in SUPPORTING role and/or DDD Lens as useful.

Canonical direction:

```text
Slice → Uses → Domain/Aggregate object
```

For each Slice capture proportionally:

- candidate/actual Domain objects used;
- semantic behavior/rules/actions needed;
- Behavior Item relation;
- stable public/domain-facing operations/methods later when useful.

Do not copy incidental internal repository/service/method call graphs.

Many-to-many is normal. `Aggregate → Slices using it` is a derived query/read view.

### 6. Discover Cross-Cutting ownership

Repeated mechanics do not automatically create a shared owner. When one genuine
shared non-vertical guarantee/mechanism is independently useful, surface/reuse a
Cross-Cutting owner through normal Finding Disposition/Target Formation.

### 7. Decide useful realization grouping/order

The Slice→Domain graph may suggest working groups around shared Aggregates.
Valid approaches include:

```text
deepen several Aggregates first, then related Slices
Slice-by-Slice with Domain refinement as needed
group-by-shared-Aggregate
alternate Aggregate ↔ Slice refinement
```

No ordering is mandatory profile ontology.

### 8. Resolve owner/addressability bridge

Each selected Slice/Cross-Cutting concern has one semantic owner independent of
physical file representation. Moving an owner from an inline Strategy section to
a dedicated file never creates a second owner.

### 9. Revalidate from realization Evidence

Detailed planning/code may challenge Strategy decomposition/Domain use. If a deep
Slice/Aggregate pass materially changes a Slice boundary, Domain/Aggregate
ownership or shared-owner relation, surface a Finding Candidate and update/review
the shallow boundary result before continuing dependent deep planning. Use Core
disposition for bounded Strategy/Scenario/Domain revalidation rather than silent
drift.

## Target Step-Result Contract

**Target Step Result:** `Slice Implementation Strategy`

| Result Unit | Meaning |
|---|---|
| `RU-SSTRAT-01` | Slice Portfolio / Behavioral Realization |
| `RU-SSTRAT-02` | Slice → Domain Realization Map |
| `RU-SSTRAT-03` | Realization Owner Bridge |

### RU-SSTRAT-01 — Slice Portfolio / Behavioral Realization

For each current/planned Slice record proportionally:

```text
Slice ID / label
Primary Scenario
Current | Planned future status when useful
Useful Vertical Result
Behavior Item coverage
relevant DATA
must-hold / negative guarantees when material
Related Screen / Cross-Cutting relations when useful
real dependency/order only when meaningful
May Change / Extend
```

`May Change / Extend` is Scenario future/change meaning projected onto this Slice,
not an independent future-behavior authority.

### RU-SSTRAT-02 — Slice → Domain Realization Map

Canonical layout is **Slice-centric**:

```text
Slice
  → Uses
    → Aggregate / Entity / Value / Policy / semantic Domain object
      → behavior/rule/action used
      → stable public Domain operation/method when useful
```

Before deep modeling:

```text
candidate Aggregate/domain concept
semantic behavior/rule/action needed
Behavior Item relation
```

After refinement/implementation:

```text
actual Domain elements used
stable domain-facing operations/methods when they clarify the semantic boundary
```

Do not list incidental internal methods.

### RU-SSTRAT-03 — Realization Owner Bridge

Keep enough coordination meaning to connect:

```text
Strategy entry
↔ same Slice/Cross-Cutting semantic owner
↔ bounded Target relation when one exists
↔ inline/separate representation/address
```

The bridge does not create a Target Instance and does not create a new semantic
owner because representation moved.

## Representation / Artifact Contract

```text
ARTIFACT_PROPOSAL
ID: AP-SSTRAT-01
CONTENT_KIND: SLICE_IMPLEMENTATION_STRATEGY
WHEN: portfolio/domain-use/owner-bridge meaning is materially useful
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Slice Strategy Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>
CONTENT: RU-SSTRAT-01..03
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SSTRAT-02
CONTENT_KIND: SELECTED_REALIZATION_OWNER
WHEN: selected Slice/Cross-Cutting owner has stable identity
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: selected realization owner
REPRESENTATION: INLINE_OWNER_SLOT_OR_DEDICATED_ARTIFACT
FILE_OR_ARTIFACT: <strategy>#<owner> or <owner-artifact>
CONTENT: stable semantic identity/address; representation may change independently
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

See [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) for worked
LIGHT/MIXED/COMPLEX examples.

## Guards

```text
Behavior Item ≠ Slice
Slice ≠ technical layer
Slice ≠ Aggregate
frontend/backend split ≠ normal Slice decomposition
Strategy future projection ≠ Scenario future authority
explicit Strategy Target/artifact may be skipped; minimum boundary-discovery result may not
RU-SSTRAT-02 stays Slice-centric
file split ≠ new semantic owner
stable contract/seam requires real semantic/shared/external/compatibility/consistency/evolution pressure
```

## Exit / Handoff

A Slice is ready for **deep** implementation planning when its useful result,
Primary Scenario, material obligations, Domain-use position, surrounding boundary
context and owner address are sufficient that downstream work refines the selected
owner instead of inventing product behavior or the surrounding ownership map.

Likewise, a candidate Domain/Aggregate responsibility is ready for
`PRIMARY / BOUNDED DEEP` modeling only when the shallow map establishes enough
Slice-use and neighboring-boundary context to know what is being deepened.

When independent bounded Slice planning is useful, normal Target Formation may
select/reuse `TM-IMPLEMENTATION-SLICE` for the same semantic Slice owner.

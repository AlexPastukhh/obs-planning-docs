# SDS Directed Methodology Workflow / Next-Step Resolution

Status: active canonical SDS cross-Target direction

Target Modules own recurring result families. This file owns the **preferred
semantic direction and handoff logic** between those families. It is not a fixed
phase/waterfall taxonomy.

## 1. Direction Invariant

```text
upstream semantic owner
→ accepted Source meaning flows downstream
```

Downstream Targets may discover a problem in upstream meaning, but they do not
silently mutate it.

```text
challenge / new Evidence
→ Finding Candidate
→ Core Finding Disposition
→ narrow owner-specific REVALIDATE / REPAIR when selected
```

This is what “SDS is directed” means. It does not prohibit iterative refinement.

## 2. Optional Generic Pre-Application Work

When there is no trusted clear Application intent:

```text
Need / Reality / real-world problem
↓
real-life solution / route discovery
↓
is an own Application contribution useful?
├─ no  → SDS Application planning stops
└─ yes → TM-APPLICATION-DEFINITION
```

Use the generic Core guide:
[`../../../idtspe-core/shared/solution-discovery-workflow.md`](../../../idtspe-core/shared/solution-discovery-workflow.md).

If the user/project already supplies a trusted explicit Application contribution,
this work may be skipped.

## 3. Application Definition

```text
trusted Need/route/Application intent
→ TM-APPLICATION-DEFINITION
```

Application Definition resolves the selected own-Application contribution,
concept, responsibility boundary, proportional reference/existing-solution
position and feasibility.

`TM-PROTOTYPE` is optional practical Evidence. A Prototype commonly appears here,
but may also be invoked later whenever a material uncertainty benefits from a
bounded experiment.

## 4. Scenario System

```text
Application Definition
→ one TM-SCENARIO-PLANNING invocation per independently meaningful Scenario
```

Each Scenario owns:

```text
RU-SCEN-01 current behavior / requirements
RU-SCEN-02 DATA + Behavior Items
RU-SCEN-03 Development / Change Outlook
```

### Future behavior

Two different outcomes are possible:

```text
same independently meaningful Scenario result changes/extends
→ keep future/change meaning in that Scenario's RU-SCEN-03

new independently meaningful result is expected/planned
→ surface a new Scenario candidate
→ form/plan that Scenario when useful
```

Do not force every future capability into an existing Scenario.

## 5. Screen Branch — Conditional

When spatial/window meaning matters:

```text
Scenario behavior + DATA
→ TM-SCREEN
```

Screen may be planned/refined after enough Scenario meaning exists. Screen and
Slice Strategy are sibling downstream projections of Scenario meaning, not a
mandatory chain `Screen → Frontend Slice → Backend Slice`.

One Screen may serve several Slices and one Slice may involve several Screens.

## 6. Scenario → Slice Strategy

When decomposition/owner coordination is useful:

```text
selected current/planned Scenarios
+ DATA / Behavior Items
+ must-hold meaning
+ Screen meaning when material
→ TM-SLICE-STRATEGY
```

Strategy resolves:

```text
RU-SSTRAT-01
  current useful vertical Slices
  + planned future Slices when accepted future behavior already implies a new
    independently useful vertical result
  + May Change / Extend projection from Scenario RU-SCEN-03

RU-SSTRAT-02
  Slice → Uses → Domain/Aggregate meaning
  at broad/shallow depth first

RU-SSTRAT-03
  Realization Owner Bridge
```

`May Change / Extend` is a projection; Scenario remains behavioral authority.

### Minimum boundary-discovery gate

Before detailed `TM-IMPLEMENTATION-SLICE` planning or `TM-DOMAIN-DISCOVERY` in
`PRIMARY / BOUNDED DEEP` mode, establish a **minimum broad/shallow boundary
result** for the current planning horizon.

The result is mandatory; an explicit `TM-SLICE-STRATEGY` Target/artifact is not.
When one obvious small Slice makes a separate Strategy Target unnecessary,
establish the same minimum result locally before deep planning.

Proportionally, the minimum result identifies:

```text
current useful Slice boundaries/candidates
+ candidate/current Domain/Aggregate responsibilities relevant to those Slices
+ Slice → Uses → Domain/Aggregate meaning at shallow depth
+ genuine shared/Cross-Cutting owner candidates when material
+ material unresolved boundary questions that can change the selected owner
```

`Broad` means broad enough across the **current planning horizon** to contextualize
the next selected owner; it does not mean exhaustively model the whole
Application. `Shallow` means enough ownership/boundary meaning to choose what to
deepen, not complete Slice or Aggregate realization planning.

Only after this gate is satisfied should owner-local detailed implementation/proof
Requirements Discovery begin. The gate itself must not be inflated into that
deep work.

## 7. Domain / Aggregate Discovery Inside Strategy

Strategy may use `TM-DOMAIN-DISCOVERY` in SUPPORTING role without creating a
separate child Target.

At this stage it is enough to discover per Slice:

```text
candidate Aggregate/domain objects
semantic behavior/rules/actions needed
Behavior Item relation
```

Later, stable public/domain-facing operations/methods may be named when useful.
Incidental code call graphs are not Strategy truth.

## 8. Slice / Aggregate Realization Loop

After the minimum boundary-discovery gate is satisfied (through explicit Strategy
or a local equivalent), realization is intentionally **not forced into one
ordering**.

The Slice→Domain map can reveal useful working groups:

```text
Aggregate A
  used by SL-1, SL-2, SL-3

Aggregate B
  used by SL-3, SL-4
```

Possible valid approaches:

```text
A. deepen several Aggregates first → plan their Slices
B. plan Slice-by-Slice and deepen Domain as each Slice exposes pressure
C. work group-by-shared-Aggregate
D. alternate Domain/Aggregate Modeling ↔ Implementation Slice refinement
```

No approach is the universal SDS order.

Invariant before **deep planning** of one selected Slice or Aggregate:

> The selected owner is contextualized by the current broad/shallow boundary
> result, so deep work refines a known responsibility instead of discovering the
> surrounding Slice/Aggregate topology from scratch.

Deep planning may refine that map. If it materially changes a Slice boundary, an
Aggregate/Domain ownership boundary or a shared owner relation, surface the
Finding and revalidate/update the shallow boundary result before continuing
dependent deep work.

Invariant before exact realization of one Slice:

> Domain meaning for the Aggregates/objects materially touched by that Slice is
> resolved enough that Exact Realization does not have to invent semantic rules.

This does **not** require every Aggregate in the application to be completely
modeled before the first Slice is realized.

## 9. Implementation Slice

```text
selected Slice semantic owner
→ TM-IMPLEMENTATION-SLICE when independent planning depth is useful
```

One normal Slice has one Primary Scenario and one useful/checkable vertical
result. SDS does not split it into frontend/backend/database Slice identities.

Application-layer theory may inform Resolution through Knowledge Basis/Lenses but
is not mandatory Target topology.

## 10. Cross-Cutting

A genuinely shared non-vertical implementation responsibility may surface during
Strategy/Domain/Slice/Test work.

```text
Finding Candidate
→ Core Finding Disposition
→ reuse/form TM-CROSS-CUTTING-CONCERN when one shared owner is justified
```

Consumer-local obligations remain in each Slice. Shared evolution belongs to the
Cross-Cutting owner itself.

## 11. Testing / Proof

Testing is not a later chronological phase.

```text
obvious local proof
→ TM-EXACT-REALIZATION may produce exact tests directly

non-trivial proof method
→ TM-TEST-DESIGN
→ TM-EXACT-REALIZATION

genuine cross-owner proof coordination
→ optional TM-TEST-STRATEGY

real operated/environment Evidence
→ TM-PRACTICAL-TEST
```

Domain/Slice/Test planning may interleave when proof design changes the selected
implementation boundary, under normal revalidation rules.

## 12. Evolution / Change Isolation

Future/change authority is distributed naturally:

```text
Scenario RU-SCEN-03
→ Strategy May Change / Extend / planned future Slice projection
→ Slice Evolution Steps
→ Cross-Cutting Evolution Steps
```

`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` is retained as a compatibility ID/path
but semantically acts as **Evolution / Change Isolation**. It evaluates planned
change pressure; it does not own a Workspace Evolution Map.

Rare independently material workspace-wide architecture choices use ordinary Core
Finding Disposition/Target Formation and may become a Local Target Contract. No
permanent WEUC Target is required.

## 13. Exact Realization / Evidence

```text
sufficiently resolved current Target meaning
→ Core TM-EXACT-REALIZATION
→ exact code/config/tests
→ actual Evidence
→ selective revalidation only where Evidence challenges accepted meaning
```

Current code remains authority for exact technical realization. Semantic planning
must not maintain a stale parallel call-level code mirror.

## 14. Next-Step Resolver

For the current Target ask:

1. Is the current Result sufficiently resolved for its consumer?
2. Is there blocking Generic Q/R/P or Evidence need?
3. Before selecting deep Slice/Domain work, is the minimum boundary-discovery gate satisfied?
4. Is the next useful work another existing natural owner?
5. Is a supporting Target Module enough without a child Target?
6. Does independent unresolved choice justify Target Formation?
7. Is Exact Realization now the narrowest useful next Target?
8. Did new Evidence challenge an upstream owner, requiring explicit revalidation?

Prefer the narrowest owner/action that resolves the real remaining uncertainty.

# LENS-SLICE-VERTICALITY-INTEGRATION — Slice Verticality / Result / Integration

Lens ID: `LENS-SLICE-VERTICALITY-INTEGRATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Keep Slice planning centered on one bounded useful/checkable vertical result, preserve Scenario semantics through decomposition, and keep Strategy/Slice realization relations coherent without turning technical layers into Slices.

## Applicability Gate

Primary for `TM-SLICE-STRATEGY` and `TM-IMPLEMENTATION-SLICE`; supporting for related Cross-Cutting/frontend integration questions.

## Target Inputs / Evidence

Scenario Behavior / Requirements, Behavior Items, Scenario DATA, must-hold conditions, Screen meaning when relevant, Domain/Aggregate position, current code/implementation and material dependency/change Evidence.

## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-SLICE-STRATEGY`: `RU-SSTRAT-01..RU-SSTRAT-03`
- `TM-IMPLEMENTATION-SLICE`: `RU-SLICE-01..RU-SLICE-04`

### Conditional Result Units / Semantic Selectors

- `TM-IMPLEMENTATION-SLICE`: `RU-SLICE-05` when a Focused Part Plan exists
- Cross-Cutting/frontend result meaning when this Lens is used in supporting mode

### Relevant State Units

```text
Questions
Ideas / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit mutation after resolution remain Core Finding-Disposition/lifecycle consequences.

## Useful Vertical Result Integrity

Normal Slice:

```text
one Primary Scenario
+ one bounded useful/checkable result
+ one or more grounded Behavior Items
= legitimate vertical Slice candidate
```

Reject horizontal-only decomposition such as database/backend/frontend phases unless an exceptional prerequisite is itself independently useful/checkable and is explicitly justified as such.

`Behavior Item ≠ Slice`. Several Behavior Items may be realized by one useful vertical Slice.

`INITIAL_VERTICAL` / `EXTENDING_VERTICAL` may be useful descriptive language but are not required classification enums.

## Behavioral Coverage

Check both directions:

```text
material current Behavior Item
→ selected Slice
  OR explicit deferred/outside position
```

and:

```text
selected Slice behavior
→ grounded in Scenario behavior
```

A missing Behavior Item is a decomposition gap. A Slice that invents product behavior is not a valid implementation shortcut.

## Slice / Aggregate Independence

Vertical Slice boundaries and Domain/Aggregate boundaries are different axes.

```text
one Slice
→ may use several Aggregates/domain concepts

one Aggregate/domain concept
→ may be used by several Slices
```

Reject `one Slice = one Aggregate` as an automatic rule.

The canonical planning relation is `Slice → Uses → Aggregate/domain concept`. Generated inverse views need not be persisted as duplicate authority.

## DATA / Screen / Cross-Cutting Relations

Map only relations useful to implementation planning:

- DATA used/produced/changed when material;
- related Screen meaning without taking Screen topology ownership;
- shared Cross-Cutting applicability without transferring canonical ownership.

Frontend realization stays within the normal vertical Slice when it is feature-local.

## Dependency vs Source

A technical dependency/order constraint is not automatically a semantic Source.

Check that implementation sequence reflects real dependency, value/risk/learning or readiness rather than arbitrary technical layer order.

## Strategy Owner Slots

For `TM-SLICE-STRATEGY`, verify that each selected Slice has stable semantic owner identity/addressability.

The owner may be inline, linked or separately materialized. Semantic Slice identity does not imply one file per Slice.

`RU-SSTRAT-03 Selected Slice Owner Register` coordinates Slice semantic identity/addressability only. It does not create a bounded `TM-IMPLEMENTATION-SLICE` Target; normal Target Formation remains authoritative when independently bounded implementation planning is material.

## Runtime Path vs Codebase Integration Path

For detailed `TM-IMPLEMENTATION-SLICE` planning:

```text
Runtime Path
= descriptive running-system path

Codebase Integration Path
= pre-implementation codebase call-level picture:
  concrete existing/planned owners + significant calls + order + responsibility
```

The full call-level template remains in `TM-IMPLEMENTATION-SLICE`.

## Part-Plan Escalation

Mostly understood local call/responsibility may use a lightweight Part Plan.

Material unresolved algorithm/state/integration/architecture choice space surfaces a Finding Candidate. Core Finding Disposition decides whether accepted meaning becomes/refines Question / Idea / Q/R/P / Decision input or another lifecycle consequence; when independently substantial, disposition may surface Target Formation input.

## Typical Findings

Typical Finding Candidates include:

```text
fake horizontal Slice
Behavior coverage gap
Slice invents unowned product behavior
unhelpful one-Behavior-item-per-Slice atomization
one-Slice-one-Aggregate coupling assumption
missing Slice owner addressability
shared concern hidden inside a vertical Slice
dependency mistaken for Source
future pressure prematurely converted into architecture/Slice
Strategy and detailed Slice realization no longer agree
```

## Finding Contract

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / relations — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves actual State/lifecycle/owner consequences.

This Lens does not define new Result Units or mutate accepted owners directly.

## Typical Consumers

Slice Implementation Strategy, Implementation Slice, related Screen/Cross-Cutting/frontend realization planning.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`.

`TM-SLICE-STRATEGY` owns the Slice portfolio/domain relation/semantic-owner-register representation through its own Artifact Proposals. When Target Formation selects/reuses a bounded `TM-IMPLEMENTATION-SLICE` Target, that Target owns detailed Slice planning meaning. This Lens evaluates integrity and must not create or duplicate either owner.

Generated inverse relation maps and code-realization mirrors should not be persisted merely for convenience when they can be derived reliably.

## Guards

```text
Slice cannot redefine Scenario truth for implementation convenience
Behavior Item ≠ Slice
Slice ≠ technical layer
Slice ≠ Aggregate
shared concern applicability ≠ Slice ownership
semantic Slice owner ≠ mandatory Slice file
planned relation map ≠ authoritative current code mirror
```

## Composition

Dependency/change and quality/observability Lenses may join when material. DDD Lens evaluates broad/shallow Domain/Aggregate boundaries in Slice Strategy. UI Lens may join detailed Slice work when spatial/frontend realization is materially in scope.

## Escalation / Revalidation

Detailed Slice planning or implementation Evidence may challenge Strategy decomposition or Domain/Aggregate relations.

Surface the narrow Finding Candidate; Core Finding Disposition decides the actual State/owner/lifecycle consequence, including whether `RU-SSTRAT-01`, `RU-SSTRAT-02`, a Slice owner, Scenario owner or another semantic owner receives bounded revalidation.

## Knowledge Basis

No separate external Knowledge Basis is required for normal use.

Core operational principles are:

- useful/checkable behavior shapes Slices;
- implementation decomposition must remain grounded in Scenario meaning;
- Slice and Aggregate boundaries are independent;
- representation follows semantic ownership rather than one-file-per-entity convention.

Current code/domain/scenario facts are Inputs; this Lens owns only the verticality/integration evaluation perspective.

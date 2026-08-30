# LENS-DOMAIN-MODELING-DDD — Domain Meaning / DDD Pattern Pack

Lens ID: `LENS-DOMAIN-MODELING-DDD`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Use DDD concepts as evidence-driven discovery/evaluation perspectives, never as mandatory pattern matching.

The Lens supports both deeper explicit Domain Targets and the broad/shallow Domain/Aggregate reasoning used by Slice Implementation Strategy.

## Applicability Gate

Primary when `TM-DOMAIN-DISCOVERY` / `TM-DOMAIN-DRAFT` is active.

Also primary for `TM-SLICE-STRATEGY / RU-SSTRAT-02 Domain / Aggregate Realization Map` when broad/shallow Domain/Aggregate boundaries are material to Slice implementation planning.

The depth must follow the host Target. Slice Strategy does not become a full Domain Draft merely because this Lens is selected.

## Target Inputs / Evidence

Scenario Behavior / Requirements, Scenario DATA, Behavior Items, must-hold conditions, Scenario Development / Change Outlook, current code/domain realization, Prototype/implemented Evidence when relevant.

## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-SLICE-STRATEGY`: `RU-SSTRAT-02`
- `TM-DOMAIN-DISCOVERY`: `RU-DDISC-01..RU-DDISC-05`
- `TM-DOMAIN-DRAFT`: `RU-DDRAFT-01..RU-DDRAFT-05`

### Conditional Result Units / Semantic Selectors

- Scenario behavior/DATA when they are Evidence for Domain meaning
- Slice → Uses → Aggregate/domain relations when evaluating implementation realization

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

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and accepted Result mutation remain Core Finding-Disposition/lifecycle consequences.

## Depth Rule

Use only as much Domain detail as the host Target needs.

For Slice Strategy, normal depth is broad/shallow:

```text
identity/lifecycle clues
important invariants
consistency boundaries
cross-boundary coordination
Slice → Uses → Domain relations
current code realization references when useful
```

Normally out of scope for Strategy-depth Domain reasoning:

```text
complete Entity catalog
all Value Objects
all fields/methods
repository/API/persistence design
full internal Aggregate model
implementation-class mirror
```

Deeper reasoning may become normal Domain Target work or detailed Slice planning when independently useful.

## Identity / Entity Evidence

Ask proportionally:

```text
stable identity?
survives behaviors/states?
lifecycle/rules attach?
meaningful across Scenarios/Slices?
```

Guard: noun/field/table ≠ Entity.

## Value Integrity / Value Object

```text
meaningful equality?
validation/integrity?
domain operations?
stable value semantics?
```

Guard: primitive-wrapper ceremony ≠ Value Object.

At Slice Strategy depth, identify value semantics only when they materially affect a boundary; do not enumerate Value Objects for completeness.

## State / Condition

Use matrices only when combinations materially change correctness.

## Impossible State

Find invalid combinations when they reveal a real invariant/consistency boundary.

## Invariant / Policy

Separate must-always-remain-true rules from configurable/current policy, presentation/workflow rule and implementation mechanism.

## Aggregate / Consistency Boundary

The central question is:

> Which state, identity and invariants must stay correct together?

Ask:

```text
which invariants must be protected together?
what lifecycle changes belong together?
what consistency is actually required?
what is outside / externally referenced?
what cross-boundary coordination is required?
does current code already realize a useful boundary?
```

Guard: UI/ORM/DB/read shape ≠ Aggregate ownership.

## Slice / Aggregate Relation

Slice and Aggregate boundaries are independent.

```text
one Slice
→ may use several Aggregates/domain concepts

one Aggregate/domain concept
→ may be used by several Slices
```

The canonical planning relation is:

```text
Slice
→ Uses
→ Aggregate / Domain concept
```

Do not infer one Aggregate per Slice or one Slice per Aggregate.

## Existing Code

For existing applications, current code is authoritative current technical/domain realization truth.

Use code to determine current owners/boundaries where possible. The planning map may record the relevant boundary and relation, but should not persist a stale structural mirror of classes/methods/files that can be obtained reliably from code.

A mismatch between planned semantic boundary and current code becomes Evidence / Finding Candidate input, not an excuse to redefine behavior for implementation convenience.

## Change Axis

Use known Scenario Development / Change Outlook and other credible change pressure to test whether a proposed boundary is accidental or naturally localized.

Do not introduce generalization merely because a future change is imaginable.

## Typical Findings

Typical Finding Candidates include:

```text
identity/lifecycle boundary clue
invariant/policy distinction
Aggregate/consistency candidate
candidate Aggregate unsupported by actual invariant
cross-boundary coordination
current code owner reusable
current code boundary conflicts with required semantics
Slice/Aggregate one-to-one assumption
Domain detail exceeds host Target depth
no separate Domain abstraction useful
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

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves actual State/lifecycle/owner consequences. Uncertainty exposed by a finding may be dispositioned into Core Q/R/P or other State; Q/R/P is not the Lens finding itself.

This Lens does not define Result Units or directly mutate accepted Domain/Slice meaning.

## Typical Consumers

Slice Implementation Strategy, Domain Discovery/Draft, Implementation Slice and Test Design when Domain correctness matters.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`.

When used by `TM-SLICE-STRATEGY`, the relevant planning meaning belongs in `RU-SSTRAT-02 Domain / Aggregate Realization Map`; this Lens must not create a parallel Domain artifact.

When used by an explicit Domain Target, representation follows that Target contract.

Generated code-realization traces should normally be obtained on demand rather than persisted as duplicate technical truth.

## Guards

```text
DDD pattern name is never sufficient Evidence
noun/table/DTO ≠ Entity
database relationship ≠ Aggregate boundary
Slice ≠ Aggregate
broad Strategy discovery ≠ full Domain Draft
implementation convenience ≠ semantic authority
planned map ≠ authoritative current-code mirror
```

## Composition

Slice Verticality Lens joins Strategy/Slice work. Dependency/change and quality lenses join when material. Test/observability perspectives may join when Domain correctness must be proven or observed.

## Escalation / Revalidation

Later Slice planning, Scenario change or implementation Evidence may challenge a Domain/Aggregate position.

Surface the narrow Finding Candidate. Core lifecycle decides whether the Strategy map, explicit Domain Target, Slice owner, Scenario owner or another owner is revalidated.

## Knowledge Basis

No external Knowledge Basis is required for normal use.

Operational principles:

- Domain concepts/identity/invariants/consistency boundaries follow behavioral Evidence, not pattern names.
- DDD patterns are modeling aids, not required architecture.
- broad/shallow discovery should stay shallow until deeper detail is actually needed.
- current code remains the current implementation/domain realization authority.

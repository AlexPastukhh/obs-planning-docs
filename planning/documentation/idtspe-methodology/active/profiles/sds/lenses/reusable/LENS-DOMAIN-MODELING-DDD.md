# LENS-DOMAIN-MODELING-DDD — Domain Meaning / DDD Pattern Pack

Lens ID: `LENS-DOMAIN-MODELING-DDD`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Use DDD concepts as evidence-driven discovery/evaluation perspectives, never as mandatory pattern matching.

## Applicability Gate

Primary when Domain Discovery/Draft is active.

## Target Inputs / Evidence

Scenario, Scenario DATA, Behavior Items, must-hold conditions, Prototype/current implementation Evidence.

## Identity / Entity Evidence

```text
stable identity?
survives behaviors/states?
lifecycle/rules attach?
meaningful across Scenarios?
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

## State / Condition

Use matrices only when combinations materially change correctness.

## Impossible State

Find invalid combinations not visible from one transition row.

## Invariant / Policy

Separate must-always-remain-true rules from configurable/current policy, presentation/workflow rule and implementation mechanism.

## Aggregate / Consistency Boundary

```text
which invariants must be protected together?
what lifecycle changes belong together?
what consistency is actually required?
credible Root / owned children/state?
what is outside / externally referenced?
what cross-boundary coordination is required?
```

Guard: UI/ORM/DB/read shape ≠ Aggregate ownership.

## Change Axis

Use L5 for evidence-backed variation/generalization pressure. Domain meaning comes first.

## Findings / Outputs

concept/entity/value candidates, lifecycle/state findings, invariants/policies, aggregate boundaries, no-Domain finding and Q/R/P.

## Typical Consumers

Domain Discovery/Draft; selected findings inform Slice/Test/L5 architecture reasoning.

## Artifact / File Implications

`NONE_DIRECT / RETURN_TO_TARGET_OWNER`, except that future-evolution findings are handed to L5/WEUC when that perspective is active.

Current accepted Domain meaning is represented through `TM-DOMAIN-DRAFT / AP-DOM-01`. This DDD Lens must not duplicate that Target-result representation. If a material future Domain path is discovered, `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE / AG-L5-02` is the canonical proposer for an Evolution section or promoted `<domain-owner>.evolution.md` companion.

## Guards

DDD pattern name is never sufficient Evidence.

## Composition

L3 for weak semantic claims; L5 for change pressure; L6/Test pack for Domain Verification Meaning.

## Escalation / Revalidation

Later Scenario Evidence may reopen Domain; architecture convenience cannot redefine it.

## High-Level Example — Self-Contained Walkthrough

### Situation

Scenario planning repeatedly refers to one captured item, its source context and rules about valid accepted state.

The team wonders whether DDD concepts are useful.

### Why This Lens

The Domain Lens tests DDD pattern candidates against evidence rather than applying patterns by naming convention.

### Walkthrough

Ask:

```text
CaptureItem:
  stable identity/lifecycle?

SourceContext:
  meaningful value equality/integrity?

accepted state:
  invariant?

several captured items:
  must they be transactionally consistent together?
```

Evidence may support:

```text
CaptureItem Entity
SourceContext Value Object
one-item consistency boundary
```

but reject:

```text
large ResearchAggregate
```

because no invariant requires such grouping.

### Result

The Lens produces evidence-backed concept/pattern findings for Domain Discovery/Draft.

### Boundary / Lesson

A noun is not automatically an Entity.

A database relationship is not automatically an Aggregate boundary.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Domain concepts/identity/invariants/consistency boundaries follow behavioral evidence and change meaning, not pattern names.
- DDD patterns are candidate modeling aids; implementation convenience cannot become Domain authority.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

The operational DDD principles needed by this methodology are embedded here; future deeper domain theory may be referenced without changing this Lens ownership.

## Provenance

Lossless extraction of the pre-Lens DDD specialized pack.

# LENS-DOMAIN-MODELING-DDD — Domain Meaning / DDD Pattern Pack

Lens ID: `LENS-DOMAIN-MODELING-DDD`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Use DDD concepts as evidence-driven discovery/evaluation perspectives, never as mandatory pattern matching.

## Applicability Gate

Primary when Domain Discovery/Draft is active.

## Target Inputs / Evidence

Scenario, Scenario DATA, Behavior Items, must-hold conditions, Prototype/current implementation Evidence.



## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-DOMAIN-DISCOVERY`: `RU-DDISC-01..RU-DDISC-05`
- `TM-DOMAIN-DRAFT`: `RU-DDRAFT-01..RU-DDRAFT-05`

### Conditional Result Units / Semantic Selectors

- Scenario semantic objects/behavior when they are evidence for Domain meaning

### Relevant State Units

```text
Questions
Ideas / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

### Context

- Scenario DATA / Behavior
- requirements/invariants
- current Domain model
- implementation Evidence when it challenges model assumptions

Context availability does not mean this Lens audits all context. The deliberate focus remains the Result/State meaning named above.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the Analysis Surface through this Lens perspective.
- `CHECK` evaluates current meaning against this Lens's criteria/guards.
- `REFINE` surfaces a proposal for more precise/missing meaning where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

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

## Typical Findings

concept/entity/value candidates, lifecycle/state findings, invariants/policies, aggregate boundaries, no-Domain finding and Q/R/P.



## Finding Contract

The items above are `Finding Candidates`, not Lens-owned State Unit kinds or direct Result mutations.

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves the actual State/lifecycle/owner destination. Normal authority/resolution must occur before accepted Result Unit meaning changes.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Typical Consumers

Domain Discovery/Draft; selected findings inform Slice/Test/L5 architecture reasoning.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`. Core Finding Disposition may resolve current Domain meaning back to the Domain Target. A future-evolution Finding Candidate may call for WEUC/L5 evaluation; only suspected project-global meaning may carry `TM-WEUC` as a likely-owner hint, and Core resolves the actual handoff/owner consequence.

Current accepted Domain meaning is represented through `TM-DOMAIN-DRAFT / AP-DOM-01`. This DDD Lens must not duplicate that Target-result representation. If a material future Domain path is discovered, WEUC/L5 evaluation surfaces a Finding Candidate; Core Finding Disposition resolves any accepted local evolution meaning/owner, and only then may `AG-L5-02` propose an Evolution section or promoted `<domain-owner>.evolution.md` supporting representation. Documentation / Representation + P-14 / TF-10 decide materialization.

## Guards

DDD pattern name is never sufficient Evidence.

## Composition

L3 for weak semantic claims; L5 for change pressure; L6/Test pack for Domain Verification Meaning.

## Escalation / Revalidation

Later Scenario Evidence may challenge Domain meaning and trigger Core revalidation/reopen disposition; architecture convenience cannot redefine it.

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

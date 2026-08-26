# LENS-DOMAIN-MODELING-DDD — Domain Meaning / DDD Pattern Pack

Lens ID: `LENS-DOMAIN-MODELING-DDD`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Use DDD concepts as evidence-driven discovery/evaluation perspectives, never as mandatory pattern matching.

## Applicability Gate

Primary when Domain Discovery/Draft is active.

## Typical Sources / Evidence

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

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-DOM-01
CONTENT_KIND: SELECTED_DOMAIN_MEANING
WHEN: DDD Lens finding is accepted by Domain Draft
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: selected Domain owner
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <domain-owner>
CONTENT: accepted current concept/invariant/consistency meaning
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-DOM-02
CONTENT_KIND: DOMAIN_EVOLUTION
WHEN: WEUC/L5 shows material future Domain change path
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: base Domain owner remains current truth
REPRESENTATION: COMPANION_ARTIFACT
FILE_OR_ARTIFACT: <domain-owner>.evolution.md
CONTENT: future Domain path/change isolation/transition plan
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

Selected current Domain meaning projects into canonical Domain owner artifact(s) only after Domain Draft accepts it.

**PREFERRED evolution companion** `<domain-owner>.evolution.md` when future Domain extension/change paths are material under the WEUC Lens.

Do not create one file per DDD pattern candidate during discovery; physical boundaries follow semantic/addressability evidence.

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

## Provenance

Lossless extraction of the pre-Lens DDD specialized pack.

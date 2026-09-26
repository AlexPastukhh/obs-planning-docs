<a id="lens-target-resolution-coverage"></a>
# LENS-TARGET-RESOLUTION-COVERAGE — Target Resolution Coverage

> Semantic Owner Dependency
> - `EXTENDS` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.

Lens ID: `LENS-TARGET-RESOLUTION-COVERAGE`
Status: active frequent-conditional Core Lens

## Purpose

Evaluate whether the current Target scope, material Target Resolution Requirements and actual work composition provide sufficient coverage without inventing duplicate semantic owners or silently losing material needs.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> Target scope/coverage is being formed/refined, Unit/Module responsibilities may overlap/gap, a material concern may be unrouted, or completion/readiness depends on sufficient coverage.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

Target scope/coverage is being formed/refined, Unit/Module responsibilities may overlap/gap, a material concern may be unrouted, or completion/readiness depends on sufficient coverage.

### Opening Triggers

The Unit begins with partial/uncertain coverage, scope formation/refinement, open material concerns without destinations, or an explicit completeness/readiness question.

### During-work Recheck / Invalidation Triggers

Target scope, Requirements, applied Target Modules, Unit responsibilities/dispositions, Contextual Units, open concerns, or applicability changes enough to alter coverage.

### Closing Triggers / Revalidation Conditions

The result makes a completeness/readiness/coverage claim or closes/reframes scope; verify all material Requirements/concerns are covered or explicitly OPEN/BLOCKED/DEFERRED.

### Confident-False / Stop Conditions

Coverage is explicit/coherent and no gap/overlap/unrouted concern/readiness question exists.

### False-negative Risks

“Ready” can be asserted from local completion while another Requirement/Unit remains uncovered; closing must inspect target-wide coverage evidence.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
Use only material current context, proportionally:

```text
Target purpose / desired result
Target scope/problem surface
current task-derived + universal Core Target Resolution Requirements
applied Target Module Models / 0..N Target Module Instance portions when present
Module-defined Unit inventories and dispositions for each applied Model
applicable Core-defined Units
actually formed Contextual Units
open material concerns / Findings / Q/R/P
relevant Sources / Decisions
```

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Supported Operations / Evaluation Workflow

Use the canonical Lens operation vocabulary proportionally:

```text
ANALYZE
  inspect Requirement ↔ coverage ↔ Unit/owner relationships

CHECK
  test completeness, gaps, overlap and natural ownership

REFINE
  propose a clearer Requirement/scope/responsibility formulation as a Finding Candidate

CHALLENGE
  stress assumptions that prepared coverage is sufficient or that one Target boundary is still coherent
```

The Lens may compare prepared and contextual coverage during `ANALYZE/CHECK`; `COMPARE` and `STRESS-TEST` are not separate Core operation kinds.

## Evaluation Questions

```text
Is every material Requirement sufficiently covered or explicitly OPEN/BLOCKED/DEFERRED?
Does any material question/concern reveal a missing or poorly formed Requirement?
Does any Requirement need bounded work but have no suitable Unit responsibility?
Does a Unit exist without a material responsibility it can justify?
Does each applied Target Module cover a compatible recurring part of the current scope well enough to remain useful, without hiding an independent responsibility that belongs on another Target?
Should uncovered meaning use an applicable Core-defined Unit, a Contextual Unit, or a scope split/new Target?
Are any material concerns being lost because their natural owner/destination is unclear?
```

## Broad Discussion / Key Points Contribution

When useful, summarize only the material coverage gap/overlap and the smallest next resolution consequence. Do not manufacture a full Target inventory when no such review is needed.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

Typical Finding Candidates include:

```text
MISSING_REQUIREMENT_COVERAGE
MISSING_UNIT_RESPONSIBILITY
OVERLAPPING_UNIT_RESPONSIBILITY
TARGET_MODULE_PARTIAL_COVERAGE
SCOPE_TOO_BROAD
SCOPE_TOO_NARROW
UNROUTED_MATERIAL_CONCERN
PREPARED_UNIT_NOT_ACTUALLY_APPLICABLE
```

The Lens surfaces Finding Candidates. It does not itself change Target scope, create Units, apply Target Modules or own Requirement coverage. Core Finding Disposition plus Target Formation/Resolution owns those consequences.

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

```text
Target Formation / Resolution
P-03 Target
P-12 Validation
Target Module maintenance/refinement when recurring coverage gaps are discovered
Integration/checkpoint readiness when unresolved coverage is material
```

## Guards / Boundaries
```text
Lens result ≠ Requirement coverage by itself
Lens Finding ≠ automatic scope change
Lens Finding ≠ automatic Unit creation
prepared Unit exists ≠ Unit is actually applicable to the current Requirement
coverage review ≠ permission to duplicate semantic ownership
```

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

A material coverage Finding is routed through Core Finding Disposition. Target Formation/Resolution may then refine scope, reopen/clarify a Requirement, apply/reject prepared coverage, define a Contextual Unit, or surface a new Target candidate. Material scope/Source/Requirement changes may justify reapplying this Lens.

## Artifact / File Implications

No dedicated artifact is required by this Lens. If a material coverage Finding or resulting Decision must survive, normal semantic owner + P-14 persistence/representation machinery decides placement.

## Knowledge Basis

Mode: `INLINE`

Embedded principles:

- Requirements are grounded in the current task/scope/Sources plus universal Core Target needs;
- Target Modules provide prepared recurring-scope analysis and Unit coverage, not a third semantic source of Requirements;
- one Unit may cover several Requirements and one Requirement may require several owners/Units;
- contextual work fills only the material gaps left after direct/prepared coverage is considered;
- natural semantic ownership is preferred over duplicate coverage records.

## Provenance

Core frequent-conditional Lens introduced with the Target Resolution Requirement / Core-defined Target Work Unit model. Canonical Requirement/Unit semantics remain owned by the Target work contracts, not by this Lens.

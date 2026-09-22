# LENS-TARGET-RESOLUTION-COVERAGE — Target Resolution Coverage

Lens ID: `LENS-TARGET-RESOLUTION-COVERAGE`
Activation: `FREQUENT_CONDITIONAL`
Status: active frequent-conditional Core Lens

## Purpose / Evaluation Objective

Evaluate whether the current Target scope, material Target Resolution Requirements and actual work composition provide sufficient coverage without inventing duplicate semantic owners or silently losing material needs.

## Applicability Gate

Apply proportionally when a Target exists and one or more of these are material:

```text
Target scope is still being formed/refined
Target Module coverage is partial or uncertain
Core/Module/Contextual Unit responsibilities overlap or leave gaps
an open material question/concern may reveal a missing Requirement
Target completion/readiness depends on whether coverage is sufficient
```

`NO_MATERIAL_COVERAGE_ISSUE` is a valid outcome. Do not run the Lens merely because a Target exists.

## Target Inputs / Evidence

Use only material current context, proportionally:

```text
Target purpose / desired result
Target scope/problem surface
current task-derived + universal Core Target Resolution Requirements
selected Target Module Model / Target Module Instance when present
Module-defined Unit inventory and dispositions
applicable Core-defined Units
actually formed Contextual Units
open material concerns / Findings / Q/R/P
relevant Sources / Decisions
```

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
Does the selected Target Module cover the recurring part of the current scope well enough to remain useful?
Should uncovered meaning use an applicable Core-defined Unit, a Contextual Unit, or a scope split/new Target?
Are any material concerns being lost because their natural owner/destination is unclear?
```

## Broad Discussion / Key Points Contribution

When useful, summarize only the material coverage gap/overlap and the smallest next resolution consequence. Do not manufacture a full Target inventory when no such review is needed.

## Findings / Outputs

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

## Typical Consumers

```text
Target Formation / Resolution
P-03 Target
P-12 Validation
Target Module maintenance/refinement when recurring coverage gaps are discovered
Integration/checkpoint readiness when unresolved coverage is material
```

## Guards / Anti-Patterns

```text
Lens result ≠ Requirement coverage by itself
Lens Finding ≠ automatic scope change
Lens Finding ≠ automatic Unit creation
prepared Unit exists ≠ Unit is actually applicable to the current Requirement
coverage review ≠ permission to duplicate semantic ownership
```

## Composition

Combine with L1 Need / Value / Scope when the Target boundary itself is in question, L2 Authority / Source-of-Truth / Reuse when owner/Source authority is material, and L4 Dependency / Change Impact when a scope/coverage choice crosses dependent owners. Target Module Lens Profiles may add family-specific perspectives without replacing this generic coverage check.

## Escalation / Revalidation

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

# Domain Draft Template

Status: active reusable recommended template
Purpose: create/review a separate Domain owner only when conceptual language, lifecycle, rules or boundaries materially improve planning.

Canonical workflow: [`../domain-planning-workflow.md`](../domain-planning-workflow.md)
Cross-cutting context: [`../requirements-and-change-context.md`](../requirements-and-change-context.md)
Generic Architecture Lens / Change Axes: [`../../architecture-planning/README.md`](../../architecture-planning/README.md)
Detailed workspace contract: [`../detailed-planning/README.md`](../detailed-planning/README.md)

## Workspace Shape

```text
DOM-X/
├── README.md
├── domain.md
├── ideas/
└── variants/       # only when a second integrated Domain design exists
```

Domain does not require `visual/` by default.

## Domain

| Field | Value |
|---|---|
| Domain ID | <stable ID> |
| Title / responsibility | <title> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Related Scenarios / Behavior | <links> |
| Related Requirements | <links> |
| Relevant Change Axes | <links when material> |

### Purpose / Boundary
<Why a separate conceptual owner exists, what meaning it owns and what remains outside.>

### Stable Semantic Core
<Identities/concepts/meaning that current selected behavior requires to remain coherent.>

### Terms / Concepts
<Canonical conceptual language supported by current planning.>

### Relationships
<Material conceptual relationships.>

### Discovery Evidence — When Material

### State / Condition Matrix

| Current condition | Action / behavior | Result condition | Allowed? | Required guarantee | Failure / no-write guarantee | Evidence |
|---|---|---|---|---|---|---|

### Impossible State / Combination Review

| State / data combination | Valid? | Why | Protecting invariant / consistency rule | Evidence |
|---|---|---|---|---|

## Lifecycles / States
<When lifecycle meaning materially helps.>

### Rules / Invariants
<Meaning that must remain true for the current Domain to be correct.>

### Policies / Likely Variation
<Current choices that may legitimately vary, distinguished from invariants.>

### Change-Axis / Variation Review
<For each material evidence-backed Change Axis, describe expected propagation and whether a boundary/seam is justified now. Do not generalize from speculation alone.>

### Rejected Premature Generalizations — When Material
<Abstractions intentionally not introduced because current requirements/evidence do not justify them.>

### Current Scenario / Requirement Stress Check
<Confirm current selected behavior and Requirements can be represented simply without Domain inventing behavior.>

### Realization Sanity Check — When Material
<Stress representative current Scenarios against invariant enforcement, persistence/transaction shape, integration/remote boundaries, important algorithms/data volume and verification feasibility. Slightly more code is not a reason to distort correct Domain meaning; material correctness/performance/consistency/technical impossibility is valid upstream evidence.>

### Domain Verification Meaning — When Material
<Derive technology-neutral invariant examples, allowed/forbidden transitions, business-rule examples, important derived-value examples and cross-object consistency cases. This is verification meaning derived from Domain semantics, not a second Domain authority or a requirement for a separate file.>

### Scenario / Behavior / Requirement Traceability
<Link relevant owners without copying detailed flow/Requirement bodies unnecessarily.>

### Relevant Implementation-Scoped Ideas
<Link generic implementation Ideas considered. If selected, integrate current meaning here and mark the Idea promoted rather than preserving duplicate authority.>

## Cross-File Dependencies / Reference Object Candidates — When Material

| Source Owner | Meaning Used Here | Use Here | Usage Mode | RO Candidate | Materialized RO |
|---|---|---|---|---|---|
| <owner> | <canonical fragment/reference> | <Domain use> | semantic link / paraphrase / exact-literal candidate | yes / no | no / existing `ro_*` |

A consumer-side candidate note does not redefine source meaning. Domain rules/invariants may themselves be source candidates when exact literal reuse across Scenario/Slice/verification owners is genuinely useful.

## Current Decisions
<Use the shared detailed-planning Current Decisions contract.>

## Questions / Risks / Problems
<Each real unit includes Current Draft Plan + Finding + Relation / Impact On Current Draft Plan. When Related Idea(s) exist, apply the shared Idea ↔ Q/R/P mirror/reference rule.>

If none: `No material unresolved issues identified.`

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to current Domain meaning.>

## Boundary Rules

```text
simplest correct current model
+ cheap justified evolution
≠ maximum theoretical extensibility
```

Domain meaning does not silently override Scenario/Screen/Requirement truth. When current owners conflict, perform explicit consistency review and update the real selected owner(s).

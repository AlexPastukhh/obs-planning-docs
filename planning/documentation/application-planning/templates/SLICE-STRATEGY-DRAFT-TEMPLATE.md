# Slice Strategy Draft Template

Status: active reusable recommended template
Purpose: plan/review decomposition and delivery order for Implementation Slices before planning individual Slices in detail.

Canonical workflow: [`../slice-planning-workflow.md`](../slice-planning-workflow.md)
Cross-cutting context: [`../requirements-and-change-context.md`](../requirements-and-change-context.md)
Application Realization workflow: [`../application-realization-workflow.md`](../application-realization-workflow.md)

Blank sections are not requirements. Skip explicit strategy artifacts for trivial work that does not benefit from decomposition planning.

## Strategy Identity

| Field | Value |
|---|---|
| Strategy ID | <stable ID when useful> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Application / implementation target | <owner/context> |
| Related Scenarios | <links> |
| Related Domain owners | <links when applicable> |

## Inputs / Coverage

### Scenarios / Behavior
<Current behavior this implementation strategy must eventually cover.>

### Requirements
<Confirmed Requirements and constraints that materially shape delivery.>

### Domain Verification Meaning — When Present
<Invariant/transition/rule/consistency examples that selected Slices must preserve and eventually verify.>

### Application Realization Findings — When Present
<Material runtime/persistence/integration/transaction/algorithm/verification constraints that should influence decomposition/order without redefining upstream semantics.>

### Change Axes / Change Pressure
<Only evidence-backed expected variation/pressure that should influence coupling/boundary evaluation.>

### Relevant Implementation-Scoped Ideas
<Link candidate Ideas; they are not selected implementation truth merely because they are listed.>

## Decomposition Goals

```text
<earliest useful result>
<important risk/learning goal>
<integration/migration constraint>
<other material strategy goal>
```

## Candidate Slices

| Slice | Deliverable/checkable result | Scenario / Requirement coverage | Dependencies | Learning / risk value | Order |
|---|---|---|---|---|---|
| <SL-X> | <vertical result> | <links> | <dependencies> | <why> | <n> |

## Alternative Decomposition — When Material

<Describe only a genuinely different integrated slicing route. Use normal Idea/Variant reasoning when a real choice exists.>

## Change-Axis / Coupling Review

<Where would likely changes propagate under this decomposition? Which seams are justified now, and which possible abstractions are intentionally deferred as speculative?>

## Product Priority / Implementation Sequence — When Material

| Item | Meaning |
|---|---|
| Product / Scenario priority | <what is actually wanted sooner> |
| Recommended implementation order | <technical sequence> |
| Why they differ | <dependency/cleanliness/risk/change-path reason> |
| Minimum prerequisite | <only work that should precede the priority result> |
| Deferred lower-priority work | <what is intentionally not implemented now> |
| WEUC / architecture evidence | <likely instance/path/pressure/trade-off> |
| Risk if future never happens | <Architectural Tax / speculative work> |

Architecture/Slice planning recommends implementation sequence; it does not redefine product priority or pull a whole lower-priority feature forward without sufficient evidence.

## Current Selected Strategy

<Selected decomposition/order and why.>

## Current Decisions
<Use the shared Planning Concern/Decision trace contract when material.>

## Area Concern Register — When Material
<Inline/link the current strategy-area register when durable concerns exist.>

## Planning Concerns / Q/R/P
<Use the shared Concern model. Keep product-priority/user-owned unknowns explicit; AI may recommend technical implementation sequence only from sufficient architecture/dependency evidence. Group related Q/R/P by shared resolution surface and keep member Priority/Concern Category/Status.>

If none: `No material unresolved issues identified.`

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to the current Slice Strategy.>

## Boundaries

```text
Slice Strategy
→ decomposition/order authority

Individual Slice
→ one selected implementation increment authority

Scenario / Screen / Requirement / Domain
→ upstream semantic authority
```

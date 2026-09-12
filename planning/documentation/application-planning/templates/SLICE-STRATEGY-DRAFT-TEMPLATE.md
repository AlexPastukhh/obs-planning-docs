# Slice Coordination Draft Template — Legacy Filename

Status: compatibility/supporting template; **non-authoritative** and not a Target/Result-family template
Purpose: optionally represent a derived decomposition/order/coverage coordination view when that view has independent coordination value. It does not restore `TM-SLICE-STRATEGY`, does not gate Slice Discovery, and may be omitted completely.

Canonical workflow: [`../slice-planning-workflow.md`](../slice-planning-workflow.md)
Cross-cutting context: [`../requirements-and-change-context.md`](../requirements-and-change-context.md)
Application Realization workflow: [`../application-realization-workflow.md`](../application-realization-workflow.md)

Blank sections are not requirements. Skip this artifact whenever the coordination view adds no material value. Current Slice semantics remain in Feature + `TM-IMPLEMENTATION-SLICE` and, when justified, `TM-SLICE-OWNER`.

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

### Relevant Implementation-Scoped Proposals
<Link candidate Proposals; they are not selected implementation truth merely because they are listed.>

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

<Describe only a genuinely different integrated slicing route. Use normal Proposal/Decision reasoning when a real choice exists.>

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

## Current Derived Coordination View

<Derived decomposition/order coordination and why it is useful.>

## Current Decisions
<Use the canonical Proposal/Decision lifecycle contract when material.>

## Q/R/P Index — When Material
<Inline/link a lightweight index only when distributed durable Q/R/P needs navigation; natural owners remain authoritative.>

## Q/R/P
<Use the canonical Q/R/P lifecycle contract. Keep product-priority/user-owned unknowns explicit; AI may recommend technical implementation sequence only from sufficient architecture/dependency evidence. Group related Q/R/P by shared resolution surface and keep member Priority / Review Category / Status only when useful.>

If none: `No material unresolved issues identified.`

## Potential Simplifications / Better Routes — When Material
<Only material unselected changes to this derived coordination view.>

## Boundaries

```text
Derived Slice coordination view
→ non-authoritative decomposition/order support only

TM-IMPLEMENTATION-SLICE
→ one selected transient end-to-end realization discovery

optional TM-SLICE-OWNER
→ durable Slice responsibility when independently useful

Feature / Scenario / Screen / Domain / Shared
→ their own upstream/peer semantic authority
```

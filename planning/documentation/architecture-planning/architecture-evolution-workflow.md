# Architecture Evolution Workflow

Status: active reusable workflow
Scope: plan/review coherent Workspace Architecture evolution when several related architecture decisions/risks must move together.

Generic Idea/Variant semantics: [`../idea-planning-principles-and-terminology.md`](../idea-planning-principles-and-terminology.md)
Shared Planning Concern / generic Decision trace semantics: [`../planning-concerns-and-decisions-model.md`](../planning-concerns-and-decisions-model.md)

## 1. When To Use

Use this workflow when one local Architecture Decision is insufficient because multiple owners/boundaries must change coherently.

Examples include reorganizing a documentation repository with unclear ownership/navigation, splitting an overloaded state responsibility, or evolving an application architecture for a selected multi-tenancy/provider direction.

## 2. Inputs

```text
Current Architecture State
important current/future Workspace UCs
Change Pressure / Change Axes / Hot Paths
Maintainability Risks
Requirements / Constraints
existing Architecture Decisions / Revisit Triggers
```

## 3. Define Target Problems, Not Target Patterns

State what important work is currently too expensive/risky/opaque and which constraints the target must satisfy.

## 4. Form Integrated Evolution Alternatives

When alternatives are material, use generic `Idea Variants` whose Proposed Answers are coherent target architectures rather than isolated local mechanisms. Do not create a separate Evolution-Variant or Architecture-Variant type.

## 5. Evaluate Important Paths

For each candidate inspect representative current/future Workspace UCs, contextual WEUC Instances and Runtime paths where applicable. Use the canonical Work-Cost Model: understanding/analytical, mutation/evolution, verification/diagnosis/operation and representative Application runtime costs, plus preparation-now vs deferred cost, migration, reversibility and Architectural Tax.

## 6. Select Target Architecture

When Idea Variants were used, identify one `Current Selected Variant` and integrate that selected meaning into the target architecture. Record selected responsibility/boundary changes, Architecture Intent, intentionally deferred complexity and transition constraints/order.

## 7. Route Realization Downstream

Architecture Evolution stops before detailed implementation task/Slice planning. Route realization to the appropriate Workspace-specific responsibility (for example Application Realization/Slice Planning or documentation-maintenance work).

## 8. Temporal Guard

Later justified evolution does not prove an earlier simpler architecture was wrong. Record what new evidence/pressure now pays for the change.
## Concern / Decision Integration

When evolution is driven by several related Questions/Risks/Problems, group them by shared resolution surface rather than turning each into an independent architecture project. Preserve member Priority/Concern Category/Status, AI Comment/user-owned unknowns, selected Decision relations and residual Risks/Problems through the shared Concern model.

One coherent evolution may address several Concern Groups/Decisions; trace relations are many-to-many when materially useful.

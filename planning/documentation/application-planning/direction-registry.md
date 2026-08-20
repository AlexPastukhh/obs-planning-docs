# Solution And Application Planning Direction Registry

Status: active reusable-family semantic Direction Registry
Parent: [`../../direction-registry.md`](../../direction-registry.md)
Child Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## `DIR-PLAN-SOLUTION` — Plan A Solution / Workflow / Application

**Purpose:** select the best-supported real-world whole solution/workflow, compare viable existing routes with custom Application Concept candidates when relevant and, when own Application responsibility exists, progressively prototype, define current user-visible behavior/spatial requirements, model Domain meaning when useful and plan delivery through Slices.

**Topology:** supported Use Cases are independently activatable/proportional. `UC-PLAN-GOAL-MAP` may maintain a current working map alongside the relevant planning work without becoming a mandatory stage.

```text
Need / Desired Result
→ real-world / whole-solution workflow work
→ Open Solution Slot(s) when the best fill is unknown
→ viable existing alternatives + candidate fills
→ Application Concept review when own software is a material candidate
→ whole-solution selection
→ Application responsibility when applicable
→ Prototype Planning when useful
   → Prototype Scenarios / Prototype Screens / candidate Requirements
   → rough representation / walkthrough when useful
→ Scenario discovery
→ detailed Scenario Draft workspaces + Screen spatial owners when useful
→ optional Domain Discovery
→ optional Domain review/selection + verification meaning
→ optional Application Realization review
→ optional Slice Strategy
→ optional Implementation Slice / verification work
→ repeated cross-owner / whole-solution consistency review
```

Application-specific Requirements / Future Scenario Ideas / implementation-scoped Ideas are owned by [`requirements-and-change-context.md`](requirements-and-change-context.md). Generic Workspace Change Pressure / Change Axis semantics are owned by sibling [`../architecture-planning/`](../architecture-planning/); application owners contribute evidence and consume those semantics where architecture/Domain/Slice reasoning needs them.

Shared low-level contract: [`detailed-planning/README.md`](detailed-planning/README.md).

Supported Use Cases are capabilities, not one mandatory ceremony.

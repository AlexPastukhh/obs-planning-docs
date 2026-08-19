# Workspace Architecture Planning Documentation Index

Status: active reusable methodology-family index
Scope: understand, evaluate and evolve the architecture of an evolving Workspace through the work it must support, using the least complexity justified by current correctness, important Workspace work and evidence-backed change pressure.

## Direction

[`DIR-PLAN-ARCHITECTURE`](direction-registry.md) is a reusable peer Direction to Solution/Application Planning. It applies to evolving engineered Workspaces such as codebases, documentation/planning repositories, automation projects, data pipelines and knowledge/workspace systems.

Architecture Planning does not assume a separate architecture phase or architecture artifact. A valid result is that no additional architectural structure is justified now.

## Use Cases

Current supported capabilities are:

```text
UC-PLAN-ARCH-STATE
→ understand/review current Workspace Architecture State

UC-PLAN-ARCH-PATH
→ trace/evaluate one architecture-relevant Workspace or runtime path

UC-PLAN-ARCH-PRESSURE
→ establish/review Workspace change pressure and evidence-backed Change Axes

UC-PLAN-ARCH-DECISION
→ plan/review one material Architecture Decision

UC-PLAN-ARCH-EVOLUTION
→ plan/review coherent multi-decision Workspace Architecture evolution
```

The Use Cases are independently activatable and proportional. Registry order is not a mandatory waterfall.

`workspace-use-case-discovery-workflow.md` is a supporting workflow primarily used by `UC-PLAN-ARCH-PRESSURE`; it does not currently receive a separate Use Case merely because its result can be useful independently.

## Core Model

```text
Current Workspace Reality
+
important Workspace Use Cases
  - change/write
  - read/understand
  - inspect/review
  - diagnose/operate
  - verify
+
important concrete Workspace changes
+
Planned / Likely Extensions
  → expected future Workspace Use Cases
  → affected current Workspace Use Cases
+
Requirements / Constraints
+
observed history when useful

↓

Workspace Work Paths
  - Understanding Paths
  - Change Paths
+
Runtime Realization Paths when applicable

↓

Change Pressure
↓
Change Axes + Workspace Change Hot Paths
↓
Architecture State / Decisions / Evolution
```

## Read Order

1. `architecture-planning-responsibility-map.md`
2. `architecture-planning-principles-and-terminology.md`
3. `workspace-use-cases-and-change-pressure.md`
4. `direction-registry.md` + `use-case-registry.md`
5. the workflow for the selected Use Case
6. templates only when a stable materialized result helps
7. `examples/ARCHITECTURE-PLANNING-WORKED-EXAMPLE.md` when an integrated example is useful

## Files

- `architecture-planning-principles-and-terminology.md` — stable universal Architecture Lens concepts/invariants.
- `workspace-use-cases-and-change-pressure.md` — Workspace Use Cases, Work Paths, Extensions, Change Pressure, Change Axes and Hot Paths.
- `workspace-use-case-discovery-workflow.md` — supporting discovery of material current/future Workspace Use Cases.
- `architecture-path-analysis-workflow.md` — Understanding/Change/Runtime path tracing and qualitative architecture analysis.
- `architecture-change-pressure-workflow.md` — UCs/cases/extensions/requirements/history → pressure → axes/hot paths.
- `architecture-state-review-workflow.md` — current Architecture State review through important Workspace work.
- `architecture-decision-workflow.md` — one material Architecture Decision.
- `architecture-evolution-workflow.md` — coherent multi-decision architecture evolution.

## Proportional Materialization

```text
Architecture consideration ≠ architecture.md
Path consideration ≠ path file
Change-Axis consideration ≠ Change-Axis document
Architecture Decision consideration ≠ ADR ceremony
```

Plan as deeply as the decision requires; materialize only what benefits from stable independent ownership, reuse or review.

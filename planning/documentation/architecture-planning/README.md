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

UC-PLAN-ARCH-WORKSPACE-USES
→ resolve important current canonical Workspace UCs and discover architecture-relevant candidate useful results

UC-PLAN-ARCH-DISCOVER-WEUC
→ discover contextual future-change instances + likelihood/change-path/friction evidence

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

`workspace-use-case-discovery-workflow.md` is the owner for `UC-PLAN-ARCH-WORKSPACE-USES` and is also consumed by pressure/state/path/decision work as needed. Its result is an architecture-input picture: current canonical UCs plus explicit candidates/evidence. Canonical establishment/change/topology of Workspace UC meaning remains in sibling Workspace Planning and the generic registry authority.

## Core Model

```text
Current Workspace Reality
+
important current canonical Workspace Use Cases
  - change/write
  - read/understand
  - inspect/review
  - diagnose/operate
  - verify
+
architecture-relevant candidate useful results
+
Workspace Change Cases
+
Planned / Likely Extensions
  → candidate future useful results / Workspace UCs
  → affected current canonical Workspace UCs
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
3. `../direction-and-use-case-registry-workflow.md` when generic UC identity/boundary is material
4. `workspace-use-cases-and-change-pressure.md`
5. `direction-registry.md` + `use-case-registry.md`
6. the workflow for the selected Use Case
7. sibling `../workspace-planning/` only when canonical Workspace UC establishment/change/topology is required
8. templates only when a stable materialized result helps
9. `examples/ARCHITECTURE-PLANNING-WORKED-EXAMPLE.md` when an integrated example is useful

## Files

- `architecture-planning-principles-and-terminology.md` — stable universal Architecture Lens concepts/invariants.
- `workspace-use-cases-and-change-pressure.md` — architecture-input view of Workspace work plus Work Paths, Extensions, Change Pressure, Change Axes and Hot Paths; generic UC identity remains outside this file.
- `workspace-use-case-discovery-workflow.md` — `UC-PLAN-ARCH-WORKSPACE-USES`: resolve current canonical UCs + discover explicit architecture-relevant candidates and hand canonical UC lifecycle questions to Workspace Planning.
- `workspace-evolution-use-case-discovery-workflow.md` — `UC-PLAN-ARCH-DISCOVER-WEUC`: discover concrete future-change instances, likelihood/value/timing, expected change paths and friction/fan-out/risk.
- `templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md` — durable project-local register shape when material contextual instances need stable cross-plan/decision tracking.
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

## Contextual Workspace Evolution Use-Case Discovery

`UC-PLAN-ARCH-DISCOVER-WEUC` is a dedicated proportional Architecture supporting UC with a narrower independently useful result than broad `UC-PLAN-ARCH-WORKSPACE-USES`.

```text
concrete Workspace area / owner
→ contextual evolution-use discovery
→ expected Workspace Change Path + likelihood/value/timing + friction/fan-out/risk
→ Architecture Pressure/Decision handoff when needed
```

It is invoked when explicitly requested, when current Architecture planning needs this evidence, or when Application SDS Step 3 reaches a concrete target realization where expected future change materially affects architecture/Slice design. It is not an automatic scan of the whole Workspace.

When durable tracking helps, especially in Full SDS, material instances may be transferred to `templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md`. Architecture Decisions should cite the concrete driving instances/change paths.

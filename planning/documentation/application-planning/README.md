# Solution And Application Planning Documentation Index

Status: active reusable methodology-family index
Scope: plan a whole solution/workflow first; when Application responsibility is justified, discover meaningful Scenarios and plan detailed application behavior through explicit Scenario/Screen/Domain/Slice owners.

## Lifecycle

```text
Problem / Question / Idea
→ Need / Desired Result
→ Current Reality when useful
→ existing solutions / alternatives
→ candidate whole solution/workflow variants
→ scoped Idea review/deep planning when material
→ whole-solution integration review
→ selected solution responsibility
→ if Application responsibility is justified/already confirmed:
   optional Spine Scenario(s)
   → progressive Scenario discovery
   → Scenario Draft workspaces
      + shared/local Ideas
      + Scenario DATA
      + Behavior Items
      + Scenario visual material
   → Screens when spatial/screen UI needs independent ownership
   → Domain when useful
   → Implementation Slices when useful
   → verification/testing evidence proportionally
   → repeated cross-owner / whole-application integration review
```

Planning Item, Planning Draft and Full Picture Matrix are not active target stages/artifacts. Current owners remain real responsibilities. Whole-solution and cross-owner integration review remain required review responsibilities when relevant, but do not require a separate mandatory artifact/entity.

## Read Order

1. `application-planning-responsibility-map.md`
2. `application-planning-principles-and-terminology.md`
3. Idea owners when answer-seeking work is material
4. `direction-registry.md` + `use-case-registry.md`
5. `solution-and-scenario-planning-workflow.md`
6. [`detailed-planning/README.md`](detailed-planning/README.md) when Scenario-level or downstream detailed planning begins
7. `goal-map.md` when a current working Goal Map would materially help
8. type-specific templates under `templates/`
9. optional specialized SDS profile for projects that activate that route family
10. project-local Use Cases / Scenarios / Screens / Domains / Slices / current owners.

## Core Concepts

- **Whole Solution / Workflow** — integrated candidate answer; existing tools/manual/no-change/custom app/hybrids are equal candidates.
- **Application responsibility** — selected only when the whole solution actually needs application behavior.
- **Application Use Case** — semantic identity/navigation for an independently useful application Need/result.
- **Spine Scenario** — temporary representative end-to-end scaffold used while real Scenario boundaries are still unclear.
- **Scenario** — coherent motivated actor/context + Need/Goal + meaningful observable result + detailed observable behavior.
- **Scenario Draft workspace** — canonical Scenario behavior plus standard `ideas/`, `data/`, `behavior/`, `visual/` supporting areas.
- **Screen** — spatial/visual owner for an application surface; it may map related Scenarios but does not own their behavior.
- **Domain** — optional conceptual model/language/lifecycle/rules when separate ownership improves planning.
- **Implementation Slice** — optional separately deliverable/checkable integrated increment after enough behavior/concepts are understood.
- **Current Draft Plan** — current selected baseline named inside a detailed draft's Q/R/P or Better Route unit; not a file/entity/stage.
- **Planning Unit Variant** — integrated alternative design of one Scenario/Screen/Domain/Slice; not a runtime branch, Idea Variant or document revision.
- **Reference Object Candidate** — canonical literal meaning that may benefit from Linked Notes literal stale-copy checking/synchronization when intentionally materialized in other files.

## Detailed Planning

[`detailed-planning/README.md`](detailed-planning/README.md) owns the shared low-level contract for:

```text
Current Decisions
Current-Draft-relative Questions / Risks / Problems
Potential Better Routes
Scenario workspace topology
shared/local placement
Planning Unit Variants
Screen spatial ownership
Domain/Slice workspace guidance
verification
ordinary links vs Reference Object Candidates
```

Practical walkthrough: [`examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md`](examples/DETAILED-PLANNING-WORKSPACE-EXAMPLE.md).

## Reusable Goal Map

[`goal-map.md`](goal-map.md) is an optional reusable current-working surface for a meaningful goal/work direction. It may combine an action map, implementation points and lightweight `Keep In Mind` context while linking out to real canonical owners. It is not the Dashboard application's Goal Map authority and it is not historical logging.

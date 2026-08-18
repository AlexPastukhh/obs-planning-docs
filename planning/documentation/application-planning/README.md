# Solution And Application Planning Documentation Index

Status: active reusable methodology-family index
Scope: plan a whole solution/workflow first; when Application responsibility is justified, discover and draft meaningful Scenarios.

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
   → Scenario Drafts
   → Scenario DATA / Behavior Items
   → Domain when useful
   → Features / Implementation Slices when useful
```

Planning Item, Planning Draft and Full Picture Matrix are not active target stages/artifacts. Current owners remain real responsibilities. Whole-solution and cross-Scenario integration review remain required review responsibilities when relevant, but do not require a separate mandatory artifact/entity.

## Read Order

1. `application-planning-responsibility-map.md`
2. `application-planning-principles-and-terminology.md`
3. Idea owners when answer-seeking work is material
4. `direction-registry.md` + `use-case-registry.md`
5. `solution-and-scenario-planning-workflow.md`
6. `goal-map.md` when a current working Goal Map would materially help
7. `templates/SCENARIO-DRAFT-TEMPLATE.md` when detailed application behavior is planned
8. optional SDS profile for deeper separate DATA/Behavior/Domain/Slice representation
9. project-local Use Cases / Scenarios / current owners.

## Core Concepts

- **Whole Solution / Workflow** — integrated candidate answer; existing tools/manual/no-change/custom app/hybrids are equal candidates.
- **Application responsibility** — selected only when the whole solution actually needs application behavior.
- **Application Use Case** — semantic identity/navigation for an independently useful application Need/result.
- **Spine Scenario** — temporary representative end-to-end scaffold used while real Scenario boundaries are still unclear.
- **Scenario** — coherent motivated actor/context + Need/Goal + meaningful observable result + detailed observable behavior.
- **Scenario Draft** — canonical detailed behavioral planning owner.
- **Scenario DATA / Behavior Items / Domain / Slice** — proportional downstream owners; separate artifacts only when useful.

## Reusable Goal Map

[`goal-map.md`](goal-map.md) is an optional reusable current-working surface for a meaningful goal/work direction. It may combine an action map, implementation points and lightweight `Keep In Mind` context while linking out to real canonical owners. It is not the Dashboard application's Goal Map authority and it is not historical logging.

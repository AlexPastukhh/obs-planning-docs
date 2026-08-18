# Solution And Scenario Planning Workflow

Status: active reusable workflow
Scope: repeated whole-solution planning and, when Application responsibility exists, Spine-assisted Scenario discovery and Scenario Drafting.

## Whole-Solution Flow

```text
source / current context
→ clarify Need / Desired Result
→ capture Current Reality when useful
→ inspect existing solutions / alternatives proportionally
→ formulate whole Solution / Workflow Variants when material
→ use shared Idea Review/Deep Planning for answer-seeking uncertainty
→ evaluate local + integrated/combination quality
→ select current whole-solution responsibility
```

Do not force a custom application, branch, prototype, research exercise or artifact merely because the methodology supports it.

## Application Handoff

When Application responsibility is justified/already confirmed:

```text
selected application responsibility
→ optional Spine Scenario(s) while boundaries are unclear
→ discover independently meaningful Scenarios
→ register Application Use Cases
→ draft detailed Scenario owners
→ add Scenario DATA / Behavior Items proportionally
→ add Domain / Implementation Slices when useful
→ review cross-Scenario / whole-application consistency
```

## Spine Use

Use a Spine only when a concrete end-to-end traversal helps expose missing behavior or Scenario boundaries. Revise/split it as real Scenarios emerge. Do not preserve a Spine as a parallel permanent behavior owner.

## Scenario Discovery

For each candidate boundary ask:

```text
Is there a meaningful user Need?
Is there an independently meaningful observable result?
Can the behavior be understood/tested/re-entered/reused independently enough to justify a boundary?
```

Instrumental sub-steps remain inside the parent Scenario.

## Application Use-Case Registration

Every independently useful current application capability gets one semantic Use Case with trigger/purpose/result/boundaries and Scenario owner route(s). Detailed behavior stays in Scenario owners.

## Integration Loop

```text
local Idea / Scenario / Domain / Slice conclusion
→ integrate into whole application/workflow
→ review end-to-end result and neighboring Scenarios
→ revise local or wider meaning when necessary
```

## Current Reality / Research / Prototypes

Use only as needed to resolve real uncertainty. Evidence updates affected Ideas, selected solution meaning and Scenario/current owners; it does not create an automatic architecture decision.

## Repository Boundary

This workflow plans meaning only. Repository file updates require the file-update/update/package routes and their explicit permissions.

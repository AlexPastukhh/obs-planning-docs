# Application Concept Draft Template

Status: active reusable recommended template
Purpose: review one custom-application concept as a candidate way to simplify or improve a real-world problem-resolution workflow before detailed application behavior planning.

Canonical concepts/workflow:

- [`../application-planning-principles-and-terminology.md`](../application-planning-principles-and-terminology.md)
- [`../solution-and-scenario-planning-workflow.md`](../solution-and-scenario-planning-workflow.md)

Blank sections are not requirements. Use only supported meaning and keep rough estimates proportional to the evidence.

## Concept Identity

| Field | Value |
|---|---|
| Concept ID | <APP-CONCEPT-X> |
| Title | <title> |
| Status | candidate / reviewed / selected-current / rejected / needs-evidence |
| Related Need / Desired Result | <real-world Need/result owner or statement> |
| Related Workflow Variant(s) | <links when applicable> |
| Open Solution Slot(s) covered | <links/IDs when applicable> |
| Related Ideas / decisions | <when useful> |

## Real-World Coverage

### Problem / User-World Need
<What real problem/Need this concept helps with. Do not describe only an application command or Screen.>

### Context Before Application Use
<What is happening in the user's real-world workflow before this concept would be used, when material.>

### Desired Output / Continuation
<What useful result the application contribution should produce and what can happen afterward toward the primary real-world goal.>

## Concept Statement

<In one compact statement, how does this application simplify life/work or make the selected workflow materially better?>

## Value / Simplification Mechanism

<Why this concept is better than the current/problematic route if it is. Consider friction removed, understanding improved, coordination reduced, automation, error prevention, speed, control or other supported value.>

## What The Application Would Let Users Do / Know / Obtain

<Concept-level capability picture. Keep it user/value facing.>

## Concept Features

Use Concept Features only when stable addressability helps comparison/reasoning. They are Concept-scoped hypotheses, not automatically Application Scenarios or Slices.

### CF-<ID> — <feature/capability hypothesis>

**User Need / Value:** <what user-world Need/value it contributes to>

**Concept Contribution:** <what the concept would let the user do / know / obtain>

**Interaction Hypothesis:** <current guess of how it might work; not accepted detailed Scenario behavior>

**Feasibility / Cost Note:** <when material>

**Status:** candidate / current / rejected / needs-evidence

## Interaction / Solution Hypotheses

<Current guesses about how users may obtain the result. These are hypotheses that downstream Scenario planning may split, merge or replace.>

## Candidate Application Responsibility

### Likely Inside
<Responsibilities this concept may justify owning if selected.>

### Likely Outside
<People/process/existing tools/services that should remain outside when supported.>

This is a candidate boundary until whole-solution selection establishes current Application responsibility.

## Technical Feasibility — Proportional

### Feasibility Summary
<Is there a realistic technical path? What evidence supports that?>

### Likely Technical Shape
<Only enough architecture/technology detail to judge feasibility, effort and maintenance. Do not turn this into implementation/Slice planning.>

### Important Unknowns / Dependencies
<Only decision-relevant uncertainties/dependencies. Route to research/prototype when they can change selection.>

## Rough Development / Ownership Cost

Prefer relative bands/ranges + assumptions + confidence over false precision.

| Dimension | Estimate / band | Assumptions / evidence | Confidence |
|---|---|---|---|
| Development complexity | low / medium / high / range | <why> | low / medium / high |
| Development effort / time | <rough range when useful> | <why> | low / medium / high |
| Maintenance / support burden | low / medium / high / range | <why> | low / medium / high |
| Integration / operational burden | <when material> | <why> | low / medium / high |

## Viable Existing Alternatives

Keep materially viable existing routes visible while custom-vs-existing selection is open.

| Alternative | Need / Slot coverage | Main advantages | Main limitations | Evidence status | Disposition |
|---|---|---|---|---|---|
| <existing product/process/integration> | <coverage> | <advantages> | <limitations> | checked / partial / needs evidence | viable / rejected / needs evidence |

## Concept Comparison

Compare only dimensions that can materially change the whole-solution decision.

```text
Need / result coverage
user friction / obviousness
time to useful result
implementation effort / complexity
maintenance / support burden
integration / operational burden
reliability / control / flexibility
long-term cost / dependency
important unknowns
```

### Local Evaluation
<Does this concept itself provide a good answer to the covered Need/slot?>

### Whole-Solution Integrated Evaluation
<Is the complete real-world workflow better with this concept than with viable alternatives?>

## Current Conclusion

<Selected current meaning: keep as candidate / select into whole solution / reject in favor of another route / needs evidence.>

A conclusion that an existing/process route is better is a successful planning result.
## Prototype / Downstream Handoff — When Application Responsibility Is Selected

<Identify interaction/workflow uncertainties that deserve `UC-PLAN-PROTOTYPE`, candidate Scenarios / Scenario boundaries ready for provisional exploration, and decision-sensitive technical uncertainties that instead remain Concept feasibility spikes/research.>

```text
technical feasibility spike
→ Concept/research evidence

interaction/workflow prototype
→ Prototype Scenarios / Prototype Screens / candidate Requirements
→ Scenario Discovery / canonical Scenario-Screen planning
```

Do not create Prototype work merely because the methodology supports it.


## Planning Concerns / Q/R/P — When Material

Use `../../planning-concerns-and-decisions-model.md`. Group related Q/R/P when they share one resolution surface; keep member Priority/Concern Category/Status. AI Comment may recommend only when evidence is sufficient and must not invent user-owned Needs/preferences. Related Ideas reference the one canonical Concern/Group storage location instead of mirroring full bodies.

If material concerns are durable/distributed, keep/update the Area Concern Register chosen by the current profile. If none: `No material unresolved issues identified.`

## Potential Simplifications / Better Routes — When Material

<Only material not-yet-selected changes to the current Concept plan. Use the shared contract.>

## Boundaries

```text
Application Concept
≠ selected Application responsibility by itself
≠ Scenario
≠ technical architecture spec
≠ Implementation Slice plan

Concept Feature
≠ mandatory global Feature layer
≠ automatic Scenario
≠ automatic Slice
```

The selected Concept is revisited when downstream Scenario/Screen/Domain/Slice findings materially change feasibility, ownership cost or the real-world value proposition.

# Scenario Planning Workspace Workflow

Status: active OBS area workflow
Doc version: v0.3.0
Scope: rules for filling and updating the universal planning workspace template.

## 1. Core Rule

Fill only what the user explicitly said unless the user asks for a workflow-based fill, suggestions, risks or evaluation.

```text
If user did not provide a field value:
  write `not provided`.

If assistant adds anything:
  place it under AI ASSUMPTIONS / SUGGESTIONS,
  never silently in USER INPUT or Plan Core.
```

## 2. Scope Types

```text
time-scope:
  year / period / month / week / day overview.
  Use when the anchor is a time segment.

goal-map:
  concrete result or goal that may span multiple time segments.
  Use when the anchor is a goal/result.

project:
  larger working area with several goals.

experiment:
  deliberately uncertain attempt that may not produce payoff.
```

## 3. Time-Scope Hierarchy And Scope Units

Calendar hierarchy:

```text
Year -> Month -> Week -> Day
```

Day may be planned through one local execution mode:

```text
Day -> Session units
or
Day -> Hour units
```

A `Period` is a thematic time scope. It may span one or several months and does not replace the calendar Month layer.

Time-scope dashboard files may add a local `## Scope Units` section.

Ownership:

```text
Scenario Planning Workspace Template:
  owns the universal workspace shape.

Local Planning Dashboard Template:
  owns the exact Scope Units shape, statuses,
  unit identifiers and day planning modes.

Parent time scope:
  owns goal allocation and summary for child units.

Child time scope:
  owns detailed planning for that child unit.
```

Do not copy detailed child planning into the parent merely for visibility.
Use a short summary and a child-source path when the child file exists.

## 4. Minimal Workspace Sections

```text
0. Scope
1. Current Target Scenario
2. Plan Core
   - Minimum
   - Base
   - Desired
   - Max / Very Wide
3. Acceptance Criteria
4. Ideas Inbox
   - Desired Ideas
   - Other Ideas
5. Idea Evaluation
6. Done / Evidence
7. Still Needed
8. Links
```

For a dashboard time scope, the local `Scope Units` extension may be placed after Plan Core and before Acceptance Criteria.

Do not force a separate Slice Map, Risk Table or Decision Log unless the user asks for it or the planning situation truly needs it.

## 5. Working With Acceptance Criteria

Acceptance Criteria are practical checkable chunks.

Rules:

```text
- AC must be checkable.
- If verifiable result is unclear, write `not provided`.
- Do not invent AC from general context unless asked.
- Suggested AC goes under AI ASSUMPTIONS / SUGGESTIONS or clearly marked Source = ai suggestion.
```

## 6. Time Scope Vs Goal Map

The same workspace template can be used for both.

```text
Time scope:
  Current Target Scenario = what this year/period/month/week/day should become.
  Scope Units = how goals are allocated to the next planning unit level.
  Done / Evidence = what happened inside this time scope.
  Links = parent/child time scopes and related goal maps.

Goal map:
  Current Target Scenario = what result should exist when the goal is successful.
  Done / Evidence = evidence of progress toward this goal.
  Links = related time scopes where the goal is active.
```

## 7. Dashboard Use

The local dashboard can render workspace files from:

```text
planning/dashboard/years/
planning/dashboard/periods/
planning/dashboard/months/
planning/dashboard/weeks/
planning/dashboard/days/
planning/dashboard/goals/
planning/dashboard/backlog/
```

Repo markdown files are source of truth.
Tampermonkey is a read-only viewer.
AI output is not source of truth until written into repo files.

## 8. Ambiguous Work Rule

If work was done and its result is unclear, do not silently count it as useful progress.

Write it under:

```text
Done / Evidence
Still Needed
or Open / Unclear if the dashboard file has that section.
```

Experimental work is allowed if it is explicitly marked as uncertain or experimental.

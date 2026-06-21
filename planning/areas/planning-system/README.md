# OBS Planning System Area

Status: active OBS area documentation
Doc version: v0.4.0
Scope: local OBS planning workspace templates, year/period/month/week/day dashboard files, goal maps, command behavior, operational end-session updates, Scope Units and idea-evaluation workflow.

## 1. Purpose

This area applies the reusable documentation layer to personal/OBS planning work.

It owns local templates and command behavior for:

```text
- Scenario Planning Workspace
- calendar time-scope planning: year / month / week / day
- thematic-period planning across one or more calendar scopes
- Scope Units for immediate-child planning
- two alternative intra-day planning modes: sessions or hours
- goal-map planning: concrete goals/results across time scopes
- minimum / base / desired / max
- Acceptance Criteria as current working chunks
- Ideas Inbox
- Idea Evaluation
- planning-day / operational-day source separation
- session/outcome visibility through dashboard files
- safe end-session updates that append one finished session and recalculate owned score summaries
- explicit user input vs AI assumptions/suggestions
```

## 2. Core Rule

Do not fill planning fields from AI guesses by default.

```text
- Fill only what the user explicitly said.
- If a planning field cannot be filled from user input, write `not provided`.
- AI assumptions/suggestions must be separated from user input.
- Plan Core should not silently absorb raw ideas.
- Parent scopes summarize immediate child units; child files own detail.
- One day uses at most one active mode: sessions or hours.
- Planning files do not own D/F, Points, support or penalties.
- Tampermonkey is read-only projection, not source of truth.
- Repo markdown files are source of truth.
```

## 3. Time-Scope Model

```text
Calendar:
  Year -> Month -> Week -> Day

Inside Day:
  Sessions
  or
  Hours

Thematic:
  Period -> one explicit child-unit level
  Period may span multiple months and does not replace Month.
```

Planning and actual results are separate source responsibilities:

```text
planning/dashboard/days/YYYY-MM-DD.md
  owns day goals and planned session/hour units.

-Planning/Days/YYYY/YYYY-MM-DD.md
  owns actual sessions, score, support, penalties,
  carryover and final day review.

Dashboard Day view
  may show both together without merging the source files.
```

## 4. Owner Files

| File | Role |
|---|---|
| `scenario-planning-workspace-template.md` | Universal workspace base template for time scopes and goal maps; exposes the local Scope Units extension point. |
| `scenario-planning-workspace-workflow.md` | How to fill/update/evaluate the workspace and preserve parent/child ownership. |
| `local-planning-dashboard-template.md` | Exact dashboard file shapes, Scope Units contract, statuses and day planning modes. |
| `local-planning-dashboard-workflow.md` | Safe workflow for time-scope units, two-sided Day composition and local read-only viewer behavior. |
| `local-goal-map-template.md` | Minimal goal-map template using workspace semantics. |
| `local-planning-dashboard-goal-map.md` | Local goal map for building the dashboard system itself. |
| `planning-commands.md` | Local command definitions and route details for planning-system commands. |
| `end-session-command-workflow.md` | Exact operational command workflow for validating, appending and recalculating one finished session without changing planning sources. |

## 5. Related Root Route

Concrete command routing lives in:

```text
planning/planning-use-case-map.md
```

Reusable command creation rules live in:

```text
planning/documentation/command-creation-workflow.md
```

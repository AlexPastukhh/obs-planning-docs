# Local Planning Dashboard Template

Status: active OBS area template
Doc version: v0.4.0
Scope: dashboard file shapes for year, period, month, week, day, goal maps, backlog files and optional operational session-day files rendered by the local Tampermonkey viewer.

## 1. Model

```text
Time Overview = Scenario Planning Workspace anchored to time.
Goal Map = Scenario Planning Workspace anchored to a result.
Backlog = deferred work / deferred ideas list.
Scope Units = allocation of a time-scope goal to its next planning units.
Operational Session Day = detailed date-based result ledger owned by -Planning/Days/.
```

Use the universal `Scenario Planning Workspace Template` for time overviews and goal maps.

Do not use Goal Map files to store D/F session scoring, support marks, penalty events or carryover debt.

## 2. Source-Of-Truth Split

```text
planning/dashboard/years/YYYY.md
  owns year planning and month-level allocation.

planning/dashboard/periods/<period-id>.md
  owns thematic-period planning and one explicit child-unit level.

planning/dashboard/months/YYYY-MM.md
  owns month planning and week-level allocation.

planning/dashboard/weeks/YYYY-Www.md
  owns week planning and day-level allocation.

planning/dashboard/days/YYYY-MM-DD.md
  owns planning for the day:
  Current Target Scenario, Plan Core, Scope Units,
  Acceptance Criteria, Done / Evidence, Still Needed and Links.

-Planning/Days/YYYY/YYYY-MM-DD.md
  owns operational state for the date:
  Finished Sessions, D/F, Work Points, Penalty Events,
  support facts/marks, carryover/debt and final day review.

Tampermonkey viewer
  may combine the planning-day and operational-day files
  into one read-only two-sided Day view.
  It does not merge or write source files.
```

Do not copy detailed session-result rows into `planning/dashboard/days/` merely to make the viewer display them.

Do not create operational year/month/week/period files in the current architecture.
Upper scopes store planning plus short result/evidence summaries, while raw operational records remain at day level.

Introducing upper-scope operational files later requires a separately approved source-of-truth migration that updates the exact templates, workflows, index contracts and viewer behavior in one coordinated change.

## 3. Workspace Base And Local Extension

All time-scope dashboard files use the universal workspace base from:

```text
planning/areas/planning-system/scenario-planning-workspace-template.md
```

For time-scope files, add the local `## Scope Units` section after `## Plan Core` and before `## Acceptance Criteria`.

This file is the only exact owner of the local `Scope Units` shape.
Do not duplicate the exact table contract in the universal workspace template, examples or viewer code comments.

## 4. Common Workspace Sections

```text
Scope
Current Target Scenario
Plan Core
Scope Units
Acceptance Criteria
Ideas Inbox
Idea Evaluation
Done / Evidence
Still Needed
Links
```

`Scope Units` applies to time-scope files.
Goal maps do not require `Scope Units` unless a separate accepted local workflow explicitly adds them.

Do not add heavy protocol sections by default.

## 5. Index File Shape

````markdown
# Local Planning Dashboard Index

Status: active

```text
previous_year: planning/dashboard/years/2025.md
active_year: planning/dashboard/years/2026.md
active_period: planning/dashboard/periods/2026-05-06-diploma-return-to-rails.md
active_month: planning/dashboard/months/2026-06.md
active_week: planning/dashboard/weeks/2026-W25.md
active_day: planning/dashboard/days/2026-06-17.md
active_session_day: not provided
active_goal_maps:
  - planning/dashboard/goals/planning-dashboard.md
deferred_work: planning/dashboard/backlog/deferred-work.md
deferred_ideas: planning/dashboard/backlog/deferred-ideas.md
```
````

`active_month` is optional until a month file exists and the installed viewer supports the key.

`active_session_day` is optional.

Use a real repo path only when the referenced file exists.
For `active_session_day`, the operational date must match `active_day`.
Otherwise use `not provided` or omit the field.

## 6. Exact Scope Units Shape

````markdown
## Scope Units

Unit Type: month / week / day / session / hour / not provided
Planning Mode: calendar / sessions / hours / not provided

| Unit | Window | Goal(s) | Required by end | Status | Child source | Result / Evidence |
|---|---|---|---|---|---|---|
````

Field contract:

```text
Unit:
  stable identifier for the planned unit.

Window:
  date range, date, ordinal session window or clock-time range.

Goal(s):
  explicit goals active in this unit.

Required by end:
  explicit expected state at the end of the unit.

Status:
  current unit status from the accepted status vocabulary.

Child source:
  repo-relative path to the detailed child planning file,
  only when that file exists.

Result / Evidence:
  short result, evidence summary or source reference.
  Do not copy raw operational score records here.
```

Planning unknowns use `not provided`.
Do not use blank cells as a replacement for `not provided` in planning files.

## 7. Unit Types By Scope

```text
Year:
  Unit Type = month
  Planning Mode = calendar

Period:
  Unit Type = one explicit choice:
    month / week / day
  Planning Mode = calendar
  A Period is thematic and does not replace Month.

Month:
  Unit Type = week
  Planning Mode = calendar

Week:
  Unit Type = day
  Planning Mode = calendar

Day:
  Unit Type = session or hour
  Planning Mode = sessions or hours
  If no mode is selected:
    Unit Type = not provided
    Planning Mode = not provided
```

Stable identifier examples:

```text
month:   2026-06
week:    2026-W25
day:     2026-06-17
session: S1, S2, S3
hour:    H1, H2, H3
```

For hour units, put the actual clock range in `Window`, for example `14:00-15:00`.
Do not require one row for every clock hour; create only explicitly planned hour blocks.

## 8. Status Vocabulary

Accepted statuses:

```text
planned
active
done
lost
skipped
deferred
not provided
```

Rules:

```text
- `lost` requires explicit user input or explicit accepted evidence.
- Do not convert an unclear unit to `lost`.
- `done` requires an explicit result/evidence basis.
- A new future unit normally starts as `planned`.
- An unknown historical state is `not provided`.
```

## 9. Parent / Child Rule

```text
Parent scope:
  owns allocation, expected end state, status and short evidence
  for each immediate child unit.

Child scope:
  owns detailed planning inside that unit.

Parent Result / Evidence:
  may link to the child or summarize its outcome,
  but must not duplicate the full child plan or raw operational ledger.
```

`Child source` remains `not provided` until the file actually exists.
Do not create child files only to avoid a `not provided` value.

## 10. Day Planning Modes

A day has at most one active planning mode.

Session mode:

```text
Unit Type: session
Planning Mode: sessions
Unit identifiers: S1, S2, S3...
```

Hour mode:

```text
Unit Type: hour
Planning Mode: hours
Unit identifiers: H1, H2, H3...
Window contains the clock-time range.
```

Do not maintain active session and hour plans in the same day file.

If the user has not selected a mode, keep both fields `not provided`.
Do not infer session mode merely because operational results are recorded as sessions.

Planning-unit IDs such as `S1`, `S2`, `H1` and `H2` belong only to planning `Scope Units` in the current contract.

Planning-to-operational unit linkage is deferred.
It may be introduced only in the same approved update that changes:

```text
-Planning/Templates/Day File Template.md
-Planning/Workflows/Real Reward Work Loop Workflow.md
planning/areas/planning-system/local-planning-dashboard-template.md
planning/areas/planning-system/local-planning-dashboard-workflow.md
the dashboard viewer parser/rendering contract
```

Until that coordinated update, do not add a `Plan Unit` field to operational Finished Sessions and do not auto-complete planning rows from operational records.

Planning files do not store D/F, Points, support scores or penalty totals.

## 11. Day Composition

The formatted Day view may contain:

```text
Planning side:
  Current Target Scenario
  Plan Core
  Scope Units
  Acceptance Criteria
  Done / Evidence
  Still Needed
  Links

Actual / operational side:
  Session Overview
  Finished Sessions
  Penalty Events
  Support Facts
  Support Marks
  Carryover / Debt
  Final Day Summary
```

## 12. Finished Session Storage Contract

Required score fields:

```text
final D
final F
final Score / Points
```

Optional context fields, only when explicitly provided:

```text
Time
Session
Goal(s)
Progress Signal
Result
```

Do not store `Base`, `Adj`, score deltas in parentheses or other calculation internals in Finished Sessions.

Blank optional session cells remain blank.
Do not replace them with `not provided`, `—`, inferred text or a fallback copied from another field.

Compact session rows should prioritize:

```text
Session identifier/name when present
Score / Points
D/F
Goal(s) when present
```

Detailed session fields may be shown inside an expandable row only when the source value exists.
A row with only the required D/F/Score record remains a static compact row without an empty expander.

When a session references several goals, preserve all of them.
Do not reduce a multi-goal session to one goal silently.
Goal(s) should not be duplicated as both goal chips and a generic detail field.

For legacy source rows that contain numeric score deltas in parentheses after D or F, formatted mode hides those parenthetical deltas while Raw mode preserves the source unchanged.

## 13. Time-Scope Rendering Levels

```text
year:
  year direction plus month units, active periods,
  goal progress, evidence and remaining work.

period:
  thematic period plan plus one explicit child-unit level.
  Period does not replace the Month scope.

month:
  month direction plus week units and related period/goal links.

week:
  week plan plus day units and available day-level summaries.
  Do not force every session row into the week file.

day:
  full planning workspace plus optional operational session ledger.

goal-map:
  result-oriented planning only.
  No D/F, support, penalties or debt ledger by default.
```

A Goal Map may link to relevant time scopes or detailed day evidence, but does not own those session records.

## 14. Required Dashboard Folders

```text
planning/dashboard/years/
planning/dashboard/periods/
planning/dashboard/months/
planning/dashboard/weeks/
planning/dashboard/days/
planning/dashboard/goals/
planning/dashboard/backlog/
```

Operational session days remain under their existing owner path:

```text
-Planning/Days/YYYY/
```

## 15. Rendering Contract

The viewer should:

```text
- render known Markdown headings as cards;
- render Markdown tables as HTML tables;
- render Plan Core subsections as scenario cards;
- render Scope Units as immediate-child planning rows;
- show month as a time-scope tab when active_month is supported and linked;
- combine planning-day and operational-day sources in one Day view;
- render session rows compactly with Score, D/F and optional Goal(s);
- render Support Facts and Support Marks as independent sections;
- omit empty optional session values instead of inventing placeholders;
- ignore Base/Adj and other calculation internals in formatted session rendering;
- keep Formatted and Raw modes available;
- show per-file load errors without breaking other tabs;
- never infer missing planning facts, session facts or goal links;
- remain read-only.
```

## 16. Activation Compatibility

This file defines the target file contract.

Before adding a new live index key such as `active_month`, verify that the installed viewer version supports it.
Until viewer support is installed, month files may exist and be linked through Year/Period `Scope Units` without activating `active_month`.

Do not claim runtime support from documentation alone.

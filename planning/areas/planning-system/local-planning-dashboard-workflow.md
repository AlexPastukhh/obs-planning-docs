# Local Planning Dashboard Workflow

Status: active OBS area workflow
Doc version: v0.4.0
Scope: safe workflow for year, period, month, week and day planning files, Scope Units, formatted viewer rendering and optional operational session-day composition.

## 1. Core Rule

```text
Repo markdown files are source of truth.
Tampermonkey only reads and displays them.
AI output is not source of truth until written into repo files.
```

## 2. Safety Boundary

Tampermonkey viewer is read-only.

```text
Allowed:
  - fetch local markdown from localhost;
  - render formatted dashboard sections;
  - combine linked planning-day and operational-day files in memory;
  - copy prompts/file paths;
  - open local source URLs;
  - refresh view;
  - store viewer preferences in Tampermonkey storage.

Not allowed:
  - write local repo files;
  - run git commands;
  - commit or push;
  - send planning files to external services;
  - treat rendered HTML as source of truth.
```

## 3. Source Ownership

```text
planning/dashboard/years/YYYY.md
  year goals and month-unit allocation.

planning/dashboard/periods/<period-id>.md
  thematic period goals and one explicit child-unit level.

planning/dashboard/months/YYYY-MM.md
  month goals and week-unit allocation.

planning/dashboard/weeks/YYYY-Www.md
  week goals and day-unit allocation.

planning/dashboard/days/YYYY-MM-DD.md
  planning owner for the day:
  goals, expected results, session/hour units,
  evidence, remaining work and links.

-Planning/Days/YYYY/YYYY-MM-DD.md
  operational owner for the date:
  finished sessions, D/F, points, penalties,
  support, carryover/debt and day close.
```

The viewer may show planning and operational sources together, but must retain their paths and ownership boundaries.

Do not duplicate raw operational session rows into the planning-day file merely for visualization.

Do not create operational year/month/week/period files in the current architecture.
Introducing them later requires a separately approved source-of-truth migration that updates templates, workflows, index contracts and viewer behavior in one coordinated change.

## 4. Time-Scope Hierarchy

Calendar hierarchy:

```text
Year -> Month -> Week -> Day
```

A thematic Period may cover one or several months and can allocate work through one explicit child-unit level:

```text
month
week
or day
```

Period does not replace Month.

Day has one selected planning mode:

```text
sessions
or
hours
```

## 5. Scope Units Update Workflow

The exact `Scope Units` shape is owned by:

```text
planning/areas/planning-system/local-planning-dashboard-template.md
```

Update algorithm:

```text
1. Identify the current scope and anchor.
2. Choose the one allowed immediate Unit Type for this scope.
3. Use only explicit user goals and expected end states.
4. Create one row per relevant immediate child unit.
5. Use `not provided` for unknown planning values.
6. Add Child source only when the child file exists.
7. Keep detailed child planning in the child file.
8. Update Status only from explicit user input or accepted evidence.
9. Keep Result / Evidence short; link or summarize instead of duplicating.
10. Review parent/child consistency after changes.
```

Parent files own allocation and summary.
Child files own detailed planning.

Do not create child files solely to remove `not provided` from `Child source`.

## 6. Status Rules

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
- `lost` requires explicit user wording or explicit accepted evidence.
- Do not infer `lost` from missing results.
- `done` requires an explicit result/evidence basis.
- `active` means the unit is currently being worked.
- Future accepted work is normally `planned`.
- Unknown historical state remains `not provided`.
```

A status change does not rewrite the original goal or expected end state.

## 7. Day Planning Modes

### Sessions

```text
Unit Type: session
Planning Mode: sessions
Identifiers: S1, S2, S3...
```

Use when the user plans by ordered work sessions.

### Hours

```text
Unit Type: hour
Planning Mode: hours
Identifiers: H1, H2, H3...
Window: explicit clock-time range
```

Use when the user plans by time blocks.

Rules:

```text
- one day has at most one active planning mode;
- do not mix active session and hour tables;
- do not infer the mode;
- if no mode is selected, keep Unit Type and Planning Mode as `not provided`;
- do not create one row for every hour unless explicitly planned.
```

## 8. Planning / Operational Boundary

Planning unit:

```text
owns:
  goal;
  required end state;
  planning status;
  short Result / Evidence text or child-source reference.
```

Operational session:

```text
owns:
  actual work;
  final D;
  final F;
  final Points;
  optional explicit context;
  support/penalty/day-result facts.
```

In the current contract, planning-unit IDs such as `S1`, `S2`, `H1` and `H2` belong only to planning `Scope Units`.

Do not add a `Plan Unit` field to operational Finished Sessions yet.
Do not automatically change a planning-unit status from an operational row.

Planning-to-operational unit linkage is deferred until one coordinated update changes:

```text
-Planning/Templates/Day File Template.md
-Planning/Workflows/Real Reward Work Loop Workflow.md
the local dashboard template/workflow
the dashboard viewer parser/rendering contract
```

Do not copy D/F, Points, support marks or penalties into the planning file.
Do not overwrite the original `Required by end` with the actual result.

## 9. Scope-Specific Display

### Year

Show year direction, month units, active periods, goals, evidence and remaining work.

### Period

Show the thematic-period plan and one explicit child-unit level.
Keep Month visible as a separate calendar scope.

### Month

Show month direction, week units, related Period/Goal links, evidence and remaining work.

### Week

Show week planning, day units and available day summaries.
Session-level detail stays in day files.

### Day

Show the full planning workspace.

When `active_session_day` exists and matches the active planning-day date, also show:

```text
- Work Points / Net Work Score;
- incoming and remaining debt when provided;
- current-day score when provided;
- Finished Sessions;
- final D and final F;
- final Score / Points;
- Goal(s) exactly as recorded when present;
- optional Time, Session, Progress Signal and Result only when present;
- Penalty Events;
- Support Facts;
- Support Marks;
- Carryover;
- Final Day Summary.
```

Session rows should be compact by default and expandable only for source fields that actually exist.
A minimal D/F/Score-only row must not render an empty disclosure control.

### Goal Map

Show result-oriented planning only:

```text
Current Target Scenario
Plan Core
Acceptance Criteria
Done / Evidence
Still Needed
Links
```

Do not show D/F, support, penalties or debt as Goal Map-owned fields.
A Goal Map may link to time-scope evidence where sessions occurred.

## 10. Index And Activation

The index is the active-source registry.

Rules:

```text
- activate only paths that exist;
- active_day and active_session_day must resolve to the same date;
- active_month may be added only after the installed viewer supports it;
- documentation contract alone is not runtime proof;
- a missing optional pointer must not break unrelated tabs.
```

Until Month-tab support is installed, Month files may be linked from Year/Period Scope Units without an `active_month` index key.

## 11. Formatted And Raw Modes

Formatted mode is the default.

It should render:

```text
- metadata as badges;
- text sections as readable cards;
- Markdown tables as HTML tables;
- Plan Core subsections as scenario cards;
- Scope Units as immediate-child planning rows;
- session rows as compact records with Score, D/F and optional Goal(s);
- Support Facts and Support Marks independently;
- empty optional session metadata omitted rather than replaced with placeholders;
- goal-map and time-scope content without raw Markdown fences.
```

Raw mode remains available for source inspection and debugging.

If a file does not match known sections, formatted mode may render generic Markdown blocks before falling back to Raw.

## 12. Missing File And Parsing Rule

The index is required. Linked files are optional per file.

```text
- failure to load the index blocks the dashboard;
- failure to load one linked file does not block other tabs;
- missing active_session_day does not break the Day view;
- malformed or unknown content must not be invented;
- show the source path and a local error message.
```

## 13. Local Server

Run local server from repository root:

```powershell
cd C:\Users\alexa\obs
python -m http.server 8765
```

The viewer reads:

```text
http://127.0.0.1:8765/planning/dashboard/index.md
```

## 14. Editing Rule

Edit source files manually in repo / Obsidian / VS Code, or apply an explicitly requested reviewed replacement package.

After edit:

```text
refresh Tampermonkey viewer
review diff
commit manually only after review
```

The viewer's `Copy AI prompt` action may prepare source content for an AI-assisted update, but the copied prompt does not write files.

## 15. Ambiguous Work Rule

Work should not disappear as vague effort.

If work was done, record at least one of:

```text
Done / Evidence
Still Needed
Open / Unclear
Finished Sessions result/evidence
```

Do not silently treat unclear work as progress.

## 16. Conscious Experiment Rule

Experimental work is allowed.

It must be visible as uncertain, experimental, delayed or unclear in the relevant day/goal/time file.

## 17. Suggested First Use

```text
1. Open dashboard.
2. Read Year.
3. Read active Period.
4. Read active Month when supported and linked.
5. Read active Week.
6. Read active Day planning.
7. If linked, read active operational Day.
8. Read active Goal Maps.
9. Update only the smallest relevant source file.
```

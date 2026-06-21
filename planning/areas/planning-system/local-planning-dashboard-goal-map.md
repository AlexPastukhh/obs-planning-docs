# Goal Map — Local Planning Dashboard Through Universal Template

Status: draft local OBS planning-system goal map
Doc version: v0.2.0
Scope Type: goal-map
Scope Anchor: local-planning-dashboard

## Current Target Scenario

```text
A local repo-backed planning dashboard exists and can show time-scope overviews, goal maps and backlog from markdown files through a read-only Tampermonkey viewer.
```

## Plan Core

### Minimum

```text
Dashboard files exist and Tampermonkey can read the index, active year, active period, active week and active day.
```

### Base

```text
Dashboard also shows active goal maps, deferred work and deferred ideas.
```

### Desired

```text
Planning uses one universal workspace semantics for both time scopes and goal maps, so the system stays simple.
```

### Max / Very Wide

```text
Later, editing buttons may be added if manual editing becomes too slow. This is not part of the current base.
```

## Acceptance Criteria

| AC | Criterion | Verifiable Result | Status |
|---|---|---|---|
| AC1 | Universal planning template exists | `scenario-planning-workspace-template.md` supports Scope Type and Scope Anchor | todo |
| AC2 | Goal map template exists | `local-goal-map-template.md` exists | todo |
| AC3 | Dashboard index links goal maps/backlog | `planning/dashboard/index.md` has active_goal_maps, deferred_work, deferred_ideas | todo |
| AC4 | Tampermonkey renders goal maps/backlog | Viewer has tabs/groups for Goal Maps and Backlog | todo |
| AC5 | Viewer remains safe | Userscript is read-only and does not write files or run git | todo |

## Ideas Inbox

### Desired Ideas

```text
Use the same planning core for time scopes and goal maps instead of maintaining separate heavy protocols.
```

### Other Ideas

```text
Maybe add direct browser-side editing later, but not now.
```

## Idea Evaluation

```text
Idea:
Use one universal template for both time scopes and goal maps.

Source:
user + ai suggestion

What benefit does it give?
Avoids duplicating template logic and makes dashboard rendering simpler.

Related to:
Base / Desired

What can it break?
If the universal template becomes too broad, it can become vague.

Risk for Base:
low

What must be checked?
Whether dashboard files remain readable and not overloaded.

Decision:
add to AC
```

## Done / Evidence

```text
Previous dashboard MVP exists. This update adds universal workspace docs, goal map docs, backlog files and viewer support.
```

## Still Needed

```text
Apply archive, review diff, test local server and Tampermonkey viewer.
```

## Links

```text
Related Time Scopes:
  - planning/dashboard/years/2026.md
  - planning/dashboard/periods/2026-05-06-diploma-return-to-rails.md
  - planning/dashboard/weeks/2026-W25.md
  - planning/dashboard/days/2026-06-17.md
Deferred Work: planning/dashboard/backlog/deferred-work.md
Deferred Ideas: planning/dashboard/backlog/deferred-ideas.md
```

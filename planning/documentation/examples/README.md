# Documentation Layer Examples Index

Status: active reusable examples index
Doc version: v0.3.1-command-and-archive-examples
Scope: navigation for reusable examples and project-specific demonstration examples.

## 1. Rule

Examples demonstrate behavior. They do not own command semantics, workflows, routes, templates, canonical English names, source-selection rules or permission boundaries.

Owner docs live in:

```text
planning/documentation/*-workflow.md
planning/documentation/*-template.md
planning/planning-use-case-map.md
planning/areas/*
```

## 2. Generic Examples

| Example | Type | Owner | Status |
|---|---|---|---|
| `PLAN-COMMAND-VALID-EXECUTION-EXAMPLE.md` | Command-planning execution | `command-creation-workflow.md`, `documentation-principles-read-workflow.md` | current |
| `ARCHIVE-SOURCE-VS-OUTPUT-PACKAGE-EXAMPLE.md` | Archive read-source vs output-package source selection | `reviewable-agent-output-and-commands-workflow.md`, root UCM | current |
| `PLAN-FILE-UPDATE-COMMAND-EXAMPLE.md` | File-update planning | `file-update-overview-workflow.md` | current |
| `CRITICAL-REVIEW-COMMAND-EXAMPLE.md` | Critical review | root UCM and reviewable-output owner | current |
| `CURRENT-PLANNING-STATE-RESPONSE-EXAMPLE.md` | Current-state response | root UCM and relevant state owners | current |
| `LEVEL-2-KEY-POINTS-SUMMARY-EXAMPLE.md` | Reviewable Level 2 output | `reviewable-agent-output-and-commands-workflow.md` | current |
| `GOAL-MAP-BRIEF-RESPONSE-EXAMPLE.md` | Goal Map brief | relevant Goal Map owners | current |
| `GOAL-MAP-SYNC-COMMAND-EXAMPLE.md` | Goal Map sync | relevant Goal Map owners | current |
| `STATUS-RECONCILIATION-SCENARIO-PROJECT-EXAMPLE.md` | Status reconciliation | relevant status owners | current |
| `SHARED-VISIBILITY-SCENARIO-PROJECT-EXAMPLE.md` | Shared visibility | relevant visibility owners | current |
| `SOURCE-USAGE-CASCADE-GENERIC-EXAMPLE.md` | Source-usage cascade | relevant cascade owners | current |

Generic examples may be used as demonstrations only.

## 3. Project-Specific Examples

Project-specific examples, if present, are reference examples only:

```text
planning/documentation/examples/project-specific/
```

Do not copy their routes/state as active configuration for another project.

## 4. Do Not

```text
- Do not use examples as rule owners.
- Do not keep stale example references in the root UCM.
- Do not require absent project-specific files just because an example mentions them.
- Do not treat an example English name as authoritative when the concrete root UCM differs.
- Do not move archive source-selection rules out of the owner workflow into this index.
```

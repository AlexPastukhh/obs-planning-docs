# Documentation Layer Examples Index

Status: active reusable examples index
Doc version: v0.6.0-directed-reviewability-and-sds-ucds
Scope: navigation for reusable examples and project-specific demonstration examples.

## 1. Rule

Examples demonstrate behavior. They do not own command semantics, workflows, routes, templates, canonical English names, source-selection rules or permission boundaries.

Owner docs live in:

```text
planning/documentation/*-workflow.md
planning/documentation/*-template.md
planning/command-routing.md
planning/areas/*
```

## 2. Generic Examples

| Example | Type | Owner | Status |
|---|---|---|---|
| `PLAN-COMMAND-VALID-EXECUTION-EXAMPLE.md` | Command-planning execution | `UC-REPO-MAINTAIN-PLANNING-COMMAND` + `command-planning-workflow.md` | current |
| `ARCHIVE-SOURCE-VS-OUTPUT-PACKAGE-EXAMPLE.md` | Archive read-source vs output-package source selection | `reviewable-agent-output-and-commands-workflow.md`, root Command Routing | current |
| `PLAN-FILE-UPDATE-COMMAND-EXAMPLE.md` | File-update planning | `UC-REPO-PLAN-UPDATE` + direct Pre-Update command | current |
| `REVIEW-DIFF-PRACTICAL-EXAMPLE.md` | Semantic ReviewDiff review | `review-diff-review-workflow.md` + shared Idea owners | current |
| `CRITICAL-REVIEW-COMMAND-EXAMPLE.md` | Critical review | root Command Routing and reviewable-output owner | current |
| `CURRENT-PLANNING-STATE-RESPONSE-EXAMPLE.md` | Current-state response | root Command Routing and relevant state owners | current |
| `AI-REVIEWABILITY-KEY-POINTS-EXAMPLE.md` | AI Key Points / Review Priority output | `ai-reviewability-and-directed-planning-principles.md` | current |
| `STATUS-RECONCILIATION-SCENARIO-PROJECT-EXAMPLE.md` | Status reconciliation | relevant status owners | current |
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
- Do not keep stale example references in the root Command Routing.
- Do not require absent project-specific files just because an example mentions them.
- Do not treat an example English name as authoritative when the concrete root Command Routing differs.
- Do not move archive source-selection rules out of the owner workflow into this index.
```

## Idea Review

- [`COLLECT-IDEAS-PRACTICAL-EXAMPLE.md`](COLLECT-IDEAS-PRACTICAL-EXAMPLE.md) — full practical demonstration of `собери идеи`; example only, not methodology authority.

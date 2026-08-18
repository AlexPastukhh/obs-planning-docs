# OBS Planning Root

Status: active project-specific planning orientation
Scope: natural repository navigation from purpose to Directions, Use Cases and canonical owners; executable commands are an optional shortcut layer.

## Start Here

```text
README.md
→ planning/README.md
→ planning/direction-registry.md
→ selected local/reusable Direction Registry
→ selected Use-Case Registry
→ selected Use Case
→ canonical owner(s)
```

If you do not know which file to read, select the intent through Directions / Use Cases instead of browsing filenames at random.

For AI/chat work, read [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) before material planning, development or documentation changes.

## Authority Split

```text
Direction Registry
  → broad semantic work directions;

Use-Case Registry
  → independently useful capabilities: purpose, trigger, result, boundaries, owner route;

Scenario owner
  → detailed application behavior;

principles / workflow / template
  → reusable definition/invariant / repeated process / recommended shape;

command-routing.md
  → executable command-system entry/global policy;

planning/commands/*.command.md
  → individual commands;

project/application owners
  → concrete current state and implementation meaning.
```

Every independently useful supported capability must be discoverable as a current Use Case. Every active canonical owner must be reachable from a current Use Case or an explicit supporting-owner route. A file does not receive a Use Case merely because it exists.

## Root Files

- [`direction-registry.md`](direction-registry.md) — root Direction orientation.
- [`use-case-registry.md`](use-case-registry.md) — repository-wide/cross-family Use Cases.
- [`command-routing.md`](command-routing.md) — explicit command routing only.
- [`commands/`](commands/) — concrete command definitions.
- [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) — mandatory AI/chat working contract.
- [`documentation/`](documentation/) — reusable documentation/planning methodology.
- [`areas/`](areas/) — project-local planning/application state.

## Current Directions

See [`direction-registry.md`](direction-registry.md). Current families cover repository orientation/interaction, solution/application planning, reusable documentation governance, Documentation Workbench, Planning Runtime, Planning Helper, Linked Notes and Replacement Package App.

## Command-First Input

For an explicit command:

```text
planning/command-routing.md
→ planning/commands/<selected>.command.md
→ ownerFiles
→ related semantic Use Case when useful
```

Command permission does not come from Use-Case activation.

## Application Planning Orientation

```text
Problem / Question / Idea
→ Need / Desired Result
→ Current Reality when useful
→ existing solutions / alternatives
→ candidate whole solution/workflow variants
→ scoped Idea work when material
→ whole-solution integration review
→ selected Application responsibility when applicable
→ optional Spine Scenario(s)
→ progressive Scenario discovery
→ Scenario Drafts
→ Scenario DATA / Behavior Items
→ Domain when useful
→ Features / Implementation Slices when useful
```

A Spine Scenario is temporary scaffolding for discovering real Scenario boundaries, not a permanent entity layer.

Historical Planning Item records may remain provenance. Planning Item, Planning Draft and Full Picture Matrix are not active reusable stages/artifacts. Current owners remain real responsibilities, and whole-solution/cross-Scenario integration review remains a required review responsibility when relevant without becoming a separate mandatory entity or file.

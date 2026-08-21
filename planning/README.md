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

principles / workflow / model / template
  → reusable definition/invariant / repeated process / focused semantic model when justified / recommended shape;

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
- [`../parallel-work-scope-registry.md`](../parallel-work-scope-registry.md) — fixed repository parallel-work scopes + canonical scope-log locations.
- [`documentation/`](documentation/) — reusable documentation/planning methodology.
- [`areas/`](areas/) — project-local planning/application state.

## Current Directions

See [`direction-registry.md`](direction-registry.md). Current families cover repository orientation/interaction, solution/application planning, Workspace capability planning, Workspace Architecture Planning, Testing Planning, reusable documentation governance, Documentation Workbench, Planning Runtime, Planning Helper, Linked Notes and Replacement Package App.

## Command-First Input

For an explicit command:

```text
planning/command-routing.md
→ planning/commands/<selected>.command.md
→ ownerFiles
→ related semantic Use Case when useful
```

Command permission does not come from Use-Case activation.

## Workspace Planning Orientation

For evolving code/documentation/planning/automation/knowledge Workspaces, reusable Workspace Planning is the semantic route for establishing/changing useful Workspace capabilities before concrete file execution:

```text
Need / source / Ideas
→ affected existing Workspace UC or candidate new Workspace UC
→ Step 1 — Target UC
→ Step 2 — Domain / Rules / Models / Representations when useful
→ Step 3 — expected Workspace Change Path + proportional Architecture Lens + vertical realization/files/verification when selected
```

See [`documentation/workspace-planning/direction-registry.md`](documentation/workspace-planning/direction-registry.md). Application actor-visible behavior remains Scenario-owned; the code/documentation artifacts used to develop/support it are Workspaces with their own UCs.

## Application Planning Orientation

```text
Problem / Question / Idea
→ Need / Desired Result
→ whole-solution / Application Concept work when useful
→ selected Application responsibility
→ Prototype when material
→ Scenario discovery
→ Scenario Drafts / Screens
→ optional Domain Discovery / Domain
→ optional Application Realization
→ optional Slice Strategy / Implementation Slice
→ Verification / Testing planning when useful
```

Application behavior is owned by **Scenarios**. There is no reusable Application-Use-Case semantic layer between Application responsibility and Scenario discovery. A rough walkthrough/representation may help discovery without becoming a named planning entity.

Testing Planning is a sibling reusable Direction under `planning/documentation/testing-planning/`; it plans proof/evidence without taking semantic authority from Scenario, Requirement, Domain or Slice owners.

## Parallel Work / Scope Logs

```text
parallel-work-scope-registry.md
→ select existing registered scope(s)
→ scope-root/action-log.md
→ work/package/review inside those fixed boundaries
```

Chats do not repartition the repository per task. Cross-scope work keeps one full canonical log record and reference-only entries in the other affected scope logs.

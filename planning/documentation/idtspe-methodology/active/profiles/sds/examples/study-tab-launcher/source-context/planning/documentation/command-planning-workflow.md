# Command Planning Workflow

Status: active reusable documentation-layer command planning workflow
Scope: plan a new/changed executable shortcut while preserving current semantic-entry authority.

## Core Rule

```text
semantic capability / behavior
→ resolve applicable semantic entry (Workspace/methodology Use Case or Application Scenario)
→ decide whether an executable shortcut is useful
→ concrete command definition
→ command routing / projection synchronization
```

A command does not create the semantic capability it triggers.

## Sources

```text
planning/command-routing.md
planning/commands/README.md + selected direct command definitions
planning/use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md
applicable current semantic registry: Workspace/methodology Use-Case Registry or Application Scenario Catalog
planning/documentation/command-routing-workflow.md
planning/use-cases/UC-REPO-PLAN-UPDATE.md when a concrete repository transition is needed
```

## Planning Steps

1. Resolve the current semantic entry: Workspace/methodology Use Case or Application Scenario; if the semantic entry itself is missing, route that semantic work to its current owner rather than inventing it inside the command.
2. Define canonical trigger, English name and aliases.
3. Define the registered `includes` DAG first: fully expand it conceptually, keep prerequisites before dependents, deduplicate shared prefixes, and ensure the planned root action runs last on its branch. Do not encode files or numeric ports as includes.
4. Define active-context behavior, read mode, expected output, permission mode, and any pre-execution `compositionContributions` needed by the merged DAG.
5. Define `ownerFiles` plus exact own `ownerRefs` (`Responsibility/semantic ID`, file, anchor, `why`, role, read mode). Do not repeat refs inherited from includes. Distinguish prerequisite includes from downstream destinations produced only after the command action.
6. If a result-producing command assumes reusable governance, identify the family-specific bootstrap/preflight owner in its owner route. Rely on the shared command-routing reuse/targeted/full preflight rule instead of forcing a full reread on every invocation or copying bootstrap logic into the command.
7. Reuse current workflow/template owners; do not copy algorithms into command bodies.
8. Plan one direct `planning/commands/*.command.md` definition.
9. Update `planning/command-routing.md` only when shared/global policy changes.
10. Update the related semantic-entry command reference only where that registry/catalog contract actually owns such a reference.
11. Plan Helper projection as a derived view: direct includes, dependencies-first expanded composition, composition contributions (including pre-execution review coverage mode when relevant) and own refs/why must come from canonical definitions rather than Helper-authored semantics.
12. When a concrete repository transition is needed, hand off to `UC-REPO-PLAN-UPDATE`; do not implement through this workflow.

Commands are optional. A repository remains fully discoverable through README/navigation and the applicable Use-Case Registry, Scenario Catalog or specialized semantic owner without knowing command names.

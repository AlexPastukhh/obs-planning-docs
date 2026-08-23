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
applicable current semantic registry: Workspace/methodology Use-Case Registry or Application Scenario Catalog
planning/documentation/command-routing-workflow.md
planning/documentation/documentation-principles-read-workflow.md
planning/documentation/file-update-overview-workflow.md
```

## Planning Steps

1. Resolve the current semantic entry: Workspace/methodology Use Case or Application Scenario; if the semantic entry itself is missing, route that semantic work to its current owner rather than inventing it inside the command.
2. Define canonical trigger, English name and aliases.
3. Define active-context behavior, read mode, ownerFiles, expected output and explicit permission mode.
4. If a result-producing command assumes reusable governance, identify the family-specific bootstrap/preflight owner in its owner route. Rely on the shared command-routing reuse/targeted/full preflight rule instead of forcing a full reread on every invocation or copying bootstrap logic into the command.
5. Reuse current workflow/template owners; do not copy algorithms into command bodies.
6. Plan one direct `planning/commands/*.command.md` definition.
7. Update `planning/command-routing.md` only when shared/global policy changes.
8. Update the related semantic-entry command reference only where that registry/catalog contract actually owns such a reference.
9. Decide helper projection separately.
10. Produce a File Update Plan; do not implement through this workflow.

Commands are optional. A repository remains fully discoverable through Directions and the applicable Use-Case Registry or Scenario Catalog without knowing command names.

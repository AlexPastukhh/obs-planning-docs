# Command Planning Workflow

Status: active reusable documentation-layer command planning workflow
Scope: plan a new/changed executable shortcut while preserving semantic Use-Case authority.

## Core Rule

```text
semantic capability / Use Case
→ decide whether an executable shortcut is useful
→ concrete command definition
→ command routing / projection synchronization
```

A command does not create the semantic capability it triggers.

## Sources

```text
planning/command-routing.md
planning/commands/README.md + selected direct command definitions
planning/documentation/use-case-registry.md or other related local Use-Case Registry
planning/documentation/command-routing-workflow.md
planning/documentation/documentation-principles-read-workflow.md
planning/documentation/file-update-overview-workflow.md
```

## Planning Steps

1. Resolve the current semantic Use Case or identify that a new independently useful Use Case is required.
2. Define canonical trigger, English name and aliases.
3. Define active-context behavior, read mode, ownerFiles, expected output and explicit permission mode.
4. Reuse current workflow/template owners; do not copy algorithms into command bodies.
5. Plan one direct `planning/commands/*.command.md` definition.
6. Update `planning/command-routing.md` only when shared/global policy changes.
7. Update the semantic Use Case's `Related command` reference.
8. Decide helper projection separately.
9. Produce a File Update Plan; do not implement through this workflow.

Commands are optional. A repository remains fully discoverable through Directions/Use Cases without knowing command names.

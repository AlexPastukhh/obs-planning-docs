# Command Routing Workflow

Status: active reusable documentation-layer workflow
Scope: create and maintain a project's executable command-routing system without conflating commands with semantic Directions or Use Cases.

## Core Model

```text
Direction Registry
→ broad semantic work directions

Use-Case Registry
→ independently useful semantic capabilities

Command Routing
→ executable command-system entry/global policy

commands/*.command.md
→ concrete command trigger/output/read/permission route
```

## When To Use

Use this workflow when creating/changing command triggers, aliases, canonical English names, active-context behavior, owner reads, outputs, permissions or command-to-Use-Case relationship.

Do not use it to define semantic capability bodies.

## Update Algorithm

1. Identify the independently useful semantic capability and current Use Case when one exists.
2. Confirm that an executable shortcut is useful; a Use Case does not require a command.
3. Define exactly one concrete command file.
4. Link actual owner files instead of copying workflow bodies.
5. Keep output and permission explicit.
6. Update shared `command-routing.md` only for shared/global routing policy.
7. Update related Use-Case `Related command` reference.
8. Consider helper projection separately.
9. Validate registry reachability, paths, uniqueness and permissions.

## Do Not

- Do not call Command Routing a Use-Case Map / UCM.
- Do not make command files semantic Use-Case owners.
- Do not invent a command merely because a Use Case exists.
- Do not let helper projection define command meaning.
- Do not duplicate workflow/template bodies in command definitions.

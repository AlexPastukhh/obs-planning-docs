# Command Routing Workflow

Status: active reusable documentation-layer workflow
Scope: create and maintain a project's executable command-routing system without conflating commands with semantic Directions, Workspace/methodology Use Cases or Application Scenarios.

## Core Model

```text
Direction Registry
→ broad semantic work directions

Workspace / methodology Use-Case Registry
→ independently useful semantic capabilities

Application Scenario Catalog
→ independently meaningful actor-visible behavior

Command Routing
→ executable command-system entry/global policy

commands/*.command.md
→ concrete command trigger/output/read/permission route
```

## When To Use

Use this workflow when creating/changing command triggers, aliases, canonical English names, active-context behavior, owner reads, outputs, permissions or command-to-semantic-entry relationship.

Do not use it to define semantic capability bodies.

## Update Algorithm

1. Identify the semantic capability/behavior and resolve the applicable current semantic entry: Workspace/methodology Use Case or Application Scenario.
2. Confirm that an executable shortcut is useful; neither a Use Case nor a Scenario requires a command.
3. Define exactly one concrete command file.
4. Link actual owner files instead of copying workflow bodies.
5. Keep output and permission explicit.
6. Update shared `command-routing.md` only for shared/global routing policy.
7. Update the related semantic-entry command reference only when the current registry/catalog contract owns one.
8. Consider helper projection separately.
9. Validate registry reachability, paths, uniqueness and permissions.

## Do Not

- Do not call Command Routing a Use-Case Map / UCM.
- Do not make command files semantic Use-Case or Scenario owners.
- Do not invent a command merely because a Use Case or Scenario exists.
- Do not let helper projection define command meaning.
- Do not duplicate workflow/template bodies in command definitions.

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

## Governance Preflight And Read Reuse

Result-producing commands often depend on reusable governance that should be established before task-specific work but should not be reread blindly on every invocation.

Use this state model:

```text
CURRENT
→ a sufficient prior governance pass exists in the working conversation/context;
→ relevant owner boundaries are confidently remembered;
→ there is no material reason to suspect the applicable route/rules changed;
→ reuse it and read only command-specific/task-specific owners.

TARGETED REFRESH
→ the prior governance pass remains broadly usable, but a relevant command/registry/workflow/profile/owner may have changed;
→ or the active task enters a governance zone not previously read deeply;
→ reread only the affected governance owners plus the minimum routing context needed to reconnect them.

FULL PREFLIGHT
→ no reliable sufficient governance pass exists;
→ ownership/boundaries cannot be reconstructed confidently;
→ or governance architecture changed materially enough that a targeted refresh is unsafe;
→ perform the family-specific full bootstrap/preflight, then execute the requested command.
```

Freshness is semantic, not chronological. Do not invalidate governance merely because many messages passed or because the repository uses a new snapshot, commit, branch or repository target. A source-state change matters only when it can materially affect the relevant command route, semantic ownership, reusable rule set or permission boundary.

For an implicit preflight triggered by another command:

```text
user command
→ resolve current command definition
→ reuse / targeted-refresh / full-preflight required governance
→ read command-specific + task-specific owners
→ execute the requested command
→ return the requested command result
```

Do not tell the user to invoke a bootstrap command first when the current command can safely establish its precondition internally. Do not replace the requested result with a bootstrap assimilation unless the bootstrap itself was explicitly invoked.

Family-specific governance owners define what constitutes a sufficient full pass and what may be refreshed proportionally. Individual command definitions point to those owners through `ownerFiles` / semantic owner routes rather than copying bootstrap algorithms into every command.

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

# OBS Command Routing

Status: active project-specific root command-system router
Scope: mandatory executable-command entry and shared command routing/global policy. Semantic repository meaning is discovered through Direction Registries and the applicable primary semantic registry: Workspace/methodology Use-Case Registries or Application Scenario Catalogs.

## Authority

```text
planning/command-routing.md
  = shared command-system entry/global policy;

planning/commands/*.command.md
  = one concrete command route each;

planning/direction-registry.md + local Direction Registries
  = semantic work directions;

planning/use-case-registry.md + local Use-Case Registries
  = semantic independently useful Workspace/methodology capabilities;

Application Scenario Catalogs + Scenario owners
  = independently meaningful Application behavior;

workflow/template/project owners
  = complete repeated process or current meaning;

Planning Helper
  = projection only.
```

A command may link to a semantic Use Case, but never owns or replaces its semantic entry.

## Command Resolution

```text
1. Start here for an explicit command.
2. Resolve the direct planning/commands/*.command.md whose commandFamily contains the trigger.
3. Read that complete command definition.
4. Follow its ownerFiles/read-mode requirements.
5. Preserve its permission boundary.
6. Use the related semantic entry (Workspace/methodology Use Case or Application Scenario) only for purpose/context/owner navigation; semantic-entry activation does not grant command permission.
```

Do not reconstruct commands from memory, helper output, examples or historical files when the command definition is readable.

## Explicit-Meaning Rule

For planning commands:

```text
explicit user statement / checked source fact
  → may be treated as confirmed;

unresolved material choice
  → keep explicit as question / alternative / Idea Variant;

Current Selected Variant
  → use when one current meaning is selected;

fallback
  → use only when genuinely a fallback,
    never merely because a question is unanswered.
```

No unresolved choice or fallback authorizes destructive actions, unrelated scope expansion, commit or push.

## Command Registry Rules

- one direct `*.command.md` file = one concrete command;
- canonical command, English name and aliases are unique;
- `commandFamily` includes the canonical trigger exactly;
- command files own output, active-context behavior, reads and permissions;
- reusable workflows own algorithms instead of being copied into command bodies;
- commands are optional shortcuts: repository semantic discovery must remain possible through Directions and the applicable current Use-Case Registry or Scenario Catalog.

## Permission Boundary

Command permission is explicit and local to the selected command. Direction/semantic-entry activation never expands it. No command implies Git commit/push unless its direct definition explicitly owns that behavior.

## Planning Helper Boundary

The helper projects commands from direct definitions. Orientation/Directions/Use Cases project semantic navigation from their registries. Generated helper artifacts never become command or semantic authority.

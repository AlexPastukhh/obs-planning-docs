# Use-Case Map Template

Status: current reusable documentation-layer template
Doc version: v0.2.0-command-routes
Scope: exact reusable Markdown shape for concrete use-case maps, including command families with canonical English names.

Use with:

```text
planning/documentation/use-case-map-workflow.md
```

This template is generic. Replace system-specific owner files, layer names and permission boundaries for the target system.

Reusable setup field kit:

```text
planning/documentation/field-kits/root-use-case-map-field-kit.md
```

Profile-specific route setup, when applicable:

```text
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md
```

This template defines shape only. It is not a second use-case map.

## Template

````markdown
# <System / Area> Use Case Map

Status: <current / draft / experimental> <scope description>
Scope: maps user-visible actions and commands to docs, workflows, templates, sources, expected outputs and permission boundaries for <system / area>

## 1. Purpose

This file answers:

```text
User says X.
For a command family, what is its canonical English name?
What should the chat/agent do?
Which docs should it read?
Why those docs?
Where is the obligation to read/use them defined?
What output is expected?
What requires explicit permission?
```

This file is not:

```text
- a full workflow;
- a template;
- a responsibility map;
- a README replacement;
- a source-of-truth for owner workflows it routes to.
```

## 2. Relationship To Owner Files

```text
<README or entrypoint>
  Overview / entry point / source-of-truth map.

<workflow activation or routing file>
  Workflow activation and preflight rules.

<responsibility map>
  Layer or local ownership routing.

<this use-case map>
  User command/action -> docs/workflows/templates/sources/output/permission route.
  For command families, it also owns the accepted canonical English display name.
```

Reusable use-case-map setup, maintenance and shape are owned by:

```text
planning/documentation/field-kits/root-use-case-map-field-kit.md
planning/documentation/use-case-map-workflow.md
planning/documentation/USE-CASE-MAP-TEMPLATE.md
```

## 3. Universal Algorithm

For non-trivial work in this system, use this path:

```text
1. Decide whether the request starts new work or continues active context.
2. Use the system entrypoint and activation/routing docs.
3. Use the responsibility map to choose the owner layer/file.
4. For command routes, identify the canonical command, English name and aliases.
5. Select traversal depth.
6. Select read source mode.
7. Select output mode when the user asks for a deliverable.
8. Read owner workflows for algorithms.
9. Read templates for output shape.
10. Read sources/evidence needed for this pass.
11. Report sources used and relevant not-checked sources.
12. Separate implicit checks from explicit-permission actions.
13. Produce answer/update/plan/draft/package.
```

## 4. Active Context Rule

Short commands apply to active context unless the user names another target.

Active context can be:

```text
- active draft;
- active answer;
- active plan;
- active section;
- active document;
- active use case;
- active source snapshot;
- active repo/archive/read mode.
```

If there is no active context, ask for the target unless the target is obvious.

## 5. Repeated / Continuation Commands

| User says | English name | If active context exists | If no active context exists | Traversal depth | Read source mode | Expected output | Permission boundary |
|---|---|---|---|---|---|---|---|
| `<canonical command and aliases>` | `<one canonical English display name>` | <behavior> | <fallback/clarification> | <none/reuse/targeted/full> | <conversation/archive/repo/files> | <output> | <what requires explicit approval> |

## 6. Command Route Table

Use this compact command table when the system needs stable command families but does not need the full primary-use-case table for each command.

| Command / trigger | English name | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|---|
| `<canonical command and aliases>` | `<one canonical English display name>` | <what the command means> | <active/missing-context behavior> | <reuse/targeted/full and source mode> | <owner workflows/templates/sources> | <output and permission boundary> |

## 7. Primary Use Case Table

Use the full table for complex systems where source mode, workflow activation and permission boundaries matter. `English name` is required when the row is a command family and may be `n/a` for a non-command use case.

| User says | English name | Task type | Active context? | Traversal depth | Read source mode | Activated workflows | Required reads | Source of obligation | Expected output | Permission boundary |
|---|---|---|---:|---|---|---|---|---|---|---|
| `<phrasing / command>` | `<canonical English name or n/a>` | <task type> | <new/active/optional> | <targeted/full/etc.> | <source mode> | <workflows/templates> | <files/sources> | <why this route is required> | <expected output> | <permission boundary> |

## 8. Reduced Use Case Table

Use the reduced table only for smaller systems where the full table would add noise. `English name` is required for command rows and may be `n/a` otherwise.

| User says | English name | Task type | Required reads | Expected output | Permission boundary |
|---|---|---|---|---|---|
| `<phrasing / command>` | `<canonical English name or n/a>` | <task type> | <files/sources> | <expected output> | <permission boundary> |

## 9. Detailed Traces

Add detailed traces only for routes that need more than a table row.

### Detailed Trace: <route name>

User says:

```text
<phrasing / command>
```

English name, when this is a command family:

```text
<canonical English display name>
```

Steps:

```text
1. <step>
2. <step>
3. <step>
```

Boundaries:

```text
- <what this route must not do>
```
````

## Field Notes

```text
User says
  Canonical user wording plus accepted aliases or trigger language.

English name
  One required stable English display/projection name for a command family.
  It is separate from aliases and does not own behavior.
  Use n/a only for a non-command use case.

Task type
  Short classification of the work.

Active context?
  Whether active draft/plan/answer/source context changes behavior.

Traversal depth
  How much surrounding context should be read.

Read source mode
  Conversation, archive, current repo, named files, web or other sources.

Activated workflows
  Owner workflows/templates used by the route. Link/name owners; do not copy them.

Required reads
  Concrete files/sources to inspect.

Source of obligation
  Why this route or read set is required.

Expected output
  Short reviewable output shape. Link owner template/workflow when relevant.

Permission boundary
  What requires explicit approval or must not be done implicitly.
```

## Rules

```text
- Keep use-case rows short enough to scan.
- Give every command family one canonical English name.
- Keep English names separate from aliases.
- Use detailed traces only when a row is not enough.
- Link owner workflows/templates instead of copying their logic.
- Keep reusable use-case-map maintenance rules in use-case-map-workflow.md.
- Keep exact reusable shape in this template.
- Adapt concrete maps to their system; do not copy project-specific owner files into unrelated systems.
```

## Root Map Rule

A concrete project should normally have one root use-case map.

The reusable documentation layer owns setup guidance, workflow and template shape. The project root map owns concrete command routing and accepted canonical English names.

Do not create a generic reusable use-case map inside the documentation layer.

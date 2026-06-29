# Documentation Principles Read Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.2.0-command-planning-owner
Scope: full or targeted documentation architecture, ownership and update preflight before planning or changing documentation.

## 1. Purpose

Use this workflow for commands such as:

```text
прочитай принципы документации
прочти принципы документации
принципы документации
read documentation principles
documentation principles
docs principles
```

It is also a required preflight for `спланируй команду` when the route has not already been read and remembered in the current chat.

This workflow owns the read/preflight process. It does not replace the principles, responsibility maps, update workflows, templates or project root UCM that own their own rules.

## 2. Permission Boundary

```text
This route is read-only.
It may identify owners, required reads, risks and proposed follow-up work.
It does not create or edit files.
It does not create an archive.
It does not commit or push.
```

A separate command such as `план файл-обновление` plans changes. A separate output-package command such as `давай архив` authorizes creation of a replacement package after scope approval.

## 3. Full vs Targeted Read

Use a full preflight when:

```text
- this route has not been read in the current chat;
- the chat does not remember the architecture, ownership or update boundaries;
- the task changes command routing, reusable owners, templates, examples or portable/bootstrap behavior;
- ownership or source-of-truth placement is uncertain;
- a prior answer may have relied on a compact command prompt instead of owner files.
```

Use a targeted refresh only when:

```text
- a current full preflight was already completed in the chat;
- the relevant principles and boundaries are still clear;
- only task-specific owners or recently changed source files need rereading.
```

When uncertain, use the full preflight.

## 4. Full Preflight Read Order

```text
1. planning/planning-use-case-map.md
2. planning/README.md
3. planning/workflow-activation-map.md
4. planning/root-source-sync-register.md
5. planning/documentation/README.md
6. planning/documentation/planning-docs-architecture-principles.md
7. planning/documentation/documentation-responsibility-map.md
8. planning/documentation/documentation-update-plan-workflow.md
9. planning/documentation/documentation-update-workflow.md
10. planning/documentation/documentation-responsibility-zone-review-workflow.md
11. task-specific owner workflows/templates/area docs named by the route or task
12. examples only when coverage or demonstration fit is relevant
13. Tampermonkey projection owners only when helper projection is separately in scope
```

Do not expand into unrelated repository files merely because the preflight is full. Full means the complete documentation route required for the task.

## 5. Task-Specific Expansion

### Command planning

Read:

```text
planning/documentation/file-update-overview-workflow.md
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
planning/documentation/command-planning-workflow.md
planning/documentation/use-case-map-workflow.md
planning/documentation/USE-CASE-MAP-TEMPLATE.md
planning/documentation/example-coverage-workflow.md
planning/documentation/examples/README.md
```

Read Tampermonkey owners only when projection is explicitly part of the planned scope.

### Broad documentation update

Read the relevant reusable owner workflows/templates and local area docs after completing the full preflight. Use `documentation-update-plan-workflow.md` for plan-only work and `documentation-update-workflow.md` for approved changes or replacement packages.

### Bootstrap or portable-copy work

Read `PORTABLE-STARTER-KIT.md` and the necessary field kits only while creating or restructuring project-root artifacts. Field kits do not become runtime routers after those artifacts exist.

## 6. Required Output

For non-trivial use, report:

```text
Checked:
  <files actually read>

Not checked:
  <relevant sources not read or unavailable>

Authority / layer:
  <root UCM / reusable workflow / template / responsibility map / area owner>

Correct owner zone:
  <where the requested information or behavior belongs>

Required route read:
  <task-specific owner chain>

Boundaries:
  <what this preflight did not authorize or inspect>
```

For `спланируй команду`, this preflight feeds the command plan and final `План файл-обновление`; it is not a second independent command execution.

## 7. Owner-Placement Checks

Before proposing documentation changes, determine:

```text
1. Is the information reusable or project-specific?
2. Is it a principle, workflow, template, field kit, profile, example, route, tool note or local area rule?
3. Does an owner already exist?
4. Would a new file duplicate an existing owner?
5. Does README/navigation need an update?
6. Does the root UCM route itself need an update?
7. Is Tampermonkey projection in scope now or deferred?
```

## 8. Do Not

```text
- Do not treat field kits as runtime routers after project root files exist.
- Do not treat examples or Tampermonkey userscripts as command authority.
- Do not copy full owner logic into the root UCM or examples.
- Do not infer that a compact command prompt contains the complete current workflow.
- Do not claim a source was checked when it was not read.
- Do not create, edit, archive, commit or push from this read-only command.
```

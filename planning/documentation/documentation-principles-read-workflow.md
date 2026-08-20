# Documentation Principles Read Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.3.0-reusable-governance-bootstrap
Scope: bootstrap or refresh reusable documentation architecture/governance context, then resolve the task-specific Documentation Use Case and canonical owners before material documentation work.

## 1. Purpose

This workflow is the reusable process owner behind the bootstrap command aliases such as:

```text
бутстреп документации
бутстреп принципов документации
режим документации
прочитай принципы документации
прочти принципы документации
принципы документации
bootstrap reusable documentation principles
documentation governance mode
read documentation principles
documentation principles
docs principles
```

It is also a required preflight for `спланируй команду` when the route has not already been read and remembered in the current chat.

This workflow owns **how to establish governance context**. Semantic authority remains in the Direction/Use-Case Registries, principles, responsibility map and task-specific current owners.

## 2. Permission Boundary

```text
This route is read-only.
It may identify the selected Documentation Use Case,
canonical owners, required reads, risks and proposed follow-up work.
It does not create or edit files.
It does not create an archive.
It does not commit or push.
```

A separate command such as `план файл-обновление` plans changes. A separate output-package command such as `давай архив` authorizes creation of a replacement package after scope approval.

## 3. Full vs Targeted Bootstrap

Use a full bootstrap when:

```text
- reusable documentation governance has not been established in the current chat/session;
- the chat does not remember the architecture, ownership or update boundaries;
- the task changes command routing, reusable owners, templates, examples or portable/bootstrap behavior;
- ownership or source-of-truth placement is uncertain;
- a prior answer may have relied on a compact command prompt instead of owner files.
```

Use a targeted refresh only when:

```text
- a current full bootstrap was already completed in the chat;
- the relevant principles and boundaries are still clear;
- only the selected UC/current owner or recently changed sources need rereading.
```

When uncertain, use the full bootstrap.

## 4. Full Bootstrap Read Order

```text
1. planning/AI-WORKING-CONTRACT.md
2. planning/README.md
3. planning/direction-registry.md
4. planning/use-case-registry.md
5. planning/documentation/README.md
6. planning/documentation/direction-registry.md
7. planning/documentation/use-case-registry.md
8. planning/documentation/planning-docs-architecture-principles.md
9. planning/documentation/documentation-responsibility-map.md
10. select the applicable UC-DOC-* for the active task when one exists
11. read that Use Case's canonical workflow/owner route
12. read affected project/current owners required to perform or review the task
13. examples/helper projection only when they are separately relevant
```

For an explicit command invocation, `planning/command-routing.md` and the selected direct command definition are resolved before/around this owner route as required by the command system. Command Routing is not the semantic bootstrap owner.

Do not expand into unrelated repository files merely because the bootstrap is full.

## 5. Task-Specific Expansion

### Command planning

Read:

```text
planning/documentation/file-update-overview-workflow.md
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
planning/documentation/command-planning-workflow.md
planning/documentation/command-routing-workflow.md
planning/documentation/COMMAND-ROUTING-TEMPLATE.md
planning/documentation/example-coverage-workflow.md
planning/documentation/examples/README.md
```

Read Tampermonkey owners only when projection is explicitly part of the planned scope.

### Broad documentation update

Resolve the applicable `UC-DOC-*`, then read its reusable owner workflows/templates and affected current/project owners. Use `documentation-update-plan-workflow.md` for conceptual plan-only work and `documentation-update-workflow.md` for approved changes or replacement packages.

### Bootstrap or portable-copy work

`PORTABLE-STARTER-KIT.md` bootstraps the reusable owner/navigation architecture into another repository. It is not the runtime chat/session bootstrap owned by this workflow. While creating or restructuring repository-root artifacts, read the starter kit plus the current routed principles, workflows, templates and profiles that actually own the setup meaning; once runtime owners exist, those owners win.

## 6. Required Output

For an explicit bootstrap command, return a compact assimilation result:

```text
Reusable documentation governance loaded.

Selected Documentation Use Case:
  <UC-DOC-* / none yet>

Reusable owners loaded:
  <owners actually read>

Current/project owners:
  <task-specific owners / none yet>

Permission boundary:
  read-only bootstrap; follow-up work requires its own route/permission

Material unresolved ownership/questions:
  <findings / none>
```

If no active task exists, do not force a target question. State that governance is loaded and the next documentation task will be resolved through `DIR-DOCUMENTATION` / `UC-DOC-*`.

For internal preflight use (for example `спланируй команду`), this assimilation may feed the outer command rather than appear as a second independent command result.

## 7. Owner-Placement Checks

Before proposing documentation changes, determine:

```text
1. Is the information reusable or project-specific?
2. Is it Direction, Use Case, Scenario, principle, workflow, template, profile, example, navigation, tool note or current state?
3. Does an owner already exist?
4. Would a new file duplicate an existing owner?
5. Does natural navigation/read order need UC-DOC-MAINTAIN-NAVIGATION?
6. Does semantic registry meaning need UC-DOC-MAINTAIN-REGISTRIES?
7. Does Command Routing need UC-DOC-MAINTAIN-COMMAND?
8. Is Tampermonkey projection in scope now or merely derived follow-up?
```

## 8. Do Not

```text
- Do not create a second reusable-documentation bootstrap artifact merely for session orientation.
- Do not create a separate bootstrap-only owner type when current principles/workflows/templates/profiles or project owners can own the setup meaning.
- Do not treat examples, helper projections or Tampermonkey userscripts as semantic/command authority.
- Do not copy full owner logic into Command Routing, commands or examples.
- Do not infer that a compact command prompt contains the complete current workflow.
- Do not claim a source was checked when it was not read.
- Do not create, edit, archive, commit or push from this read-only route.
```

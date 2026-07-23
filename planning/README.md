# OBS Planning Root

Status: active project-specific root planning router
Doc version: v0.5.0-planning-item-full-picture-workflow
Scope: OBS repository planning entry point, local routing and source-of-truth pointers built on the reusable documentation layer copied under `planning/documentation/`.

## 1. Purpose

This root file is the project-specific entry point for planning work in the OBS repository.

The reusable process layer lives in:

```text
planning/documentation/
```

OBS-specific applications live in:

```text
planning/areas/
```

Do not put reusable rules into local area docs when the rule belongs to `planning/documentation/`.

## 2. Source-Of-Truth Split

```text
Reusable process rules:
  planning/documentation/

OBS root command routing:
  planning/planning-use-case-map.md

OBS root workflow/task activation:
  planning/workflow-activation-map.md

OBS root source/owner register:
  planning/root-source-sync-register.md

OBS local areas:
  planning/areas/planning-system/
  planning/areas/conspects/
  planning/areas/documentation-workbench/
```

Rules:

```text
- `planning/documentation/` owns reusable documentation workflows, planning method,
  command creation, templates, field kits, parallel work and reusable helper rules.
- `planning/planning-use-case-map.md` owns concrete command routing and canonical English names.
- Area docs own project-local application state and accepted product workflows.
- Root files route and register owners; they do not copy complete owner algorithms.
- Examples demonstrate behavior; they do not own rules.
- Tampermonkey helper is projection only, not command authority.
```

A separate root Direction Registry and local semantic Use-Case Registries are planned in a later batch. They are not claimed as current owners yet.

## 3. Read Order For New Chats

If root planning files exist:

```text
1. planning/README.md
2. planning/planning-use-case-map.md
3. planning/workflow-activation-map.md
4. planning/root-source-sync-register.md
5. relevant command/task owner docs under planning/areas/ or planning/documentation/
6. relevant item/source register when semantic reconciliation depends on it
7. Dashboard userscript/runtime help, JSON import/export and repo round-trip contract
   when the task concerns local planning data
```

If root planning files are missing or being bootstrapped:

```text
1. planning/documentation/PORTABLE-STARTER-KIT.md
2. planning/documentation/field-kits/root-use-case-map-field-kit.md
3. other field kits as needed
```

After root files exist, starter kits are not runtime routers.

## 4. Local Areas

| Area | Path | Purpose |
|---|---|---|
| Planning runtime | `planning/areas/planning-system/` | Minimal technical index and the operational `конец` workflow. Dashboard planning rules and field help live in the Dashboard userscript/UI. |
| Conspects | `planning/areas/conspects/` | Conspect review/repetition planning and local knowledge-work application. |
| Documentation Workbench | `planning/areas/documentation-workbench/` | Project-local Application Root, accepted Documentation/Reference Object and Planning Item/Full Picture workflows, supporting models and the complete source-linked Planning Item register. |

Documentation Workbench read order:

```text
planning/areas/documentation-workbench/README.md
  → planning/areas/documentation-workbench/full-picture.md
  → affected end-to-end workflow owner
  → affected supporting model
  → targeted sections of planning/areas/documentation-workbench/planning-item-register.md
  → relevant reusable owners under planning/documentation/application-planning/
```

Planning Item/Full Picture target owner:

```text
planning/areas/documentation-workbench/
  complete-pictures/planning-items-and-full-picture/full-picture.md
```

Documentation/Reference Object target owner:

```text
planning/areas/documentation-workbench/
  documentation-and-reference-object-end-to-end-workflow.md
```

## 5. Current Documentation Workbench Structural State

```text
Application Root:
  planning/areas/documentation-workbench/full-picture.md

Accepted Complete Pictures:
  Documentation And Reference Object End-To-End Workflow
  Planning Item And Full Picture End-To-End Workflow

Supporting model:
  Reference Object Model And Lifecycle

Canonical item/source register:
  51 active Planning Items
```

The two Complete Pictures have an explicit handoff. Planning Item formation/review does not duplicate document/reference authoring; document/reference authoring does not repeat already completed application-native item confirmation.

Chat/AI/Work-State remains provisional pending the same end-to-end review criterion.

## 6. Tampermonkey Helper

The full reusable helper lives inside the reusable documentation layer:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not create a tracked local `tools/tampermonkey/` copy by default. If a project intentionally forks the reusable helper, document the fork reason and keep the fork clearly project-local.

The helper already projects accepted commands such as `сверь айтемы`. Direction/Use-Case/Orientation surfaces and the item-formation command remain later batches.

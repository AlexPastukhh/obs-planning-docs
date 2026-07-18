# OBS Planning Root

Status: active project-specific root planning router
Doc version: v0.3.0-documentation-workbench-area
Scope: OBS repository planning entry point, local routing, and source-of-truth pointers built on the reusable documentation layer copied under `planning/documentation/`.

## 1. Purpose

This root file is the project-specific entry point for planning work in the OBS repository.

The reusable process layer lives in:

```text
planning/documentation/
```

OBS-specific application lives in:

```text
planning/areas/
```

Do not put reusable rules into local area docs when the rule belongs to `planning/documentation/`.

## 2. Source-Of-Truth Split

```text
Reusable process rules:
  planning/documentation/

OBS root routing:
  planning/planning-use-case-map.md
  planning/workflow-activation-map.md
  planning/root-source-sync-register.md

OBS local areas:
  planning/areas/planning-system/
  planning/areas/conspects/
  planning/areas/documentation-workbench/
```

Rules:

```text
- `planning/documentation/` owns reusable documentation workflows, command creation workflow, field kits, parallel-work workflow and reusable Tampermonkey helper rules.
- `planning/planning-use-case-map.md` owns OBS concrete command routing.
- Area docs own only their local application details.
- Examples demonstrate behavior; they do not own rules.
- Tampermonkey helper is projection only, not command authority.
```

## 3. Read Order For New Chats

If root planning files exist:

```text
1. planning/README.md
2. planning/planning-use-case-map.md
3. planning/workflow-activation-map.md
4. planning/root-source-sync-register.md
5. Relevant command owner docs under planning/areas/ or planning/documentation/
6. Dashboard userscript/runtime help, JSON import/export and repo round-trip contract when the task concerns local planning data
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
| Documentation Workbench | `planning/areas/documentation-workbench/` | Project-local Application Root Draft, complete working Planning Item register and coordination of Documentation Workbench complete pictures. |

Documentation Workbench read order:

```text
planning/areas/documentation-workbench/README.md
  → planning/areas/documentation-workbench/full-picture.md
  → targeted sections of planning/areas/documentation-workbench/planning-item-register.md
  → relevant reusable owners under planning/documentation/application-planning/
```

## 5. Tampermonkey Helper

The full reusable helper lives inside the reusable documentation layer:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not create a tracked local `tools/tampermonkey/` copy by default. If a project intentionally forks the reusable helper, document the fork reason and keep the fork clearly project-local.

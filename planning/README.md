# OBS Planning Root

Status: active project-specific root planning router
Doc version: v0.7.0-semantic-helper-projection
Scope: OBS repository planning entry point, semantic Direction orientation, concrete command routing, task activation and source/owner pointers built on the reusable documentation layer.

## 1. Purpose

```text
planning/README.md
  → root orientation;

planning/direction-registry.md
  → broad semantic Directions and local registry routes;

planning/planning-use-case-map.md
  → concrete executable command routes;

planning/workflow-activation-map.md
  → task/use-case activation;

planning/root-source-sync-register.md
  → root/local owner inventory;

planning/planning-input-conventions.md
  → project-readable planning input conventions.
```

Reusable process owners: `planning/documentation/`.

Project-local applications: `planning/areas/`.

## 2. Source-Of-Truth Split

```text
Reusable workflows/principles/terminology/templates:
  planning/documentation/

Root semantic Direction orientation:
  planning/direction-registry.md

Local semantic Direction/Use-Case entries:
  planning/documentation/<family>/*-registry.md
  planning/areas/<area>/*-registry.md

Root command routing and canonical English names:
  planning/planning-use-case-map.md

Task/use-case activation routing:
  planning/workflow-activation-map.md

Project input conventions:
  planning/planning-input-conventions.md

Root owner/source register:
  planning/root-source-sync-register.md

Concrete local planning state:
  planning/areas/
```

Registries own semantic entries; the UCM owns commands and permissions; workflows own repeated behavior; templates own recommended shape; area owners own concrete state; root files reference rather than copy; examples and Tampermonkey are not authority.

## 3. New-Chat Orientation Read Order

```text
1. planning/README.md
2. planning/direction-registry.md
3. relevant local/reusable Direction Registry
4. relevant Use-Case Registry
5. complete owner workflow/area
6. planning/planning-use-case-map.md when a command is involved
7. planning/workflow-activation-map.md for activation details
8. planning/root-source-sync-register.md for owner/source status
9. planning/planning-input-conventions.md when source markers/settings matter
10. targeted item/source register when reconciliation depends on it.
```

For command-first input, read the root UCM immediately after this file and follow its owner route.

Bootstrap files are used only when root files do not exist.

## 4. Local Areas

| Area | Path | Purpose |
|---|---|---|
| Planning runtime | `planning/areas/planning-system/` | Minimal technical index and operational `конец` workflow. Dashboard runtime owns planning schema/help and sync. |
| Conspects | `planning/areas/conspects/` | Conspect review/repetition planning. |
| Documentation Workbench | `planning/areas/documentation-workbench/` | Application Root, accepted workflows, supporting model, local registries and source-linked item register. |

Documentation Workbench route:

```text
planning/areas/documentation-workbench/README.md
  → direction-registry.md
  → use-case-registry.md
  → full-picture.md
  → selected workflow/model owner
  → targeted planning-item-register.md items/sources
  → relevant reusable owners.
```

## 5. Current Documentation Workbench State

```text
Application Root:
  planning/areas/documentation-workbench/full-picture.md

Accepted Complete Pictures:
  Documentation And Reference Object End-To-End Workflow
  Planning Item And Full Picture End-To-End Workflow

Supporting model:
  Reference Object Model And Lifecycle

Local semantic registries:
  direction-registry.md
  use-case-registry.md

Canonical register:
  51 active Planning Items.
```

Chat/AI/Work-State remains provisional.

## 6. Planning Item Formation Entry

Semantic use case: `Form Planning Items From Discussion`.

Reusable owner: `planning/documentation/application-planning/planning-item-formation-workflow.md`.

Input conventions: `planning/planning-input-conventions.md`.

There is no root UCM command yet because the canonical Russian command, English name and aliases are unresolved.

## 7. Tampermonkey Planning Helper

Current helper surfaces:

```text
Orientation
Directions
Use Cases
Commands
```

Authority:

```text
Orientation → planning/README.md + planning/direction-registry.md;
Directions  → root/local Direction Registries;
Use Cases   → reusable-family/local Use-Case Registries;
Commands    → planning/planning-use-case-map.md.
```

The helper performs composer insertion/copy only. It does not write repository files, call Git or grant permissions.

`Reconcile Planning Items` redirects to the existing `сверь айтемы` command instead of creating a duplicate execution action.

`Form Planning Items From Discussion` is projected under Use Cases only. No command profile exists until its canonical Russian command, canonical English name and aliases are explicitly accepted.

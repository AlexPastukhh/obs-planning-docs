# OBS Planning Root

Status: active project-specific root planning router
Doc version: v0.12.0-replacement-package-app-root
Scope: OBS repository planning entry point, semantic Direction orientation, concrete command routing, task activation and source/owner pointers built on the reusable documentation layer.

## 1. Purpose

```text
planning/README.md
  → root orientation;

planning/direction-registry.md
  → broad semantic Directions and local registry routes;

planning/planning-use-case-map.md
  → root command-system entry and shared routing/global policy;

planning/commands/
  → direct repository-owned concrete command definitions;

planning/workflow-activation-map.md
  → task/use-case activation;

planning/root-source-sync-register.md
  → root/local owner inventory;

planning/planning-input-conventions.md
  → project-readable planning input conventions.
```

Reusable process owners: `planning/documentation/`.

Project-local planning applications usually live in `planning/areas/`; explicitly self-contained tool/application roots may live under `planning/documentation/tools/` when docs, source and tests are intentionally colocated.

## 2. Source-Of-Truth Split

```text
Reusable workflows/principles/terminology/templates:
  planning/documentation/

Root semantic Direction orientation:
  planning/direction-registry.md

Local semantic Direction/Use-Case entries:
  planning/documentation/<family>/*-registry.md
  planning/areas/<area>/*-registry.md
  explicitly owned project-local application registries such as:
    planning/documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md
    planning/documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md

Root command-system entry and shared routing policy:
  planning/planning-use-case-map.md

Concrete command definitions and canonical English names:
  planning/commands/*.command.md

Task/use-case activation routing:
  planning/workflow-activation-map.md

Project input conventions:
  planning/planning-input-conventions.md

Root owner/source register:
  planning/root-source-sync-register.md

Concrete local planning state:
  planning/areas/
```

Registries own semantic entries; the root UCM owns command-system entry/global routing policy; direct `planning/commands/*.command.md` files own individual concrete commands and canonical English names; workflows own repeated behavior; templates own recommended shape; area/application owners own concrete state. Root files reference rather than copy. Runtime code does not define Planning command meaning. The tracked Linked Notes and Replacement Package App `USE-CASE-MAP.md` / `USE-CASE-REGISTRY.md` files are explicit project-local semantic documentation roots colocated with their application source.

## 3. New-Chat Orientation Read Order

```text
1. planning/README.md
2. planning/direction-registry.md
3. relevant local/reusable Direction Registry
4. relevant Use-Case Registry
5. complete owner workflow/area
6. planning/planning-use-case-map.md when a command is involved
7. planning/commands/README.md and the selected direct `*.command.md` definition
8. planning/workflow-activation-map.md for activation details
9. planning/root-source-sync-register.md for owner/source status
10. planning/planning-input-conventions.md when source markers/settings matter
11. targeted item/source register when reconciliation depends on it.
```

For command-first input, read the root UCM immediately after this file, resolve the selected definition from `planning/commands/`, then follow that definition's owner route.

Bootstrap files are used only when root files do not exist.

## 4. Local Areas

| Area | Path | Purpose |
|---|---|---|
| Planning runtime | `planning/areas/planning-system/` | Minimal technical index and operational `конец` workflow. Dashboard runtime owns planning schema/help and sync. |
| Conspects | `planning/areas/conspects/` | Conspect review/repetition planning. |
| Documentation Workbench | `planning/areas/documentation-workbench/` | Repository-native documentation planning, stable links, affected-use review, local registries and source-linked item/history context. Linked Notes-specific area files are compatibility/planning history rather than current application semantics. |

Documentation Workbench planning route:

```text
planning/areas/documentation-workbench/README.md
  → planning-draft.md
  → direction-registry.md
  → use-case-registry.md
  → selected current non-Linked-Notes workflow/model owner
  → targeted planning-item-register.md items/sources
  → relevant reusable owners.
```

Current Linked Notes application route:

```text
planning/documentation/tools/tampermonkey/linked-notes/README.md
  → USE-CASE-MAP.md
  → USE-CASE-REGISTRY.md
  → APP-OVERVIEW.md
  → focused implementation/state docs.
```

Do not route current Linked Notes behavior through `planning/areas/documentation-workbench/`; retained Linked Notes files there are compatibility/planning history.

Current Replacement Package App route:

```text
planning/documentation/tools/replacement-package-app/README.md
  → USE-CASE-MAP.md
  → USE-CASE-REGISTRY.md
  → PACKAGE-PROTOCOL.md
  → ARCHITECTURE.md
  → DATA-AND-STATE.md
  → focused Java source/tests.
```

The app is the local consumer of `давай архив` packages. Its semantic/runtime docs do not redefine the Planning command; shared producer/consumer protocol is synchronized through the Reference Object in `PACKAGE-PROTOCOL.md`.

## 5. Current Documentation Workbench / Linked Notes Boundary

```text
Documentation Workbench high-level planning/history owner:
  planning/areas/documentation-workbench/planning-draft.md

Accepted current Documentation Workbench End-To-End Workflows:
  Repository Documentation Change And Reference Review
  Planning Meaning To Repository

Documentation Workbench local registries:
  direction-registry.md
  use-case-registry.md
    → current non-Linked-Notes Use Cases
    → compatibility mappings for former Linked Notes UC-DW-* IDs

Current Linked Notes semantic/product root:
  planning/documentation/tools/tampermonkey/linked-notes/
  USE-CASE-MAP.md
  USE-CASE-REGISTRY.md

Supporting deferred Documentation Workbench model:
  Reference Object Model And Lifecycle
    → deferred application-heavy alternative, not current Linked Notes Reference Objects

Canonical planning register:
  53 reviewed canonical items with active/deferred/retired dispositions.

Removed local artifacts:
  reference-link experiment;
  project-local scenarios/** workspace.
```

Chat/AI/Work-State remains provisional. Current Linked Notes semantics are not provisional merely because their earlier Documentation Workbench owners were; their current `UC-LN-*` statuses are owned by the Linked Notes-local registry.

## 6. Planning Item Formation Entry

Semantic use case: `Form Planning Items From Discussion`.

Reusable owner: `planning/documentation/application-planning/planning-item-formation-workflow.md`.

Input conventions: `planning/planning-input-conventions.md`.

Active repository command definition:

```text
planning/commands/form-items.command.md
сформируй айтемы
English name: form items
```

The command forms complete reviewable Planning Items and remains read-only toward repository files.

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
Commands    → planning/planning-use-case-map.md → planning/commands/*.command.md.
```

Normal command execution remains composer insertion/copy only. The explicit Commands management surface may read the repository command catalog and create/update only direct `planning/commands/*.command.md` files through GitHub with SHA-aware exact read-back verification. It never runs local Git, commit or push.

`Reconcile Planning Items` redirects to the existing `сверь айтемы` command instead of creating a duplicate execution action.

`Form Planning Items From Discussion` redirects to the accepted `сформируй айтемы / form items` command profile.

# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v0.6.0-planning-item-full-picture-workflow
Scope: register root planning files and local area ownership for OBS planning infrastructure.

## 1. Root Files

| File | Role | Source |
|---|---|---|
| `planning/README.md` | Root planning entry point | OBS local root file created from reusable docs model. |
| `planning/planning-use-case-map.md` | Concrete OBS command router | Created from `planning/documentation/field-kits/root-use-case-map-field-kit.md`. |
| `planning/workflow-activation-map.md` | Workflow/task activation router | OBS local root file. |
| `planning/root-source-sync-register.md` | Root source/owner register | OBS local root file. |

Planned but not yet created:

```text
planning/direction-registry.md
planning/planning-input-conventions.md
```

Their future roles belong to later accepted batches and are not claimed by current files.

## 2. Reusable Layer

| Path | Role |
|---|---|
| `planning/documentation/` | Copied reusable documentation/process layer. |
| `planning/documentation/application-planning/` | Reusable solution/workflow planning terminology, principles, drafting workflow and templates. |
| `planning/documentation/field-kits/` | Bootstrap kits for creating root/project-specific files. |
| `planning/documentation/tools/tampermonkey/` | Reusable full Tampermonkey helper and docs. |

Planned reusable additions:

```text
planning/documentation/application-planning/planning-item-formation-workflow.md
planning/documentation/application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
Direction/Use-Case registry workflow and templates
```

## 3. Local Areas

| Path | Role |
|---|---|
| `planning/areas/planning-system/` | Minimal runtime index plus the operational end-session command owner. Dashboard schema/help, JSON import/export and repo round trip live in the userscript. |
| `planning/areas/conspects/` | Conspect planning/repetition area. |
| `planning/areas/documentation-workbench/` | Project-local Documentation Workbench area. Owns its Application Root, accepted end-to-end Complete Pictures, supporting models and complete source-linked Planning Item register. |

## 4. Documentation Workbench Area Files

| File | Role | Source |
|---|---|---|
| `planning/areas/documentation-workbench/README.md` | Area entry, ownership and read/update order | Current project-local responsibility split and accepted Complete Picture criterion. |
| `planning/areas/documentation-workbench/full-picture.md` | Application Root Full Picture / product and workflow coordinator | Built from the source-linked register, accepted structural reconciliations and current project-local owners. |
| `planning/areas/documentation-workbench/documentation-and-reference-object-end-to-end-workflow.md` | Accepted trigger-to-result Documentation And Reference Object Complete Picture | Built from former CP-2/CP-3/CP-4/CP-7 meanings, 30 active items and explicit acceptance. |
| `planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md` | Accepted trigger-to-result Planning Item And Full Picture Complete Picture | Built from the accepted recent-chat reconciliation, 11 direct active items and the explicit downstream handoff. |
| `planning/areas/documentation-workbench/reference-object-model-and-lifecycle.md` | Supporting Reference Object model and accepted transformation history | Built from the former ten-item model, accepted eight-item result and later managed-Planning-Item boundary correction. |
| `planning/areas/documentation-workbench/planning-item-register.md` | Complete active source-linked item register and transformation history | Migrated from the v0.9.2 source, evolved through the accepted Documentation/Reference transition and accepted recent-chat reconciliation. Current active count: 51. |

## 5. Current Accepted Structural State

```text
Application Root
  → planning/areas/documentation-workbench/full-picture.md;

accepted Complete Picture A
  → Documentation And Reference Object End-To-End Workflow;

accepted Complete Picture B
  → Planning Item And Full Picture End-To-End Workflow;

supporting model
  → Reference Object Model And Lifecycle;

canonical item/source register
  → 51 active Planning Items;

former CP-2/CP-3/CP-4/CP-7
  → historical mappings, not current peer owners;

remaining provisional slice
  → Chat/AI/Work-State.
```

Explicit cross-workflow handoff:

```text
application-native confirmed Planning Item
  → already a managed Reference Object
  → downstream workflow assigns/materializes durable owner/location/home/references;

portable reviewed item
  → remains portable or enters proposal/confirmation before managed creation.
```

## 6. Accepted Item Mappings

```text
ITEM-25B → ITEM-23B
ITEM-102 → ITEM-91

active register:
  50 → 48 through Documentation/Reference reconciliation
  48 → 51 through accepted recent-chat reconciliation

new active product identities:
  ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER
  ITEM-122 / TYPED-SOURCE-CONTRIBUTIONS
  ITEM-123 / CONFIGURABLE-APPLICATION-SETTINGS
```

`ITEM-22B / ITEM-TO-OBJECT` remains the stable technical identity and is semantically updated to own the Planning Item/managed Reference Object boundary.

## 7. Not Checked / Not Implemented

```text
- Existing OBS vault note taxonomy was not fully audited in this batch.
- Existing conspect folder names/content were not imported into planning/areas/conspects/.
- Documentation Workbench runtime/code behavior was not audited or implemented.
- Exact structured-response syntax, Markdown marker syntax, app-only durability
  and runtime architecture remain unresolved.
- Reusable Planning Item Formation docs, Direction/Use-Case registries,
  project input conventions and Tampermonkey semantic surfaces remain later batches.
- Prototype-Depth Scenario/Domain/Slice methodology remains a separate task.
```

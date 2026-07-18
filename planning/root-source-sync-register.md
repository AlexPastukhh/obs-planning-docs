# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v0.5.0-documentation-reference-workflow
Scope: register root planning files and local area ownership for OBS planning infrastructure.

## 1. Root Files

| File | Role | Source |
|---|---|---|
| `planning/README.md` | Root planning entry point | OBS local root file created from reusable docs model. |
| `planning/planning-use-case-map.md` | Concrete OBS command router | Created from `planning/documentation/field-kits/root-use-case-map-field-kit.md`. |
| `planning/workflow-activation-map.md` | Workflow activation router | OBS local root file. |
| `planning/root-source-sync-register.md` | Root source/register | OBS local root file. |

## 2. Reusable Layer

| Path | Role |
|---|---|
| `planning/documentation/` | Copied reusable documentation/process layer. |
| `planning/documentation/field-kits/` | Bootstrap kits for creating root/project-specific files. |
| `planning/documentation/tools/tampermonkey/` | Reusable full Tampermonkey helper and docs. |

## 3. Local Areas

| Path | Role |
|---|---|
| `planning/areas/planning-system/` | Minimal runtime index plus the operational end-session command owner. Dashboard planning schema/help, JSON import/export and repo Markdown round-trip live in the userscript. |
| `planning/areas/conspects/` | Conspect planning/repetition area. |
| `planning/areas/documentation-workbench/` | Project-local Documentation Workbench area. Owns its area entry, Application Root Full Picture, accepted end-to-end workflow owners, supporting models and complete source-linked Planning Item register. |

## 4. Documentation Workbench Area Files

| File | Role | Source |
|---|---|---|
| `planning/areas/documentation-workbench/README.md` | Area entry, ownership and read/update order | Current project-local responsibility split and accepted Complete Picture criterion. |
| `planning/areas/documentation-workbench/full-picture.md` | Application Root Full Picture / product and workflow coordinator | Built from the v0.9.2 source register, accepted structural reconciliation and current project-local owners. |
| `planning/areas/documentation-workbench/documentation-and-reference-object-end-to-end-workflow.md` | Accepted trigger-to-result Documentation And Reference Object Complete Picture | Built from former CP-2/CP-3/CP-4/CP-7 meanings, 30 active items and explicit user acceptance. |
| `planning/areas/documentation-workbench/reference-object-model-and-lifecycle.md` | Supporting Reference Object model and accepted transformation history | Built from the former ten-item model, accepted eight-item result and source-linked corrections. |
| `planning/areas/documentation-workbench/planning-item-register.md` | Complete active source-linked item register and transformation history | Migrated from `current-uncovered-documentation-workbench-items-register-v0.9.2-consolidated.md`, source SHA-256 `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`, then evolved through accepted reconciliation. Current active count: 48. |

## 5. Current Accepted Structural State

```text
Application Root
  → full-picture.md;

accepted Complete Picture
  → documentation-and-reference-object-end-to-end-workflow.md;

supporting model
  → reference-object-model-and-lifecycle.md;

former CP-2/CP-3/CP-4/CP-7
  → historical mappings, not current peer workflow owners;

provisional slices
  → Chat/AI/Work-State;
  → Planning/Full Picture/Deepening.
```

Accepted item mappings:

```text
ITEM-25B → ITEM-23B
ITEM-102 → ITEM-91
active register: 50 → 48
```

## 6. Not Checked

```text
- Existing OBS vault note taxonomy was not fully audited in this package.
- Existing conspect folder names/content were not imported into planning/areas/conspects/.
- Documentation Workbench runtime/code behavior was not audited or implemented by this planning update.
- Exact Markdown marker syntax, app-only durability and runtime architecture remain unresolved.
```

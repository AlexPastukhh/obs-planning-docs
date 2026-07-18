# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v0.3.0-documentation-workbench-area
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
| `planning/areas/documentation-workbench/` | Project-local Documentation Workbench planning area. Owns its area entry, Application Root Full Picture and complete working Planning Item register. |

## 4. Documentation Workbench Area Files

| File | Role | Source |
|---|---|---|
| `planning/areas/documentation-workbench/README.md` | Area entry, ownership and read/update order | Created from the current root/local-area architecture and reusable application-planning responsibility split. |
| `planning/areas/documentation-workbench/full-picture.md` | Item-backed Application Root Planning Draft / complete product picture | Built from the v0.9.2 consolidated item source and the seven reviewed Primary Complete Pictures. |
| `planning/areas/documentation-workbench/planning-item-register.md` | Complete active working source-linked item register | Migrated from `current-uncovered-documentation-workbench-items-register-v0.9.2-consolidated.md`, SHA-256 `abfcfc6ad0d9e8ff2516ec7e5d572e50c5524661cca94fdbebc0646d8fc7f8ce`. Proposed reconciliation transformations are not applied by this migration. |

## 5. Not Checked

```text
- Existing OBS vault note taxonomy was not fully audited in this package.
- Existing conspect folder names/content were not imported into planning/areas/conspects/.
- Documentation Workbench runtime/code behavior was not audited or implemented by this planning-area package.
- No GitHub commit/push was performed.
```

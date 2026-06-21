# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v0.1.0
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
| `planning/areas/planning-system/` | Scenario planning workspace and commands. |
| `planning/areas/conspects/` | Conspect planning/repetition area. |

## 4. Not Checked

```text
- Existing OBS vault note taxonomy was not fully audited in this package.
- Existing conspect folder names/content were not imported into planning/areas/conspects/.
- No GitHub commit/push was performed.
```

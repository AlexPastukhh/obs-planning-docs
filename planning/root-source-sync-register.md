# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v0.9.0-whole-repository-planning-owner-audit
Scope: register root planning files, reusable owners and local area ownership for OBS planning infrastructure.

## 1. Root Files

| File | Role | Source |
|---|---|---|
| `planning/README.md` | Root planning orientation | OBS project-local root owner. |
| `planning/direction-registry.md` | Root semantic Direction Registry and local registry references | Accepted Direction/Use-Case reconciliation. |
| `planning/planning-use-case-map.md` | Concrete OBS command router | Root UCM created from reusable field-kit model. |
| `planning/workflow-activation-map.md` | Task/Direction/Use-Case activation router | OBS root owner. |
| `planning/root-source-sync-register.md` | Root source/owner register | OBS root owner. |
| `planning/planning-input-conventions.md` | Project-readable planning input conventions | Accepted `it(` / `)it` delimiter meaning. |

## 2. Reusable Layer

| Path | Role |
|---|---|
| `planning/documentation/` | Reusable documentation/process layer. |
| `planning/documentation/direction-and-use-case-registry-workflow.md` | Registry hierarchy, topology, activation and ownership. |
| `planning/documentation/DIRECTION-REGISTRY-TEMPLATE.md` | Direction Registry shape. |
| `planning/documentation/USE-CASE-REGISTRY-TEMPLATE.md` | Use-Case Registry shape. |
| `planning/documentation/application-planning/` | Reusable planning terminology, principles, formation, drafting, registries and templates. |
| `planning/documentation/application-planning/direction-registry.md` | Reusable planning Direction entries. |
| `planning/documentation/application-planning/use-case-registry.md` | Reusable planning Use-Case entries. |
| `planning/documentation/field-kits/` | Bootstrap/setup guidance only. |
| `planning/documentation/tools/tampermonkey/` | Helper implementation; projection only. |

## 3. Local Areas

| Path | Role |
|---|---|
| `planning/areas/planning-system/` | Minimal runtime index and operational end-session owner. |
| `planning/areas/conspects/` | Conspect planning/repetition area. |
| `planning/areas/documentation-workbench/` | Application Root, accepted Complete Pictures, supporting model, local registries and item register. |

## 4. Documentation Workbench Files

| File | Role |
|---|---|
| `planning/areas/documentation-workbench/README.md` | Area entry/read/update discipline. |
| `planning/areas/documentation-workbench/direction-registry.md` | Local product/planning Directions. |
| `planning/areas/documentation-workbench/use-case-registry.md` | Accepted local workflows/capabilities and provisional candidates. |
| `planning/areas/documentation-workbench/full-picture.md` | Application Root Full Picture. |
| `planning/areas/documentation-workbench/documentation-and-reference-object-end-to-end-workflow.md` | Accepted Documentation/Reference Object workflow. |
| `planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md` | Accepted Planning Item/Full Picture workflow. |
| `planning/areas/documentation-workbench/reference-object-model-and-lifecycle.md` | Supporting model. |
| `planning/areas/documentation-workbench/planning-item-register.md` | Complete source-linked register; 51 active items. |

## 5. Current Structural State

```text
root Direction Registry → planning/direction-registry.md;
reusable planning registries → application-planning/direction-registry.md + use-case-registry.md;
Documentation Workbench registries → direction-registry.md + use-case-registry.md;
accepted local Complete Pictures → Documentation/Reference + Planning Item/Full Picture;
supporting model → Reference Object Model And Lifecycle;
canonical register → 51 active Planning Items.
```

## 6. Accepted Item Mappings

```text
ITEM-25B → ITEM-23B
ITEM-102 → ITEM-91

active register:
  50 → 48 through Documentation/Reference reconciliation
  48 → 51 through accepted recent-chat reconciliation

new active identities:
  ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER
  ITEM-122 / TYPED-SOURCE-CONTRIBUTIONS
  ITEM-123 / CONFIGURABLE-APPLICATION-SETTINGS
```

`ITEM-22B / ITEM-TO-OBJECT` remains the stable Planning Item/managed Reference Object boundary identity.

## 6A. Tampermonkey Projection

Owners:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Accepted surfaces:

```text
Orientation → planning/README.md + planning/direction-registry.md;
Directions  → accepted Direction Registries;
Use Cases   → accepted/provisional-supported Use-Case Registries;
Commands    → planning/planning-use-case-map.md.
```

Boundaries:

- the helper does not own semantic entries, commands or permissions;
- Adaptive and Full share one definition;
- command-related Use Cases do not duplicate command execution;
- no item-formation command exists before exact UCM naming;
- Chat/AI/Work-State remains provisional;
- the helper performs no repository write, Git or external network behavior.

## 6B. Batch 6 Planning-Owner Consistency Audit

Checked current owners and references:

```text
33 current Batch 1–5 root/reusable/local owner files;
planning/planning-use-case-map.md;
planning/documentation/reviewable-agent-output-and-commands-workflow.md;
planning/documentation/documentation-update-workflow.md;
planning/documentation/profiles/scenario-domain-slice-docs-profile.md;
planning/documentation/profiles/scenario-domain-slice-use-case-field-kit.md.
```

Validation result:

```text
terminology:
  retired InformationItem / Origin wording appears only in explicit
  retirement rules, negative boundaries, transformation history
  or preserved source messages;

entities:
  no active Source Idea or Planning Item Candidate entity;

ownership:
  registries own semantic entries;
  UCM owns executable commands and canonical English names;
  workflows own repeated behavior;
  project-local files own concrete state;
  Tampermonkey owns projection only;

links:
  45 Markdown links in the checked current owner set resolved;
  all 20 userscript owner/source paths resolved in the checked
  owner set or through direct current-main verification;

Planning Items:
  51 active items preserved;
  ITEM-121 / ITEM-122 / ITEM-123 preserved;
  portable/application-native and managed-item boundaries preserved;

Tampermonkey:
  JavaScript syntax check passed;
  one Orientation, four Directions, twelve Use Cases
  and eleven projected UCM commands;
  projected command English names match the root UCM;
  no external network, repository-write, commit or push behavior.
```

Corrections were limited to stale Batch 4/5/6 transition/status statements. No semantic identities, item counts, command routes or runtime architecture were changed.

## 7. Remaining Work

```text
- exact item-formation command names and UCM route;
- Chat/AI/Work-State trigger-to-result review;
- Prototype-Depth Scenario/Domain/Slice methodology;
- runtime/storage/parser/Markdown-reference architecture.
```

Runtime implementation outside the Tampermonkey planning-helper syntax/projection boundary was not audited or implemented by these documentation batches.

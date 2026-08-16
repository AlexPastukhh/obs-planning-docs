# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v1.5.0-linked-notes-local-semantic-root
Scope: register root planning files, reusable owners and current local area ownership for OBS planning infrastructure.

## 1. Root Files

| File | Role | Source |
|---|---|---|
| `planning/README.md` | Root planning orientation | OBS project-local root owner. |
| `planning/direction-registry.md` | Root semantic Direction Registry and local registry references | Accepted Direction/Use-Case reconciliation. |
| `planning/planning-use-case-map.md` | OBS command-system entry/global routing policy | Root UCM. |
| `planning/commands/` | Direct concrete command-definition registry | Project command authority below the root UCM. |
| `planning/workflow-activation-map.md` | Task/Direction/Use-Case activation router | OBS root owner. |
| `planning/root-source-sync-register.md` | Root source/owner register | OBS root owner. |
| `planning/planning-input-conventions.md` | Project-readable planning input conventions | Accepted source/input meaning. |

## 2. Reusable Layer

| Path | Role |
|---|---|
| `planning/documentation/` | Reusable documentation/process layer. |
| `planning/documentation/direction-and-use-case-registry-workflow.md` | Registry hierarchy, topology, activation and ownership. |
| `planning/documentation/application-planning/` | Reusable Planning Item formation, sufficient Planning Draft contract, reconciliation, optional detailed profile and templates. |
| `planning/documentation/application-planning/application-planning-principles-and-terminology.md` | Canonical planning terminology and sufficiency rules. |
| `planning/documentation/application-planning/application-planning-drafting-workflow.md` | Planning Draft and reconciliation workflow. |
| `planning/documentation/application-planning/templates/PLANNING-DRAFT-TEMPLATE.md` | Recommended Planning Draft shape with required Key Scenario coverage and Full Picture Matrix. |
| `planning/documentation/application-planning/direction-registry.md` | Reusable planning Direction entries. |
| `planning/documentation/application-planning/use-case-registry.md` | Reusable planning Use-Case entries. |
| `planning/documentation/profiles/` | Optional specialized profiles; not universal stages. |
| `planning/documentation/field-kits/` | Bootstrap/setup guidance only. |
| `planning/documentation/tools/tampermonkey/` | Helper implementation/tool documentation. The project-local `linked-notes/` subdirectory explicitly owns current Linked Notes semantic/product documentation; scripts themselves do not define command meaning. |

## 3. Local Areas

| Path | Role |
|---|---|
| `planning/areas/planning-system/` | Minimal runtime index and operational end-session owner. |
| `planning/areas/conspects/` | Conspect planning/repetition area. |
| `planning/areas/documentation-workbench/` | Repository-native Documentation Workbench planning/history. Linked Notes-specific files here are compatibility/planning context, not current Linked Notes semantic authority. |

## 4. Documentation Workbench Current Files

| File | Role |
|---|---|
| `planning/areas/documentation-workbench/README.md` | Area entry/read/update discipline and current workflow/supporting-prototype navigation. |
| `planning/areas/documentation-workbench/planning-draft.md` | Sole current high-level owner; complete Key Scenarios and Full Picture Matrix. |
| `planning/areas/documentation-workbench/planning-item-register.md` | Complete source-linked current/deferred item owner and retired index; 53 reviewed canonical identities. |
| `planning/areas/documentation-workbench/retired-planning-items.md` | Complete finalized inactive bodies and preserved history. |
| `planning/areas/documentation-workbench/planning-meaning-to-repository-workflow.md` | Accepted Planning Meaning To Repository End-To-End Workflow. |
| `planning/areas/documentation-workbench/repository-documentation-change-and-reference-review-workflow.md` | Accepted repository documentation, stable-link and affected-use review workflow. |
| `planning/areas/documentation-workbench/linked-notes-end-to-end-workflow.md` | Legacy Linked Notes planning/compatibility reference; current Note semantics are under the Linked Notes-local map/registry. |
| `planning/areas/documentation-workbench/repository-file-browser-and-categories-workflow.md` | Legacy Linked Notes planning/compatibility reference for former Files/Categories ownership. |
| `planning/areas/documentation-workbench/image-aware-markdown-transfer-workflow.md` | Legacy Linked Notes planning/compatibility reference for Note/image transfer. |
| `planning/areas/documentation-workbench/files-centric-repository-workspace-extension.md` | Legacy Linked Notes planning/compatibility reference for Files-centric extensions. |
| `planning/areas/documentation-workbench/reference-object-definition-and-materialized-use-workflow.md` | Legacy Linked Notes planning/compatibility reference for repository-native Reference Objects. |
| `planning/areas/documentation-workbench/chat-response-reader-workflow.md` | Legacy Linked Notes planning/compatibility reference for Reader. |
| `planning/areas/documentation-workbench/full-app-state-export-workflow.md` | Legacy Linked Notes planning/compatibility reference for App State export. |
| `planning/areas/documentation-workbench/linked-notes-prototype-roadmap.md` | Legacy Linked Notes roadmap compatibility reference; current priorities live in `linked-notes/ROADMAP.md`. |
| `planning/areas/documentation-workbench/direction-registry.md` | Local Documentation Workbench semantic Directions; current Linked Notes semantics route elsewhere. |
| `planning/areas/documentation-workbench/use-case-registry.md` | Current non-Linked-Notes Documentation Workbench Use Cases plus compatibility mappings for former Linked Notes IDs. |
| `planning/areas/documentation-workbench/reference-object-model-and-lifecycle.md` | Deferred application-heavy alternative. |
| `planning/areas/documentation-workbench/full-picture.md` | Compatibility pointer to `planning-draft.md`. |
| `planning/areas/documentation-workbench/documentation-and-reference-object-end-to-end-workflow.md` | Compatibility pointer to the current repository workflow. |
| `planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md` | Compatibility pointer to Planning Meaning To Repository and the Planning Draft. |

Current Linked Notes semantic/product/implementation entry:

```text
planning/documentation/tools/tampermonkey/linked-notes/README.md
  → USE-CASE-MAP.md
  → USE-CASE-REGISTRY.md
  → APP-OVERVIEW.md
  → ARCHITECTURE.md
  → DATA-AND-STATE.md
  → KNOWN-ISSUES.md
  → ROADMAP.md
  → focused mapping/source/tests as needed.
```

Removed without replacement owners:

```text
planning/reference-link-experiment.md
planning/areas/documentation-workbench/reference-link-experiment.md
planning/areas/documentation-workbench/scenarios/**
```

Git history preserves the former experiment and Scenario/DATA/Behavior files.

## 5. Current Structural State

```text
root Direction Registry → planning/direction-registry.md;

reusable planning owners →
  application-planning principles/terminology
  + drafting workflow
  + Planning Draft template
  + reusable registries;

Documentation Workbench high-level planning/history owner →
  planning-draft.md;

accepted local non-Linked-Notes workflows →
  Planning Meaning To Repository
  + Repository Documentation Change And Reference Review;

current Linked Notes semantic/product root →
  planning/documentation/tools/tampermonkey/linked-notes/
  + USE-CASE-MAP.md
  + USE-CASE-REGISTRY.md
  + APP-OVERVIEW.md;

retained Linked Notes area workflows →
  planning/history/compatibility only
  + not current behavior owners;

current Linked Notes implementation priority view →
  linked-notes/ROADMAP.md;

canonical Documentation Workbench register →
  current non-Linked-Notes identities
  + compatibility mappings for former Linked Notes UC-DW-* IDs;

Tampermonkey scripts →
  implementation/projection evidence only;
  current Linked Notes semantics are explicitly owned by the tracked Linked Notes documentation map/registry, not by runtime code.
```

## 6. Planning Draft Sufficiency Alignment

A sufficient Planning Draft now:

```text
identifies Key Scenarios;
describes every Key Scenario completely;
may summarize or fully describe other Scenarios;
contains one Full Picture Matrix linking:
  Scenario/flow meaning;
  Implementation Ideas;
  questions, risks, tests and evidence;
  status and next action;
does not require separate Scenario/DATA/Behavior/Domain/Slice files
unless a specialized profile is explicitly selected.
```

The Full Picture Matrix remains an internal view, not a separate canonical artifact.

The current Linked Notes `ROADMAP.md` is an implementation-priority view and does not replace the Linked Notes `USE-CASE-MAP.md` / `USE-CASE-REGISTRY.md`. Documentation Workbench Planning Draft/items remain broader planning/history unless intentionally reconciled.

## 7. Current Item Boundary

The canonical Documentation Workbench register still requires explicit review before changing Planning Item meanings. In particular, prototype implementation evidence or roadmap directions do not silently transform items such as stable-target, Linked Note or Tampermonkey implementation meanings.

This source/register alignment records current files and navigation only.

## 8. Tampermonkey Projection

Owners:

```text
planning/commands/README.md
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
planning/documentation/tools/tampermonkey/chat-command-palette.user.js  # generated
```

Projected Documentation Workbench routes remain governed by their semantic registries; concrete commands resolve through the root UCM into `planning/commands/*.command.md`. Current Linked Notes `UC-LN-*` semantics are governed by `linked-notes/USE-CASE-MAP.md` and `linked-notes/USE-CASE-REGISTRY.md`; their existence does not automatically create or authorize Planning Helper commands.

Normal helper command execution remains projection/insertion only. The explicit command-management surface may create/update only direct `planning/commands/*.command.md` files through GitHub with SHA-aware exact read-back verification. It never runs local Git, commit or push. Linked Notes keeps its separate bounded GitHub behavior.

## 9. Historical Batch Notes

Earlier accepted batches introduced:

- reusable planning principles and terminology;
- Direction/Use-Case registries and root command routes;
- `сформируй айтемы / form items`;
- `ITEM-124 / FIRST-CLASS-NAMED-NOTES`;
- deferred `ITEM-125 / CATEGORY-BACKED-NOTE-PROJECTION`;
- preliminary project-local Scenario/DATA/Behavior files.

The preliminary project-local Scenario workspace and reference-link experiments are retired from the current file set. Their removal does not accept a production runtime/storage/parser architecture.

## 10. Remaining Work

```text
- explicit Planning Item review when future prototype directions change canonical capability meaning;
- browser/real-GitHub evidence for current Linked Notes Use Cases where acceptance remains pending;
- Linked Notes `ROADMAP.md` priorities:
    ChatGPT data acquisition redesign;
    coherent Note/File content and Chat-context copy;
    systematic GitHub save reliability investigation/write audit;
- Chat/AI/Work-State trigger-to-result review where broader semantic meaning is needed;
- optional prototype-depth Scenario/Domain/Slice methodology;
- production runtime/storage/credential architecture only after evidence and decisions.
```

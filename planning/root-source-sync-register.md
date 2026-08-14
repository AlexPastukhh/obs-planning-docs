# OBS Root Source Sync Register

Status: active project-specific root source/register file
Doc version: v1.3.0-linked-notes-prototype-owner-alignment
Scope: register root planning files, reusable owners and current local area ownership for OBS planning infrastructure.

## 1. Root Files

| File | Role | Source |
|---|---|---|
| `planning/README.md` | Root planning orientation | OBS project-local root owner. |
| `planning/direction-registry.md` | Root semantic Direction Registry and local registry references | Accepted Direction/Use-Case reconciliation. |
| `planning/planning-use-case-map.md` | Concrete OBS command router | Root UCM. |
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
| `planning/documentation/tools/tampermonkey/` | Helper implementation/tool documentation; not semantic or command authority. |

## 3. Local Areas

| Path | Role |
|---|---|
| `planning/areas/planning-system/` | Minimal runtime index and operational end-session owner. |
| `planning/areas/conspects/` | Conspect planning/repetition area. |
| `planning/areas/documentation-workbench/` | Repository-native Documentation Workbench planning, workflows, local registries, roadmap and item owners. |

## 4. Documentation Workbench Current Files

| File | Role |
|---|---|
| `planning/areas/documentation-workbench/README.md` | Area entry/read/update discipline and current workflow/supporting-prototype navigation. |
| `planning/areas/documentation-workbench/planning-draft.md` | Sole current high-level owner; complete Key Scenarios and Full Picture Matrix. |
| `planning/areas/documentation-workbench/planning-item-register.md` | Complete source-linked current/deferred item owner and retired index; 53 reviewed canonical identities. |
| `planning/areas/documentation-workbench/retired-planning-items.md` | Complete finalized inactive bodies and preserved history. |
| `planning/areas/documentation-workbench/planning-meaning-to-repository-workflow.md` | Accepted Planning Meaning To Repository End-To-End Workflow. |
| `planning/areas/documentation-workbench/repository-documentation-change-and-reference-review-workflow.md` | Accepted repository documentation, stable-link and affected-use review workflow. |
| `planning/areas/documentation-workbench/linked-notes-end-to-end-workflow.md` | Linked Notes workflow review object and current prototype behavior owner. |
| `planning/areas/documentation-workbench/repository-file-browser-and-categories-workflow.md` | Repository file/browser/category workflow owner. |
| `planning/areas/documentation-workbench/image-aware-markdown-transfer-workflow.md` | Note/image-aware Markdown transfer workflow owner. |
| `planning/areas/documentation-workbench/files-centric-repository-workspace-extension.md` | Adjacent Files-centric prototype extension owner. |
| `planning/areas/documentation-workbench/reference-object-definition-and-materialized-use-workflow.md` | Current repository-native Reference Object prototype workflow owner. |
| `planning/areas/documentation-workbench/chat-response-reader-workflow.md` | Current Chat Response Reader workflow owner. |
| `planning/areas/documentation-workbench/full-app-state-export-workflow.md` | Current Full App State diagnostic export workflow owner. |
| `planning/areas/documentation-workbench/linked-notes-prototype-roadmap.md` | Current Linked Notes implementation priorities; not canonical Planning Item owner. |
| `planning/areas/documentation-workbench/direction-registry.md` | Local semantic Directions. |
| `planning/areas/documentation-workbench/use-case-registry.md` | Accepted/current semantic workflow identities and explicit supporting-prototype boundary. |
| `planning/areas/documentation-workbench/reference-object-model-and-lifecycle.md` | Deferred application-heavy alternative. |
| `planning/areas/documentation-workbench/full-picture.md` | Compatibility pointer to `planning-draft.md`. |
| `planning/areas/documentation-workbench/documentation-and-reference-object-end-to-end-workflow.md` | Compatibility pointer to the current repository workflow. |
| `planning/areas/documentation-workbench/complete-pictures/planning-items-and-full-picture/full-picture.md` | Compatibility pointer to Planning Meaning To Repository and the Planning Draft. |

Current Linked Notes implementation documentation entry:

```text
planning/documentation/tools/tampermonkey/linked-notes/README.md
  → APP-OVERVIEW.md
  → ARCHITECTURE.md
  → DATA-AND-STATE.md
  → KNOWN-ISSUES.md
  → project-local linked-notes-prototype-roadmap.md
  → focused workflow/mapping as needed.
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

Documentation Workbench high-level owner →
  planning-draft.md;

accepted local workflows →
  Planning Meaning To Repository
  + Repository Documentation Change And Reference Review;

working/prototype-evidence semantic workflows →
  Create, Link And Manage Repository Notes
  + Browse Repository Files And Manage Categories
  + Copy A Linked Note And Repository Images;

supporting prototype workflows/extensions →
  Files-centric workspace extension
  + repository-native Reference Objects
  + Chat Response Reader
  + Full App State Export;

implementation priority view →
  linked-notes-prototype-roadmap.md;

canonical register →
  53 reviewed canonical identities with current dispositions;

Tampermonkey →
  implementation/projection evidence only, not command/semantic authority.
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

The Linked Notes prototype roadmap is a project-local implementation-priority view and does not replace this Planning Draft/item ownership model.

## 7. Current Item Boundary

The canonical Documentation Workbench register still requires explicit review before changing Planning Item meanings. In particular, prototype implementation evidence or roadmap directions do not silently transform items such as stable-target, Linked Note or Tampermonkey implementation meanings.

This source/register alignment records current files and navigation only.

## 8. Tampermonkey Projection

Owners:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Projected current Documentation Workbench command/semantic routes remain governed by their registries/UCM. Supporting Linked Notes prototype workflows such as Reader/App State do not become command or semantic projections merely because they exist in the userscript.

The helper remains projection-only for command surfaces and performs no repository write, Git, commit or push under that projection boundary. The separate Linked Notes prototype has its own explicitly bounded GitHub test behavior.

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
- browser/real-GitHub evidence for current Linked Notes workflows where acceptance remains pending;
- Linked Notes roadmap priorities:
    ChatGPT data acquisition redesign;
    coherent Note/File content and Chat-context copy;
    systematic GitHub save reliability investigation/write audit;
- Chat/AI/Work-State trigger-to-result review where broader semantic meaning is needed;
- optional prototype-depth Scenario/Domain/Slice methodology;
- production runtime/storage/credential architecture only after evidence and decisions.
```

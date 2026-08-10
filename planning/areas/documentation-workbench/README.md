# Documentation Workbench Planning Area

Status: active project-local planning area / Scenario migration and route alignment
Doc version: v1.5.0-note-images-and-asset-transfer
Scope: current planning for repository-native documentation work, stable repository links, affected-use review, linked Notes with repository images, image-aware Markdown transfer, repository file viewing and file/Note categories.

Reusable planning method remains under [`planning/documentation/application-planning/`](../../documentation/application-planning/README.md).

## 1. Current Read Route

```text
README.md
  → planning-draft.md
  → planning-item-register.md
  → selected current End-To-End Workflow;

on demand:
  retired-planning-items.md
  reference-object-model-and-lifecycle.md.
```

Compatibility-only paths are listed separately and are not current owners.

## 2. Current Owners

| Responsibility | Owner |
|---|---|
| High-level selected direction, complete Key Scenarios and Full Picture Matrix | [`planning-draft.md`](planning-draft.md) |
| Active/reusable-linked/deferred item bodies and source bank | [`planning-item-register.md`](planning-item-register.md) |
| Finalized inactive item bodies and pre-reset history | [`retired-planning-items.md`](retired-planning-items.md) |
| Planning source-to-repository lifecycle | [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) |
| Direct documentation change/reference review lifecycle | [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) |
| Linked Notes lifecycle | [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md) |
| Image-aware Note-to-Markdown transfer lifecycle | [`image-aware-markdown-transfer-workflow.md`](image-aware-markdown-transfer-workflow.md) |
| Repository file browser and category lifecycle | [`repository-file-browser-and-categories-workflow.md`](repository-file-browser-and-categories-workflow.md) |
| Local semantic Directions | [`direction-registry.md`](direction-registry.md) |
| Local independently useful Use Cases | [`use-case-registry.md`](use-case-registry.md) |

## 3. Selected Current Direction

```text
ordinary Markdown + Git
  → existing editor / GitHub / reviewed replacement
  → stable file, section and Note links
  → repository-owned Note images and image-aware Markdown transfer
  → in-app read-only file viewing and exact GitHub navigation
  → durable file-category definitions and category views
  → optional explicit review-on-change/include meaning
  → narrow independent helper only when justified.
```

A custom application shell, custom Markdown editor, managed-object runtime, App Memory and Semantic Home are not current baseline requirements.

A Tampermonkey repository helper with Notes, Files and Categories surfaces is current prototype evidence. It is not accepted production architecture and does not replace repository Markdown as the durable owner.

## 4. Current Workflows

### Planning Meaning To Repository

Use when source meaning must become reviewed Planning Items, a Planning Draft and an explicit repository update plan.

Owner: [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md).

### Repository Documentation Change And Reference Review

Use when work starts directly from repository Markdown or an accepted planning handoff.

Owner: [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

### Create, Link And Manage Repository Notes

Use this workflow for Note creation/editing, links to files/fragments/Notes, explicit remote reconciliation and GitHub-backed persistence.

Owner: [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md).


### Copy A Linked Note And Repository Images

Use this workflow when a verified Note must be copied into another same-repository Markdown file together with copied/reused image assets and rewritten target-relative paths.

Owner: [`image-aware-markdown-transfer-workflow.md`](image-aware-markdown-transfer-workflow.md).

### Browse Repository Files And Manage Categories

Use this workflow when a configured workspace is used to browse/read repository files, create or refresh category definitions, assign files or inspect explicit/implied memberships.

Owner: [`repository-file-browser-and-categories-workflow.md`](repository-file-browser-and-categories-workflow.md).

All five workflows are independently traversable. The Tampermonkey implementation remains prototype evidence pending browser and real-GitHub acceptance.

## 5. Planning Draft Contract Used In This Area

The current local Planning Draft contains:

```text
complete Key Scenarios;
optional summaries of other Scenarios;
one Full Picture Matrix that links:
  Scenario meaning;
  Implementation meaning;
  questions, risks, tests and evidence;
  status and next action.
```

For this solution, one Planning Draft plus Planning Items is the selected planning depth. Separate project-local Scenario/DATA/Behavior artifacts are not selected.

## 6. Item Ownership

```text
planning-item-register.md:
  active selected;
  active reusable-linked;
  deferred;
  retired tombstone/index;

retired-planning-items.md:
  complete finalized inactive bodies;
  preserved pre-reset audit/history.
```

Deferred does not mean rejected. Old application-heavy capabilities remain deferred where the current decision did not finally supersede them.

The accepted file/category transformations are canonical in `ITEM-97`, `ITEM-118` and `ITEM-126` through `ITEM-129`. Repository image insertion extends `ITEM-124`; image-aware transfer is owned by `ITEM-134`. `ITEM-128`, `ITEM-132` and `ITEM-133` remain bounded prototype ideas; `ITEM-129` remains deferred.

## 7. Compatibility Paths

The following old paths remain temporarily and point to current owners:

```text
full-picture.md
complete-pictures/planning-items-and-full-picture/full-picture.md
documentation-and-reference-object-end-to-end-workflow.md
```

[`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) describes the deferred alternative rather than current architecture.

The former reference-link experiment and the complete project-local `scenarios/**` workspace are removed. Current useful meaning is owned by the Planning Draft, Planning Items and workflow owners; Git history preserves the former files.

## 8. Root And Projection Boundary

Root README, root Direction/activation/source routes and Tampermonkey projection are aligned in the same reviewed transition. Compatibility Full Picture paths remain pointers only; deleted experiment/Scenario paths are not retained as tombstones.

## 9. Update Discipline

- form/reconcile meaning before canonical Planning Item changes;
- use complete replacements and exact base-blob checks;
- use `git add -N` for new files before diff capture;
- inspect the complete diff before commit;
- do not infer commit or push permission.

## 10. Current State

- Batch 1 reusable principles: complete in current repository state.
- Batch 2 reusable representations: complete in current repository state.
- Batch 3A local canonical planning reset: complete.
- Batch 3B Scenario migration and root/projection alignment: represented by this package.
- Canonical repository file/category Planning Item transition: represented in the current register.
- Linked Notes `0.6.5-prototype`: retains `0.5.1` categories/search/rich Markdown/relation behavior and adds recoverable clipboard/file image insertion, byte-verified repository image writes and same-repository Note-to-Markdown transfer with copied/reused assets and rewritten paths; browser and real-GitHub acceptance pending.
- Production runtime architecture: not selected.

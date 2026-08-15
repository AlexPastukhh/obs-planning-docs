# Documentation Workbench Planning Area

Status: active project-local planning area / current Linked Notes prototype continuity
Doc version: v1.6.0-linked-notes-prototype-continuity
Scope: current planning for repository-native documentation work, stable repository links, affected-use review, linked Notes with repository images, image-aware Markdown transfer, repository file viewing/categories and current supporting Linked Notes prototype workflows.

Reusable planning method remains under [`planning/documentation/application-planning/`](../../documentation/application-planning/README.md).

## 1. Current Read Route

```text
README.md
  → planning-draft.md
  → planning-item-register.md
  → selected current End-To-End Workflow;

for current Linked Notes prototype implementation work:
  → linked-notes-prototype-roadmap.md
  → planning/documentation/tools/tampermonkey/linked-notes/README.md
  → only the focused workflow/mapping needed by the task;

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
| Files-centric repository workspace prototype extension | [`files-centric-repository-workspace-extension.md`](files-centric-repository-workspace-extension.md) |
| Repository-native Reference Object definition/materialized-use workflow | [`reference-object-definition-and-materialized-use-workflow.md`](reference-object-definition-and-materialized-use-workflow.md) |
| Chat Response Reader workflow | [`chat-response-reader-workflow.md`](chat-response-reader-workflow.md) |
| Full App State diagnostic export workflow | [`full-app-state-export-workflow.md`](full-app-state-export-workflow.md) |
| Linked Notes prototype development priorities | [`linked-notes-prototype-roadmap.md`](linked-notes-prototype-roadmap.md) |
| Local semantic Directions | [`direction-registry.md`](direction-registry.md) |
| Local independently useful Use Cases | [`use-case-registry.md`](use-case-registry.md) |

Implementation/prototype navigation starts at [`planning/documentation/tools/tampermonkey/linked-notes/README.md`](../../documentation/tools/tampermonkey/linked-notes/README.md).

## 3. Selected Current Direction

```text
ordinary Markdown + Git
  → existing editor / GitHub / reviewed replacement
  → stable file, section and Note links
  → repository-owned Note images and image-aware Markdown transfer
  → in-app bounded UTF-8 text-file viewing/authoring and exact GitHub navigation
  → repository templates and repository-native materialized Reference Objects
  → durable file-category definitions and searchable Note/file category assignment
  → local Chat Response Reader and diagnostic App State transfer
  → optional explicit review-on-change/include meaning
  → narrow independent helper only when justified.
```

A custom production application shell, final custom Markdown editor, generic managed-object runtime, App Memory and Semantic Home are not current baseline requirements.

The Tampermonkey repository helper is current prototype evidence. It is not accepted production architecture and does not replace repository Markdown/files as durable owners.

## 4. Current Independently Traversable Workflows

### Planning Meaning To Repository

Use when source meaning must become reviewed Planning Items, a Planning Draft and an explicit repository update plan.

Owner: [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md).

### Repository Documentation Change And Reference Review

Use when work starts directly from repository Markdown or an accepted planning handoff.

Owner: [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

### Create, Link And Manage Repository Notes

Use for Note creation/editing, links to files/fragments/Notes, explicit remote reconciliation and GitHub-backed persistence.

Owner: [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md).

### Copy A Linked Note And Repository Images

Use when a verified Note must be copied into another same-repository Markdown file together with copied/reused image assets and rewritten target-relative paths.

Owner: [`image-aware-markdown-transfer-workflow.md`](image-aware-markdown-transfer-workflow.md).

### Browse Repository Files And Manage Categories

Use when a configured workspace browses/reads/authors bounded repository text files, copies root-relative links, creates tracked folders, or defines/assigns/inspects categories.

Owner: [`repository-file-browser-and-categories-workflow.md`](repository-file-browser-and-categories-workflow.md).

These semantic workflows remain distinct from supporting prototype extensions/capabilities below.

## 5. Current Supporting Prototype Workflows / Extensions

These are current implementation workflows/evidence but are **not automatically new semantic Use-Case IDs**:

### Files-Centric Repository Workspace Extension

Adds Files-oriented navigation/structure/copy/template behavior while keeping ordinary repository file behavior under the repository-file workflow.

Owner: [`files-centric-repository-workspace-extension.md`](files-centric-repository-workspace-extension.md).

### Reference Object Definition And Materialized Use

Adds repository-native stable definitions, copied materialized use markers, explicit stale-use checks/updates and registry/tag validation without reviving the deferred generic managed-object architecture.

Owner: [`reference-object-definition-and-materialized-use-workflow.md`](reference-object-definition-and-materialized-use-workflow.md).

### Chat Response Reader

Provides local read-only viewing of one ChatGPT assistant response using exact Paste or DOM-derived source with explicit source accuracy and safe details/summary rendering.

Owner: [`chat-response-reader-workflow.md`](chat-response-reader-workflow.md).

### Full App State Export

Provides a read-only diagnostic snapshot of application-owned GM/IndexedDB/runtime state with credential redaction. It is not normal Note/File content copy and has no import/restore behavior in the current slice.

Owner: [`full-app-state-export-workflow.md`](full-app-state-export-workflow.md).

## 6. Linked Notes Prototype Roadmap

Current implementation priorities are recorded in [`linked-notes-prototype-roadmap.md`](linked-notes-prototype-roadmap.md) so they survive chat/context turnover without becoming automatic Planning Item decisions.

Current top directions:

1. redesign the principle/mechanism for obtaining ChatGPT response data;
2. add coherent Note/File content copy and Chat-context handoff, separate from diagnostic Full App State;
3. investigate and improve GitHub save reliability through a complete write-entrypoint audit before selecting a new write architecture/API.

## 7. Planning Draft Contract Used In This Area

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

The new Linked Notes prototype roadmap is an implementation-priority view, not a replacement canonical Planning Draft or Planning Item register.

## 8. Item Ownership

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

Deferred does not mean rejected. Old application-heavy capabilities remain deferred where current decisions did not finally supersede them.

The accepted file/category transformations are canonical in `ITEM-97`, `ITEM-118` and `ITEM-126` through `ITEM-129`. Repository image insertion extends `ITEM-124`; image-aware transfer is owned by `ITEM-134`. `ITEM-128`, `ITEM-132` and `ITEM-133` remain bounded prototype ideas; `ITEM-129` remains deferred.

This documentation-continuity update does not change those item meanings.

## 9. Compatibility Paths

The following old paths remain temporarily and point to current owners:

```text
full-picture.md
complete-pictures/planning-items-and-full-picture/full-picture.md
documentation-and-reference-object-end-to-end-workflow.md
```

[`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) describes the deferred application-heavy alternative rather than the current repository-native Reference Object prototype slice.

The former reference-link experiment and project-local `scenarios/**` workspace are removed. Git history preserves those former files.

## 10. Root And Projection Boundary

Root README, root Direction/activation/source routes and Tampermonkey command projection remain separate from the Linked Notes application runtime.

The current Linked Notes prototype may expose behavior that is not projected as an accepted semantic Use Case. Prototype implementation evidence does not grant command permission or create canonical Planning Items automatically.

## 11. Update Discipline

- form/reconcile meaning before canonical Planning Item changes;
- keep application current-state docs separate from historical changelog;
- use complete replacements and exact base-blob checks for reviewed packages;
- use `git add -N` for new files before diff capture;
- inspect the complete diff before commit;
- do not infer commit or push permission.

## 12. Current State

- Batch 1 reusable principles: complete in current repository state.
- Batch 2 reusable representations: complete in current repository state.
- Batch 3A local canonical planning reset: complete.
- Batch 3B Scenario migration and root/projection alignment: represented in current history/state.
- Canonical repository file/category Planning Item transition: represented in the current register.
- Linked Notes `0.8.0-prototype`: adds local-first repository-file publication, one-commit Update all, Ordered Reference Lists and stale-use file/tree diagnostics to the existing Notes/images/transfer/Files/Categories/templates/Reference Objects/Reader/App State behavior; browser and real-GitHub acceptance remains feature/checklist dependent.
- Current implementation priorities are in `linked-notes-prototype-roadmap.md`.
- Production runtime architecture: not selected.

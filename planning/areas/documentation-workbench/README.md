# Documentation Workbench Planning Area

Status: active project-local planning area / Scenario migration and route alignment
Doc version: v1.2.0-sufficient-draft-and-route-alignment
Scope: current planning for repository-native documentation work, stable repository links, affected-use review, AI transfer and linked Notes.

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
| Proposed Linked Notes lifecycle expansion | [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md) |
| Local semantic Directions | [`direction-registry.md`](direction-registry.md) |
| Local independently useful Use Cases | [`use-case-registry.md`](use-case-registry.md) |

## 3. Selected Current Direction

```text
ordinary Markdown + Git
  → existing editor / GitHub / reviewed replacement
  → stable file, section and Note links
  → optional explicit review-on-change/include meaning
  → narrow independent helper only when justified.
```

A custom application shell, custom Markdown editor, managed-object runtime, App Memory and Semantic Home are not current baseline requirements.

A Tampermonkey Notes widget with GitHub integration is a current Implementation Idea and prototype candidate. It is not accepted architecture and does not replace repository Markdown as the durable owner.

## 4. Current Workflows

### Planning Meaning To Repository

Use when source meaning must become reviewed Planning Items, a Planning Draft and an explicit repository update plan.

Owner: [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md).

### Repository Documentation Change And Reference Review

Use when work starts directly from repository Markdown or an accepted planning handoff.

Owner: [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

### Proposed Create, Link And Manage Repository Notes

Use this proposed workflow as the complete review object for the incoming Notes expansion: creation/editing, links to files/fragments/Notes and GitHub-backed persistence.

Owner candidate: [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md).

The two accepted workflows remain current. The Notes workflow is independently traversable but remains proposed until the related canonical Planning Item transition is explicitly reviewed.

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

The recent `ITEM-114`, `ITEM-124` and Notes-widget transformations remain subject to explicit Planning Item review before the canonical register is changed.

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
- Canonical Planning Item transformations from the latest review: pending explicit acceptance.
- Runtime and actual micro-tool implementation: not selected.

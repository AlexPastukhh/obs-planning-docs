# Documentation Workbench Planning Area

Status: active project-local planning area / Batch 3A repository-native reset
Doc version: v1.0.0-current-owner-reset
Scope: current planning for repository-native documentation work and proportional independently useful helpers.

Reusable planning method remains under [`planning/documentation/application-planning/`](../../documentation/application-planning/README.md).

## 1. Current Read Route

```text
README.md
  → planning-draft.md
  → planning-item-register.md
  → selected current end-to-end workflow;

on demand:
  retired-planning-items.md
  reference-object-model-and-lifecycle.md
  reference-link-experiment.md.
```

## 2. Current Owners

| Responsibility | Owner |
|---|---|
| High-level selected direction | [`planning-draft.md`](planning-draft.md) |
| Active/reusable-linked/deferred item bodies and source bank | [`planning-item-register.md`](planning-item-register.md) |
| Finalized inactive item bodies and pre-reset history | [`retired-planning-items.md`](retired-planning-items.md) |
| Planning source-to-repository lifecycle | [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) |
| Direct documentation change/reference review lifecycle | [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) |
| Local semantic Directions | [`direction-registry.md`](direction-registry.md) |
| Local independently useful Use Cases | [`use-case-registry.md`](use-case-registry.md) |
| Link/metadata experiment | [`reference-link-experiment.md`](reference-link-experiment.md) |

## 3. Selected Current Direction

```text
ordinary Markdown + Git
  → existing editor / GitHub / reviewed replacement
  → stable file and section links
  → optional minimal metadata
  → narrow independent helper only when justified.
```

A custom application shell, editor, managed-object runtime, App Memory and Semantic Home are not current baseline requirements.

## 4. Current Workflows

### Planning Meaning To Repository

Use when source meaning must become reviewed Planning Items, a Planning Draft and an explicit repository update plan.

Owner: [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md).

### Repository Documentation Change And Reference Review

Use when work starts directly from repository Markdown or an accepted planning handoff.

Owner: [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

These workflows have independent triggers/results and an explicit handoff. They are not thematic peer fragments.

## 5. Item Ownership

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

## 6. Compatibility Paths

The following old paths remain temporarily and point to current owners:

```text
full-picture.md
complete-pictures/planning-items-and-full-picture/full-picture.md
documentation-and-reference-object-end-to-end-workflow.md
```

[`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) describes the deferred alternative rather than current architecture.

## 7. Detailed Scenario Workspace

`scenarios/**` remains physically present until Batch 3B.

Current status:

```text
preliminary migration source;
not a current high-level owner;
not selected as continuing planning depth;
must not be deleted before Scenario/DATA/Behavior coverage audit.
```

## 8. Root And Projection Boundary

Root README, root registries, UCM terminology, activation/source registers and Tampermonkey projection remain unchanged in Batch 3A. Batch 3B updates them only after the local owners and Scenario migration are reviewed.

## 9. Update Discipline

- form/reconcile meaning before file changes;
- use complete replacements and exact base-blob checks;
- use `git add -N` for new files before diff capture;
- inspect the complete diff before commit;
- do not infer commit or push permission.

## 10. Current State

- Batch 1 reusable principles: complete.
- Batch 2 reusable representations: complete.
- Batch 3A local canonical planning reset: represented by the current owner set.
- Batch 3B Scenario retirement/root/projection alignment: pending.
- Runtime and actual micro-tool implementation: not selected.

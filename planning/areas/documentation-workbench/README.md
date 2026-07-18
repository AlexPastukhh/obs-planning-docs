# Documentation Workbench Planning Area

Status: active project-local planning area
Doc version: v0.3.0-documentation-reference-workflow
Scope: project-local planning state for the Documentation Workbench application direction. Reusable planning method remains under `planning/documentation/application-planning/`.

## 1. Purpose

This area is the canonical repository home for the Documentation Workbench living plan, accepted end-to-end workflows, supporting models and complete source-linked Planning Item register.

```text
Documentation Workbench planning area
  → preserves complete Planning Item meanings and provenance;
  → maintains the Application Root Full Picture;
  → owns end-to-end Complete Pictures that can be followed from trigger to result;
  → keeps models and view/capability slices as supporting artifacts rather than false peer workflows;
  → keeps reusable methodology outside the product-local area;
  → does not claim that runtime/code behavior already exists.
```

## 2. Canonical Files And Responsibilities

| File | Responsibility |
|---|---|
| [`README.md`](README.md) | Area entry, ownership map, read order and update discipline. |
| [`full-picture.md`](full-picture.md) | Application Root Full Picture, accepted workflow inventory, shared invariants and provisional slices. |
| [`documentation-and-reference-object-end-to-end-workflow.md`](documentation-and-reference-object-end-to-end-workflow.md) | Accepted trigger-to-result Documentation And Reference Object workflow. |
| [`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) | Supporting Reference Object identity/state/home/shape model and accepted item-transformation history. |
| [`planning-item-register.md`](planning-item-register.md) | Complete active source-linked item bodies, absorbed-item history, source bank, old-item audit and open questions. |

Supporting reusable owners:

```text
planning/documentation/application-planning/README.md
planning/documentation/application-planning/terminology-and-planning-items.md
planning/documentation/application-planning/application-planning-principles.md
planning/documentation/application-planning/application-planning-drafting-workflow.md
```

## 3. Source-Of-Truth Split

```text
Planning Item body, source excerpts, audit disposition and open questions:
  planning-item-register.md

Application identity, workflow inventory and cross-workflow coordination:
  full-picture.md

Documentation/Reference Object trigger-to-result behavior:
  documentation-and-reference-object-end-to-end-workflow.md

Reference Object identity, canonical state, home, durability, shape and transition history:
  reference-object-model-and-lifecycle.md

Reusable planning behavior, terminology and principles:
  planning/documentation/application-planning/

Future runtime/code and implementation architecture:
  separate implementation owners after explicit planning and review
```

The Full Picture and workflow owners summarize or organize Planning Items; they do not replace complete canonical item bodies in the register.

## 4. Complete Picture Rule

A project-local Complete Picture is a coherent workflow that can be followed from its trigger to an understandable result without requiring a parallel Complete Picture to supply missing mandatory stages.

```text
end-to-end workflow
  → may use supporting models, terminology and views;
  → may branch or loop;
  → may end with explicit pending-review state;
  → must not be split into peer pictures only because its stages concern different capabilities.
```

The former `CP-2`, `CP-3`, `CP-4` and `CP-7` labels remain historical mappings. Their meanings now belong to one accepted Documentation And Reference Object workflow plus its supporting model.

## 5. Read Order

For Documentation Workbench planning:

```text
1. README.md
2. full-picture.md
3. affected end-to-end workflow owner
4. affected supporting model when model details are involved
5. relevant items in planning-item-register.md
6. relevant reusable application-planning owners
7. source excerpts and old-item audit rows when a reconciliation depends on them
```

Targeted Documentation/Reference Object read order:

```text
full-picture.md#5-documentation-and-reference-object-end-to-end-workflow
  → documentation-and-reference-object-end-to-end-workflow.md
  → reference-object-model-and-lifecycle.md when identity/state/home/shape details matter
  → affected items and sources in planning-item-register.md
```

## 6. Update Discipline

```text
new or corrected source meaning
  → preserve it in the source-linked register
  → identify the end-to-end workflow or supporting model actually changed
  → review complete before/after meaning and traceable transformations
  → apply only explicitly accepted transformations
  → update workflow/model owners
  → update the Application Root summary
  → plan literal repository changes separately
```

Rules:

- Use semantic names first and stable technical IDs for traceability.
- Do not assume one incoming meaning becomes one new item.
- Preserve source-to-result history for rename, merge, split, move, supersession and removal.
- Do not impose arbitrary item-length limits.
- Split by independent meaning, ownership, lifecycle, review, reuse or decisions—not by topic labels or text length.
- Keep facts, inference, questions, implementation thoughts and accepted decisions distinct.
- Update the register before summaries that depend on changed item meaning.
- Do not turn a workflow/model summary into a second independently edited copy of an item body.

## 7. File-Creation Boundary

Create a separate workflow, branch, model, detail or prototype file only when it has its own understandable outcome, review, reuse, testing or lifecycle. Do not create one file per item, capability, question or UI surface.

## 8. Current State

```text
- The active register contains 48 items.
- ITEM-25B is absorbed into ITEM-23B; ITEM-102 is absorbed into ITEM-91; both remain fully traceable.
- Documentation And Reference Object End-To-End Workflow is the accepted primary Complete Picture.
- Reference Object Model And Lifecycle is an active supporting model, not a parallel end-to-end workflow.
- Former CP-2/CP-3/CP-4/CP-7 labels are historical structural mappings.
- Chat/AI/Work-State and Planning/Deepening remain provisional thematic slices pending the same end-to-end review criterion.
- No runtime, application shell, storage architecture or exact Markdown marker syntax is selected.
```

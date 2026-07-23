# Documentation Workbench Planning Area

Status: active project-local planning area
Doc version: v0.8.0-whole-repository-audit
Scope: project-local planning state for the Documentation Workbench application direction. Reusable planning method remains under `planning/documentation/application-planning/`.

## 1. Purpose

This area is the canonical repository home for the Documentation Workbench living plan, accepted end-to-end workflows, supporting models and complete source-linked Planning Item register.

```text
Documentation Workbench planning area
  → preserves complete Planning Item meanings and provenance;
  → maintains the Application Root Full Picture;
  → owns independently traversable end-to-end Complete Pictures;
  → keeps models, views, terminology and capability slices as supporting artifacts;
  → keeps reusable methodology outside the product-local area;
  → does not claim that runtime/code behavior already exists.
```

## 2. Canonical Files And Responsibilities

| File | Responsibility |
|---|---|
| [`README.md`](README.md) | Area entry, ownership map, read order and update discipline. |
| [`direction-registry.md`](direction-registry.md) | Local product/planning Directions and root relationships. |
| [`use-case-registry.md`](use-case-registry.md) | Accepted local workflow/capability entries and provisional candidates. |
| [`full-picture.md`](full-picture.md) | Application Root Full Picture, accepted workflow inventory, shared invariants and provisional slices. |
| [`documentation-and-reference-object-end-to-end-workflow.md`](documentation-and-reference-object-end-to-end-workflow.md) | Accepted trigger-to-result Documentation And Reference Object workflow. |
| [`complete-pictures/planning-items-and-full-picture/full-picture.md`](complete-pictures/planning-items-and-full-picture/full-picture.md) | Accepted trigger-to-result Planning Item And Full Picture workflow. |
| [`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) | Supporting Reference Object identity/state/home/shape model and accepted transformation history. |
| [`planning-item-register.md`](planning-item-register.md) | Complete active source-linked item bodies, absorbed-item history, source bank, old-item audit and open questions. |

Supporting reusable owners:

```text
planning/documentation/application-planning/README.md
planning/documentation/application-planning/terminology-and-planning-items.md
planning/documentation/application-planning/application-planning-principles.md
planning/documentation/application-planning/planning-item-formation-workflow.md
planning/documentation/application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md
planning/documentation/application-planning/application-planning-drafting-workflow.md
```

## 3. Source-Of-Truth Split

```text
Planning Item bodies, full source messages, typed source contributions,
transformation history, audit disposition and open questions:
  planning-item-register.md

Application identity, workflow inventory and cross-workflow coordination:
  full-picture.md

Documentation/Reference Object trigger-to-result behavior:
  documentation-and-reference-object-end-to-end-workflow.md

Planning Item/Full Picture trigger-to-result behavior:
  complete-pictures/planning-items-and-full-picture/full-picture.md

Reference Object identity, canonical state, home, durability, shape
and managed-item boundary:
  reference-object-model-and-lifecycle.md

Reusable planning behavior, terminology, principles and templates:
  planning/documentation/application-planning/

Future runtime/code and implementation architecture:
  separate implementation owners after explicit planning and review
```

The Full Picture and workflow owners summarize or organize Planning Items; they do not replace complete canonical item bodies in the register.

## 4. Complete Picture Rule

A project-local Complete Picture is a coherent workflow that can be followed from trigger to an understandable result without requiring a parallel Complete Picture to supply missing mandatory stages.

```text
end-to-end workflow
  → may use supporting models, terminology, views and adapters;
  → may branch or loop;
  → may hand off to another independent workflow at an explicit boundary;
  → may end with explicit unresolved/deferred/Pending Review state;
  → must not be split into peer pictures only because stages concern different capabilities.
```

Current accepted Complete Pictures:

```text
Documentation And Reference Object End-To-End Workflow
  → documentation selection, object/reference authoring,
    dependency review, navigation and diff-ready result;

Planning Item And Full Picture End-To-End Workflow
  → source-linked item formation/review,
    item-backed Full Picture, concern/deepening loops,
    repository reconciliation and documentation handoff.
```

Their handoff is explicit:

```text
accepted managed Planning Item
  → identity already exists as a Planning Item Reference Object
  → Documentation/Reference workflow assigns/materializes durable owner,
    definition location, optional home and references;

portable reviewed item
  → may remain portable
  → or enter proposal/confirmation before managed object creation.
```

The former `CP-2`, `CP-3`, `CP-4` and `CP-7` labels remain historical mappings. Their meanings belong to the accepted Documentation/Reference workflow plus its supporting model.

## 5. Read Order

For Documentation Workbench planning:

```text
1. README.md
2. direction-registry.md and use-case-registry.md
3. full-picture.md
4. affected end-to-end workflow owner
5. affected supporting model when model details are involved
6. relevant items in planning-item-register.md
7. relevant reusable application-planning owners
8. source messages and old-item audit rows when reconciliation depends on them
```

Targeted Documentation/Reference Object read order:

```text
full-picture.md#5-documentation-and-reference-object-end-to-end-workflow
  → documentation-and-reference-object-end-to-end-workflow.md
  → reference-object-model-and-lifecycle.md when identity/state/home/shape details matter
  → affected items and sources in planning-item-register.md
```

Targeted Planning Item/Full Picture read order:

```text
full-picture.md#6-planning-item-and-full-picture-end-to-end-workflow
  → complete-pictures/planning-items-and-full-picture/full-picture.md
  → affected items and full sources in planning-item-register.md
  → reference-object-model-and-lifecycle.md when managed identity/home/durability matters
  → documentation-and-reference-object-end-to-end-workflow.md for materialization handoff
  → planning-item-formation-workflow.md and PLANNING-ITEM-REVIEW-TEMPLATE.md for source-to-item behavior
  → application-planning-drafting-workflow.md for reconciliation and broader planning.
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
  → update root routing/register files
  → plan literal repository changes separately
```

Rules:

- Use semantic names first and stable technical IDs for traceability.
- Do not assume one incoming meaning becomes one new item.
- Preserve source-to-result history for rename, merge, split, move, supersession and removal.
- Preserve complete source messages and typed source contributions.
- Do not impose arbitrary item-length limits.
- Split by independent meaning, ownership, lifecycle, review, reuse or decisions—not by topic labels or text length.
- Keep facts, inference, questions, implementation thoughts and accepted decisions distinct.
- Update the register before summaries that depend on changed item meaning.
- Do not turn a workflow/model summary into a second independently edited copy of an item body.
- Do not move an existing workflow path merely to make folder structure symmetrical; path migration requires separate link-impact review.

## 7. File-Creation Boundary

Create a separate workflow, branch, model, detail or prototype file only when it has its own understandable outcome, review, reuse, testing or lifecycle.

Current folder rule:

```text
new child Complete Picture
  → may live in complete-pictures/<semantic-name>/full-picture.md;

existing accepted owner
  → remains at its current path until a separate migration is justified.
```

Do not create one file per item, capability, question or UI surface.

## 7A. Helper Projection

The reusable Tampermonkey helper projects:

```text
Direction:
  Develop And Maintain Documentation Workbench;

Use Cases:
  Documentation And Reference Object End-To-End Workflow;
  Planning Item And Full Picture End-To-End Workflow;
  Structured User Message Composer.
```

`Reconcile Planning Items` remains an application-planning Use Case linked to the existing `сверь айтемы` command.

Chat/AI/Work-State remains provisional and is not projected as an accepted Use Case.

The helper is projection only. It does not become a local owner and no tracked project-local helper fork is created.

## 8. Current State

```text
- The active register contains 51 items.
- ITEM-25B is absorbed into ITEM-23B; ITEM-102 is absorbed into ITEM-91; both remain traceable.
- Documentation And Reference Object End-To-End Workflow is accepted.
- Planning Item And Full Picture End-To-End Workflow is accepted.
- Reference Object Model And Lifecycle is an active supporting model, not a parallel workflow.
- Managed application-native Planning Items are Reference Objects from creation.
- Portable Markdown item review remains a supported fallback/interoperability mode.
- Reusable Planning Item Formation workflow and exact review template are synchronized.
- Local Direction and Use-Case Registries are active and linked from the root registry.
- Orientation/Direction/Use-Case/Command helper projection is synchronized without changing local ownership.
- The Batch 6 planning-owner terminology, ownership, link and projection audit is complete; only stale transition/status text required correction.
- Chat/AI/Work-State remains a provisional thematic slice pending end-to-end review.
- Prototype-Depth Scenario/Domain/Slice methodology is deferred to a separate task.
- No runtime, application shell, storage architecture or exact Markdown marker syntax is selected.
```

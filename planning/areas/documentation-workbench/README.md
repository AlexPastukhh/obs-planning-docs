# Documentation Workbench Planning Area

Status: active project-local planning area
Doc version: v0.2.0-cp2-review
Scope: project-local planning state for the Documentation Workbench application direction. Reusable planning method remains under `planning/documentation/application-planning/`.

## 1. Purpose

This area provides one canonical repository home for the Documentation Workbench living plan and its complete source-linked working item set.

```text
Documentation Workbench planning area
  → preserves the complete working Planning Item source;
  → maintains the application-level Full Picture;
  → coordinates separate Primary Complete Pictures;
  → keeps reusable methodology outside the product-local area;
  → does not claim that runtime/code behavior already exists.
```

## 2. Canonical Files And Responsibilities

| File | Responsibility |
|---|---|
| [`README.md`](README.md) | Area entry, ownership map, read order and update discipline. |
| [`full-picture.md`](full-picture.md) | Item-backed Application Root Planning Draft and coordination of the seven Primary Complete Pictures. |
| [`reference-object-model-and-lifecycle.md`](reference-object-model-and-lifecycle.md) | Complete CP-2 Reference Object model and six traceable transformation proposals. |
| [`planning-item-register.md`](planning-item-register.md) | Complete active working source-linked item meanings, source bank, old-item audit and open questions. |

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

Application identity, complete-picture synthesis, workflow inventory and cross-picture coordination:
  full-picture.md

Reference Object identity, lifecycle, durability modes and proposed CP-2 item transition:
  reference-object-model-and-lifecycle.md

Reusable planning behavior, terminology and principles:
  planning/documentation/application-planning/

Future runtime/code and implementation architecture:
  separate implementation owners after explicit planning and review
```

The Full Picture may summarize Planning Items, but it does not replace their complete canonical working bodies. The register may contain implementation directions, but they do not become architecture decisions merely by being recorded.

## 4. Read Order

For Documentation Workbench planning:

```text
1. README.md
2. full-picture.md
3. the affected Primary Complete Picture owner when one exists
4. only the relevant sections/items in planning-item-register.md
5. relevant reusable application-planning owners
6. source excerpts and old-item audit rows when a reconciliation decision depends on them
```

For CP-2 Reference Object work, the targeted read order is:

```text
full-picture.md#6-cp-2--reference-object-model-and-lifecycle
  → reference-object-model-and-lifecycle.md
  → affected items and sources in planning-item-register.md
```

For a full item reconciliation, read the complete affected Primary Complete Picture and every Current, Incoming and Resulting item participating in a proposed transformation.

## 5. Update Discipline

```text
new or corrected source meaning
  → update/preserve the working Planning Item source
  → reconcile it with the affected complete picture
  → review traceable Current / Incoming / Resulting transformation blocks
  → apply only explicitly accepted item transformations
  → update the affected Full Picture section
  → plan repository/file changes separately when required
```

Rules:

- Keep short semantic names readable and preserve technical IDs for traceability.
- Do not assume one incoming item becomes one canonical item.
- Rename, merge, split, move, supersede and removal decisions must preserve source-to-result history.
- Do not apply a proposed transformation merely because it appears in a reconciliation review.
- Do not impose an arbitrary item-length limit; split only for independent meaning, owner, lifecycle, review, reuse or decisions.
- Keep facts, inference, questions, implementation thoughts, decision candidates and accepted decisions distinct.
- Update the register before changing a Full Picture summary that depends on the changed item meaning.
- Do not turn a Full Picture summary into a second independently edited copy of an item body.

## 6. File-Creation Boundary

Keep this area small until independent ownership justifies more files.

Create a separate Functional Workflow, branch, detail, model or prototype artifact only when it has its own understandable outcome, review, reuse, testing or lifecycle. Do not create one file per item or one file per open question.

## 7. Current State

```text
- The complete v0.9.2 working register remains unchanged; proposed merges, renames and absorbed identities are not applied.
- CP-1 is expanded in the Full Picture.
- CP-2 is expanded in `reference-object-model-and-lifecycle.md` with six traceable transformation proposals awaiting explicit acceptance.
- CP-3 through CP-7 remain compact coordinated pictures awaiting separate updates.
- No Documentation Workbench runtime, application shell, storage architecture or marker syntax is selected by CP-2A.
```

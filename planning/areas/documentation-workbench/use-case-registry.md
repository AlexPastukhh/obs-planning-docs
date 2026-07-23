# Documentation Workbench Use-Case Registry

Status: active project-local semantic Use-Case Registry
Doc version: v0.2.0-first-class-notes
Scope: independently useful Documentation Workbench workflow/capability entries and explicit provisional candidates.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-DW-DOC-REF` | Documentation And Reference Object End-To-End Workflow | accepted | `DIR-DOCUMENTATION-WORKBENCH` | `documentation-and-reference-object-end-to-end-workflow.md` | none |
| `UC-DW-ITEM-FULL-PICTURE` | Planning Item And Full Picture End-To-End Workflow | accepted | `DIR-DOCUMENTATION-WORKBENCH` | `complete-pictures/planning-items-and-full-picture/full-picture.md` | `сверь айтемы` for reconciliation stage only |
| `UC-DW-STRUCTURED-MESSAGE` | Structured User Message Composer | active supporting | `DIR-DOCUMENTATION-WORKBENCH` | `ITEM-121` in `planning-item-register.md` | none |

## 2. `UC-DW-DOC-REF` — Documentation And Reference Object End-To-End Workflow

**Trigger/input:** repository/documentation selection or accepted meaning requiring durable owner/location/reference authoring.

**Result:** reviewable real Markdown/object/reference state, including standalone or object-linked named Notes and Note views, with dependency review, navigation and diff-ready output, or explicit unresolved/deferred state.

**Owner route:**

```text
full-picture.md
documentation-and-reference-object-end-to-end-workflow.md
reference-object-model-and-lifecycle.md when identity/state/home/shape matters
affected planning-item-register.md items/sources.
```

Already managed application-native Planning Items do not repeat object-creation confirmation.

First-Class Named Notes remain inside this accepted workflow; they do not create a separate peer Use Case or Complete Picture.

## 3. `UC-DW-ITEM-FULL-PICTURE` — Planning Item And Full Picture End-To-End Workflow

**Trigger/input:** free-form/structured source, Planning Items, portable ledger, current item-backed Full Picture or repository owners requiring reconciliation.

**Result:** reviewed Planning Items, working/documentation state, item-backed Full Picture, proportional concern/deepening results, repository reconciliation and explicit documentation handoff.

**Owner route:**

```text
full-picture.md
complete-pictures/planning-items-and-full-picture/full-picture.md
planning-item-register.md
reusable planning-item-formation-workflow.md
reusable application-planning-drafting-workflow.md.
```

The existing `сверь айтемы` command activates only reconciliation under its UCM permissions.

## 4. `UC-DW-STRUCTURED-MESSAGE` — Structured User Message Composer

**Purpose:** help the user structure long input into addressable topics/subtopics/questions/corrections/examples while preserving literal wording and free-form input.

**Result:** one literal user message with addressable fragments that may contribute to several Planning Items.

**Boundary:** does not require every fragment to become an item, rewrite literal meaning, create Source Idea, accept Planning Items automatically or replace unstructured input.

Current canonical item owner:

```text
ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER
planning-item-register.md
```

## 5. Provisional Candidate — Chat/AI/Work-State Trace

Status: **provisional thematic candidate, not an accepted Use Case/Complete Picture**

Related items:

```text
ITEM-11B
ITEM-12A
ITEM-12B
ITEM-109
ITEM-115
ITEM-116
```

Before promotion, review one trigger-to-result lifecycle covering source/conversation capture, template-linked response, answer change set, raw annotations, Action Log boundary, navigation and end state.

## 6. Supporting Artifacts That Are Not Use Cases

```text
Reference Object Model And Lifecycle → supporting model;
Direction/Use-Case registries → semantic navigation;
planning-item-register.md → canonical item/source state;
views/navigation/status projections → supporting capabilities unless independent result is proven.
```

## 7. Activation

Adaptive: use remembered current local context when clearly sufficient; reread this registry and selected complete owner when uncertain.

Full: read direction-registry.md, this complete entry, the complete workflow/model owner and targeted item/source records.

Activation grants no repository permission.

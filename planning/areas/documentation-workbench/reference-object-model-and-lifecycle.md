# Reference Object Model And Lifecycle — Deferred Alternative

Status: deferred historical solution branch / not current architecture
Doc version: v1.0.0-deferred-after-repository-native-reset
Scope: compact map of the former application-heavy model and its current disposition.

Current baseline:

- [`planning-draft.md`](planning-draft.md);
- [`planning-item-register.md`](planning-item-register.md);
- [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

## 1. Why This Model Is Deferred

The selected solution uses ordinary repository Markdown, complete files or stable heading sections, standard links, existing editors and proportional small helpers.

The former model required several coordinated mechanisms before independently useful value was proven:

```text
managed Reference Object identity;
App Memory;
canonical-state versus definition-location ownership;
Semantic Home;
full-text/bare persisted modes;
object wrappers and arbitrary fields;
category contracts;
custom authoring/navigation;
persistent dependency graph and stale queue.
```

These mechanisms are not current baseline requirements.

## 2. Preserved Meanings

The complete pre-reset item bodies remain available as:

```text
deferred items:
  planning-item-register.md;

finalized inactive items:
  retired-planning-items.md;

literal former file state:
  Git history at source commit
  b5bac0733c526893a54d96b7b1fe0bd731a1bd2a.
```

## 3. Current Replacement Map

| Former model responsibility | Current owner |
|---|---|
| durable canonical documentation | `ITEM-23B` and repository Markdown |
| target identity/navigation | `ITEM-114` file/heading links |
| quiet extension syntax | `ITEM-105` |
| affected-use obligation | `ITEM-89` |
| documentation change lifecycle | repository documentation workflow |
| AI expanded copy | `ITEM-107` |
| planning item lifecycle | reusable planning owners plus `ITEM-98` |
| semantic Home/navigation views | not selected |
| custom object store/editor/runtime | deferred |

## 4. Reconsideration Gate

Reconsider this branch only when:

1. a concrete independently useful workflow cannot be served proportionally by ordinary Markdown, existing tools or a narrow helper;
2. evidence shows the coordination cost is justified;
3. current/deferred/retired items are reconciled visibly;
4. storage, recovery, portability, parsing and migration risks are reviewed;
5. the result is accepted in a new Planning Draft decision.

This file is not a runtime specification and does not authorize implementation.

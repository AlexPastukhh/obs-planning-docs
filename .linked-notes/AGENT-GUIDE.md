# Linked Notes Agent Guide

Status: active repository-facing agent feature registry
Scope: Linked Notes capabilities that change how an AI/chat should author repository content or Reader-targeted responses. This guide is for content-working chats, not Linked Notes implementation work.

## 1. When To Use This Guide

Read this file when you are working with repository files in a context where OBS Linked Notes may consume, display or maintain that content.

You do **not** need to understand the Linked Notes runtime architecture by default. Read a detailed contract below only when its feature applies to the task.

A feature belongs in this registry only when its existence changes how an AI/chat should:

- create or edit a repository file;
- preserve a special repository marker/structure;
- create a repository template; or
- format a response that is explicitly intended for Linked Notes Reader.

Application internals such as IndexedDB/GM storage, GitHub write orchestration, runtime locks and diagnostic App State do not belong here merely because they exist.

## 2. Current Agent-Facing Features

| Feature | Status | Read when | Canonical contract / workflow |
|---|---|---|---|
| Reference Objects | active | a synchronized value is being created/materially edited, freshness is explicitly being checked, or a new Reference Object is intentionally created | [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md); direct repository authoring: [`REFERENCE-OBJECTS-AUTHORING.md`](REFERENCE-OBJECTS-AUTHORING.md) |
| Review Dependencies | active | a registered source/consumer relation exists, or a whole-file dependency is being created, reviewed or acknowledged | [`REVIEW-DEPENDENCIES.md`](REVIEW-DEPENDENCIES.md) |
| Ordered Reference Lists | active | `obs-order:*` markers exist, or complete lines/paragraphs must be sorted by current Reference Object values | [`ORDERED-REFERENCE-LISTS.md`](ORDERED-REFERENCE-LISTS.md) |
| Repository Templates | active | creating a document of a known template type or creating/editing a repository template | [`templates/README.md`](templates/README.md) |
| Reader-target response formatting | renderer active; supported automatic ChatGPT → Linked Notes handoff not implemented | a response is explicitly intended to be transferred into Linked Notes Reader | [`CHAT-RESPONSE-FORMAT.md`](CHAT-RESPONSE-FORMAT.md) |

This registry is the owner of **which** Linked Notes capabilities a content-working chat must know. The linked contract files own the detailed rules.

## 3. Reference Objects — Short Rule

Use [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md) as the canonical Reference Object semantics/format contract. Its `Ordinary consumption vs freshness verification` section decides when an existing materialized use can be consumed directly and when the canonical definition must be resolved.

For intentional direct repository creation or maintenance of Reference Objects, follow [`REFERENCE-OBJECTS-AUTHORING.md`](REFERENCE-OBJECTS-AUTHORING.md) for procedure order and the canonical contract for every normative rule.


## 4. Review Dependencies — Short Rule

Read [`REVIEW-DEPENDENCIES.md`](REVIEW-DEPENDENCIES.md) when a registered whole-file source/consumer relation applies. Compare the consumer marker's `against` fingerprint with the current source fingerprint defined by that contract. A mismatch or missing `against` means `NEEDS REVIEW`.

After actually reviewing the source, consumer, relation reason and optional review scope, update the consumer marker to the current source fingerprint. Do not change `against` merely to silence a warning. Pending local source text participates in the fingerprint, and Review Dependency bookkeeping comments are excluded from source fingerprints so acknowledgement-only edits do not trigger false cascades.

## 5. Ordered Reference Lists — Short Rule

Keep the `obs-ref:use` nested inside its complete Ordered Item. Validate that `unit="line"` or `unit="paragraph"` matches the actual file boundaries; do not move only part of an item. A stale/unresolved use blocks sorting even though the list may remain in the file.

Read [`ORDERED-REFERENCE-LISTS.md`](ORDERED-REFERENCE-LISTS.md) before editing these markers.

## 6. Repository Templates — Short Rule

Before creating a document of a known type, inspect `.linked-notes/templates/` and use a matching valid direct `*.template.md` file instead of reconstructing its fields from memory.

When creating a **new template**, create it as a direct child:

```text
.linked-notes/templates/<name>.template.md
```

and follow [`templates/README.md`](templates/README.md). Do not invent a template registry, nested template folder or interpolation syntax.

## 7. Reader-Target Response Formatting — Short Rule

Linked Notes Reader can render the supported safe `<details>/<summary>` form described in [`CHAT-RESPONSE-FORMAT.md`](CHAT-RESPONSE-FORMAT.md).

This is a **rendering capability**, not proof that ordinary ChatGPT responses are automatically transferred into Reader. Current reliable explicit transfer is manual Paste Markdown; the desired supported automatic handoff is not implemented yet.

Use Reader-specific formatting only when the response is actually intended for Reader transfer.

## 8. Working Boundary

These repository conventions do not authorize automatic GitHub writes, local Git, commit or push.

If the task is to **develop Linked Notes itself** rather than author content for it, leave this route and start at:

[`planning/documentation/tools/tampermonkey/linked-notes/README.md`](../planning/documentation/tools/tampermonkey/linked-notes/README.md)

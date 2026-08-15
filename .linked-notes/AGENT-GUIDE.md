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

| Feature | Status | Read when | Canonical contract |
|---|---|---|---|
| Reference Objects | active | a value should remain synchronized with an existing object, an `obs-ref:*` marker is edited, or a new Reference Object is intentionally created | [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md) |
| Ordered Reference Lists | active | `obs-order:*` markers exist, or complete lines/paragraphs must be sorted by current Reference Object values | [`ORDERED-REFERENCE-LISTS.md`](ORDERED-REFERENCE-LISTS.md) |
| Repository Templates | active | creating a document of a known template type or creating/editing a repository template | [`templates/README.md`](templates/README.md) |
| Reader-target response formatting | renderer active; supported automatic ChatGPT → Linked Notes handoff not implemented | a response is explicitly intended to be transferred into Linked Notes Reader | [`CHAT-RESPONSE-FORMAT.md`](CHAT-RESPONSE-FORMAT.md) |

This registry is the owner of **which** Linked Notes capabilities a content-working chat must know. The linked contract files own the detailed rules.

## 3. Reference Objects — Short Rule

Do not replace a synchronized Reference Object use with plain text.

When synchronization is intended:

1. resolve the object from `.linked-notes/reference-objects.json`;
2. read its `definition.path`;
3. use the canonical inner value from the single matching `obs-ref:def` marker;
4. preserve/insert the complete `obs-ref:use` marker.

Do not invent a new `ro_*` ID for an existing object. The registry is routing/index metadata; the definition marker is the canonical value owner.

Read [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md) before creating or materially editing these markers.

## 4. Ordered Reference Lists — Short Rule

Keep the `obs-ref:use` nested inside its complete Ordered Item. Validate that `unit="line"` or `unit="paragraph"` matches the actual file boundaries; do not move only part of an item. A stale/unresolved use blocks sorting even though the list may remain in the file.

Read [`ORDERED-REFERENCE-LISTS.md`](ORDERED-REFERENCE-LISTS.md) before editing these markers.

## 5. Repository Templates — Short Rule

Before creating a document of a known type, inspect `.linked-notes/templates/` and use a matching valid direct `*.template.md` file instead of reconstructing its fields from memory.

When creating a **new template**, create it as a direct child:

```text
.linked-notes/templates/<name>.template.md
```

and follow [`templates/README.md`](templates/README.md). Do not invent a template registry, nested template folder or interpolation syntax.

## 6. Reader-Target Response Formatting — Short Rule

Linked Notes Reader can render the supported safe `<details>/<summary>` form described in [`CHAT-RESPONSE-FORMAT.md`](CHAT-RESPONSE-FORMAT.md).

This is a **rendering capability**, not proof that ordinary ChatGPT responses are automatically transferred into Reader. Current reliable explicit transfer is manual Paste Markdown; the desired supported automatic handoff is not implemented yet.

Use Reader-specific formatting only when the response is actually intended for Reader transfer.

## 7. Working Boundary

These repository conventions do not authorize automatic GitHub writes, local Git, commit or push.

If the task is to **develop Linked Notes itself** rather than author content for it, leave this route and start at:

[`planning/documentation/tools/tampermonkey/linked-notes/README.md`](../planning/documentation/tools/tampermonkey/linked-notes/README.md)

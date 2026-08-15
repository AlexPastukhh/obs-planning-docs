# Linked Notes Repository Conventions

This directory contains repository-owned conventions used by OBS Linked Notes and by humans or AI agents that edit this repository directly.

## Choose Your Documentation Route

### AI/chat working with repository content

Read [`AGENT-GUIDE.md`](AGENT-GUIDE.md) first.

It is the registry of Linked Notes capabilities that can change how a chat should author files or Reader-targeted responses. Read only the detailed agent contract that applies to the current task.

### AI/chat developing Linked Notes itself

Use the application/developer documentation instead:

[`planning/documentation/tools/tampermonkey/linked-notes/README.md`](../planning/documentation/tools/tampermonkey/linked-notes/README.md)

## Repository-Facing Files

- [`AGENT-GUIDE.md`](AGENT-GUIDE.md) — registry of application-aware authoring features for content-working chats.
- [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md) — Reference Object definition/use markers and explicit synchronization rules.
- [`ORDERED-REFERENCE-LISTS.md`](ORDERED-REFERENCE-LISTS.md) — Reference-Object-driven ordered item markers, structural-unit validation and sorting rules.
- [`reference-objects.json`](reference-objects.json) — Reference Object routing and rebuildable usage index.
- [`templates/README.md`](templates/README.md) — repository file-template format, template creation path and document-from-template rules.
- [`CHAT-RESPONSE-FORMAT.md`](CHAT-RESPONSE-FORMAT.md) — supported Reader-target response formatting and current transport boundary.

## General Agent Rule

Before creating or materially editing repository content, check whether a repository template, existing Reference Object or Ordered Reference List applies to the requested content. When a response is explicitly intended for Linked Notes Reader, check the Reader response-format contract.

These convention files do not authorize automatic GitHub writes. Linked Notes business actions produce local file state first; `Update current file` and `Update all` are the explicit publication actions.

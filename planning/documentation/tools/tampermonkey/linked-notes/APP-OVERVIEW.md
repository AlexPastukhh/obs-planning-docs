# OBS Linked Notes Application Overview

Status: current prototype product map
Version: `0.7.2-prototype`
Scope: fast current-state orientation for the OBS Linked Notes Tampermonkey application. Detailed behavior remains owned by the linked project-local workflows and focused implementation mappings.

## 1. What The Application Is

OBS Linked Notes is a local-first browser helper running on ChatGPT pages. It connects a selected GitHub repository workspace to a set of repository-documentation surfaces while retaining recoverable local working state.

The current prototype is not accepted production architecture. Ordinary repository Markdown/files remain durable truth; browser storage is working/config/cache state unless a specific workflow says otherwise.

## 2. Surface Map

| Surface | Purpose | Main actions | Durable truth | Local state | GitHub reads | GitHub writes |
|---|---|---|---|---|---|---|
| Workspace management | Select reusable repository context | create/edit/delete local workspaces, choose current workspace, store shared token | none | GM workspace/config records | none merely to edit settings | none |
| Notes | Create/manage Linked Notes | create/edit, links, images, refresh/reconcile, Save GitHub, explicit copy/recovery | repository Note Markdown + repository image assets after verified save | IndexedDB Note records + pending asset state | explicit refresh/save/recovery | explicit save/copy/recovery |
| Files | Repository browser/editor | browse, preview, create/edit bounded UTF-8 text, create structure/copy, links | ordinary repository files/folders | browser/editor/preferences/template caches | explicit browse/search/template/open | explicit create/edit/copy/structure actions |
| Categories | Repository-backed file/Note classification | refresh, create/edit, assign/unassign, inspect implication | category definition Markdown | derived cache + local UX groups | explicit refresh/validation | explicit category-definition writes |
| Repository templates | Seed normal file creation | choose template, refresh template list, create a normal file from template body | `.linked-notes/templates/*.template.md` | template cache/index/diagnostics | explicit template discovery/read | only later normal file creation |
| Reference Objects | Stable repository-native definition/use materialization | define, copy use marker, check uses, update local/GitHub, validate tags | definition marker text + repository index/routing metadata | workspace-scoped drafts/check state | explicit checks/open | explicit update/registry operations |
| Chat Response Reader | Read one assistant response in a large safe Markdown view | Open in Reader, Paste Markdown, Render, Copy Markdown, Close | none | runtime-only Reader semantic state | none | none |
| App State | Diagnostic application-state snapshot | Refresh, Copy for ChatGPT, Copy FULL JSON | none | generated snapshot of GM/IndexedDB/runtime state | none | none |

## 3. Workspace Model

The application distinguishes:

```text
Workspace
  = reusable local GitHub owner/repository/branch/Notes-folder/Categories-folder configuration;

Chat Workspace Binding
  = local mapping created only after explicit workspace selection on a stable ChatGPT chat;

Note Remote Binding
  = verified owner/repository/branch/path/SHA/content-hash identity for one Note.
```

Switching the current chat workspace does not silently retarget an already verified Note.

## 4. Notes

The Notes surface is the Linked Note authoring/reconciliation workflow.

Current capabilities include:

- local title/body drafts;
- stable Note identity and repository binding;
- links to repository files/anchors and other Notes;
- derived outgoing/backlink views;
- category intent/assignment;
- recoverable pending clipboard/file images;
- verified repository image assets;
- explicit repository refresh and local/remote reconciliation;
- explicit verified save/copy/recovery;
- Edit / Preview / Split rich Markdown presentation;
- image-aware transfer into another same-repository Markdown target.

Detailed owner: [`linked-notes-end-to-end-workflow.md`](../../../../areas/documentation-workbench/linked-notes-end-to-end-workflow.md).

## 5. Files

The Files surface is the repository-oriented workspace.

Current capabilities include:

- explicit repository root/folder navigation;
- bounded text preview and exact `Open on GitHub` target;
- safe rich Markdown preview;
- bounded UTF-8 text create/edit with absence/SHA protection;
- tracked folder creation through `.gitkeep` where that flow is used;
- repository-root whole-file/heading-link copy;
- filename/path target search under explicit bounds;
- file/folder structure creation and add-only copy in the Files-centric extension;
- normal New File editor populated from repository templates.

Detailed owners:

- [`repository-file-browser-and-categories-workflow.md`](../../../../areas/documentation-workbench/repository-file-browser-and-categories-workflow.md);
- [`files-centric-repository-workspace-extension.md`](../../../../areas/documentation-workbench/files-centric-repository-workspace-extension.md).

## 6. Categories

Category definition Markdown is the current prototype owner of explicit file/Note membership and implication relations. Derived caches and local category groups are not repository truth.

Current capabilities include:

- explicit category refresh;
- v3 definition create/update;
- file and verified Linked Note membership;
- category implication and derived membership;
- local UX groups;
- path-aware malformed/broken/cycle diagnostics;
- SHA-aware writes with read-back verification.

Detailed owner: [`repository-file-browser-and-categories-workflow.md`](../../../../areas/documentation-workbench/repository-file-browser-and-categories-workflow.md).

## 7. Repository Templates

Repository templates are direct children of `.linked-notes/templates/` and are valid when they use the repository template contract. Selecting a template fills the normal New File editor; it does not write GitHub until normal explicit file creation.

Repository contract: `.linked-notes/templates/README.md`.

## 8. Reference Objects

Reference Objects use stable `ro_*` identities with repository-native definition/use markers. The canonical value is the content inside the definition marker; use markers materialize the value so repository Markdown remains readable outside the application.

The repository registry is routing/index metadata, not the canonical value store. Propagation is explicit rather than automatic.

Detailed owners:

- [`reference-object-definition-and-materialized-use-workflow.md`](../../../../areas/documentation-workbench/reference-object-definition-and-materialized-use-workflow.md);
- [`REFERENCE-OBJECTS-PROTOTYPE.md`](REFERENCE-OBJECTS-PROTOTYPE.md);
- repository contract `.linked-notes/REFERENCE-OBJECTS.md`.

## 9. Chat Response Reader

The Reader is a temporary local projection, not a Note or repository file.

Current source modes:

```text
Paste Markdown
  → exact source;

Open in Reader on a visible assistant response
  → Markdown derived from the rendered ChatGPT DOM;
  → always labelled derived.
```

The Reader supports a narrow safe `<details>/<summary>` form and keeps arbitrary active HTML blocked. Opening/rendering/copying/closing Reader content performs no GitHub or local persistence write.

The rendering capability and the ChatGPT-to-Reader transport are separate concerns. Manual Paste is the current reliable exact transfer. The current DOM-derived `Open in Reader` path remains prototype implementation evidence; a supported automatic handoff that does not rely on Linked Notes extracting content from the ChatGPT UI is not implemented yet.

Detailed mapping: [`CHAT-RESPONSE-READER.md`](CHAT-RESPONSE-READER.md).

## 10. App State

App State is diagnostic support for transferring application state to another chat or debugging a problem. It is deliberately different from normal Note/File content copy.

It can include:

- all application-owned GM keys, with credentials redacted;
- existing application IndexedDB stores/records;
- runtime app/UI semantic state;
- current Reader state;
- binary payloads in FULL mode and binary omission descriptors in ChatGPT mode.

Detailed mapping: [`FULL-APP-STATE-EXPORT.md`](FULL-APP-STATE-EXPORT.md).

## 11. Main Boundaries

The current prototype does not automatically:

- scan a whole repository in the background;
- write on ChatGPT page load or route change;
- repair links after arbitrary moves/renames;
- make multi-file GitHub writes globally atomic;
- import/restore a Full App State snapshot;
- store Reader history;
- treat DOM-derived ChatGPT text as original exact model Markdown;
- run local Git, commit or push.

## 12. Agent-Facing Repository Capabilities

Some Linked Notes capabilities change how an AI/chat should author repository content or a Reader-targeted response. Their canonical repository-facing registry is [`.linked-notes/AGENT-GUIDE.md`](../../../../../.linked-notes/AGENT-GUIDE.md).

Current registry entries:

- Reference Objects;
- Repository Templates;
- Reader-target response formatting.

The detailed rules stay in `.linked-notes/**`; this application overview only points to that layer.

## 13. Where To Go Next

- runtime composition: [`ARCHITECTURE.md`](ARCHITECTURE.md);
- data ownership/storage: [`DATA-AND-STATE.md`](DATA-AND-STATE.md);
- known problems: [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md);
- development directions: [`linked-notes-prototype-roadmap.md`](../../../../areas/documentation-workbench/linked-notes-prototype-roadmap.md).

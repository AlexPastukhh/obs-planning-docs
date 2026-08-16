# OBS Linked Notes Use-Case Map

Status: active current-prototype semantic map
Version: `0.8.0-prototype` / map v1.1.0
Scope: current user-visible Linked Notes outcomes, their trigger-to-result boundaries, dependencies and ownership. This file is the semantic entry point for the current Linked Notes application.

Canonical registry: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md)
Current surface/product map: [`APP-OVERVIEW.md`](APP-OVERVIEW.md)

## 1. Authority And Read Rule

For **current Linked Notes behavior**, start here.

```text
USE-CASE-MAP.md
  = semantic entry and relationship map;

USE-CASE-REGISTRY.md
  = canonical current Linked Notes Use-Case IDs/statuses;

APP-OVERVIEW.md
  = current surfaces/actions and concise product state;

ARCHITECTURE.md / DATA-AND-STATE.md
  = implementation and state ownership;

focused mappings/checklists
  = feature-specific implementation evidence;

.linked-notes/**
  = repository-facing authoring/agent contracts.
```

`planning/areas/documentation-workbench/` is **not current Linked Notes semantic authority**. Its Linked Notes-specific workflow files are retained as planning/history/compatibility context. If one of those retained files conflicts with this directory's current map/registry/current-state docs, the current Linked Notes corpus here wins for the prototype state being described.

This migration does not claim that the Tampermonkey prototype is accepted production architecture. It makes the current application semantics explicit where the application documentation and implementation live.

## 2. What Counts As A Linked Notes Use Case

A semantic Use Case is an independently useful user outcome with:

```text
recognizable trigger/input
+ useful purpose/result
+ explicit owner/boundaries
+ a path the user can traverse intentionally.
```

A UI button, popup, storage mechanism, renderer, API call or implementation module is not automatically a Use Case.

Examples of supporting capabilities rather than independent Use Cases include `Locations`, repository templates, heading-link copy, stale badges, the shared pending queue, `Center`, drag/edge-peek behavior and the safe Markdown renderer.

## 3. Current Semantic Topology

```text
UC-LN-WORKSPACE
Configure And Select Repository Workspace
        │
        ├──────────────────────────────┬──────────────────────────────┐
        ▼                              ▼                              ▼
UC-LN-NOTES                     UC-LN-FILES                    UC-LN-READER
Create/Link/Reconcile           Browse/Read/Prepare            Read one ChatGPT
And Save Notes                  repository file work           response locally
        │                              │
        │                              ├───────────────┐
        │                              ▼               ▼
        │                       UC-LN-CATEGORIES  UC-LN-REFERENCE-OBJECTS
        │                              │               │
        │                              │               ▼
        │                              │       UC-LN-ORDERED-REFERENCE-LISTS
        │                              │               │
        │                              └───────┬───────┘
        │                                      ▼
        │                              common pending files
        │                                      │
        │                                      ▼
        │                               UC-LN-PUBLISH
        │                         Update current / Update all
        │
        └──────────────► UC-LN-NOTE-TRANSFER
                         Copy Note + repository images

UC-LN-APP-STATE
Export diagnostic local application state
  = independent local diagnostic path
```

Important publication boundary:

```text
ordinary Files / Categories / Reference Objects / Ordered Lists changes
  → local intended repository bytes
  → common pending queue
  → UC-LN-PUBLISH;

Linked Note Save GitHub
  → remains the Note compound save/reconcile path;

image-aware Note transfer
  → remains its own compound remote transfer path.
```

## 4. Surface-To-Use-Case Map

| Current surface/capability | Semantic Use Case | Main user result | GitHub write boundary |
|---|---|---|---|
| Workspace management | `UC-LN-WORKSPACE` | reusable selected repository context and chat binding | none merely to configure/select |
| Notes | `UC-LN-NOTES` | local/reconciled/durable repository Note | explicit Note save/recovery path |
| Files browse/read/edit/structure/copy | `UC-LN-FILES` | repository content read or intended file state staged locally | publication delegated to `UC-LN-PUBLISH` |
| Categories | `UC-LN-CATEGORIES` | repository-backed classification intent + derived views | definition changes publish through `UC-LN-PUBLISH` |
| `Update current file` / `Update all` | `UC-LN-PUBLISH` | verified remote publication of pending repository files | this Use Case owns the standard publication scopes |
| Note image-aware transfer | `UC-LN-NOTE-TRANSFER` | Note Markdown + supported repository images copied to target | explicit compound transfer writes |
| Reference Objects | `UC-LN-REFERENCE-OBJECTS` | definition/use materialization, freshness evidence and explicit local synchronization | pending files publish through `UC-LN-PUBLISH` |
| Ordered Reference Lists | `UC-LN-ORDERED-REFERENCE-LISTS` | complete Markdown units wrapped/reordered by current Reference Object values | resulting file publishes through `UC-LN-PUBLISH` |
| Chat Response Reader | `UC-LN-READER` | one response shown in a large safe local Reader | none |
| App State | `UC-LN-APP-STATE` | redacted diagnostic snapshot copied locally | none |
| Repository templates | supporting capability of `UC-LN-FILES` | seed ordinary New File content | no write on selection |
| Locations/search/link copy | supporting navigation/copy capabilities | reach/copy exact repository targets | none merely to navigate/copy |
| stale tree/open-file warnings | supporting diagnostic capability of `UC-LN-REFERENCE-OBJECTS` | show stale/unresolved counts | none |
| draggable/edge-peek panel | UI infrastructure | keep open tool accessible without blocking page | none |

### Traceability convention

Every canonical `UC-LN-*` section below ends with an explicit **Traceability** block. The link classes mean:

```text
Product / behavior
  = current user-visible behavior/state documentation;

Focused / repository contract
  = narrower feature or repository-authoring contract when one exists;

Primary implementation
  = concrete source modules that principally implement the Use Case;

Automated evidence
  = concrete tests that directly exercise the implementation contract;

Manual acceptance
  = browser/remote checklist evidence that is not implied by unit tests.
```

The implementation/test lists are intentionally **primary, not exhaustive**. Cross-cutting shell/orchestration can also pass through [`src/linked-notes-app.js`](src/linked-notes-app.js), [`src/linked-notes-ui.js`](src/linked-notes-ui.js), [`src/github-contents-client.js`](src/github-contents-client.js) and [`src/runtime-responsiveness.js`](src/runtime-responsiveness.js). A source refactor may change traceability links without creating a new Use-Case ID when trigger/result semantics stay the same.

<a id="uc-ln-workspace"></a>

## 5. `UC-LN-WORKSPACE` — Configure And Select Repository Workspace

**Trigger/input:** the user opens workspace management, creates/edits/deletes a local workspace, stores the shared GitHub credential, or explicitly selects a workspace for the current stable chat.

**Successful result:** Linked Notes has an explicit reusable owner/repository/branch/Notes-folder/Categories-folder context and, when selected for a stable chat, a local chat-to-workspace binding.

**Key behavior:**

- workspace configuration is local application state;
- merely editing/selecting a workspace performs no repository write;
- a stable chat acquires a workspace binding only after explicit selection;
- switching current chat workspace does not silently retarget an already verified Note remote binding;
- credentials remain secret local state and are not repository content or exportable diagnostic plaintext.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#3-workspace-model`](APP-OVERVIEW.md#3-workspace-model), [`DATA-AND-STATE.md#8-identity-separation`](DATA-AND-STATE.md#8-identity-separation), [`ARCHITECTURE.md#workspacecontext`](ARCHITECTURE.md#workspacecontext).
- **Focused / repository contract:** no separate repository-content contract; workspace selection/configuration is local application state.
- **Primary implementation:** [`src/workspace-context.js`](src/workspace-context.js), [`src/workspace-store.js`](src/workspace-store.js), with application integration in [`src/linked-notes-app.js`](src/linked-notes-app.js).
- **Automated evidence:** [`tests/workspace-context.test.mjs`](tests/workspace-context.test.mjs), [`tests/workspace-store.test.mjs`](tests/workspace-store.test.mjs), workspace integration cases in [`tests/linked-notes-app-policy.test.mjs`](tests/linked-notes-app-policy.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#5-workspace-creation-and-shared-token`](PROTOTYPE-CHECKLIST.md#5-workspace-creation-and-shared-token), [`PROTOTYPE-CHECKLIST.md#6-per-chat-workspace-memory`](PROTOTYPE-CHECKLIST.md#6-per-chat-workspace-memory), [`PROTOTYPE-CHECKLIST.md#8-workspace-deletion-and-migration`](PROTOTYPE-CHECKLIST.md#8-workspace-deletion-and-migration), [`PROTOTYPE-CHECKLIST.md#12-secret-and-storage-inspection`](PROTOTYPE-CHECKLIST.md#12-secret-and-storage-inspection).

<a id="uc-ln-notes"></a>

## 6. `UC-LN-NOTES` — Create, Link, Reconcile And Save Repository Notes

**Trigger/input:** the user opens Notes to create or inspect a Note, edits title/body, manages links/categories/images, explicitly refreshes repository Notes, saves, recovers or navigates a Note relation.

**Successful result:** a durable repository-owned Markdown Note with stable identity/links can be found, reconciled with recoverable local working state and opened again; alternatively the UI exposes an explicit local-only/conflict/deleted/failed state without silently discarding local work.

**Current behavior includes:**

- local title/body drafts and IndexedDB recovery;
- links to repository files/anchors and other Notes;
- outgoing relation/backlink projections;
- pending clipboard/file images and verified repository image assets;
- explicit refresh/reconciliation of remote Notes;
- explicit verified Note save/recovery;
- Edit / Preview / Split rich Markdown presentation;
- handoff to `UC-LN-NOTE-TRANSFER` for copying one verified Note plus repository images.

**Boundary:** Note `Save GitHub` remains the established compound Note workflow and is not replaced by the generic pending-file publisher.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#4-notes`](APP-OVERVIEW.md#4-notes), [`DATA-AND-STATE.md#4-indexeddb`](DATA-AND-STATE.md#4-indexeddb), [`ARCHITECTURE.md#notes-and-relations`](ARCHITECTURE.md#notes-and-relations), [`ARCHITECTURE.md#images-and-transfer`](ARCHITECTURE.md#images-and-transfer).
- **Focused / repository contract:** repository-facing Linked Notes route starts at [`.linked-notes/README.md`](../../../../../.linked-notes/README.md); Note transfer has its own canonical UC below.
- **Primary implementation:** [`src/linked-notes-core.js`](src/linked-notes-core.js), [`src/note-markdown-codec.js`](src/note-markdown-codec.js), [`src/indexeddb-note-store.js`](src/indexeddb-note-store.js), [`src/remote-note-reconcile.js`](src/remote-note-reconcile.js), [`src/note-relation-index.js`](src/note-relation-index.js), [`src/note-image-assets.js`](src/note-image-assets.js), [`src/pending-note-asset-store.js`](src/pending-note-asset-store.js), with save/recovery orchestration in [`src/linked-notes-app.js`](src/linked-notes-app.js).
- **Automated evidence:** [`tests/linked-notes-core.test.mjs`](tests/linked-notes-core.test.mjs), [`tests/note-markdown-codec.test.mjs`](tests/note-markdown-codec.test.mjs), [`tests/remote-note-reconcile.test.mjs`](tests/remote-note-reconcile.test.mjs), [`tests/note-relation-index.test.mjs`](tests/note-relation-index.test.mjs), [`tests/note-image-assets.test.mjs`](tests/note-image-assets.test.mjs), [`tests/pending-note-asset-store.test.mjs`](tests/pending-note-asset-store.test.mjs), Note integration cases in [`tests/linked-notes-app-policy.test.mjs`](tests/linked-notes-app-policy.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4-github-folder-refresh-and-remote-change-reconciliation`](PROTOTYPE-CHECKLIST.md#4-github-folder-refresh-and-remote-change-reconciliation), [`PROTOTYPE-CHECKLIST.md#9-local-note-and-link-checks`](PROTOTYPE-CHECKLIST.md#9-local-note-and-link-checks), [`PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety`](PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety), [`PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery`](PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery).

<a id="uc-ln-files"></a>

## 7. `UC-LN-FILES` — Browse, Read And Prepare Repository File Work

**Trigger/input:** the user explicitly opens Files, navigates a repository location/path, opens/searches a file, creates/edits bounded text, creates structure, copies files/folders or starts a New File from a repository template.

**Successful result:** the user can inspect exact repository content/identity and/or produce complete intended repository file bytes staged locally with conflict-relevant base identity preserved.

**Current behavior includes:**

- repository root/folder browsing and direct repository-relative path opening;
- bounded text/source and safe rich Markdown preview;
- exact `Open on GitHub` targets;
- bounded UTF-8 file create/edit staged locally;
- tracked empty-folder representation where `.gitkeep` is required;
- repository-root file/heading-link copy;
- bounded path/filename search;
- add-only structure creation and binary-safe file/folder copy staged locally;
- repository templates as a New File seed;
- same-live-runtime Files context preservation across panel collapse/expand when workspace target is unchanged.

**Boundary:** local repository changes are not remote success. Standard publication is delegated to `UC-LN-PUBLISH`.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#5-files`](APP-OVERVIEW.md#5-files), [`ARCHITECTURE.md#files-workspace`](ARCHITECTURE.md#files-workspace), [`DATA-AND-STATE.md#10-persistence-and-mutation-rules`](DATA-AND-STATE.md#10-persistence-and-mutation-rules).
- **Focused / repository contract:** repository-template seeding is defined by [`.linked-notes/templates/README.md`](../../../../../.linked-notes/templates/README.md); Reference Object/Ordered List authoring rules are owned by their separate UCs/contracts.
- **Primary implementation:** [`src/repository-file-browser.js`](src/repository-file-browser.js), [`src/repository-files-workspace-core.js`](src/repository-files-workspace-core.js), [`src/repository-files-workspace-runtime.js`](src/repository-files-workspace-runtime.js), [`src/repository-target.js`](src/repository-target.js), [`src/repository-target-search.js`](src/repository-target-search.js), [`src/repository-text-file-write.js`](src/repository-text-file-write.js), [`src/repository-file-templates.js`](src/repository-file-templates.js), [`src/repository-markdown-heading-links.js`](src/repository-markdown-heading-links.js), [`src/repository-local-change-store.js`](src/repository-local-change-store.js), [`src/repository-local-changes-runtime.js`](src/repository-local-changes-runtime.js).
- **Automated evidence:** [`tests/repository-file-browser.test.mjs`](tests/repository-file-browser.test.mjs), [`tests/repository-files-workspace-core.test.mjs`](tests/repository-files-workspace-core.test.mjs), [`tests/repository-files-workspace-runtime.test.mjs`](tests/repository-files-workspace-runtime.test.mjs), [`tests/repository-target.test.mjs`](tests/repository-target.test.mjs), [`tests/repository-target-search.test.mjs`](tests/repository-target-search.test.mjs), [`tests/repository-text-file-write.test.mjs`](tests/repository-text-file-write.test.mjs), [`tests/repository-file-templates.test.mjs`](tests/repository-file-templates.test.mjs), [`tests/repository-markdown-heading-links.test.mjs`](tests/repository-markdown-heading-links.test.mjs), [`tests/repository-local-change-store.test.mjs`](tests/repository-local-change-store.test.mjs), [`tests/repository-local-changes-runtime.test.mjs`](tests/repository-local-changes-runtime.test.mjs), [`tests/files-surface-auto-load.test.mjs`](tests/files-surface-auto-load.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4a-repository-file-browser`](PROTOTYPE-CHECKLIST.md#4a-repository-file-browser), [`PROTOTYPE-CHECKLIST.md#4d-target-picker-and-bounded-search`](PROTOTYPE-CHECKLIST.md#4d-target-picker-and-bounded-search), [`PROTOTYPE-CHECKLIST.md#4e-rich-markdown-and-repository-images`](PROTOTYPE-CHECKLIST.md#4e-rich-markdown-and-repository-images), [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).

<a id="uc-ln-categories"></a>

## 8. `UC-LN-CATEGORIES` — Manage Repository Categories

**Trigger/input:** the user explicitly opens Categories, refreshes definitions, creates/edits a category, assigns/unassigns a file or verified Note, or inspects explicit/implied membership.

**Successful result:** category names/descriptions/implications/memberships are reconstructible from repository category-definition Markdown, with local intended changes staged and derived views/diagnostics visible.

**Current behavior includes:**

- explicit category refresh;
- category-definition create/update;
- explicit file and verified Note membership;
- category implication and derived membership;
- local-only UX groups;
- malformed/broken/cycle diagnostics;
- local category-definition/membership staging.

**Boundary:** category definitions are repository truth after publication; local cache/groups are not. Publication uses `UC-LN-PUBLISH`.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#6-categories`](APP-OVERVIEW.md#6-categories), [`ARCHITECTURE.md#categories`](ARCHITECTURE.md#categories), [`DATA-AND-STATE.md#category-cache-identity`](DATA-AND-STATE.md#category-cache-identity).
- **Focused / repository contract:** category meaning is carried by repository category-definition Markdown; no separate current `.linked-notes/**` category contract exists.
- **Primary implementation:** [`src/category-definition-codec.js`](src/category-definition-codec.js), [`src/repository-category-index.js`](src/repository-category-index.js), [`src/category-cache-store.js`](src/category-cache-store.js), with user-flow integration in [`src/linked-notes-app.js`](src/linked-notes-app.js) and [`src/repository-files-workspace-runtime.js`](src/repository-files-workspace-runtime.js).
- **Automated evidence:** [`tests/category-definition-codec.test.mjs`](tests/category-definition-codec.test.mjs), [`tests/repository-category-index.test.mjs`](tests/repository-category-index.test.mjs), [`tests/category-cache-store.test.mjs`](tests/category-cache-store.test.mjs), category integration cases in [`tests/linked-notes-app-policy.test.mjs`](tests/linked-notes-app-policy.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4b-repository-file-categories`](PROTOTYPE-CHECKLIST.md#4b-repository-file-categories), [`PROTOTYPE-CHECKLIST.md#4c-note-categories-and-multi-target-category-creation`](PROTOTYPE-CHECKLIST.md#4c-note-categories-and-multi-target-category-creation), [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).

<a id="uc-ln-publish"></a>

## 9. `UC-LN-PUBLISH` — Publish Pending Repository Changes

**Trigger/input:** one or more pending repository-file changes exist and the user explicitly invokes `Update current file` or `Update all`.

**Successful result:** the selected publication scope is verified remotely and only verified pending changes are cleared; otherwise pending local state remains recoverable with an explicit conflict/error/unknown result.

**`Update current file`:**

- exactly the open pending path;
- GitHub Contents API;
- captured base SHA for updates / expected absence for creates;
- exact read-back;
- clears only that verified path.

**`Update all`:**

- every pending path in the exact workspace queue;
- per-path base/absence preflight;
- intended blobs + one tree + one commit;
- one non-force branch ref transition;
- post-update ref/commit/tree/blob verification;
- no sequential Contents fallback.

**Boundary:** this is the standard publisher for ordinary Files, Categories, Reference Objects, Ordered Lists, structure and copy. It does not absorb the compound Note save or image-aware Note transfer workflows.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#5-files`](APP-OVERVIEW.md#5-files), [`README.md#5-remote-action-boundary`](README.md#5-remote-action-boundary), [`ARCHITECTURE.md#github-adapter`](ARCHITECTURE.md#github-adapter), [`ARCHITECTURE.md#6-read--write-separation`](ARCHITECTURE.md#6-read--write-separation), [`DATA-AND-STATE.md#10-persistence-and-mutation-rules`](DATA-AND-STATE.md#10-persistence-and-mutation-rules).
- **Focused / repository contract:** no feature-specific authoring contract; this UC is the standard publication boundary for the common pending repository queue. Current acceptance risk is tracked in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).
- **Primary implementation:** [`src/repository-change-publisher.js`](src/repository-change-publisher.js), [`src/repository-local-change-store.js`](src/repository-local-change-store.js), [`src/repository-local-changes-runtime.js`](src/repository-local-changes-runtime.js), [`src/github-contents-client.js`](src/github-contents-client.js).
- **Automated evidence:** [`tests/repository-change-publisher.test.mjs`](tests/repository-change-publisher.test.mjs), [`tests/repository-local-change-store.test.mjs`](tests/repository-local-change-store.test.mjs), [`tests/repository-local-changes-runtime.test.mjs`](tests/repository-local-changes-runtime.test.mjs), [`tests/github-contents-client.test.mjs`](tests/github-contents-client.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists), [`PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety`](PROTOTYPE-CHECKLIST.md#10-github-create-update-and-workspace-safety), [`PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery`](PROTOTYPE-CHECKLIST.md#11-conflict-and-recovery).

<a id="uc-ln-note-transfer"></a>

## 10. `UC-LN-NOTE-TRANSFER` — Copy A Linked Note And Repository Images

**Trigger/input:** the user starts transfer from a verified repository-backed Note, chooses a same-owner/repository/branch Markdown target and create/append mode, and reviews image classifications/destinations.

**Successful result:** visible Note Markdown is copied/appended to the target; supported repository images are copied or safely reused under target-owned assets; rewritten relative destinations and successful remote writes are verified, or an explicit partial/conflict result is shown.

**Boundaries:**

- copy, not move;
- source Note/assets remain intact;
- same owner/repository/branch only in the current slice;
- external images are not auto-downloaded;
- no promise of multi-file atomicity or automatic orphan cleanup.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#4-notes`](APP-OVERVIEW.md#4-notes), [`ARCHITECTURE.md#images-and-transfer`](ARCHITECTURE.md#images-and-transfer).
- **Focused / repository contract:** transfer remains a compound same-repository Note/image operation; repository image/link semantics are represented by the source modules below rather than a separate current `.linked-notes/**` transfer contract.
- **Primary implementation:** [`src/image-aware-markdown-transfer.js`](src/image-aware-markdown-transfer.js), [`src/markdown-image-references.js`](src/markdown-image-references.js), [`src/repository-media-loader.js`](src/repository-media-loader.js), [`src/repository-asset-write.js`](src/repository-asset-write.js), [`src/repository-text-file-write.js`](src/repository-text-file-write.js), [`src/note-image-assets.js`](src/note-image-assets.js).
- **Automated evidence:** [`tests/image-aware-markdown-transfer.test.mjs`](tests/image-aware-markdown-transfer.test.mjs), [`tests/markdown-image-references.test.mjs`](tests/markdown-image-references.test.mjs), [`tests/repository-media-loader.test.mjs`](tests/repository-media-loader.test.mjs), [`tests/repository-asset-write.test.mjs`](tests/repository-asset-write.test.mjs), [`tests/repository-text-file-write.test.mjs`](tests/repository-text-file-write.test.mjs), [`tests/note-image-assets.test.mjs`](tests/note-image-assets.test.mjs).
- **Manual acceptance:** [`PROTOTYPE-CHECKLIST.md#4h-image-aware-note-to-markdown-transfer`](PROTOTYPE-CHECKLIST.md#4h-image-aware-note-to-markdown-transfer).

<a id="uc-ln-reference-objects"></a>

## 11. `UC-LN-REFERENCE-OBJECTS` — Define, Materialize, Check And Synchronize Reference Objects

**Trigger/input:** the user defines/updates a Reference Object, copies/inserts a materialized use marker, checks freshness, updates a use locally, validates indexed tags or explicitly deep-validates repository evidence.

**Successful result:** stable `ro_*` identity connects one canonical definition marker to readable materialized uses; current/stale/unresolved evidence is visible and intended synchronization changes can be staged locally.

**Current invariants:**

- canonical value lives inside the `obs-ref:def` marker, not in the registry JSON;
- `.linked-notes/reference-objects.json` is routing/index metadata;
- materialized uses remain ordinary readable repository text;
- normal checks/Files stale diagnostics/`Validate tags` follow indexed definition/use routes;
- `Deep validate repo` is the separate explicit bounded repository-wide discovery path;
- definition changes do not silently propagate into all uses;
- stale/unresolved Files warnings are diagnostic only.

**Boundary:** local definition/use/index changes publish through `UC-LN-PUBLISH`; automatic propagation remains roadmap research only.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#8-reference-objects`](APP-OVERVIEW.md#8-reference-objects), [`REFERENCE-OBJECTS-PROTOTYPE.md`](REFERENCE-OBJECTS-PROTOTYPE.md), [`DATA-AND-STATE.md#reference-object-identity`](DATA-AND-STATE.md#reference-object-identity), [`ARCHITECTURE.md#reference-objects`](ARCHITECTURE.md#reference-objects).
- **Focused / repository contract:** [`.linked-notes/REFERENCE-OBJECTS.md`](../../../../../.linked-notes/REFERENCE-OBJECTS.md), registry/index file [`.linked-notes/reference-objects.json`](../../../../../.linked-notes/reference-objects.json).
- **Primary implementation:** [`src/reference-object-markers.js`](src/reference-object-markers.js), [`src/reference-object-registry.js`](src/reference-object-registry.js), [`src/reference-object-local-store.js`](src/reference-object-local-store.js), [`src/repository-reference-object-service.js`](src/repository-reference-object-service.js), [`src/repository-reference-objects-runtime.js`](src/repository-reference-objects-runtime.js), [`src/repository-reference-stale-runtime.js`](src/repository-reference-stale-runtime.js).
- **Automated evidence:** [`tests/reference-object-markers.test.mjs`](tests/reference-object-markers.test.mjs), [`tests/reference-object-registry.test.mjs`](tests/reference-object-registry.test.mjs), [`tests/reference-object-local-store.test.mjs`](tests/reference-object-local-store.test.mjs), [`tests/repository-reference-object-service.test.mjs`](tests/repository-reference-object-service.test.mjs), [`tests/repository-reference-objects-runtime.test.mjs`](tests/repository-reference-objects-runtime.test.mjs), plus suite/build inclusion through [`verify-linked-notes.mjs`](verify-linked-notes.mjs).
- **Manual acceptance:** Reference Object staging/freshness/indexed-validation cases in [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).

<a id="uc-ln-ordered-reference-lists"></a>

## 12. `UC-LN-ORDERED-REFERENCE-LISTS` — Create And Reorder Reference-Driven Markdown Units

**Trigger/input:** an open text/Markdown file contains Reference Object uses and the user invokes Ordered List creation or local ordering.

**Successful result:** complete physical line/paragraph units are represented by inline `obs-order:list` / `obs-order:item` markers and can be reordered locally using freshly checked current Reference Object values while bytes outside item ranges remain unchanged.

**Current invariants:**

- every item contains exactly one matching live Reference Object use;
- stale/unresolved uses may be wrapped, but ordering is blocked until fresh;
- line/paragraph structural units are validated from actual file text;
- sort modes are `number`, `alphabetical`, `natural` and exact-value `custom`;
- equal keys are stable;
- no `eval` or arbitrary comparator code;
- complete item units move; unrelated bytes remain in place.

**Boundary:** ordering is local and has no feature-specific GitHub action; the resulting file publishes through `UC-LN-PUBLISH`.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#8-reference-objects`](APP-OVERVIEW.md#8-reference-objects), [`DATA-AND-STATE.md#ordered-reference-list-identity`](DATA-AND-STATE.md#ordered-reference-list-identity), [`ARCHITECTURE.md#reference-objects`](ARCHITECTURE.md#reference-objects).
- **Focused / repository contract:** [`.linked-notes/ORDERED-REFERENCE-LISTS.md`](../../../../../.linked-notes/ORDERED-REFERENCE-LISTS.md), with nested Reference Object semantics from [`.linked-notes/REFERENCE-OBJECTS.md`](../../../../../.linked-notes/REFERENCE-OBJECTS.md).
- **Primary implementation:** [`src/ordered-reference-list-markers.js`](src/ordered-reference-list-markers.js), [`src/ordered-reference-list-core.js`](src/ordered-reference-list-core.js), [`src/repository-ordered-reference-lists-runtime.js`](src/repository-ordered-reference-lists-runtime.js), with pending publication integration through [`src/repository-local-changes-runtime.js`](src/repository-local-changes-runtime.js).
- **Automated evidence:** direct structural/sort coverage in [`tests/ordered-reference-list-core.test.mjs`](tests/ordered-reference-list-core.test.mjs); marker/runtime inclusion is checked by the complete build/test verifier [`verify-linked-notes.mjs`](verify-linked-notes.mjs).
- **Manual acceptance:** Ordered List create/stale/order/structural-validation cases in [`PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists`](PROTOTYPE-CHECKLIST.md#13-local-first-publication-and-ordered-reference-lists).

<a id="uc-ln-reader"></a>

## 13. `UC-LN-READER` — Read A ChatGPT Response In A Local Reader

**Trigger/input:** the user presses `Reader` and pastes Markdown, or presses `Open in Reader` on one visible assistant response.

**Successful result:** one response is shown in a large safe Markdown Reader with explicit source accuracy, or extraction failure falls back to Paste mode without falsely claiming exact source recovery.

**Current source modes:**

```text
Paste Markdown
  → sourceKind=paste
  → sourceAccuracy=exact;

Open in Reader
  → rendered assistant DOM derivation
  → sourceKind=chat-dom
  → sourceAccuracy=derived.
```

The Reader supports the documented narrow safe `<details>/<summary>` form, uses the Linked Notes dark theme and performs no GitHub/local-persistence write merely by opening/rendering/copying/closing.

**Boundary:** manual Paste is the current reliable exact transfer. DOM derivation is prototype evidence, not the selected long-term automatic transport architecture.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#9-chat-response-reader`](APP-OVERVIEW.md#9-chat-response-reader), [`CHAT-RESPONSE-READER.md`](CHAT-RESPONSE-READER.md), [`ARCHITECTURE.md#rich-markdown-and-reader`](ARCHITECTURE.md#rich-markdown-and-reader).
- **Focused / repository contract:** Reader-target response conventions are in [`.linked-notes/CHAT-RESPONSE-FORMAT.md`](../../../../../.linked-notes/CHAT-RESPONSE-FORMAT.md); current DOM-handoff limitation is tracked in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).
- **Primary implementation:** [`src/chat-response-reader.js`](src/chat-response-reader.js), [`src/chat-response-reader-runtime.js`](src/chat-response-reader-runtime.js), shared safe projection in [`src/rich-markdown-renderer.js`](src/rich-markdown-renderer.js).
- **Automated evidence:** [`tests/chat-response-reader.test.mjs`](tests/chat-response-reader.test.mjs), [`tests/chat-response-reader-runtime.test.mjs`](tests/chat-response-reader-runtime.test.mjs), [`tests/rich-markdown-renderer.test.mjs`](tests/rich-markdown-renderer.test.mjs).
- **Manual acceptance:** [`CHAT-RESPONSE-READER-CHECKLIST.md#reader--details-acceptance`](CHAT-RESPONSE-READER-CHECKLIST.md#reader--details-acceptance).

<a id="uc-ln-app-state"></a>

## 14. `UC-LN-APP-STATE` — Export Diagnostic Application State

**Trigger/input:** the user opens `App state`, refreshes a snapshot, copies the ChatGPT-oriented projection or copies FULL JSON.

**Successful result:** one versioned diagnostic snapshot captures application-owned GM/IndexedDB/runtime state that is safe to expose, with GitHub credentials redacted and unsupported/non-serializable values represented diagnostically rather than crashing export.

**Boundary:** App State is diagnostic export, not normal Note/File content copy, not repository truth and not a restore/import mechanism in the current slice. Export itself performs no GitHub request or application-state mutation.

**Traceability:**

- **Product / behavior:** [`APP-OVERVIEW.md#10-app-state`](APP-OVERVIEW.md#10-app-state), [`FULL-APP-STATE-EXPORT.md`](FULL-APP-STATE-EXPORT.md), [`DATA-AND-STATE.md#9-full-app-state-export`](DATA-AND-STATE.md#9-full-app-state-export), [`ARCHITECTURE.md#full-app-state`](ARCHITECTURE.md#full-app-state).
- **Focused / repository contract:** none; this is a local diagnostic projection, not repository content or a restore contract. Current copy limitations are tracked in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).
- **Primary implementation:** [`src/full-app-state-export.js`](src/full-app-state-export.js), [`src/full-app-state-runtime.js`](src/full-app-state-runtime.js).
- **Automated evidence:** [`tests/full-app-state-export.test.mjs`](tests/full-app-state-export.test.mjs), [`tests/full-app-state-runtime.test.mjs`](tests/full-app-state-runtime.test.mjs).
- **Manual acceptance:** user-flow/security expectations in [`FULL-APP-STATE-EXPORT.md#user-flow`](FULL-APP-STATE-EXPORT.md#user-flow) and [`FULL-APP-STATE-EXPORT.md#security-boundary`](FULL-APP-STATE-EXPORT.md#security-boundary); browser acceptance remains pending where stated by the registry.

## 15. Supporting Capabilities That Do Not Get Separate UC IDs

| Capability | Parent Use Case(s) | Why it is supporting rather than separate |
|---|---|---|
| Repository templates | `UC-LN-FILES` | seeds the normal New File flow; selection alone has no independent durable result |
| `Locations` / folder shortcuts / direct path open | `UC-LN-FILES` | navigation to another working target |
| whole-file / heading-link copy | `UC-LN-FILES` | bounded copy/navigation aid |
| Files stale badges | `UC-LN-REFERENCE-OBJECTS`, `UC-LN-FILES` | diagnostic projection of checked reference state |
| common pending queue | `UC-LN-FILES`, `UC-LN-CATEGORIES`, `UC-LN-REFERENCE-OBJECTS`, `UC-LN-ORDERED-REFERENCE-LISTS`, `UC-LN-PUBLISH` | persistence/integration mechanism, not a user outcome by itself |
| safe rich Markdown renderer | Notes / Files / Reader | shared rendering infrastructure |
| panel center/drag/edge-peek and shared top-popup behavior | all panel surfaces | UI accessibility/ergonomics infrastructure |
| activity/progress/cancel for bounded reads | repository-reading UCs | operation lifecycle support |

## 16. Current Gaps And Future Semantics

Future priorities live in [`ROADMAP.md`](ROADMAP.md) and observed gaps in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

A roadmap item is not automatically a new Use Case. When an implemented capability creates a new independently useful trigger-to-result lifecycle, update this map and [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md) in the same reviewed change.

Current high-priority gaps include:

- supported explicit ChatGPT-to-Linked-Notes response handoff;
- coherent normal Note/File content and Chat-context copy, separate from diagnostic App State;
- real-GitHub/browser reliability acceptance across all write entrypoints.

## 17. Legacy Documentation Boundary

Earlier Linked Notes planning/workflow files remain under `planning/areas/documentation-workbench/` for history and compatibility. They are not the current entry/owner route after this migration.

Old `UC-DW-*` Linked Notes IDs are compatibility aliases only. Their mapping to current IDs is recorded in [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md).

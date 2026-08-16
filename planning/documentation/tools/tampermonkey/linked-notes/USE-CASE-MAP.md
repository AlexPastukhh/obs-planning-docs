# OBS Linked Notes Use-Case Map

Status: active current-prototype semantic map
Version: `0.8.0-prototype` / map v1.0.0
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

## 5. `UC-LN-WORKSPACE` — Configure And Select Repository Workspace

**Trigger/input:** the user opens workspace management, creates/edits/deletes a local workspace, stores the shared GitHub credential, or explicitly selects a workspace for the current stable chat.

**Successful result:** Linked Notes has an explicit reusable owner/repository/branch/Notes-folder/Categories-folder context and, when selected for a stable chat, a local chat-to-workspace binding.

**Key behavior:**

- workspace configuration is local application state;
- merely editing/selecting a workspace performs no repository write;
- a stable chat acquires a workspace binding only after explicit selection;
- switching current chat workspace does not silently retarget an already verified Note remote binding;
- credentials remain secret local state and are not repository content or exportable diagnostic plaintext.

**Evidence:** [`APP-OVERVIEW.md`](APP-OVERVIEW.md), [`DATA-AND-STATE.md`](DATA-AND-STATE.md), workspace modules/tests.

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

**Evidence:** [`APP-OVERVIEW.md`](APP-OVERVIEW.md), Note/image/reconcile source modules, [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md).

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

**Evidence:** [`APP-OVERVIEW.md`](APP-OVERVIEW.md), Files source/runtime/tests and [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md).

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

**Evidence:** [`APP-OVERVIEW.md`](APP-OVERVIEW.md), category codec/cache/runtime source and tests.

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

**Evidence:** [`APP-OVERVIEW.md`](APP-OVERVIEW.md), common local-change/Git Data source and tests, `GITHUB-001` in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

## 10. `UC-LN-NOTE-TRANSFER` — Copy A Linked Note And Repository Images

**Trigger/input:** the user starts transfer from a verified repository-backed Note, chooses a same-owner/repository/branch Markdown target and create/append mode, and reviews image classifications/destinations.

**Successful result:** visible Note Markdown is copied/appended to the target; supported repository images are copied or safely reused under target-owned assets; rewritten relative destinations and successful remote writes are verified, or an explicit partial/conflict result is shown.

**Boundaries:**

- copy, not move;
- source Note/assets remain intact;
- same owner/repository/branch only in the current slice;
- external images are not auto-downloaded;
- no promise of multi-file atomicity or automatic orphan cleanup.

**Evidence:** image-transfer source modules/tests, Note behavior in [`APP-OVERVIEW.md`](APP-OVERVIEW.md), [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md).

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

**Evidence:** [`REFERENCE-OBJECTS-PROTOTYPE.md`](REFERENCE-OBJECTS-PROTOTYPE.md), repository-facing `.linked-notes/REFERENCE-OBJECTS.md`, source/tests.

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

**Evidence:** repository-facing `.linked-notes/ORDERED-REFERENCE-LISTS.md`, Ordered List source/tests and [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md).

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

**Evidence:** [`CHAT-RESPONSE-READER.md`](CHAT-RESPONSE-READER.md), [`CHAT-RESPONSE-READER-CHECKLIST.md`](CHAT-RESPONSE-READER-CHECKLIST.md), `CHAT-001` in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

## 14. `UC-LN-APP-STATE` — Export Diagnostic Application State

**Trigger/input:** the user opens `App state`, refreshes a snapshot, copies the ChatGPT-oriented projection or copies FULL JSON.

**Successful result:** one versioned diagnostic snapshot captures application-owned GM/IndexedDB/runtime state that is safe to expose, with GitHub credentials redacted and unsupported/non-serializable values represented diagnostically rather than crashing export.

**Boundary:** App State is diagnostic export, not normal Note/File content copy, not repository truth and not a restore/import mechanism in the current slice. Export itself performs no GitHub request or application-state mutation.

**Evidence:** [`FULL-APP-STATE-EXPORT.md`](FULL-APP-STATE-EXPORT.md), Full App State source/tests, `COPY-001` in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

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

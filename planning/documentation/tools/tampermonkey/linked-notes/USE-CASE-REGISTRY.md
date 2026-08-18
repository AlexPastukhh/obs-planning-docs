# OBS Linked Notes Use-Case Registry

Status: active canonical current-prototype semantic registry
Version: v1.1.0 / Linked Notes `0.8.0-prototype`
Scope: independently useful current Linked Notes user outcomes. The registry describes the current application; it does not claim accepted production architecture.

Scenario catalog: [`scenarios/README.md`](scenarios/README.md)
Current product/surface evidence: [`APP-OVERVIEW.md`](APP-OVERVIEW.md)

## 1. Registry Rules

```text
- One current semantic Use Case has one canonical UC-LN-* ID.
- A UI surface may participate in several Use Cases.
- A Use Case may span several implementation modules/surfaces.
- Buttons, storage keys, APIs, renderers and popups do not receive UC IDs merely because they exist.
- Current prototype evidence/status does not imply production acceptance.
- Current Linked Notes semantic authority is this registry for Use-Case semantics plus linked Scenario owners for detailed behavior; planning/areas/documentation-workbench/ is not current Linked Notes authority.
- Detailed behavior and exact docs/source/test/manual-acceptance traceability live in the related Scenario owner; this registry remains the complete semantic Use-Case authority.
```

## 2. Current Registry

| Use-Case ID | Semantic name | Current status | Trigger/input | Successful user result | Canonical traceability |
|---|---|---|---|---|---|
| `UC-LN-WORKSPACE` | Configure And Select Repository Workspace | current prototype | manage/select workspace or credential | explicit reusable repository context/chat binding | [`SCN-LN-WORKSPACE`](scenarios/SCN-LN-WORKSPACE.md) |
| `UC-LN-NOTES` | Create, Link, Reconcile And Save Repository Notes | current prototype; browser/remote acceptance feature-dependent | open/create/edit/refresh/save/navigate Note | durable or explicitly recoverable/conflicted repository Note state | [`SCN-LN-NOTES`](scenarios/SCN-LN-NOTES.md) |
| `UC-LN-FILES` | Browse, Read And Prepare Repository File Work | current prototype; acceptance feature-dependent | open Files/location/search/create/edit/structure/copy/template | repository content read and/or complete intended file bytes staged locally | [`SCN-LN-FILES`](scenarios/SCN-LN-FILES.md) |
| `UC-LN-CATEGORIES` | Manage Repository Categories | current prototype; acceptance feature-dependent | refresh/create/edit/assign/unassign/inspect category | repository-backed category intent + derived explicit/implied views | [`SCN-LN-CATEGORIES`](scenarios/SCN-LN-CATEGORIES.md) |
| `UC-LN-PUBLISH` | Publish Pending Repository Changes | current prototype; real-GitHub acceptance required | `Update current file` or `Update all` with pending paths | verified one-path or atomic all-path remote publication, or preserved pending failure/conflict | [`SCN-LN-PUBLISH`](scenarios/SCN-LN-PUBLISH.md) |
| `UC-LN-NOTE-TRANSFER` | Copy A Linked Note And Repository Images | current prototype; remote acceptance feature-dependent | verified Note + same-repository Markdown target + transfer action | Note Markdown and supported repository images copied/reused with verified target writes | [`SCN-LN-NOTE-TRANSFER`](scenarios/SCN-LN-NOTE-TRANSFER.md) |
| `UC-LN-REFERENCE-OBJECTS` | Define, Materialize, Check And Synchronize Reference Objects | current prototype; acceptance feature-dependent | define/use/check/update/validate reference | stable definition/materialized uses + freshness evidence + local synchronization intent | [`SCN-LN-REFERENCE-OBJECTS`](scenarios/SCN-LN-REFERENCE-OBJECTS.md) |
| `UC-LN-ORDERED-REFERENCE-LISTS` | Create And Reorder Reference-Driven Markdown Units | current prototype; acceptance feature-dependent | create/order list from Reference Object uses | complete Markdown units wrapped/reordered locally by checked values | [`SCN-LN-ORDERED-REFERENCE-LISTS`](scenarios/SCN-LN-ORDERED-REFERENCE-LISTS.md) |
| `UC-LN-READER` | Read A ChatGPT Response In A Local Reader | current prototype; browser acceptance pending | Reader + Paste or Open in Reader | safe large rendered response with explicit exact/derived source accuracy | [`SCN-LN-READER`](scenarios/SCN-LN-READER.md) |
| `UC-LN-APP-STATE` | Export Diagnostic Application State | current prototype; browser acceptance pending | App state Refresh/Copy | redacted versioned diagnostic snapshot | [`SCN-LN-APP-STATE`](scenarios/SCN-LN-APP-STATE.md) |

Detailed behavior and exact primary documentation / implementation / automated-test / manual-acceptance traceability for every row live in its related Scenario owner. This registry owns trigger/result/boundary semantics.

## 3. Publication Relationships

| Producing Use Case | Local/remote output | Publication owner |
|---|---|---|
| `UC-LN-FILES` | pending ordinary repository file bytes | `UC-LN-PUBLISH` |
| `UC-LN-CATEGORIES` | pending category-definition bytes | `UC-LN-PUBLISH` |
| `UC-LN-REFERENCE-OBJECTS` | pending definition/use/index bytes | `UC-LN-PUBLISH` |
| `UC-LN-ORDERED-REFERENCE-LISTS` | pending reordered Markdown file bytes | `UC-LN-PUBLISH` |
| `UC-LN-NOTES` | Note + asset compound save/reconcile state | remains inside `UC-LN-NOTES` |
| `UC-LN-NOTE-TRANSFER` | target Markdown/assets compound transfer | remains inside `UC-LN-NOTE-TRANSFER` |
| `UC-LN-READER` | runtime-only Reader state | none |
| `UC-LN-APP-STATE` | clipboard diagnostic projection | none |

## 4. Compatibility Mapping From Former Documentation Workbench IDs

Former Linked Notes-related `UC-DW-*` IDs are retained only as compatibility references in the old Documentation Workbench area. They are not canonical current Linked Notes IDs.

| Former ID | Current mapping | Note |
|---|---|---|
| `UC-DW-LINKED-NOTES` | `UC-LN-NOTES` | direct semantic successor for current Note workflow |
| `UC-DW-REPOSITORY-FILES-CATEGORIES` | `UC-LN-FILES` + `UC-LN-CATEGORIES` + `UC-LN-PUBLISH` | old combined registry row is split to match current local-first application behavior |
| `UC-DW-IMAGE-AWARE-MARKDOWN-TRANSFER` | `UC-LN-NOTE-TRANSFER` | direct semantic successor |

Reference Objects, Ordered Reference Lists, Reader and App State had current prototype behavior without canonical `UC-DW-*` promotion; they now receive current `UC-LN-*` identities because they have independently useful trigger-to-result lifecycles in the actual application.

## 5. Current Capabilities Without Separate Use-Case IDs

These are explicitly accounted for but remain subordinate capabilities:

```text
Repository templates
Locations and folder shortcuts
repository path/file/heading-link copy
safe rich Markdown renderer
Reference Object stale tree/open-file diagnostics
common pending repository queue
bounded repository activity/progress/cancel support
panel Center / drag / edge-peek
shared top-popup layer and outside-click dismissal
```

Their parent relationships remain supporting behavior documented by the relevant Scenario/application owners.

## 6. Change Discipline

Update this registry when one of the following changes:

- an independently useful current Linked Notes lifecycle is added/removed;
- a Use Case's recognizable trigger or user result materially changes;
- one Use Case is split/merged with another;
- a previously supporting capability becomes independently traversable enough to justify semantic promotion.

Do **not** create a new UC ID for a visual control rename, implementation refactor, storage migration, API swap or another change that leaves user trigger/result semantics intact.

Use [`ROADMAP.md`](ROADMAP.md) for future directions and [`CHANGELOG.md`](CHANGELOG.md) for historical implementation change.

## Complete Semantic Entries

### `UC-LN-WORKSPACE` — Configure And Select Repository Workspace

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** configure/select the repository workspace needed by Linked Notes capabilities.

**Trigger / accepted input:** the user opens workspace management, creates/edits/deletes a local workspace, stores the shared GitHub credential, or explicitly selects a workspace for the current stable chat.

**Result / end state:** Linked Notes has an explicit reusable owner/repository/branch/Notes-folder/Categories-folder context and, when selected for a stable chat, a local chat-to-workspace binding.

**Boundaries:** Detailed behavior and implementation boundaries are owned by the related Scenario and focused owners.

**Scenario owner:** [`SCN-LN-WORKSPACE`](scenarios/SCN-LN-WORKSPACE.md)



**Owner route:** this registry entry → [`SCN-LN-WORKSPACE`](scenarios/SCN-LN-WORKSPACE.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-NOTES` — Create, Link, Reconcile And Save Repository Notes

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** create, edit, link, reconcile, recover and explicitly save durable repository-backed Notes.

**Trigger / accepted input:** the user opens Notes to create or inspect a Note, edits title/body, manages links/categories/images, explicitly refreshes repository Notes, saves, recovers or navigates a Note relation.

**Result / end state:** a durable repository-owned Markdown Note with stable identity/links can be found, reconciled with recoverable local working state and opened again; alternatively the UI exposes an explicit local-only/conflict/deleted/failed state without silently discarding local work.

**Boundaries:** Note `Save GitHub` remains the established compound Note workflow and is not replaced by the generic pending-file publisher.

**Scenario owner:** [`SCN-LN-NOTES`](scenarios/SCN-LN-NOTES.md)



**Owner route:** this registry entry → [`SCN-LN-NOTES`](scenarios/SCN-LN-NOTES.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-FILES` — Browse, Read And Prepare Repository File Work

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** browse/read repository files and prepare file-related work without conflating browsing with mutation.

**Trigger / accepted input:** the user explicitly opens Files, navigates a repository location/path, opens/searches a file, creates/edits bounded text, creates structure, copies files/folders or starts a New File from a repository template.

**Result / end state:** the user can inspect exact repository content/identity and/or produce complete intended repository file bytes staged locally with conflict-relevant base identity preserved.

**Boundaries:** local repository changes are not remote success. Standard publication is delegated to `UC-LN-PUBLISH`.

**Scenario owner:** [`SCN-LN-FILES`](scenarios/SCN-LN-FILES.md)



**Owner route:** this registry entry → [`SCN-LN-FILES`](scenarios/SCN-LN-FILES.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-CATEGORIES` — Manage Repository Categories

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** manage repository categories as an independently useful organization outcome.

**Trigger / accepted input:** the user explicitly opens Categories, refreshes definitions, creates/edits a category, assigns/unassigns a file or verified Note, or inspects explicit/implied membership.

**Result / end state:** category names/descriptions/implications/memberships are reconstructible from repository category-definition Markdown, with local intended changes staged and derived views/diagnostics visible.

**Boundaries:** category definitions are repository truth after publication; local cache/groups are not. Publication uses `UC-LN-PUBLISH`.

**Scenario owner:** [`SCN-LN-CATEGORIES`](scenarios/SCN-LN-CATEGORIES.md)



**Owner route:** this registry entry → [`SCN-LN-CATEGORIES`](scenarios/SCN-LN-CATEGORIES.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-PUBLISH` — Publish Pending Repository Changes

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** explicitly publish pending repository changes through the application publishing boundary.

**Trigger / accepted input:** one or more pending repository-file changes exist and the user explicitly invokes `Update current file` or `Update all`.

**Result / end state:** the selected publication scope is verified remotely and only verified pending changes are cleared; otherwise pending local state remains recoverable with an explicit conflict/error/unknown result.

**Boundaries:** this is the standard publisher for ordinary Files, Categories, Reference Objects, Ordered Lists, structure and copy. It does not absorb the compound Note save or image-aware Note transfer workflows.

**Scenario owner:** [`SCN-LN-PUBLISH`](scenarios/SCN-LN-PUBLISH.md)



**Owner route:** this registry entry → [`SCN-LN-PUBLISH`](scenarios/SCN-LN-PUBLISH.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-NOTE-TRANSFER` — Copy A Linked Note And Repository Images

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** copy one verified Note together with its repository image dependencies.

**Trigger / accepted input:** the user starts transfer from a verified repository-backed Note, chooses a same-owner/repository/branch Markdown target and create/append mode, and reviews image classifications/destinations.

**Result / end state:** visible Note Markdown is copied/appended to the target; supported repository images are copied or safely reused under target-owned assets; rewritten relative destinations and successful remote writes are verified, or an explicit partial/conflict result is shown.

**Boundaries:** Detailed behavior and implementation boundaries are owned by the related Scenario and focused owners.

**Scenario owner:** [`SCN-LN-NOTE-TRANSFER`](scenarios/SCN-LN-NOTE-TRANSFER.md)



**Owner route:** this registry entry → [`SCN-LN-NOTE-TRANSFER`](scenarios/SCN-LN-NOTE-TRANSFER.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-REFERENCE-OBJECTS` — Define, Materialize, Check And Synchronize Reference Objects

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** define/materialize/check/synchronize reusable Reference Objects consumed by repository documentation.

**Trigger / accepted input:** the user defines/updates a Reference Object, copies/inserts a materialized use marker, checks freshness, updates a use locally, validates indexed tags or explicitly deep-validates repository evidence.

**Result / end state:** stable `ro_*` identity connects one canonical definition marker to readable materialized uses; current/stale/unresolved evidence is visible and intended synchronization changes can be staged locally.

**Boundaries:** local definition/use/index changes publish through `UC-LN-PUBLISH`; automatic propagation remains roadmap research only.

**Scenario owner:** [`SCN-LN-REFERENCE-OBJECTS`](scenarios/SCN-LN-REFERENCE-OBJECTS.md)



**Owner route:** this registry entry → [`SCN-LN-REFERENCE-OBJECTS`](scenarios/SCN-LN-REFERENCE-OBJECTS.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-ORDERED-REFERENCE-LISTS` — Create And Reorder Reference-Driven Markdown Units

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** create and reorder reference-driven Markdown units while preserving reference semantics.

**Trigger / accepted input:** an open text/Markdown file contains Reference Object uses and the user invokes Ordered List creation or local ordering.

**Result / end state:** complete physical line/paragraph units are represented by inline `obs-order:list` / `obs-order:item` markers and can be reordered locally using freshly checked current Reference Object values while bytes outside item ranges remain unchanged.

**Boundaries:** ordering is local and has no feature-specific GitHub action; the resulting file publishes through `UC-LN-PUBLISH`.

**Scenario owner:** [`SCN-LN-ORDERED-REFERENCE-LISTS`](scenarios/SCN-LN-ORDERED-REFERENCE-LISTS.md)



**Owner route:** this registry entry → [`SCN-LN-ORDERED-REFERENCE-LISTS`](scenarios/SCN-LN-ORDERED-REFERENCE-LISTS.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-READER` — Read A ChatGPT Response In A Local Reader

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** read a ChatGPT response in the dedicated local Reader presentation.

**Trigger / accepted input:** the user presses `Reader` and pastes Markdown, or presses `Open in Reader` on one visible assistant response.

**Result / end state:** one response is shown in a large safe Markdown Reader with explicit source accuracy, or extraction failure falls back to Paste mode without falsely claiming exact source recovery.

**Boundaries:** manual Paste is the current reliable exact transfer. DOM derivation is prototype evidence, not the selected long-term automatic transport architecture.

**Scenario owner:** [`SCN-LN-READER`](scenarios/SCN-LN-READER.md)



**Owner route:** this registry entry → [`SCN-LN-READER`](scenarios/SCN-LN-READER.md) → focused implementation/test owners linked from that Scenario.

### `UC-LN-APP-STATE` — Export Diagnostic Application State

**Status:** active current
**Parent Direction:** `DIR-LINKED-NOTES`
**Purpose:** export a safe versioned diagnostic snapshot of application-owned state.

**Trigger / accepted input:** the user opens `App state`, refreshes a snapshot, copies the ChatGPT-oriented projection or copies FULL JSON.

**Result / end state:** one versioned diagnostic snapshot captures application-owned GM/IndexedDB/runtime state that is safe to expose, with GitHub credentials redacted and unsupported/non-serializable values represented diagnostically rather than crashing export.

**Boundaries:** App State is diagnostic export, not normal Note/File content copy, not repository truth and not a restore/import mechanism in the current slice. Export itself performs no GitHub request or application-state mutation.

**Scenario owner:** [`SCN-LN-APP-STATE`](scenarios/SCN-LN-APP-STATE.md)



**Owner route:** this registry entry → [`SCN-LN-APP-STATE`](scenarios/SCN-LN-APP-STATE.md) → focused implementation/test owners linked from that Scenario.
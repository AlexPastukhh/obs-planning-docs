# OBS Linked Notes Use-Case Registry

Status: active canonical current-prototype semantic registry
Version: v1.1.0 / Linked Notes `0.8.0-prototype`
Scope: independently useful current Linked Notes user outcomes. The registry describes the current application; it does not claim accepted production architecture.

Semantic map: [`USE-CASE-MAP.md`](USE-CASE-MAP.md)
Current product/surface evidence: [`APP-OVERVIEW.md`](APP-OVERVIEW.md)

## 1. Registry Rules

```text
- One current semantic Use Case has one canonical UC-LN-* ID.
- A UI surface may participate in several Use Cases.
- A Use Case may span several implementation modules/surfaces.
- Buttons, storage keys, APIs, renderers and popups do not receive UC IDs merely because they exist.
- Current prototype evidence/status does not imply production acceptance.
- Current Linked Notes semantic authority is this registry + USE-CASE-MAP.md, not planning/areas/documentation-workbench/.
- Exact documentation/source/test/manual-acceptance links live in each canonical Use Case's Traceability block in USE-CASE-MAP.md; this registry points to those stable anchors rather than duplicating implementation lists.
```

## 2. Current Registry

| Use-Case ID | Semantic name | Current status | Trigger/input | Successful user result | Canonical traceability |
|---|---|---|---|---|---|
| `UC-LN-WORKSPACE` | Configure And Select Repository Workspace | current prototype | manage/select workspace or credential | explicit reusable repository context/chat binding | [`USE-CASE-MAP.md#uc-ln-workspace`](USE-CASE-MAP.md#uc-ln-workspace) |
| `UC-LN-NOTES` | Create, Link, Reconcile And Save Repository Notes | current prototype; browser/remote acceptance feature-dependent | open/create/edit/refresh/save/navigate Note | durable or explicitly recoverable/conflicted repository Note state | [`USE-CASE-MAP.md#uc-ln-notes`](USE-CASE-MAP.md#uc-ln-notes) |
| `UC-LN-FILES` | Browse, Read And Prepare Repository File Work | current prototype; acceptance feature-dependent | open Files/location/search/create/edit/structure/copy/template | repository content read and/or complete intended file bytes staged locally | [`USE-CASE-MAP.md#uc-ln-files`](USE-CASE-MAP.md#uc-ln-files) |
| `UC-LN-CATEGORIES` | Manage Repository Categories | current prototype; acceptance feature-dependent | refresh/create/edit/assign/unassign/inspect category | repository-backed category intent + derived explicit/implied views | [`USE-CASE-MAP.md#uc-ln-categories`](USE-CASE-MAP.md#uc-ln-categories) |
| `UC-LN-PUBLISH` | Publish Pending Repository Changes | current prototype; real-GitHub acceptance required | `Update current file` or `Update all` with pending paths | verified one-path or atomic all-path remote publication, or preserved pending failure/conflict | [`USE-CASE-MAP.md#uc-ln-publish`](USE-CASE-MAP.md#uc-ln-publish) |
| `UC-LN-NOTE-TRANSFER` | Copy A Linked Note And Repository Images | current prototype; remote acceptance feature-dependent | verified Note + same-repository Markdown target + transfer action | Note Markdown and supported repository images copied/reused with verified target writes | [`USE-CASE-MAP.md#uc-ln-note-transfer`](USE-CASE-MAP.md#uc-ln-note-transfer) |
| `UC-LN-REFERENCE-OBJECTS` | Define, Materialize, Check And Synchronize Reference Objects | current prototype; acceptance feature-dependent | define/use/check/update/validate reference | stable definition/materialized uses + freshness evidence + local synchronization intent | [`USE-CASE-MAP.md#uc-ln-reference-objects`](USE-CASE-MAP.md#uc-ln-reference-objects) |
| `UC-LN-ORDERED-REFERENCE-LISTS` | Create And Reorder Reference-Driven Markdown Units | current prototype; acceptance feature-dependent | create/order list from Reference Object uses | complete Markdown units wrapped/reordered locally by checked values | [`USE-CASE-MAP.md#uc-ln-ordered-reference-lists`](USE-CASE-MAP.md#uc-ln-ordered-reference-lists) |
| `UC-LN-READER` | Read A ChatGPT Response In A Local Reader | current prototype; browser acceptance pending | Reader + Paste or Open in Reader | safe large rendered response with explicit exact/derived source accuracy | [`USE-CASE-MAP.md#uc-ln-reader`](USE-CASE-MAP.md#uc-ln-reader) |
| `UC-LN-APP-STATE` | Export Diagnostic Application State | current prototype; browser acceptance pending | App state Refresh/Copy | redacted versioned diagnostic snapshot | [`USE-CASE-MAP.md#uc-ln-app-state`](USE-CASE-MAP.md#uc-ln-app-state) |

The detailed trigger/result/boundary contract **and exact primary documentation / implementation / automated-test / manual-acceptance traceability** for every row is in [`USE-CASE-MAP.md`](USE-CASE-MAP.md).

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

Their parent relationships are recorded in [`USE-CASE-MAP.md`](USE-CASE-MAP.md).

## 6. Change Discipline

Update this registry when one of the following changes:

- an independently useful current Linked Notes lifecycle is added/removed;
- a Use Case's recognizable trigger or user result materially changes;
- one Use Case is split/merged with another;
- a previously supporting capability becomes independently traversable enough to justify semantic promotion.

Do **not** create a new UC ID for a visual control rename, implementation refactor, storage migration, API swap or another change that leaves user trigger/result semantics intact.

Use [`ROADMAP.md`](ROADMAP.md) for future directions and [`CHANGELOG.md`](CHANGELOG.md) for historical implementation change.

# Browse Repository Files And Manage Categories Workflow

Status: working project-local End-To-End Workflow / prototype evidence pending browser and real-GitHub acceptance
Doc version: v1.2.0-auto-open-files-root
Scope: independently traversable behavior for browsing/searching and richly reading repository files, opening exact GitHub targets, defining durable file/Note categories and navigating explicit or implied memberships.

## 1. Purpose

This workflow owns the complete user-visible behavior introduced by:

- `ITEM-97 / REPOSITORY-FILE-CATEGORIES`;
- `ITEM-118 / FILE-FOLDER-CATEGORY-VIEWS`;
- `ITEM-126 / REPOSITORY-FILE-VIEWER`;
- `ITEM-127 / CATEGORY-GROUPS-AND-IMPLICATIONS`.

`ITEM-128 / CATEGORY-DEFINITION-MARKDOWN` is the selected bounded prototype Implementation Idea. It does not make the current userscript or one Markdown syntax final architecture.

## 2. Trigger And Result

**Trigger:** the user selects a configured GitHub workspace and explicitly opens Files or Categories to browse, read, define, assign or inspect repository content.

**Successful result:** the user can read a supported repository file inside the application or open its exact GitHub URL; category definitions and file/Note memberships can be reconstructed from repository Markdown; creating or changing a category is verified by reading the remote result back.

**Other explicit results:** unsupported or oversized preview, missing target, inaccessible repository/branch, malformed category definition, broken file/category link, implication cycle, duplicate category identity, SHA conflict or uncertain remote result.

## 3. Preconditions

- a workspace identifies one repository and existing branch;
- a shared credential is available for private repository reads or explicit writes;
- repository paths remain inside the selected repository;
- category-definition location is configured or uses a documented default;
- local cache is treated as rebuildable derived state, not repository truth.

## 4. End-To-End Flow

```text
select workspace
  → explicitly open Files
  → automatically read repository root when the current workspace browser context has not been loaded
  → retain the current loaded directory when returning to Files
  → select a direct child
      directory → read that directory;
      supported text file → show read-only in-app preview;
      unsupported/oversized file → show metadata and explicit preview limitation
  → retain exact Open on GitHub target
  → explicitly open Categories
  → read category definitions from the configured location
  → decode stable identity, name, description, implication links and file links
  → rebuild derived explicit/implied membership views
  → optionally create or edit a category
  → optionally assign or unassign a repository file
  → read current remote category definition
  → write with SHA conflict protection
  → read back and verify exact intended definition
  → refresh affected category views
  → show success or explicit recoverable failure.
```

No repository read is triggered merely by opening the ChatGPT page, changing route or selecting a workspace. No repository write is triggered by browsing, previewing, refreshing categories or changing a local-only category group.

## 5. Behavior Stages

### Stage 1 — Select Repository Context

The active workspace supplies owner, repository, branch, Notes location and category-definition location. Existing workspaces without a category location gain the documented default without losing their Notes configuration.

### Stage 2 — Browse Or Search Repository Paths

The first explicit opening of Files automatically reads the repository root for the current workspace browser context. Returning to an already loaded Files surface preserves the current directory without another request. The user can then read one directory at a time or start a filename search from a selected root with a selected depth; Browse root remains an explicit return-to-root and refresh action. Results distinguish files from directories and preserve exact repository-relative paths. Search is breadth-first and bounded by folder, request and result limits; incomplete state is explicit and no background full-repository index is created.

### Stage 3 — Read A File Or Open GitHub

A supported bounded text file is shown literally in a read-only source view. Markdown can additionally be shown as a sanitized rich projection with repository-relative images loaded through authenticated GitHub reads. Binary, unsupported or oversized files retain path, size and exact GitHub link with an explicit reason that in-app preview is unavailable.

A repository link opened from a Note uses the Note-bound owner/repository/branch context rather than silently switching it to the currently selected workspace.

### Stage 4 — Read Category Definitions

The user explicitly refreshes the configured category-definition location. Valid definitions enter a workspace-scoped derived cache. Ordinary Markdown and malformed definitions do not silently become categories.

The definition supplies:

- stable category identity;
- display name;
- literal Markdown description;
- links to implied categories;
- links to explicitly assigned repository files;
- typed links to explicitly assigned Linked Notes.

### Stage 5 — Build Category Views

The application derives:

- explicit memberships from direct file links;
- implied memberships by traversing declared category implications;
- visible provenance for each result;
- broken-link, duplicate-identity and cycle diagnostics.

A UI group is separate from implication. Grouping organizes categories locally and does not classify files. An implication is repository-backed semantic meaning: a file in `ASP.NET Core` may also appear as a derived member of `Programming`.

### Stage 6 — Create Or Edit A Category

The user supplies a stable ID/name and description, optionally selecting implied categories. A new definition is created only when its target path is absent. An existing definition is updated using the latest known SHA. Existing unresolved implication links are preserved rather than silently repaired or deleted.

### Stage 7 — Assign Or Unassign Files And Notes

The application updates only the selected category definition. It creates or removes portable typed links to selected files and verified Linked Notes. Category creation may begin with any number of picker-selected targets. Target files and Note bodies are not modified by assignment.

### Stage 8 — Verify And Refresh

Every category write is read back and compared with the intended bytes before success is reported. The category cache and current view are rebuilt from the verified repository definitions.

## 6. Branches And Failure Behavior

| Situation | Required result |
|---|---|
| Files is explicitly opened for an unloaded workspace browser context | read the repository root once and show its direct children |
| Files is reopened after a directory loaded successfully | preserve the current directory and perform no automatic repeat read |
| Initial automatic root read fails | keep the error visible, leave the browser context unloaded and allow an explicit retry |
| Repository root or folder is readable | show sorted direct children and breadcrumbs |
| Folder is empty | show explicit empty result and treat the current browser context as loaded |
| File is supported bounded text | show literal read-only content and GitHub link |
| File is binary, unsupported or oversized | show metadata, explicit limitation and GitHub link |
| File disappears after listing | visible missing-target error; no fabricated preview |
| Repository/branch is inaccessible | explicit authentication/permission/not-found result |
| Category location does not exist | empty category set; first explicit category create may create the path with its file |
| Ordinary Markdown exists in category location | skip it and report the skipped result |
| Category definition is malformed | report malformed/skipped result; do not cache it as valid |
| Stable category ID appears more than once | explicit duplicate-identity diagnostic; do not merge silently |
| File link is broken | keep unresolved result visible |
| Implied-category link is broken | keep unresolved result visible and preserve the link on unrelated edits |
| Implication cycle exists | show cycle diagnostic and stop traversal |
| Remote category changed after refresh | SHA conflict; preserve local form/input and require refresh/review |
| Write response is uncertain | use existing remote verification/recovery behavior; do not report success without exact read-back |
| Local category group changes | update local derived state only; no GitHub write |

## 7. Data And Identity

| Data | Identity/owner | Invariant |
|---|---|---|
| Repository file | owner/repository/branch/path | exact path and GitHub URL remain visible |
| File preview | one fetched remote snapshot | read-only; not a canonical editor buffer |
| Category | stable category ID + definition path | one ID is not silently merged across definitions |
| Category description | category definition Markdown | literal user Markdown survives round trip |
| Explicit membership | link from category definition to file | the definition is the selected prototype owner |
| Implied membership | derived from explicit membership plus implication relation | display as derived, never as direct assignment |
| Category group | workspace/category local cache | UI-only; no file-membership effect |
| Category cache | workspace-scoped local state | fully rebuildable from GitHub definitions except local groups |
| Credential | private Tampermonkey storage | never written to files, caches or evidence |

## 8. Review Gates

Before reporting success:

- normalize and validate every repository path;
- distinguish read-only actions from write actions;
- for create, prove the target was absent;
- for update, use the exact known SHA;
- read the category definition back after write;
- verify exact expected content;
- rebuild views from verified definitions;
- keep broken/cycle/duplicate states visible.

## 9. Selected Prototype Shape

The bounded `0.6.5-prototype` retains the repository-file/category behavior below:

```text
one Tampermonkey Shadow DOM helper;
GitHub Contents API directory/file reads;
first explicit Files opening automatically reads root once per workspace browser context while tab returns preserve the loaded directory;
read-only bounded text source preview plus sanitized rich Markdown;
explicit bounded filename/depth search and shared file/Note target picker;
authenticated repository image loading through temporary object URLs;
one configurable Categories folder per workspace;
one ordinary Markdown definition per category with separate Files and Notes regions;
category definition as canonical explicit-membership owner;
target-scoped derived category cache and separately revisioned local-only groups with atomic per-category mutations;
workspace-context generation guards keyed by workspace id, owner, repository, branch and Categories folder;
category definition v3 managed boundaries with v1/v2 read compatibility and encoded portable link destinations with legacy v1 read compatibility;
path-aware diagnostics and bounded parent-directory validation of member-file targets without member-content reads;
cross-repository assignment guards for Note-bound file previews;
explicit remote reads and writes only;
SHA-aware writes with exact read-back verification.
```

Prototype bounds such as preview byte limits, direct-directory listing, 100-target member validation and one definition-file format are evidence-producing choices, not final product requirements. Repository-listing metadata survives the rendered UI selection, so known oversized entries are rejected before content fetch; missing, inaccessible and unchecked targets remain distinct.

## 10. Minimum Acceptance Run

```text
configure a test workspace and Categories folder;
open Files and confirm the repository root appears without pressing Browse root;
browse a nested folder, switch surfaces and confirm the folder remains without another automatic request;
browse repository root and nested folders;
open one Markdown/text file in-app;
open the same exact target on GitHub;
open a binary or oversized fixture and see an explicit no-preview result;
create Programming with a description;
create ASP.NET Core implying Programming;
assign one repository file to ASP.NET Core;
verify the ASP.NET Core definition contains a portable file link;
open ASP.NET Core and see explicit membership;
open Programming and see the same file as implied membership;
clear/rebuild the local category cache and restore definitions from GitHub;
change a definition externally and confirm the stale SHA is not overwritten;
introduce a broken link and implication cycle and see explicit diagnostics;
confirm browse/preview/category refresh performs no PUT;
confirm category create/edit/assign uses PUT plus exact read-back;
confirm no token appears in repository files or evidence.
```

Automated tests support but do not replace this browser and real-GitHub run.

## 11. Boundaries And Deferred Work

This workflow does not:

- make the userscript accepted production architecture;
- provide arbitrary repository-file editing;
- render every binary format;
- recursively index the whole repository in the background;
- write a category marker into each categorized file;
- select `ITEM-129 / FILE-LOCAL-CATEGORY-METADATA`;
- rename or delete categories and repair every incoming link;
- support cross-repository category membership;
- infer categories automatically from file content;
- turn ordinary category links into review-on-change obligations;
- require a generic Reference Object runtime.

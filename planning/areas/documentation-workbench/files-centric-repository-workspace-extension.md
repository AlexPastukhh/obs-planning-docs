# Files-Centric Repository Workspace Extension

Status: current implementation slice / correction-integrated / subordinate to `repository-file-browser-and-categories-workflow.md` / browser and real-GitHub acceptance pending
Scope: Files navigation shortcuts and direct repository-path opening, folder index auto-open, repository-native file templates, repository-root file/heading link copy, add-only structure creation and add-only file/folder copy for the Linked Notes prototype.

## 1. Ownership Boundary

The End-To-End owner remains:

```text
planning/areas/documentation-workbench/repository-file-browser-and-categories-workflow.md
```

This extension records the current user-requested implementation slice without creating a competing peer workflow. Repository Markdown and GitHub remain durable truth; local Files workspace preferences are convenience state only.

## 2. Current User-Requested Result

The Files surface should support the following connected behavior:

1. Opening a non-root repository folder automatically opens an exact `<folder-name>.md` direct child when that file exists. The directory listing remains the current folder context. Root has no automatic index file.
2. The real Files sidebar `New file` action exposes `Blank file` plus repository-native templates discovered from direct `*.template.md` children of `.linked-notes/templates/`. A valid template starts with an `obs-template` metadata block containing its display `name`. Selecting one rereads and validates that exact template, removes only the template metadata block, and copies the remaining UTF-8 body literally into the ordinary new-file editor. The selection step is read-only; Create stages the file locally and standard current/all publication changes GitHub later.
3. Link copy exposes both a whole-file repository-root Markdown link and heading links from the already-loaded Markdown snapshot. The heading chooser must remain inside the main Files content area instead of covering the sidebar; heading search and hierarchy are visible; copying does not perform a GitHub request.
4. The user can paste a repository-relative file/folder structure in the current folder, preview every target and create only missing empty files/folders. The first format is one path per line; a trailing `/` marks a folder. Existing content is never deleted, replaced or overwritten. Git-visible empty leaf folders use an empty `.gitkeep` only when the folder does not already exist.
5. Files and folders can be copied to a selected repository folder. Copy is recursive for folders, byte-preserving for files and add-only at the destination. The complete destination file set is preflighted before local staging. For folder copy, the destination root folder itself must be absent: an existing destination root is a conflict rather than a merge target. Any existing remote/pending destination file/root or unusable destination parent blocks the operation. Source SHA is rechecked before bytes enter the local queue. `Update all` can later publish all copied files in one commit.
6. The top navigation is Files-centric: `Files` jumps to repository root, `Notes` jumps to the configured Notes folder in Files mode, and `Locations` exposes Root, Notes, the existing Linked Notes editor, direct opening of a pasted repository-relative path and user-created folder shortcuts. A pasted existing directory is browsed directly; a pasted existing file opens in its parent folder; an exact pending-local file/folder is eligible before remote metadata discovery. Empty input or `/` means repository root. Absolute/URL/traversal/fragment/query paths are rejected before repository reads, and a missing path leaves the current location unchanged. A user can save the currently open non-root folder as a local shortcut. Folder shortcuts remain local exact-workspace preferences. Repository templates are repository-owned and are reloaded explicitly per exact workspace; a workspace change clears the prior template index so stale templates are never rendered as current.
7. Top-navigation dropdowns that must escape the clipped main panel use one shared Shadow-root popup layer. `Locations`, repository-template menus and adjacent feature menus such as `Reference objects` may portal their panels into this layer, but the layer must paint at least at the main Linked Notes panel stacking level, inherit the Linked Notes foreground/font/dark color scheme and leave pointer events disabled outside the actual popup panels. Explicit popup state survives ordinary destructive rerenders in the same workspace/surface context. Because these panels are fixed-position portals, beginning a Linked Notes panel move, returning it to Center or repositioning it for a viewport change closes the active top popup first so the popup cannot remain detached from its anchor.

## 3. Safety And Mutation Rules

```text
browse / location navigation / folder-index lookup
  → read only;

Copy link menu
  → local loaded snapshot + clipboard only;
  → no GitHub GET or PUT caused by opening/copying;

structure preview / copy preview / copy destination-folder browsing
  → explicit bounded reads only;
  → use the shared single-operation read lifecycle and expose cancellation plus request progress while the read phase is active;
  → keep the open structure/copy modal attached across ordinary application state rerenders;
  → a workspace-context change drops a modal created for the previous repository context;
  → no writes;

structure apply
  → re-preview current destination state;
  → stage absent empty files and required .gitkeep placeholders locally;
  → never update/delete/rename/move;

file/folder copy apply
  → re-preview source/destination;
  → verify all destination files are absent before first write;
  → recheck source SHA immediately before reading bytes;
  → binary-safe local staging only;
  → never overwrite or delete destination/source;

repository template discovery / selection
  → explicit bounded read of `.linked-notes/templates/` direct children;
  → only valid `*.template.md` files with `obs-template` metadata become selectable;
  → selection rereads the chosen template and copies its body into the ordinary new-file editor;
  → no GitHub PUT until the user performs the normal file Create action;
  → legacy local document-preset records may remain in storage for compatibility but are not the primary New file UI.
```

Standard publication remains non-cancellable once a GitHub write/ref-update begins because aborting can create uncertain remote state. Local staging can complete without a GitHub write.

## 4. Bounded Prototype Limits

The implementation slice uses explicit prototype bounds rather than an unbounded repository crawler:

- structure input: at most 100 normalized nodes including implicit folders;
- directory listing: existing 200-direct-entry bound;
- recursive copy: at most 100 files;
- recursive copy traversal: at most 60 directories;
- recursive copy aggregate bytes: 10 MiB;
- template discovery: direct children of `.linked-notes/templates/`, at most 100 candidate template files;
- template file: existing bounded UTF-8 repository-editor limit;
- no background recursive index.

Limits are implementation evidence, not final product requirements.

## 5. Structure Input Format

Example:

```text
entity/
entity/entity.md
entity/systems/
entity/systems/combat.md
entity/empty/
```

Rules:

- one repository-relative path per line;
- trailing `/` means folder;
- other paths mean empty files;
- blank lines are ignored;
- lines whose trimmed form starts with `#` are comments;
- absolute paths, URLs, `.` / `..`, query/fragment syntax and control characters are rejected;
- implicit parent folders are derived;
- a path cannot be both a file and a folder;
- content cannot be placed below a path declared as a file.

The default operation is add-only. There is no "replace repository tree with pasted structure" mode in this slice.

## 6. Repository File Template Model

Repository contract:

```text
.linked-notes/
  README.md
  templates/
    README.md
    <name>.template.md
```

A template exists when a direct child of `.linked-notes/templates/` ends in `.template.md` and starts with a valid metadata block:

```text
<!-- obs-template
name: Character
-->
<literal template body>
```

The first format has one required metadata field: `name`. Duplicate names are rejected as ambiguous. Unknown metadata fields are rejected rather than silently reinterpreted. The metadata block itself is not copied into a new document; after removing it and its immediately following line break, every remaining character is copied literally. YAML frontmatter, Markdown, Reference Object markers and line endings in the body are preserved.

`New file ▾` discovers repository templates from the active workspace instead of requiring a locally configured path/name/category preset. `Refresh templates` performs the explicit bounded reload. `Open templates folder` navigates to the repository folder. Missing template infrastructure in another workspace is an explicit empty/not-initialized state and never triggers an automatic GitHub write.

The old local `documentPresets` preference data is retained for compatibility and is not deleted by this slice, but the repository-discovered template list is the primary New file UX. There is no variable interpolation, automatic category application or AI transformation in template v1.

## 7. Link Copy Model

Whole file:

```text
[combat.md](/game-design/combat.md)
```

Heading:

```text
[Exposure](/game-design/combat.md#exposure)
```

The chooser uses the existing loaded-preview heading extraction and deterministic duplicate-anchor behavior. The whole-file action uses the repository path and filename. Both actions are clipboard-only.

The popup is positioned against the actual `.main` content rectangle and clamped within it. It uses a bounded internal scroll region, heading-level labels/indentation, heading search, closes after successful copy and closes on Escape or outside click.

## 8. Required Acceptance

Automated:

- exact folder-name index candidate and no root index;
- portable encoded whole-file Markdown link;
- exact workspace-scoped shortcut normalization, direct repository-location path normalization/resolution and repository-template context isolation;
- structure parser rejects traversal/type conflicts and derives empty leaf folders;
- copy subtree destination mapping;
- popup clamping stays inside the main container;
- the shared top-popup layer is attached at the Shadow root, has a stacking level no lower than the base Linked Notes panel, carries the Linked Notes foreground/font/dark color scheme, preserves explicit open state across destructive rerenders, leaves only visible popup panels pointer-interactive and closes before the base panel is moved/recentered/repositioned;
- runtime folder browse auto-opens the exact index file;
- the actual Files sidebar `New file` action becomes the repository-template menu;
- template discovery ignores ordinary/nested files, reports malformed/duplicate templates and performs no write;
- template selection strips only `obs-template` metadata, preserves literal body text/line endings/Reference Object markers and performs no write before ordinary Create;
- structure conflict prevents writes and successful structure create writes only absent empty targets;
- copy collision prevents writes, including an already-existing folder destination root, and successful copy preserves source bytes exactly;
- structure/copy previews participate in the shared cancellable single-read lifecycle, publish Files request progress and cancellation performs no write;
- an open structure/copy modal survives destructive base `render()` calls caused by read-operation state updates, while a repository-workspace context change drops the stale modal;
- Files cancellation reports Files-specific status rather than a Notes-refresh message;
- workspace changes reload exact workspace-scoped shortcuts, clear the repository-template index and never render the prior workspace's templates as current;
- runtime patch remains idempotent and re-installs on newly loaded constructors.

Browser / real GitHub:

- enter a folder that contains `<folder>.md` and confirm listing + automatic file preview;
- enter a folder without the index and confirm no error/fabricated preview;
- create a folder shortcut and reopen it from Locations after panel rerender/reopen;
- paste an existing directory and file path into Locations and verify exact navigation; verify Enter equals Open, `/` opens root, exact pending-local paths do not require metadata discovery, and traversal/absolute/URL/missing paths do not alter the current location;
- open `Locations` and `Reference objects`, verify each portaled panel is visibly above the Linked Notes panel and an internal button receives the click; repeat after a harmless rerender, verify Escape/outside click closes the shared popup, then open it once more and begin dragging/recentering the Linked Notes panel to verify the popup closes instead of remaining at the old fixed coordinates;
- use Notes and Files top navigation to jump directly to Notes folder/root;
- switch between two workspaces that have different shortcuts/templates and verify each switch immediately shows only the active workspace values;
- add valid and malformed direct template files under `.linked-notes/templates/`, Refresh templates and verify only valid unique names are selectable;
- create a file from a template containing YAML frontmatter, headings/table and an `obs-ref:use` marker and verify only `obs-template` metadata is removed;
- confirm choosing a template produces no PUT and only the later ordinary Create writes the target file;
- open `Copy link` at a narrow viewport like the reported screenshot and verify the menu never covers the left repository sidebar;
- copy a whole-file link and multiple heading links while recording zero additional GitHub requests;
- preview/apply a mixed empty-file/empty-folder structure and verify no existing file changes;
- pre-create one structure target and verify apply is blocked before write;
- copy one text file and one binary file and verify bytes/read-back;
- recursively copy a bounded folder and verify complete destination preflight;
- pre-create one copy destination file and verify zero writes;
- pre-create the destination root folder for a folder copy and verify the operation is blocked as a conflict instead of merging;
- start a deliberately slow structure/copy preview, use the shared Cancel read control, and verify the preview stops with zero writes while the panel may still be hidden/reopened;
- change a source SHA after copy preview and verify execution stops instead of copying stale bytes.

## 9. Deferred / Not In This Slice

- destructive structure synchronization;
- overwrite-on-copy;
- delete, rename or move;
- automatic removal of `.gitkeep`;
- recursive template discovery or a separate template registry;
- template variables/interpolation;
- automatic category inference/application from template content;
- unbounded/background recursive copy/indexing;
- cross-repository copy;
- automatic repair of links after later path moves.

## 10. Adjacent Reference Object Prototype Slice

A later narrow implementation slice is owned by:

[`reference-object-definition-and-materialized-use-workflow.md`](reference-object-definition-and-materialized-use-workflow.md)

It adds repository-native definition/use markers, one Definitions File, local-first materialized-use checking/updating and a searchable Reference Objects menu inside the Files workspace. This is an adjacent workflow using Files as its host surface; it does not change this file into the semantic owner of Reference Objects and does not revive the deferred generic managed-object architecture.

The Files integration boundary is:

```text
ordinary repository file open/edit/navigation
  → remains owned by this Files workflow;

Reference Object exact-definition creation,
clipboard use materialization,
usage checking/updating,
Definitions File indexing and tag validation
  → owned by the Reference Object workflow;

local Reference Object drafts
  → application-local complete-file overlays by exact workspace;

GitHub Reference Object writes
  → explicit separately triggered verified writes;
  → never a side effect of opening the object list, copying a use,
    checking staleness or validating tags.
```

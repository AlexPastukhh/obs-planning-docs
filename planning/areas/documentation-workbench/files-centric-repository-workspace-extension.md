# Files-Centric Repository Workspace Extension

Status: current implementation slice / correction-integrated / subordinate to `repository-file-browser-and-categories-workflow.md` / browser and real-GitHub acceptance pending
Scope: Files navigation shortcuts, folder index auto-open, document presets/templates, repository-root file/heading link copy, add-only structure creation and add-only file/folder copy for the Linked Notes prototype.

## 1. Ownership Boundary

The End-To-End owner remains:

```text
planning/areas/documentation-workbench/repository-file-browser-and-categories-workflow.md
```

This extension records the current user-requested implementation slice without creating a competing peer workflow. Repository Markdown and GitHub remain durable truth; local Files workspace preferences are convenience state only.

## 2. Current User-Requested Result

The Files surface should support the following connected behavior:

1. Opening a non-root repository folder automatically opens an exact `<folder-name>.md` direct child when that file exists. The directory listing remains the current folder context. Root has no automatic index file.
2. The real Files sidebar `New file` action is replaced by a preset selector. A document preset owns a display name, one category ID and one repository template-file path. Starting from a preset reads the template and copies its complete UTF-8 contents literally into the new-file editor. After verified file creation, the configured category is applied through the existing repository-backed category workflow.
3. Link copy exposes both a whole-file repository-root Markdown link and heading links from the already-loaded Markdown snapshot. The heading chooser must remain inside the main Files content area instead of covering the sidebar; heading search and hierarchy are visible; copying does not perform a GitHub request.
4. The user can paste a repository-relative file/folder structure in the current folder, preview every target and create only missing empty files/folders. The first format is one path per line; a trailing `/` marks a folder. Existing content is never deleted, replaced or overwritten. Git-visible empty leaf folders use an empty `.gitkeep` only when the folder does not already exist.
5. Files and folders can be copied to a selected repository folder. Copy is recursive for folders, byte-preserving for files and add-only at the destination. The complete destination file set is preflighted before the first write. For folder copy, the destination root folder itself must be absent: an existing destination root is a conflict rather than a merge target. Any existing destination file/root or unusable destination parent blocks the operation before writes. Source SHA is rechecked before copying bytes. Multi-file copy is not globally atomic: verified completed copies remain on partial failure and are reported explicitly.
6. The top navigation is Files-centric: `Files` jumps to repository root, `Notes` jumps to the configured Notes folder in Files mode, and `Locations` exposes Root, Notes, the existing Linked Notes editor and user-created folder shortcuts. A user can save the currently open non-root folder as a local shortcut. Shortcuts and document presets are scoped to the exact workspace ID + owner + repository + branch, are reloaded when the active workspace changes, and stale preferences from the previous workspace are never rendered as current.

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
  → create absent empty files and required .gitkeep placeholders only;
  → never update/delete/rename/move;

file/folder copy apply
  → re-preview source/destination;
  → verify all destination files are absent before first write;
  → recheck source SHA immediately before reading bytes;
  → verified binary-safe create writes only;
  → never overwrite or delete destination/source;

document preset create
  → read template first;
  → ordinary verified file create;
  → category update is a separate verified result;
  → if category update fails, keep the successfully created file and expose partial result.
```

Repository writes remain non-cancellable once write execution begins because aborting a write can create uncertain remote state. The panel may still be closed while the operation continues under the existing responsiveness runtime.

## 4. Bounded Prototype Limits

The implementation slice uses explicit prototype bounds rather than an unbounded repository crawler:

- structure input: at most 100 normalized nodes including implicit folders;
- directory listing: existing 200-direct-entry bound;
- recursive copy: at most 100 files;
- recursive copy traversal: at most 60 directories;
- recursive copy aggregate bytes: 10 MiB;
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

## 6. Document Preset Model

Local preference record:

```text
DocumentPreset:
  id
  display name
  categoryId
  templatePath
```

The template is an ordinary repository file and remains the only owner of its template body. Creating a file from the preset copies the complete template body as fetched; the helper performs no variable interpolation or semantic rewriting.

The category remains repository-backed through the existing category-definition model. Preset configuration itself is local convenience state and does not become repository truth in this slice.

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
- exact workspace-scoped shortcut/preset normalization;
- structure parser rejects traversal/type conflicts and derives empty leaf folders;
- copy subtree destination mapping;
- popup clamping stays inside the main container;
- runtime folder browse auto-opens the exact index file;
- the actual Files sidebar `New file` action becomes the preset menu rather than leaving presets unreachable in another toolbar;
- document preset copies literal template content and requests category assignment after verified create;
- structure conflict prevents writes and successful structure create writes only absent empty targets;
- copy collision prevents writes, including an already-existing folder destination root, and successful copy preserves source bytes exactly;
- structure/copy previews participate in the shared cancellable single-read lifecycle, publish Files request progress and cancellation performs no write;
- an open structure/copy modal survives destructive base `render()` calls caused by read-operation state updates, while a repository-workspace context change drops the stale modal;
- Files cancellation reports Files-specific status rather than a Notes-refresh message;
- workspace changes reload exact workspace-scoped shortcuts/presets and never render the prior workspace's values as current;
- runtime patch remains idempotent and re-installs on newly loaded constructors.

Browser / real GitHub:

- enter a folder that contains `<folder>.md` and confirm listing + automatic file preview;
- enter a folder without the index and confirm no error/fabricated preview;
- create a folder shortcut and reopen it from Locations after panel rerender/reopen;
- use Notes and Files top navigation to jump directly to Notes folder/root;
- switch between two workspaces that have different shortcuts/presets and verify each switch immediately shows only the active workspace values;
- create a document preset from a Markdown template containing headings/table and verify literal content plus category membership;
- intentionally break category application and verify the file remains while partial result is visible;
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
- repository-backed document-preset definitions;
- template variables/interpolation;
- automatic category inference from template content;
- unbounded/background recursive copy/indexing;
- cross-repository copy;
- automatic repair of links after later path moves.

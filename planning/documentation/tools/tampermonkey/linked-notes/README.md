# OBS Linked Notes Prototype

Status: preliminary implementation prototype / browser and remote smoke testing pending
Version: `0.6.5-prototype`
Scope: one local-first Tampermonkey prototype for repository-owned Markdown Notes, bounded repository browsing/search, rich Markdown, managed links/backlinks and GitHub-backed file/Note categories across reusable GitHub workspaces.


## 0.1 `0.6.5-prototype` Addition

```text
an explicit first opening of Files automatically reads the active workspace repository root;
returning to Files keeps the current loaded directory without another request;
Browse root remains available as an explicit return-to-root and refresh action;
a failed initial read remains visible and retryable.
```

## 0. `0.6.4-prototype` Additions

```text
all `0.5.1` file/Note category, picker, relation, rich-Markdown and contextual-error behavior;
tree/search target selection for transfer create/append instead of a free-text path;
read-only transfer preflight showing copy/reuse/suffix/external/blocked results before any write;
prepared-plan invalidation when the source, target SHA, asset collision state, mode or target changes;
contextual partial-result reporting for asset, Note and target-Markdown failures;
full-plan target-path reservation so same-name source assets receive final copy/reuse/suffix destinations before the first write;
source-image SHA and byte revalidation immediately before target writes;
blockquoted fences, multiline code spans, indented code and HTML comments excluded from transferable-image discovery;
raw HTML code-like containers (`pre`, `code`, `textarea`, `script`, `style`) excluded from transferable-image discovery, including unclosed containers;
rendered contextual retry actions for failed image, Note-Markdown and target-Markdown stages without repeating verified writes;
exact read-only recovery after `verification_unknown`, accepting already-written Note/target Markdown only when bytes match and otherwise retrying only from an unchanged base;
reference-style/collapsed/shortcut images, balanced or escaped parentheses, angle destinations and titles;
strict UTF-8 decoding for append targets before any asset write;
clipboard paste and file-picker image insertion into Note drafts;
recoverable pending image bytes stored separately from Note records;
PNG, JPEG, WebP and GIF validation up to the bounded 10 MiB prototype limit;
binary-safe GitHub Contents API asset writes with exact byte/hash read-back verification;
portable Note-owned `<note-name>.assets/` destinations and pending-reference rewrite on verified save;
image-aware copy of visible Note title/body into a same-repository Markdown target;
create or append-as-new-section transfer modes;
target-owned `<target-name>.assets/` copy/reuse with deterministic collision suffixes;
Markdown image and allowlisted `<img>` source rewriting;
source Note/assets preserved, external images not automatically downloaded, no destructive rollback;
file and Linked Note categories;
category selection during Note create/edit;
multi-select file/Note targets during category creation;
category definition schema v3 with separate Files and Notes regions;
shared tree/search target picker with bounded filename/depth traversal;
managed picker-created Note links stored in existing Note metadata;
derived outgoing relations and backlinks rebuilt from Note records;
Note Edit / Preview / Split and Markdown-file Rendered / Source modes;
sanitized rich Markdown with Markdown images and allowlisted <img>;
private repository image bytes fetched with the existing GitHub token and exposed only through temporary object URLs;
prominent surface-scoped errors and category-form/target-basket preservation;
segment-by-segment decoding of percent-encoded rendered repository targets with encoded-traversal rejection;
independent Note/File image object-URL lifecycles with full disposal cleanup;
unavailable selected Note categories preserved through failed or not-yet-completed category refresh;
222 automated tests.
```

Durable ownership remains separated:

```text
category definition Markdown → explicit file/Note category membership;
linked Note metadata          → picker-created outgoing link identity;
Note body                     → visible ordinary Markdown navigation;
rendered HTML/backlinks/cache → derived state only;
pending image bytes/preview    → recoverable local working state;
repository image assets        → ordinary verified GitHub files.
```

## 1. Owners And Boundaries

Behavior owners:

- [`linked-notes-end-to-end-workflow.md`](../../../../areas/documentation-workbench/linked-notes-end-to-end-workflow.md);
- [`image-aware-markdown-transfer-workflow.md`](../../../../areas/documentation-workbench/image-aware-markdown-transfer-workflow.md);
- the Linked Notes and repository-file/category Key Scenarios in [`planning-draft.md`](../../../../areas/documentation-workbench/planning-draft.md);
- [`repository-file-browser-and-categories-workflow.md`](../../../../areas/documentation-workbench/repository-file-browser-and-categories-workflow.md);
- `ITEM-97`, `ITEM-118`, `ITEM-124`, `ITEM-126`, `ITEM-127`, `ITEM-134` and selected prototype ideas `ITEM-128`, `ITEM-132`, `ITEM-133` in [`planning-item-register.md`](../../../../areas/documentation-workbench/planning-item-register.md).

This directory is implementation/prototype material. It does not redefine behavior owners or silently accept a production architecture.

Current prototype boundary:

```text
ordinary repository Markdown remains durable truth;
local IndexedDB state remains recoverable working state;
reusable workspaces store repository/branch/folder configuration locally;
one shared GitHub token is stored privately for all workspaces;
workspace mutations use a cooperative cross-tab lock plus a revision commit marker;
each stable ChatGPT conversation remembers only a workspace explicitly selected while that stable conversation is active;
visiting an unmapped chat uses the global default without creating a binding;
a new chat uses the global default until the user explicitly selects another workspace for that temporary page session;
workspace/chat context is never written into Note Markdown;
all local Notes remain visible regardless of the selected workspace;
workspace selection controls defaults for new/unbound Notes, links and explicit Copy;
a verified Note remains bound to its exact owner/repository/branch/path/SHA/hash;
switching a chat workspace never silently moves a verified Note;
remote save, copy and recovery writes are explicit;
Refresh GitHub is a separate explicit read-only action and never performs a PUT;
Refresh GitHub reads only direct Markdown children of the active Notes folder, up to 100 directory entries and 2 MiB of fetched content;
only valid obs-linked-note:v1 files enter the local Note cache; ordinary Markdown is counted and skipped;
remote-only Notes are imported by stable Note id; remote-only changes fast-forward only when local content still equals the verified base;
different local and remote changes become an explicit conflict, and missing bound files become remote_deleted without deleting local content;
only one remote operation may run at a time;
remote success requires exact read-back verification;
repository paths are validated independently at settings, app and GitHub-client boundaries;
ordinary Markdown-relative paths and explicit anchors are stable targets;
imported and opened URL links are restricted to portable HTTP(S);
unknown codec metadata survives normalization, local storage, remote load and re-encoding;
local Save never clears conflict, remote-deleted or verification-unknown recovery state;
unsaved workspace-form values survive close, Escape, rerenders and route changes;
the Note list and editor are independently scrollable inside a viewport-bounded panel;
wide viewports reserve bottom-right space for neighbouring OBS widgets and the panel remains above competing overlays;
workspace creation is reachable from a persistent top-bar Manage workspaces action;
no generic Reference Object store;
repository file categories use dedicated ordinary Markdown definition files;
category membership is stored as visible repository-relative links in category definitions;
category implication is repository-backed while UX grouping remains local-only;
category state is cleared and reloaded atomically whenever the active workspace or its repository/branch/Categories-folder target changes;
category writes require the current workspace id and full owner/repository/branch/Categories-folder identity and remain blocked after an in-place target edit until explicit refresh;
category definitions/cache and local groups use separate target-scoped lock/revision records; per-category group mutations reread the latest map under the lock;
category definition v3 uses separate Files/Notes managed regions while legacy v1/v2 remain readable;
category refresh keeps path-aware diagnostics and validates member-file links through bounded parent-directory listings without reading member-file content;
repository-entry metadata survives the UI click path, so known oversized files are classified before content read;
category assignment is blocked when a Note-bound preview belongs to another owner/repository/branch;
category link destinations use deterministic percent-encoded angle-bracket Markdown targets and round-trip spaces, parentheses, brackets, Unicode and percent signs;
pending clipboard/file images are local-only until an explicit verified Note save;
pending image bytes live in a separate IndexedDB database and are never embedded in Note metadata;
Note image saves create or reuse ordinary repository assets under a Note-owned sibling .assets folder;
binary writes preserve exact bytes and require read-back verification;
a verified asset is reused after a later Note conflict instead of being duplicated or destructively rolled back;
image-aware transfer copies visible Note title/body without quiet Note metadata;
image-aware transfer is restricted to the same owner/repository/branch in the bounded prototype;
target images are copied/reused under a target-owned sibling .assets folder and destinations are rewritten;
source Note/assets are never moved/deleted automatically and external images are not auto-downloaded;
no file-local category marker in this prototype;
no category-backed Notes projection;
no automatic link repair;
no automatic background repository writes;
no local git, commit or push.
```

Canonical Planning Items describe the required behavior; this directory remains prototype evidence and does not make the userscript production architecture.

## 2. Workspace Model

The runtime deliberately separates three identities:

```text
Workspace:
  reusable local repository configuration;
  name + owner/repository + branch + Notes folder + Categories folder.

Chat Workspace Binding:
  local mapping from one stable ChatGPT conversation ID
  to its last selected Workspace.

Note Remote Binding:
  verified owner/repository/branch/path + SHA + content hash
  stored on one Note after successful read-back verification.
```

A workspace may be reused by many chats. Different chats may select different workspaces. One shared token is used by all workspaces because the intended local setup normally grants one least-privilege token access to the selected test repositories.

Workspace repository input accepts either:

```text
AlexPastukhh/gdoc
https://github.com/AlexPastukhh/gdoc
```

The helper extracts `owner=AlexPastukhh` and `repo=gdoc` and displays the effective target:

```text
AlexPastukhh/gdoc@main:notes=prototype-fixtures/linked-notes; categories=categories
```

The workspace selector does not filter the local Notes list. It controls the repository context for:

- a new or unbound Note;
- a new repository link;
- an explicit `Copy to chat workspace` operation.

It does not alter an existing verified Note binding. When the selected chat workspace differs from a Note binding, normal `Save GitHub` is blocked and the separate explicit Copy action is required.

## 3. Local Storage And Migration

Private Tampermonkey storage:

```text
obsLinkedNotesPrototype:v2:workspaceState
obsLinkedNotesPrototype:v2:githubToken
obsLinkedNotesPrototype:v2:migration
obsLinkedNotesPrototype:v2:stateLock
obsLinkedNotesPrototype:v2:categoryCache:<workspace-target-context>
obsLinkedNotesPrototype:v2:categoryGroups:<workspace-target-context>
obsLinkedNotesPrototype:v2:categoryLock:<workspace-target-context>
```

The canonical `workspaceState` value contains the complete workspace list, explicit chat map, default workspace and revision/writer identity in one atomic GM value.

Legacy read-only migration inputs:

```text
obsLinkedNotesPrototype:v2:workspaces
obsLinkedNotesPrototype:v2:chatWorkspaceMap
obsLinkedNotesPrototype:v2:defaultWorkspace
obsLinkedNotesPrototype:v1:settings
obsLinkedNotesPrototype:v1:githubToken
obsLinkedNotesPrototype:v1:categoryCache
```

On the first v2 load, valid v1 settings become one deterministic `workspace-imported-v1` record named `Imported workspace`; the old token is copied to the shared v2 token slot when that slot is empty. Migration runs under the same cooperative cross-tab lock, so two starting tabs cannot create duplicate imported workspaces. The old keys are not deleted automatically.

Every workspace/default/chat-map mutation reacquires the lock, rereads the one canonical state value, writes one new revisioned state object and verifies both lock ownership and the committed revision. Opening Notes rereads the state, so another tab's completed changes become visible without reloading the ChatGPT page.

Linked Notes IndexedDB:

```text
database: obsLinkedNotesPrototype
store: notes

database: obsLinkedNotesPrototypeAssets
store: assets
  local pending image bytes and verified/retry state only
```

Tokens and chat-workspace mappings must not be written to IndexedDB Note records or repository Markdown.


### `0.6.4` Runtime Boundaries

- Pending image insertion accepts bounded PNG/JPEG/WebP/GIF clipboard or file bytes and performs no remote write until explicit Note save.
- Note save writes/reuses and verifies repository image assets before rewriting pending references and verifying the Note.
- Image-aware transfer remains in the exact source owner/repository/branch, copies visible Note content only, and uses create or append-as-new-section modes.
- Multi-file image operations expose partial results; verified files are not blindly rolled back or deleted.
- Transfer preflight reserves every target asset path as one batch, including collisions between assets in the same operation.
- Transfer execution rereads every source image and rejects changed SHA/bytes before the first target write.
- Image discovery ignores fenced/indented/code-span examples and HTML comments; ambiguous or unresolved syntax cannot produce false completion.
- Contextual feedback actions retry only unresolved stages or prepare a fresh transfer plan; verified assets are reused.
- Repository file search is explicit breadth-first traversal with folder/request/result/depth limits; it is not a background index.
- Category definitions write schema v3 while v1/v2 remain readable.
- A local-only Note may retain pending category intent, but membership is not written until the Note has a verified same-repository target.
- Multi-category Note synchronization is sequential and may produce explicit partial results; verified writes are not rolled back blindly.
- Rich Markdown is a derived projection. Unsafe schemes, scripts, event attributes and arbitrary active HTML are blocked.
- Repository-relative images are fetched with authenticated GitHub requests; the token is never placed in Markdown, DOM URLs or object URLs.
- External images are not loaded automatically.
- Errors remain visible in their Notes, Files, Categories or picker context and do not clear related user input.

## 4. Files

```text
src/action-feedback.js
  structured surface-scoped feedback, partial results and dismissal helpers.

src/note-image-assets.js
  supported image validation, pending-reference syntax, safe filenames and Note-owned asset destinations.

src/pending-note-asset-store.js
  separate IndexedDB persistence for recoverable pending image bytes and upload state.

src/repository-asset-write.js
  absent/identical/collision-safe repository asset planning and byte-verified writes.

src/markdown-image-references.js
  Markdown image and allowlisted img source discovery, classification and deterministic rewriting.

src/image-aware-markdown-transfer.js
  pure same-repository transfer planning/finalization for visible Note Markdown and target-owned assets.

src/linked-notes-core.js
  Note identity, state transitions, categories, links and portable file naming.

src/note-markdown-codec.js
  deterministic Markdown Note encoding/decoding.

src/repository-target.js
  Markdown-relative path normalization, portable relative-link generation and explicit-anchor checks.

src/repository-file-browser.js
  pure repository browsing, breadcrumb, GitHub URL and bounded text-preview policy.

src/repository-target-search.js
  explicit breadth-first filename search with depth, request, folder and result limits.

src/rich-markdown-renderer.js
  sanitized derived Markdown HTML with link/image descriptors and allowlisted img attributes.

src/repository-media-loader.js
  authenticated repository image loading, MIME/size bounds and object-URL cleanup.

src/category-definition-codec.js
  deterministic v3 category Markdown with explicit managed boundaries, encoded portable link destinations and legacy v1 decoding.

src/repository-category-index.js
  typed file/Note explicit and implied memberships, validation provenance, path-aware broken-link reporting and cycle detection.

src/note-relation-index.js
  derived outgoing managed relations and incoming Note/file backlinks.

src/category-cache-store.js
  multi-tab-safe target-scoped category snapshots and separately revisioned local-only UX groups with atomic per-category mutations.

src/indexeddb-note-store.js
  local Note draft/index storage.

src/github-contents-client.js
  validated GitHub Contents API directory/read/create/update, binary byte writes, metadata-without-content-decoding and exact read-back verification.

src/remote-note-reconcile.js
  pure local/remote classification for import, unchanged, fast-forward, local-ahead, conflict, duplicate identity and remote deletion.

src/workspace-context.js
  workspace schema, repository input parser, safe base paths and ChatGPT chat-key extraction.

src/workspace-store.js
  multi-tab-safe workspace registry, explicit per-chat selection, one shared token, revisioned writes and deterministic v1 migration.

src/linked-notes-ui.js
  dark Shadow DOM UI, image paste/file insertion, pending-image and transfer controls, viewport-safe placement, independent scrolling, durable drafts and contextual recovery.

src/linked-notes-app.js
  composition, route-aware workspace selection, pending-image lifecycle, verified multi-resource Note save, image-aware transfer and remote orchestration.

build-linked-notes.mjs
  deterministic zero-dependency userscript build.

verify-linked-notes.mjs
  syntax, unit-test and generated-output verification.

linked-notes-prototype.user.js
  generated installable Tampermonkey artifact; do not edit manually.
```

## 5. Build And Automated Verification

Requirements:

```text
Node.js 20 or later recommended;
no npm install;
no third-party runtime or test dependency.
```

From this directory:

```powershell
node build-linked-notes.mjs
node verify-linked-notes.mjs
```

Automated verification covers:

- existing Note state, codec, path, GitHub client and recovery policies;
- repository-root and direct-directory browsing with GET-only text preview and GitHub links;
- deterministic category-definition v2 Markdown round trip, literal managed-looking headings and legacy v1 compatibility;
- explicit and transitive implied category membership, broken links and cycle detection;
- workspace-target-isolated category cache recovery, same-id target invalidation, route-safe context reset and atomic multi-tab local-group mutations;
- path-aware category diagnostics, bounded parent-directory member validation without member-content reads and explicit missing/inaccessible/unchecked states;
- category create/update/assignment writes with SHA protection and exact read-back verification;
- oversized file classification through the real UI payload before content reads and metadata responses that do not decode inline content;
- cross-repository category-assignment rejection and portable category-link round trips for punctuation, spaces, Unicode and percent signs;
- bounded direct-child GitHub Notes-folder listing with repository/branch verification before a missing folder is treated as empty;
- pure remote/local reconciliation for import, unchanged, fast-forward, local-ahead, conflict, duplicate identity and remote deletion;
- explicit GET-only workspace refresh with remote-only import, safe fast-forward and no background network reads;
- repository input parsing from `owner/repo` and GitHub URL;
- invalid repository/base-path rejection;
- workspace normalization and target labels;
- stable ChatGPT chat-key extraction;
- v1 settings/token migration, including simultaneous first loads;
- one shared token across several workspaces;
- cooperative lock/revision behavior for simultaneous tab mutations;
- independent explicit chat-to-workspace bindings without automatic fallback persistence;
- safe workspace deletion and default fallback;
- route-safe new-chat session selection that never creates a binding merely because a stable chat ID appears;
- immutable verified Note targets after workspace switching;
- launcher offset calculation;
- viewport safe-area sizing for wide, compact and short windows;
- independent list/editor scrolling and persistent workspace-manager access;
- Escape-close guard while a remote operation is active;
- preservation and explicit reset of unsaved workspace-form values;
- open-time refresh after another tab changes workspace state;
- generated userscript freshness and syntax.

## 6. Install

1. Run the build and verifier.
2. Open `linked-notes-prototype.user.js`.
3. Copy the complete generated source into one Tampermonkey script.
4. Save and reload ChatGPT.
5. Open the `Notes` launcher.

The script matches:

```text
https://chatgpt.com/*
https://chat.openai.com/*
```

The launcher measures its own width and moves left by that width plus a gap. The open panel reserves a bottom-right safe area on wide viewports, uses the highest browser stacking layer and keeps its Note list and editor independently scrollable. On compact windows it uses the available viewport while remaining internally scrollable.

## 7. First Workspace Setup

1. Open `Notes`.
2. Press `Manage workspaces` in the top bar; the panel opens the manager and scrolls it into view.
3. Enter a workspace name, for example `GDoc`.
4. Enter either `AlexPastukhh/gdoc` or its full GitHub repository URL.
5. Enter an existing branch.
6. Enter a repository-relative Notes folder.
7. Enter a repository-relative Categories folder, for example `categories`.
8. Press `Save workspace`.
9. Store one shared fine-grained token.
10. Create additional workspaces as needed.
11. Choose the current workspace from the selector at the top of the panel.
12. Press `Refresh Notes` to read existing Linked Notes from the selected Notes folder.
13. Open `Files` and press `Browse root` to navigate repository files.
14. Open `Categories` and press `Refresh categories` to rebuild category memory from GitHub.

Recommended first test target:

```text
workspace: GDoc Test
repository: AlexPastukhh/gdoc
branch: linked-notes-prototype-test
Notes folder: prototype-fixtures/linked-notes
```

The branch must already exist. The helper does not create branches. Saving a workspace performs no network write. If the Notes folder does not exist, its parent path appears automatically with the first explicit `Save GitHub` or `Copy to chat workspace` file creation; no `.gitkeep` is created.

## 8. Chat Workspace Behavior

For a stable route such as:

```text
https://chatgpt.com/c/<conversation-id>
```

the helper stores a mapping only after the user explicitly selects a workspace while that stable route is active:

```text
chat:<conversation-id> → workspace ID
```

When the user navigates between chats without reloading, a route watcher persists the current Note draft and workspace-form draft, detects the new stable conversation ID and restores an existing explicit mapping. An unmapped stable chat merely displays the default workspace; opening it does not create a mapping.

A fresh new-chat route has no durable chat key. It uses the global default workspace without treating that fallback as a selection. A workspace explicitly selected while still on the new-chat route is session-only. When any stable `/c/<id>` route appears or is opened, that temporary selection is cleared, the saved mapping or default is restored and no mapping is written. To remember a non-default workspace, select it explicitly after the stable conversation route is visible.

Deleting a workspace removes only local workspace records and affected chat mappings. It never deletes Notes or remote repository files. Affected chats fall back to the current default workspace and show a status message.

## 9. UI Behavior

- dark theme consistent with ChatGPT dark mode;
- `Docs` launcher shifted left by its measured width plus a gap;
- wide viewports reserve bottom-right space for other OBS widgets instead of allowing them to cover Notes content;
- the panel uses the highest stacking layer and recalculates its bounded dimensions when the viewport changes;
- the Note list and editor have independent internal vertical scrolling, including access to Links and workspace settings below the editor;
- `Manage workspaces` remains visible in the top bar and opens the manager at its scroll position;
- top-level `Notes`, `Files` and `Categories` surfaces share one selected workspace;
- `Refresh Notes` remains visible beside workspace controls and performs one explicit read-only reconciliation of the active Notes folder;
- `Files` browses direct repository folders and shows a bounded read-only text preview plus `Open on GitHub`;
- repository-listing size/SHA/URL metadata survives UI selection; unsupported or oversized files show metadata and the GitHub escape hatch instead of corrupted text;
- `Categories` reads durable category definitions, creates/edits descriptions, assigns files through visible links and distinguishes explicit from derived membership;
- category implication is stored in definition files; category groups are local UX-only and each group change is an atomic category-level mutation;
- category assignment is disabled and rejected when the selected preview belongs to a different repository/branch than the active category workspace;
- the last refresh summary reports found, imported, updated, unchanged, local-ahead, conflict, deleted, skipped and error counts;
- `Escape` persists the title/body draft and closes an idle open panel;
- `Escape` is ignored while a remote operation is active;
- close, search, settings, workspace switch and Note navigation persist the current Note draft first;
- workspace-form input survives close, Escape, token actions, route changes and unrelated state refreshes;
- selecting another workspace or starting a new workspace asks before discarding a dirty workspace form;
- opening Notes rereads workspace state written by other tabs;
- the current chat workspace and effective repository target are visible;
- manager fields use user-facing names instead of an unexplained standalone `owner` field.


## 10. Repository File Browser Boundary

The `Files` surface performs only explicit GitHub Contents API reads. It lists the repository root or one selected direct directory, opens one selected file and always exposes an `Open on GitHub` action.

```text
text file within 512 KiB
  → literal read-only in-app preview;

binary, unsupported or oversized file
  → path/SHA/size metadata
  → Open on GitHub;

ordinary browse/open
  → no PUT, delete, rename or background scan.
```

Repository links opened from Notes use the Note-bound repository context in the in-app file viewer instead of being silently rebound to the active workspace. Exact GitHub navigation remains available through the file link.

## 11. Repository File Categories Boundary

Each category has one ordinary Markdown definition in the Workspace Categories folder. The prototype marker owns stable identity while visible Markdown owns description, implied-category links and file-member links.

```markdown
<!-- obs-file-category:v2 {"schemaVersion":2,"id":"asp-net-core","name":"ASP.NET Core"} -->

# ASP.NET Core

Category description. User Markdown may contain headings named `## Files` or `## Implied categories` without becoming managed data.

<!-- obs-file-category:implied:start -->
## Implied categories

- [Programming](./programming.md)
<!-- obs-file-category:implied:end -->

<!-- obs-file-category:files:start -->
## Files

- [API overview](../docs/api-overview.md)
<!-- obs-file-category:files:end -->
```

Rules:

- category refresh is explicit and read-only;
- category create/update/assign/unassign is an explicit write;
- every write uses the latest known SHA and exact read-back verification;
- one file may have several explicit categories;
- `ASP.NET Core → Programming` makes ASP.NET Core files derived members of Programming;
- cycles, malformed definitions, broken category links and broken file links retain exact source/target paths;
- member-file validation distinguishes verified, missing, inaccessible and unchecked results and uses bounded parent-directory listings rather than member-file content reads;
- visible member links use encoded angle-bracket Markdown destinations and round-trip valid repository names containing spaces, parentheses, brackets, Unicode or percent signs;
- local cache is rebuildable from GitHub and cannot be reused across a changed owner/repository/branch/Categories-folder context even when the workspace id is unchanged;
- definition snapshots and local groups use separate target-scoped cooperative locks/revisions; group edits mutate one category after rereading the latest map;
- local UX groups are not written to GitHub;
- categorized files themselves are not modified by this prototype.

## 12. GitHub Read And Reconciliation Boundary

`Refresh GitHub` is the only Notes-folder discovery trigger. Opening the panel, changing routes and selecting workspaces do not scan GitHub.

The refresh operation:

```text
validates the active repository, branch and Notes folder;
lists direct folder children only;
reads `.md` files within a 100-entry / 2-MiB bound;
skips ordinary Markdown without an obs-linked-note:v1 marker;
imports a remote-only stable Note id into IndexedDB;
fast-forwards only when the local encoded Note still equals its last verified hash;
preserves local-ahead content;
marks different two-sided changes as conflict;
marks missing bound direct-child Notes as remote_deleted;
performs no PUT, delete, rename, branch creation or automatic merge.
```

A 404 for the Notes folder is treated as an empty folder only after the repository root is readable at the configured branch. This prevents an invalid or inaccessible repository/branch from being reported as a harmless empty folder.

## 13. GitHub Save Boundary

Use a test repository or test branch, not production `main` by default.

The shared token:

- should be fine-grained and least privilege;
- is stored only in private Tampermonkey storage;
- is not copied into Workspace records, Notes, Markdown or test evidence;
- is used only after explicit remote actions.

After the first verified save, a Note is bound to exact owner/repository/branch/path plus SHA and verified content hash. Regular Save is blocked when the selected chat workspace points elsewhere. `Copy to chat workspace` creates only an absent target, verifies the copy, rebinds the local Note and leaves the previous remote file untouched.

Remote recovery remains explicit:

- `Recheck remote` accepts a new SHA only when exact remote Markdown equals the local Note;
- `Load remote` creates a separate local backup before replacing differing local content;
- `Restore/overwrite bound remote` requires confirmation and uses the latest remote SHA;
- a successful PUT followed by failed read-back records a recoverable provisional target.

## 14. Guided Test Run

Run the exact test sequence in [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md). The checklist covers:

```text
automated verification;
launcher position, overlay safe area, viewport resize and internal scrolling;
visible top-bar workspace-manager access;
Escape and draft recovery;
workspace creation from URL and owner/repo;
shared-token behavior;
two chats with independent explicit workspace selections;
new-chat session selection without route-driven binding, including navigation to an existing unmapped chat;
two-tab concurrent workspace mutations and open-time refresh;
workspace-form preservation and discard confirmation;
v1 migration;
local Note and Note-to-Note behavior;
explicit GitHub folder refresh, remote-only import and safe remote fast-forward;
repository root/folder browsing, in-app text preview and GitHub link;
category definition create/read/update, explicit/derived membership, cache rebuild, broken links and cycle handling;
remote/local two-sided conflict and remote deletion discovery;
verified GitHub create/update/read-back;
workspace mismatch and explicit Copy;
SHA conflict and recovery;
remote deletion and verification-unknown recovery;
secret/storage inspection.
```

Passing automated tests does not replace the browser and real GitHub smoke tests.

## 15. Prototype Markdown Format

The generated file remains ordinary Markdown with one compact machine-readable HTML comment:

```markdown
<!-- obs-linked-note:v1 {"schemaVersion":1,"id":"note-...","title":"Example","bodyLength":27,"links":[],"extra":{}} -->

# Example

Literal user Markdown body.
```

Workspace and chat binding data are intentionally absent from this format. The Note stores only its own verified remote identity in local state; repository Markdown remains portable.

## 16. Known Open Decisions

- final Note identity and filename convention;
- file-per-Note versus shared/hybrid remote storage;
- repository/anchor picker UX;
- credential lifecycle beyond local prototype use;
- remote index derivation and stale-cache behavior;
- final recovery/compare UX;
- rename/delete behavior;
- production packaging and shared-library extraction;
- whether local Notes should later support optional workspace filters.

## 17. Do Not

- Do not edit `linked-notes-prototype.user.js` by hand; edit `src/**` and rebuild.
- Do not claim remote success before exact read-back verification.
- Do not overwrite a changed remote SHA blindly.
- Do not recreate a previously verified target after 404 through regular Save.
- Do not let workspace selection silently move a bound Note.
- Do not write workspace/chat context into Note Markdown.
- Do not store separate token copies in Workspace records.
- Do not accept malformed GitHub repository URLs or unsafe repository paths.
- Do not run two remote operations concurrently.
- Do not scan GitHub automatically on mount, panel open, route change or workspace selection.
- Do not import arbitrary Markdown that lacks the linked-note marker.
- Do not fast-forward a local Note after its content changed from the verified base.
- Do not close the panel through Escape during a remote operation.
- Do not discard unsaved title/body or workspace-form text during route changes or UI rerenders.
- Do not let panel content become unreachable outside the viewport or behind another fixed OBS widget.
- Do not persist the default workspace as a chat binding merely because an unmapped chat was opened.
- Do not update workspace/default/chat-map state from a stale tab without the cooperative lock and revision verification.
- Do not hide unresolved targets.
- Do not treat local IndexedDB or GM storage as repository truth.
- Do not treat this prototype as acceptance of a general application runtime.
- Do not update canonical Planning Items from prototype code alone.

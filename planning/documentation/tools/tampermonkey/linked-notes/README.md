# OBS Linked Notes Prototype

Status: preliminary implementation prototype / browser and remote smoke testing pending
Version: `0.2.3-prototype`
Scope: one local-first Tampermonkey vertical slice for creating, linking, persisting and reopening repository-owned Markdown Notes across reusable GitHub workspaces with a viewport-safe scrollable panel.

## 1. Owners And Boundaries

Behavior owners:

- [`linked-notes-end-to-end-workflow.md`](../../../../areas/documentation-workbench/linked-notes-end-to-end-workflow.md);
- the Linked Notes Key Scenario in [`planning-draft.md`](../../../../areas/documentation-workbench/planning-draft.md);
- `ITEM-114 / STABLE-MARKDOWN-LINK-TARGETS` and `ITEM-124 / LINKED-MARKDOWN-NOTES` in [`planning-item-register.md`](../../../../areas/documentation-workbench/planning-item-register.md).

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
no category-backed Notes projection;
no automatic link repair;
no automatic background repository writes;
no local git, commit or push.
```

Canonical Planning Item changes remain a separate reviewed reconciliation step.

## 2. Workspace Model

The runtime deliberately separates three identities:

```text
Workspace:
  reusable local repository configuration;
  name + owner/repository + branch + Notes folder.

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
AlexPastukhh/gdoc@main:prototype-fixtures/linked-notes
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
```

The canonical `workspaceState` value contains the complete workspace list, explicit chat map, default workspace and revision/writer identity in one atomic GM value.

Legacy read-only migration inputs:

```text
obsLinkedNotesPrototype:v2:workspaces
obsLinkedNotesPrototype:v2:chatWorkspaceMap
obsLinkedNotesPrototype:v2:defaultWorkspace
obsLinkedNotesPrototype:v1:settings
obsLinkedNotesPrototype:v1:githubToken
```

On the first v2 load, valid v1 settings become one deterministic `workspace-imported-v1` record named `Imported workspace`; the old token is copied to the shared v2 token slot when that slot is empty. Migration runs under the same cooperative cross-tab lock, so two starting tabs cannot create duplicate imported workspaces. The old keys are not deleted automatically.

Every workspace/default/chat-map mutation reacquires the lock, rereads the one canonical state value, writes one new revisioned state object and verifies both lock ownership and the committed revision. Opening Notes rereads the state, so another tab's completed changes become visible without reloading the ChatGPT page.

Linked Notes IndexedDB:

```text
database: obsLinkedNotesPrototype
store: notes
```

Tokens and chat-workspace mappings must not be written to IndexedDB Note records or repository Markdown.

## 4. Files

```text
src/linked-notes-core.js
  Note identity, state transitions, links and portable file naming.

src/note-markdown-codec.js
  deterministic Markdown Note encoding/decoding.

src/repository-target.js
  Markdown-relative path normalization and explicit-anchor checks.

src/indexeddb-note-store.js
  local Note draft/index storage.

src/github-contents-client.js
  validated GitHub Contents API read/create/update and read-back verification.

src/workspace-context.js
  workspace schema, repository input parser, safe base paths and ChatGPT chat-key extraction.

src/workspace-store.js
  multi-tab-safe workspace registry, explicit per-chat selection, one shared token, revisioned writes and deterministic v1 migration.

src/linked-notes-ui.js
  dark Shadow DOM UI, viewport-safe panel placement, independent internal scrolling, visible workspace-manager access, durable in-memory workspace-form draft, reset confirmation, dynamic launcher offset and Escape handling.

src/linked-notes-app.js
  composition, route-aware explicit workspace selection, open-time state refresh, draft persistence and remote orchestration.

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
7. Press `Save workspace`.
8. Store one shared fine-grained token.
9. Create additional workspaces as needed.
10. Choose the current workspace from the selector at the top of the panel.

Recommended first test target:

```text
workspace: GDoc Test
repository: AlexPastukhh/gdoc
branch: linked-notes-prototype-test
Notes folder: prototype-fixtures/linked-notes
```

The branch must already exist. The helper does not create branches.

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
- `Notes` launcher shifted left by its measured width plus a gap;
- wide viewports reserve bottom-right space for other OBS widgets instead of allowing them to cover Notes content;
- the panel uses the highest stacking layer and recalculates its bounded dimensions when the viewport changes;
- the Note list and editor have independent internal vertical scrolling, including access to Links and workspace settings below the editor;
- `Manage workspaces` remains visible in the top bar and opens the manager at its scroll position;
- `Escape` persists the title/body draft and closes an idle open panel;
- `Escape` is ignored while a remote operation is active;
- close, search, settings, workspace switch and Note navigation persist the current Note draft first;
- workspace-form input survives close, Escape, token actions, route changes and unrelated state refreshes;
- selecting another workspace or starting a new workspace asks before discarding a dirty workspace form;
- opening Notes rereads workspace state written by other tabs;
- the current chat workspace and effective repository target are visible;
- manager fields use user-facing names instead of an unexplained standalone `owner` field.

## 10. GitHub Save Boundary

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

## 11. Guided Test Run

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
verified GitHub create/update/read-back;
workspace mismatch and explicit Copy;
SHA conflict and recovery;
remote deletion and verification-unknown recovery;
secret/storage inspection.
```

Passing automated tests does not replace the browser and real GitHub smoke tests.

## 12. Prototype Markdown Format

The generated file remains ordinary Markdown with one compact machine-readable HTML comment:

```markdown
<!-- obs-linked-note:v1 {"schemaVersion":1,"id":"note-...","title":"Example","bodyLength":27,"links":[],"extra":{}} -->

# Example

Literal user Markdown body.
```

Workspace and chat binding data are intentionally absent from this format. The Note stores only its own verified remote identity in local state; repository Markdown remains portable.

## 13. Known Open Decisions

- final Note identity and filename convention;
- file-per-Note versus shared/hybrid remote storage;
- repository/anchor picker UX;
- credential lifecycle beyond local prototype use;
- remote index derivation and stale-cache behavior;
- final recovery/compare UX;
- rename/delete behavior;
- production packaging and shared-library extraction;
- whether local Notes should later support optional workspace filters.

## 14. Do Not

- Do not edit `linked-notes-prototype.user.js` by hand; edit `src/**` and rebuild.
- Do not claim remote success before exact read-back verification.
- Do not overwrite a changed remote SHA blindly.
- Do not recreate a previously verified target after 404 through regular Save.
- Do not let workspace selection silently move a bound Note.
- Do not write workspace/chat context into Note Markdown.
- Do not store separate token copies in Workspace records.
- Do not accept malformed GitHub repository URLs or unsafe repository paths.
- Do not run two remote operations concurrently.
- Do not close the panel through Escape during a remote operation.
- Do not discard unsaved title/body or workspace-form text during route changes or UI rerenders.
- Do not let panel content become unreachable outside the viewport or behind another fixed OBS widget.
- Do not persist the default workspace as a chat binding merely because an unmapped chat was opened.
- Do not update workspace/default/chat-map state from a stale tab without the cooperative lock and revision verification.
- Do not hide unresolved targets.
- Do not treat local IndexedDB or GM storage as repository truth.
- Do not treat this prototype as acceptance of a general application runtime.
- Do not update canonical Planning Items from prototype code alone.

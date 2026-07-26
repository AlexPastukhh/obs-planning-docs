# OBS Linked Notes Prototype

Status: preliminary implementation prototype / browser and remote smoke testing pending
Version: `0.1.3-prototype`
Scope: one local-first Tampermonkey vertical slice for creating, linking, persisting and reopening repository-owned Markdown Notes.

## 1. Owners And Boundaries

Behavior owners:

- [`linked-notes-end-to-end-workflow.md`](../../../../areas/documentation-workbench/linked-notes-end-to-end-workflow.md);
- the Linked Notes Key Scenario in [`planning-draft.md`](../../../../areas/documentation-workbench/planning-draft.md);
- `ITEM-114 / STABLE-MARKDOWN-LINK-TARGETS` and `ITEM-124 / LINKED-MARKDOWN-NOTES` in [`planning-item-register.md`](../../../../areas/documentation-workbench/planning-item-register.md).

This directory is implementation/prototype material. It does not redefine behavior owners or silently accept a production architecture.

Current prototype boundary:

```text
ordinary repository Markdown remains durable truth;
local IndexedDB state remains recoverable working state and ordinary UI rerenders do not discard title/body drafts;
remote save, copy and recovery writes are explicit;
only one remote operation may run at a time and editor/navigation controls are locked during it;
remote success requires read-back verification;
a verified remote identity includes owner/repository/branch/path, SHA and verified content hash;
a write accepted before failed read-back preserves a recoverable provisional target;
changing GitHub settings never silently moves or recreates a verified Note;
repository paths are validated independently at settings, app and GitHub-client boundaries;
ordinary Markdown-relative paths and explicit anchors are stable targets;
imported and opened URL links are restricted to portable HTTP(S);
unknown codec metadata survives normalization, local storage, remote load and re-encoding;
local Save never clears conflict, remote-deleted or verification-unknown recovery state;
Note-to-Note links use stable Note IDs;
no generic Reference Object store;
no category-backed Notes projection;
no automatic link repair;
no automatic background repository writes;
no Impact Checker or AI Transfer Expander in this slice.
```

Canonical Planning Item changes, including final retirement of old `ITEM-125` meaning and creation of a new widget Implementation Idea item, remain a separate reviewed reconciliation step.

## 2. Files

```text
src/linked-notes-core.js
  Note identity, state transitions, links and portable file naming.

src/note-markdown-codec.js
  deterministic Markdown Note encoding/decoding.

src/repository-target.js
  ordinary Markdown-relative path normalization, canonical-path validation and explicit-anchor checks.

src/indexeddb-note-store.js
  local draft/index storage.

src/github-contents-client.js
  independently validated GitHub Contents API paths, read/create/update, SHA conflict handling and read-back verification.

src/linked-notes-ui.js
  Shadow DOM Notes list/editor/settings/link UI with remote-operation locking and explicit recovery actions.

src/linked-notes-app.js
  composition, draft persistence, immutable remote-target policy, single-operation locking and explicit save/copy/recovery orchestration.

build-linked-notes.mjs
  deterministic zero-dependency userscript build.

verify-linked-notes.mjs
  syntax, unit-test and generated-output verification.

linked-notes-prototype.user.js
  generated installable Tampermonkey artifact; do not edit manually.
```

## 3. Build And Automated Verification

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

`verify-linked-notes.mjs` performs:

- `node --check` for source, build, verifier and generated userscript files;
- Node built-in unit tests;
- generated userscript freshness/determinism check.

Automated tests cover:

- Note creation and state transitions;
- complete remote target identity and repository/branch/path mismatch blocking;
- remote deletion blocking without automatic recreation;
- explicit copy-to-current-target behavior;
- changed-after-save behavior;
- Unicode/literal Markdown round-trip, including 0/1/2/3 trailing newlines, CRLF and a body-leading BOM;
- structured repository and Note links;
- ordinary Markdown-relative same/parent/sibling/nested repository paths;
- same-file `#anchor` targets;
- explicit anchor resolution and unresolved anchors;
- rejection of machine-local, traversal, URL-like, query-bearing and malformed repository paths;
- GitHub read/create/update response handling;
- SHA conflict and permission errors;
- remote read-back mismatch and verification-unknown state;
- recovery after a network-unknown write only when read-back proves exact content;
- recheck, load-with-local-backup and explicit overwrite/restore recovery;
- rejection of a second concurrent remote operation;
- rejection of non-HTTP(S) URL links during import and again before opening;
- preservation of unknown codec metadata across normalization, remote load, backup and re-encoding;
- preservation of recoverable remote uncertainty across local saves.

## 4. Install

1. Run the build and verifier.
2. Open `linked-notes-prototype.user.js`.
3. Copy the complete generated source into a new Tampermonkey script.
4. Save and reload ChatGPT.
5. Open the `Notes` launcher in the bottom-right corner.

The script matches:

```text
https://chatgpt.com/*
https://chat.openai.com/*
```

## 5. Local-Only Smoke Test

Before configuring GitHub:

1. Create Note A with Unicode title/body.
2. Without pressing `Save local`, close and reopen the panel; confirm the exact draft remains.
3. Edit again, run search, save settings and switch Notes; confirm each ordinary rerender/navigation preserves the exact draft.
4. Reload the page and confirm Note A is restored from IndexedDB.
5. Press `Save local` and confirm the explicit local state.
6. Create Note B.
7. Add a Note link from A to B and press `Check`.
8. Open the Note link.
9. Add a missing Note target and confirm an unresolved result.
10. Edit a previously verified Note locally and confirm `changed_after_save` after remote testing is available.
11. Check a link without changing its durable fields and confirm the Note does not become `changed_after_save`.

## 6. GitHub Test Boundary

Use a test repository or test branch, not the production `main` branch by default.

Conservative test target:

```text
branch: linked-notes-prototype-test
base path: prototype-fixtures/linked-notes
storage layout: one file per Note
```

Token rules:

- use a fine-grained least-privilege token;
- store it only through the prototype settings form;
- the token is written to private Tampermonkey storage, not IndexedDB or Markdown;
- do not paste a token into test fixtures, console logs or repository files;
- remote write occurs only after pressing `Save GitHub`.

GitHub Contents API creates or updates a file on the configured branch. The prototype does not run local Git, push a working tree or write to an unconfigured target.

After the first verified save, the Note is bound to the exact owner/repository/branch/path plus SHA and verified content hash. Regular `Save GitHub` is blocked when current settings point elsewhere. `Copy to current target` is the separate explicit action; it creates only an absent target, verifies the copy, rebinds the local Note and never deletes the old remote file. A previously verified target returning 404 becomes `remote_deleted` and is not recreated automatically.

Remote recovery is explicit:

- `Recheck remote` reads the bound target and accepts a new SHA only when the exact remote Markdown equals the current local Note;
- `Load remote` verifies the Note identity and creates a separate local conflict-backup Note before replacing differing local content;
- `Restore/overwrite bound remote` asks for confirmation, reads the latest remote SHA and then performs one conflict-aware write plus read-back verification;
- a successful PUT followed by failed read-back records a recoverable provisional target when the Note was previously unbound.

The UI permits only one remote operation at a time and disables editing, navigation and settings controls until that operation completes.

## 7. Remote Smoke Test

Use [`PROTOTYPE-CHECKLIST.md`](PROTOTYPE-CHECKLIST.md) as the evidence record.

Minimum path:

```text
create Note A locally
  → link A to a real repository file and explicit anchor
  → create Note B
  → link A to B
  → save A and B through the configured test branch/path
  → read both back
  → verify exact content
  → open file, anchor and Note targets
  → change one remote file outside the prototype
  → attempt save from stale SHA
  → observe conflict without blind overwrite
  → recheck and observe exact-content mismatch
  → load remote with a local backup or explicitly overwrite using the current remote SHA
  → verify the recovered result.
```

## 8. Prototype Markdown Format

The generated file is ordinary Markdown with one compact machine-readable HTML comment:

```markdown
<!-- obs-linked-note:v1 {"schemaVersion":1,"id":"note-...","title":"Example","bodyLength":27,"links":[],"extra":{}} -->

# Example

Literal user Markdown body.
```

The marker owns prototype identity, structured links and `bodyLength`, which lets the codec preserve the literal body exactly while still keeping one readable Markdown file. The visible title/body remain readable without the userscript. Unknown `extra` metadata is preserved through codec decode/encode, normalized Note state, local storage, conflict backup and remote loading. Initial v1 files without `bodyLength` remain readable through a compatibility path.

This format is provisional. Passing tests does not make it the final production layout.

## 9. Known Open Decisions

- separate test repository versus test branch;
- final Note identity and filename convention;
- file-per-Note versus shared/hybrid storage;
- repository/anchor picker UX;
- credential lifecycle beyond local prototype use;
- remote index derivation and stale-cache behavior;
- final recovery/compare UX beyond the current explicit prototype actions;
- rename/delete behavior;
- production packaging and shared-library extraction;
- whether a later helper should reuse repository-target and GitHub client modules.

## 10. Do Not

- Do not edit `linked-notes-prototype.user.js` by hand; edit `src/**` and rebuild.
- Do not claim remote success before exact read-back verification.
- Do not overwrite a changed remote SHA.
- Do not recreate a previously verified target after a 404 through regular Save; use the confirmed bound-remote restore action only after review.
- Do not use new GitHub settings to move a bound Note through regular Save; use the explicit Copy action and only when the destination is absent.
- Do not accept base paths or GitHub content paths containing absolute, URL-like, query/fragment, empty, `.` or `..` segments.
- Do not run two remote save/copy/recovery operations concurrently.
- Do not discard unsaved title/body text during panel close, search, settings updates, status rerenders or Note navigation.
- Do not open imported URL links unless they revalidate as HTTP(S).
- Do not discard unknown codec metadata while normalizing, storing or loading a Note.
- Do not let Save local clear conflict, remote-deleted or verification-unknown recovery state.
- Do not hide unresolved file, anchor or Note targets.
- Do not treat local IndexedDB state as repository truth.
- Do not treat this prototype as acceptance of a general application runtime.
- Do not update canonical Planning Items from prototype code alone.

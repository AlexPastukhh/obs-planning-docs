# Full App State Export Workflow

Status: working project-local End-To-End Workflow / prototype acceptance pending
Doc version: v0.1.0-full-local-state-export
Scope: read-only inspection and export of OBS Linked Notes application-owned local state for troubleshooting, review and handoff to an AI/chat without exposing authentication secrets.

## 1. Purpose

Provide one explicit way to inspect and copy the effective local state of the Linked Notes prototype instead of reconstructing settings, local drafts, caches and current runtime state across many screens.

The export is diagnostic state, not repository truth and not a restore format in this slice.

## 2. Trigger And Result

**Trigger:** the user opens `App state`, refreshes the snapshot, copies `FULL JSON`, or copies the ChatGPT-oriented projection.

**Successful result:** one versioned snapshot describes all captured application-owned persistent state plus current serializable app/UI runtime state, with authentication secrets redacted and no GitHub request or local mutation caused by export.

**Other explicit results:** clipboard failure, unavailable GM key enumeration, unavailable safe IndexedDB inventory, unreadable IndexedDB store, or a captured non-serializable runtime value represented as an omission/diagnostic instead of crashing the export.

## 3. Snapshot Contract

The first schema is:

```text
kind: obs-linked-notes-full-app-state
schemaVersion: 1
generatedAt
security
persistent
  gm
  indexedDb
runtime
  app
  ui
diagnostics
```

The snapshot should preserve factual values rather than summarize them when they are serializable and safe to share.

### Persistent GM state

Enumerate current Tampermonkey values and include every key whose name starts with:

```text
obsLinkedNotesPrototype:
```

This intentionally captures current, legacy, migration, workspace-scoped and future application-owned GM records without requiring a manually maintained key inventory.

Known GitHub credential values are never exported literally. Their key remains visible with a redacted descriptor indicating whether a value is present.

Lock tokens, mutation IDs and ordinary content containing words such as `token` are not authentication credentials and must not be redacted merely by keyword coincidence.

### IndexedDB state

Capture existing application databases without creating or upgrading a database during export. The two current known databases are:

```text
obsLinkedNotesPrototype
obsLinkedNotesPrototypeAssets
```

When safe browser database inventory is available, also include future databases whose names start with `obsLinkedNotesPrototype`; unrelated databases are not opened. Read every existing object store and every record through read-only transactions. This includes complete local Note records and all pending/recovery asset records, including records not currently attached to an open Note.

If safe database inventory is unavailable, report the limitation instead of opening a possibly absent database and thereby changing local state.

### Current runtime/UI state

Capture the serializable current state held by the running app and UI, including extension-owned fields added by Files, repository templates, Reference Objects and responsiveness runtimes.

Also capture live form-control values so a typed but not-yet-persisted value can be represented in the snapshot. Password/credential controls are redacted.

Functions, DOM nodes, timers, transports, stores and other implementation handles are not portable semantic state. Represent these through explicit omission/diagnostic records rather than attempting to serialize executable/browser objects.

## 4. FULL And ChatGPT Copies

`Copy FULL JSON` keeps captured binary values as base64-tagged values so pending image bytes are represented in the export.

`Copy for ChatGPT` is derived from the same freshly collected snapshot but removes only raw binary payload text. It keeps byte length/type metadata and all captured textual/structured state. Authentication secrets remain redacted in both modes.

The on-screen JSON preview uses the chat-safe projection so large binary payloads are not expanded into the modal merely for inspection.

Neither copy mode is an import/restore command.

## 5. End-To-End Flow

```text
open Linked Notes
  → App state
  → collect application-owned GM keys locally
  → inspect existing application IndexedDB databases read-only
  → capture current app runtime fields
  → capture current UI state + live controls
  → redact known authentication secrets
  → normalize typed/binary/circular/non-serializable values
  → show snapshot summary + chat-safe preview
  → optional Copy for ChatGPT
  → optional Copy FULL JSON
  → clipboard result or explicit error.
```

## 6. Safety Rules

- Snapshot collection performs no GitHub GET/PUT.
- Snapshot collection performs no `GM_setValue`.
- Snapshot collection performs no IndexedDB write transaction.
- Export must not call UI draft-persistence actions as a prerequisite to capture current typed text.
- Export must not create or upgrade an absent IndexedDB database.
- Authentication credential values are always redacted.
- No automatic upload/share is performed.
- Clipboard write happens only after an explicit copy action.
- Clipboard failure does not mutate the application snapshot or local stores.

## 7. Required Acceptance

Automated coverage should prove:

```text
FULL binary bytes → base64;
ChatGPT copy → same record metadata without raw binary bytes;
exact credential GM keys → redacted;
lock tokens / ordinary token text → preserved;
future obsLinkedNotesPrototype:* GM keys → included automatically;
secret live controls → redacted;
circular/functions → represented without throwing;
absent IndexedDB databases → not opened/created;
copy action → no repository/local write side effect in the runtime contract.
```

Browser acceptance should additionally prove:

```text
App state is reachable from the open Linked Notes workspace bar;
Refresh works without a configured GitHub token;
workspace/category/Files/Reference Object local state is visible when present;
complete local Note bodies are present;
pending assets are represented;
unsaved visible form values are represented;
FULL JSON copies binary payloads;
ChatGPT copy omits raw binary payloads only;
GitHub token text never appears in either copy;
opening/refreshing/copying App state creates no GitHub network activity.
```

## 8. Boundaries

This workflow does not:

- import or restore a snapshot;
- automatically persist live forms before export;
- expose authentication secrets;
- upload snapshots;
- turn local caches/drafts into repository truth;
- guarantee that browser-internal executable objects can be serialized;
- replace normal repository diff/review flows.

A future restore/backup workflow requires separate safety design and explicit user authorization because it would write local state.

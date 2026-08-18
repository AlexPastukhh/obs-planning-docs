# Full App State Export Prototype Mapping

Status: implementation mapping / browser acceptance pending
Version: schema `obs-linked-notes-full-app-state` v1
Owner: [`scenarios/README.md`](scenarios/README.md) / `UC-LN-APP-STATE`

## User flow

Open Linked Notes and use the `App state` button in the workspace bar.

The modal provides:

```text
Refresh
Copy for ChatGPT
Copy FULL JSON
Close
```

`Refresh` is local/read-only. It enumerates application-owned Tampermonkey state, reads existing application IndexedDB stores through read-only transactions, and snapshots the current serializable app/UI state.

`Copy FULL JSON` keeps binary payloads as tagged base64 values. `Copy for ChatGPT` derives from the same snapshot but replaces raw binary payloads with byte-length/type descriptors. Both modes redact GitHub credential values.

## Persistent coverage

GM keys are discovered dynamically from `GM_listValues()` and filtered by the application namespace prefix:

```text
obsLinkedNotesPrototype:
```

This covers workspace/chat state, migrations, category caches/groups/locks, Files preferences, the common pending repository-file queue (including migrated Reference Object drafts), legacy application records and future application-owned keys without manually listing each storage record.

IndexedDB coverage is read from existing application databases only. The current known databases are:

```text
obsLinkedNotesPrototype
obsLinkedNotesPrototypeAssets
```

Safe database inventory also picks up future database names beginning with `obsLinkedNotesPrototype` while ignoring unrelated databases. All existing object stores and records are included. If the browser cannot safely enumerate existing databases, the exporter reports the limitation rather than opening an absent database.

## Security boundary

Exact authentication credential storage keys are redacted. The snapshot records that a credential is present but does not include its value.

Password/credential form controls are also redacted. Lock tokens, mutation IDs and ordinary document text are preserved because they are diagnostic/application state rather than authentication credentials.

## Runtime coverage

The runtime patch snapshots enumerable semantic app/UI fields while excluding service handles such as API objects, stores, clipboard callbacks, timers and DOM roots. Non-serializable values encountered inside captured state are represented with explicit type/omission records.

Live `input`, `textarea` and `select` values are captured independently of persistence so dirty visible form state can be inspected without calling Save/persist first.

`src/chat-response-reader-runtime.js` keeps the current Reader source in enumerable `app.chatResponseReader`, so open/mode state, exact-versus-derived source accuracy, current Markdown and extraction diagnostics are automatically included by the existing App runtime snapshot. The Reader modal, ChatGPT message DOM and MutationObserver remain internal handles and are not added as semantic state.

## Build integration

`src/full-app-state-export.js` owns serialization/redaction/projection primitives.

`src/full-app-state-runtime.js` patches the final Linked Notes App/UI constructors after Files, Reference Object and Chat Response Reader runtimes are installed, so their enumerable semantic state is visible in the captured app object.

The userscript requires `@grant GM_listValues` in addition to the existing GM grants.

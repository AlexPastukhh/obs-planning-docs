# OBS Linked Notes Data And State Map

Status: current prototype data-ownership map
Version: `0.9.0-prototype`
Scope: where application data lives, which representation is authoritative and what may be safely treated as cache/runtime/diagnostic state.

## 1. State Classes

Use these classes before changing persistence behavior:

```text
1. Repository durable truth
2. Local persistent working/config state
3. Runtime-only semantic state
4. Derived/cache/projection state
5. Secret state
```

A representation may participate in more than one workflow, but it should not silently change authority class.

## 2. Repository Durable Truth

| Data | Repository representation | Notes |
|---|---|---|
| Ordinary file | repository file bytes/path | Files editor never converts an ordinary file into a Linked Note |
| Linked Note durable content | `obs-linked-note:v1` Markdown file | repository Note after verified save; local record remains working/recovery state |
| Repository image | ordinary binary file, usually sibling `.assets/` path | exact bytes are verified by the save/transfer workflow |
| Category | ordinary category definition Markdown | owns description, implication and explicit file/Note membership in the current prototype |
| Reference Object canonical value | text inside `obs-ref:def` marker | value is not canonical in the registry JSON |
| Reference Object routing/index metadata | `.linked-notes/reference-objects.json` | supports object discovery/routing; not value storage |
| Ordered Reference List | inline `obs-order:list` and paired `obs-order:item` markers | item contains the complete movable block and nested Reference Object use |
| Repository template | `.linked-notes/templates/*.template.md` | body seeds the normal New File editor after template metadata is removed |
| Repository-facing contracts | `.linked-notes/*.md` | instructions/conventions for repository users/AI, separate from app runtime docs |

## 3. Tampermonkey GM Storage

Application-owned keys use the namespace prefix:

```text
obsLinkedNotesPrototype:
```

Known persistent areas include:

```text
workspace registry/default/chat mappings
shared GitHub credential
migration records
cross-tab lock/revision records
category cache/groups/locks
Files workspace preferences/cache-related records
common pending repository file changes (legacy-compatible Reference Object draft key)
future application-owned namespaced keys
```

Core currently documented workspace keys include:

```text
obsLinkedNotesPrototype:v2:workspaceState
obsLinkedNotesPrototype:v2:githubToken
obsLinkedNotesPrototype:v2:migration
obsLinkedNotesPrototype:v2:stateLock
obsLinkedNotesPrototype:v2:categoryCache:<workspace-target-context>
obsLinkedNotesPrototype:v2:categoryGroups:<workspace-target-context>
obsLinkedNotesPrototype:v2:categoryLock:<workspace-target-context>
```

Legacy migration inputs remain readable where documented; they are not automatically repository state.

The common pending queue normalizes the former Reference Object draft records into schema v2 entries. It keeps complete text or base64 binary payloads, the first verified base SHA, operation/source metadata and update time. The workspace/repository/branch-specific storage key intentionally remains the former `v3:referenceObjects` key so existing drafts upgrade in place. Aggregate prototype storage is bounded at 16 MiB.

## 4. IndexedDB

### Notes database

```text
database: obsLinkedNotesPrototype
store: notes
```

Contains local Note working records/drafts/index state. A local record does not become repository truth merely because it was saved to IndexedDB.

### Pending-assets database

```text
database: obsLinkedNotesPrototypeAssets
store: assets
```

Contains recoverable pending image bytes and upload/retry/verified mapping state. Pending bytes are local until an explicit remote workflow writes/verifies repository assets.

Because `chatgpt.com` and `chat.openai.com` are different browser origins, use `chatgpt.com` as the canonical prototype IndexedDB origin.

## 5. Runtime-Only Semantic State

Examples:

```text
selected surface
current workspace selection/session context
currently opened repository path/file/editor
Linked Notes panel placement mode/coordinates for the live userscript runtime
unsaved live controls before persistence
remote-operation progress/retry/cancellation state
Reference Object check/validation/focus state
Reference Object repository freshness summary by file
Chat Response Reader state
App State modal state
```

Reader semantic state includes source kind/accuracy, current Markdown and diagnostics. It is intentionally runtime-only; Reader history is not persisted in this slice.

The current Files location is also runtime-only. Hiding and reopening the Linked Notes panel in the same live chat/runtime preserves the selected surface, repository path/listing, opened file/editor and file view mode when the exact workspace id + repository/branch + Notes/Categories paths are unchanged. Reopen still rereads local workspace/category storage; a changed chat mapping or changed workspace target invalidates and clears the old repository-derived state. This preservation is not browser-reload persistence and does not add a GM-storage navigation record.

Panel placement is runtime-only UI state. A new userscript runtime starts centered. Dragging the dedicated panel handle or either edge recovery grip switches immediately to a custom `left`/`top` placement; each pointer move updates that semantic placement and reacquires the current live panel, so collapse/expand and ordinary destructive rerenders preserve both the placement and an in-progress drag in the same live runtime. Horizontal custom placement may move almost entirely beyond the left or right viewport edge but is clamped to keep a 64 px recovery strip visible; top/bottom remain bounded so the panel cannot be lost vertically. `Center` switches back to centered mode, where viewport changes recompute the center; viewport changes close transient fixed-position popups first and then re-clamp custom/peek placement. Coordinates are not stored in GitHub, IndexedDB or GM storage and are not promised across a full page reload.

## 6. Derived / Cache / Projection State

Examples:

```text
rich rendered HTML
outgoing/backlink indexes
category explicit/implied views
category cache snapshots
template list/cache/index diagnostics
repository browser listings/previews
Reference Object use discovery/check results
heading outline / copied-link candidates
Full App State snapshot JSON
```

Derived state can be important for diagnostics but does not replace its source owner.

## 7. Secret State

The shared GitHub credential is local secret state.

Rules:

- do not write it into Workspace records, Note Markdown, repository files, category definitions or Reference Object files;
- do not place it in rendered URLs/object URLs;
- do not expose it in Full App State; export only presence/redaction metadata;
- do not broadly redact unrelated diagnostic strings merely because their field name contains words such as `token` when they are known lock/mutation identifiers rather than credentials.

## 8. Identity Separation

### Workspace identity

```text
workspace id
owner
repository
branch
Notes folder
Categories folder
```

### Chat binding identity

```text
stable ChatGPT conversation id
→ explicitly selected workspace id
```

Opening an unmapped chat does not itself create a binding.

### Note remote identity

```text
owner/repository/branch/path
SHA
verified content hash
```

Changing chat workspace must not silently change this identity.

### Category cache identity

Includes the exact workspace/repository target context. Cache from one repository/branch/Categories-folder target must not be reused as truth for another.

### Reference Object identity

Stable `ro_*` object id survives mutable display-name changes. Materialized uses are discovered occurrences rather than stable-use objects.

### Ordered Reference List identity

Stable `orl_*` list IDs link unique `ori_*` item IDs. These IDs identify inline structure, while sort values always come from freshly checked `ro_*` definition values.

## 9. Full App State Export

Full App State is a read-only diagnostic snapshot over local application state.

It covers:

- all application-owned GM keys discovered by namespace;
- existing application IndexedDB databases/stores/records;
- serializable semantic App/UI/runtime state;
- Reader semantic state;
- omission diagnostics for non-serializable handles.

Modes:

```text
Copy FULL JSON
  → raw binary values represented as tagged base64;

Copy for ChatGPT
  → same semantic state, but large raw binary bytes omitted with descriptive metadata.
```

Credentials stay redacted in both modes.

Full App State does **not** replace normal user-facing content copy for Notes or Files. That gap is tracked separately in the roadmap.

## 10. Persistence And Mutation Rules

- Reader open/render/copy/close does not persist Reader history.
- App State capture must not call a save/persist method as a prerequisite.
- Local Save does not silently clear remote conflict/deleted/verification-unknown recovery state.
- Category UX groups are local-only and do not classify repository files by themselves.
- Repository template selection populates a local New File editor; normal Create stages the intended file locally.
- Reference Object propagation is explicit; stale materialized uses are not updated automatically.
- Files/category/Reference Object/ordering/structure/copy business actions stage local file state first. Only Update current file or Update all publishes that queue.
- No application state authorizes local Git commit/push.

## 11. Debugging / Handoff Use

When a future chat needs application context:

```text
current product understanding
  → README / APP-OVERVIEW / ARCHITECTURE / this file;

current implementation problem
  → KNOWN-ISSUES + focused diagnostics;

complete local runtime/storage snapshot
  → App State → Copy for ChatGPT;

actual user document content
  → currently use the feature-specific copy path/manual source;
  → unified content/context copy is a roadmap item.
```

## Review Dependency state

Durable Review Dependency truth is repository-owned:

- `.linked-notes/review-dependencies.json` owns relation identity, source path, consumer path, reason and optional review scope;
- the consumer `obs-review:dependency` marker owns the `against` fingerprint recorded at explicit review completion;
- the source fingerprint is derived, not stored: effective source text (pending local overlay first), live Review Dependency bookkeeping comments removed, line endings normalized to LF, UTF-8 SHA-256;
- current / needs-review / unresolved status is runtime-derived diagnostics and is not a second persistent truth.

Completing review changes only local pending repository state until `SCN-LN-PUBLISH` runs. A review completed against a pending source is valid against that pending state and may become stale again if the acknowledgement is published without the source change. Reference Object freshness remains literal-content based and is not converted to this fingerprint model.


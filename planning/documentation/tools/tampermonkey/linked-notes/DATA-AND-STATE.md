# OBS Linked Notes Data And State Map

Status: current prototype data-ownership map
Version: `0.7.2-prototype`
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
Reference Object local drafts
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
unsaved live controls before persistence
remote-operation progress/retry/cancellation state
Reference Object check/validation/focus state
Chat Response Reader state
App State modal state
```

Reader semantic state includes source kind/accuracy, current Markdown and diagnostics. It is intentionally runtime-only; Reader history is not persisted in this slice.

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
- Repository template selection only populates a local New File editor; normal explicit create performs the write.
- Reference Object propagation is explicit; stale materialized uses are not updated automatically.
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

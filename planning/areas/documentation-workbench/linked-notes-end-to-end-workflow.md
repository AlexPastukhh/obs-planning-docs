# Create, Link And Manage Repository Notes Workflow

Status: working proposed project-local End-To-End Workflow / canonical item transition pending
Doc version: v1.2.0-remote-read-reconciliation
Scope: independently traversable user workflow for creating, reading, reconciling, editing, linking, persisting and navigating durable repository Notes.

## 1. Purpose

Provide a small independently useful Notes workflow without requiring a monolithic Documentation Workbench or a universal managed Reference Object runtime.

This file is the complete proposed behavior review object. It does not become the accepted workflow owner until the related Planning Item and Use-Case transition is explicitly reviewed. A Tampermonkey widget, GitHub integration, local database and exact Markdown layout are Implementation Ideas until separately reviewed and tested.

## 2. Trigger And Result

**Trigger:** the user opens the Notes work surface to create or inspect a Note, explicitly refresh repository Notes, edit content, add/remove a link, save a Note or open a linked target.

**Successful result:** a durable repository-owned Markdown Note with stable links can be found, read, reconciled with recoverable local working state and opened again.

**Other explicit results:** local-only draft, remote-only import, local-ahead state, unresolved target, remote deletion, authentication/permission failure, reconciliation conflict, save conflict or verified remote failure.

## 3. Preconditions

- a Notes work surface is available;
- local working state can be recovered after ordinary page reloads when a helper is used;
- repository configuration is selected before remote read/write;
- credentials are supplied only when remote access requires them;
- repository write, commit and push permissions remain separate from Note editing.

## 4. Note Contract

A Note may be:

```text
titled or untitled;
standalone;
linked to one or several repository files;
linked to one or several stable anchored fragments/sections;
linked to another Note;
optionally linked to an addressable chat-history message.
```

The durable body remains ordinary Markdown. Local indexes, caches and draft state are derived or working state and do not silently replace repository truth.

A normal link means navigation. A review-on-change obligation requires separate explicit relation meaning.

## 5. End-To-End Flow

```text
open Notes work surface
  → create a new Note or open an existing Note
  → optionally set/change title
  → write or edit Note body
  → add, inspect or remove links to:
      repository file;
      stable anchored fragment/section;
      another Note;
      optional chat-history message
  → resolve targets where possible
  → keep unresolved targets visible
  → save local working state
  → when repository reading is explicitly requested:
      read the selected repository Notes location;
      identify valid repository Notes;
      compare remote identity/base with local working state;
      import, fast-forward or preserve local work;
      expose conflict, deletion, unsupported or incomplete results
  → when durable remote save is requested:
      read current remote/base state;
      create or update repository Markdown;
      verify the result by reading it back
  → refresh Note list/search/index
  → open the Note or linked targets
  → durable Note or explicit non-success state.
```

## 6. Mandatory Stages

### Stage 1 — Select Or Create Note

The user creates a standalone Note or selects an existing Note. A Note does not need a parent/home object.

### Stage 2 — Edit Literal Note Content

The user controls title and body. The helper must not silently rewrite, summarize or promote Note content into another semantic type.

### Stage 3 — Manage Links

The user can add/remove links to complete files, stable anchored fragments and other Notes. The current target and unresolved state must be visible before a save is treated as successful.

### Stage 4 — Preserve Local Working State

When a helper is used, unsaved work survives ordinary UI rerenders/reloads according to its documented local-draft policy.

Local working state is not yet durable repository truth.

### Stage 5 — Read And Reconcile Repository Notes

The user explicitly starts repository reading for the selected Notes location. Valid repository Notes are compared with local working state by stable identity, target and last verified base. A remote-only Note may enter the local list; a remote-only change may fast-forward an unchanged local copy; local-ahead work is preserved; different two-sided changes, duplicate identity, unsupported content and remote deletion remain explicit. This read stage performs no repository write.

### Stage 6 — Save Or Update Repository Markdown

The user explicitly starts a remote save. The implementation reads the current target state, performs a create/update with conflict protection and avoids overwriting a changed remote file blindly.

### Stage 7 — Verify Remote Result

A success response alone is insufficient when the network result may be uncertain. Read the target back and confirm the expected content/identity.

### Stage 8 — Browse And Navigate

The user can find the Note through a list/search/index and open its linked repository files, fragments and Notes.

## 7. Branches And Failure Paths

| Situation | Required visible result / recovery |
|---|---|
| Note has no links | valid standalone Note |
| Note remains local-only | explicit unsaved/local state |
| Selected repository Notes location does not exist yet | treat it as an empty remote set only after repository/branch access is verified; the path appears with the first explicit Note-file save, not through a placeholder write |
| Valid repository Note has no local copy | import it after explicit repository refresh and show its exact repository identity |
| Remote changed while local still equals the verified base | fast-forward local working state to the remote Note and new verified base |
| Local changed while remote still equals the verified base | preserve local content and show local-ahead state; perform no write during refresh |
| Local and remote changed differently | preserve local content and show explicit reconciliation conflict; do not merge or overwrite automatically |
| Bound remote Note is missing | preserve local content and show remote-deleted recovery state |
| Repository content is not a valid Note | keep it outside the Note index and show skipped/unsupported result where relevant |
| Repository/branch/location cannot be read | explicit read/authentication/permission failure; do not report a harmless empty location |
| Repository refresh exceeds an implementation bound | explicit incomplete/blocked result; do not silently treat the partial snapshot as complete |
| Repository file or anchor is missing | unresolved link remains visible |
| Linked Note is missing | unresolved Note target remains visible |
| Note links form a cycle | navigation remains possible; recursive expansion must stop and report the cycle |
| Credential missing | no remote write; keep local work |
| Credential lacks permission | explicit permission failure; no false success |
| Remote SHA/base changed | stop blind overwrite; reload/reconcile/retry |
| Network result unknown after write | read remote state before deciding success/failure |
| Local content changed after verified save | changed-after-save state |
| Link should create impact review | require explicit review-on-change relation; plain link stays navigation-only |

## 8. Review Gates

| Gate | Review object | Required outcome |
|---|---|---|
| Content | Note title/body | user-controlled literal content |
| Links | each selected target | intended identity resolves or unresolved is explicit |
| Local state | draft/saved marker | no confusion between local work and repository truth |
| Remote snapshot | selected Notes location, Note identity, target path/SHA/hash and last verified base | import/fast-forward/preserve/conflict/deleted result is explicit; no read action writes remotely |
| Remote base | target path/SHA | no blind overwrite |
| Remote verification | read-back content | exact expected Note is present |
| Credential | token scope/storage behavior | least-privilege and no repository leakage |

## 9. Current Implementation Idea

A separate Tampermonkey Notes widget is a current prototype candidate:

```text
Shadow DOM user interface
  → IndexedDB local working state
  → portable Markdown Note representation
  → configurable GitHub owner/repository/branch/path
  → explicit GitHub Contents API Notes-location read and local/remote reconciliation
  → GitHub Contents API create/read/update
  → SHA-aware conflict handling
  → remote read-back verification
  → links to files, anchors and Notes.
```

The supplied ChatGPT Chats History userscript is supporting implementation evidence for UI, IndexedDB, local review state, GitHub settings, PAT-backed writes, Markdown anchors and read-back verification. It does not yet prove repository file selection, arbitrary stable-fragment linking, Note-to-Note behavior, a remote Notes index or acceptable credential handling.

## 10. Open Implementation Decisions

1. Separate Notes userscript versus extension of the existing Chat History script.
2. One file per Note, one shared Notes file or a hybrid layout.
3. Lightweight Note identity versus a generic Reference Object projection.
4. Local-only operation boundary when GitHub is unavailable.
5. Exact index/search derivation and stale-cache behavior.
6. Fine-grained token permissions and storage.
7. Rename/delete behavior for linked Notes and anchors.

Conservative prototype fallback:

```text
separate local-first Notes userscript;
explicit stable anchors only;
repository Markdown remains durable truth;
no generic Reference Object runtime;
no automatic link repair;
no dependency review unless explicitly marked.
```

## 11. Acceptance And Prototype Evidence

A minimum prototype should demonstrate:

```text
create Note A locally;
link A to a real repository file and explicit anchor;
create Note B and link A → B;
save both through a conflict-aware GitHub write;
read both back;
create one valid repository-only Note and import it through explicit refresh;
change one verified Note only on the repository and fast-forward an unchanged local copy;
change local and remote content differently and show an explicit conflict without losing local work;
delete one bound remote Note and show remote-deleted state without deleting the local Note;
confirm repository refresh performs no write;
open every target;
change target text without changing anchor;
confirm links still resolve;
create one SHA conflict;
show a recoverable explicit state.
```

Prototype success does not automatically accept a production architecture.

## 12. Relationships

- `ITEM-124` owns the current narrower Linked Markdown Notes baseline; this workflow proposes expanded file/fragment/Note linking and remote-persistence behavior.
- `ITEM-114` owns the current stable repository file/section target baseline; incoming survival and Note-target clarifications remain pending item review.
- `ITEM-23B` owns Markdown/Git durable truth.
- `ITEM-99` keeps the Tampermonkey/GitHub design as an Implementation Idea.
- `ITEM-123` may own project-readable non-secret configuration after item review.
- [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) owns repository validation, affected-use review and diff review after a Note change reaches repository Markdown.

## 13. Boundaries

This workflow does not:

- accept a monolithic Workbench application;
- require Semantic Home or App Memory;
- require every Note to be a generic category-backed object;
- choose a final token-storage mechanism;
- authorize repository replacement, commit or push;
- automatically create, repair or rewrite linked documentation;
- require background repository polling or writes;
- silently merge different local and remote Note bodies;
- treat implementation scan limits as final product requirements.

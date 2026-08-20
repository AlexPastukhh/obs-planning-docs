# Reference Object Definition And Materialized Use Workflow

Status: legacy planning/compatibility reference / not current Linked Notes authority
Doc version: v0.1.0-prototype-slice
Scope: create one stable Reference Object definition around exact ordinary Markdown/text, copy materialized use markers, explicitly check/update stale uses, validate marker/index integrity and navigate occurrences without reviving the deferred generic managed-object architecture.

> **Current Linked Notes ownership migrated.** This retained file is planning/history/compatibility context, not a current behavior or Use-Case owner. Current semantics live in [`scenarios/README.md`](../../documentation/tools/tampermonkey/linked-notes/scenarios/README.md). When this retained body conflicts with current Linked Notes docs, the current Linked Notes corpus wins.

## 1. Trigger And Result

**Trigger:** a user has a supported repository text/Markdown file open in Files and wants one exact existing value or fragment to become a reusable Reference Object, or wants to use/check/update/validate an existing Reference Object.

**Successful result:** ordinary repository text contains one invisible definition marker and zero or more invisible use markers carrying materialized values; one repository Definitions File maps stable object ids to mutable names, definition paths and a rebuildable usage index; local changes remain local until `Update current file` or `Update all`; current-file writes use SHA/read-back verification and all-file publication uses one verified Git Data commit.

This workflow is a narrow helper around repository Markdown. It does not select the former App Memory, Semantic Home, flexible object-field, generic object-store or full/bare managed-reference architecture.

## 2. Representation

Prototype syntax:

```text
<!-- obs-ref:def id="ro_example" -->canonical literal value<!-- /obs-ref:def -->
<!-- obs-ref:use id="ro_example" -->materialized literal value<!-- /obs-ref:use -->
```

The comments are invisible in rendered Markdown. Source view remains literal and editable. Marker-looking text inside Markdown fenced code blocks or inline code spans is literal code/example content and is excluded from Reference Object parsing, validation and definition-candidate discovery.

Invariants:

- one stable `ro_*` id identifies the object;
- display name is mutable metadata and is not identity;
- exactly one definition marker owns canonical value;
- canonical value is exactly the marker inner text; no value copy is stored in the Definitions File;
- a use marker contains the last materialized value;
- there is no per-use stable id in the first slice;
- use locations are rediscovered from Markdown and represented in the index by repository path, current line and occurrence number on that line;
- line/occurrence are navigation metadata, not durable identity.

## 3. Definitions File

The bounded prototype uses one Definitions File per exact repository workspace:

```text
.linked-notes/reference-objects.json
```

Schema responsibility:

```text
schemaVersion
objects[]:
  id
  name
  definition.path
  uses[]:
    path
    line
    lineOccurrence
```

`uses[]` is a rebuildable index. Markdown markers remain the evidence for actual occurrences. Index drift is reported and can be repaired by explicit local/remote update or validation-driven follow-up; it is never silently treated as semantic truth.

## 4. Local State Boundary

The implementation uses the common persistent local repository-change queue keyed by exact:

```text
workspace id + owner + repository + branch
```

Each pending file keeps repository path, first GitHub base SHA and complete intended UTF-8 text. Local Reference Object operations preserve the original file text outside explicitly changed marker ranges, including existing CRLF/LF line endings; the helper must not normalize an entire file as a side effect. This is prototype implementation state, not canonical repository truth and not an assumption that the userscript can mutate an OS Git working tree.

Default Reference Object mutations are local. GitHub mutation always requires the standard separate `Update current file` or `Update all` action.

## 5. Create A Definition

1. Open a supported repository text/Markdown file.
2. Copy the exact value/fragment to reuse.
3. Open `Create Reference Object` and paste it.
4. Press Find. Matching is exact, not fuzzy.
5. Show every eligible occurrence in source order.
6. If several matches occur on the same line, show them separately as occurrence `#1`, `#2`, `#3`, left-to-right, with the exact candidate highlighted in context.
7. Reject candidates intersecting an existing Reference Object marker.
8. Select one occurrence and enter a display name.
9. Generate a stable object id.
10. Locally wrap only the selected exact occurrence with `obs-ref:def`.
11. Locally add the object to the Definitions File.
12. Do not write GitHub.

No exact match means no change.

## 6. Copy And Manually Place A Use

The always-available searchable Reference Objects list exposes `Copy reference`.

The clipboard receives the complete use marker containing the current definition value. The helper does not insert it into the current editor automatically. The user opens/edits the desired file and pastes the clipboard text through ordinary file editing.

A later local save/reindex refreshes the local usage index. Ordinary `Validate tags` checks the Definitions File routes only; explicit `Deep validate repo` can discover an unindexed pasted marker elsewhere and report drift. Both validation modes remain read-only.

Clipboard copy itself does not perform a GitHub write.

## 7. Check Uses

`Check uses` is read-only.

It reads `.linked-notes/reference-objects.json` first, then follows only the selected object's recorded `definition.path` and unique `uses[].path` routes. It compares the materialized uses found in those indexed files to the canonical definition value and does not crawl unrelated repository folders. If the Definitions File has no objects, ordinary freshness completes after that one registry read.

This indexed check can report usage-index drift inside the files it was routed to, but it cannot prove that an unindexed marker does not exist elsewhere. Ordinary `Validate tags` uses the same bounded route set for structural/index integrity; repository-wide discovery belongs only to `Deep validate repo`.

Results:

```text
current    → materialized value equals definition;
stale      → materialized value differs;
unresolved → definition/marker integrity prevents comparison.
```

Stale uses are shown yellow in the Reference Objects usage list. A repository freshness scan also exposes stale/unresolved counts in the open file and beside affected Files-tree entries. Checking never updates a file. The warning asks for review of surrounding meaning before local propagation.

## 8. Update Uses

Local refresh and standard publication are distinct:

### Update locally

- rerun a fresh check;
- replace only the inner value of stale `obs-ref:use` markers;
- keep surrounding file text unchanged;
- update the local Definitions File usage index;
- save all changed complete files in the application-local overlay;
- perform no GitHub PUT;
- if there are zero stale uses and no usage-index drift, create no local draft at all.

### Publish through the standard GitHub actions

- `Update current file` publishes only the open pending path through the existing Contents/read-back boundary;
- `Update all` preflights every pending path against one branch tree, creates all blobs/tree/commit, performs one non-force ref update and verifies the resulting tree;
- never use a sequential Contents-write fallback for `Update all`.

## 9. Publish Local Reference Object Changes

The standard publication actions are separate from create, rename, local update and local file save. There is no Reference Object-specific remote button.

Before the first write:

- verify every pending update base SHA;
- prove every pending create path is still absent.

For `Update all`, all intended files enter one tree/commit; either the non-force ref update succeeds or the branch remains on its prior head. Created but unreachable Git objects do not constitute a repository branch change.

## 10. Validate Tags And Deep Validate Repo

`Validate tags` is a separate read-only integrity operation from `Check uses`, but it is intentionally cheap: it reads the Definitions File and the same unique recorded `definition.path` / `uses[].path` route set used by ordinary Reference Object freshness. It validates marker structure and compares the Definitions File index with the actual markers in those files. It performs no repository directory crawl and does not claim that unrelated files contain no Reference Object markers.

`Deep validate repo` is the explicit bounded repository-wide integrity operation. It retains the crawler required to discover unindexed markers, definitions outside recorded routes and global index drift. It is expected to perform more requests and remains cancellable as a Files read.

Minimum diagnostics across the two modes:

- malformed/open/close markers in files actually read;
- nesting/intersection;
- invalid object id;
- duplicate definitions visible in the validation scope;
- registry definition missing or at a different path within that scope;
- definition marker absent from registry when encountered;
- use of unknown object id when encountered;
- Definitions File usage index drift against markers actually read;
- unreadable/oversized/limit state.

Only a complete `Deep validate repo` result can make a repository-wide integrity claim. An incomplete deep scan is never reported as globally valid. Neither mode performs repair or writes.

## 11. Navigation And List UX

`Reference objects ▾` remains available in the Files workspace and is searchable by name, id and definition path. The menu uses the shared Files top-popup portal rather than relying on the clipped toolbar stacking context: its panel is reconstructed from explicit popup state after ordinary rerenders and must paint at least at the base Linked Notes panel stacking level so visible controls remain clickable. Opening remains explicit and is the only event that may lazily load the Definitions File for this menu.

Each object exposes:

```text
Copy reference
Open definition
Check uses
Update locally
Update current file / Update all (standard Files actions)
Rename locally
▸ Uses
```

The expanded usage list shows file path, current line and same-line occurrence number. Clicking a use opens the file in source view and highlights the exact `obs-ref:use` occurrence, so `#1`, `#2` and `#3` on one line remain visually distinct rather than merely highlighting the whole line. Stale uses are visually distinct after an explicit check.

Rename changes Definitions File display metadata only; stable id and markers do not change.

## 12. Repository-Facing Contract For Humans And AI Agents

The repository itself carries an AI-readable contract under:

```text
.linked-notes/README.md
.linked-notes/REFERENCE-OBJECTS.md
.linked-notes/reference-objects.json
```

`.linked-notes/REFERENCE-OBJECTS.md` explains the stable-ID, definition/use and explicit synchronization rules without requiring knowledge of the userscript implementation. An agent that needs to place a synchronized value in a newly created or edited document must resolve the existing object through the Definitions File, read the canonical value from its one `obs-ref:def`, and insert a complete `obs-ref:use` marker rather than a plain copied value.

The repository contract must also state explicitly:

- `obs-ref:def` inner text is canonical;
- `obs-ref:use` inner text is a materialized copy;
- changing a definition does not automatically rewrite uses;
- `Check uses` is read-only and only reports stale values;
- `Update locally` and standard GitHub publication are distinct explicit mutation actions;
- names are mutable metadata while stable IDs remain identity;
- `uses[].line` and `lineOccurrence` are rebuildable navigation metadata, not durable identity;
- markers are preserved when formatting ordinary Markdown;
- code-fenced/inline-code examples are not live markers.

This repository-facing document is a projection of this workflow's selected behavior. It does not create a second semantic owner or broaden the slice into the deferred generic managed-object architecture.

## 13. Bounded Prototype Limits

The repository-wide integrity scan used only by `Deep validate repo` is bounded rather than background/unbounded. Normal `Check uses`, `Validate tags` and Files stale diagnostics use Definitions File routes instead and do not pay these directory-scan costs:

- at most 80 directories;
- at most 300 supported text files;
- at most 4 MiB aggregate scanned UTF-8 text;
- at most 512 KiB per scanned file;
- initial supported scan extensions: `.md`, `.markdown`, `.mdown`, `.txt`.

Limits are prototype evidence, not final product requirements.

## 14. Failure And Safety Rules

| Situation | Required result |
|---|---|
| Exact source text not found | no change |
| Multiple exact candidates | user selects one; never guess |
| Candidate overlaps a marker | block that candidate |
| Definition missing/duplicated | check/update blocked and diagnostic visible |
| Use value differs | stale/yellow after explicit check; no automatic rewrite |
| Definitions File index differs from markers | drift diagnostic; marker occurrences remain evidence |
| Local draft base changed remotely | block publish before overwriting that file |
| Atomic all-file preparation fails before ref update | preserve every pending file; branch remains on the checked head |
| Scan reaches a bound/cancellation | incomplete/cancelled result; no write |
| Workspace changes | reload exact workspace local overlay/list; never render stale prior-workspace state |

## 15. Required Acceptance

Automated coverage must include exact same-line candidate numbering, selected-only wrapping, multiline matches, malformed markers, registry round-trip/rename, local workspace isolation, read-only stale checking, Definitions-File-routed freshness and indexed validation with no repository crawl, empty-registry fast completion, separate deep repository-wide validation diagnostics, local no-write updates, current/all publisher behavior, clipboard-only use creation and manual-paste reindexing.

Browser/real-GitHub acceptance must additionally prove the rendered comments are invisible, the always-available searchable list and create modal survive ordinary rerenders, the portaled `Reference objects` panel remains visibly above the main Linked Notes panel with readable theme-consistent text and clickable controls before/after a harmless rerender, ordinary `Validate tags` reads only indexed routes while `Deep validate repo` is the explicit higher-request repository scan, stale uses are yellow only after Check, usage navigation selects the intended same-line occurrence, local actions produce no PUT, GitHub actions preflight/read-back correctly and workspace switching does not leak local state.

## 16. Deferred

- automatic propagation when a definition changes;
- automatic insertion into an editor;
- fuzzy source matching;
- per-use stable occurrence ids;
- several Definitions Files;
- cross-repository Reference Objects;
- background recursive indexing;
- delete/move-definition migration;
- generic object fields, Semantic Home, App Memory canonical ownership or old full/bare reference modes;
- canonical Planning Item reconciliation for this new slice.

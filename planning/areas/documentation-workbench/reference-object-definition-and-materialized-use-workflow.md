# Reference Object Definition And Materialized Use Workflow

Status: working project-local End-To-End implementation workflow / narrow repository-native slice / canonical Planning Item reconciliation pending
Doc version: v0.1.0-prototype-slice
Scope: create one stable Reference Object definition around exact ordinary Markdown/text, copy materialized use markers, explicitly check/update stale uses, validate marker/index integrity and navigate occurrences without reviving the deferred generic managed-object architecture.

## 1. Trigger And Result

**Trigger:** a user has a supported repository text/Markdown file open in Files and wants one exact existing value or fragment to become a reusable Reference Object, or wants to use/check/update/validate an existing Reference Object.

**Successful result:** ordinary repository text contains one invisible definition marker and zero or more invisible use markers carrying materialized values; one repository Definitions File maps stable object ids to mutable names, definition paths and a rebuildable usage index; local changes remain local until an explicit GitHub action; remote writes use current-base checks and exact read-back verification.

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

The first implementation uses a persistent application-local overlay keyed by exact:

```text
workspace id + owner + repository + branch
```

Each pending file keeps repository path, original GitHub base SHA and complete intended UTF-8 text. Local Reference Object operations preserve the original file text outside explicitly changed marker ranges, including existing CRLF/LF line endings; the helper must not normalize an entire file as a side effect. This is prototype implementation state, not canonical repository truth and not an assumption that the userscript can mutate an OS Git working tree.

Default Reference Object mutations are local. GitHub mutation always requires a separate explicit action.

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

A later local save/reindex or explicit validation discovers the pasted marker and refreshes the local usage index.

Clipboard copy itself does not perform a GitHub write.

## 7. Check Uses

`Check uses` is read-only.

It explicitly scans the bounded supported repository scope, resolves the one definition and compares every discovered materialized use value to the current definition value.

Results:

```text
current    → materialized value equals definition;
stale      → materialized value differs;
unresolved → definition/marker integrity prevents comparison.
```

Stale uses are shown yellow in the Reference Objects usage list. Checking never updates a file.

## 8. Update Uses

Two distinct actions are required:

### Update locally

- rerun a fresh check;
- replace only the inner value of stale `obs-ref:use` markers;
- keep surrounding file text unchanged;
- update the local Definitions File usage index;
- save all changed complete files in the application-local overlay;
- perform no GitHub PUT;
- if there are zero stale uses and no usage-index drift, create no local draft at all.

### Update GitHub

- run only as an explicit remote action;
- use current GitHub state rather than silently publishing unrelated pending local Reference Object drafts;
- if local Reference Object drafts are pending, block the independent remote update and require publish/reconciliation first;
- reread current definition/usages;
- preflight every target base before the first write;
- update stale use files with SHA-aware verified writes;
- update the Definitions File index separately and last;
- report partial completion explicitly because multi-file GitHub writes are not transactional.

## 9. Publish Local Reference Object Changes

`Apply local changes to GitHub` is separate from create, rename, local update and local file save.

Before the first write:

- verify every pending update base SHA;
- prove every pending create path is still absent.

Then write non-registry files first and the Definitions File last, using exact read-back verification. Completed writes remain on partial failure; remaining local drafts stay pending and the result is explicit.

## 10. Validate Tags

`Validate tags` is a separate read-only operation from `Check uses`.

Minimum diagnostics:

- malformed/open/close markers;
- nesting/intersection;
- invalid object id;
- duplicate definitions;
- registry definition missing or at a different path;
- definition marker absent from registry;
- use of unknown object id;
- Definitions File usage index drift;
- unreadable/oversized/scanning-limit state.

An incomplete bounded scan is never reported as globally valid. Validation performs no repair and no write.

## 11. Navigation And List UX

`Reference objects ▾` remains available in the Files workspace and is searchable by name, id and definition path.

Each object exposes:

```text
Copy reference
Open definition
Check uses
Update locally
Update GitHub
Rename locally
▸ Uses
```

The expanded usage list shows file path, current line and same-line occurrence number. Clicking a use opens the file in source view and highlights the exact `obs-ref:use` occurrence, so `#1`, `#2` and `#3` on one line remain visually distinct rather than merely highlighting the whole line. Stale uses are visually distinct after an explicit check.

Rename changes Definitions File display metadata only; stable id and markers do not change.

## 12. Bounded Prototype Limits

The explicit repository scan is bounded rather than background/unbounded:

- at most 80 directories;
- at most 300 supported text files;
- at most 4 MiB aggregate scanned UTF-8 text;
- at most 512 KiB per scanned file;
- initial supported scan extensions: `.md`, `.markdown`, `.mdown`, `.txt`.

Limits are prototype evidence, not final product requirements.

## 13. Failure And Safety Rules

| Situation | Required result |
|---|---|
| Exact source text not found | no change |
| Multiple exact candidates | user selects one; never guess |
| Candidate overlaps a marker | block that candidate |
| Definition missing/duplicated | check/update blocked and diagnostic visible |
| Use value differs | stale/yellow after explicit check; no automatic rewrite |
| Definitions File index differs from markers | drift diagnostic; marker occurrences remain evidence |
| Local draft base changed remotely | block publish before overwriting that file |
| Remote multi-file write partially fails | preserve verified completed writes and remaining pending work explicitly |
| Scan reaches a bound/cancellation | incomplete/cancelled result; no write |
| Workspace changes | reload exact workspace local overlay/list; never render stale prior-workspace state |

## 14. Required Acceptance

Automated coverage must include exact same-line candidate numbering, selected-only wrapping, multiline matches, malformed markers, registry round-trip/rename, local workspace isolation, read-only stale checking, local no-write updates, remote preflight/verified writes, validation diagnostics, clipboard-only use creation, publish ordering and manual-paste reindexing.

Browser/real-GitHub acceptance must additionally prove the rendered comments are invisible, the always-available searchable list and create modal survive ordinary rerenders, stale uses are yellow only after Check, usage navigation selects the intended same-line occurrence, local actions produce no PUT, GitHub actions preflight/read-back correctly and workspace switching does not leak local state.

## 15. Deferred

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

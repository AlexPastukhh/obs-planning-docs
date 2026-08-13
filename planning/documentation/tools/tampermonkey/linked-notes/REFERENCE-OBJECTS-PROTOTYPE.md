# Repository Reference Objects Prototype Slice

Status: implementation prototype / automated focused evidence available / browser and real-GitHub acceptance pending
Prototype host: Linked Notes `0.7.1-prototype`
Definitions File: `.linked-notes/reference-objects.json`

## 1. Purpose

This slice adds a narrow repository-native Reference Object helper to the Files workspace. It does not reinstate the former generic managed-object architecture.

A Reference Object has one stable id, a mutable display name, one definition marker and zero or more materialized use markers in ordinary repository text/Markdown.

```text
<!-- obs-ref:def id="ro_example" -->canonical value<!-- /obs-ref:def -->
<!-- obs-ref:use id="ro_example" -->materialized value<!-- /obs-ref:use -->
```

HTML comments are visible in Source and invisible in rendered Markdown. Marker-looking text inside fenced code blocks or inline code spans is treated as literal code/example content rather than a live Reference Object marker.

## 2. Repository Contract And Definitions File

The repository-facing rules live in `.linked-notes/REFERENCE-OBJECTS.md`, with `.linked-notes/README.md` as the convention entry point. Those files are intentionally readable by humans and AI agents: a synchronized value in a generated/edited document must use a complete `obs-ref:use` marker resolved from an existing stable object ID, and definition changes remain stale until an explicit Check/Update action.

`.linked-notes/reference-objects.json` stores only routing/index metadata:

```text
id
name
definition path
rebuildable uses: path + line + lineOccurrence
```

Canonical value is never copied into the Definitions File. It is read from the one definition marker.

## 3. Local-First Prototype State

Reference Object changes are local by default. Pending complete-file replacements are stored through the userscript value store under an exact workspace/repository/branch key with the GitHub base SHA. Complete local drafts preserve existing line endings and surrounding text outside explicit marker-range edits.

Local actions include:

- create definition;
- rename;
- save an edited repository file as a local Reference Object draft;
- update stale uses locally;
- Definitions File index changes caused by manually pasted use markers.

They perform no GitHub write.

`Apply local changes to GitHub` is explicit, preflights every pending base before the first write, writes content files before the Definitions File and uses verified read-back.

## 4. Create And Use

`Create Reference Object` accepts pasted exact text. Find returns every eligible exact occurrence. Same-line matches are numbered left-to-right. The user selects one and names the object; only that occurrence is wrapped locally.

`Copy reference` copies a complete materialized `obs-ref:use` marker. It never inserts into the editor automatically. The user pastes it through ordinary repository file editing.

## 5. Check, Update And Validate

`Check uses` is read-only and marks stale uses in the UI. A zero-stale/no-index-drift `Update locally` is a true no-op and creates no pending draft.

Two update actions remain distinct:

```text
Update locally → local complete-file drafts only;
Update GitHub  → current remote definition/use state + verified remote writes.
```

Independent remote usage update is blocked while local Reference Object drafts are pending, so unsynced local definition changes cannot silently become the basis for a different remote action.

`Validate tags` separately checks marker syntax/identity and Definitions File/index consistency. It does not repair files automatically.

## 6. Explicit Scan Bounds

Repository-wide check/validation is explicit and cancellable through the Files read lifecycle. The prototype bound is 80 directories, 300 supported text files, 4 MiB aggregate and 512 KiB per file. No background indexer is created.

## 7. UI

The Files workspace gains an always-available searchable `Reference objects ▾` menu.

Each object exposes Copy, Open definition, Check, local/remote update, local Rename and an expandable usage list. Usage rows show path, current line and same-line occurrence number; checked stale values are highlighted yellow. Clicking a use opens the file in source view and focuses the exact marker occurrence, including distinct `#1/#2/#3` uses on the same line.

The create modal and open Reference Objects menu are restored across the base UI's destructive rerenders when the exact repository workspace context remains unchanged.

## 8. Safety

- exact source matching only;
- no source guessing;
- no automatic use insertion;
- no automatic stale propagation;
- no write from Check or Validate;
- local state isolated by exact workspace/repository/branch;
- SHA/absence preflight before publishing local drafts;
- exact read-back for GitHub text writes;
- partial multi-file writes are explicit, never reported as atomic success.

## 9. Evidence

Focused automated tests cover marker parsing/selection, registry codec, local store isolation, service check/update/validation and runtime orchestration including clipboard-only use creation, local no-write behavior, publish ordering and manual-paste reindexing.

The complete repository verifier must still pass after the new modules are built into `linked-notes-prototype.user.js`. Browser and real-GitHub acceptance remains required before the slice is treated as accepted runtime evidence.

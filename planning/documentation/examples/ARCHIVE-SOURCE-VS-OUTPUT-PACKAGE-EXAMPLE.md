# Archive Source vs Output Package Example

Status: supporting reusable example
Doc version: v0.4.0-producer-consumer-boundary
Scope: demonstrates archive read-source mode, explicit source selection and the current producer-only `давай архив` package handoff. Legacy reviewable package commands remain separate routes.

## `арх`

```text
Meaning:
  Use an explicitly selected archive as a read-source snapshot.

Output:
  answer/review/plan based on the selected archive.

Boundary:
  Do not create a replacement archive unless separately requested.
  Do not silently treat an earlier-message archive as current.
```

## `давай архив`

```text
Meaning:
  Produce one replacement ZIP plus one OBS-ACTION handoff.

Output:
  PACKAGE.json + required base/replacement payloads in ZIP;
  short OBS-ACTION/1 block in chat.

Boundary:
  Stop at producer handoff.
  Do not generate local apply/diff/finalization PowerShell.
```

## Source-Selection Scenarios

### A. Explicitly selected snapshot

```text
A snapshot/archive is explicitly provided or selected for the active invocation
(including as the response to a request for missing exact source).

Result:
  inspect it;
  require intended repository/target match;
  require complete touched-source coverage;
  then it may become the selected source.
```

Same-message attachment is convenient, not uniquely privileged.

### B. Earlier-message archive with no current selection

```text
Result:
  do not treat it as current automatically;
  use fully readable current repository files or explicitly select/reconcile source.
```

### C. Current repository is fully readable

```text
Result:
  use current repository source;
  do not request a snapshot merely because one was used earlier.
```

### D. Exact touched base is unavailable

```text
Result:
  request the minimum fresh source/snapshot needed;
  never guess replace/delete base bytes.
```

### E. Package base differs from local consumer state

```text
The producer package can still be valid for its selected source.
The local Replacement Package App verifies actual touched state before mutation.

Result on mismatch:
  BASE_MISMATCH / STATE_DIVERGED as appropriate;
  no silent hash edit and no blind replacement;
  rebuild or explicitly reconcile source/state.
```

## Legacy Reviewable Package Route

`давай архив с review diff file` is not an extension of the new producer-only runtime. It explicitly owns its legacy apply/diff/review behavior through its own command `ownerFiles`.

Owner routes:

```text
planning/planning-use-case-map.md
planning/commands/build-replacement-archive.command.md
planning/documentation/build-replacement-archive-workflow.md
planning/documentation/tools/replacement-package-app/PACKAGE-PROTOCOL.md
```

This example demonstrates behavior only. Canonical command/protocol owners win.

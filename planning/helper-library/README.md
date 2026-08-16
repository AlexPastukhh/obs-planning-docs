# Planning Helper Local Library

Status: active repository backup format for optional Planning Helper helper commands/prompts
Scope: repository copies of user-authored local helper commands and arbitrary reusable prompts. This folder is not planning-command authority.

## Boundary

```text
planning/commands/*.command.md
  = real planning commands with route/owners/permissions;

planning/helper-library/commands/*.helper-command.md
  = exact helper command text;

planning/helper-library/prompts/*.prompt.md
  = exact reusable prompt text.
```

A helper-library file never registers a planning command or grants command permissions.

## RAM-First Local Model

The browser-local Planning Helper snapshot is the runtime working copy. After startup the validated helper records are materialized in RAM. Search, Insert, Copy, Edit and Delete use RAM/local persistence only and never read GitHub. Helper commands and prompts share this exact runtime path: a prompt is not fetched or normalized again when clicked; its saved `text` is taken from the in-memory record, copied to the clipboard first and then passed unchanged to composer insertion.

There is no repository-library Refresh/Sync action.

If local storage is lost, `Copy recovery request` asks ChatGPT to read the repository helper-library files and return the complete current set of exact `[PLANNING_HELPER_LIBRARY_ITEM]` blocks. `Restore from GitHub copy` reconciles repository-backed helper commands/prompts to that complete set, removes stale repository-backed records that are absent, preserves local-only/unbacked helper items, and performs zero GitHub requests/writes.

## Create-Only Repository Backup

When `Import from ChatGPT` introduces a helper item that is locally new or locally marked as not yet repository-backed, the helper saves it locally first and may then attempt one create-only GitHub Contents PUT to its deterministic path.

```text
create-only backup
  → no preliminary GET/listing
  → no read-back GET
  → no UPDATE existing file
  → no DELETE
  → conflict if the target already exists
  → local record remains even when backup fails
```

Editing or deleting an existing local helper item never updates/deletes the repository copy. Repository content is therefore an append-only/cold backup from the helper runtime, not a live synchronized database.

## File Paths

Only these deterministic direct-child paths are valid:

```text
planning/helper-library/commands/<id>.helper-command.md
planning/helper-library/prompts/<id>.prompt.md
```

Nested files are not helper-library records in this format.

## Document Contract

Each file contains exactly one line-delimited `[PLANNING_HELPER_LIBRARY_ITEM]` JSON marker with schema `1`:

```text
{
  "schemaVersion": 1,
  "kind": "command | prompt",
  "id": "stable-path-safe-id",
  "title": "display title",
  "text": "exact text inserted/copied by the helper",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

`kind`, filename suffix and directory must agree. Unknown fields are rejected. `text` is not trimmed; CRLF normalizes to LF. Marker-looking text inside the prompt is ordinary content unless the marker occupies its own document line. Titles are one printable line.

## Security

Do not put GitHub tokens or other secrets in helper-library records. The Planning Helper token remains in its own Tampermonkey GM key and is used only for explicit create-only backup attempts.

## Legacy Migration

Older browser-local command/library/cache records may be migrated once into `obsPlanningHelper:v2:localSnapshot`. Legacy keys are not deleted by this migration. No GitHub request is made during migration.

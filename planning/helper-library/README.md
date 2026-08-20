# Planning Helper Local Library

Status: active repository format for optional Planning Helper helper commands/prompts
Scope: repository copies of user-authored helper commands and arbitrary reusable prompts. This folder is not planning-command authority.

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

`Import from ChatGPT` is also local-only. Repository I/O is never implicit in import or insertion.

Application-level repository actions and acceptance rules are owned by:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md
  → current `SCN-PH-*` Scenario owner
```

## Explicit Repository Check / Sync / Save

Helper commands and prompts support three explicit GitHub actions:

```text
Check GitHub
  → list direct command/prompt repository metadata;
  → compare local/GitHub counts and deterministic path/name sets; same-path means path overlap, not content equality;
  → do not mutate local state;

Sync missing
  → identify repository paths absent locally;
  → GET only those missing file bodies;
  → parse/validate and add them to the local snapshot;
  → never overwrite a same-path local helper item;

Save GitHub
  → operate on one local helper command/prompt;
  → read its deterministic remote target;
  → create when absent;
  → no-op when exact rendered bytes already match;
  → update with the current remote SHA when different;
  → require exact read-back verification after a write.
```

Repository Delete is not implemented. Local Delete removes only the local snapshot record.

If local storage is lost, `Copy recovery request` + `Restore from GitHub copy` remains available as a ChatGPT-mediated/manual fallback and performs zero GitHub requests from the helper during restore.

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

Do not put GitHub tokens or other secrets in helper-library records. The Planning Helper token remains in its own Tampermonkey GM key and is used only by explicit Check GitHub, Sync missing and Save GitHub actions.

## Legacy Migration

Older browser-local command/library/cache records may be migrated once into `obsPlanningHelper:v2:localSnapshot`. Legacy keys are not deleted by this migration. No GitHub request is made during migration.

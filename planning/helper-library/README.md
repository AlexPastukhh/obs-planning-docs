# Planning Helper Prompt / Module / Legacy Insertion Library

Status: active prompt/module repository format + legacy helper-command compatibility
Scope: reusable prompt insertion text, reusable prompt modules, and historical helper-command insertion records. Real Planning Commands are owned and edited through `planning/commands/*.command.md`; this folder is never planning-command authority.

<a id="planning-helper-library-contract"></a>
## Boundary

Responsibility ID: `HELPER.LIBRARY-COMPATIBILITY`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Planning Command Definition Contract`](../commands/README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT`
> - `CONTEXTUALIZES` [`Planning Helper Semantic Projection`](../documentation/tools/tampermonkey/chat-command-palette/README.md#planning-helper-semantic-projection) — `HELPER.SEMANTIC-PROJECTION`

```text
planning/commands/*.command.md
  = real planning commands with route/owners/permissions;

planning/helper-library/commands/*.helper-command.md
  = legacy compatibility insertion text only; new command authoring uses real `planning/commands/*.command.md`;

planning/helper-library/prompts/*.prompt.md
  = exact reusable prompt text;

planning/helper-library/modules/*.module.md
  = reusable text blocks referenced from prompts/modules as `[[module:<id>]]`.
```

A helper-library file never registers a planning command or grants command permissions.

## RAM-First Local Model

The browser-local Planning Helper snapshot is the runtime working copy. After startup the validated helper records are materialized in RAM. Search, Insert, Copy, Edit and Delete use RAM/local persistence only and never read GitHub. Prompts, Modules and legacy helper-command records use this local compatibility runtime path. Stored Prompt text keeps module references; immediately before Prompt Run/Copy the runtime recursively resolves `[[module:<id>]]` from the current in-memory Module records, fails closed on missing references/cycles, then copies/inserts the resolved text. Module records themselves are never planning-command authority. The current `Commands` surface creates/edits structured Planning Command definitions instead.

`Import from ChatGPT` is also local-only. Repository I/O is never implicit in import or insertion.

Application-level repository actions and acceptance rules are owned by:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md
  → current `SCN-PH-*` Scenario owner
```

## Explicit Repository Check / Sync / Save

Prompts, Modules and legacy helper-command compatibility records support the helper-library GitHub actions below. Real Planning Commands use the command repository service from the same Commands surface:

```text
Check GitHub
  → list direct command/prompt/module repository metadata;
  → compare local/GitHub counts and deterministic path/name sets; same-path means path overlap, not content equality;
  → do not mutate local state;

Sync missing
  → identify repository paths absent locally;
  → GET only those missing file bodies;
  → parse/validate and add them to the local snapshot;
  → never overwrite a same-path local helper item;

Save GitHub
  → operate on one local helper command/prompt/module;
  → read its deterministic remote target;
  → create when absent;
  → no-op when exact rendered bytes already match;
  → update with the current remote SHA when different;
  → require exact read-back verification after a write.
```

Repository Delete is not implemented. Local Delete removes only the local snapshot record. A Module that is still referenced by a Prompt or another Module cannot be deleted locally until those references are removed.

`Save all GitHub` persists all pending local direct-command/helper-library changes and the current catalog-order/grouping snapshot in one explicit repository action. Per-row Prompt/Planning Command save also persists the current catalog order so a newly saved ordered item cannot be published without its current position.

If local storage is lost, `Copy recovery request` + `Restore from GitHub copy` remains available as a ChatGPT-mediated/manual fallback and performs zero GitHub requests from the helper during restore.

## File Paths

Only these deterministic direct-child paths are valid:

```text
planning/helper-library/commands/<id>.helper-command.md
planning/helper-library/prompts/<id>.prompt.md
planning/helper-library/modules/<id>.module.md
```

Nested files are not helper-library records in this format.

## Document Contract

Each file contains exactly one line-delimited `[PLANNING_HELPER_LIBRARY_ITEM]` JSON marker with schema `1`:

```text
{
  "schemaVersion": 1,
  "kind": "command | prompt | module",
  "id": "stable-path-safe-id",
  "title": "display title",
  "text": "exact text inserted/copied by the helper",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

`kind`, filename suffix and directory must agree. Unknown fields are rejected. `text` is not trimmed; CRLF normalizes to LF. Marker-looking text inside the prompt is ordinary content unless the marker occupies its own document line. Titles are one printable line. Module IDs are stable reference keys matching `[a-z0-9][a-z0-9._-]{0,79}`; changing a Module title does not change its reference. Nested module references are allowed, but cycles and unresolved references block Prompt Run/Copy.

## Security

Do not put GitHub tokens or other secrets in helper-library records. The Planning Helper token remains in its own Tampermonkey GM key and is used only by explicit Check GitHub, Sync missing, Reload GitHub and Save GitHub actions.

## Legacy Migration

Older browser-local command/library/cache records may be migrated once into `obsPlanningHelper:v2:localSnapshot`. Legacy keys are not deleted by this migration. No GitHub request is made during migration.

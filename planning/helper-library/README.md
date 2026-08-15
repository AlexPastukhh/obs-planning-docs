# Planning Helper Local Library

Status: active repository format for optional Planning Helper library persistence
Scope: repository copies of user-authored local helper commands and arbitrary reusable prompts. This folder is not planning-command authority.

## Boundary

```text
planning/commands/*.command.md
  = real planning commands with route/owners/permissions;

planning/helper-library/commands/*.helper-command.md
  = exact helper command text authored/saved locally;

planning/helper-library/prompts/*.prompt.md
  = exact reusable prompt text authored/saved locally.
```

Saving a helper-library item to GitHub does **not** register a planning command, change `planning/planning-use-case-map.md`, grant permissions or create owner routing.

## Local-First Model

Planning Helper GM storage is the editable local working copy. `Repo` is a separate explicit persistence action.

```text
New/Edit
  → Save local
  → local GM library only;

Repo
  → preview configured repository identity + deterministic target + SHA/absence
  → explicit Save to GitHub
  → exact read-back verification;

Refresh repo library
  → list repository helper commands/prompts
  → compare listed GitHub SHA with the long-lived GM repository snapshot
  → download only new/changed file content
  → local copy wins for same kind + id.
```

Repository-only items remain usable for insert/copy. Use `Save local` to create an editable local copy before changing them.

The repository snapshot is local-first and does not expire automatically. It stores each fetched item together with its repository path, GitHub SHA and fetch timestamp, scoped to the exact configured `owner/repository@branch`. Startup and ordinary Insert/Copy/Edit operations never refresh it automatically. A snapshot can remain usable offline for days or months until the user explicitly refreshes, changes repository identity or clears Tampermonkey GM storage.

After a verified `Repo` write, the exact read-back result updates only that one snapshot record. The helper does not rescan or redownload the rest of the helper library. A later explicit refresh reconciles additions, changes and repository deletions. Deleting a repository record from the snapshot never deletes a same-kind/same-id local copy.

## File Discovery

Only direct children with these suffixes are library records:

```text
planning/helper-library/commands/<id>.helper-command.md
planning/helper-library/prompts/<id>.prompt.md
```

Nested files are not scanned by the first runtime slice. IDs are lowercase ASCII path-safe identifiers. Delete-from-GitHub is not implemented.

## Document Contract

Each file contains exactly one `[PLANNING_HELPER_LIBRARY_ITEM]` JSON marker with schema `1`:

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

`kind`, filename suffix and directory must agree. Unknown fields are rejected. The item text is preserved without trimming (textarea/CRLF line endings normalize to LF), so leading/trailing spaces and blank lines remain part of the saved insertion text. Marker delimiters are recognized only as their own lines, so marker-looking text inside a prompt is ordinary prompt content. Titles are single printable lines. Repository content is UTF-8 and exact read-back is required after writes.

## Security

Do not put GitHub tokens, passwords or other authentication secrets in helper commands/prompts intended for repository persistence. Planning Helper stores its GitHub token only in its private GM key and never writes the token into this folder.

## Legacy Local Command Migration

The previous browser-local projection registry may still exist at:

```text
obs-planning-helper-command-projections-v1
```

The modular helper reads it idempotently when available and creates local helper-command items in GM storage without deleting the legacy key. This preserves old locally saved command projections while keeping them distinct from real repository planning commands.

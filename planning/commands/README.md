# OBS Planning Command Registry

Status: active project command-definition registry
Scope: repository-owned concrete command definitions used by the root planning router, AI/chats and the modular Planning Helper.

## Authority

```text
planning/planning-use-case-map.md
  = mandatory root command-system entrypoint and shared routing/global policy;

planning/commands/*.command.md
  = individual concrete command definitions;

linked owner workflows/templates/area docs
  = reusable or local behavior algorithms;

Tampermonkey Planning Helper
  = projection/editor/runtime, not command meaning authority.
```

Read `planning/planning-use-case-map.md` first. Then resolve the selected command from this folder and read its `ownerFiles`.

## Discovery

A command definition is active when it is a **direct child** of this folder and its filename ends with `.command.md`.

```text
planning/commands/<name>.command.md
```

V1 does not scan nested folders. `README.md` is navigation/contract documentation and is not itself a command. There is no separate command-registry JSON file. The direct command files are the registry.

## Definition Format

Every command file contains exactly one marker block:

```text
[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "stable.command.id",
  "file": "example.command.md",
  "command": "canonical command",
  "englishName": "canonical English name",
  "commandFamily": ["canonical command", "alias"],
  "description": "compact palette description",
  "meaning": "route meaning",
  "activeContextBehavior": "...",
  "traversalReadMode": "...",
  "ownerFiles": ["planning/..."],
  "expectedOutput": "...",
  "permissionMode": "...",
  "keyReminders": ["..."],
  "userTarget": "<placeholder>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
```

The JSON is intentionally strict so repository writes, build-time validation and AI-generated definitions use one parseable representation. Markdown outside the marker is human navigation only.

## Required Invariants

- `schemaVersion` is `1`.
- `id`, `file`, `command`, `englishName`, `meaning`, `activeContextBehavior`, `traversalReadMode`, `expectedOutput`, `permissionMode` and `userTarget` are non-empty.
- `file` equals the actual direct-child filename.
- `commandFamily` contains the canonical `command` exactly.
- IDs, canonical commands and aliases are unique across the complete catalog.
- `ownerFiles` and `keyReminders` are arrays of strings.
- `palette` is boolean. `false` keeps a registered command out of the normal palette without making it unregistered.
- refinements contain only compact owner-read instructions; they do not duplicate owner algorithms.

## Creating Or Updating A Command

Normal repository workflow:

1. Plan/accept the command route and owner semantics.
2. Create or update exactly one direct `*.command.md` file.
3. Validate the complete catalog.
4. Update root/global command-system documentation only when shared routing rules change.
5. Update examples/navigation only when affected.

The Planning Helper treats this repository catalog as durable authority/backup but does **not** read it during normal browser operation. Commands are loaded from one browser-local snapshot into RAM. If that local snapshot is lost, ChatGPT can read the repository and return the complete current set of exact `[PLANNING_COMMAND_DEFINITION]` blocks. Restore reconciles the repository-backed local command set to that complete pasted set while preserving any explicitly local-only/unbacked records.

When a ChatGPT import introduces a locally new or locally-unbacked command, the helper may attempt one **create-only** GitHub Contents write to the deterministic direct `planning/commands/*.command.md` path. It performs no preliminary GET, no catalog listing, no read-back GET and no update/delete fallback. An existing remote path is a conflict; the local command remains intact. Re-importing an existing local command updates only local state and never writes GitHub.

Deleting or updating existing repository command files is not part of the Planning Helper runtime.

## Not The Helper Local Library

`planning/helper-library/commands/*.helper-command.md` and `planning/helper-library/prompts/*.prompt.md` are optional user-authored Planning Helper library records. They contain exact insertion text and are **not** command routes, do not participate in this catalog, and do not gain planning-command authority from being stored in GitHub. Their contract is owned by `planning/helper-library/README.md`.

## Planning Helper

Developer/build entry:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
```

Generated install artifact:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

The generated userscript bundles the valid command catalog at build time as an offline fallback. At runtime the helper uses the browser-local snapshot/RAM model only; there is no repository command refresh. Recovery after local-state loss is ChatGPT-mediated: ChatGPT reads the current repository and returns exact marker blocks for local restore.

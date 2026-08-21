# OBS Planning Command Registry

Status: active project command-definition registry
Scope: repository-owned concrete command definitions used by the root command router, AI/chats and the modular Planning Helper.

## Authority

```text
planning/command-routing.md
  = mandatory root command-system entrypoint and shared routing/global policy;

planning/commands/*.command.md
  = individual concrete command definitions;

linked owner workflows/templates/area docs
  = reusable or local behavior algorithms;

Tampermonkey Planning Helper
  = projection/editor/runtime for real Planning Commands and local drafts, not command meaning authority.
```

Read `planning/command-routing.md` for explicit command routing, then resolve the selected direct definition and its `ownerFiles`. Use semantic registries for capability discovery/context.

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

The Planning Helper Commands surface can create/edit a validated local command-definition draft. `Save GitHub` reads/validates the complete direct remote command catalog, then creates or updates the deterministic `planning/commands/*.command.md` target with optimistic SHA protection and exact verification. `Reload GitHub` explicitly replaces one local command draft with the current remote command. Repository command deletion/retirement remains outside the Helper runtime and requires the separate authorized documentation/command-maintenance route.

## Helper Library Boundary

`planning/helper-library/prompts/*.prompt.md` contains reusable prompt insertion text and is not command authority. Historical `planning/helper-library/commands/*.helper-command.md` records are legacy compatibility insertions only: the current UI does not create them, and they never become Planning Commands. Their compatibility contract is owned by `planning/helper-library/README.md`.

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

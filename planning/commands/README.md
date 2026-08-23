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
  "directionIds": ["DIR-..."],
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
- optional `directionIds` contains current Direction IDs for standalone palette/orchestration placement when the command is not a semantic UC's direct command; every listed Direction must exist.
- one high-level command may orchestrate several existing UCs/Scenario owners when that gives a useful stable invocation surface. This never creates a semantic UC or lets the command own their algorithms.
- refinements contain only compact owner-read instructions; they do not duplicate owner algorithms.
- result-producing commands may depend on reusable governance through `ownerFiles` / their semantic owner route; the shared command router reuses current governance, refreshes affected owners proportionally, and performs a full internal preflight only when no reliable sufficient governance context exists. A source snapshot/commit/branch change alone does not force a full reread.

## Creating Or Updating A Command

Normal repository workflow:

1. Plan/accept the command route and owner semantics.
2. Create or update exactly one direct `*.command.md` file.
3. Validate the complete catalog.
4. Update root/global command-system documentation only when shared routing rules change.
5. Update examples/navigation only when affected.

The Planning Helper treats this repository catalog as durable authority/backup while normal browser operation remains local-first. Commands are loaded from one browser-local snapshot into RAM. Explicit `Hard Reload GitHub` reads the complete current direct command catalog and replaces the repository-backed local command cache; `Sync missing` remains incremental. ChatGPT-mediated marker-block restore is a fallback/debugging route, not the only repository recovery path.

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

Build generates `seed/commands.json` from the direct command catalog as a verified repository projection; current command identities are not maintained as hard-coded userscript authority. Runtime remains browser-local/RAM-first, while explicit `Reload`, `Sync missing` and `Hard Reload GitHub` provide repository reads/recovery. Generated projections never replace `planning/commands/*.command.md` as authority.

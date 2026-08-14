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

The Planning Helper may perform an explicit GitHub Create/Update for command files only. `Parse & Preview` must validate the complete pasted batch and merged remote catalog, capture the exact repository identity (`owner/repository@branch`), current command-catalog snapshot plus each update target SHA/each create absence expectation, and confine targets to direct `planning/commands/*.command.md`. `Save` must use that exact preview plan rather than reclassifying or retargeting against newer settings/remote state; if repository identity or the command catalog changed after Preview, stop before writes and require a new Preview. Repository operations are serialized so a save cannot overlap refresh/preview/settings changes. Every successful write uses exact read-back verification, and partial multi-file results are reported honestly.

Deleting command files is not part of the first repository-write slice.

## Planning Helper

Developer/build entry:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
```

Generated install artifact:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

The generated userscript bundles the valid command catalog at build time as an offline fallback. `Refresh repository commands` can load the current repository catalog without reinstalling the userscript.

# OBS Planning Use-Case Map

Status: active project-specific root command-system router
Doc version: v0.14.0-local-helper-runtime
Scope: mandatory OBS command-system entry and shared routing/global policy. Individual concrete command definitions live in `planning/commands/`. Dashboard planning is performed in the Dashboard UI and is not exposed as a command family.

## 1. Authority Model

```text
planning/planning-use-case-map.md
  = mandatory root command-system entry and shared/global command policy;

planning/commands/README.md
  = command-registry discovery/format/navigation contract;

planning/commands/*.command.md
  = individual concrete command routes, aliases, canonical English names,
    active-context behavior, read mode, owners, output and permissions;

reusable workflow/template docs
  = reusable behavior/output algorithms;

area docs
  = local application details;

Tampermonkey
  = generated projection/editor runtime, never command meaning authority.
```

Do not use `planning/documentation/field-kits/root-use-case-map-field-kit.md` as a runtime router after this root file exists.

## 2. Command Resolution

For every command invocation:

```text
1. Start here.
2. Read `planning/commands/README.md` when the registry contract is not current.
3. Resolve the direct `planning/commands/*.command.md` definition whose `commandFamily` contains the user trigger.
4. Read that command definition.
5. Follow that command definition's `ownerFiles` and traversal/read-mode requirements.
6. Keep its permission boundary.
```

The direct command files are the concrete registry. Do not reconstruct a command from the Tampermonkey userscript or from memory when its command file is available.

## 3. Explicit-Input Rule For Planning Responses

For `план файл-обновление`, `планируй`, `спланируй команду` and planning parts of `положняк`:

```text
- Treat only explicit user statements and checked source facts as confirmed.
- Do not silently turn an unanswered decision into a user decision.
- When an important planning detail is missing, show a compact question table ordered by impact and uncertainty.
- Each unanswered question may include one conservative fallback instruction.
- A displayed fallback is temporary for the current output and can be overridden by the user.
- A fallback never authorizes commit, push, deletion, destructive action, unrelated files, scope expansion, invented deadlines or invented acceptance criteria.
```

## 4. Command Naming And Registry Rules

```text
- Every command family has one canonical command and one canonical English name.
- The direct command definition owns those values.
- `commandFamily` contains the canonical command exactly plus accepted aliases.
- IDs, canonical commands, files and aliases must be unambiguous across the complete registry.
- One direct `*.command.md` file represents one command.
- V1 command discovery does not scan nested directories.
- `palette: false` means registered but not shown in the normal Commands list.
- No separate command-registry JSON file exists.
```

Current concrete command definitions are direct children under:

```text
planning/commands/
```

## 5. Shared Permission / Output Rules

A command definition may be read-only, plan-only, package-producing, staging-only or another explicit mode. No mode silently expands into local Git commit/push.

Archive/package commands retain the shared review boundary:

```text
package creation
  → apply with exact local base verification
  → capture full UTF-8 diff
  → user pastes diff
  → assistant reviews diff
  → only an approved diff receives a combined commit+push command.
```

The detailed package and PowerShell Git runtime contract remains in `planning/documentation/reviewable-agent-output-and-commands-workflow.md` and `planning/documentation/documentation-update-workflow.md`.

## 6. Dashboard / Operational Boundary

Dashboard planning itself is not a command family. Day/week/month/period/year/goal planning is entered in the Dashboard manually or through its documented local JSON/Markdown sync paths.

The registered `end session` command is defined at:

```text
planning/commands/end-session.command.md
```

and remains bounded to the existing active operational-day workflow described by its owner files.

## 7. Tampermonkey Projection, Local Recovery And Repository Backup

Projection/build owners:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
```

Generated install artifact:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Rules:

```text
- command bodies are generated from repository command definitions;
- the bundled catalog is a build-time fallback, not authority;
- normal Planning Helper startup, search, tab switching, Insert, Copy, local edit and restore use only the browser-local snapshot/RAM state and do not read GitHub;
- the helper has no repository Refresh/Sync action;
- if local state is lost, the helper can copy a recovery request for ChatGPT; ChatGPT reads the repository and returns the complete current command/helper marker set, which Restore uses to reconcile repository-backed local records while preserving local-only/unbacked records, without contacting GitHub;
- when an explicit ChatGPT import introduces a locally new/unbacked planning command, helper command or prompt, the helper may attempt one create-only GitHub Contents PUT to its deterministic repository path;
- create-only backup sends no preliminary GET, no read-back GET and no UPDATE/DELETE fallback; an already-existing path is reported as a conflict while the local record remains intact;
- existing local records imported again are updated locally only and never cause a GitHub write;
- the helper never runs local Git, commit or push.
```

## 8. Source Notes

Sources:
  Format/process:
    - `planning/documentation/use-case-map-workflow.md`
    - `planning/documentation/command-planning-workflow.md`
    - `planning/documentation/reviewable-agent-output-and-commands-workflow.md`
    - `planning/commands/README.md`
  Content:
    - migrated current command routes from the former root-UCM command tables;
    - user-confirmed repository command registry and modular Planning Helper direction;
    - user-confirmed RAM-first/local-recovery/create-only GitHub backup direction.

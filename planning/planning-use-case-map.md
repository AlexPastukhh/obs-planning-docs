# OBS Planning Use-Case Map

Status: active project-specific root command-system router
Doc version: v0.16.0-command-specific-package-boundaries
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

For `собери идеи`, `план файл-обновление`, `планируй`, `спланируй команду` and planning parts of `положняк`:

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

The concrete command definition owns its package/application/review/finalization behavior. Do not infer one shared archive/package workflow from the command type alone. Follow additional package, review or Git runtime rules only when the selected command definition states them directly or explicitly lists owner files that own them.

Legacy/reviewable package routes may still opt into local base verification, diff capture and reviewed finalization workflows. Other package-producing commands may stop at a package/handoff boundary. The selected route decides.

## 6. Dashboard / Operational Boundary

Dashboard planning itself is not a command family. Day/week/month/period/year/goal planning is entered in the Dashboard manually or through its documented local JSON/Markdown sync paths.

The registered `end session` command is defined at:

```text
planning/commands/end-session.command.md
```

and remains bounded to the existing active operational-day workflow described by its owner files.

## 7. Tampermonkey Projection, Local State And Explicit Repository Sync

Projection/build owners:

```text
planning/documentation/tampermonkey-command-projection-workflow.md
planning/documentation/tools/tampermonkey/README.md
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
```

Planning Helper application semantic route:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/USE-CASE-REGISTRY.md
  → planning/documentation/tools/tampermonkey/chat-command-palette/USE-CASE-MAP.md
  → focused docs / src / tests / MANUAL-ACCEPTANCE.md
```

Generated install artifact:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Rules:

```text
- command bodies are generated from repository command definitions;
- the bundled catalog is a build-time fallback, not command meaning authority;
- normal Planning Helper startup, search, tab switching, Insert, Copy, local edit, local delete and ChatGPT import use only the browser-local snapshot/RAM state and do not read GitHub;
- the helper may read/write GitHub only after an explicit user repository action described by its application use-case owner;
- Check GitHub compares direct repository path/name inventories and counts for planning commands, helper commands and prompts without mutating local state; same-path means inventory overlap, not content equality;
- Sync missing reads only repository paths absent from the local snapshot, validates them, and adds them locally without overwriting a same-path local record;
- Save GitHub may create or update one local planning command, helper command or prompt at its deterministic repository path using current remote state/SHA and exact read-back verification;
- planning-command Save GitHub validates the complete direct remote command catalog before writing;
- changing repository owner/repository/branch invalidates per-record repository evidence metadata before activating the new source while preserving local content;
- repository deletion is not part of this slice; local Delete remains local-only;
- if local state is lost, the existing ChatGPT-mediated marker recovery path remains available as a manual/offline fallback;
- the helper never runs local Git, commit or push.
```

The repository-sync feature must remain disconnected from composer insertion. A GitHub timeout/failure may fail an explicit repository action, but must not be on the normal Insert/Copy execution path.

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
    - user-confirmed RAM-first/local snapshot direction;
    - user-confirmed explicit GitHub check/save/sync for Planning Helper commands and prompts while keeping insertion network-independent;
    - user-confirmed command-specific package/review/finalization behavior instead of one root-level archive workflow.

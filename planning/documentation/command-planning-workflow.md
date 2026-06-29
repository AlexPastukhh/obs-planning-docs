# Command Planning Workflow

Status: active reusable documentation-layer command planning workflow
Doc version: v0.6.0-canonical-plan-command
Scope: rules-based planning for new or changed command routes, canonical English names, owner semantics, examples, user-facing PowerShell Git output and optional Tampermonkey projection in projects using the reusable documentation layer.

## 1. Purpose

Use this workflow for the command family:

```text
спланируй команду
plan command
```

`спланируй команду` is the canonical command and `plan command` is its canonical English trigger/name. This route is plan-only and does not authorize file creation, editing, archive creation, commit or push.

A command route must be planned from current principles, owner workflows and templates, not by copying a previous row blindly.

## 2. Command Composition

```text
спланируй команду
  = documentation-principles preflight
  + plan file update
  + command-specific owner reads
```

The route first establishes documentation architecture and ownership, then produces a file-update plan for the command route. It does not implement that plan.

## 3. Source Of Truth

```text
Primary route owner:
  planning/planning-use-case-map.md

Documentation preflight:
  planning/documentation/documentation-principles-read-workflow.md
  planning/documentation/planning-docs-architecture-principles.md
  planning/documentation/documentation-responsibility-map.md

File-update plan behavior and shape:
  planning/documentation/file-update-overview-workflow.md
  planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md

Reusable command/answer behavior and PowerShell Git runtime contract:
  planning/documentation/reviewable-agent-output-and-commands-workflow.md

Documentation archive/apply specialization:
  planning/documentation/documentation-update-workflow.md

Use-case map workflow and exact command-route shape:
  planning/documentation/use-case-map-workflow.md
  planning/documentation/USE-CASE-MAP-TEMPLATE.md

Example coverage:
  planning/documentation/example-coverage-workflow.md
  planning/documentation/examples/README.md

Reusable Tampermonkey projection, only when separately in scope:
  planning/documentation/tampermonkey-command-projection-workflow.md
  planning/documentation/tools/tampermonkey/README.md
  planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Tampermonkey is projection only and does not own command meaning, aliases, English names or permission boundaries.

## 4. Command Route Row Template

Every command route plan must use this shape:

```text
| Command / trigger | English name | Meaning | Active-context behavior | Traversal/read mode | Sources / owner files | Expected output |
|---|---|---|---|---|---|---|
| <canonical command and aliases> | <one canonical English display name> | <what the command means> | <active/missing-context behavior> | <reuse/targeted/full and read-source mode> | <owner files to read> | <output behavior and permission boundary> |
```

Each field is a rule slot, not only table presentation.

## 5. Canonical English Name Rule

Every command family must have exactly one canonical English name.

```text
canonical command:
  primary user-facing command, normally in the project's main language

English name:
  stable English display/projection name

aliases:
  additional trigger phrases in any language
```

Rules:

```text
- English name is required, not optional.
- English name is concise natural English, not an internal abbreviation.
- English name is separate from aliases.
- The concrete root UCM owns the accepted English name.
- Tampermonkey copies the UCM English name exactly.
- Changing an alias must not silently change meaning or permissions.
```

## 6. Command Planning Steps

```text
1. Run the documentation-principles preflight.
   - Use full mode when the route has not been read, is not remembered, or ownership/boundaries are uncertain.
   - Record checked and relevant not-checked sources.

2. Define the command family.
   - canonical command;
   - required canonical English name;
   - aliases and language variants;
   - command type: response modifier, output mode, file/update plan, audit, parallel work, implementation helper or other route type.

3. Identify owner semantics.
   - Reuse an existing workflow/template when it already owns the behavior.
   - Plan a new or updated reusable owner only when no suitable owner exists.
   - Do not place full reusable rules in the root UCM or an example.

4. Plan the root UCM route row.
   - Fill every command-route slot.
   - Make active-context behavior explicit.
   - Name the owner files.
   - Include a clear permission boundary.

5. Produce the file-update plan.
   - Use `file-update-overview-workflow.md` and `FILE-UPDATE-OVERVIEW-TEMPLATE.md`.
   - List proposed files, responsibilities, what/why, boundaries, checks and next action.
   - Treat only explicit user statements and checked facts as confirmed.

6. Validate user-facing PowerShell Git output when the command may emit it.
   - Apply the shared runtime contract from `reviewable-agent-output-and-commands-workflow.md`.
   - Require one physical `& { ... }` line, one paste, one Enter, non-interactive execution and `git --no-pager`.
   - Link `documentation-update-workflow.md` when archive/apply/diff specialization is relevant.
   - Do not duplicate the full runtime contract in the UCM row, example or Tampermonkey projection.

7. Decide example coverage.
   - Update the examples index when a non-trivial command/output workflow needs coverage.
   - Add a concrete example only when it demonstrates stable behavior without copying owner logic.

8. Decide project/workstream impact.
   - Update a relevant living project map only when the command belongs to an active long-running workstream.
   - Do not expand into unrelated maps.

9. Decide Tampermonkey projection separately.
   - `add now`, `defer` or `do not add`.
   - Default is `defer` unless helper projection is explicitly included.
   - A future helper profile uses the root UCM English name exactly.

10. Record applied documentation work only after implementation.
   - Append an action log only after real changed files are known.
   - Do not log planned or local-only work as applied.
```

## 7. Tampermonkey Decision Gate

```text
Tampermonkey decision:
  add now / defer / do not add

Default:
  defer unless the user explicitly includes helper projection in the planned scope.
```

Planning a helper change does not authorize editing the userscript. Implementation requires a separate file-update/archive action.

## 8. Required Answer Shape

```text
Documentation principles preflight:
  full / targeted refresh / already current

Checked:
  ...

Not checked:
  ...

Command family:
  canonical command and aliases

English name:
  one required canonical English name

Command type:
  ...

Owner semantics:
  ...

UCM row plan:
  ...

PowerShell Git runtime contract:
  applies / not applicable

Example coverage:
  required / covered / not needed / deferred

Tampermonkey decision:
  add now / defer / do not add

Boundaries:
  plan-only permissions

Next action:
  separate implementation authorization if approved

План файл-обновление:
  final planned-mode block from the file-update overview template
```

## 9. Do Not

```text
- Do not create a command only by copying a similar UCM row.
- Do not make Tampermonkey or an example the source of truth.
- Do not make the canonical English name optional.
- Do not treat `спланируй команду` or `plan command` as implementation permission.
- Do not create a command whose user-facing PowerShell Git output bypasses the shared one-line, non-interactive and no-pager contract.
- Do not duplicate the full PowerShell Git runtime contract inside UCM rows, examples or helper projections.
- Do not edit or create files from this command family.
- Do not create a replacement archive from this command family.
- Do not commit or push.
- Do not start unrelated command expansion.
- Do not create placeholder parallel workspaces or sync plans.
```

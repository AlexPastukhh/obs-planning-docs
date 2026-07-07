# Documentation Update Plan Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.4.0-step-actions-and-file-tables
Scope: plan-first workflow for non-trivial documentation changes.

## 1. Purpose

Use this before:

```text
- broad documentation changes;
- ownership or read-order changes;
- reusable workflow/template changes;
- command-routing changes;
- migrations and cleanup;
- replacement-package preparation.
```

Planning does not authorize implementation.

## 2. Sources

Prefer:

```text
1. project root UCM;
2. project root indexes/registers;
3. reusable documentation architecture and responsibility owners;
4. task-specific owner workflows/templates;
5. current target files;
6. relevant project-area files when local application is in scope.
```

Do not invent target files that have not been checked. Proposed new files may be planned explicitly.

## 3. Plan Shape

Use ordered actions when order, dependencies or cleanup safety matter.

```text
Target:
  <desired documentation/repository state>

Checked sources:
  <files actually read>

Update Step <ID>:
  Objective:
  Input state / dependencies:
  Expected resulting state:
  Actions:
    1. <concrete operation>
    2. <next operation>
    3. <review gate or deferral when applicable>
  Files:
    <per-step table: change / path / responsibility / what / why>
  Boundaries:
  Checks / exit criteria:
  Next step:

Global boundaries:
  <areas intentionally not changed>

Risks:
  <ownership / routing / duplication / stale-reference / migration risk>

Apply mode:
  direct edit / replacement archive / no artifact yet

Next action:
  <concrete next step>
```

The action list and per-step file table are complementary:

```text
Actions:
  own the operation sequence;

Per-step file table:
  owns affected paths, responsibilities, changes and reasons.
```

For the exact final overview shape, use:

```text
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
```

## 4. Step Design Rules

```text
- Make each step produce a reviewable resulting state.
- State the concrete action sequence explicitly for non-trivial steps.
- Do not expect the reader to infer operation order from file-table row order.
- Keep the numbered actions and per-step file table synchronized.
- Put prerequisites and migration gates before cleanup.
- List the files changed by that step and why they change there.
- Keep unrelated areas outside the step.
- Let one file appear in several logical steps when needed,
  but coordinate one final replacement during implementation.
- Use an aggregate file table only as a derived summary.
- Separate semantic migration, physical rename and cleanup when that reduces risk.
```

## 5. Package Planning

For a replacement package:

```text
- resolve the selected source snapshot;
- plan full replacement files, not patches;
- include exact base/result blob verification;
- include MANIFEST.md and APPLY.md;
- use git add -N for new files before diff capture;
- require pasted diff review before commit.
```

The archive source-selection contract belongs to:

```text
planning/documentation/reviewable-agent-output-and-commands-workflow.md
```

## 6. Do Not

```text
- Do not edit files during a plan-only pass.
- Do not treat a fallback as permission.
- Do not omit the action list for a non-trivial ordered step.
- Do not maintain an action sequence and file table that disagree.
- Do not delete or rename before migration checks pass.
- Do not duplicate owner rules across files.
- Do not create a new reusable owner when an existing owner can hold the rule.
- Do not commit or push before reviewed diff approval.
```

# File Update Overview Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.6.0-step-actions-and-file-tables
Scope: how to produce the final `План файл-обновление` block for non-trivial file, documentation, code or replacement-package work.

Use with:

```text
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
planning/planning-use-case-map.md
```

## 1. Purpose

Use this workflow when an answer plans, creates, reviews or applies changes to files or packages.

A file-update overview should make the planned repository transition understandable:

```text
current state
  → ordered update steps
  → explicit actions inside each step
  → per-step affected-file tables
  → checked resulting state
```

Do not use it as a generic conclusion for ordinary discussion.

## 2. Required Content

A non-trivial plan includes:

```text
- status;
- command metadata when a command route is in scope;
- target and checked sources;
- ordered update steps;
- numbered actions inside each non-trivial step;
- files changed by each step;
- per-file responsibility, change and reason;
- dependencies and expected resulting state;
- boundaries / intentionally unchanged artifacts;
- checks and exit criteria;
- archive source/delivery status when relevant;
- next action.
```

## 3. Ordered Update Steps

Ordered steps are the primary representation for broad or dependency-sensitive updates.

Each step should state:

```text
Step ID and name
Objective
Input state / preconditions
Dependencies on earlier steps
Expected resulting state
Numbered actions
Files changed in this step
Per-file responsibility
What changes
Why the file changes in this step
Step boundaries and deferred work
Checks / exit criteria
Next dependent step
```

### Actions And Per-Step File Tables

The two representations have different responsibilities:

```text
Actions:
  state what must be done and in what order;

Per-step file table:
  state which files are affected by the step,
  each file's responsibility, what changes and why.
```

Use a numbered action list for concrete operations. Keep actions short enough to scan.

Use the existing file-change table inside the same step:

| Change | File | R | What changes in this step | Why in this step |
|---|---|---|---|---|

The action list and file table must agree. Do not maintain them as competing plans.

An action may:

```text
- update one or several files;
- create a new artifact;
- perform a review or migration check without changing a file;
- gate a later cleanup or rename;
- explicitly defer work.
```

When useful, a file-table cell may cite action numbers, but action IDs are optional.

One file may appear in several planning steps when different logical actions affect it. During implementation, coordinate the final replacement for that path so the package contains one complete intended result.

## 4. Aggregate File Matrix

An aggregate matrix is optional.

It may summarize:

```text
- every affected file;
- the steps that touch it;
- first and final responsibility;
- final planned state;
- unresolved checks.
```

The matrix is derived from the ordered steps and their per-step file tables. It is not a separately maintained source of truth.

For small updates, one step, one action list and one file table may be sufficient.

## 5. Planned-Mode Boundary

```text
A planned `План файл-обновление` is not permission to edit files.
It may propose new, updated, renamed or deleted paths.
Implementation requires a separate authorized action, such as
`давай архив` / `build replacement archive`.
```

Fallbacks in planning answers never authorize deletion, rename, archive creation, commit, push or unrelated scope expansion.

## 6. Command Metadata

When the update concerns a command route, include:

```text
canonical command;
canonical English name from the project root UCM;
permission mode.
```

The metadata does not replace the UCM route row.

## 7. Archive Source And Delivery Reporting

For replacement-package work, resolve source selection through:

```text
planning/documentation/reviewable-agent-output-and-commands-workflow.md
```

Report:

```text
- selected source snapshot;
- source identity;
- earlier-message archive reused automatically: no;
- whether a fresh source archive was required;
- delivery/source safety;
- local base verification status;
- new-file visibility through git add -N when needed;
- diff clipboard status;
- review boundary before commit.
```

Do not copy the complete source-selection algorithm into this workflow.

## 8. Checks

Before finalizing the overview:

```text
- Every planned file belongs to at least one update step.
- Every non-trivial step has a numbered action list.
- Every step has an objective and resulting state.
- Action order is understandable without inferring it from table row order.
- Actions and per-step file rows describe the same intended transition.
- Dependencies and cleanup gates are visible.
- Per-file reasons are stated in the context of the step.
- Aggregate rows, when present, match the step tables.
- Deletion and rename appear only after their migration checks.
- Planned mode remains distinct from implementation permission.
```

## 9. Do Not

```text
- Do not hide file-change risks in prose only.
- Do not hide the action sequence only inside a file table.
- Do not duplicate the same plan in unsynchronized action and file lists.
- Do not use unordered change groups when order materially affects safety.
- Do not maintain an aggregate matrix as a competing owner.
- Do not treat a plan as approval to edit, create, rename, delete, archive, commit or push.
- Do not reference project-specific package docs unless the project has them.
- Do not invent a command English name when the root UCM owns one.
- Do not duplicate archive source-selection rules.
```

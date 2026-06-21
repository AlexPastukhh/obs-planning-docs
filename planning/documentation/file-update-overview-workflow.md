# File Update Overview Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.2.0-obs-cleanup
Scope: when and how to produce the final `План файл-обновление` block for non-trivial file/docs/code/archive update work.

Use with:

```text
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
planning/planning-use-case-map.md
```

## 1. When To Use

Use `План файл-обновление` when the answer plans, creates, reviews or applies changes to files or packages.

Do not use it as a generic conclusion for ordinary discussion.

## 2. Required Content

```text
- status;
- grouped changed files;
- what changes;
- why changes;
- boundaries / not changed;
- checks;
- next action.
```

## 3. Archive-Safety Rows

For archive/replacement package work, include checks for:

```text
- delivery safety classified;
- new files visibility with git add -N if needed;
- diff copied to clipboard;
- user must paste diff before commit;
- no commit/push without approval.
```

## 4. Do Not

```text
- Do not hide file-change risks in prose only.
- Do not treat the plan as approval to edit/commit.
- Do not reference project-specific packaging docs unless the project has them.
```

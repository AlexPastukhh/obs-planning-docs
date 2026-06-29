# File Update Overview Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.4.0-command-and-source-metadata
Scope: when and how to produce the final `План файл-обновление` block for non-trivial file/docs/code/archive update work, including command-route plans and replacement packages.

Use with:

```text
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
planning/planning-use-case-map.md
```

## 1. When To Use

Use `План файл-обновление` when the answer plans, creates, reviews or applies changes to files or packages.

`спланируй команду` uses this workflow after the documentation-principles preflight and command-owner reads.

Do not use it as a generic conclusion for ordinary discussion.

## 2. Required Content

```text
- status;
- command metadata when the plan concerns command routes;
- grouped changed files;
- what changes;
- why changes;
- boundaries / not changed;
- checks;
- next action.
```

Command metadata includes the canonical command and required canonical English name. It does not replace the root UCM route row.

## 3. Planned-Mode Boundary

```text
A planned `План файл-обновление` is not permission to edit files.
It may propose new, updated, renamed or deleted paths.
Implementation requires a separate authorized action such as a replacement-package command.
```

## 4. Archive Source And Delivery Reporting

For archive/replacement package work, resolve source selection through:

```text
planning/documentation/reviewable-agent-output-and-commands-workflow.md
```

Then report the result without copying the selection algorithm:

```text
- selected source snapshot: current repository / same-message source archive / unresolved;
- source identity: repository ref or archive filename/hash/comment/ref when available;
- earlier-message archive reused automatically: no;
- fresh source archive required: yes/no plus reason;
- delivery/source safety status: repo-readable / archive-current / blocked;
- local base verification: pending / passed / blocked;
- new files visibility with git add -N if needed;
- diff copied to clipboard;
- user must paste diff before commit;
- no commit/push without approval.
```

## 5. Do Not

```text
- Do not hide file-change risks in prose only.
- Do not treat the plan as approval to edit, create, rename, delete, archive or commit.
- Do not reference project-specific packaging docs unless the project has them.
- Do not invent a command English name when the project root UCM already owns one.
- Do not duplicate the archive source-selection algorithm in this reporting workflow.
```

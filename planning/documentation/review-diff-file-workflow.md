# Review Diff File Workflow

Status: active optional reusable archive review workflow
Doc version: v0.3.0-obs-cleanup
Scope: optional repo-stored review diff file flow for replacement archive/package application when clipboard diff transfer is not practical or explicitly requested.

Use with:

```text
planning/planning-use-case-map.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
```

## 1. Purpose

Default archive review transfer is clipboard/pasted diff mode.

Use this workflow only when the user explicitly asks for repo-stored review diff transfer, for example:

```text
давай архив с review diff file
repo-stored review diff
проверь review diff file
give arch rev dif
```

## 2. Core Rule

```text
The assistant may create a replacement archive.
The user applies it locally.
The diff must be reviewed before commit.
```

When review-diff-file mode is explicitly requested, apply commands may create:

```text
_ai-review-diffs/last-archive.diff
```

This file is a review artifact only. It does not approve the real changed files.

## 3. Required Apply Flow

```text
1. apply replacement-files/ from the archive;
2. make expected new files visible with git add -N;
3. create _ai-review-diffs/last-archive.diff using git diff --no-color;
4. copy or show the review diff path;
5. leave real changed files uncommitted until review approval.
```

## 4. Clipboard Diff Preferred Mode

For ordinary archive review, prefer:

```powershell
git diff -- path/to/files | Set-Clipboard
```

For large diffs:

```powershell
New-Item -ItemType Directory -Force .\_ai-review-diffs | Out-Null
git --no-pager diff --no-color -- path/to/files > .\_ai-review-diffs\last-archive.diff
[System.IO.File]::ReadAllText((Resolve-Path .\_ai-review-diffs\last-archive.diff)) | Set-Clipboard
```

## 5. Do Not

```text
- Do not treat review diff file as commit approval.
- Do not commit/push real archive files before reviewed diff approval.
- Do not create extra review artifacts by default.
- Do not use this workflow when the user only asked for normal `давай архив`.
```

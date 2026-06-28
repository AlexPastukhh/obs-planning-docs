# Review Diff File Workflow

Status: active optional reusable archive review workflow
Doc version: v0.4.0-one-line-no-pager
Scope: optional repo-stored review diff file flow for replacement archive/package application when clipboard diff transfer is not practical or explicitly requested.

Use with:

```text
planning/planning-use-case-map.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
planning/documentation/documentation-update-workflow.md
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
3. capture the diff once with git --no-pager diff --no-color;
4. write the captured value to _ai-review-diffs/last-archive.diff;
5. copy the same captured value to the clipboard or report only the review diff path;
6. leave real changed files uncommitted until review approval.
```

Every supplied PowerShell Git stage follows the shared one-physical-line, one-Enter, non-interactive and no-pager contract.

## 4. Clipboard Diff Preferred Mode

For ordinary archive review, prefer one physical command line:

```powershell
& { $Paths = @("path/to/files"); $Diff = git --no-pager diff -- $Paths | Out-String; if ($LASTEXITCODE -ne 0) { throw "git diff failed" }; if ([string]::IsNullOrWhiteSpace($Diff)) { throw "No diff found" }; Set-Clipboard -Value $Diff; Write-Host "Diff copied to clipboard. Paste it into the chat before commit." }
```

For explicitly requested repo-stored review diff transfer:

```powershell
& { $Paths = @("path/to/files"); $ReviewDir = ".\_ai-review-diffs"; $ReviewFile = Join-Path $ReviewDir "last-archive.diff"; New-Item -ItemType Directory -Force $ReviewDir | Out-Null; $Diff = git --no-pager diff --no-color -- $Paths | Out-String; if ($LASTEXITCODE -ne 0) { throw "git diff failed" }; if ([string]::IsNullOrWhiteSpace($Diff)) { throw "No diff found" }; [System.IO.File]::WriteAllText((Join-Path (Resolve-Path $ReviewDir) "last-archive.diff"),$Diff,[System.Text.UTF8Encoding]::new($false)); Set-Clipboard -Value $Diff; Write-Host "Review diff written to $ReviewFile and copied to clipboard. Paste the diff before commit." }
```

Do not print the full diff to the console by default.

## 5. Do Not

```text
- Do not treat review diff file as commit approval.
- Do not commit/push real archive files before reviewed diff approval.
- Do not create extra review artifacts by default.
- Do not use this workflow when the user only asked for normal `давай архив`.
- Do not use plain git diff or another pager-capable Git command in a user-facing stage.
- Do not split one runnable stage across multiple physical command lines.
- Do not run the diff again only to display it in the console.
```

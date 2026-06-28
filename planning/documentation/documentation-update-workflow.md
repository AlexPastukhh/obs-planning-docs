# Documentation Update Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.5.0-auto-finalization-after-review
Scope: safe process for applying approved documentation updates in a project that uses `planning/documentation/`.

## 1. Purpose

Use this workflow when documentation changes are approved or when producing a replacement archive/package for documentation files.

The shared runtime contract for all user-facing PowerShell Git commands is owned by:

```text
planning/documentation/reviewable-agent-output-and-commands-workflow.md
```

## 2. Update Algorithm

```text
1. Identify the concrete target and active project root.
2. Read project root route: planning/planning-use-case-map.md.
3. Read relevant area docs under planning/areas/ if the update is local.
4. Read reusable owner workflows/templates under planning/documentation/.
5. Classify changed files by responsibility.
6. Change only the approved files.
7. Avoid duplicating owner rules across files.
8. Include apply commands and diff-to-clipboard commands when creating an archive.
9. Ask user to paste diff before commit.
10. Do not commit or push unless explicitly instructed after review.
```

## 3. Source Boundary

```text
- Project root files own project routing and state.
- Reusable docs own reusable process only.
- Area files own local application details.
- Examples are supporting artifacts only.
```

## 4. Replacement Archive Rule

When producing a replacement archive:

```text
- include replacement-files/<repo-relative-path>;
- include MANIFEST.md and APPLY.md;
- give PowerShell apply/diff commands in chat;
- use git add -N for new files before unstaged diff capture;
- capture the diff exactly once with git --no-pager diff;
- check the Git exit code before using the captured value;
- copy the captured diff with Set-Clipboard;
- do not print the full diff to the console by default;
- print only a short completion message;
- request pasted diff before commit.
```

PowerShell command presentation:

```text
- Present each runnable PowerShell stage as one physical line in the form & { <statement>; <statement>; ... }.
- Put only one physical command line inside each runnable PowerShell code block.
- Separate statements with semicolons.
- Do not use multiline runnable blocks or PowerShell backtick continuations.
- The complete stage must start after one paste and exactly one Enter.
- The running stage must not request q, another Enter, confirmation or other keyboard input.
- Use git --no-pager for every Git command that can invoke a pager.
- Do not split one dependent stage across several command blocks.
- Keep the apply/diff stage separate from post-review repository finalization.
- After the user pastes the diff, review it immediately.
- If the diff is approved, provide the combined repository-finalization command in the same response.
- Do not ask the user for another confirmation and do not require a separate `commit and push` instruction.
- Put `git commit` and `git push` in the same one-line `& { ... }` block.
- Run push only after commit succeeds, and report success only after push succeeds.
- Do not emit a normal commit-only stage followed by a planned push-only stage.
- If the diff is rejected or incomplete, do not provide the finalization command.
- Use a separate push-only recovery stage only when the intended commit already exists and its original push was skipped or failed.
```

Shape example, not runnable as-is:

```powershell
& { Set-Location "C:\path\to\repo"; $Paths = @("<path1>","<path2>"); $NewPaths = @("<new-path>"); if ($NewPaths.Count -gt 0) { git add -N -- $NewPaths; if ($LASTEXITCODE -ne 0) { throw "git add -N failed" } }; git --no-pager diff --check -- $Paths; if ($LASTEXITCODE -ne 0) { throw "git diff --check failed" }; $Diff = git --no-pager diff -- $Paths | Out-String; if ($LASTEXITCODE -ne 0) { throw "git diff failed" }; if ([string]::IsNullOrWhiteSpace($Diff)) { throw "No diff found" }; Set-Clipboard -Value $Diff; Write-Host "Diff copied to clipboard. Paste it into the chat before commit." }
```

If there are no new files, use an empty `$NewPaths` array or omit the conditional `git add -N` section.

Post-review repository-finalization shape, not runnable as-is:

```powershell
& { Set-Location "C:\path\to\repo"; git commit -m "<message>"; if ($LASTEXITCODE -ne 0) { throw "git commit failed" }; git push origin <branch>; if ($LASTEXITCODE -ne 0) { throw "git push failed; commit remains local" }; Write-Host "Commit created and pushed." }
```

This combined finalization command is supplied immediately after diff approval. The user does not need to send another confirmation or a separate `commit and push` instruction.

## 5. Do Not

```text
- Do not use patches as primary application mechanism.
- Do not create scripts as primary application mechanism.
- Do not hide apply commands only inside the archive.
- Do not put project-specific state into reusable docs.
- Do not treat Tampermonkey helper or examples as authority.
- Do not invoke plain git diff, git log, git show or another pager-capable Git command in a user-facing stage.
- Do not run the same diff once for clipboard transfer and again for console display.
- Do not print the full diff after copying it unless the user explicitly requested console output.
- Do not ask for another confirmation after an approved pasted diff.
- Do not withhold the combined commit-and-push command after approving the diff.
- Do not provide a normal post-review commit-only command.
- Do not run push after a failed commit.
```

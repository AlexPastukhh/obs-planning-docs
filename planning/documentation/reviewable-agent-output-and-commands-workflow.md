# Reviewable Agent Output And Commands Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.5.0-auto-finalization-after-review
Scope: answer levels, reviewable outputs, response-level command behavior and the shared runtime contract for user-facing PowerShell Git commands.

## 1. Answer Levels

```text
Level 1:
  concise answer, no broad source pass.

Level 2:
  reviewable answer with sources/checked/not-checked/boundaries.

Level 3:
  artifact/package/diff-sensitive answer with explicit apply/review boundary.
```

Use Level 2 or Level 3 for non-trivial file/docs/code/archive changes.

## 2. Response-Level Commands

```text
крит / crit:
  critically review target as hypothesis; do not edit unless separately asked.

обс / recheck:
  recheck prior chat/context/sources before continuing.

план файл-обновление:
  produce file update plan; do not edit unless separately asked.

давай архив:
  create full replacement archive and include apply/diff commands in chat.

арх:
  use provided archive as read-source, not output-package mode.
```

Concrete command routing belongs in the project root UCM.

## 3. User-Facing PowerShell Git Command Contract

This contract applies to every runnable PowerShell Git stage supplied to the user, including archive, update, inspection, review, commit and push stages.

```text
- Present one runnable stage as one physical command line inside its code block.
- Use the shape: & { <statement>; <statement>; ... }.
- The user must be able to paste the line and start the complete stage with exactly one Enter.
- Do not use multiline runnable blocks or PowerShell backtick continuations.
- After the stage starts, it must be non-interactive and return directly to the PowerShell prompt.
- Do not require another Enter, q, confirmation, Read-Host, a pause, language-layout switching or any other planned keyboard input.
- Use git --no-pager for every Git command that can invoke a pager.
- Do not rely on the user's Git pager configuration.
- Keep the apply/diff review stage separate from the post-review repository-finalization stage.
- The archive request authorizes the reviewed finalization flow, but it never authorizes commit or push before the pasted diff is approved.
- After the user pastes the diff, review it immediately.
- If the diff is approved, include the repository-finalization command in the same response without asking for another confirmation or requiring a separate `commit and push` instruction.
- The finalization command must be one physical `& { ... }` line containing both `git commit` and `git push`.
- Check the commit exit code before running push.
- Check the push exit code before reporting finalization success.
- In the normal reviewed flow, do not provide a commit-only command followed by a planned push-only command.
- If the diff is not approved, do not provide a finalization command.
- A push-only recovery command is allowed only when the intended commit already exists and its original push was skipped or failed.
```

When command output is intended for transfer to chat, capture it once, copy the captured value to the clipboard and print only a short completion message unless full console output was explicitly requested.

## 4. Source Reporting

For reviewable answers, include when useful:

```text
Checked:
  <files/sources actually checked>

Not checked:
  <relevant sources not checked>

Boundary:
  <what this answer did not do>
```

## 5. Archive Output Boundary

```text
- Creating an archive does not approve commit or push before diff review.
- User applies locally and pastes diff.
- Assistant reviews the pasted diff.
- If the diff is approved, the assistant immediately supplies one combined commit-and-push command in the same response.
- No additional user confirmation is required after an approved diff.
- If the diff is rejected or incomplete, the assistant withholds the finalization command and explains what must be corrected.
- For the PowerShell presentation format of archive apply/diff and finalization commands, also read
  `planning/documentation/documentation-update-workflow.md`.
```

## 6. Do Not

```text
- Do not pretend to have checked files not checked.
- Do not treat examples/helper scripts as authority.
- Do not omit apply/diff commands when giving an archive.
- Do not commit or push before the pasted diff is reviewed and approved.
- Do not ask for a redundant post-review confirmation when the diff is already approved.
- Do not split a normal approved repository-finalization stage into a commit-only command and a planned push-only command.
- Do not provide a user-facing PowerShell Git stage that can stop in an interactive pager.
- Do not print transferable full output to the console after it was already copied to the clipboard unless explicitly requested.
```

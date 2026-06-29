# Reviewable Agent Output And Commands Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.6.0-archive-source-selection
Scope: answer levels, reviewable outputs, response-level command behavior, replacement-package source selection and the shared runtime contract for user-facing PowerShell Git commands.

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
крит / critical review:
  critically review target as hypothesis; do not edit unless separately asked.

обс / recheck context:
  recheck prior chat/context/sources before continuing.

план файл-обновление / plan file update:
  produce file update plan; do not edit unless separately asked.

давай архив / build replacement archive:
  create full replacement archive and include apply/diff commands in chat.

арх / use archive:
  use an explicitly selected archive as read-source, not output-package mode.
```

Concrete command routing and canonical English names belong in the project root UCM.

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
- Creating the archive never authorizes commit or push before the pasted diff is reviewed and approved.
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

For replacement packages, also record:

```text
Selected source snapshot:
  current repository / same-message source archive

Source identity:
  repository ref or archive filename plus available hash/comment/ref

Apply precondition:
  exact local HEAD/base blobs must match the package manifest before any replacement or deletion
```

## 5. Archive Source Selection

Resolve the source before creating a replacement archive.

```text
1. An archive attached in an earlier user message is not current automatically.

2. An archive attached in the same user message as `давай архив`
   is the selected current source snapshot for that invocation.
   No additional conversational freshness confirmation is required.

3. If there is no same-message source archive, use the current repository
   when every required target file can be read completely and reliably.

4. Request a fresh source archive only when file size or tool limitations
   prevent complete and reliable reading of required current files.

5. A selected source snapshot does not prove that the user's local HEAD is identical.
   The apply stage must validate exact base blobs before copying or deleting files.
   If any base differs, stop before changes and rebuild or explicitly reconcile the package.

6. Do not silently combine an earlier archive with newer repository
   or conversation state. Resolve source differences explicitly before packaging.

7. Record the selected source identity in the package summary and manifest.
```

A same-message archive is current for the invocation because the user selected it together with the package command. The mandatory local-base verification remains an independent safety check.

## 6. Archive Output Boundary

```text
- Creating an archive does not approve commit or push before diff review.
- Produce full replacement files, not snippets or patches as the primary mechanism.
- Include MANIFEST.md and APPLY.md.
- Give apply/diff commands in chat.
- Validate all existing target HEAD/base blobs before any filesystem change.
- Use git add -N for new files before unstaged diff capture.
- Capture the diff exactly once with git --no-pager diff.
- Check the Git exit code before using the captured value.
- Copy the captured diff with Set-Clipboard.
- Do not print the full diff to the console by default.
- User applies locally and pastes the diff.
- Assistant reviews the pasted diff.
- If the diff is approved, the assistant immediately supplies one combined commit-and-push command in the same response.
- No additional user confirmation is required after an approved diff.
- If the diff is rejected or incomplete, withhold the finalization command and explain what must be corrected.
- For archive apply/diff and finalization command formatting, also read `planning/documentation/documentation-update-workflow.md`.
```

## 7. Do Not

```text
- Do not pretend to have checked files not checked.
- Do not treat examples/helper scripts as authority.
- Do not omit apply/diff commands when giving an archive.
- Do not use an earlier-message archive as current without explicit same-invocation selection or reconciliation.
- Do not request an archive when all required current repository files are already fully and reliably readable.
- Do not bypass a local HEAD/base mismatch by editing package hashes manually.
- Do not copy or delete any target before every existing base path has passed validation.
- Do not commit or push before the pasted diff is reviewed and approved.
- Do not ask for a redundant post-review confirmation when the diff is already approved.
- Do not split a normal approved repository-finalization stage into a commit-only command and a planned push-only command.
- Do not provide a user-facing PowerShell Git stage that can stop in an interactive pager.
- Do not print transferable full output to the console after it was already copied to the clipboard unless explicitly requested.
```

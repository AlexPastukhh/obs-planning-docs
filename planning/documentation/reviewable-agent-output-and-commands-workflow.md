# Reviewable Agent Output And Commands Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.10.0-route-specific-package-runtime
Scope: answer levels, reviewable outputs, response-level command behavior, returned user-edited file revision, and legacy/reviewable package routes that explicitly opt into user-facing PowerShell Git stages.

## 1. Answer Levels

```text
Level 1:
  concise answer, no broad source pass.

Level 2:
  reviewable answer with sources/checked/not-checked/boundaries.

Level 3:
  artifact/package/diff-sensitive answer with explicit route-owned boundaries.
```

Use Level 2 or Level 3 for non-trivial file/docs/code/archive changes.

## 2. Response-Level Commands

```text
крит / critical review:
  critically review target as hypothesis; do not edit unless separately asked.

обс / recheck context:
  recheck prior chat/context/sources before continuing.

обн / upd / revise returned files:
  review same-message user-edited returned Markdown/docs/planning files,
  merge same-message clarifications and return complete revised versions.

план файл-обновление / plan file update:
  produce file update plan; do not edit unless separately asked.

package-producing commands:
  follow the selected concrete command definition and its ownerFiles;
  do not infer one shared apply/diff/finalization lifecycle from package mode alone.

арх / use archive:
  use an explicitly selected archive as read-source, not output-package mode.
```

Concrete command routing belongs to the project root command-routing system: read the root UCM first, then the selected delegated command definition when the project uses a command registry. The command definition owns its canonical English name, output contract and permission boundary.

## 3. User-Facing PowerShell Git Command Contract

This section applies **only when the selected command definition or one of its explicit owner files requires a runnable user-facing PowerShell Git stage**. It is not a default property of every archive/package command.

For routes that opt in:

```text
- Present one runnable stage as one physical command line inside its code block.
- Use the shape: & { <statement>; <statement>; ... }.
- The user must be able to paste the line and start the complete stage with exactly one Enter.
- Do not use multiline runnable blocks or PowerShell backtick continuations.
- After the stage starts, it must be non-interactive and return directly to the PowerShell prompt.
- Do not require another Enter, q, confirmation, Read-Host, a pause, language-layout switching or any other planned keyboard input.
- Use git --no-pager for every Git command that can invoke a pager.
- Do not rely on the user's Git pager configuration.
- Keep an apply/diff review stage separate from any post-review repository-finalization stage when the selected route uses that lifecycle.
- Creating an archive never authorizes commit or push unless the selected route explicitly grants a later reviewed finalization boundary.
- Check commit and push exit codes before reporting success when such a route supplies finalization.
```

When command output is intended for transfer to chat, capture it once, copy the captured value to the clipboard and print only a short completion message unless full console output was explicitly requested.

### UTF-8-Safe Git Output Transfer

For opt-in Windows PowerShell Git output transfer, do not rely on native-command pipeline decoding for transferable Git output. It may mojibake UTF-8 text even when repository files are correct.

Use this pattern:

```text
1. Ask Git to write the diff directly to a temporary file with `--output=<path>`.
2. Check the Git exit code.
3. Read the file explicitly as UTF-8.
4. Copy that one captured string to the clipboard.
5. Remove the temporary file.
6. Do not run the diff a second time for console display.
```

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

For package work, source reporting must follow the selected package command/owner contract. Do not assume that every package requires the legacy local apply/diff lifecycle below.

## 5. Legacy Reviewable Archive Source Selection

Use this section only for a command route that explicitly links this workflow as an owner for its reviewable archive source/application behavior.

```text
1. An archive attached in an earlier user message is not current automatically.

2. An archive attached in the same user message as the selected legacy/reviewable archive command
   is the selected current source snapshot for that invocation unless the selected route says otherwise.

3. If there is no same-message source archive, use the current repository
   when every required target file can be read completely and reliably.

4. Request a fresh source archive only when file size or tool limitations
   prevent complete and reliable reading of required current files.

5. A selected source snapshot does not prove that the user's local HEAD is identical.
   When the selected route owns local application, validate the exact required base before changes.

6. Do not silently combine an earlier archive with newer repository
   or conversation state. Resolve source differences explicitly before packaging.
```

A different package command may own a different source/handoff contract in its own owner file. Follow that route instead of this section.

## 6. Returned User-Edited Files

Use this workflow when the user returns one or more changed files with `обн` or `upd`.

Default scope:

```text
- Markdown documentation;
- planning drafts;
- other text documentation artifacts with a clearly matching prior version.
```

Code and executable configuration require a separate explicit code/update task unless the active route already owns them.

Source and revision rules:

```text
1. Treat each file attached in the same message as the latest user-edited working version.
2. Read every returned file completely before revising it.
3. Compare with a clearly matching prior version when one is available.
4. Identify what the user added, removed, reordered or reworded.
5. Treat those edits as explicit new input and revision intent.
6. Do not automatically treat every edited statement as a confirmed fact,
   accepted decision or requirement.
7. Preserve deliberate user edits unless they conflict with:
   - an explicit reusable rule;
   - a checked source fact;
   - another explicit clarification in the same message;
   - an ownership or safety boundary.
8. Do not silently restore text that the user removed from the older version.
9. Merge additional clarifications from the same message into the new version.
10. Evaluate consistency, evidence status, artifact ownership and relationships
    with other affected drafts.
11. Improve Markdown presentation when useful:
    headings, spacing, tables, grouping, ordering and scanability.
12. Do not require the user to spend time polishing visual formatting.
13. Update related files only when the returned changes or chat clarification
    actually affects them.
14. Return complete revised files, not isolated replacement fragments.
15. Briefly state significant adjustments, conflicts and unresolved questions.
```

If no prior version is available, revise from the returned file and same-message clarification, and state that historical comparison was unavailable.

This command is response-only by default. It does not authorize repository edits, archive creation, commit or push.

## 7. Legacy Reviewable Archive Output Boundary

Use this section only when the selected command/owner explicitly opts into the legacy reviewable archive flow.

For such routes:

```text
- Creating an archive does not approve commit or push before the route's required review boundary.
- Produce full replacement files, not snippets or patches as the primary mechanism.
- Include the route-required manifest/apply documentation.
- Give apply/diff commands in chat when the route requires them.
- Validate required existing local base content before filesystem changes.
- Use git add -N for new files before an unstaged diff when the route uses that mechanism.
- Capture transferable diffs once, check Git exit status and decode UTF-8 explicitly.
- User supplies the review artifact required by the selected route before reviewed finalization.
- Withhold any finalization command when the route's review has not passed.
```

Do not apply this boundary to package-producer commands that explicitly stop at ZIP/action handoff.

## 8. Do Not

```text
- Do not pretend to have checked files not checked.
- Do not treat examples/helper scripts as authority.
- Do not infer apply/diff commands merely because a command produces an archive.
- Do not use an earlier-message archive as current without explicit route-owned selection or reconciliation.
- Do not request an archive when the selected route can reliably read all required current repository files.
- Do not bypass a route-owned local base mismatch by editing package hashes manually.
- Do not commit or push outside the selected command's permission/review boundary.
- Do not provide a user-facing PowerShell Git stage that can stop in an interactive pager.
- Do not decode transferable Git output through a native PowerShell pipeline when UTF-8 content may be present.
- Do not print transferable full output to the console after it was already copied to the clipboard unless explicitly requested.
- Do not treat user formatting effort as a prerequisite for revising returned Markdown/docs.
- Do not silently restore removed content from a prior version.
- Do not apply `обн` / `upd` to code without an explicit code/update route.
```

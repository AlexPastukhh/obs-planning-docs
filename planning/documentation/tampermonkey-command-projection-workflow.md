# Tampermonkey Command Projection Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.6.0-archive-format-validation
Scope: reusable rules for projecting accepted project command routes into the reusable Tampermonkey/ChatGPT command helper UI.

## 1. Core Rule

Tampermonkey is projection only.

```text
Command authority:
  planning/planning-use-case-map.md

Behavior authority:
  linked owner workflow/template/area docs

Projection implementation:
  planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

The root UCM owns command routing and points to the files needed for full understanding. It does not need to encode which read mode the user chose for one particular palette insertion.

## 2. Before Adding A Command To Helper

Check:

```text
1. The command route exists in the project root UCM.
2. Owner docs for the route exist.
3. Permission boundary is explicit.
4. Inserted body points back to the root UCM and owner docs.
5. Button label uses <englishName> · <label>.
6. Adaptive and forced-full variants are generated from the same command definition.
7. A command-specific refinement, when present, only points to route/owner docs to reread and states the validation action.
```

## 3. Shared Inserted Body Contract

Use a project-neutral marker, not an Enman-specific marker.

```text
[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  <Russian command>

english_name:
  <short English name>

command_family:
  `<alias 1>` / `<alias 2>` / `<English alias>`

<route read block selected by the palette action>

key_reminders:
  - <command-specific reminder>
  - <permission boundary>
  - <evidence/source requirement>
  - <what not to do>

user_target:
  <placeholder>

[/PLANNING_COMMAND]
```

Command meaning, aliases, reminders and target stay identical between read variants. Only the source/read block changes.

## 4. Adaptive Route-Read Variant

The normal command button keeps the existing adaptive behavior.

```text
source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.
```

This variant leaves the freshness decision to the chat. Recently verified command context may be reused when behavior, boundaries and key points remain clear.

## 5. Forced Full Route-Read Variant

A separate `Full` action inserts the same command with an explicit fresh-read requirement.

```text
source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Follow the complete required route for this command.

route_read_rule:
  Full route reading is required for this invocation.
  Read the relevant command entry in `planning/planning-use-case-map.md`.
  Then read every owner, workflow, template and example file required by that command route for complete understanding.
  Do this even if the command was previously used in this chat.
  Do not execute the command from memory or from this compact prompt alone.
  Do not expand into unrelated repository files outside the command route.
```

`Full` means the complete required path of that command, not a broad read of the entire repository.

There is no separate UCM-only mode. There are currently only two insertion modes:

```text
normal command button:
  adaptive route read

Full button:
  forced complete required route read
```

Command-specific refinements remain out of scope until a concrete need and route/owner paths are approved.

The approved `давай архив` format refinement asks the chat to reread:

```text
planning/planning-use-case-map.md
planning/documentation/reviewable-agent-output-and-commands-workflow.md
planning/documentation/documentation-update-workflow.md
```

It then requires validation and replacement of every non-compliant user-facing PowerShell Git command in the current answer. The formatting rules remain in the owner workflows rather than in the refinement body.

## 6. UI Contract

Each command row uses sibling controls:

```text
<englishName> · <label>:
  insert adaptive command body

Full:
  insert forced-full command body

Cmd fmt:
  for `давай архив` only, reread the route and archive command-format owners,
  validate every PowerShell Git command in the current answer
  and rewrite any non-compliant command

Copy:
  copy adaptive command body
```

Do not nest buttons inside another button. Do not duplicate the whole command definition to create the second variant.

## 7. Owner-Read Refinement Contract

A refinement button must stay compact and point to the route/owner documentation that should be reread. It may state the validation action, but it must not duplicate the owner rules.

```text
[PLANNING_COMMAND_REFINEMENT]
command:
  давай архив

refinement:
  archive_command_format

read_required:
  - `planning/planning-use-case-map.md`
  - `planning/documentation/reviewable-agent-output-and-commands-workflow.md`
  - `planning/documentation/documentation-update-workflow.md`

instruction:
  Reread these files, validate every user-facing PowerShell Git command in the current answer against their archive command-format rules, and rewrite any non-compliant command.

[/PLANNING_COMMAND_REFINEMENT]
```

Do not duplicate the owner rules inside the userscript or refinement body.

## 8. Placement

The reusable full helper lives at:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not create a tracked local `tools/tampermonkey/` copy by default.

## 9. Do Not

```text
- Do not add helper commands without UCM routes.
- Do not make the userscript a command source of truth.
- Do not put per-invocation read-mode policy into the root UCM.
- Do not create separate command-definition copies for adaptive and forced-full variants.
- Do not put archive formatting rules into the refinement body; only list route/owner docs and the requested validation action.
- Do not keep competing tracked helper copies by default.
- Do not silently change command meaning while adding UI controls.
- Do not treat Full as permission to read unrelated repository files.
```

# Tampermonkey Command Projection Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.3.1-obs-cleanup
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

## 2. Before Adding A Command To Helper

Check:

```text
1. The command route exists in the project root UCM.
2. Owner docs for the route exist.
3. Permission boundary is explicit.
4. Inserted body points back to the root UCM and owner docs.
5. Button label uses <englishName> · <label>.
```

## 3. Inserted Body Contract

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

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - <command-specific reminder>
  - <permission boundary>
  - <evidence/source requirement>
  - <what not to do>

user_target:
  <placeholder>

[/PLANNING_COMMAND]
```

## 4. Placement

The reusable full helper lives at:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Do not create a tracked local `tools/tampermonkey/` copy by default.

## 5. Do Not

```text
- Do not add helper commands without UCM routes.
- Do not make the userscript a command source of truth.
- Do not keep competing tracked helper copies by default.
- Do not silently change command meaning while adding UI labels.
```

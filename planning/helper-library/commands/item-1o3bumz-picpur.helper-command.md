# Helper Command — план файл-обновление

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "command",
  "id": "item-1o3bumz-picpur",
  "title": "план файл-обновление",
  "text": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  план файл-обновление

english_name:
  plan file update

command_family:
  `план файл-обновление`
  / `спланируй обновление файлов`
  / `спланируй архив`
  / `plan file update`
  / `archive plan`

command_definition:
  planning/commands/plan-file-update.command.md

source_of_truth:
  Start from `planning/command-routing.md`.
  Then read `planning/commands/plan-file-update.command.md`
  and its linked owner files for this command route.

route_read_rule:
  Read or reread the route when it is not current, remembered or certain.
  Do not rely only on this compact prompt when command behavior is uncertain.

key_reminders:
  - Plan file/docs/code/archive update only.
  - Treat only explicit user statements and checked source facts as confirmed.
  - Use shared Idea review only when the update contains material conceptual uncertainty; do not manufacture Idea analysis for mechanical updates.
  - When alternatives are material, keep them as Idea Variants and identify one Current Selected Variant before concrete file steps.
  - Possible Idea Refinements are not file edits and do not become selected changes automatically.
  - Establish the one Current Plan from Current Selected Meaning before aggregate findings.
  - Every real Questions / Risks / Problems unit states Current Plan, the unresolved/adverse finding, and its relation or impact on that plan; reference Related Idea IDs when applicable.
  - Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and states Current Plan plus Change To Current Plan; accepted simplifications belong in Current Conclusions/Update Steps instead.
  - Do not use aggregate sections to confirm selected routes, repeat ordinary boundaries, or preserve completed reasoning.
  - For unresolved important choices, keep current selected meaning explicit and surface alternatives/questions separately.
  - End with `План файл-обновление` in planned mode.
  - Do not edit files.
  - Do not create archive unless separately requested.

user_target:
  <what update/archive should be planned>

[/PLANNING_COMMAND]",
  "createdAt": "2026-08-17T11:55:32.881Z",
  "updatedAt": "2026-08-18T07:55:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]

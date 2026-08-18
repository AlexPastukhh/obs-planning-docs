# Helper Command — план файл-обновление

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "command",
  "id": "item-1o3bumz-picpur",
  "title": "план файл-обновление",
  "text": "[PLANNING_COMMAND]\nRead this whole command body before answering.\nDo not ignore `key_reminders`.\n\ncommand:\n  план файл-обновление\n\nenglish_name:\n  plan file update\n\ncommand_family:\n  `план файл-обновление`\n  / `спланируй обновление файлов`\n  / `спланируй архив`\n  / `plan file update`\n  / `archive plan`\n\ncommand_definition:\n  planning/commands/plan-file-update.command.md\n\nsource_of_truth:\n  Start from `planning/planning-use-case-map.md`.\n  Then read `planning/commands/plan-file-update.command.md`\n  and its linked owner files for this command route.\n\nroute_read_rule:\n  Read or reread the route when it is not current, remembered or certain.\n  Do not rely only on this compact prompt when command behavior is uncertain.\n\nkey_reminders:\n  - Plan file/docs/code/archive update only.\n  - Treat only explicit user statements and checked source facts as confirmed.\n  - Use shared Idea review only when the update contains material conceptual uncertainty; do not manufacture Idea analysis for mechanical updates.\n  - When alternatives are material, keep them as Idea Variants and identify one Current Selected Variant before concrete file steps.\n  - Possible Idea Refinements are not file edits and do not become selected changes automatically.\n  - Always include Questions / Risks / Problems; material Idea-derived findings reference Related Idea IDs.\n  - When material simplifications or better routes are found, surface them separately with Related Idea IDs; do not duplicate Update Steps.\n  - For unresolved important choices, keep current selected meaning explicit and surface alternatives/questions separately.\n  - End with `План файл-обновление` in planned mode.\n  - Do not edit files.\n  - Do not create archive unless separately requested.\n\nuser_target:\n  <what update/archive should be planned>\n\n[/PLANNING_COMMAND]",
  "createdAt": "2026-08-17T11:55:32.881Z",
  "updatedAt": "2026-08-18T03:46:05.355Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]

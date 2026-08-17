# Helper Command — давай арх

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "command",
  "id": "item-1qgcw7x-j0mc7l",
  "title": "давай арх",
  "text": "[PLANNING_COMMAND]\nRead this whole command body before answering. Do not ignore `key_reminders`.\n\ncommand:\n  давай архив\n\nenglish_name:\n  build replacement archive\n\ncommand_family:\n  `давай архив` / `собери архив` / `give arch` / `replacement package`\n\ncommand_definition:\n  planning/commands/build-replacement-archive.command.md\n\nsource_of_truth:\n  Start from `planning/planning-use-case-map.md`.\n  Then read `planning/commands/build-replacement-archive.command.md`\n  and its linked owner files for this command route.\n\nroute_read_rule:\n  Read or reread the route when it is not current, remembered or certain.\n  Do not reconstruct command behavior from this compact prompt when the\n  repository command definition and owner files are available.\n\nkey_reminders:\n  - Package-producer mode, not archive read-source mode.\n  - Produce one full replacement ZIP plus one short OBS-ACTION/1 block, then stop.\n  - An earlier-message archive is not current automatically.\n  - A source archive/snapshot explicitly provided or selected for this invocation\n    may be used only after inspection verifies repository/target match and complete\n    touched-source coverage.\n  - Otherwise use fully readable current repository files.\n  - Request only the minimum fresh source/snapshot when exact touched base content\n    cannot be read reliably.\n  - Never guess expected base content for replace/delete operations.\n  - Every newly produced ZIP gets a new packageId.\n  - Correction/continuation of the same logical work keeps the same changeSetId\n    and stable changeSetLabel; independent work gets a new changeSetId.\n  - PACKAGE.json owns the package operations and required payloads.\n  - OBS-ACTION packageId must match PACKAGE.json.\n  - Do not include ReviewDiff/clipboard settings in OBS-ACTION.\n  - Do not apply locally.\n  - Do not emit local Apply, diff, ReviewDiff, Finalize, staging, commit or push commands.\n  - Do not ask the user to paste a diff as part of this command.\n\nuser_target:\n  <what replacement package should include>\n\n[/PLANNING_COMMAND]",
  "createdAt": "2026-08-17T11:54:46.152Z",
  "updatedAt": "2026-08-17T11:54:46.152Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]

# Plan Command

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "command.plan",
  "file": "plan-command.command.md",
  "command": "спланируй команду",
  "englishName": "plan command",
  "commandFamily": [
    "спланируй команду",
    "plan command"
  ],
  "description": "plan command",
  "meaning": "Plan a command route and its documentation changes without implementing it.",
  "activeContextBehavior": "Ask which command only when the target command is unclear.",
  "traversalReadMode": "Documentation-principles preflight, then targeted/full command-route reads.",
  "ownerFiles": [
    "planning/documentation/documentation-principles-read-workflow.md",
    "planning/documentation/file-update-overview-workflow.md",
    "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md",
    "planning/documentation/command-planning-workflow.md",
    "planning/documentation/use-case-map-workflow.md",
    "planning/documentation/USE-CASE-MAP-TEMPLATE.md"
  ],
  "expectedOutput": "Command family/type/English name/owner/registry/example/projection plan followed by План файл-обновление.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "Plan a command route only.",
    "Run the documentation-principles preflight.",
    "Produce a file-update plan and read command-specific owners.",
    "Tampermonkey is projection, not source of truth.",
    "Do not edit files, create an archive, commit or push."
  ],
  "userTarget": "<what command route should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

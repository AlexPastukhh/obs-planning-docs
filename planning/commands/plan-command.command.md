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
  "traversalReadMode": "Targeted current command-capability and route reads; use repository update planning only when a concrete file transition is needed.",
  "ownerFiles": [
    "planning/use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md",
    "planning/commands/README.md",
    "planning/documentation/command-planning-workflow.md",
    "planning/documentation/command-routing-workflow.md",
    "planning/documentation/COMMAND-ROUTING-TEMPLATE.md",
    "planning/use-cases/UC-REPO-PLAN-UPDATE.md",
    "planning/documentation/file-update-overview-workflow.md",
    "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md"
  ],
  "expectedOutput": "Command family/type/English name/owner/registry/example/projection plan followed by План файл-обновление.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "Plan a command route only.",
    "Use UC-REPO-MAINTAIN-PLANNING-COMMAND as the semantic capability and keep detailed algorithms in its supporting owners.",
    "When a concrete repository transition must be planned, hand off through UC-REPO-PLAN-UPDATE rather than reviving the retired Documentation pre-update/bootstrap UC routes.",
    "Tampermonkey is projection, not source of truth.",
    "Do not edit files, create an archive, commit or push."
  ],
  "userTarget": "<what command route should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

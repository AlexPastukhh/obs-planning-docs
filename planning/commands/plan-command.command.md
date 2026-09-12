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
    "planning/use-cases/UC-REPO-PLAN-UPDATE.md"
  ],
  "expectedOutput": "A command family/type/name/owner/registry/example/projection plan; hand off to TM-PRE-UPDATE-PLAN only when a separately reviewable concrete repository transition is actually useful.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "Plan a command route only.",
    "Use UC-REPO-MAINTAIN-PLANNING-COMMAND as the semantic capability and keep detailed algorithms in its supporting owners.",
    "A Pre-Update handoff is conditional: use UC-REPO-PLAN-UPDATE / TM-PRE-UPDATE-PLAN only when a concrete repository transition benefits from a separate reviewable pre-mutation result.",
    "Planning Helper is a projection, not source of truth.",
    "Do not edit files, create an archive, commit or push."
  ],
  "userTarget": "<what command route should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

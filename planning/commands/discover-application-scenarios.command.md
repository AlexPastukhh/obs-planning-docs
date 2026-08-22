# Discover Application Scenarios

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_scenarios.discover",
  "file": "discover-application-scenarios.command.md",
  "command": "собери сценарии приложения",
  "englishName": "discover application scenarios",
  "commandFamily": [
    "собери сценарии приложения",
    "найди сценарии приложения",
    "discover application scenarios"
  ],
  "description": "discover meaningful Application Scenario boundaries",
  "meaning": "Invoke UC-PLAN-SCENARIO-DISCOVERY to identify independently meaningful user-visible Need/result Scenario boundaries for the selected Application responsibility.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md"
  ],
  "expectedOutput": "Current Scenario inventory/boundaries + material future Scenario/change evidence.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Selected Application responsibility>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

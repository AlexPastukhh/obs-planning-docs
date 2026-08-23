# Plan Application Scenario

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_scenario.plan",
  "file": "plan-application-scenario.command.md",
  "command": "план сценария приложения",
  "englishName": "plan application scenario",
  "commandFamily": [
    "план сценария приложения",
    "план сценария",
    "plan application scenario",
    "plan scenario"
  ],
  "description": "plan/review detailed Application Scenario",
  "meaning": "Invoke UC-PLAN-SCENARIO and preserve Scenario DATA + Behavior Items + material Requirements/Screens as first-class Scenario planning meaning.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/detailed-planning/README.md"
  ],
  "expectedOutput": "Reviewed Scenario meaning/workspace with DATA/Behavior preserved.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied.",
    "Application Scenario identity is a user/actor goal/Need or desired result reached through observable useful behavior; internal implementation operations remain downstream unless they participate in an independently meaningful user/actor-visible outcome."
  ],
  "userTarget": "<Application Scenario>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

# Plan Application Slice

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_slice.plan",
  "file": "plan-application-slice.command.md",
  "command": "план слайса приложения",
  "englishName": "plan application slice",
  "commandFamily": [
    "план слайса приложения",
    "план слайса",
    "plan application slice",
    "plan slice"
  ],
  "description": "plan one implementation Slice",
  "meaning": "Invoke UC-PLAN-SLICE to plan one integrated vertical increment; split frontend/server/verification implementation-part plans only when useful.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/slice-planning-workflow.md"
  ],
  "expectedOutput": "Integrated Slice plan + optional frontend/server/verification implementation-part plans.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Selected Slice>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

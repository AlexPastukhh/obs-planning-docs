# Prototype Application

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_prototype.plan",
  "file": "prototype-application.command.md",
  "command": "прототип приложения",
  "englishName": "prototype application",
  "commandFamily": [
    "прототип приложения",
    "prototype application",
    "plan application prototype"
  ],
  "description": "prototype application experience/workflow",
  "meaning": "Invoke UC-PLAN-PROTOTYPE to test provisional interaction/workflow, Prototype Scenarios/Screens and candidate DATA/Behavior/Requirements.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/prototype-planning-workflow.md"
  ],
  "expectedOutput": "Reviewed Prototype Plan/Result + candidate Scenario/DATA/Behavior/Requirement evidence.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Application prototype target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

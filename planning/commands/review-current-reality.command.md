# Review Current Application Reality

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_reality.review",
  "file": "review-current-reality.command.md",
  "command": "разбери текущую реальность",
  "englishName": "review current application reality",
  "commandFamily": [
    "разбери текущую реальность",
    "текущая реальность приложения",
    "review current application reality"
  ],
  "description": "establish checked current reality before solution choice",
  "meaning": "Invoke UC-PLAN-REALITY to establish descriptive checked present reality that materially affects solution choice.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md"
  ],
  "expectedOutput": "Checked Current Reality relevant to the selected Need/solution choice.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Real-Life Situation / Need>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

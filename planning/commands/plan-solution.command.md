# Plan Solution

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_solution.plan",
  "file": "plan-solution.command.md",
  "command": "план решения",
  "englishName": "plan solution",
  "commandFamily": [
    "план решения",
    "plan solution",
    "plan whole solution"
  ],
  "description": "plan/review whole solution",
  "meaning": "Invoke UC-PLAN-SOLUTION to compare/select the integrated real-world solution/workflow before assuming custom application work.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md"
  ],
  "expectedOutput": "Current whole Solution/Workflow Variant + integration conclusion.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Real-Life Need / desired result>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

# Plan Practical Testing

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "practical_testing.plan",
  "file": "plan-practical-testing.command.md",
  "command": "план практического тестирования",
  "englishName": "plan practical testing",
  "commandFamily": [
    "план практического тестирования",
    "план тестирования",
    "plan practical testing",
    "practical testing plan"
  ],
  "description": "plan operated practical acceptance",
  "meaning": "Invoke UC-PLAN-TEST-PLAN to compose real human/AI/E2E operated acceptance actions, observable evidence and pass/fail without claiming execution.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/testing-planning/use-case-registry.md",
    "planning/documentation/testing-planning/practical-testing-plan-workflow.md"
  ],
  "expectedOutput": "Practical Testing Plan / acceptance cards or campaign.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "Planned evidence is not executed evidence; actual coverage/evidence review remains UC-PLAN-TEST-COVERAGE.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Selected application/change result>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

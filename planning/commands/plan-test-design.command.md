# Plan Behavior Verification

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "test_design.plan",
  "file": "plan-test-design.command.md",
  "command": "спланируй проверку поведения",
  "englishName": "plan behavior verification",
  "commandFamily": [
    "спланируй проверку поведения",
    "дизайн тестов",
    "plan behavior verification"
  ],
  "description": "design convincing proof for selected behavior",
  "meaning": "Invoke UC-PLAN-TEST-DESIGN to map selected Scenario/Requirement/Domain/Slice behavior to concrete assertions and appropriate proof layers.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/testing-planning/use-case-registry.md",
    "planning/documentation/testing-planning/test-design-workflow.md"
  ],
  "expectedOutput": "Behavior-to-Test Trace + selected proof layers/assertions/boundary decisions.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Selected behavior to verify>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

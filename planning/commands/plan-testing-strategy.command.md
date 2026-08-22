# Plan Testing Strategy

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "testing_strategy.plan",
  "file": "plan-testing-strategy.command.md",
  "command": "стратегия тестирования",
  "englishName": "plan testing strategy",
  "commandFamily": [
    "стратегия тестирования",
    "план стратегии тестирования",
    "plan testing strategy"
  ],
  "description": "plan/review shared testing strategy",
  "meaning": "Invoke UC-PLAN-TEST-STRATEGY when proof responsibility spans several Slices/layers or shared harness/data/isolation/E2E policy matters.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/testing-planning/use-case-registry.md",
    "planning/documentation/testing-planning/testing-strategy-workflow.md"
  ],
  "expectedOutput": "Current testing strategy + layer/shared proof responsibilities.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Testing responsibility / application change>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

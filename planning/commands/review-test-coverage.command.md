# Review Test Coverage

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "test_coverage.review",
  "file": "review-test-coverage.command.md",
  "command": "проверь тестовое покрытие",
  "englishName": "review test coverage",
  "commandFamily": [
    "проверь тестовое покрытие",
    "проверь тесты",
    "review test coverage"
  ],
  "description": "review actual current test evidence",
  "meaning": "Invoke UC-PLAN-TEST-COVERAGE to inspect whether actual current tests/evidence prove selected current meaning.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/testing-planning/use-case-registry.md",
    "planning/documentation/testing-planning/test-coverage-review-workflow.md"
  ],
  "expectedOutput": "Behavior→actual-evidence map + missing/weak/stale/duplicated/wrong-layer findings.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Current behavior / test evidence target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

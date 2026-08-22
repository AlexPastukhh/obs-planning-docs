# Review Application Realization

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_realization.review",
  "file": "review-application-realization.command.md",
  "command": "проверь реализацию приложения",
  "englishName": "review application realization",
  "commandFamily": [
    "проверь реализацию приложения",
    "сравни реализацию приложения",
    "review application realization"
  ],
  "description": "review/compare high-level realization evidence",
  "meaning": "Invoke UC-PLAN-REALIZATION for bounded representative runtime/persistence/integration feasibility evidence without taking Domain authority.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/application-realization-workflow.md"
  ],
  "expectedOutput": "Representative realization picture/comparison + material feasibility/cost/upstream findings.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Application / Domain candidate realization target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

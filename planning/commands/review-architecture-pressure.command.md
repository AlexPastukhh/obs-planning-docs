# Review Architecture Pressure

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "architecture_pressure.review",
  "file": "review-architecture-pressure.command.md",
  "command": "оцени давление на архитектуру",
  "englishName": "review architecture pressure",
  "commandFamily": [
    "оцени давление на архитектуру",
    "давление на архитектуру",
    "review architecture pressure"
  ],
  "description": "derive evidence-backed architecture pressure",
  "meaning": "Invoke UC-PLAN-ARCH-PRESSURE from important current/future paths and contextual WEUC evidence; derive Change Axes only to the degree evidence supports them.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/architecture-change-pressure-workflow.md"
  ],
  "expectedOutput": "Change Pressure picture + evidence-backed Change Axes/confidence + hot paths/findings.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "Prefer contextual WEUC instances/change paths with likelihood/value/timing when future evolution materially drives the pressure.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Architecture / change-pressure target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

# Plan Architecture Decision

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "architecture_decision.plan",
  "file": "plan-architecture-decision.command.md",
  "command": "прими архитектурное решение",
  "englishName": "plan architecture decision",
  "commandFamily": [
    "прими архитектурное решение",
    "спланируй архитектурное решение",
    "plan architecture decision"
  ],
  "description": "plan/review one material architecture decision",
  "meaning": "Invoke UC-PLAN-ARCH-DECISION to compare/select one material architecture choice against important current/future paths and concrete driving evidence.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/architecture-decision-workflow.md",
    "planning/documentation/architecture-planning/templates/ARCHITECTURE-DECISION-TEMPLATE.md"
  ],
  "expectedOutput": "Selected Architecture Decision + affected-path conclusion + rejected complexity/revisit trigger when useful.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "Reference concrete driving WEUC instances/change paths when they materially justify the choice; an abstract Change Axis alone is weaker evidence.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Material architecture pressure/problem/choice>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

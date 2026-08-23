# Plan Slice Strategy

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_slice_strategy.plan",
  "file": "plan-slice-strategy.command.md",
  "command": "план стратегии слайсов",
  "englishName": "plan slice strategy",
  "commandFamily": [
    "план стратегии слайсов",
    "стратегия слайсов",
    "plan slice strategy"
  ],
  "description": "plan/review Slice Strategy",
  "meaning": "Invoke UC-PLAN-SLICE-STRATEGY to choose vertical decomposition/order, including a technical implementation-sequence recommendation when architecture/WEUC evidence materially differs from product priority, without redefining upstream meaning.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/slice-planning-workflow.md"
  ],
  "expectedOutput": "Selected Slice decomposition/order + dependencies/rationale + product-priority/implementation-sequence distinction when material.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied.",
    "Product/Scenario priority is input; recommend technical implementation sequence separately. Pull only the minimum justified prerequisite/seam ahead of lower-priority feature work unless stronger evidence warrants more."
  ],
  "userTarget": "<Application delivery scope>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

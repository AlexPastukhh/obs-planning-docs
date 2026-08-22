# Plan Application Domain

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_domain.plan",
  "file": "plan-domain.command.md",
  "command": "план домена приложения",
  "englishName": "plan application domain",
  "commandFamily": [
    "план домена приложения",
    "план домена",
    "plan application domain",
    "plan domain"
  ],
  "description": "plan/review Application Domain",
  "meaning": "Invoke UC-PLAN-DOMAIN to select the simplest explicit concepts/state/lifecycle/rules/invariants/policies that support current Scenario meaning and justified evolution.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/domain-planning-workflow.md"
  ],
  "expectedOutput": "Selected Domain Draft/meaning + coverage/variation/verification decisions.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Application Domain target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

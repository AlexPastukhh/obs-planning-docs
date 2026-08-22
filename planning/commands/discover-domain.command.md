# Discover Domain Candidates

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_domain.discover",
  "file": "discover-domain.command.md",
  "command": "исследуй домен приложения",
  "englishName": "discover application domain candidates",
  "commandFamily": [
    "исследуй домен приложения",
    "собери домен приложения",
    "discover application domain candidates",
    "discover domain"
  ],
  "description": "discover evidence-backed Domain candidates",
  "meaning": "Invoke UC-PLAN-DOMAIN-DISCOVERY to discover concepts, identity/lifecycle/rule/invariant/policy candidates before selecting Domain authority.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/domain-discovery-workflow.md"
  ],
  "expectedOutput": "Domain evidence + candidates + invariant/policy findings + variants when material.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Application Scenario/DATA/Behavior/Requirements target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

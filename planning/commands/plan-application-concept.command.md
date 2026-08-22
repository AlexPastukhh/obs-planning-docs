# Plan Application Concept

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_concept.plan",
  "file": "plan-application-concept.command.md",
  "command": "план концепции приложения",
  "englishName": "plan application concept",
  "commandFamily": [
    "план концепции приложения",
    "план концепции",
    "application concept",
    "plan application concept"
  ],
  "description": "plan/review Application Concept",
  "meaning": "Invoke UC-PLAN-APP-CONCEPT to assess custom-application value, feasibility, rough effort/maintenance and alternatives before detailed behavior.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md",
    "planning/documentation/application-planning/templates/APPLICATION-CONCEPT-DRAFT-TEMPLATE.md"
  ],
  "expectedOutput": "Reviewed Application Concept + worth-it conclusion.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Application Concept candidate>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

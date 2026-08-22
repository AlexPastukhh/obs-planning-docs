# Research Solution Alternatives

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_research.research",
  "file": "research-solution-alternatives.command.md",
  "command": "исследуй альтернативы решения",
  "englishName": "research solution alternatives",
  "commandFamily": [
    "исследуй альтернативы решения",
    "исследуй решения",
    "research solution alternatives"
  ],
  "description": "research existing solution alternatives",
  "meaning": "Invoke UC-PLAN-RESEARCH to close material evidence gaps before selecting the whole solution.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/use-case-registry.md"
  ],
  "expectedOutput": "Checked alternatives/evidence + disposition for solution choice.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Need / solution-choice evidence gap>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

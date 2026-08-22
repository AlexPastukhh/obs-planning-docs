# Discover Contextual Weucs

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "architecture_weuc.discover",
  "file": "discover-weuc.command.md",
  "command": "собери WEUC",
  "englishName": "discover contextual WEUCs",
  "commandFamily": [
    "собери WEUC",
    "найди WEUC",
    "discover WEUC",
    "discover contextual WEUCs",
    "эволюционные юзкейсы"
  ],
  "description": "discover contextual future-change instances",
  "meaning": "Invoke UC-PLAN-ARCH-DISCOVER-WEUC to enumerate concrete future-change instances, likelihood/value/timing, expected change paths and friction/fan-out/risk.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/architecture-planning/templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md"
  ],
  "expectedOutput": "Contextual WEUC instances + likelihood/value/timing + change paths + architecture handoff.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "Prefer contextual instances over generic flexibility. Use stable IDs/register only when cross-plan tracking is materially useful.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Concrete target code/workspace area>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

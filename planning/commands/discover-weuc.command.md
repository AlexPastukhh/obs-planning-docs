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
    "эволюционные юзкейсы",
    "исследуй WEUC-инстансы",
    "изучи инстансы эволюции",
    "discover WEUC instances"
  ],
  "description": "discover contextual Workspace Evolution Use-Case instances",
  "meaning": "Invoke UC-PLAN-ARCH-DISCOVER-WEUC to discover concrete contextual WEUC Instances (optionally grouped by reusable WEUC Type), assess likelihood/horizon/value/confidence, current-work overlap, preparation-now vs deferred cost, expected Workspace Change Paths and applicable work-cost/friction/risk evidence.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/architecture-planning/templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md"
  ],
  "expectedOutput": "Contextual WEUC Instances + optional WEUC Type grouping + likelihood/horizon/value/confidence + current-work overlap/preparation-vs-deferred cost + expected Workspace Change Paths + work-cost/friction/risk + architecture handoff.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "Prefer contextual instances over generic flexibility. Use stable IDs/register only when cross-plan tracking is materially useful.",
    "No repository mutation, archive, commit or push is implied.",
    "A future instance is architecture evidence only to the degree likelihood/horizon/value/current-work overlap and preparation-now vs deferred cost justify paying Architectural Tax now."
  ],
  "userTarget": "<Concrete target code/workspace area>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

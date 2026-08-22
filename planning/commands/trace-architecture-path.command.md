# Trace Architecture-Relevant Path

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "architecture_path.trace",
  "file": "trace-architecture-path.command.md",
  "command": "разбери путь изменения",
  "englishName": "trace architecture-relevant path",
  "commandFamily": [
    "разбери путь изменения",
    "разбери change path",
    "trace architecture-relevant path",
    "trace change path"
  ],
  "description": "trace one architecture-relevant change/understanding/runtime path",
  "meaning": "Invoke UC-PLAN-ARCH-PATH to inspect the concrete path required for one material result or future change and expose locality/fan-out/friction as architecture evidence.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/architecture-path-analysis-workflow.md"
  ],
  "expectedOutput": "Checked Workspace Change/Understanding/Runtime path + qualitative architecture findings.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Resolve the matching current canonical Use Case and follow its complete current owner route; the command is invocation/orchestration only.",
    "Preserve Real-Life Need → selected solution/responsibility → Scenario/UC dependency direction and Current→Target meaning.",
    "Do not let downstream implementation convenience redefine upstream behavior/Domain truth.",
    "Use concrete contextual WEUC instances/change paths and their likelihood/value/timing when future change drives the architecture question; generic flexibility alone is not evidence.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<Workspace UC / contextual WEUC instance / Application Scenario path>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

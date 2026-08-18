# Current State

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "current_state.report",
  "file": "current-state.command.md",
  "command": "положняк",
  "englishName": "current state",
  "commandFamily": [
    "положняк",
    "polozh",
    "current state"
  ],
  "description": "current state",
  "meaning": "Report current operational repo/chat/planning state.",
  "activeContextBehavior": "Use active area/work item if clear.",
  "traversalReadMode": "Targeted source checks for state claims.",
  "ownerFiles": [
    "planning/use-case-registry.md",
    "planning/documentation/status-reconciliation-workflow.md"
  ],
  "expectedOutput": "Concise current state separating repo, local and unknown, plus next safe action.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Report current repo/chat/planning state from checked current owners.",
    "Separate known, local, unknown and not checked.",
    "Use Directions/Use Cases to resolve the current owner instead of a manually synchronized global state register.",
    "Do not present an unstated future plan as confirmed.",
    "Do not edit or archive unless separately requested."
  ],
  "userTarget": "<state target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

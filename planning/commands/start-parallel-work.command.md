# Start Parallel Work

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "parallel_workspace.start",
  "file": "start-parallel-work.command.md",
  "command": "начни параллельную работу",
  "englishName": "start parallel work",
  "commandFamily": [
    "начни параллельную работу",
    "start parallel work",
    "parallel workspace"
  ],
  "description": "use registered parallel-work scope",
  "meaning": "Resolve the fixed Parallel Work Scope Registry and establish one workstream inside the already registered affected scope(s), including canonical scope-log ownership for cross-scope work.",
  "activeContextBehavior": "Use the active work target when clear; otherwise ask only for the concrete workstream target needed to resolve existing registered scope(s).",
  "traversalReadMode": "Targeted/full by affected registered scope(s).",
  "ownerFiles": [
    "parallel-work-scope-registry.md",
    "planning/documentation/parallel-work-scope-and-action-log-workflow.md"
  ],
  "expectedOutput": "Selected registered parallel-work scope(s), canonical scope log for the work, cross-scope boundary/reference requirements and the route-specific next action; no ad-hoc shadow workspace.",
  "permissionMode": "scope-routing-only",
  "keyReminders": [
    "Read the root Scope Registry; do not invent or repartition scopes ad hoc.",
    "A path belongs to the deepest active registered scope root containing it.",
    "For cross-scope work choose one affected canonical log for the full record; other affected logs hold references only.",
    "This command selects scope/log routing only and does not itself authorize edits, archive creation, commit or push."
  ],
  "userTarget": "<parallel workstream target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

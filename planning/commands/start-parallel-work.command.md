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
  "description": "parallel workspace",
  "meaning": "Start or plan one staging-only parallel workspace.",
  "activeContextBehavior": "Ask scope if no concrete agent/workstream target.",
  "traversalReadMode": "Targeted/full by workspace scope.",
  "ownerFiles": [
    "planning/documentation/parallel-work/README.md",
    "planning/documentation/parallel-work/parallel-workflow.md",
    "planning/documentation/parallel-work/PARALLEL-WORKSPACE-TEMPLATE.md"
  ],
  "expectedOutput": "Parallel workspace plan/package when requested; no direct canonical-doc edits.",
  "permissionMode": "staging-only",
  "keyReminders": [
    "Start one staging-only workspace only for a concrete target.",
    "Do not edit shared canonical docs directly from workspace phase.",
    "Do not create aggregate sync until a sync-candidate workspace exists."
  ],
  "userTarget": "<parallel agent/workstream target>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

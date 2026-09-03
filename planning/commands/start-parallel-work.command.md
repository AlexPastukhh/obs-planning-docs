# Start Parallel Work — Legacy Compatibility

Status: legacy compatibility command definition
Scope: retired fixed parallel-work-scope invocation. No current branch-based coordination methodology is defined by this command.

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
  "description": "legacy compatibility command for retired fixed parallel-work scopes",
  "meaning": "The former fixed Scope Registry/action-log coordination model is retired. Do not route current work through it and do not invent a branch workflow here; use the current ordinary work route until branch-based coordination has its own accepted owner.",
  "activeContextBehavior": "Explain the retirement boundary and continue only through current non-legacy owners selected for the actual work.",
  "traversalReadMode": "Current navigation only; legacy provenance may be read only when historical analysis is explicitly requested.",
  "ownerFiles": [],
  "expectedOutput": "A concise retirement/route clarification; no fixed-scope selection and no invented branch semantics.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Fixed registered parallel-work scopes are legacy.",
    "Do not treat legacy scope/action-log files as current authority.",
    "Do not infer branch lifecycle, naming, merge, publish or isolation rules before a current branch-work owner exists.",
    "This compatibility command grants no edit, archive, commit or push permission."
  ],
  "userTarget": "<parallel workstream target>",
  "palette": false,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

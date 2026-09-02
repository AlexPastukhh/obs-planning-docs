# End Session

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.end",
  "file": "end-session.command.md",
  "command": "конец",
  "englishName": "end session",
  "commandFamily": [
    "конец",
    "конец сессии",
    "end session"
  ],
  "description": "operational end session",
  "meaning": "Add exactly one completed normal session to the existing active operational day.",
  "activeContextBehavior": "Read planning/dashboard/index.md; require active_session_day and matching active_day/operational dates; ask only for missing final D/F/Points.",
  "traversalReadMode": "Targeted: index → active operational day → end-session workflow → Day File Template → Real Reward Work Loop Workflow.",
  "ownerFiles": [
    "planning/areas/planning-system/end-session-command-workflow.md",
    "planning/documentation/reviewable-agent-output-and-commands-workflow.md",
    "planning/dashboard/index.md",
    "-Planning/Templates/Day File Template.md",
    "-Planning/Workflows/Real Reward Work Loop Workflow.md"
  ],
  "expectedOutput": "Full replacement archive containing only the active operational-day file plus apply/diff commands; user pastes diff before commit.",
  "permissionMode": "package-no-commit-push",
  "keyReminders": [
    "Require an existing active_session_day from planning/dashboard/index.md.",
    "Require matching active_day and operational dates.",
    "Ask only for missing final D/F/Points.",
    "Produce a full replacement archive containing only the active operational-day file plus apply/diff commands.",
    "Ask user to paste the diff before commit.",
    "Do not commit or push."
  ],
  "userTarget": "<final D/F/Points or active end-session target>",
  "palette": false,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

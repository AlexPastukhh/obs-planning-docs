# Recheck Context

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "context_recheck.apply",
  "file": "recheck-context.command.md",
  "command": "обс",
  "englishName": "recheck context",
  "commandFamily": [
    "обс",
    "chat rech",
    "recheck"
  ],
  "description": "context recheck",
  "meaning": "Recheck prior answer/context/sources/diff before continuing.",
  "activeContextBehavior": "Use current conversation target; ask if unclear.",
  "traversalReadMode": "Targeted/full by risk.",
  "ownerFiles": [],
  "expectedOutput": "Corrected answer/review with uncertainty stated.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Re-check relevant prior discussion.",
    "Preserve accepted decisions and constraints.",
    "State what was checked and what remains unavailable."
  ],
  "userTarget": "<what discussion/context should be rechecked>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

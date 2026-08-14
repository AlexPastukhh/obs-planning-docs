# Plan Now

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "plan.now",
  "file": "plan-now.command.md",
  "command": "планируй",
  "englishName": "plan now",
  "commandFamily": [
    "планируй",
    "plan now"
  ],
  "description": "plan now",
  "meaning": "Plan the next concrete step now from active context.",
  "activeContextBehavior": "Use active context if available; otherwise ask for target.",
  "traversalReadMode": "Reuse/targeted by uncertainty.",
  "ownerFiles": [],
  "expectedOutput": "Concrete next step/scope/boundary/evidence/next action.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "Plan the next concrete step now.",
    "Treat only explicit user statements and checked source facts as confirmed.",
    "For important unknowns, show prioritized questions with one conservative fallback instruction.",
    "State scope, boundary, evidence and next action.",
    "Do not edit files or create archive unless separately requested."
  ],
  "userTarget": "<what should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

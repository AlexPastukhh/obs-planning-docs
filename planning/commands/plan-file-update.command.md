# Plan File Update

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "file_update.plan",
  "file": "plan-file-update.command.md",
  "command": "план файл-обновление",
  "englishName": "plan file update",
  "commandFamily": [
    "план файл-обновление",
    "спланируй обновление файлов",
    "спланируй архив",
    "plan file update",
    "archive plan"
  ],
  "description": "file plan",
  "meaning": "Produce a concrete file/docs/code/archive update plan.",
  "activeContextBehavior": "Ask target/scope only when active context does not make it clear.",
  "traversalReadMode": "Reuse/targeted/full by update risk.",
  "ownerFiles": [
    "planning/documentation/file-update-overview-workflow.md",
    "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md"
  ],
  "expectedOutput": "Plan with files, responsibilities, what/why/boundaries/checks/next action.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "Plan file/docs/code/archive update only.",
    "Treat only explicit user statements and checked source facts as confirmed.",
    "For important unknowns, show prioritized questions with one conservative fallback instruction.",
    "End with `План файл-обновление` in planned mode.",
    "Do not edit files.",
    "Do not create archive unless separately requested."
  ],
  "userTarget": "<what update/archive should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

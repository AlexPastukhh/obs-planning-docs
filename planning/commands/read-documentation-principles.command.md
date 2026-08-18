# Bootstrap Reusable Documentation Principles

Status: active project command definition
Scope: reusable documentation-governance bootstrap shortcut; semantic authority remains in linked registries/principles/current owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation_principles.read",
  "file": "read-documentation-principles.command.md",
  "command": "бутстреп документации",
  "englishName": "bootstrap reusable documentation principles",
  "commandFamily": [
    "бутстреп документации",
    "бутстреп принципов документации",
    "режим документации",
    "прочитай принципы документации",
    "прочти принципы документации",
    "принципы документации",
    "bootstrap reusable documentation principles",
    "documentation governance mode",
    "read documentation principles",
    "documentation principles",
    "docs principles"
  ],
  "description": "load reusable documentation governance",
  "meaning": "Establish reusable documentation-governance context, resolve the applicable Documentation Use Case and canonical owners, and preserve the task's permission boundary without authorizing repository edits.",
  "activeContextBehavior": "Use the active documentation/repository target when clear and resolve its UC-DOC-* + owners; if no task is active, load governance and stop ready for the next documentation task without forcing a target question.",
  "traversalReadMode": "Full when reusable governance is not current/remembered or uncertain; targeted refresh only after a current full bootstrap.",
  "ownerFiles": [
    "planning/AI-WORKING-CONTRACT.md",
    "planning/documentation/direction-registry.md",
    "planning/documentation/use-case-registry.md",
    "planning/documentation/planning-docs-architecture-principles.md",
    "planning/documentation/documentation-responsibility-map.md",
    "planning/documentation/documentation-principles-read-workflow.md"
  ],
  "expectedOutput": "Compact reusable-documentation bootstrap result: selected Documentation Use Case when applicable, reusable owners loaded, current/project owners, permission boundary and material unresolved ownership/questions; no repository mutation.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Apply reusable documentation principles to documentation work after this bootstrap.",
    "Resolve DIR-DOCUMENTATION / the applicable UC-DOC-* and canonical owner before proposing a new file or moving meaning.",
    "Keep reusable methodology separate from project/current state; README/index navigation does not own full semantic bodies.",
    "Commands, examples, helper projections and implementation do not override canonical semantic owners.",
    "Use full bootstrap when governance is not current/remembered or boundaries are uncertain; targeted refresh only after a current full pass.",
    "If no active task exists, load governance and stop ready for the next documentation task instead of inventing a target.",
    "This command is read-only and does not authorize file edits, archive creation, commit or push."
  ],
  "userTarget": "<documentation work in this session or none yet>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

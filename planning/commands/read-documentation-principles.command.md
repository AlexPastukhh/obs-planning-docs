# Read Documentation Principles

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation_principles.read",
  "file": "read-documentation-principles.command.md",
  "command": "прочитай принципы документации",
  "englishName": "read documentation principles",
  "commandFamily": [
    "прочитай принципы документации",
    "прочти принципы документации",
    "принципы документации",
    "read documentation principles",
    "documentation principles",
    "docs principles"
  ],
  "description": "documentation preflight",
  "meaning": "Perform the documentation architecture/ownership/update preflight.",
  "activeContextBehavior": "Use active documentation task if clear; otherwise report the reusable read path and ask only for target when needed.",
  "traversalReadMode": "Full when not read/remembered or uncertain; targeted refresh only after a current full pass.",
  "ownerFiles": [
    "planning/documentation/documentation-principles-read-workflow.md",
    "planning/documentation/planning-docs-architecture-principles.md",
    "planning/documentation/documentation-responsibility-map.md"
  ],
  "expectedOutput": "Read-only checked/not-checked/authority/owner-zone/read-route/boundary report.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Read-only documentation architecture, ownership and update preflight.",
    "Use full mode when the route has not been read, is not remembered, or ownership/boundaries are uncertain.",
    "Use targeted refresh only after a current full pass.",
    "Report Checked, Not checked, Authority/layer, Correct owner zone, Required route read and Boundaries.",
    "Do not edit files, create an archive, commit or push."
  ],
  "userTarget": "<documentation task or owner question>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

# Documentation Governance Mode

Status: active project command definition
Scope: working-context governance shortcut; semantic authority remains in linked registries/principles.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "palette": true,
  "refinements": [],
  "id": "governance.documentation",
  "file": "documentation-governance.command.md",
  "command": "режим документации",
  "englishName": "documentation governance mode",
  "commandFamily": [
    "режим документации",
    "documentation governance mode"
  ],
  "description": "load documentation governance",
  "meaning": "Establish reusable documentation-governance context for the active work without authorizing repository edits.",
  "activeContextBehavior": "Use the active documentation/repository target when clear.",
  "traversalReadMode": "Full for governance owners; targeted for the selected Use Case/current owner.",
  "ownerFiles": [
    "planning/AI-WORKING-CONTRACT.md",
    "planning/documentation/direction-registry.md",
    "planning/documentation/use-case-registry.md",
    "planning/documentation/planning-docs-architecture-principles.md",
    "planning/documentation/documentation-responsibility-map.md",
    "planning/documentation/documentation-principles-read-workflow.md"
  ],
  "expectedOutput": "Established documentation governance route: selected Use Case, canonical owner boundary and required reusable principles; no repository mutation.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Apply reusable documentation principles to all documentation work in this session.",
    "Resolve the semantic Use Case and canonical owner before proposing a new file or moving meaning.",
    "Keep reusable methodology separate from project-local state.",
    "README/index routes; it does not duplicate full owner meaning.",
    "Examples/projections do not override canonical owners.",
    "This command establishes working rules only; it does not authorize repository edits."
  ],
  "userTarget": "<documentation work in this session>"
}
[/PLANNING_COMMAND_DEFINITION]

# Plan Workspace Architecture Position — Compatibility Alias

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.weuc.architecture-position",
  "file": "plan-workspace-architecture-position.command.md",
  "command": "продумай архитектурную позицию воркспейса",
  "englishName": "plan workspace architecture position",
  "commandFamily": [
    "продумай архитектурную позицию воркспейса"
  ],
  "description": "legacy compatibility alias; routes to current evolution/architecture authority",
  "meaning": "Legacy TM-WEUC architecture-position phrase. Route to Workspace Architecture Planning State/Decision work or normal Target Formation for one independently material architecture question.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/architecture-state-review-workflow.md",
    "planning/documentation/architecture-planning/architecture-decision-workflow.md",
    "planning/documentation/architecture-planning/use-case-registry.md"
  ],
  "expectedOutput": "Current Architecture State/Decision result with applicability, rationale and revalidation trigger; no permanent TM-WEUC global owner.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Compatibility alias only; there is no permanent TM-WEUC or canonical SDS Workspace Evolution Map.",
    "Use current natural owner/Architecture Planning/L5 semantics rather than reviving old WEUC Target ownership.",
    "Material project-global architecture choices use the Workspace Architecture Planning or normal Target Formation/Decisions.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<workspace architecture question>",
  "palette": false,
  "helperPresentation": null,
  "refinements": [],
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

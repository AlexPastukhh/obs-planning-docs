# Refresh Evolution Evidence — Compatibility Alias

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.weuc.refresh",
  "file": "refresh-workspace-evolution-map.command.md",
  "command": "обнови карту эволюции воркспейса",
  "englishName": "refresh workspace evolution map",
  "commandFamily": [
    "обнови карту эволюции воркспейса"
  ],
  "description": "legacy compatibility alias; routes to current evolution/architecture authority",
  "meaning": "Legacy map-refresh phrase. Re-run the relevant Workspace Architecture Planning evolution/change-pressure review for the affected scope; no canonical SDS Workspace Evolution Map is refreshed.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/architecture-planning/architecture-change-pressure-workflow.md"
  ],
  "expectedOutput": "Refreshed contextual change-pressure/evolution evidence and any resulting Architecture Planning handoff; no mandatory global map.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Compatibility alias only; there is no permanent TM-WEUC or canonical SDS Workspace Evolution Map.",
    "Use current natural owner/Architecture Planning/L5 semantics rather than reviving old WEUC Target ownership.",
    "Material project-global architecture choices use the Workspace Architecture Planning Direction or normal Target Formation/Decisions.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<affected Workspace scope / evolution evidence>",
  "palette": false,
  "directionIds": [
    "DIR-PLAN-ARCHITECTURE"
  ],
  "helperPresentation": null,
  "refinements": [],
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

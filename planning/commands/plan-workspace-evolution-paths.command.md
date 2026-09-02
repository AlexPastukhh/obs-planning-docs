# Plan Workspace Evolution Paths — Compatibility Alias

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.weuc.paths",
  "file": "plan-workspace-evolution-paths.command.md",
  "command": "распиши пути эволюции воркспейса",
  "englishName": "plan workspace evolution paths",
  "commandFamily": [
    "распиши пути эволюции воркспейса"
  ],
  "description": "legacy compatibility alias; routes to current evolution/architecture authority",
  "meaning": "Legacy TM-WEUC path phrase. Route to Workspace Architecture Planning path/evolution workflows for expected Workspace change paths; do not create a global SDS evolution-map Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/architecture-path-analysis-workflow.md",
    "planning/documentation/architecture-planning/architecture-evolution-workflow.md",
    "planning/documentation/architecture-planning/use-case-registry.md"
  ],
  "expectedOutput": "Evidence-backed Workspace change/path/evolution planning at the depth justified by the architecture question.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Compatibility alias only; there is no permanent TM-WEUC or canonical SDS Workspace Evolution Map.",
    "Use current natural owner/Architecture Planning/L5 semantics rather than reviving old WEUC Target ownership.",
    "Material project-global architecture choices use the Workspace Architecture Planning or normal Target Formation/Decisions.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<Workspace architecture/evolution path problem>",
  "palette": false,
  "helperPresentation": null,
  "refinements": [],
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

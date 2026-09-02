# Discover Workspace Evolution Pressure — Compatibility Alias

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "architecture_weuc.discover",
  "file": "discover-weuc.command.md",
  "command": "спланируй эволюцию воркспейса",
  "englishName": "plan workspace evolution",
  "commandFamily": [
    "спланируй эволюцию воркспейса",
    "собери WEUC"
  ],
  "description": "legacy compatibility alias; routes to current evolution/architecture authority",
  "meaning": "Legacy WEUC phrase. Route to Workspace Architecture Planning contextual evolution-use discovery (UC-PLAN-ARCH-DISCOVER-WEUC); this discovers evidence-backed future change instances/paths and does not create TM-WEUC or a global evolution-map owner.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md"
  ],
  "expectedOutput": "Contextual future-change instances, likelihood/horizon/value/confidence and expected change-path/friction evidence for Architecture Planning.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Compatibility alias only; there is no permanent TM-WEUC or canonical SDS Workspace Evolution Map.",
    "Use current natural owner/Architecture Planning/L5 semantics rather than reviving old WEUC Target ownership.",
    "Material project-global architecture choices use the Workspace Architecture Planning or normal Target Formation/Decisions.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<workspace area / expected future change>",
  "palette": false,
  "helperPresentation": null,
  "refinements": [],
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

# Interpret Plan Through Evolution — Compatibility Alias

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.weuc.interpret",
  "file": "interpret-workspace-evolution.command.md",
  "command": "интерпретируй план с точки зрения эволюции воркспейса",
  "englishName": "interpret plan through workspace evolution",
  "commandFamily": [
    "интерпретируй план с точки зрения эволюции воркспейса"
  ],
  "description": "legacy compatibility alias; routes to current evolution/architecture authority",
  "meaning": "Legacy WEUC interpretation phrase. Resolve/reuse the natural Target and apply L5 Evolution / Change Isolation; if the question is genuinely workspace-wide architecture, route it to Architecture Planning / normal Target Formation.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md",
    "planning/documentation/architecture-planning/use-case-registry.md"
  ],
  "expectedOutput": "Target-local planned-evolution/change-isolation findings, or an explicit handoff to Workspace Architecture Planning when the scope is independently global.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Compatibility alias only; there is no permanent TM-WEUC or canonical SDS Workspace Evolution Map.",
    "Use current natural owner/Architecture Planning/L5 semantics rather than reviving old WEUC Target ownership.",
    "Material project-global architecture choices use the Workspace Architecture Planning or normal Target Formation/Decisions.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<current Target / plan / Workspace question>",
  "palette": false,
  "helperPresentation": null,
  "refinements": [],
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

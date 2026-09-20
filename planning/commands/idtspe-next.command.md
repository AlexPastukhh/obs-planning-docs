# Show Methodology Next Step

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.next",
  "file": "idtspe-next.command.md",
  "command": "что дальше по методологии",
  "englishName": "show methodology next step",
  "commandFamily": [
    "что дальше по методологии"
  ],
  "description": "Show the currently useful methodology action without executing it.",
  "meaning": "Evaluate the current Use-Case set and `UC-IDTSPE-COMPOSE-CURRENT-WORK`, then show the smallest useful next methodology action without executing that action. A valid answer may be to continue Broad Discussion or make no structural change; do not force a next Target.",
  "activeContextBehavior": "Use current Work Context and current/re-evaluated Use-Case applicability. Do not invent a Target or invoke a component only to satisfy a fixed sequence; preserve USER steering and permission boundaries.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Methodology Next-Step View: current concern / relevant Use Cases / recommended smallest useful action / why / alternatives / recheck trigger; no action executed.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "IDTSPE is already active; this shortcut does not enable a mode.",
    "Use Cases compose methodology use; Target Modules/Lenses own specialized work.",
    "Broad Discussion or NO_ADDITIONAL_STRUCTURE is a valid proportional outcome.",
    "Ordinary in-scope progression is not an approval gate; explicit mutation/commit/push permissions remain separate."
  ],
  "userTarget": "<current planning state>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]

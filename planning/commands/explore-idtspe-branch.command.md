# Explore IDTSPE Planning Branch

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.branch.explore",
  "file": "explore-idtspe-branch.command.md",
  "command": "исследуй ветку idtspe",
  "englishName": "explore IDTSPE planning branch",
  "commandFamily": [
    "исследуй ветку idtspe"
  ],
  "description": "Run the canonical counterfactual Branch exploration operation when alternatives require material downstream exploration.",
  "meaning": "Use the Branch model to create/continue bounded counterfactual exploration, compare consequences and rejoin/promote only through its canonical guards.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/branches/PLANNING-BRANCH-COUNTERFACTUAL-EXPLORATION.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.PLANNING-BRANCH",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/branches/PLANNING-BRANCH-COUNTERFACTUAL-EXPLORATION.md",
      "anchor": "5-branch-exploration-contract",
      "why": "Owns bounded counterfactual exploration, branch-local consequences and comparison/rejoin semantics.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-branch.command.md"
  ],
  "expectedOutput": "Bounded Branch exploration/comparison result or CHECKED_NO_RESULT when branch depth is not justified.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Branch exploration is not a Target type.",
    "Projected branch consequences are not actual evidence."
  ],
  "userTarget": "<current IDTSPE subject/context>",
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

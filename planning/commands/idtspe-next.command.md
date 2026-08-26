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
  "description": "Show Methodology Direction without executing it.",
  "meaning": "Show Methodology Direction without executing it.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Methodology Direction View: Current Target / Exit Gate / recommended next / why / alternatives / reopen triggers.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is an IDTSPE orchestration/validator surface, not a Target Module.",
    "Preserve the current Target/owner graph and normal permission boundaries.",
    "Do not mutate repository files, implement, test, commit or push."
  ],
  "userTarget": "<current planning state>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "Use when you want to know the recommended next methodological Target/action without starting it.",
    "whatYouGet": "Methodology Direction View: Current Target / Exit Gate / recommended next / why / alternatives / reopen triggers.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 2,
      "kindLabel": "ORCHESTRATION",
      "viewOrder": 0
    }
  },
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

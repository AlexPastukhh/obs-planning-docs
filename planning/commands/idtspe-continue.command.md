# Continue By Methodology

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.continue",
  "file": "idtspe-continue.command.md",
  "command": "продолжи по методологии",
  "englishName": "continue by methodology",
  "commandFamily": [
    "продолжи по методологии"
  ],
  "description": "Resolve the current recommended next Target and invoke it through normal IDTSPE.",
  "meaning": "Resolve the current recommended next Target and invoke it through normal IDTSPE.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "The next Target is invoked through IDTSPE with normal gates/permissions; no fake Target is created.",
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
    "whenToUse": "Use when the current Methodology Direction is clear and you want to execute the recommended next Target.",
    "whatYouGet": "The next Target is invoked through IDTSPE with normal gates/permissions; no fake Target is created.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 3,
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

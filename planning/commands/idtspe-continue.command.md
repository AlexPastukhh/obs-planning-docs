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
  "description": "Continue with the currently useful methodology action.",
  "meaning": "Re-evaluate the current Use-Case set and `UC-IDTSPE-COMPOSE-CURRENT-WORK`, then perform the smallest useful ordinary in-scope methodology action. This may continue Broad Discussion, refine current State, invoke an applicable Target Module/Lens, or integrate/revalidate when triggered; it does not require a next Target.",
  "activeContextBehavior": "Use current Work Context and current/re-evaluated Use-Case applicability. Do not invent a Target or invoke a component only to satisfy a fixed sequence; preserve USER steering and permission boundaries.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-methodology-use-case-registry.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "The smallest useful ordinary methodology action is performed under current permissions; optional Target/Unit/Lens/Checkpoint structure is introduced only when material.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "IDTSPE is already active; this shortcut does not enable a mode.",
    "Use Cases compose methodology use; Target Modules/Lenses own specialized work.",
    "Broad Discussion or NO_ADDITIONAL_STRUCTURE is a valid proportional outcome.",
    "Ordinary in-scope progression is not an approval gate; explicit mutation/commit/push permissions remain separate."
  ],
  "userTarget": "<current planning state>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when you want the methodology to continue from current context without naming a specific component.",
    "whatYouGet": "Continuation through the current Use-Case-driven IDTSPE composition, without mandatory stage or Target progression.",
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

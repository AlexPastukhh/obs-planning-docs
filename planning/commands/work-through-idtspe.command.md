# Work Through Idtspe

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.work",
  "file": "work-through-idtspe.command.md",
  "command": "работай через idtspe",
  "englishName": "work through IDTSPE",
  "commandFamily": [
    "работай через idtspe",
    "режим idtspe"
  ],
  "description": "Use IDTSPE as the default material-planning operating mode.",
  "meaning": "Resolve scope/Target and continue material planning through the IDTSPE Shell; AI proposals remain Ideas until selected.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Target/scope resolution and an IDTSPE planning result with Q/R/P, Decisions, Artifact Placement and Methodology Direction when material.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<current planning work>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "When you want subsequent material planning to run through IDTSPE without choosing an SDS module manually.",
    "whatYouGet": "Current Target/scope resolution and an IDTSPE planning result with Q/R/P, Decisions, Artifact Placement and Methodology Direction when material.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 1,
      "kindLabel": "WORK MODE",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "WORK_MODE",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]

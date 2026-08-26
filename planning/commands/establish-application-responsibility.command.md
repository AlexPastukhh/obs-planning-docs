# Establish Application Responsibility

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_responsibility.establish",
  "file": "establish-application-responsibility.command.md",
  "command": "определи ответственность приложения",
  "englishName": "establish application responsibility",
  "commandFamily": [
    "определи ответственность приложения"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-APPLICATION-DEFINITION intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Responsibility-boundary refinement of the same Application Definition Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Application responsibility boundary>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when the immediate question is what the Application itself should own versus external/manual/system responsibilities.",
    "whatYouGet": "Responsibility-boundary refinement of the same Application Definition Target.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "01",
      "sectionLabel": "01 Application",
      "sectionOrder": 1,
      "itemOrder": 2,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "tmcmd.application.definition",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-APPLICATION-DEFINITION",
    "lensId": null,
    "parentSurface": "tmcmd.application.definition",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

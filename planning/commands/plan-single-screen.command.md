# Plan One Screen

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.screen.single",
  "file": "plan-single-screen.command.md",
  "command": "спланируй экран",
  "englishName": "plan one screen",
  "commandFamily": [
    "спланируй экран"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-SCREEN intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "One Screen Draft scope within the same Screen Target family.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one selected Screen>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when one independently addressable Screen needs focused spatial/responsibility planning.",
    "whatYouGet": "One Screen Draft scope within the same Screen Target family.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "02",
      "sectionLabel": "02 Scenarios & Interaction",
      "sectionOrder": 2,
      "itemOrder": 3,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "tmcmd.screen",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-SCREEN",
    "lensId": null,
    "parentSurface": "tmcmd.screen",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

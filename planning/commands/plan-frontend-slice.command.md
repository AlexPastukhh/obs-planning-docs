# Plan Frontend Slice

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.slice.frontend",
  "file": "plan-frontend-slice.command.md",
  "command": "спланируй frontend",
  "englishName": "plan frontend slice",
  "commandFamily": [
    "спланируй frontend"
  ],
  "description": "frontend slice",
  "meaning": "Run TM-FRONTEND-SLICE through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-FRONTEND-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Frontend Target plan when justified, otherwise a route to keep frontend realization in the parent Slice.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one promoted frontend target>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when frontend realization is independently material enough to promote from a parent Slice Part Plan.",
    "whatYouGet": "Frontend Target plan when justified, otherwise a route to keep frontend realization in the parent Slice.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "07",
      "sectionLabel": "07 Slice Realization",
      "sectionOrder": 7,
      "itemOrder": 3,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "CONDITIONAL"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-FRONTEND-SLICE",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

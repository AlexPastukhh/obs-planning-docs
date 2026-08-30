# Detail Slice Implementation

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.slice.implementation.detail",
  "file": "detail-slice-implementation.command.md",
  "command": "детализируй реализацию слайса",
  "englishName": "detail slice implementation",
  "commandFamily": [
    "детализируй реализацию слайса"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-IMPLEMENTATION-SLICE intent on the same already selected/reused bounded Slice Target; do not create a new Target identity.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Refined Runtime Path, Codebase Integration Path, Domain Elements Used and proportional Part Plans for the same Slice Target; no new Target identity.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<existing Slice>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when the bounded Slice Target already exists and its implementation sequencing/runtime path needs deeper concrete detail.",
    "whatYouGet": "Refined Runtime Path, Codebase Integration Path, Domain Elements Used and proportional Part Plans for the same already selected Slice Target; no new Target identity.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "07",
      "sectionLabel": "07 Slice Realization",
      "sectionOrder": 7,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "application_slice.plan",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-IMPLEMENTATION-SLICE",
    "lensId": null,
    "parentSurface": "application_slice.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

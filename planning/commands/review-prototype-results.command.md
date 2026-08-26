# Review Prototype Results

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.prototype.review",
  "file": "review-prototype-results.command.md",
  "command": "разбери результаты прототипа",
  "englishName": "review prototype results",
  "commandFamily": [
    "разбери результаты прототипа"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-PROTOTYPE intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PROTOTYPE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Evidence interpretation, closed/residual uncertainty, Decisions and downstream revalidation.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<prototype subject with actual Evidence>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use after a prototype/experiment produced actual Evidence that should update the same Prototype Target.",
    "whatYouGet": "Evidence interpretation, closed/residual uncertainty, Decisions and downstream revalidation.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "01",
      "sectionLabel": "01 Application",
      "sectionOrder": 1,
      "itemOrder": 4,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "application_prototype.plan",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-PROTOTYPE",
    "lensId": null,
    "parentSurface": "application_prototype.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

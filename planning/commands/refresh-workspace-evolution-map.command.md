# Refresh Workspace Evolution Map

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.weuc.refresh",
  "file": "refresh-workspace-evolution-map.command.md",
  "command": "обнови карту эволюции воркспейса",
  "englishName": "refresh workspace evolution map",
  "commandFamily": [
    "обнови карту эволюции воркспейса"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-WEUC intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-WEUC.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "EXTEND/REFRESH/RECONCILE of the same Workspace Evolution Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<existing Workspace Evolution owner>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION",
    "DIR-PLAN-ARCHITECTURE"
  ],
  "helperPresentation": {
    "whenToUse": "Use when the existing Workspace Evolution owner is stale after new Decisions/Evidence.",
    "whatYouGet": "EXTEND/REFRESH/RECONCILE of the same Workspace Evolution Target.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "03",
      "sectionLabel": "03 Workspace Evolution & Architecture",
      "sectionOrder": 3,
      "itemOrder": 3,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "architecture_weuc.discover",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-WEUC",
    "lensId": null,
    "parentSurface": "architecture_weuc.discover",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

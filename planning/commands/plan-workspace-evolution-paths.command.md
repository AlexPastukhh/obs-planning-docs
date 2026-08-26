# Plan Workspace Evolution Paths

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.weuc.paths",
  "file": "plan-workspace-evolution-paths.command.md",
  "command": "распиши пути эволюции воркспейса",
  "englishName": "plan workspace evolution paths",
  "commandFamily": [
    "распиши пути эволюции воркспейса"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-WEUC intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-WEUC.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "PROJECTED_WORKSPACE_EVOLUTION paths, dependencies, extension points and revalidation triggers.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<workspace evolution target>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION",
    "DIR-PLAN-ARCHITECTURE"
  ],
  "helperPresentation": {
    "whenToUse": "Use when projected Workspace change paths/extension points need explicit planning.",
    "whatYouGet": "PROJECTED_WORKSPACE_EVOLUTION paths, dependencies, extension points and revalidation triggers.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "03",
      "sectionLabel": "03 Workspace Evolution & Architecture",
      "sectionOrder": 3,
      "itemOrder": 2,
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

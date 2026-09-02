# Check Whether It Can Be Simplified

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "lenscmd.simplicity.check",
  "file": "check-simplicity.command.md",
  "command": "проверь можно ли упростить",
  "englishName": "check whether it can be simplified",
  "commandFamily": [
    "проверь можно ли упростить"
  ],
  "description": "direct IDTSPE Lens check",
  "meaning": "Resolve/reuse the natural host Target and apply LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY without creating a Lens-owned Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "REMOVE/MERGE/INLINE/REUSE/DEFER/MOVE candidates and retained-complexity rationale in the natural owner.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Resolve or reuse the natural IDTSPE Target/owner context before applying the Lens.",
    "A direct Lens command never creates a Lens-owned Target or a parallel runtime.",
    "Return findings to the natural semantic owner and use P-14 only after representation/placement is actually needed.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<target/result>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when a Target/solution may contain unnecessary abstractions, hops, files, test layers or work.",
    "whatYouGet": "REMOVE/MERGE/INLINE/REUSE/DEFER/MOVE candidates and retained-complexity rationale in the natural owner.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "lens",
      "sectionLabel": "IDTSPE Lens Checks — SDS",
      "sectionOrder": 9,
      "itemOrder": 1,
      "kindLabel": "IDTSPE LENS",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

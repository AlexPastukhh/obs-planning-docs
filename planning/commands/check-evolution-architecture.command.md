# Check Evolution / Change Isolation

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "lenscmd.weuc.check",
  "file": "check-evolution-architecture.command.md",
  "command": "проверь эволюцию и архитектуру",
  "englishName": "check evolution and architecture",
  "commandFamily": [
    "проверь эволюцию и архитектуру"
  ],
  "description": "direct IDTSPE Lens check",
  "meaning": "Resolve/reuse the natural host Target and apply LENS-WORKSPACE-EVOLUTION-ARCHITECTURE without creating a Lens-owned Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Evolution / Change-Isolation findings routed through Core Finding Disposition to the natural owner; independently material workspace-architecture work routes to normal Target Formation / DIR-PLAN-ARCHITECTURE.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Resolve or reuse the natural IDTSPE Target/owner context before applying the Lens.",
    "A direct Lens command never creates a Lens-owned Target or a parallel runtime.",
    "Return findings to the natural semantic owner and use P-14 only after representation/placement is actually needed.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<target/result>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-ARCHITECTURE",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when a selected Target needs explicit planned/probable evolution and change-isolation review.",
    "whatYouGet": "Evolution / Change-Isolation findings routed through Core Finding Disposition to the natural owner; independently material workspace-architecture work routes to normal Target Formation / DIR-PLAN-ARCHITECTURE.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "lens",
      "sectionLabel": "IDTSPE Lens Checks — SDS",
      "sectionOrder": 9,
      "itemOrder": 0,
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
    "lensId": "LENS-WORKSPACE-EVOLUTION-ARCHITECTURE",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

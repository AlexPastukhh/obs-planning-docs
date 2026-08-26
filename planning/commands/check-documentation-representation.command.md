# Check Best Representation

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "lenscmd.documentation.representation.check",
  "file": "check-documentation-representation.command.md",
  "command": "проверь как лучше зафиксировать",
  "englishName": "check best representation",
  "commandFamily": [
    "проверь как лучше зафиксировать"
  ],
  "description": "direct IDTSPE Lens check",
  "meaning": "Resolve/reuse the natural host Target and apply LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY without creating a Lens-owned Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "NO_PERSISTENCE / IMPLEMENTATION_NATIVE / existing owner / consolidated artifact / justified split / generated-derived decision, then P-14 placement.",
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
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "Use when you want an explicit decision whether material meaning should persist and in what representation.",
    "whatYouGet": "NO_PERSISTENCE / IMPLEMENTATION_NATIVE / existing owner / consolidated artifact / justified split / generated-derived decision, then P-14 placement.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 5,
      "kindLabel": "IDTSPE LENS",
      "badges": [
        "REQUIRED CORE · EXPLICIT CHECK"
      ],
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

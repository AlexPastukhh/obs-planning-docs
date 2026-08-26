# Review Plan Consistency

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.review_consistency",
  "file": "review-idtspe-consistency.command.md",
  "command": "проверь консистентность плана",
  "englishName": "review plan consistency",
  "commandFamily": [
    "проверь консистентность плана"
  ],
  "description": "Run the IDTSPE Consistency Review Use Case/validator, not a Target Module.",
  "meaning": "Run the IDTSPE Consistency Review Use Case/validator, not a Target Module.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Consistency findings, contradictions/stale Decisions/coverage gaps and concrete reopen/revalidation routes.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is an IDTSPE orchestration/validator surface, not a Target Module.",
    "Preserve the current Target/owner graph and normal permission boundaries.",
    "Do not mutate repository files, implement, test, commit or push."
  ],
  "userTarget": "<current plan/scope>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "Use after material planning/evidence/coverage or when owner/Decision/QRP/placement consistency is in doubt.",
    "whatYouGet": "Consistency findings, contradictions/stale Decisions/coverage gaps and concrete reopen/revalidation routes.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 4,
      "kindLabel": "VALIDATOR",
      "viewOrder": 0
    },
    "relatedNavigation": [
      {
        "viewId": "SDS",
        "viewLabel": "SDS — IDTSPE Profile",
        "sectionId": "08",
        "sectionLabel": "08 Evidence & Coverage",
        "sectionOrder": 8,
        "itemOrder": 1000,
        "kindLabel": "RELATED · IDTSPE VALIDATOR",
        "badges": [
          "RELATED"
        ],
        "related": true,
        "viewOrder": 1
      }
    ]
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "VALIDATOR",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

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
  "description": "Run the current IDTSPE consistency-review supporting process in the active Work Context.",
  "meaning": "Invoke the Core consistency-review supporting process as an explicit review action. It is not a Target Module and not a separate runtime Use Case; current Use Cases (especially revalidation/integration as applicable) own why/when the review is composed.",
  "activeContextBehavior": "Use the current Work Context and applicable IDTSPE Use Case. Review only material current meaning/owners; create no fake Target. Route contradictions, stale Decisions and coverage gaps through Finding/Revalidation semantics.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/revalidate-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-methodology-use-case-registry.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Material consistency findings plus precise affected-owner/revalidation routes; no separate Consistency-Review Target or runtime Use Case is created.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Consistency review is a supporting Core process, not an independent runtime Use Case or Target Module.",
    "Review only material current state and preserve unaffected accepted meaning.",
    "Findings do not silently mutate natural owners; use Core Finding Disposition/Revalidation.",
    "This command is read-only planning/review and grants no repository mutation."
  ],
  "userTarget": "<current plan/scope>",
  "palette": true,
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

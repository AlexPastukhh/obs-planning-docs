# Review Plan Consistency

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

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
  "meaning": "Invoke the Core consistency-review supporting process as a specialized review action. Apply its current validation scope, record/update Review Coverage for the checked consistency surfaces, and disposition every material contradiction surfaced as a Finding Candidate before the operation is complete unless blocked/deferred.",
  "activeContextBehavior": "During composition planning, establish the bounded consistency Review Coverage working context for CURRENT_BASIS before Validation dependency actions begin. Use the current Work Context and bounded consistency Analysis Surface. Review only material current meaning/owners; do not resolve or create a Target merely to host cross-owner consistency review. If the selected surface naturally belongs to Target work, reuse that Target context. Route contradictions, stale Decisions and coverage gaps through Finding/Revalidation semantics.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-case-processes/CROSS-OWNER-CONSISTENCY-REVIEW.use-case-process.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Material consistency findings plus precise affected-owner/revalidation routes; no separate Consistency-Review Target or runtime Use Case is created.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Consistency review runs through Validation; it is not a new Shell port.",
    "REVIEW_COVERAGE_MODE=CURRENT_BASIS is established before P-12 so consistency coverage is planned before validation executes.",
    "Cross-owner consistency review is not Target-bound; use Target context only when the selected semantic surface naturally belongs to Target work.",
    "Material Finding Candidates produced by this review are dispositioned as part of the completed review operation, not modeled as prerequisite includes.",
    "Do not silently mutate semantic owners from a consistency observation; route material findings through canonical Finding Disposition."
  ],
  "userTarget": "<current plan / cross-owner consistency surface>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "VALIDATOR",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-validation.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "REVIEW.STRATEGY-COVERAGE",
      "path": "planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md",
      "anchor": "review-strategy-coverage",
      "why": "Tracks which consistency surfaces were checked and which become stale/need recheck after corrections.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.CROSS-OWNER-CONSISTENCY-REVIEW",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-case-processes/CROSS-OWNER-CONSISTENCY-REVIEW.use-case-process.md",
      "anchor": "process",
      "why": "Runs the dedicated cross-owner consistency review process over current accepted/planned meaning.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "Material contradictions surfaced by consistency review become Finding Candidates and must be dispositioned rather than silently mutating owners.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "REVIEW_COVERAGE_MODE",
      "value": "CURRENT_BASIS",
      "why": "Establish current-basis consistency review coverage before P-12 Validation dependency actions execute."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

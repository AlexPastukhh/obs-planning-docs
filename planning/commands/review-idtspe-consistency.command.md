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
  "meaning": "Invoke the Core consistency-review supporting process as an explicit validation/review action. Material contradictions surfaced by the review become downstream Finding Candidates and are dispositioned after review; Finding disposition is not a prerequisite include.",
  "activeContextBehavior": "Use the current Work Context and applicable IDTSPE Use Case. Review only material current meaning/owners; create no fake Target. Route contradictions, stale Decisions and coverage gaps through Finding/Revalidation semantics.",
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
    "Finding disposition happens after the review produces a material Finding Candidate, not before it as an include.",
    "Do not silently mutate semantic owners from a consistency observation; route material findings through the canonical disposition owner."
  ],
  "userTarget": "<current plan/scope>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "VALIDATOR",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  },
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.validation"
  ],
  "ownerRefs": [
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
  ]
}
[/PLANNING_COMMAND_DEFINITION]

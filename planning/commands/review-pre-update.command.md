# Review Pre-Update Plan

Status: active project command definition

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.review.pre_update",
  "file": "review-pre-update.command.md",
  "command": "проведи предапдейт ревью",
  "englishName": "pre-update review",
  "commandFamily": [
    "проведи предапдейт ревью",
    "pre-update review"
  ],
  "description": "Focused pre-mutation Review on a resolved Pre-Update Plan and affected current owners.",
  "meaning": "Resolve or reuse TM-PRE-UPDATE-PLAN first, then establish PRE_UPDATE_BASIS coverage over the plan, affected owners/dependencies and current destination basis before Validation/Lens dependencies execute. Disposition material Findings, form linked Proposals, refine the plan and self-check Review Coverage. This uses the canonical Review lifecycle and does not mutate the destination.",
  "activeContextBehavior": "The first ordered semantic dependency is plan-pre-update. If the plan cannot resolve a bounded subject and basis, block review dependencies; otherwise derive PRE_UPDATE_BASIS cells before P-12/P-06 actions. Preserve accepted prior meaning and review the intended changes and affected current facts.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/ai-reviewability/AI-OUTPUT-REVIEWABILITY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.COMMAND-SURFACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
      "anchor": "idtspe-command-surface",
      "why": "Defines this generic IDTSPE user invocation surface and its relationship to the shared Shell/composition runtime.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "REVIEW.STRATEGY-COVERAGE",
      "path": "planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md",
      "anchor": "review-strategy-coverage",
      "why": "Owns current-basis review coverage, materially distinct review cells, change invalidation rules and coverage update semantics.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "AI.REVIEWABILITY",
      "path": "planning/documentation/idtspe-methodology/active/ai-reviewability/AI-OUTPUT-REVIEWABILITY.md",
      "anchor": "built-in-pre-return-recheck",
      "why": "Supplies proportional review-quality obligations and omission/contradiction checks without becoming semantic authority.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "Finding Disposition is an intrinsic completion stage for material Finding Candidates produced by this review.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.PROPOSAL-DECISION-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
      "anchor": "resolution-proposal-decision-lifecycle",
      "why": "Owns linked IDTSPE Proposal identity, candidate/repair-route semantics, review, selection boundary and retention/persistence separation.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TM-PRE-UPDATE-PLAN",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md",
      "anchor": "tm-pre-update-plan",
      "why": "Resolves bounded intended-change subject before focused review.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/plan-pre-update.command.md",
    "planning/commands/idtspe-port-validation.command.md",
    "planning/commands/apply-selected-idtspe-lenses.command.md"
  ],
  "expectedOutput": "One Pre-Update Plan plus focused Review Coverage Record, material Finding disposition, linked Proposals, refined plan and honest gaps/blockers.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Plan-before-review ordering is required; an unresolved subject blocks review dependencies.",
    "The same canonical Review/Finding/Proposal semantics apply; do not invent a second lifecycle.",
    "Coverage mode is PRE_UPDATE_BASIS, not CURRENT_BASIS.",
    "Do not mutate destination files, commit or push."
  ],
  "userTarget": "<planned update scope and destination basis>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "compositionContributions": [
    {
      "kind": "REVIEW_COVERAGE_MODE",
      "value": "PRE_UPDATE_BASIS",
      "why": "Pre-execution coverage for resolved Pre-Update Plan and affected current basis; plan semantic dependency executes first."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

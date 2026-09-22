# Review Current IDTSPE Subject

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.review",
  "file": "review-current-idtspe.command.md",
  "command": "проведи idtspe review",
  "englishName": "review current IDTSPE subject",
  "commandFamily": [
    "проведи idtspe review"
  ],
  "description": "Run a broad proportional review of the current subject through existing Validation/Lens machinery and disposition surfaced Findings/Needs.",
  "meaning": "Review the current subject against applicable contracts/validators and the currently applicable Lens Models, surface only material Findings, collect grounded Need Candidates from USER/source wanted outcomes, then disposition any produced Findings/Needs downstream through their canonical owners and refresh Port Composition if those dispositions make new capabilities material.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/ai-reviewability/AI-OUTPUT-REVIEWABILITY.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "AI.REVIEWABILITY",
      "path": "planning/documentation/idtspe-methodology/active/ai-reviewability/AI-OUTPUT-REVIEWABILITY.md",
      "anchor": "built-in-pre-return-recheck",
      "why": "Provides review priority/order and guards against omissions, contradictions, unsupported assumptions and silent alternative selection.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "After review surfaces a material defect/contradiction/unsupported assumption, disposition that Finding Candidate to its natural subject/destination; this is downstream of review, not a prerequisite include.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "RESOLUTION.NEED-CANDIDATE-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md",
      "anchor": "resolution-need-candidate-disposition",
      "why": "After review surfaces a grounded USER/source wanted outcome, disposition the Need Candidate without converting AI preferences into USER needs; this is downstream of review, not a prerequisite include.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "IDTSPE.USER-INPUT-INTAKE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
      "anchor": "idtspe-user-input-intake",
      "why": "Preserves exact USER/source provenance when review collects a Need Candidate.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ],
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.validation",
    "idtspe.lenses.apply-selected"
  ],
  "expectedOutput": "A proportional review result with material Findings/Needs dispositioned through their canonical owners and any newly required downstream Shell capabilities exposed.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Review is an operation over existing capabilities, not a new Shell port.",
    "Prerequisite includes run before review; Finding/Need disposition is downstream of review output and therefore is NOT modeled as an include.",
    "Apply only currently selected applicable Lenses; do not merely select them and stop.",
    "Do not manufacture Findings or Needs when the review produces none.",
    "AI improvement ideas are GIPs/IDTSPE Proposals as appropriate, not USER Need Candidates."
  ],
  "userTarget": "<current IDTSPE subject/context>",
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
  }
}
[/PLANNING_COMMAND_DEFINITION]

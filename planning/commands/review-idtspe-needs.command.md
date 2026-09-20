# Review And Route IDTSPE Need Candidates

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked Core owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.needs.review",
  "file": "review-idtspe-needs.command.md",
  "command": "разбери нид-кандидаты",
  "englishName": "review and route IDTSPE need candidates",
  "commandFamily": [
    "разбери нид-кандидаты",
    "разбери ниды",
    "review needs",
    "idtspe needs"
  ],
  "description": "Ground one or more wanted outcomes as Need Candidates, determine their semantic home and route them without prematurely manufacturing a solution, Requirement, Feature or Evolution Step.",
  "meaning": "Review one or more current Need Candidates through canonical Core Need Candidate Disposition. Preserve exact originating USER input as Evidence/provenance, derive only a reviewable normalized desired outcome, inspect relevant accepted current meaning and actual realization/Evidence, determine the smallest plausible semantic subject/owner, distinguish already-satisfied need from contradiction, candidate solution and unresolved discovery, and route the result into existing canonical owners/lifecycles. This command creates no parallel Need-owned product semantics or durable Need lifecycle.",
  "activeContextBehavior": "Use current checked Sources/Evidence and exact USER wording. Do not silently turn wanted outcome into a Feature, Requirement, Proposal or Evolution Step. If current accepted meaning already covers the need, route to current usage/realization/Evidence as applicable. If review establishes a defect/contradiction, hand off a Finding Candidate to Finding Disposition. If a concrete answer exists, hand off to canonical Proposal Candidate Review. If material ownership/meaning remains unresolved, use Broad Discussion/Q-R-P/discovery proportionally. Under SDS, place sufficiently coherent selected materially unrealized meaning into an existing Evolution Step when it belongs to that transition, or identify a new Step candidate only when an independent qualitative transition is justified.",
  "traversalReadMode": "Reuse current reliable Core governance. Read Need Candidate Disposition and USER-input intake first; consult Proposal/Decision, Finding, Q-R-P, current owner/Evidence and active-profile temporal/Requirement owners only when disposition reaches those semantics. Do not hard-code SDS into the generic Core surface.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md"
  ],
  "expectedOutput": "A compact Need Candidate review: exact USER/source evidence remains traceable; each need has a normalized desired outcome, relevant current meaning/coverage, smallest plausible semantic subject/owner, disposition, next canonical route, temporal/Evolution placement when applicable, and only the material unresolved USER decision/question that actually remains.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Exact USER wording is Evidence of what was expressed; the normalized desired outcome is derived interpretation and remains reviewable.",
    "Wanted outcome without a concrete answer is a Need Candidate; a concrete suggested answer is a Proposal; a discovered contradiction/defect is a Finding Candidate.",
    "Need Candidate does not automatically become Feature, BR/IR/PFR, Proposal or Evolution Step. Determine the natural semantic home first.",
    "When a Need Candidate is persisted independently of its source conversation, retain enough exact provenance to prevent an unsupported AI summary from becoming authority.",
    "Under SDS, reuse an existing coherent Evolution Step when the resolved change belongs there; create a new Step candidate only for a distinct qualitative transition.",
    "Do not mutate files/application state, commit or push. This command reviews/routes Need Candidates only."
  ],
  "userTarget": "<need candidate(s) / USER wanted outcome / current work context to review and route>",
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

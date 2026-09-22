# Collect IDTSPE Need Candidates

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.needs.collect",
  "file": "collect-idtspe-needs.command.md",
  "command": "собери idtspe needs",
  "englishName": "collect IDTSPE need candidates",
  "commandFamily": [
    "собери idtspe needs",
    "собери ниды",
    "collect needs",
    "idtspe needs collect"
  ],
  "description": "Collect grounded Need Candidates from explicit USER/Source wanted outcomes while preserving provenance and without selecting their final solution/destination.",
  "meaning": "Inspect the selected USER/Source context for wanted outcomes/capabilities/properties/constraints, preserve exact provenance, form only grounded Need Candidates and keep interpretation distinct from final disposition. Do not turn AI-authored improvement ideas into USER Needs.",
  "activeContextBehavior": "Collect from the selected messages/Sources/current context. Prefer exact USER wording or precise Source references. Stop at candidate formation; use idtspe.needs.disposition when routing is requested or is the next operation.",
  "traversalReadMode": "Read Need Candidate Collection and USER-input intake. Do not load downstream semantic owners until disposition is invoked.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-COLLECTION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.NEED-CANDIDATE-COLLECTION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-COLLECTION.md",
      "anchor": "resolution-need-candidate-collection",
      "why": "Owns Need Candidate collection/provenance without selecting the downstream semantic destination.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.USER-INPUT-INTAKE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
      "anchor": "idtspe-user-input-intake",
      "why": "Keeps USER facts, answers, wanted outcomes, concrete proposals and decisions distinct during intake.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "A grounded set of Need Candidates with exact USER/Source provenance and normalized wanted outcome, without premature owner/solution selection.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Only USER/Source-grounded wanted outcomes become Need Candidates.",
    "A concrete candidate answer is Proposal-shaped; a defect/contradiction is Finding-shaped.",
    "Collection does not perform Need Disposition."
  ],
  "userTarget": "<USER messages / Sources / context from which to collect wanted outcomes>",
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
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]

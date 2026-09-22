# Disposition IDTSPE Need Candidates

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.needs.disposition",
  "file": "disposition-idtspe-needs.command.md",
  "command": "диспозируй idtspe needs",
  "englishName": "disposition IDTSPE need candidates",
  "commandFamily": [
    "диспозируй idtspe needs",
    "разбери собранные ниды",
    "route needs",
    "idtspe needs disposition"
  ],
  "description": "Disposition already collected Need Candidates to their natural semantic owner/lifecycle without recollecting or inventing wanted outcomes.",
  "meaning": "Take grounded Need Candidates with USER/Source provenance, determine whether each is already covered, its smallest plausible semantic subject/owner and the correct existing route such as realization/Evidence, Finding, Proposal, Q/R/P, Target Formation or active-profile temporal placement.",
  "activeContextBehavior": "Use already collected candidates and current accepted meaning/Evidence. Do not reinterpret an AI preference as a USER need and do not rerun Need collection unless provenance/intake is actually incomplete.",
  "traversalReadMode": "Read Need Candidate Disposition first; consult only destination owners reached by the disposition.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.NEED-CANDIDATE-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md",
      "anchor": "resolution-need-candidate-disposition",
      "why": "Owns semantic grounding against current meaning and routing of already collected Need Candidates to existing owners/lifecycles.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "Each collected Need Candidate has a grounded interpretation, current-coverage result, smallest plausible semantic owner and canonical next route or explicit unresolved/blocking state.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Collection and disposition are different operations: this command assumes grounded Need Candidates already exist.",
    "Need Candidate does not automatically become Requirement, Feature, Proposal or Evolution Step.",
    "AI improvement ideas are GIPs/Proposals, not USER Needs."
  ],
  "userTarget": "<already collected Need Candidate(s)>",
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

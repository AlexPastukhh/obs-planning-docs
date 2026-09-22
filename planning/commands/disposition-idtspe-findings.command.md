# Disposition IDTSPE Finding Candidates

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.findings.disposition",
  "file": "disposition-idtspe-findings.command.md",
  "command": "диспозируй idtspe findings",
  "englishName": "disposition IDTSPE finding candidates",
  "commandFamily": [
    "диспозируй idtspe findings",
    "разбери findings",
    "route findings",
    "idtspe findings disposition"
  ],
  "description": "Disposition existing material Finding Candidates to their smallest natural semantic subject and canonical lifecycle/destination.",
  "meaning": "Take already surfaced Finding Candidates from Review, Lens, Validator, Evidence, revalidation, implementation observation, USER clarification or prior interrupted work; resolve materiality, smallest correct semantic subject, resolution escalation and natural destination without rerunning the producer/review that created them.",
  "activeContextBehavior": "Use current Work Context and existing Finding Candidates. Do not manufacture a fresh review merely because Findings exist. Refresh Port Composition only when disposition makes a downstream capability material.",
  "traversalReadMode": "Read Finding Disposition first; consult subject reference and destination owners only when disposition reaches them.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "Owns materiality, smallest natural subject, Resolution Escalation and canonical destination for existing Finding Candidates.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "Each existing Finding Candidate is dispositioned, merged/marked non-material, blocked/deferred explicitly, or routed to its natural owner/lifecycle; when disposition establishes a material semantic-change candidate, the natural lifecycle contains the corresponding formal IDTSPE Proposal rather than a GIP substitute; no producer review is rerun merely to disposition it.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Finding Disposition is a standalone resume/recovery entry point as well as the canonical destination for Findings produced by review.",
    "Do not rerun Review unless the current task is actually review/recheck.",
    "A producer hint is not destination authority.",
    "RE-2 / RE-4 semantic-change Findings route to formal IDTSPE Proposal lifecycle before selection; a Session GIP may present/reference that Proposal but cannot replace it."
  ],
  "userTarget": "<existing Finding Candidate(s) / current finding set>",
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

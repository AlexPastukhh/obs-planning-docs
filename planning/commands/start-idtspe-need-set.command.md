# Start IDTSPE Need Set

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.needs.set.start",
  "file": "start-idtspe-need-set.command.md",
  "command": "начни новый набор нидов",
  "englishName": "start IDTSPE need set",
  "commandFamily": [
    "начни новый набор нидов",
    "начни новый need set",
    "start need set",
    "idtspe needs set start"
  ],
  "description": "Start a new persistent Need Set coordination scope without changing canonical Need collection/disposition semantics.",
  "meaning": "Run Need Set Coordination start: establish one new ACTIVE Need Set for the selected coordination scope, stop new intake into any prior ACTIVE Set in that scope by closing it unless explicit supersession is requested, and create/reuse the durable coordination representation chosen by P-14. Do not invent Need Candidates, retire unresolved Needs, or copy downstream semantic bodies.",
  "activeContextBehavior": "Use the current selected work/coordination scope and existing Need Sets when present. If another Set is ACTIVE in the same scope, the explicit start request closes that Set for new intake while its non-terminal items continue to be tracked. Seed Needs only through canonical Need Candidate Collection; physical file mutation is limited to the P-14-selected coordination artifact.",
  "traversalReadMode": "Read Need Set Coordination and reuse current Collection/Disposition/Work Context state. Traverse Persistence/Artifact placement for the concrete destination; inspect only the current ledger/workspace facts needed to create or update that representation.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-SET-COORDINATION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.NEED-SET-COORDINATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-SET-COORDINATION.md",
      "anchor": "resolution-need-set-coordination",
      "why": "Owns persistent Need Set grouping/tracking/fulfillment coordination while preserving Need Collection, Disposition and downstream semantic authority.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "One new ACTIVE Need Set identity plus an updated/created P-14-selected durable Needs coordination representation when persistence is material; any prior active Set remains preserved as CLOSED or explicitly SUPERSEDED, and no tracked Need is silently resolved/retired.",
  "permissionMode": "bounded-repository-write-no-commit-push",
  "keyReminders": [
    "Need Candidate Collection remains the only owner of USER/Source Need grounding and provenance.",
    "Need Candidate Disposition remains the only owner of semantic routing.",
    "Starting a new Set does not satisfy, retire or delete unresolved Needs in the prior Set.",
    "Write only the selected Need Set coordination artifact; do not commit or push."
  ],
  "userTarget": "<Need Set coordination scope / optional title>",
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
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-persistence.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]

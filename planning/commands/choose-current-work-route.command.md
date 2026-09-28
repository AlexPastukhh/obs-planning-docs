# Choose Current Work Route

Status: active direct Planning Command; current meaning remains in the linked Use Case and runtime owner.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.route.choose",
  "file": "choose-current-work-route.command.md",
  "command": "определи вид работы",
  "englishName": "choose current work route",
  "commandFamily": [
    "определи вид работы",
    "choose current work route"
  ],
  "description": "Choose DIRECT, SHELL or NO_EXECUTION at WR-4.",
  "meaning": "Record the execution route for the WR-3 subject separately from ContinuationGate. DIRECT requires resolved deterministic work; SHELL enters task-specific composition; NO_EXECUTION preserves the real gate or absence of executable work.",
  "activeContextBehavior": "Operate only at the reached current Work Record stage; reuse the same Session State and record.",
  "traversalReadMode": "Read the fundamental current-work Use Case and the reached Session/Work Record owner proportionally; reuse current trustworthy state.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/session/session-state-runtime-contract.md"
  ],
  "expectedOutput": "WR-4 route and separate continuation gate, with a recorded adjustment if it changes.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "One current Session State and Turn Work Record; no duplicate planning hierarchy.",
    "Keep target/repository authority separate from Session State write authority.",
    "No command invocation selects a Proposal, grants mutation, commit or push."
  ],
  "userTarget": "<current bounded work turn>",
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
    "planning/commands/select-current-turn-work.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.UC.CONDUCT-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
      "anchor": "uc-idtspe-conduct-current-work",
      "why": "Owns the full turn-work orchestration reached by this focused invocation.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "work-record-execution-routing",
      "why": "Owns this immutable Work Record stage and its detailed discipline.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

# Finalize Turn Work Record And Archive

Status: active direct Planning Command; current meaning remains in the linked Use Case and runtime owner.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.turn.finalize",
  "file": "finalize-turn-work-record.command.md",
  "command": "заверши Work Record и архив",
  "englishName": "finalize turn work record and archive",
  "commandFamily": [
    "заверши Work Record и архив",
    "finalize turn work record and archive"
  ],
  "description": "Finalize WR-7 and rematerialize the portable Session State archive.",
  "meaning": "Close the same Turn Work Record with plan-versus-actual and unresolved gates, then rematerialize the Session State archive. A separately requested Proposal Workspace Archive stays a separate PRS-centered output. This command does not make WR-6 a static include prerequisite; the fundamental Use Case performs it at the proper time.",
  "activeContextBehavior": "Operate only at the reached current Work Record stage; reuse the same Session State and record.",
  "traversalReadMode": "Read the fundamental current-work Use Case and the reached Session/Work Record owner proportionally; reuse current trustworthy state.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/session/session-state-runtime-contract.md"
  ],
  "expectedOutput": "Finalized WR-7 and current Session State archive, or an explicit real host limitation.",
  "permissionMode": "artifact-no-commit-push",
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
    "planning/commands/maintain-session-work.command.md"
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
      "anchor": "work-record-finalization",
      "why": "Owns this immutable Work Record stage and its detailed discipline.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

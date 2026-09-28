# Intake Session Input

Status: active direct Planning Command; current meaning remains in the linked Use Case and runtime owner.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.input.intake",
  "file": "intake-session-input.command.md",
  "command": "прими запрос и материалы",
  "englishName": "intake session input",
  "commandFamily": [
    "прими запрос и материалы",
    "intake session input"
  ],
  "description": "Record current USER input/material and command composition as WR-1.",
  "meaning": "Confirm the initial input basis and bounded USER fact/answer/decision intake at WR-1; record root/alias recognition and complete DAG discovery already performed after S0. On a later preparation review or continuation of the same subject, append the actual new input/command-basis event without overwriting WR-1 or allocating another S0. Route contextual-material candidates to later PRS/Session disposition.",
  "activeContextBehavior": "Operate only at the reached current Work Record stage; reuse the same Session State and record.",
  "traversalReadMode": "Read the fundamental current-work Use Case and the reached Session/Work Record owner proportionally; reuse current trustworthy state.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/session/session-state-runtime-contract.md"
  ],
  "expectedOutput": "New S0 or evidenced reuse of the still-open record; initial WR-1 and any later continuation-input provenance/classification/command-graph facts are current.",
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
      "anchor": "work-record-input",
      "why": "Owns this immutable Work Record stage and its detailed discipline.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

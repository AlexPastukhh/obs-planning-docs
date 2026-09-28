# Select Current Turn Work

Status: active direct Planning Command; current meaning remains in the linked Use Case and runtime owner.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.current_work.select",
  "file": "select-current-turn-work.command.md",
  "command": "выбери работу на текущий ход",
  "englishName": "select current turn work",
  "commandFamily": [
    "выбери работу на текущий ход",
    "select current turn work"
  ],
  "description": "Select one bounded primary work subject at WR-3.",
  "meaning": "After automatic WR-2 triage, select one primary substantive subject from required Manifest reconciliation, an accepted current action or the current input, under the natural owner. Do not execute a second unrelated subject by default.",
  "activeContextBehavior": "Operate only at the reached current Work Record stage; reuse the same Session State and record.",
  "traversalReadMode": "Read the fundamental current-work Use Case and the reached Session/Work Record owner proportionally; reuse current trustworthy state.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/session/session-state-runtime-contract.md"
  ],
  "expectedOutput": "One bounded WR-3 subject and relevant current-work basis.",
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
    "planning/commands/intake-session-input.command.md"
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
      "anchor": "work-record-work-selection",
      "why": "Owns this immutable Work Record stage and its detailed discipline.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

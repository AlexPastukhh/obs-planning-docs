# Maintain Session Work

Status: active project command definition
Scope: explicit force/diagnostic surface for the ambient Session State + Turn Work Record runtime.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.work.maintain",
  "file": "maintain-session-work.command.md",
  "command": "веди сессионную работу",
  "englishName": "maintain session work",
  "commandFamily": [
    "веди сессионную работу",
    "maintain session work"
  ],
  "description": "Force/reaffirm the normal Session State + Turn Work Record runtime for the current input and return a current portable Session State archive.",
  "meaning": "Bootstrap/reuse Session State, establish/reuse the Turn Work Record from S0, intake current input, check the accepted Manifest and Core PRS/context, establish one primary substantive subject, choose DIRECT or SHELL proportionally, execute within the same record, synchronize material Session State consequences, finalize plan-vs-actual and rematerialize the current archive. Formal Proposal/USER-review gates remain authoritative.",
  "activeContextBehavior": "Normal substantive work should already follow this runtime automatically. This command is a force/diagnostic surface and must not create a second Session State or second Work Record.",
  "traversalReadMode": "Read Session State Runtime, Work Record Principles and natural owners reached by the current subject proportionally.",
  "ownerFiles": [
    "planning/session/session-state-runtime-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md"
  ],
  "expectedOutput": "One current Session State with one Turn Work Record for the turn, truthful DIRECT/SHELL/NO_EXECUTION routing, synchronized Manifest/PRS/context consequences and a current portable Session State archive.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Session State writes do not grant repository/target mutation.",
    "One Turn Work Record spans input through finalization; Shell traversal is nested under WR-5 when selected.",
    "Material AI-derived Manifest replanning is Proposal-first unless exact target meaning is already USER-selected.",
    "Do not create parallel Need/PRS/Proposal semantics."
  ],
  "userTarget": "<current USER input / session work>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "SESSION.STATE-RUNTIME",
      "path": "planning/session/session-state-runtime-contract.md",
      "anchor": "session-state-runtime",
      "why": "Owns the ambient Session State workspace/archive lifecycle.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "idtspe-work-runtime",
      "why": "Owns the Turn Work Record kernel, route and finalization discipline.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

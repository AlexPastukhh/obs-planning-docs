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
  "description": "Reaffirm ambient Session State/S0 early; as a direct invocation conduct preparation and later continuation of the bounded subject.",
  "meaning": "When included, bootstrap/reuse Session State and archive identity, establish S0 for a new bounded subject or reuse the same open record on continuation, and create/reuse a truthful portable snapshot with the immutable WR-1..WR-7 kernel. As a root, follow UC-IDTSPE-CONDUCT-CURRENT-WORK through default preparation/checkpoint, then resume the same record on USER continuation and reach WR-7 only after the subject ends. A dependency never executes the pending subject or finalizes before its caller.",
  "activeContextBehavior": "Normal substantive work follows the fundamental current-work Use Case even without a command. Reaffirm one Session State and one Work Record; physical bootstrap observations made before the command DAG are reconciled into S0.",
  "traversalReadMode": "Read Session State Runtime, Work Record Principles and natural owners reached by the current subject proportionally.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/session/session-state-runtime-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md"
  ],
  "expectedOutput": "Included: current Session State/archive basis and new S0 or evidenced resumed open record. Direct root: verified preparation checkpoint/archive or later bounded result/final archive, with explicit host limitation when necessary.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Included dependency activates/reaffirms Session State and S0 or an existing open record; the selected root follows the preparation gate.",
    "One open Work Record spans preparation, rechecks and execution of one bounded subject; Shell traversal is nested under WR-5 when selected.",
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
      "responsibilityId": "IDTSPE.UC.CONDUCT-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
      "anchor": "uc-idtspe-conduct-current-work",
      "why": "Owns the complete current-turn process and early dependency versus direct-root distinction.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "SESSION.STATE-RUNTIME",
      "path": "planning/session/session-state-runtime-contract.md",
      "anchor": "session-state-runtime",
      "why": "Owns the ambient workspace/archive lifecycle.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "idtspe-work-runtime",
      "why": "Owns the immutable Work Record kernel.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

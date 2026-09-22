# Proposal-Driven Interaction

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.proposal_driven",
  "file": "proposal-driven.command.md",
  "command": "пропозал",
  "englishName": "proposal-driven interaction",
  "commandFamily": [
    "пропозал",
    "работай через пропозалы",
    "proposal-driven",
    "proposal driven"
  ],
  "description": "Enable strict USER-gated proposal-driven interaction for the current task.",
  "meaning": "Apply the canonical Session USER-gated proposal-driven interaction policy to the current task. AI may do proportionate low-cost read-only investigation needed to ground the next useful Generic AI Proposal (GIP). If a material USER-only fact/constraint/preference/choice is required to formulate that GIP adequately, AI asks the minimum useful clarification first, incorporates the answer, and only then presents/refines the GIP. This command changes interaction gating only and does not create formal IDTSPE Proposal semantics.",
  "activeContextBehavior": "Apply the stricter gating policy to the current task from this invocation onward until the USER explicitly cancels or weakens it, or the task ends. Preserve already accepted task meaning and permissions; do not reinterpret prior AI suggestions as approved Proposals.",
  "traversalReadMode": "Reuse the ambient Session contract when current; otherwise read the Session principles/runtime sections defining Generic AI Proposal (GIP), Real Gate, Authorization Boundary and USER-gated proposal-driven interaction. Do not traverse IDTSPE Proposal owners merely because this interaction mode is active.",
  "ownerFiles": [
    "planning/session/principles-and-terminology.md",
    "planning/session/session-runtime-contract.md"
  ],
  "expectedOutput": "The current task is explicitly USER-gated: cheap GIP-framing research may proceed autonomously; material USER-only grounding gaps are resolved through the minimum useful clarification before the affected Proposal; then each material decision/direction/costly-work/artifact/mutation Proposal is surfaced for USER selection and only the selected Proposal scope proceeds.",
  "permissionMode": "interaction-policy-only-no-mutation-grant",
  "keyReminders": [
    "This is a Session interaction policy, not a second planning runtime and not a formal IDTSPE Proposal mode.",
    "Do not gate trivial mechanical substeps; gate material boundaries defined by the Session owner.",
    "Before a material GIP, ask only the minimum USER clarification genuinely required for adequate grounding; do not wrap that question in a GIP and do not ask when Sources are sufficient.",
    "Show alternatives only when materially distinct alternatives are genuinely useful.",
    "Approval authorizes only the selected GIP scope; the next material boundary requires a new GIP.",
    "The command itself grants no repository/file/application mutation, commit or push permission."
  ],
  "userTarget": "<current task whose interaction should be USER-gated>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "SESSION.RUNTIME-CONTRACT",
      "path": "planning/session/session-runtime-contract.md",
      "anchor": "session-runtime-contract",
      "why": "Defines the session interaction runtime and USER-gated proposal-driven behavior configured by this command.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

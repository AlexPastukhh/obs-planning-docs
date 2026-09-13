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
  "meaning": "Apply the canonical Session USER-gated proposal-driven interaction policy to the current task. AI may do only proportionate low-cost read-only investigation needed to frame the next useful AI Proposal, then must stop at material interaction boundaries for USER selection. This command changes interaction gating only and does not create formal IDTSPE Proposal semantics.",
  "activeContextBehavior": "Apply the stricter gating policy to the current task from this invocation onward until the USER explicitly cancels or weakens it, or the task ends. Preserve already accepted task meaning and permissions; do not reinterpret prior AI suggestions as approved Proposals.",
  "traversalReadMode": "Reuse the ambient Session contract when current; otherwise read the Session principles/runtime sections defining AI Proposal, Real Gate, Authorization Boundary and USER-gated proposal-driven interaction. Do not traverse IDTSPE Proposal owners merely because this interaction mode is active.",
  "ownerFiles": [
    "planning/session/principles-and-terminology.md",
    "planning/session/session-runtime-contract.md"
  ],
  "expectedOutput": "The current task is explicitly USER-gated: cheap Proposal-framing research may proceed autonomously, while each material decision/clarification/direction/costly work/artifact/mutation boundary is surfaced as an AI Proposal and only the selected Proposal scope proceeds.",
  "permissionMode": "interaction-policy-only-no-mutation-grant",
  "keyReminders": [
    "This is a Session interaction policy, not a second planning runtime and not a formal IDTSPE Proposal mode.",
    "Do not gate trivial mechanical substeps; gate material boundaries defined by the Session owner.",
    "Show alternatives only when materially distinct alternatives are genuinely useful.",
    "Approval authorizes only the selected Proposal scope; the next material boundary requires a new Proposal.",
    "The command itself grants no repository/file/application mutation, commit or push permission."
  ],
  "userTarget": "<current task whose interaction should be USER-gated>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

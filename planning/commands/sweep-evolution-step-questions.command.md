# Sweep Evolution Step Questions

Status: active focused SDS command over the existing Evolution Step owner.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "sds.evolution_step.question_sweep",
  "file": "sweep-evolution-step-questions.command.md",
  "command": "проведи Question sweep для Evolution Step",
  "englishName": "sweep Evolution Step questions",
  "commandFamily": [
    "проведи Question sweep для Evolution Step",
    "sweep Evolution Step questions"
  ],
  "description": "Re-evaluate material Questions of one bounded SDS Evolution Step.",
  "meaning": "Apply the contextual Step planning stabilization and RU-EVO-06 of the existing TM-EVOLUTION-STEP owner. Read current Application/Step/Map, Step-owned Target Bodies, PRS and Evidence; reuse known Questions without treating them as exhaustive, derive missing material Questions, integrate already supplied USER answers and route unresolved USER-owned choices through existing gates. Iterate after material change, then conclude Planning Completeness separately from Realization Start Readiness. This operation forms no new Target Module or Use Case and does not select/authorize realization.",
  "activeContextBehavior": "Use during planning of one concrete Step and at the selected-Step realization handoff when that branch is active. Reuse the existing Step/Target; do not demand a Step for a small current-state code or broad non-Step exact change.",
  "traversalReadMode": "Read the reached Evolution Step owner and its RU-EVO-06, relevant Map/Application/Target Bodies/PRS/Evidence; inspect only current material sources.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md"
  ],
  "expectedOutput": "Current contextual Question dispositions and updated Step/Target Body/PRS/Map consequences as applicable, plus independent Planning Completeness and Realization Start Readiness conclusions or a truthful blocker.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Existing TM-EVOLUTION-STEP owns the method and RU-EVO-06; this command is a focused invocation, not a new TM/UC.",
    "An empty PRS is not readiness evidence; previously answered USER input is not asked again.",
    "Keep candidate/selected/realized authority distinct; no implementation authorization, repository mutation, commit or push."
  ],
  "userTarget": "<one concrete SDS Evolution Step / selected-step handoff>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-EVOLUTION-STEP",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEP.md",
      "anchor": "tm-evolution-step",
      "why": "Owns Step planning stabilization and the independent RU-EVO-06 conclusions.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TM-EVOLUTION-STEPS-MAP",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md",
      "anchor": "tm-evolution-steps-map",
      "why": "Rechecks Step relations and compact readiness projections.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TARGET-MODULE.PLANNING-RESOLUTION-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
      "anchor": "tm-planning-resolution-state",
      "why": "Current material Questions and USER/Proposal gates are represented through existing PRS semantics.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

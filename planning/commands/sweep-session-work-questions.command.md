# Sweep Current Session Work Questions

Status: active focused Core current-work command; it invokes the existing WR-5 pre-execution stabilization owner.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.current_work.question_sweep",
  "file": "sweep-session-work-questions.command.md",
  "command": "проведи Question sweep текущей задачи",
  "englishName": "sweep current session work questions",
  "commandFamily": [
    "проведи Question sweep текущей задачи",
    "sweep current session work questions"
  ],
  "description": "Recheck material Questions and readiness before executing the tentative current Manifest task.",
  "meaning": "At WR-5, for the bounded WR-3 subject and tentative accepted Manifest action, perform the contextual pre-execution stabilization owned by Work Record Principles. Review material owner/Source/Evidence/Manifest/PRS state; reuse answered Questions, derive missing material Questions, route unresolved USER choices and missing prerequisites through existing gates, integrate permitted answer/Decision consequences during WR-5, and repeat after any material candidate/route change until a stable readiness conclusion or real gate. Do not turn WR-2 triage into substantive reconciliation, change the WR-1..WR-7 kernel, or begin business execution within this focused command.",
  "activeContextBehavior": "Use one current Session State and Turn Work Record. A Manifest action is a tentative execution candidate under the same WR-3 primary subject. If no accepted current task is ready for execution, report the actual subject/gate rather than inventing one. The fundamental current-work Use Case applies this stabilization before affected business execution even without an explicit command invocation.",
  "traversalReadMode": "Read the reached Work Record pre-execution owner and only the material Manifest/PRS/Question/answer/decision and task-owner sources. Reuse current trustworthy answers and avoid a fixed questionnaire.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md"
  ],
  "expectedOutput": "Current Question/answer dispositions and one stable candidate/route/readiness conclusion for the bounded session task, or USER_REVIEW_REQUIRED/BLOCKED with existing PRS/Manifest consequences and the next recheck condition.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is the session-wide current-task sweep beneath WR-5, not the automatic WR-2 Manifest triage.",
    "It is distinct from the SDS Evolution Step sweep: that focused owner checks one Step and RU-EVO-06 before selected-Step realization; reuse overlapping evidence without merging their readiness conclusions.",
    "An empty PRS is not readiness proof; already answered USER input is not asked again.",
    "Exact USER-selected/factual Manifest consequences may synchronize under Session State authority; AI-derived prospective changes remain Proposal-first. This command does not authorize target/repository mutation or execute the task."
  ],
  "userTarget": "<current bounded Manifest task / WR-3 subject>",
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
    "planning/commands/choose-current-work-route.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "work-record-pre-execution-question-sweep",
      "why": "Owns contextual Question derivation, answer integration, repeat and readiness before executing the tentative current Manifest task.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.CONDUCT-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
      "anchor": "uc-idtspe-conduct-current-work",
      "why": "Keeps this focused check inside the single S0–WR-7 turn rather than a parallel task workflow.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.MAINTAIN-CURRENT-WORK-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md",
      "anchor": "current-work-manifest",
      "why": "Owns permitted in-turn accepted Manifest/PRS consequences and Proposal-first prospective changes.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

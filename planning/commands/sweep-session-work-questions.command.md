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
  "description": "Check material Questions and readiness after the current subject has been prepared.",
  "meaning": "At WR-5, after selected-subject preparation and material owner/component reads, perform the contextual Question sweep for the bounded WR-3 subject, including Manifest reconciliation when selected. Reuse answered Questions, derive new material Questions, route USER-owned choices and missing prerequisites through their natural gates, and repeat affected preparation/sweep after a material candidate, route or port change until stable readiness or a real gate. Do not turn WR-2 triage into substantive reconciliation or execute the selected task within this focused command.",
  "activeContextBehavior": "Use the same open Session State and Work Record. A request to verify whether all material Questions were found, supply answers or complete preparation repeats affected coverage and produces another checkpoint/archive without executing the pending task. The fundamental current-work Use Case applies this sweep for every selected subject even without explicit command invocation.",
  "traversalReadMode": "Read the reached Work Record pre-execution owner and only the material Manifest/PRS/Question/answer/decision and task-owner sources. Reuse current trustworthy answers and avoid a fixed questionnaire.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md"
  ],
  "expectedOutput": "Actual Question/answer dispositions and stable current candidate/route/readiness or a USER_REVIEW_REQUIRED/BLOCKED recheck condition, recorded before the preparation archive checkpoint; no task execution.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is the current-subject WR-5 sweep after preparation, not WR-2 Manifest triage.",
    "It is distinct from the SDS Evolution Step sweep and RU-EVO-06; evidence may be reused but readiness conclusions remain separate.",
    "An empty PRS is not readiness proof; already answered USER input is not asked again.",
    "A changed route or material Question triggers affected preparation/port recheck on the new basis.",
    "This command does not authorize target/repository mutation or execute the pending task."
  ],
  "userTarget": "<current bounded WR-3 subject, including Manifest work>",
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
    "planning/commands/prepare-current-work-record.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "work-record-pre-execution-question-sweep",
      "why": "Owns material Question derivation, answer integration and iterative readiness for every prepared selected subject.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.CONDUCT-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md",
      "anchor": "uc-idtspe-conduct-current-work",
      "why": "Coordinates preparation checkpoints and later execution in the same open Work Record.",
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

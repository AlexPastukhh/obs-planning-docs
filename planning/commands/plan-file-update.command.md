# Plan File Update

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "file_update.plan",
  "file": "plan-file-update.command.md",
  "command": "план файл-обновление",
  "englishName": "plan file update",
  "commandFamily": [
    "план файл-обновление",
    "пред-апдейт",
    "спланируй обновление файлов",
    "спланируй архив",
    "plan file update",
    "archive plan",
    "pre-update",
    "спланируй изменения файлов"
  ],
  "description": "Pre-Update / concrete file plan",
  "meaning": "Repository-file phrasing for a reviewable Pre-Update result. Within the always-active IDTSPE work context, use current selected semantic meaning and TM-PRE-UPDATE-PLAN when a separate concrete update plan is useful; resolve exact affected owners/files/actions/dependencies/preservation/verification without reopening settled design or creating a legacy Current Plan/Idea shell.",
  "activeContextBehavior": "Re-evaluate current Use-Case composition and reuse current selected meaning. Create/reuse a bounded Pre-Update Target only when reviewing the intended repository/file transition before mutation is independently useful; skip ceremonial planning for a tiny obvious change when direct authorized realization is requested. This command never authorizes mutation.",
  "traversalReadMode": "Reuse/targeted/full by update risk.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md",
    "planning/use-cases/UC-REPO-PLAN-UPDATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "When material, one RU-PUPDATE-01/repository Pre-Update Plan with intended add/replace/delete changes, exact affected paths/owners where known, preservation boundary, material dependencies/order, verification and unresolved issues that genuinely remain; otherwise an explicit no-separate-plan-needed result.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "`план файл-обновление` is a repository-specific phrasing of current Pre-Update planning; it does not create a second planning ontology.",
    "IDTSPE is already active; use TM-PRE-UPDATE-PLAN only when a separately reviewable pre-mutation result is useful.",
    "Start from current accepted/selected semantic meaning and do not reopen settled design without a material conflict.",
    "Questions/Proposals/Risks/Problems/Evidence/Decisions remain ordinary sparse IDTSPE State Units, not an Idea/Current-Plan form that must be filled.",
    "Resolve exact affected paths/actions and preservation/verification only to the depth needed for a safe reviewable plan.",
    "Pre-Update is optional and does not authorize repository mutation, archive creation, commit or push."
  ],
  "userTarget": "<what update/archive should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]

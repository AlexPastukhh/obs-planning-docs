# Pre-Update Plan

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.pre.update",
  "file": "plan-pre-update.command.md",
  "command": "составь предапдейт план",
  "englishName": "pre-update plan",
  "commandFamily": [
    "составь предапдейт план",
    "предапдейт план",
    "сначала план обновления",
    "план файл-обновление",
    "пред-апдейт",
    "спланируй обновление файлов",
    "спланируй изменения файлов",
    "pre-update plan",
    "plan file update",
    "pre-update"
  ],
  "description": "Concrete reviewable update plan before mutation",
  "meaning": "Run generic Core TM-PRE-UPDATE-PLAN. Produce one optional, separately reviewable RU-PUPDATE-01 from current accepted meaning and the current destination facts the intended change actually depends on. The Unit inherits mandatory Opening/In-Unit/Closing applicability checkpoints, including Core Lens Registry and active-profile Lens Registry applicability at the Unit boundaries. Do not turn the result into a mandatory stage, Current Plan/Idea shell, mutation permission, or a second repository-planning ontology.",
  "activeContextBehavior": "Create or reuse the natural bounded Pre-Update Plan Target only when reviewing the intended changes before mutation is independently useful. Skip the module for a tiny/obvious change when the user asks for direct realization. The result may hand off to TM-EXACT-REALIZATION but does not authorize repository/destination mutation.",
  "traversalReadMode": "Reuse current reliable IDTSPE governance and accepted prior context; inspect only the exact current code/files/configuration/owner state the update plan materially depends on. Surface a real missing-source Question instead of guessing current state.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md",
    "planning/use-cases/UC-REPO-PLAN-UPDATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "RU-PUPDATE-01 Pre-Update Plan: concrete intended changes, including addressable proposed operations by path/owner/action/delta/basis/check for file or artifact destinations, preserve boundary, material dependencies/order and verification, after proportional registry/Lens applicability checks; unresolved material issues only when they actually remain.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Use accepted previous meaning/current context as the basis; do not redesign it without a material new conflict.",
    "Apply the generic Result Unit Opening/In-Unit/Closing applicability envelope; a checkpoint may reuse current registry metadata and does not mean executing every Lens.",
    "Use ordinary Q/R/P/Evidence + Proposals/Decisions only where they help resolve a real consequential choice; do not dump a mandatory QRPE form.",
    "Proposed file/artifact operation entries are reviewable plan content, not automatically formal IDTSPE Proposals or permission to mutate.",
    "Inspect current destination state only as needed for a concrete safe plan and never guess consequential missing source facts.",
    "The plan does not mutate files, execute tests, create a replacement package, commit or push; actual mutation authority belongs to the later host/Exact workflow.",
    "Skip this Target when the change is trivial/obvious and the user explicitly wants direct realization."
  ],
  "userTarget": "<update scope>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-PRE-UPDATE-PLAN",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-PRE-UPDATE-PLAN",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md",
      "anchor": "tm-pre-update-plan",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

# Recheck IDTSPE Port Requirement Composition

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.port-composition.recheck",
  "file": "recheck-idtspe-port-composition.command.md",
  "command": "перепроверь композицию портов",
  "englishName": "recheck IDTSPE Port Requirement composition",
  "commandFamily": [
    "перепроверь композицию портов"
  ],
  "description": "Refresh/reaffirm the current Shell Port Requirement Set for the current semantic composition.",
  "meaning": "Refresh/reaffirm the Port Requirement Set for the current explicit/current Shell composition and basis. Reuse compatible admission/read coverage only with evidence; prior passes are not sticky authority. This command is Shell-specific and is not an ambient prerequisite for ordinary non-Shell work.",
  "activeContextBehavior": "Compose with the current selected command/semantic intent. Fully expand and merge selected command roots before semantic execution so declarative capability requirements are available to this refresh.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.PORT-COMPOSITION-REFRESH",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-port-composition-refresh",
      "why": "Owns refresh/reaffirmation of the current Port Requirement Set for every normal Shell pass.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.METHODOLOGY-COMPOSITION-RECHECK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md",
      "anchor": "idtspe-methodology-composition-recheck",
      "why": "Defines when contextual methodology composition must be reaffirmed or changed as work evolves.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.COMPOSE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
      "anchor": "uc-idtspe-compose-current-work-process",
      "why": "Provides the current IDTSPE methodology composition whose required capabilities are projected into the Port Requirement Set.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/compose-current-idtspe-work.command.md"
  ],
  "expectedOutput": "A current Shell Port Requirement Set and admission basis for the current semantic composition.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a normal Shell recheck, not a DIRECT-vs-SHELL route selector.",
    "Collect declarative contributions from ALL expanded command nodes before performing this recheck.",
    "Do not infer positive applicability merely because a capability was explicitly requested; explicit request requires a real check."
  ],
  "userTarget": "<current IDTSPE subject/context>",
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
  }
}
[/PLANNING_COMMAND_DEFINITION]

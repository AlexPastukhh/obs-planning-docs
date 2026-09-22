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
  "description": "Refresh/reaffirm the current IDTSPE Port Requirement Set before a normal Shell pass.",
  "meaning": "Using the fully expanded command DAG contributions, current selected Use Cases, the already resolved current IDTSPE methodology composition, Work Context, downstream materiality and current P-02 orientation state, refresh/reaffirm which Shell capabilities are currently required. Previous state is evidence/cache, never sticky authority.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
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
      "anchor": "port-composition-refresh-rule",
      "why": "Owns refresh/reaffirmation of the current Port Requirement Set for every normal Shell pass.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.METHODOLOGY-COMPOSITION-RECHECK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md",
      "anchor": "8-recheck-rule",
      "why": "Defines when contextual methodology composition must be reaffirmed or changed as work evolves.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.COMPOSE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
      "anchor": "process",
      "why": "Provides the current IDTSPE methodology composition whose required capabilities are projected into the Port Requirement Set.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/recheck-methodology-use-cases.command.md",
    "planning/commands/compose-current-idtspe-work.command.md"
  ],
  "expectedOutput": "A refreshed/reaffirmed Port Requirement Set with explicit/automatic/downstream origins available to the same P-02 trace.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a mandatory normal-Shell recheck, not an optional optimization.",
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

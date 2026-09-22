# Compose Current Idtspe Work

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.compose-current-work",
  "file": "compose-current-idtspe-work.command.md",
  "command": "скомпозируй текущую idtspe работу",
  "englishName": "compose current IDTSPE work",
  "commandFamily": [
    "скомпозируй текущую idtspe работу",
    "compose current idtspe work"
  ],
  "description": "Compose/reaffirm the currently useful IDTSPE methodology work from the current selected Use Cases before Shell Port Composition refresh.",
  "meaning": "Use the already refreshed current Use-Case applicability composition to resolve/reuse UC-IDTSPE-COMPOSE-CURRENT-WORK and establish the proportional current IDTSPE methodology composition. This command does not itself refresh the Shell Port Requirement Set; that is the next canonical dependency owned by IDTSPE.PORT-COMPOSITION-REFRESH.",
  "activeContextBehavior": "Use current Work Context and selected Use Cases. Reuse unchanged composition when trustworthy, but re-evaluate any part made material by the current command/component DAG or changed context. Broad Discussion only remains a valid result.",
  "traversalReadMode": "Read the Compose Current Work Use Case and contextual methodology application owner proportionally; do not scan unrelated component bodies before the composition selects them.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.UC.COMPOSE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
      "anchor": "uc-idtspe-compose-current-work",
      "why": "Owns composition of the currently useful IDTSPE work after the registry-level Use-Case applicability recheck.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.CONTEXTUAL-APPLICATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md",
      "anchor": "idtspe-contextual-application",
      "why": "Defines contextual activation/omission so composition remains proportional rather than forcing optional methodology structure.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "idtspe.port.trace",
    "methodology.use_cases.recheck"
  ],
  "compositionContributions": [],
  "expectedOutput": "A current proportional IDTSPE methodology composition ready for Port Composition Refresh; this may validly remain Broad Discussion only.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This command composes methodology work; it does not own Shell Port admission.",
    "Use-Case registry applicability must already be refreshed/reaffirmed through the included command.",
    "Do not create Targets/components merely because they exist in registries.",
    "Broad Discussion only is a complete valid composition."
  ],
  "userTarget": "<current Work Context>",
  "palette": false,
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

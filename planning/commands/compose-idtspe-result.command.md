# Compose IDTSPE Target Step Result

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.result.compose",
  "file": "compose-idtspe-result.command.md",
  "command": "собери target step result",
  "englishName": "compose IDTSPE Target Step Result",
  "commandFamily": [
    "собери target step result"
  ],
  "description": "Compose/recheck the current Target Step Result from the complete current Unit inventory and proportional Unit Resolution content.",
  "meaning": "Use the canonical Target Step Result contract to include applicable Module/Core/Contextual Unit dispositions/results without forcing omitted/non-material content.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TWU.TARGET-STEP-RESULT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-target-step-result",
      "why": "Owns the current Target Step Result projection and its composition from Unit Resolution state.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.APPLICABILITY-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-applicability-disposition",
      "why": "Keeps the result proportional by distinguishing resolved/open/omitted/blocked Unit content.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.result"
  ],
  "expectedOutput": "Current Target Step Result projection with complete applicable Unit inventory/dispositions and coherent result content.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Target Step Result is a projection/composition, not a new owner of Unit meaning."
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

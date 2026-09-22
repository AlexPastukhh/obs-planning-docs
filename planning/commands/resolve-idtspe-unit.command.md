# Resolve Current IDTSPE Target Work Unit

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.unit.resolve",
  "file": "resolve-idtspe-unit.command.md",
  "command": "разреши target work unit",
  "englishName": "resolve current IDTSPE Target Work Unit",
  "commandFamily": [
    "разреши target work unit"
  ],
  "description": "Resolve one current Module-defined, Core-defined or Contextual Target Work Unit proportionally.",
  "meaning": "Use the current Unit Definition/Resolution contract to check applicability, resolve required content/collections/slots proportionally, preserve natural-subject ownership and contribute the resulting Unit content to the current Target Step Result.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TWU.UNIT-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-unit-contract",
      "why": "Primary contract for the selected Unit responsibility/purpose/result content.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.RUNTIME-PROJECTION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-runtime-projection",
      "why": "Turns the Unit Definition into current runtime resolution state/content.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.COLLECTION-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-collection-contract",
      "why": "Used when repeated values form one coherent result family inside the Unit.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TWU.SLOT-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-slot-contract",
      "why": "Used only when an independently formalized terminal sub-responsibility is justified.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TWU.APPLICABILITY-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-applicability-disposition",
      "why": "Prevents forcing non-material prepared Unit content and records current disposition.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.NATURAL-SUBJECT-ROUTING",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-natural-subject-ownership",
      "why": "Routes meaning to its natural semantic owner instead of overloading the Unit.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.SUBJECT-REFERENCE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md",
      "anchor": "canonical-target-work-subject-reference",
      "why": "Provides stable reference to the exact Unit/Collection/Slot subject being resolved.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-target.command.md"
  ],
  "expectedOutput": "Current Unit applicability/disposition and proportionate resolution content, ready to contribute to the Target Step Result.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Do not create a new Unit merely because several values exist.",
    "Collections handle repeated result families; Slots are terminal formal sub-responsibilities only.",
    "A Unit does not own meaning whose natural subject is elsewhere."
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

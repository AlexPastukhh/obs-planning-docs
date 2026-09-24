# Define Contextual IDTSPE Target Work Unit

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.unit.define-contextual",
  "file": "define-contextual-idtspe-unit.command.md",
  "command": "определи contextual unit",
  "englishName": "define contextual IDTSPE Target Work Unit",
  "commandFamily": [
    "определи contextual unit"
  ],
  "description": "Define one Contextual Unit when material Target Requirement coverage exists but no prepared Module/Core Unit covers a bounded responsibility.",
  "meaning": "Use Target Requirement coverage plus the canonical Unit Definition contract to DEFINE a proportional Contextual Unit only when a distinct bounded work responsibility/result contract exists; then hand it to ordinary Unit resolution.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TARGET-FORMATION.REQUIREMENT-COVERAGE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
      "anchor": "target-formation-prepared-coverage",
      "why": "Determines that the material requirement is not already covered directly or by a prepared Module/Core Unit.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.UNIT-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-unit-definition-authority",
      "why": "Defines the minimum coherent Unit responsibility/purpose/result content contract.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.COLLECTION-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-collection-contract",
      "why": "Prevents inventing peer Units where a repeated collection inside one responsibility is sufficient.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TWU.SLOT-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-slot-contract",
      "why": "Defines justified terminal sub-responsibilities when the new Contextual Unit needs formal Slots rather than artificial peer Units.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TWU.NATURAL-SUBJECT-ROUTING",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-natural-subject-ownership",
      "why": "Confirms that the new Contextual Unit is the natural bounded responsibility and does not steal meaning from another owner.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.SUBJECT-REFERENCE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md",
      "anchor": "target-work-subject-reference",
      "why": "Provides exact addressability when later work must refer to this Unit/Collection/item/Slot without changing semantic ownership.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ],
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-target.command.md"
  ],
  "expectedOutput": "One justified Contextual Unit Definition or an explicit decision not to create one because existing coverage/responsibility is sufficient.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Contextual Unit creation is a last-mile coverage mechanism, not a default decomposition step.",
    "One Requirement does not imply one Unit.",
    "After definition, ordinary idtspe.unit.resolve semantics apply."
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

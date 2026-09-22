# Apply Registered Idtspe Target Module Model

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "примени target module"
  ],
  "description": "Apply one selected registered Target Module Model through the canonical Target Module Meta-Model and Target capability.",
  "meaning": "Resolve/reuse the relevant Target, apply the Target Module Meta-Model once for the current unchanged basis, then apply the selected concrete Target Module Model. The resulting Target Module Instance is model-defined structure inside the Target Instance, not a second Target.",
  "activeContextBehavior": "Use this generic command as the shared command-composition prefix for concrete TM-* semantic cards/commands. Several TM Models in one pass reuse Target and Meta-Model shared prefixes.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Selected Target Module Model application through the current Target, including the resulting model-defined Target Module Instance portion when the Model is actually applied.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Concrete TM-* models remain their own semantic owners.",
    "Target Module Meta-Model is resolved once per equivalent basis and reused across several Models.",
    "A Local Target Contract remains valid when no reusable Model fits; explicit TM selection still passes its applicability gate."
  ],
  "userTarget": "<TM-* + target/context>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.target-module.apply",
  "file": "apply-idtspe-target-module.command.md",
  "command": "примени target module",
  "englishName": "apply registered IDTSPE Target Module Model",
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-target.command.md"
  ],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "ownerRefs": [
    {
      "responsibilityId": "TARGET-MODULE.META-MODEL",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md",
      "anchor": "target-module-meta-model",
      "why": "Defines how reusable Target Module Models are selected/applied and how model-defined Target Module Instance portions live inside a Target Instance.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TARGET-MODULE.DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md",
      "anchor": "registry-responsibility",
      "why": "Resolves the selected concrete TM-* Model/family/alias without scanning every model body.",
      "role": "REGISTRY",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TARGET-FORMATION.REUSABLE-MODEL-CHECK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
      "anchor": "7-required-reusable-target-model-check",
      "why": "Requires checking whether a reusable Model is the appropriate governing path versus a Local Target Contract.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.UNIT-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-unit-contract",
      "why": "Defines the bounded responsibility/result contract instantiated by Module-defined, Core-defined or Contextual Units.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.COLLECTION-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-collection-contract",
      "why": "Defines repeated result families inside one Unit so repeated values do not become artificial peer Units.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TWU.SLOT-CONTRACT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-slot-contract",
      "why": "Defines terminal sub-responsibilities inside one Unit when a formal Slot is actually justified.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TWU.RUNTIME-PROJECTION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-runtime-projection",
      "why": "Defines how prepared Unit definitions become current Unit Resolution state/content.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.APPLICABILITY-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-applicability-disposition",
      "why": "Defines materiality/disposition of instantiated Units rather than forcing every prepared Unit to resolve.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.APPLICABILITY-ENVELOPE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-applicability-envelope",
      "why": "Defines opening/in-unit/closing applicability checks while the Model is being applied.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.NATURAL-SUBJECT-ROUTING",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-natural-subject-ownership",
      "why": "Prevents model-defined structure from stealing meaning whose natural owner is elsewhere.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TWU.TARGET-STEP-RESULT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
      "anchor": "twu-target-step-result",
      "why": "Defines how current Unit Resolution content contributes to the Target Step Result.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

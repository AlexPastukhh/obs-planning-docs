# Include Idtspe Target/Owner Relation Capability Port Capability

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "включи порт relation"
  ],
  "description": "Check/traverse Target/owner relation work required by the current composition.",
  "meaning": "Require the named Relation capability to receive a real applicability/traversal check in the current normal IDTSPE Shell pass. The command expresses an explicit semantic requirement; current Shell topology resolves it to the canonical port. A positive semantic result is not required.",
  "activeContextBehavior": "Compose into the current/next normal IDTSPE Shell pass. If equivalent Relation work already exists for the same subject/basis/operation, reuse it instead of repeating it.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md"
  ],
  "expectedOutput": "Relation capability traversal outcome using the normal P-02 vocabulary, including APPLIED / CHECKED_NO_CHANGE / CHECKED_NO_RESULT / NOT_APPLICABLE / REUSED / BLOCKED / DEFERRED as applicable.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a named capability requirement, not a parallel numeric-port ontology.",
    "Explicit inclusion requires a real check, not a manufactured positive result.",
    "Shared prefixes and equivalent current work are reused.",
    "P-02 records admission origin and traversal result incrementally."
  ],
  "userTarget": "<current IDTSPE subject/context>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.port.relation",
  "file": "idtspe-port-relation.command.md",
  "command": "включи порт relation",
  "englishName": "include IDTSPE Target/owner relation capability port capability",
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace"
  ],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.RUNTIME-COMPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-port-p05",
      "why": "Defines the canonical Shell connector for P-05 Relation; the command explicitly requires this capability to receive a real check.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TARGET.INSTANCE-SOURCE-RELATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md",
      "anchor": "target-relation",
      "why": "Defines current Target/owner topology relations without conflating them with Source authority.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "PORT_CAPABILITY_REQUIREMENT",
      "value": "RELATION",
      "why": "Explicitly require the RELATION capability to receive a real applicability/traversal check in the merged current Shell composition."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

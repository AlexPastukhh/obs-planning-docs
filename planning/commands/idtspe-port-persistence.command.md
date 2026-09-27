# Include IDTSPE Persistence / Artifact Maintenance Capability Port

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "включи порт persistence"
  ],
  "description": "Check/traverse persistence, artifact-maintenance, placement and bundling work required by the current composition.",
  "meaning": "Require the named Persistence capability to receive a real P-14 Persistence / Artifact Maintenance applicability/traversal check in the current normal IDTSPE Shell pass, including placement, representation reuse/update, inventory reconciliation or Work Context Bundle consequences when material. The command grants no mutation authority and a positive semantic result is not required.",
  "activeContextBehavior": "Compose into the current/next normal IDTSPE Shell pass. If equivalent Persistence work already exists for the same subject/basis/operation, reuse it instead of repeating it.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md"
  ],
  "expectedOutput": "Persistence / Artifact Maintenance traversal outcome with observable admission/traversal facts recorded in the current Turn Work Record, including placement/reuse/update/inventory/bundle consequences when material and APPLIED / CHECKED_NO_CHANGE / CHECKED_NO_RESULT / NOT_APPLICABLE / REUSED / BLOCKED / DEFERRED as applicable.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a named capability requirement, not a parallel numeric-port ontology.",
    "Explicit inclusion requires a real check, not a manufactured positive result.",
    "Shared prefixes and equivalent current work are reused.",
    "the current Turn Work Record records admission origin and traversal result incrementally.",
    "The current Turn Work Record records admission origin, observable traversal result and reuse evidence; the named capability remains the semantic owner of its work."
  ],
  "userTarget": "<current IDTSPE subject/context>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.port.persistence",
  "file": "idtspe-port-persistence.command.md",
  "command": "включи порт persistence",
  "englishName": "include IDTSPE persistence / artifact maintenance capability port",
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md"
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
      "anchor": "idtspe-port-p14",
      "why": "Defines the canonical Shell connector for P-14 Persistence / Artifact Maintenance; the command explicitly requires this capability to receive a real check.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "REPRESENTATION.ARTIFACT-PLACEMENT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
      "anchor": "representation-artifact-placement",
      "why": "Separates semantic ownership from physical artifact placement/addressability and owns artifact-maintenance / Work Context Bundle representation behavior.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "PORT_CAPABILITY_REQUIREMENT",
      "value": "PERSISTENCE",
      "why": "Explicitly require the PERSISTENCE capability to receive a real applicability/traversal check in the merged current Shell composition."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

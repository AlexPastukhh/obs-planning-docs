# Include Idtspe Evidence / Revalidation Capability Port Capability

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "включи порт evidence / revalidation"
  ],
  "description": "Check/traverse evidence/revalidation work required by the current composition.",
  "meaning": "Require the named Evidence / Revalidation capability to receive a real applicability/traversal check in the current normal IDTSPE Shell pass. The command expresses an explicit semantic requirement; current Shell topology resolves it to the canonical port. A positive semantic result is not required.",
  "activeContextBehavior": "Compose into the current/next normal IDTSPE Shell pass. If equivalent Evidence / Revalidation work already exists for the same subject/basis/operation, reuse it instead of repeating it.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md"
  ],
  "expectedOutput": "Evidence / Revalidation capability traversal outcome using the normal P-02 vocabulary, including APPLIED / CHECKED_NO_CHANGE / CHECKED_NO_RESULT / NOT_APPLICABLE / REUSED / BLOCKED / DEFERRED as applicable.",
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
  "id": "idtspe.port.revalidation",
  "file": "idtspe-port-revalidation.command.md",
  "command": "включи порт evidence / revalidation",
  "englishName": "include IDTSPE evidence / revalidation capability port capability",
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md"
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
      "anchor": "idtspe-port-p15",
      "why": "Defines the canonical Shell connector for P-15 Evidence / Revalidation; the command explicitly requires this capability to receive a real check.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.REVALIDATE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md",
      "anchor": "process",
      "why": "Defines evidence/change-driven narrow revalidation and reopening of affected meaning only.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "PORT_CAPABILITY_REQUIREMENT",
      "value": "REVALIDATION",
      "why": "Explicitly require the REVALIDATION capability to receive a real applicability/traversal check in the merged current Shell composition."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

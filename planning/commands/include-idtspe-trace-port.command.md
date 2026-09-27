# Include IDTSPE Pass Work Plan / State / Trace / Visibility Capability

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.port.trace",
  "file": "include-idtspe-trace-port.command.md",
  "command": "включи порт trace",
  "englishName": "include IDTSPE Pass Work Plan / State / Trace / Visibility capability",
  "commandFamily": [
    "включи порт trace"
  ],
  "description": "Ensure/reuse the current Turn Work Record trace visibility while preserving the legacy P-02 compatibility entry surface.",
  "meaning": "Reuse the already-existing Turn Work Record established by Work Runtime. This command no longer admits an active Shell port and does not create a second record. It exposes the legacy P-02 compatibility projection for Shell-specific observable events/visibility when explicitly requested.",
  "activeContextBehavior": "Operate on the current Turn Work Record. Reuse current state/history and do not open a separate pass ledger or force Shell solely because this compatibility command was invoked.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "idtspe-work-runtime",
      "why": "Owns the canonical Turn Work Record plan/state/trace and its execution visibility.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.PASS-TRACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
      "anchor": "idtspe-pass-trace",
      "why": "Preserves the legacy P-02 compatibility projection for Shell-specific observable events.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "expectedOutput": "The current Turn Work Record remains the single plan/state/trace; any requested legacy P-02 view is a compatibility visibility projection of Shell-specific observable events only.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "P-02 is retired/reserved as an active Shell-port label in the selected Work Runtime topology.",
    "Do not create a second pass ledger; the Turn Work Record is canonical.",
    "This compatibility surface does not grant repository mutation permission.",
    "Keep private reasoning out of the observable record."
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
  },
  "compositionContributions": []
}
[/PLANNING_COMMAND_DEFINITION]

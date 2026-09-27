# Configure IDTSPE Turn Work Record Artifact

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "веди трассу idtspe в trace-файле"
  ],
  "description": "Request retained/external artifact representation of the current Turn Work Record when material and authorized.",
  "meaning": "Keep the current Turn Work Record canonical. When durable/external retention beyond ambient Session State is requested, route physical placement through P-14 without creating a second semantic trace or expanding target mutation permission.",
  "activeContextBehavior": "Apply to the current Turn Work Record. Ambient working backing follows Session State; this command changes only visibility/retention intent. External/durable retention is attempted through P-14/current permission and reports BLOCKED/DEFERRED when unavailable.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "expectedOutput": "The current Turn Work Record remains canonical and an external/durable representation is placed or explicitly BLOCKED/DEFERRED through normal P-14 rules.",
  "permissionMode": "interaction-policy-only-no-mutation-grant",
  "keyReminders": [
    "Artifact retention is representation, not a second trace.",
    "Ambient Session-State files do not automatically invoke P-14.",
    "External/durable placement follows P-14 and current permission authority.",
    "Do not report durable retention as successful when placement is blocked."
  ],
  "userTarget": "<current/next IDTSPE pass>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.trace.artifact",
  "file": "configure-idtspe-trace-artifact.command.md",
  "command": "веди трассу idtspe в trace-файле",
  "englishName": "configure IDTSPE Turn Work Record artifact",
  "includes": [
    "planning/commands/idtspe-port-persistence.command.md"
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
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "idtspe-work-runtime",
      "why": "Owns the canonical Turn Work Record and visibility/retention discipline.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.PASS-TRACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
      "anchor": "idtspe-pass-trace",
      "why": "Preserves legacy trace vocabulary as a compatibility projection only.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "TRACE_SINK_PREFERENCE",
      "value": "TRACE_FILE_OR_ARCHIVE_FILE",
      "why": "Prefer retained file/archive visibility/output for the already-required one Turn Work Record; working-store selection remains with the P-02 owner and persistence authority remains with P-14."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

# Configure Idtspe Trace Inline Visibility

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "показывай трассу idtspe в ответе"
  ],
  "description": "Configure P-02 to project the accumulated working trace inline.",
  "meaning": "Set/refresh the current P-02 Trace Contract so the incrementally accumulated working trace is projected proportionally inline. This configures visibility; it does not by itself force substantive Shell work.",
  "activeContextBehavior": "Apply to the current/next IDTSPE pass. The same working trace remains the orientation surface during the pass and the final visibility source at completion.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "expectedOutput": "P-02 Trace Contract prefers INLINE projection while retaining incremental-first working trace semantics.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "P-02 is already included in every normal Shell pass.",
    "This command configures a visibility sink; it does not create a second trace or semantic owner.",
    "Final inline visibility is derived from the same trace recorded during work."
  ],
  "userTarget": "<current/next IDTSPE pass>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.trace.inline",
  "file": "configure-idtspe-trace-inline.command.md",
  "command": "показывай трассу idtspe в ответе",
  "englishName": "configure IDTSPE trace inline visibility",
  "includes": [
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
      "responsibilityId": "IDTSPE.PASS-TRACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
      "anchor": "3-trace-contract",
      "why": "Refines the already-required P-02 Trace Contract with an explicit visibility/persistence preference; it does not create another trace.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "TRACE_SINK_PREFERENCE",
      "value": "INLINE",
      "why": "Prefer inline projection for the already-required P-02 trace without forcing substantive Shell work."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

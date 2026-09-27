# Configure IDTSPE Pass Working Record Inline Visibility

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "показывай трассу idtspe в ответе"
  ],
  "description": "Configure P-02 to project the accumulated Pass Working Record inline.",
  "meaning": "Set/refresh the current P-02 visibility projection so the accumulated one Pass Working Record (plan/state/trace/final reconciliation) is shown proportionally inline. INLINE is a projection preference only: it neither selects RUNTIME_CONTEXT as the working backing nor prohibits TEMP_TRACE_FILE.",
  "activeContextBehavior": "Apply to the current/next IDTSPE pass. The one Pass Working Record remains the execution-plan/state orientation surface and final visibility source; its working backing is selected by the P-02 owner independently of this inline projection preference.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "expectedOutput": "P-02 prefers INLINE visibility for the whole Pass Working Record while retaining incremental-first plan/state/trace semantics and independent working-store selection.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "P-02 is already included in every normal Shell pass.",
    "INLINE configures visibility only; it does not select RUNTIME_CONTEXT and does not prohibit TEMP_TRACE_FILE.",
    "This command does not create a second trace or semantic owner.",
    "Final inline visibility is derived from the same plan/state/trace record maintained and consulted during work."
  ],
  "userTarget": "<current/next IDTSPE pass>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.trace.inline",
  "file": "configure-idtspe-trace-inline.command.md",
  "command": "показывай трассу idtspe в ответе",
  "englishName": "configure IDTSPE trace inline visibility",
  "includes": [
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
      "responsibilityId": "IDTSPE.PASS-TRACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
      "anchor": "idtspe-pass-trace-contract",
      "why": "Refines the already-required P-02 Pass Working Record with an explicit visibility preference; it does not create another trace or plan record.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "TRACE_SINK_PREFERENCE",
      "value": "INLINE",
      "why": "Prefer inline visibility for the already-required P-02 Pass Working Record; this does not select or constrain the P-02 working backing store."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

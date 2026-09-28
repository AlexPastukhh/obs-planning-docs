# Configure IDTSPE Turn Work Record Inline Visibility

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "показывай трассу idtspe в ответе"
  ],
  "description": "Configure inline visibility for the current Turn Work Record without selecting a separate working store.",
  "meaning": "Prefer an inline conversational projection of the current Turn Work Record. The record may still be file-backed by Session State; INLINE controls visibility, not canonical ownership or working storage.",
  "activeContextBehavior": "Apply to the current Turn Work Record. Ambient working backing follows Session State; this command changes only visibility/retention intent. Inline projection does not constrain file-backed Session-State backing.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "expectedOutput": "The current Turn Work Record uses INLINE visibility proportionally; no independent P-02 record is created.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "INLINE is a visibility projection, not a second trace.",
    "A substantive Turn Work Record may remain file-backed in Session State.",
    "Do not force P-14 solely for an ambient Session-State working file."
  ],
  "userTarget": "<current/next IDTSPE pass>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.trace.inline",
  "file": "configure-idtspe-trace-inline.command.md",
  "command": "показывай трассу idtspe в ответе",
  "englishName": "configure IDTSPE trace inline visibility",
  "includes": [
    "planning/commands/choose-current-work-route.command.md"
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
      "value": "INLINE",
      "why": "Prefer inline visibility for the already-required Turn Work Record; this does not select or constrain the P-02 working backing store."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

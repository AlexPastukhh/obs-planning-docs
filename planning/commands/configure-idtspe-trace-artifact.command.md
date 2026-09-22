# Configure Idtspe Working Trace Artifact

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "веди трассу idtspe в trace-файле"
  ],
  "description": "Configure P-02 to use the permitted trace/archive artifact as the incremental working trace surface.",
  "meaning": "Set/refresh the current P-02 Trace Contract so the same incrementally updated trace artifact is used for working orientation during the pass and for final P-02 visibility. Physical persistence occurs only when the active permission/output contract already permits it.",
  "activeContextBehavior": "This command configures the current/next pass and does not independently grant file mutation. If no permitted physical sink exists, retain the structured trace in Work Context and project it at the nearest allowed checkpoint.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "expectedOutput": "P-02 Trace Contract prefers TRACE_FILE/ARCHIVE_FILE when permitted; otherwise no new mutation authority is inferred.",
  "permissionMode": "interaction-policy-only-no-mutation-grant",
  "keyReminders": [
    "Use one trace artifact, not a separate to-do/watch file.",
    "Record meaningful methodology events incrementally; post-hoc reconstruction is recovery-only.",
    "The trace may guide remaining/reusable traversal but never replaces mandatory Use-Case or Port Composition rechecks."
  ],
  "userTarget": "<current/next IDTSPE pass>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.trace.artifact",
  "file": "configure-idtspe-trace-artifact.command.md",
  "command": "веди трассу idtspe в trace-файле",
  "englishName": "configure IDTSPE working trace artifact",
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
      "anchor": "3-trace-contract",
      "why": "Refines the already-required P-02 Trace Contract with an explicit visibility/persistence preference; it does not create another trace.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "TRACE_SINK_PREFERENCE",
      "value": "TRACE_FILE_OR_ARCHIVE_FILE",
      "why": "Prefer one permitted trace artifact as working orientation and final visibility without granting new mutation authority."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

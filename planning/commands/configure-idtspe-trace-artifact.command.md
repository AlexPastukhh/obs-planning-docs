# Configure IDTSPE Pass Working Record Artifact

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "веди трассу idtspe в trace-файле"
  ],
  "description": "Configure P-02 for explicitly retained Pass Working Record file/archive output and require the persistence capability to be checked without granting mutation authority.",
  "meaning": "Set/refresh durable/file/archive retention intent for the current P-02 Pass Working Record. The one incrementally maintained Initial Plan + Current State + Execution Trace/Plan Delta + Final Plan-vs-Actual record remains the working orientation and final visibility source; this command pre-composes Persistence so P-14 can resolve permitted durable placement. It does not create another record or independently grant file mutation.",
  "activeContextBehavior": "Apply to the current/next pass. Runtime working backing still follows the P-02 owner (normally TEMP_TRACE_FILE when the host permits). Durable retention is attempted only through the active permission/output contract and P-14; if persistence cannot be permitted/resolved, retain the runtime Pass Working Record and report the durable request as BLOCKED/DEFERRED rather than false success.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md"
  ],
  "expectedOutput": "P-02 keeps one Pass Working Record and prefers a retained TRACE_FILE/ARCHIVE_FILE projection when P-14 and current permission permit it; otherwise durable retention is explicitly BLOCKED/DEFERRED while runtime trace continuity remains truthful.",
  "permissionMode": "interaction-policy-only-no-mutation-grant",
  "keyReminders": [
    "Use one Pass Working Record; durable retention never creates a second working trace/plan record.",
    "TEMP_TRACE_FILE is the normal ephemeral working backing when the host permits; this command concerns retained file/archive intent.",
    "P-14 owns durable placement/persistence and this command grants no mutation, commit or push permission.",
    "Maintain plan/state/execution incrementally; post-hoc reconstruction of the work route is recovery-only."
  ],
  "userTarget": "<current/next IDTSPE pass>",
  "palette": true,
  "refinements": [],
  "id": "idtspe.trace.artifact",
  "file": "configure-idtspe-trace-artifact.command.md",
  "command": "веди трассу idtspe в trace-файле",
  "englishName": "configure IDTSPE Pass Working Record artifact",
  "includes": [
    "planning/commands/include-idtspe-trace-port.command.md",
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
      "responsibilityId": "IDTSPE.PASS-TRACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
      "anchor": "idtspe-pass-trace-contract",
      "why": "Refines the already-required P-02 Pass Working Record with an explicit retention preference; it does not create another record.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "compositionContributions": [
    {
      "kind": "TRACE_SINK_PREFERENCE",
      "value": "TRACE_FILE_OR_ARCHIVE_FILE",
      "why": "Prefer retained file/archive visibility/output for the already-required one P-02 Pass Working Record; working-store selection remains with the P-02 owner and persistence authority remains with P-14."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

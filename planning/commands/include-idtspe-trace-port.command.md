# Include IDTSPE Pass Trace Capability

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.port.trace",
  "file": "include-idtspe-trace-port.command.md",
  "command": "включи порт trace",
  "englishName": "include IDTSPE Pass Trace capability",
  "commandFamily": [
    "включи порт trace"
  ],
  "description": "Establish the generic required P-02 Pass Trace / Visibility capability without selecting a concrete sink.",
  "meaning": "Establish/open the one incremental-first working Pass Trace early enough to record command-composition, Use-Case applicability and Port Composition events as they occur. Use the same trace as the current traversal-orientation surface and later as the source of final P-02 visibility. Context chooses the proportional sink unless explicitly refined.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.PASS-TRACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/PASS-TRACE-AND-VISIBILITY-CONTRACT.md",
      "anchor": "1-boundary",
      "why": "Owns the one incremental-first methodology-runtime trace, its working-orientation use, reuse evidence and final visibility projection.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.RUNTIME-COMPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-port-p02",
      "why": "Places the Trace capability in the normal Shell as required P-02 while allowing the working trace to be established during invocation preparation.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "methodology.use_cases.recheck"
  ],
  "expectedOutput": "One current P-02 working trace exists and is ready to record methodology-runtime events incrementally; no particular sink is forced unless current context or an explicit trace command requires one.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is base infrastructure and intentionally does not include idtspe.work, preventing a composition cycle; it does include the mandatory global Use-Case registry recheck.",
    "The working trace is established before ordinary methodology events that must be recorded; canonical P-02 then continues the same trace.",
    "Do not create a second watch/to-do/ledger file.",
    "Post-hoc reconstruction is recovery-only."
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
  "compositionContributions": [
    {
      "kind": "WORKING_TRACE_REQUIRED",
      "value": "P-02",
      "why": "Establish or reuse the one incremental working trace during composition preparation before dependency semantic actions begin."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

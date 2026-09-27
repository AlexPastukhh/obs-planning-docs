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
  "description": "Establish the generic required P-02 Pass Work Plan / State / Trace / Visibility capability without selecting a concrete sink.",
  "meaning": "Establish/open the one incremental-first P-02 Pass Working Record early enough to retain command-composition, Use-Case applicability and Port Composition facts. Once current composition is sufficiently known, materialize the smallest useful Initial Work Plan before substantive non-baseline work; maintain Current Work State, ordered historical state snapshots plus one explicit current-state pointer when multiple state views are retained, execution events and bounded plan deltas in the same record, then publish a final current-state snapshot and derive final plan-vs-actual visibility from it. Context chooses the proportional sink unless explicitly refined.",
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
      "anchor": "idtspe-pass-trace",
      "why": "Owns the one incremental-first Pass Working Record: initial work plan, current state, execution trace/plan deltas, reuse evidence and final plan-vs-actual visibility projection.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.RUNTIME-COMPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-port-p02",
      "why": "Places the Pass Working Record capability in the normal Shell as required P-02 while allowing the record to be established during invocation preparation.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "expectedOutput": "One current P-02 Pass Working Record exists with an established Initial Work Plan/current state ready for incremental execution tracking; when multiple state views are retained they have ordered snapshot IDs and one explicit current-state pointer so historical PENDING values cannot be mistaken for current work; no particular visibility/retention sink is forced unless current context or an explicit trace command requires one.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is base infrastructure and intentionally does not include idtspe.work, preventing a composition cycle; it does include the mandatory global Use-Case registry recheck.",
    "The working record is established during composition preparation; once composition is sufficiently known, its Initial Work Plan is materialized before substantive non-baseline work and canonical P-02 continues the same record.",
    "Do not create a second watch/to-do/ledger/review-plan file merely to remember execution state.",
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
      "why": "Establish or reuse the one incremental Pass Working Record during composition preparation; materialize its Initial Work Plan before dependency substantive actions begin."
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

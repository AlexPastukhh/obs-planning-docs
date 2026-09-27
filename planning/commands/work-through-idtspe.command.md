# IDTSPE — Work / Invoke Registered Component

Status: active project command definition
Scope: generic IDTSPE work-mode and installed-component dispatcher.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.work",
  "file": "work-through-idtspe.command.md",
  "command": "idtspe",
  "englishName": "work through or invoke IDTSPE",
  "commandFamily": [
    "idtspe",
    "работай через idtspe",
    "режим idtspe"
  ],
  "description": "Explicitly force/reaffirm the SHELL execution route for the current selected primary subject inside the ambient Work Runtime.",
  "meaning": "IDTSPE methodology remains always applicable, but Work Runtime now exists above DIRECT/SHELL. Bare `idtspe` reuses the current Turn Work Record, passes through input/Manifest/primary-subject gates, sets or reaffirms `ExecutionRoute=SHELL`, refreshes applicable task-specific Use Cases and the Port Requirement Set, and executes the smallest useful Shell composition in that same Turn Work Record.",
  "activeContextBehavior": "Treat bare `idtspe` as explicit SHELL-route intent for the current primary subject. Registered TM/Lens selectors contribute intent after Work Runtime/Manifest gates and remain subject to applicability/materiality.",
  "traversalReadMode": "Read current Core/profile Target Module and Lens registry summaries first. For an exact/unique selector, read only the selected component body plus the minimum Core/profile governance it requires. Do not scan/load every module or Lens body. Reuse current reliable governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/profiles/PROFILE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "The current Turn Work Record shows `ExecutionRoute=SHELL`, refreshed task-specific Use-Case/Port composition and observable Shell traversal/results; no second pass trace is created.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Work Runtime and the Turn Work Record exist before Shell route selection.",
    "This command explicitly selects/reaffirms SHELL; it is not the reason Session State or the Work Record exists.",
    "P-01/P-02 are retired/reserved compatibility labels; active Shell capabilities retain P-03..P-15 numbering.",
    "Broad Discussion may remain sufficient; do not force optional semantic structure.",
    "This command plans/reviews only and does not grant repository mutation."
  ],
  "userTarget": "<optional TM/LENS selector + target/context, or current planning work>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "WORK_MODE",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md",
    "planning/commands/compose-current-idtspe-work.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.DEFAULT-WORK-MODE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-DEFAULT-WORK-MODE.md",
      "anchor": "idtspe-default-work-mode",
      "why": "Defines the normal proportional meaning of working through IDTSPE; broad discussion can remain sufficient.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.CONTEXTUAL-APPLICATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md",
      "anchor": "idtspe-contextual-application",
      "why": "Defines contextual methodology activation/deactivation and guards against forcing optional structure.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.COMPOSE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
      "anchor": "uc-idtspe-compose-current-work-process",
      "why": "Composes the currently useful IDTSPE work after the mandatory Use-Case applicability recheck.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.RUNTIME-COMPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-runtime-composition",
      "why": "Defines the Shell composition entered only after the current Turn Work Record selects ExecutionRoute=SHELL.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

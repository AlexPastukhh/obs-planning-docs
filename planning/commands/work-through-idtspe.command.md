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
  "meaning": "IDTSPE remains always applicable. Bare `idtspe` selects/reaffirms SHELL for the current WR-3 subject, uses the same S0 Work Record, and traverses the preparation include chain (current Use Cases, Port Requirement Set, selected owner/component reads and Question sweep). The semantic Shell action waits after the default preparation archive until USER continuation unless continuous work was explicitly requested. On continuation, refresh/reaffirm affected composition and execute admitted capabilities in that same record.",
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
  "expectedOutput": "A preparation archive with recorded SHELL route, current Use-Case/Port composition and actual read/Question coverage; after continuation, observable admitted Shell traversal/results in the same record.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Work Runtime and the Turn Work Record exist before Shell route selection.",
    "This command explicitly selects/reaffirms SHELL; it is not the reason Session State or the Work Record exists.",
    "P-01/P-02 are retired/reserved compatibility labels; active Shell capabilities retain P-03..P-15 numbering.",
    "Broad Discussion may remain sufficient; do not force optional semantic structure.",
    "This command plans/reviews only and does not grant repository mutation.",
    "The SHELL semantic action is pending at the default preparation checkpoint, including when this command is included by another root."
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
    "planning/commands/sweep-session-work-questions.command.md"
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

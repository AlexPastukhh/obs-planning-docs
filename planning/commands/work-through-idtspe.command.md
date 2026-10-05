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
  "description": "Explicitly invoke/reaffirm the normal IDTSPE Shell composition for the supplied/current semantic subject.",
  "meaning": "IDTSPE remains always applicable as methodology authority. Bare `idtspe` is an explicit Shell invocation: resolve/reaffirm applicable methodology Use Cases, compose the smallest useful current IDTSPE work, refresh the Port Requirement Set, and execute admitted capabilities without requiring Session State, a Turn Work Record, DIRECT/SHELL route classification, a global session Question sweep, or a preparation/continuation checkpoint. Registered TM/Lens selectors contribute explicit semantic intent and remain subject to their own applicability/materiality contracts.",
  "activeContextBehavior": "Treat bare `idtspe` as explicit Shell intent for the supplied/current semantic subject. Reuse trustworthy current methodology/context state; refresh affected composition when the basis changed. Session/Work-Record tooling participates only when separately invoked.",
  "traversalReadMode": "Read current Core/profile Target Module and Lens registry summaries first. For an exact/unique selector, read only the selected component body plus the minimum Core/profile governance it requires. Do not scan/load every module or Lens body. Reuse current reliable governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/profiles/PROFILE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Observable admitted Shell traversal/results for the current semantic subject, with the current Use-Case/Port composition reported proportionally; no ambient Session archive or Work Record is required.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This command explicitly invokes Shell composition; it does not require Session State, a Turn Work Record or DIRECT/SHELL route selection.",
    "P-01/P-02 are retired/reserved compatibility labels; active Shell capabilities retain P-03..P-15 numbering.",
    "Broad Discussion may remain sufficient; do not force optional semantic structure.",
    "Component-local readiness/question checks remain owned by their components; there is no generic session Question sweep prerequisite.",
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
      "why": "Defines the canonical Shell composition entered by explicit/current semantic Shell invocation.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]

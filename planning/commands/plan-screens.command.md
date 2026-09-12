# Plan Screens

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.screen",
  "file": "plan-screens.command.md",
  "command": "спланируй экраны",
  "englishName": "plan screens",
  "commandFamily": [
    "спланируй экраны"
  ],
  "description": "screen",
  "meaning": "Run TM-SCREEN through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCREEN.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Screen/Spatial Model: material Screen inventory/purpose, Feature/Scenario participation, routes/transitions/global spatial constraints and only independently useful Screen/zone draft detail; may validly conclude no Screen Target is justified.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; they become Decisions/current owner meaning only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Screen map / screen-system scope>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when selected Features and Scenario journeys require explicit screen/surface, spatial-zone, availability/visibility or route/transition planning.",
    "whatYouGet": "A Screen/Spatial Model that places Feature participation and Scenario journey roles without redefining Feature behavior.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "02",
      "sectionLabel": "02 Scenarios & Interaction",
      "sectionOrder": 2,
      "itemOrder": 2,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "CONDITIONAL"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-SCREEN",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

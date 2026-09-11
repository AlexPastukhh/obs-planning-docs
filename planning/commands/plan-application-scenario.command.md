# Plan Application Scenario

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_scenario.plan",
  "file": "plan-application-scenario.command.md",
  "command": "спланируй сценарий",
  "englishName": "plan application scenario",
  "commandFamily": [
    "спланируй сценарий",
    "план сценария приложения"
  ],
  "description": "Scenario journey composition across selected Feature results",
  "meaning": "Run TM-SCENARIO-PLANNING for one actor-to-Benefit journey. Compose selected Feature results, actor/external linking actions, order/branch/convergence/re-entry, continuity, material Screen/external participation, sparse journey-level must-holds and optional E2E Proof Intent. Feature behavior and Feature semantic data remain TM-FEATURE authority.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "One Scenario Journey Composition (RU-SCEN-01): actor/context, participating Feature/result links, journey order/branches/re-entry, continuity, terminal Benefit, only material journey must-holds and optional E2E Proof Intent, plus proportional Core State.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one Scenario>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when one actor-to-Benefit journey across selected Feature results needs independent composition, branching/continuity or whole-journey proof intent.",
    "whatYouGet": "Scenario Journey Composition without duplicating Feature behavior/data authority: Feature links, journey graph, continuity, terminal Benefit and only material journey-level constraints/proof intent.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "02",
      "sectionLabel": "02 Scenarios & Interaction",
      "sectionOrder": 2,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-SCENARIO-PLANNING",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

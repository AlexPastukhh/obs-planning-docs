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
  "description": "scenario planning",
  "meaning": "Run TM-SCENARIO-PLANNING through the IDTSPE Shell for one Scenario: describe behavior/requirements, expose material uncertainty through Generic State, extract DATA/Behavior Items, and retain Development/Change Outlook.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "One Scenario owner with Scenario Behavior/Requirements, Behavioral Decomposition (DATA + Behavior Items), Scenario Development/Change Outlook, and relevant Generic Q/R/P/Evidence/Decisions.",
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
    "whenToUse": "Use when one concrete actor-visible Scenario needs full behavioral planning.",
    "whatYouGet": "One Scenario owner with Behavior/Requirements, DATA + Behavior Items, Development/Change Outlook and relevant Generic planning state.",
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

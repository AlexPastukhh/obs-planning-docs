# Discover Application Scenarios

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_scenarios.discover",
  "file": "discover-application-scenarios.command.md",
  "command": "собери сценарии приложения",
  "englishName": "discover application scenarios",
  "commandFamily": [
    "собери сценарии приложения"
  ],
  "description": "scenario boundary discovery",
  "meaning": "Focused Scenario-boundary entry: inspect Application behavior for independently meaningful Need/result boundaries, surface Scenario Target candidates through normal Target Formation, and use TM-SCENARIO-PLANNING for each selected Scenario. Do not create a separate Scenario Discovery result/catalog authority.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Scenario Target candidates/boundary decisions and selected/reused TM-SCENARIO-PLANNING owners; any catalog/index is navigation only.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Application behavior space / Scenario boundary candidates>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when independently meaningful Scenario boundaries are unclear, incomplete or need consolidation before/while forming Scenario Targets.",
    "whatYouGet": "Scenario boundary candidates and selected/reused Scenario Planning targets; no separate discovery semantic owner.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "02",
      "sectionLabel": "02 Scenarios & Interaction",
      "sectionOrder": 2,
      "itemOrder": 0,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "tmcmd.scenario.plan",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-SCENARIO-PLANNING",
    "lensId": null,
    "parentSurface": "tmcmd.scenario.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]

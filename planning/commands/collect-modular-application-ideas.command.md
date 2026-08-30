# Collect Modular Application Plan

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.application.modular",
  "file": "collect-modular-application-ideas.command.md",
  "command": "собери модульный план приложения",
  "englishName": "collect modular application plan",
  "commandFamily": [
    "собери модульный план приложения",
    "собери идеи приложения модульно",
    "собери модульные идеи приложения",
    "modular application ideas"
  ],
  "description": "legacy compatibility alias; modular-Application alias routed into current IDTSPE/SDS planning",
  "meaning": "Legacy alias for current IDTSPE/SDS planning across independently addressable Application Targets. Resolve Scenario/Domain/Slice/etc Targets normally and use Documentation / Representation for physical separation; there is no Modular SDS runtime, mandatory modular Current Plan or fixed file-count profile.",
  "activeContextBehavior": "Reuse the selected Application and resolve only the material Target Modules needed by the supplied source/current state. Independent addressability is a representation decision, not a separate planning runtime.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of affected Target owners when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Normal current IDTSPE/SDS results for the material Application Targets plus representation/placement decisions when useful; no Modular Current Plan accumulator.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; the canonical material-planning runtime is IDTSPE.",
    "Do not execute or revive the former collect-ideas shell, Current Plan runtime, Idea Review runtime or old SDS profile runtime.",
    "Treat supplied material as normal Sources/Ideas/Q/R/P for the resolved current IDTSPE Target and route through the applicable SDS Target Module when one is clear.",
    "No repository mutation, archive, commit or push."
  ],
  "userTarget": "<selected source/current planning target>",
  "palette": false,
  "refinements": [],
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": null,
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

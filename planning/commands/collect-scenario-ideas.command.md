# Collect Scenario Ideas

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.scenario",
  "file": "collect-scenario-ideas.command.md",
  "command": "собери идеи сценария",
  "englishName": "collect scenario ideas",
  "commandFamily": [
    "собери идеи сценария",
    "scenario ideas"
  ],
  "description": "legacy compatibility alias; Scenario ideas routed into current Scenario Planning",
  "meaning": "Legacy alias for current Scenario planning. Reuse/resolve the natural Scenario context; use TM-SCENARIO-PLANNING for a selected Scenario and normal Target Formation when another Scenario boundary is discovered. Treat supplied ideas as normal IDTSPE material; do not run the former collect-ideas shell.",
  "activeContextBehavior": "Use the selected/current Scenario when clear; otherwise resolve the Scenario boundary through Target Formation. Keep Domain/Slice implications as downstream handoffs unless the user expands the Target.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; refresh the selected Scenario owner/module route when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Scenario Planning result with material Behavior/Requirements, DATA/Behavior Items, Development/Change Outlook and Generic Q/R/P/Evidence/Decisions; no legacy Scenario-Ideas accumulator.",
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
  "helperPresentation": null,
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

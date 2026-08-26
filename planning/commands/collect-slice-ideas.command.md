# Collect Slice Ideas

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.slice",
  "file": "collect-slice-ideas.command.md",
  "command": "собери идеи слайса",
  "englishName": "collect slice ideas",
  "commandFamily": [
    "собери идеи слайса",
    "slice ideas"
  ],
  "description": "legacy compatibility alias; Slice ideas alias routed into current Slice Target Modules",
  "meaning": "Legacy alias for current Slice planning. Use TM-SLICE-STRATEGY when decomposition/portfolio/order is materially unresolved, otherwise reuse/plan the selected TM-IMPLEMENTATION-SLICE. Supplied ideas become normal IDTSPE material and architecture/testing implications route to current Lenses/Test Target Modules.",
  "activeContextBehavior": "Use accepted Scenario/Behavior/Requirement and Domain Sources. Resolve strategy vs individual Slice from current state; do not let implementation convenience redefine upstream semantics.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; refresh the selected Slice owner/module route when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-STRATEGY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Slice Strategy or Implementation Slice result with vertical-result/dependency/proof handoffs and material Q/R/P/Decisions; no legacy Slice-Ideas accumulator.",
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

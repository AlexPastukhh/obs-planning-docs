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
  "meaning": "Legacy alias for current Slice planning. Supplied material enters the always-active IDTSPE Work Context as Source/Question/Proposal/Q-R-P material as appropriate. When Slice discovery is material, route to TM-IMPLEMENTATION-SLICE; otherwise continue Broad Discussion/current owner work. Do not recreate TM-SLICE-STRATEGY or an Ideas accumulator.",
  "activeContextBehavior": "Re-evaluate current Use-Case composition and Slice applicability. Use accepted Feature/Scenario/Domain/Shared meaning as context; create/reuse a Slice Target only when TM-IMPLEMENTATION-SLICE Entry Point is material.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; refresh the selected Slice owner/module route when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Broad Discussion or transient Slice Discovery result with material dependencies/proof/evolution handoffs; no legacy Slice Strategy/Ideas accumulator.",
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

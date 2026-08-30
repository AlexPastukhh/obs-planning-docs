# Collect Application Ideas

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.application",
  "file": "collect-application-ideas.command.md",
  "command": "собери идеи приложения",
  "englishName": "collect application ideas",
  "commandFamily": [
    "собери идеи приложения",
    "application ideas",
    "собери план приложения"
  ],
  "description": "legacy compatibility alias; Application ideas alias routed into current IDTSPE/SDS planning",
  "meaning": "Legacy alias for working through current IDTSPE/SDS against the selected Application planning context. Resolve the narrowest applicable SDS Target Module (Application Definition, Scenario, Domain, Slice, Testing or another real owner) and continue that Target; never accumulate a separate whole-Application Current Plan runtime.",
  "activeContextBehavior": "Reuse the selected Application and its current semantic owners. Route each material item to the narrowest natural current Target/module; preserve cross-layer findings as ordinary handoffs/Ideas rather than traversing every SDS layer automatically.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the affected Application/module owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current IDTSPE/SDS owner updates/findings for the selected Application context, with material Q/R/P/Decisions and downstream handoffs; no legacy Application Current Plan accumulator.",
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

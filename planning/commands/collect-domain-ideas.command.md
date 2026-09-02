# Collect Domain Ideas

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.domain",
  "file": "collect-domain-ideas.command.md",
  "command": "собери идеи домена",
  "englishName": "collect domain ideas",
  "commandFamily": [
    "собери идеи домена",
    "domain ideas"
  ],
  "description": "legacy compatibility alias; Domain ideas route into unified Domain / Aggregate Modeling",
  "meaning": "Legacy alias for current Domain planning. Use TM-DOMAIN-DISCOVERY / Domain-Aggregate Modeling at shallow or bounded/deep depth as appropriate. Supplied ideas become normal IDTSPE material; no collect-ideas runtime is started.",
  "activeContextBehavior": "Use accepted Scenario/DATA/Behavior/Requirement Sources and existing Domain representation. Resolve the useful shallow-vs-deep modeling depth from current state and stop before unrelated Slice planning unless the user expands the Target.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; refresh the selected Domain owner/module route when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Domain / Aggregate Modeling result with selected/rejected candidates, material State and handoffs; no legacy Domain-Ideas accumulator or Domain Draft split.",
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

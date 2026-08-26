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
  "description": "legacy compatibility alias; Domain ideas alias routed into current Domain Target Modules",
  "meaning": "Legacy alias for current Domain planning. Use TM-DOMAIN-DISCOVERY for candidate/evidence exploration or TM-DOMAIN-DRAFT for a selected Domain owner, preserving the valid no-separate-Domain result. Supplied ideas become normal IDTSPE material; no collect-ideas runtime is started.",
  "activeContextBehavior": "Use accepted Scenario/DATA/Behavior/Requirement Sources and existing Domain representation. Resolve discovery vs draft from current state and stop before Slice planning unless the user expands the Target.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; refresh the selected Domain owner/module route when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DRAFT.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Domain Discovery/Draft result with evidence, selected/rejected candidates, Q/R/P/Decisions and handoffs; no legacy Domain-Ideas accumulator.",
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

# Collect Ideas

Status: legacy compatibility command definition
Scope: legacy compatibility command alias. Current planning behavior is owned by the linked IDTSPE/SDS owners; this file preserves the old trigger only.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect",
  "file": "collect-ideas.command.md",
  "command": "собери идеи",
  "englishName": "collect ideas",
  "commandFamily": [
    "собери идеи",
    "collect ideas"
  ],
  "description": "legacy compatibility alias routed into current IDTSPE work mode",
  "meaning": "Legacy alias for supplying material to the always-active IDTSPE Work Context. Treat the input as Source/Question/Proposal/Q-R-P material as appropriate, re-evaluate `UC-IDTSPE-COMPOSE-CURRENT-WORK`, and remain in Broad Discussion unless a Target/Target Module/Lens becomes materially useful. This alias never starts the former collect-ideas/Current-Plan runtime and never enables IDTSPE.",
  "activeContextBehavior": "Reuse current Work Context when possible. If no Target is useful, continue Broad Discussion; if a bounded Target becomes useful, normal Target Formation may create one. Do not manufacture an Idea-owned or collect-ideas-owned planning unit.",
  "traversalReadMode": "Reuse current reliable IDTSPE governance; refresh the selected owner/module route only when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "The smallest useful IDTSPE response to the supplied material: Broad Discussion/Key Points and material State/Target consequences only when useful. No legacy Current Plan or collect-ideas ledger.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; the canonical material-planning runtime is IDTSPE.",
    "Do not execute or revive the former collect-ideas shell, Current Plan runtime, Idea Review runtime or old SDS profile runtime.",
    "Treat supplied material as normal Sources/Ideas/Q/R/P for the resolved current IDTSPE Target and route through the applicable SDS Target Module when one is clear.",
    "No repository mutation, archive, commit or push."
  ],
  "userTarget": "<source/discussion to collect Ideas from>",
  "palette": false,
  "refinements": [],
  "helperPresentation": null,
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

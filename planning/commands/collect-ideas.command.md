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
  "meaning": "Legacy alias of current IDTSPE material planning. Resolve or reuse the natural current IDTSPE Target/context, ingest the supplied material as Sources/Ideas/Q/R/P as appropriate, and continue through `idtspe.work`; when an SDS Target Module is clearly applicable, invoke that module through the same IDTSPE Shell. This alias never starts the former collect-ideas/Current-Plan runtime.",
  "activeContextBehavior": "Resolve/reuse the natural current Target and current semantic owner. If no grounded Target exists, perform ordinary Target Formation before planning; do not manufacture an Idea-owned or collect-ideas-owned planning unit.",
  "traversalReadMode": "Reuse current reliable IDTSPE governance; refresh the selected owner/module route only when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Normal IDTSPE result for the resolved Target: Key Points + Questions/Ideas/Q/R/P/Decisions as material + natural owner/materialization handoff + next methodology action. No legacy Current Plan or collect-ideas ledger.",
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
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": null,
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]

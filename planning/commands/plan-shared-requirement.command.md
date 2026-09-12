# Plan Shared Requirement

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.requirement",
  "file": "plan-shared-requirement.command.md",
  "command": "спланируй общее требование",
  "englishName": "plan shared requirement",
  "commandFamily": [
    "спланируй общее требование"
  ],
  "description": "legacy compatibility alias for owner-local implementation-requirement discovery",
  "meaning": "Legacy alias for requirement planning. TM-REQUIREMENT is retired: evaluate whether material implementation constraints need to become/change/retire owner-local IR/PFR through LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY and the requirement-ownership rule. A Shared Capability is introduced only if reusable multi-consumer implementation responsibility independently passes its existence gate.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/requirement-ownership-and-exception-rule.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Owner-local IR/PFR disposition and, only when independently justified, a Shared Capability binding. No standalone Requirement Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<one exceptional shared must-hold candidate>",
  "palette": false,
  "helperPresentation": {
    "whenToUse": "Only when using this historical command phrase/automation; prefer the current semantic owner or generic `idtspe` component dispatch for new work.",
    "whatYouGet": "Owner-local IR/PFR disposition and, only when independently justified, a Shared Capability binding. No standalone Requirement Target.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "02",
      "sectionLabel": "02 Scenarios & Interaction",
      "sectionOrder": 2,
      "itemOrder": 4,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "CONDITIONAL",
        "EXCEPTIONAL"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
